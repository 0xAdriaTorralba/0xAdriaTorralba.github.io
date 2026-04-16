RSpec.describe "audits collection" do
  describe "TEMPLATE.md" do
    it "does NOT ship to the built site (its published flag is false)" do
      template_paths = Dir.glob(File.join(SITE_DIR, "audits/template/**/index.html"))
      expect(template_paths).to be_empty, "TEMPLATE.md accidentally rendered — check front matter published:false"

      # Extra: the rendered security page must not contain the template's placeholder title.
      sec = raw_for("/security/")
      expect(sec).not_to include("<Client>"), "template placeholder title leaked into /security/"
    end
  end

  describe "published audit entries" do
    it "every published entry renders an individual page" do
      Dir.glob(File.join(REPO_ROOT, "_audits/*.md")).each do |md|
        fm = File.read(md).match(/\A---\n(.*?)\n---/m)&.[](1)
        next unless fm
        next if md.end_with?("TEMPLATE.md")
        next unless fm.include?("published: true")

        slug = File.basename(md, ".md")
        rendered = File.join(SITE_DIR, "audits", slug, "index.html")
        expect(File.exist?(rendered)).to be(true),
          "published audit #{slug} did not render to #{rendered}"
      end
    end

    it "the ZisK audit renders on /security/ with its severity pills" do
      doc = doc_for("/security/")
      critical_badges = doc.css(".card .badge").select { |b| b.text.strip.match?(/\d+\s+critical/i) }
      expect(critical_badges.length).to be >= 1,
        "expected at least one card showing a 'N critical' severity pill"
    end
  end
end
