# Regression guard.
# - Bug: the `<!-- prettier-ignore -->` directive in _includes/github_heatmap.liquid
#   protects a single-line <a><img> block from being reformatted. The directive
#   is a contract: "the next HTML node must fit on one line." If somebody adds
#   more prettier-ignore comments elsewhere, the same contract should hold.
# - Why this test exists: any prettier-ignore in a .liquid include that sits
#   downstream of kramdown must guard exactly ONE block-level HTML line.

RSpec.describe "prettier-ignore directives in Liquid includes" do
  it "every <!-- prettier-ignore --> is followed by a single line (≤ 800 chars)" do
    offenders = []
    Dir.glob(File.join(REPO_ROOT, "_includes/**/*.liquid")).each do |path|
      lines = File.readlines(path)
      lines.each_with_index do |line, idx|
        next unless line.include?("<!-- prettier-ignore -->")

        # Skip leading whitespace and find the next non-empty line.
        next_idx = idx + 1
        next_idx += 1 while next_idx < lines.length && lines[next_idx].strip.empty?
        next_line = lines[next_idx]
        next if next_line.nil?

        # The next line must be exactly one line (ends with \n and is not a
        # block-opening line that continues on the next line).
        next_stripped = next_line.rstrip
        if next_stripped.length > 800
          offenders << "#{path}:#{idx + 1} — next line too long (#{next_stripped.length} chars)"
        elsif next_stripped.end_with?("=", "<", '"') && !next_stripped.match?(/>\s*$|>\s*<[^>]+>\s*$/)
          offenders << "#{path}:#{idx + 1} — next HTML node appears to span multiple lines"
        end
      end
    end

    expect(offenders).to be_empty,
      "prettier-ignore guards are meant to protect single-line HTML fragments:\n#{offenders.join("\n")}"
  end
end
