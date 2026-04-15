# Accessibility invariants for the custom pages (/security/, /github/, /cv/).
# These are the three pages carrying the "prove I can ship quality" narrative
# for audit-role interviewers, so they get stricter per-page a11y checks than
# html-proofer's site-wide (relaxed) baseline.
#
# PR C will add browser-rendered axe-core via Playwright for dynamic checks
# (focus management, colour contrast, ARIA live regions). These rspec checks
# cover the static-HTML invariants that don't need a browser.

RSpec.describe "accessibility of custom pages" do
  %w[/security/ /github/ /cv/].each do |permalink|
    describe permalink do
      let(:doc) { doc_for(permalink) }

      it "every <img> inside the page body has a non-empty alt attribute" do
        body = doc.at_css("main, .post, .container-fluid, body")
        imgs = body.css("img")
        missing = imgs.reject do |img|
          alt = img["alt"]
          !alt.nil? && !alt.strip.empty?
        end
        # Allow theme-footer / navbar images that we can't control (they
        # render the same on every page, so we scope to content imgs only).
        missing = missing.reject { |img| img.ancestors("nav, footer, #footer, .navbar").any? }
        expect(missing).to be_empty,
          "missing alt on: " + missing.map { |i| i["src"] || i.to_s }.join(", ")
      end

      it "every interactive control has a role/label the keyboard can reach" do
        # Every <a> must have either textual content or aria-label, not both empty.
        doc.css("main a, .post a, .container-fluid a").each do |a|
          text = a.text.strip
          label = a["aria-label"].to_s.strip
          title = a["title"].to_s.strip
          next if a.ancestors("nav, footer").any?
          has_label = !text.empty? || !label.empty? || !title.empty?
          expect(has_label).to be(true),
            "unlabeled <a> tag: #{a.to_html[0, 140]}"
        end
      end

      it "heading hierarchy has no skipped levels (H1 -> H2 -> H3 …)" do
        headings = doc.css("h1, h2, h3, h4, h5, h6").map { |h| h.name[1].to_i }
        # Check for jumps of > 1 between consecutive headings (e.g. h2 -> h4).
        skipped = headings.each_cons(2).find_all { |a, b| b > a && (b - a) > 1 }
        expect(skipped).to be_empty, "heading levels skipped: #{skipped.inspect} (full order: #{headings.inspect})"
      end
    end
  end

  describe "/security/ tooltip pattern" do
    let(:doc) { doc_for("/security/") }

    it "every .tip panel is role=tooltip (assistive-tech contract)" do
      panels = doc.css(".tip .tip__panel")
      expect(panels.length).to be >= 3
      panels.each do |p|
        expect(p["role"]).to eq("tooltip"),
          "tip panel without role=tooltip: #{p.to_html[0, 100]}"
      end
    end
  end

  describe "/github/ heatmap" do
    let(:doc) { doc_for("/github/") }

    it "heatmap anchor has aria-label describing the SVG purpose" do
      anchor = doc.at_css('a[aria-label*="contribution graph"]')
      expect(anchor).not_to be_nil
      expect(anchor["aria-label"].length).to be > 20
    end
  end
end
