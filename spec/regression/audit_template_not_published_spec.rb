# Regression guard.
# - Bug: _audits/TEMPLATE.md is a blueprint with `published: false` and
#   placeholder fields like "<Client>". If someone toggles published:true
#   or copies the template without renaming, the placeholders would appear
#   on /security/ or at /audits/template/.
# - Why this test exists: lock down that the template never ships as a
#   public page and its placeholder title never leaks into any page.

RSpec.describe "audit template safety" do
  it "TEMPLATE.md does not render to a _site/audits/template/ page" do
    path = File.join(SITE_DIR, "audits", "template", "index.html")
    expect(File.exist?(path)).to be(false),
      "_audits/TEMPLATE.md rendered to #{path} — check its published flag"
  end

  it "placeholder strings from the template do not appear on any page" do
    placeholder_strings = [
      "&lt;Client&gt;",
      "<Client>",
      "&lt;Scope&gt;",
      "<Scope>",
      "&lt;Short name of the finding&gt;",
      "Protocol or firm name",
    ]

    %w[/security/ /].each do |permalink|
      raw = raw_for(permalink)
      placeholder_strings.each do |ph|
        expect(raw).not_to include(ph),
          "placeholder '#{ph}' from TEMPLATE.md leaked into #{permalink}"
      end
    end
  end
end
