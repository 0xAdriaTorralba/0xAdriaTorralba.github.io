"""build_yaml assembles the full _data/contributions.yml payload.

Invariants under test:
  - output starts with the HEADER constant (keeps AUTO-GENERATED warning)
  - output ends with a trailing newline (POSIX-friendly)
  - PRs are sorted desc by effective date (closedAt or createdAt)
  - result round-trips through yaml.safe_load
"""

import json

import yaml

import conftest
from refresh_contributions import build_yaml, HEADER


def _load_fixture():
    return json.loads((conftest.FIXTURES_DIR / "sample_prs.json").read_text())


def test_output_starts_with_header():
    out = build_yaml(_load_fixture())
    assert out.startswith(HEADER)


def test_output_ends_with_newline():
    out = build_yaml(_load_fixture())
    assert out.endswith("\n")
    assert not out.endswith("\n\n"), "trailing blank line; git diffs will thrash"


def test_round_trip_via_yaml_safe_load():
    out = build_yaml(_load_fixture())
    parsed = yaml.safe_load(out)
    assert "contributions" in parsed
    assert isinstance(parsed["contributions"], list)
    assert len(parsed["contributions"]) == 5


def test_sorted_descending_by_effective_date():
    out = build_yaml(_load_fixture())
    parsed = yaml.safe_load(out)
    dates = [c["date"] for c in parsed["contributions"]]
    # None in fixture; all have dates
    assert dates == sorted(dates, reverse=True), f"not desc sorted: {dates}"


def test_every_entry_has_required_fields():
    out = build_yaml(_load_fixture())
    parsed = yaml.safe_load(out)
    required = {"repo", "pr", "title", "url", "state", "date", "category"}
    for entry in parsed["contributions"]:
        missing = required - set(entry)
        assert not missing, f"entry missing fields {missing}: {entry}"


def test_state_values_are_valid_enum():
    out = build_yaml(_load_fixture())
    parsed = yaml.safe_load(out)
    valid = {"merged", "open", "closed"}
    for entry in parsed["contributions"]:
        assert entry["state"] in valid


def test_header_still_matches_data_file_convention():
    # This is the regression-guard coupling: the HEADER constant must stay
    # in sync with what's at the top of _data/contributions.yml in the repo.
    # If someone refactors the Python script and changes HEADER, that'll
    # silently drift from the auto-regenerated file on next cron run.
    assert "AUTO-GENERATED" in HEADER
    assert "DO NOT EDIT BY HAND" in HEADER
    assert "refresh_contributions.py" in HEADER
