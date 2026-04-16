"""render_entry shapes a single PR into the YAML block we emit.

Key invariants:
  - merged / closed PRs use closedAt for the `date` field
  - open PRs fall back to createdAt
  - known repos get their mapped category
  - unknown repos fall through to DEFAULT_CATEGORY and emit a warning
"""

import conftest  # noqa: F401

from refresh_contributions import render_entry, DEFAULT_CATEGORY


def _entry(
    repo="alshedivat/al-folio",
    state="merged",
    number=1,
    title="t",
    url="https://example.com",
    createdAt="2025-01-01T12:00:00Z",
    closedAt="2025-01-15T18:00:00Z",
):
    return {
        "repository": {"nameWithOwner": repo},
        "state": state,
        "number": number,
        "title": title,
        "url": url,
        "createdAt": createdAt,
        "closedAt": closedAt,
    }


def test_merged_uses_closed_date():
    out = render_entry(_entry(state="merged", closedAt="2025-01-15T00:00:00Z"))
    assert "date: 2025-01-15" in out


def test_closed_uses_closed_date():
    out = render_entry(
        _entry(state="closed", closedAt="2025-01-20T00:00:00Z", createdAt="2025-01-05T00:00:00Z")
    )
    assert "date: 2025-01-20" in out


def test_open_falls_back_to_created_date():
    out = render_entry(_entry(state="open", closedAt=None, createdAt="2025-03-05T00:00:00Z"))
    assert "date: 2025-03-05" in out


def test_known_repo_maps_to_expected_category():
    out = render_entry(_entry(repo="alshedivat/al-folio"))
    assert "category: tooling" in out

    out = render_entry(_entry(repo="0xPolygon/zkevm-prover"))
    assert "category: blockchain" in out

    out = render_entry(_entry(repo="0xAdriaTorralba/0xAdriaTorralba.github.io"))
    assert "category: portfolio" in out


def test_unknown_repo_defaults_and_warns(capsys):
    out = render_entry(_entry(repo="unknown/new-repo"))
    assert f"category: {DEFAULT_CATEGORY}" in out

    captured = capsys.readouterr()
    assert "::warning::" in captured.out
    assert "unknown/new-repo" in captured.out
    assert "CATEGORY_BY_REPO" in captured.out


def test_title_and_repo_escaped_correctly():
    out = render_entry(_entry(title='PR with "quotes"', repo="alshedivat/al-folio"))
    # Double quotes in title must be escaped to single quotes (yaml_escape contract)
    assert "'quotes'" in out
    # Repo name itself must be YAML-safe — use the raw repo name
    assert "alshedivat/al-folio" in out


def test_rendered_lines_have_two_space_indent():
    # All entries are nested under `contributions:` so each field must be
    # indented 4 spaces (top-level list entry at 2, fields at 4).
    out = render_entry(_entry())
    lines = out.split("\n")
    # First line is the `- repo:` list marker (2 spaces + "-")
    assert lines[0].startswith("  - repo:")
    # Subsequent lines are nested fields (4 spaces)
    for line in lines[1:]:
        if line.strip():
            assert line.startswith("    ")
