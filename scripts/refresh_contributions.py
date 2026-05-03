#!/usr/bin/env python3
"""
Regenerate `_data/contributions.yml` from the authenticated GitHub account.

Runs daily via .github/workflows/refresh-contributions.yml. Uses the `gh`
CLI (shipped on GitHub-hosted runners and pre-authenticated there) so we
don't have to juggle an additional token. Locally, you need `gh auth login`.

Usage:
    python3 scripts/refresh_contributions.py \\
        --username 0xAdriaTorralba \\
        --output _data/contributions.yml
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Category mapping. Edit this dict to assign a new repo to a category, then
# re-run the workflow from the Actions tab ("Refresh contributions data").
# Unknown repos fall through to DEFAULT_CATEGORY and emit a warning.
# ---------------------------------------------------------------------------

CATEGORY_BY_REPO: dict[str, str] = {
    # Blockchain / ZK / smart-contract ecosystem
    "0xPolygon/zkevm-prover": "blockchain",
    "GianfrancoBazzani/evm-storage.codes": "blockchain",
    "zkbarcelona/web": "blockchain",
    "delegative/ui": "blockchain",
    "hasselalcala/proofID": "blockchain",
    "ethproofs/ethproofs": "blockchain",
    "lambdaclass/lambdaworks": "blockchain",
    # LLM-backed products / AI tooling
    "GianfrancoBazzani/croisette.cc": "ai",
    # General developer tooling / OSS
    "alshedivat/al-folio": "tooling",
    "thom1606/Astrix": "tooling",
    "RavuAlHemio/poxymeter": "tooling",
    "mailgun/mailgun-ruby": "tooling",
    # Side projects & apps I own
    "0xAdriaTorralba/wiki-xines": "projects",
    "0xAdriaTorralba/pedal-ios": "projects",
    # Portfolio site (this repo)
    "0xAdriaTorralba/0xAdriaTorralba.github.io": "portfolio",
    # Academic coursework
    "0xAdriaTorralba/DataVisualizationInLinguistics": "academic",
    "ADS2020UB/ADS-4": "academic",
}

DEFAULT_CATEGORY = "tooling"

# Repos owned/maintained by the site owner. Anything not listed here is
# treated as an upstream ("external") contribution. Edit this set if you
# co-own a new repo or take over an existing one.
OWNED_REPOS: set[str] = {
    "0xAdriaTorralba/pedal-ios",
    "0xAdriaTorralba/0xAdriaTorralba.github.io",
    "0xAdriaTorralba/DataVisualizationInLinguistics",
}

HEADER = """\
# Open-source PRs authored by the site owner.
#
# AUTO-GENERATED — DO NOT EDIT BY HAND.
# Refreshed daily by .github/workflows/refresh-contributions.yml, which
# runs scripts/refresh_contributions.py. Edits here get overwritten on
# the next run.
#
# To change a PR's category, edit the CATEGORY_BY_REPO map inside
# scripts/refresh_contributions.py and re-run the workflow
# (Actions \u2192 "Refresh contributions data" \u2192 "Run workflow").
#
# To mark a repo as owned by the site owner (so it shows up under the
# "my projects" scope filter), add it to OWNED_REPOS in the same script.
#
# Fields per entry:
#   repo, pr, title, url, state, date, category, ownership

contributions:
"""


def fetch_prs(username: str) -> list[dict]:
    """Call `gh search prs` and return the parsed JSON list."""
    cmd = [
        "gh",
        "search",
        "prs",
        f"--author={username}",
        "--limit=200",
        "--sort=created",
        "--json",
        "repository,title,url,number,createdAt,closedAt,state",
    ]
    try:
        completed = subprocess.run(
            cmd,
            check=True,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError:
        sys.exit("error: `gh` CLI not found on PATH. Install it or ensure the runner has it.")
    except subprocess.CalledProcessError as exc:
        sys.stderr.write(exc.stderr or "")
        sys.exit(f"error: `gh search prs` failed with exit code {exc.returncode}")

    try:
        data = json.loads(completed.stdout or "[]")
    except json.JSONDecodeError as exc:
        sys.exit(f"error: failed to parse `gh search prs` JSON output: {exc}")

    if not isinstance(data, list):
        sys.exit("error: unexpected JSON shape from `gh search prs` (expected a list)")

    return data


def yaml_escape(value: str) -> str:
    """Escape a string for safe inclusion between double quotes in YAML."""
    return value.replace("\\", "\\\\").replace('"', "'")


def render_entry(entry: dict) -> str:
    """Render a single PR as four-space-indented YAML lines."""
    repo = entry["repository"]["nameWithOwner"]
    category = CATEGORY_BY_REPO.get(repo)
    if category is None:
        category = DEFAULT_CATEGORY
        print(
            f"::warning::repo '{repo}' has no category mapping; "
            f"defaulted to '{DEFAULT_CATEGORY}'. Add it to CATEGORY_BY_REPO "
            f"in scripts/refresh_contributions.py.",
            flush=True,
        )

    state = entry["state"]
    created = (entry.get("createdAt") or "")[:10]
    closed = (entry.get("closedAt") or "")[:10]
    # Merged / closed entries use their closed date; open ones keep the created
    # date as the effective sort key — matches how the renderer surfaces dates.
    date = closed if state in ("merged", "closed") and closed else created

    ownership = "own" if repo in OWNED_REPOS else "external"

    title = yaml_escape(entry["title"])
    url = entry["url"]
    number = entry["number"]

    lines = [
        f'  - repo: "{repo}"',
        f"    pr: {number}",
        f'    title: "{title}"',
        f'    url: "{url}"',
        f"    state: {state}",
        f"    date: {date or 'null'}",
        f"    category: {category}",
        f"    ownership: {ownership}",
    ]
    return "\n".join(lines)


def build_yaml(prs: list[dict]) -> str:
    # Sort by effective date (closed > created) desc so the most recent
    # activity appears at the top of the list.
    def effective_date(p: dict) -> str:
        return p.get("closedAt") or p.get("createdAt") or ""

    ordered = sorted(prs, key=effective_date, reverse=True)
    body = "\n".join(render_entry(p) for p in ordered)
    # Trailing newline is kind to git diffs and POSIX-y line tooling.
    return HEADER + body + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--username",
        required=True,
        help="GitHub handle whose authored PRs should be fetched.",
    )
    parser.add_argument(
        "--output",
        default="_data/contributions.yml",
        type=Path,
        help="Path to the YAML file to (re)generate.",
    )
    args = parser.parse_args()

    prs = fetch_prs(args.username)
    if not prs:
        sys.exit(
            "error: `gh search prs` returned an empty list. Refusing to overwrite "
            f"{args.output} with an empty dataset."
        )

    yaml_text = build_yaml(prs)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(yaml_text, encoding="utf-8")
    print(f"Wrote {len(prs)} PRs to {args.output}")


if __name__ == "__main__":
    main()
