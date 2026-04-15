# Regression guard.
# - Bug: three sections on /security/ are intentionally hidden until they have
#   real content: "audit contest findings" (inside {% comment %}),
#   "writeups & research posts" (inside {% comment %}),
#   "tools & contributions" (inside {% if false %}).
#   If anyone accidentally deletes a wrapping tag or flips the if-false to
#   if-true, empty/placeholder sections would publish silently.
# - Why this test exists: assert the hidden content does NOT appear on the
#   rendered /security/ page.

RSpec.describe "/security/ hidden sections" do
  let(:raw) { raw_for("/security/").downcase }

  it "does not render the 'audit contest findings' H2 (commented block)" do
    expect(raw).not_to include("audit contest findings")
    expect(raw).not_to match(%r{<h2\s+id=["']contests["']}i)
  end

  it "does not render the 'writeups & research posts' H2 (commented block)" do
    expect(raw).not_to include("writeups &amp; research posts")
    expect(raw).not_to include("writeups & research posts")
    expect(raw).not_to match(%r{<h2\s+id=["']writeups["']}i)
  end

  it "does not render the 'tools & contributions' H2 (if-false block)" do
    expect(raw).not_to include("tools &amp; contributions")
    expect(raw).not_to match(%r{<h2\s+id=["']tools["']}i)
  end
end
