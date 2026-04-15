RSpec.describe "/github/" do
  let(:doc) { doc_for("/github/") }

  describe "H2 section anchors" do
    it "renders github-activity + contributions H2 ids" do
      ids = doc.css("h2[id]").map { |h| h["id"] }
      expect(ids).to include("github-activity", "contributions")
    end
  end

  describe "GitHub heatmap" do
    it "embeds the ghchart.rshah.org SVG wrapped in an anchor to the profile" do
      anchor = doc.at_css('a[href*="github.com/"] img[src*="ghchart.rshah.org"]')
      expect(anchor).not_to be_nil, "heatmap anchor/img not found"
    end

    it "heatmap anchor has a descriptive aria-label" do
      anchor = doc.at_css('a[aria-label*="GitHub contribution graph"]')
      expect(anchor).not_to be_nil
    end

    it "heatmap img has a non-empty alt attribute" do
      img = doc.at_css('img[src*="ghchart.rshah.org"]')
      expect(img).not_to be_nil
      expect(img["alt"].to_s.length).to be > 10
    end
  end

  describe "contributions list" do
    it "renders at least 60 PR entries (currently 64+)" do
      items = doc.css("li[data-pr-state]")
      expect(items.length).to be >= 60
    end

    it "every PR item carries a state in {merged, open, closed}" do
      states = doc.css("li[data-pr-state]").map { |li| li["data-pr-state"] }.uniq
      invalid = states - %w[merged open closed]
      expect(invalid).to be_empty, "unexpected PR state values: #{invalid.inspect}"
    end

    it "filter bar exposes an 'all' button + at least one state-specific button" do
      filter = doc.at_css(".pr-filter")
      expect(filter).not_to be_nil
      filters = filter.css(".pr-filter__btn").map { |b| b["data-filter"] }
      expect(filters).to include("all")
      expect(filters & %w[merged open closed]).not_to be_empty
    end

    it "each PR item links to a GitHub pull request URL" do
      doc.css("li[data-pr-state]").first(10).each do |li|
        href = li.at_css("a")&.[]("href")
        expect(href).to match(%r{^https://github\.com/.+/pull/\d+})
      end
    end

    it "groups PRs into recognized category sections" do
      groups = doc.css("[data-pr-group]")
      expect(groups.length).to be >= 2
      titles = groups.map { |g| g.at_css(".pr-group__title")&.text&.strip }.compact
      known = ["Blockchain & ZK", "AI", "Developer tooling", "Personal projects", "Portfolio site", "Academic coursework"]
      expect(titles & known).not_to be_empty
    end
  end
end
