# Regression guard.
# - Bug: Prettier --write split the <a><img> fragment in _includes/github_heatmap.liquid
#   across multiple lines, which kramdown then refused to recognise as block-level HTML.
#   The raw source ("<a href=..." literal text) started rendering on /github/.
# - Fix PR: #15
# - Why this test exists: the include is protected with a `<!-- prettier-ignore -->`
#   directive, but the invariant ("single-line <a><img>") is enforced at render time
#   by this spec. If anyone reformats the include or removes the ignore comment,
#   this fails before merge.

RSpec.describe "/github/ heatmap rendering (PR #15)" do
  it "the heatmap <a>...<img>...</a> fragment is a single line with zero newlines" do
    raw = raw_for("/github/")

    # Pull out the <a>...<img src="...ghchart..."></a> fragment.
    md = raw.match(%r{<a [^>]*>\s*<img [^>]*ghchart\.rshah\.org[^>]*>\s*</a>}m)
    expect(md).not_to be_nil, "heatmap anchor not found in /github/ HTML"

    fragment = md[0]
    expect(fragment.count("\n")).to eq(0),
      "heatmap anchor split across lines — kramdown will render it as plain text. " \
      "See PR #15 and the NOTE in _includes/github_heatmap.liquid."
  end

  it "the include source keeps its <!-- prettier-ignore --> guard" do
    source = File.read(repo_path("_includes/github_heatmap.liquid"))
    expect(source).to include("<!-- prettier-ignore -->"),
      "prettier-ignore guard removed from _includes/github_heatmap.liquid — " \
      "the next Prettier sweep will re-break kramdown parsing."
  end
end
