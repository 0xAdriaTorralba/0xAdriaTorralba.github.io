# Regression guard.
# - Bug: _data/.cv.yml is a dot-prefixed draft file intentionally skipped by Jekyll.
#   A malformed YAML block there once crashed Prettier's YAML parser (PR #14).
#   Separately, if a future Jekyll version starts picking up dotfiles, the draft
#   content would silently leak onto /cv/.
# - Why this test exists: two invariants — the file stays valid YAML so Prettier
#   keeps passing, and its scratch content never reaches the rendered /cv/ page.

require "yaml"

RSpec.describe "_data/.cv.yml draft file" do
  let(:path) { repo_path("_data/.cv.yml") }

  it "exists and parses as valid YAML" do
    expect(File.file?(path)).to be(true)
    expect { YAML.safe_load(File.read(path), permitted_classes: [Date, Time]) }.not_to raise_error
  end

  it "does not leak its placeholder content onto /cv/" do
    draft = YAML.safe_load(File.read(path), permitted_classes: [Date, Time])
    rendered = raw_for("/cv/")

    # Flatten the draft to find any placeholder strings we'd expect to notice.
    strings = []
    stack = [draft]
    until stack.empty?
      node = stack.pop
      case node
      when String then strings << node
      when Array then stack.concat(node)
      when Hash then stack.concat(node.values)
      end
    end

    # Look for recognisably-placeholder-y fragments (case-insensitive).
    placeholder_markers = ["description 1", "description 2", "placeholder", "lorem ipsum"]
    hits = strings.map(&:downcase).select do |s|
      placeholder_markers.any? { |m| s.include?(m) }
    end

    hits.each do |h|
      expect(rendered).not_to include(h),
        "draft placeholder '#{h}' leaked onto /cv/ — _data/.cv.yml should stay unwired"
    end
  end
end
