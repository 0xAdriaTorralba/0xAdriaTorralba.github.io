"""YAML escape unit tests. The escape function is the only quoting layer between
`gh search prs` output (which can contain arbitrary PR titles including quotes
and backslashes) and the YAML file we emit. Safety-critical: a bad escape here
could break Jekyll's YAML parser.
"""

import conftest  # noqa: F401 — path fixup side-effect

from refresh_contributions import yaml_escape


def test_escapes_embedded_double_quote():
    assert yaml_escape('He said "hi"') == "He said 'hi'"


def test_escapes_embedded_backslash():
    assert yaml_escape(r"path\with\backslash") == r"path\\with\\backslash"


def test_passes_plain_strings_through():
    assert yaml_escape("just a normal title") == "just a normal title"


def test_backslash_escape_applied_before_quote_escape():
    # Order matters: if we escaped quotes first, then backslashes, a title like
    # `"foo"` would round-trip wrong. Assert the output is re-parseable.
    import yaml

    for raw in [
        r'title with "quote"',
        r"title\with\backslash",
        r'mixed "quote" and \backslash',
    ]:
        escaped = yaml_escape(raw)
        # Produce a minimal YAML doc and confirm it parses.
        doc = f'value: "{escaped}"'
        # Round-trip — we only assert parseability; the transformation from
        # embedded double-quote to single-quote intentionally changes content.
        yaml.safe_load(doc)
