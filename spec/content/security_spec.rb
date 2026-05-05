RSpec.describe "/security/" do
  let(:doc) { doc_for("/security/") }

  describe "H2 section anchors" do
    it "renders the three top-level section ids in order" do
      ids = doc.css("h2[id]").map { |h| h["id"] }
      expect(ids).to start_with(%w[audits certifications progress])
    end
  end

  describe "audits section" do
    it "has at least one published audit card" do
      cards = doc.css("#audits ~ .row .card, #audits + .row .card, .row .card.hoverable")
      expect(cards.length).to be >= 1
    end

    it "surfaces the OpenZeppelin firm badge on at least one card" do
      firms = doc.css(".card .badge").map(&:text).map(&:strip)
      expect(firms).to include("OpenZeppelin")
    end

    it "every audit card links to a public report URL" do
      doc.css(".card.hoverable").each do |card|
        links = card.css("a").map { |a| a["href"] }.compact
        expect(links.any? { |h| h.start_with?("http") }).to be(true),
          "card has no external report/repo/notes link: #{card.css('.card-title').text.strip}"
      end
    end
  end

  describe "certifications section" do
    it "renders the Cyfrin cert list with at least 4 entries" do
      items = doc.css(".cert-list .cert-item")
      expect(items.length).to be >= 4
    end

    it "every cert badge image has a descriptive alt attribute" do
      doc.css(".cert-badge img").each do |img|
        expect(img["alt"]).to match(/\A.+ badge\z/),
          "missing/short alt on #{img['src']}"
      end
    end

    it "every Cyfrin cert links to profiles.cyfrin.io for verification" do
      verify_links = doc.css(".cert-item a").select { |a| a.text.include?("Verify") }
      expect(verify_links.length).to be >= 1
      verify_links.each do |a|
        expect(a["href"]).to match(%r{^https://profiles\.cyfrin\.io/}),
          "verification URL doesn't point at Cyfrin Profiles: #{a['href']}"
      end
    end
  end

  describe "CTF / wargames section" do
    it "renders 41 Ethernaut tiles (levels 0-40)" do
      ethernaut_tiles = doc.css(".ctf-tracker").find do |trk|
        title = trk.css(".ctf-tracker__title").text
        title.include?("Ethernaut")
      end
      expect(ethernaut_tiles).not_to be_nil, "Ethernaut tracker block not found"
      tiles = ethernaut_tiles.css(".ctf-tile")
      expect(tiles.length).to eq(41)
    end

    it "summary line shows N / 41 solved format for Ethernaut" do
      ethernaut = doc.css(".ctf-tracker").find { |t| t.text.include?("Ethernaut") }
      summary = ethernaut.css(".ctf-tracker__summary").first&.text.to_s
      expect(summary).to match(%r{\d+\s*/\s*41\s*solved}i)
    end
  end

  describe "tooltip accessibility" do
    it "every .tip trigger is keyboard-focusable with an aria-label" do
      tips = doc.css(".tip")
      expect(tips.length).to be >= 3
      tips.each do |tip|
        expect(tip["tabindex"]).to eq("0"), "tip missing tabindex=0"
        expect(tip["role"]).to eq("button"), "tip missing role=button"
        expect(tip["aria-label"]).not_to be_nil
        expect(tip["aria-label"].to_s.length).to be > 20,
          "tip aria-label too short to be useful: #{tip['aria-label']}"
      end
    end

    it "every .tip has a nested .tip__panel describing the term" do
      doc.css(".tip").each do |tip|
        panel = tip.css(".tip__panel").first
        expect(panel).not_to be_nil, "tip missing its .tip__panel"
        expect(panel.text.strip.length).to be > 30
      end
    end
  end
end
