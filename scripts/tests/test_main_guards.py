"""End-to-end guards on the main() entry point.

These tests invoke the module as a CLI to verify:
  - an empty PR list from `gh search prs` refuses to overwrite the data file
  - missing `gh` binary produces a clear error message (not a stack trace)
"""

import subprocess
import sys
from pathlib import Path

import pytest

import conftest  # noqa: F401

SCRIPT = conftest.SCRIPTS_DIR / "refresh_contributions.py"


def test_empty_response_refuses_to_overwrite_data_file(monkeypatch, tmp_path):
    """If gh returns an empty list, we'd wipe the data file — guard against that."""
    import refresh_contributions

    monkeypatch.setattr(refresh_contributions, "fetch_prs", lambda _u: [])

    out_path = tmp_path / "contributions.yml"
    out_path.write_text("contributions:\n  - repo: old/data\n")

    monkeypatch.setattr(
        sys, "argv", ["refresh_contributions.py", "--username", "dummy", "--output", str(out_path)]
    )

    with pytest.raises(SystemExit) as exc:
        refresh_contributions.main()
    assert "empty" in str(exc.value).lower() or "refusing" in str(exc.value).lower()

    # The existing file must be untouched
    assert out_path.read_text().startswith("contributions:")


def test_missing_gh_binary_exits_with_clear_error(monkeypatch):
    """FileNotFoundError from subprocess (no gh in PATH) → clean exit message."""
    import refresh_contributions

    def raise_fnf(*args, **kwargs):
        raise FileNotFoundError("gh")

    monkeypatch.setattr(refresh_contributions.subprocess, "run", raise_fnf)

    with pytest.raises(SystemExit) as exc:
        refresh_contributions.fetch_prs("dummy")
    assert "gh" in str(exc.value).lower()


def test_cli_help_runs_without_error():
    result = subprocess.run(
        [sys.executable, str(SCRIPT), "--help"],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0
    assert "--username" in result.stdout
    assert "--output" in result.stdout
