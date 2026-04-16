#!/usr/bin/env python3
"""
Refresh the Ethernaut section of `_data/ctf_progress.yml` from on-chain data.

Queries Sepolia for the player's `LevelCompletedLog` events on the Ethernaut
contract, then flips the matching `ethernaut.levels[*].status` to `solved` and
fills `solved_on` with the block date (UTC).

Idempotent. Surgical edit: only touches `status` and `solved_on` on levels the
player has on-chain evidence of solving. Leaves `team_events`,
`damn_vulnerable_defi`, `writeup`, comments, and ordering untouched. Runs daily
via .github/workflows/refresh-ethernaut.yml.

Usage:
    python3 scripts/refresh_ethernaut.py \\
        --player 0x295F3Fe50eFB4b05C966C7399DC3d7d1438353Ad \\
        --output _data/ctf_progress.yml
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from ruamel.yaml import YAML

DEFAULT_RPC = "https://sepolia.gateway.tenderly.co"
ETHERNAUT_ADDRESS = "0xa3e7317E591D5A0F1c605be1b3aC4D2ae56104d6"
# keccak256("LevelCompletedLog(address,address,address)")
LEVEL_COMPLETED_TOPIC0 = "0x5038a30b900118d4e513ba62ebd647a96726a6f81b8fda73c21e9da45df5423d"
DEPLOY_MAP_URL = (
    "https://raw.githubusercontent.com/OpenZeppelin/ethernaut/master/"
    "client/src/gamedata/deploy.sepolia.json"
)
REQUEST_TIMEOUT = 30
RETRY_COUNT = 3
RETRY_SLEEP = 2.0


def rpc_call(url: str, method: str, params: list) -> object:
    payload = json.dumps(
        {"jsonrpc": "2.0", "id": 1, "method": method, "params": params}
    ).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    last_err: Exception | None = None
    for attempt in range(RETRY_COUNT):
        try:
            with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            if "error" in data:
                raise RuntimeError(f"RPC error for {method}: {data['error']}")
            return data["result"]
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
            last_err = exc
            if attempt < RETRY_COUNT - 1:
                time.sleep(RETRY_SLEEP * (attempt + 1))
    raise SystemExit(
        f"error: RPC {method} failed after {RETRY_COUNT} retries: {last_err}"
    )


def fetch_deploy_map() -> dict[str, int]:
    """Return {level_contract_addr_lower: deployId_int}.

    deploy.sepolia.json ships as a mixed dict: numeric string keys map deployId
    → contract address, and extra keys like "ethernaut", "proxyAdmin", and
    "supersededAddresses" carry infra metadata. We filter to digit keys and
    invert, then overlay `supersededAddresses` so an event emitted against an
    old level contract still resolves to the same deployId.
    """
    req = urllib.request.Request(DEPLOY_MAP_URL)
    with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
        raw = json.loads(resp.read().decode("utf-8"))

    by_addr: dict[str, int] = {}
    for key, value in raw.items():
        if isinstance(key, str) and key.isdigit() and isinstance(value, str):
            by_addr[value.lower()] = int(key)

    for entry in raw.get("supersededAddresses") or []:
        old = entry.get("oldAddress", "").lower()
        new = entry.get("newAddress", "").lower()
        if old and new in by_addr:
            by_addr.setdefault(old, by_addr[new])

    return by_addr


def pad_address_topic(addr: str) -> str:
    clean = addr.lower().removeprefix("0x")
    return "0x" + clean.rjust(64, "0")


def fetch_logs(rpc_url: str, player: str) -> list[dict]:
    """Fetch every LevelCompletedLog event emitted with the player in topic1.

    A single eth_getLogs call with `fromBlock: 0, toBlock: latest` works on
    Tenderly's public Sepolia gateway when the filter is narrow enough (single
    contract + two topics), so we avoid pagination and the round-trip cost
    that comes with it.
    """
    params = [
        {
            "fromBlock": "0x0",
            "toBlock": "latest",
            "address": ETHERNAUT_ADDRESS,
            "topics": [LEVEL_COMPLETED_TOPIC0, pad_address_topic(player)],
        }
    ]
    result = rpc_call(rpc_url, "eth_getLogs", params)
    return list(result) if isinstance(result, list) else []


def earliest_solve_per_level(logs: list[dict]) -> dict[str, str]:
    """Return {level_contract_lower: earliest_block_hex}."""
    best: dict[str, tuple[int, str]] = {}
    for log in logs:
        topics = log.get("topics", [])
        if len(topics) < 4:
            continue
        level_addr = "0x" + topics[3][-40:].lower()
        block_hex = log["blockNumber"]
        block_int = int(block_hex, 16)
        if level_addr not in best or block_int < best[level_addr][0]:
            best[level_addr] = (block_int, block_hex)
    return {addr: block_hex for addr, (_int, block_hex) in best.items()}


def block_date_utc(rpc_url: str, block_hex: str) -> str:
    blk = rpc_call(rpc_url, "eth_getBlockByNumber", [block_hex, False])
    ts = int(blk["timestamp"], 16)
    return _dt.datetime.fromtimestamp(ts, tz=_dt.timezone.utc).date().isoformat()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--player", required=True)
    parser.add_argument("--output", type=Path, default=Path("_data/ctf_progress.yml"))
    parser.add_argument(
        "--rpc-url",
        default=os.environ.get("SEPOLIA_RPC_URL", DEFAULT_RPC),
    )
    args = parser.parse_args()

    deploy_map = fetch_deploy_map()
    logs = fetch_logs(args.rpc_url, args.player)
    earliest = earliest_solve_per_level(logs)

    yaml = YAML()
    yaml.preserve_quotes = True
    yaml.width = 4096
    # al-folio style: sequences nested one level inside their parent mapping.
    #   ethernaut:
    #     levels:
    #       - num: 0
    yaml.indent(mapping=2, sequence=4, offset=2)
    # Emit explicit `null` (keyword) instead of bare empty so untouched
    # `writeup: null` / `url: null` lines don't churn on round-trip.
    yaml.representer.add_representer(
        type(None),
        lambda dumper, _data: dumper.represent_scalar(
            "tag:yaml.org,2002:null", "null"
        ),
    )
    data = yaml.load(args.output)

    ethernaut_levels = data["ethernaut"]["levels"]
    prior_solved = sum(1 for lvl in ethernaut_levels if lvl.get("status") == "solved")

    if not earliest and prior_solved > 0:
        sys.exit(
            "error: eth_getLogs returned no LevelCompletedLog events, but the YAML "
            f"already has {prior_solved} solved levels. Refusing to wipe history. "
            "Check the RPC endpoint and player address."
        )

    num_to_date: dict[int, str] = {}
    unknown_levels: list[str] = []
    for addr, block_hex in earliest.items():
        if addr not in deploy_map:
            unknown_levels.append(addr)
            continue
        num_to_date[deploy_map[addr]] = block_date_utc(args.rpc_url, block_hex)

    if unknown_levels:
        sys.stderr.write(
            "::warning::level contracts missing from deploy.sepolia.json "
            "(OpenZeppelin may have added a level — bump schema minItems/maxItems "
            "and add stubs manually):\n"
        )
        for addr in unknown_levels:
            sys.stderr.write(f"::warning::  {addr}\n")

    changed = False
    for level in ethernaut_levels:
        num = level["num"]
        if num not in num_to_date:
            continue
        date = num_to_date[num]
        if level.get("status") != "solved":
            level["status"] = "solved"
            changed = True
        current = level.get("solved_on")
        current_iso = current.isoformat() if hasattr(current, "isoformat") else (
            str(current) if current else None
        )
        if current_iso != date:
            level["solved_on"] = _dt.date.fromisoformat(date)
            changed = True

    if changed:
        yaml.dump(data, args.output)
        print(f"Wrote updated Ethernaut progress to {args.output}")
    else:
        print("No changes: YAML is already in sync with on-chain events.")


if __name__ == "__main__":
    main()
