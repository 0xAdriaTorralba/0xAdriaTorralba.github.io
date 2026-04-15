RSpec.describe "/cv/" do
  let(:doc) { doc_for("/cv/") }

  describe "PDF download" do
    it "prominently links to the CV PDF" do
      pdf_links = doc.css('a[href*=".pdf"]')
      expect(pdf_links.length).to be >= 1
      href = pdf_links.first["href"]
      expect(href).to include("CV_AdriaTorralba-Agell.pdf")
    end
  end

  describe "certifications section" do
    it "renders the shared certifications include" do
      items = doc.css(".cert-list .cert-item")
      expect(items.length).to be >= 4
    end

    it "renders the 'certifications & coursework' H2 label" do
      h2_texts = doc.css("h2").map { |h| h.text.strip.downcase }
      expect(h2_texts.any? { |t| t.include?("certifications") && t.include?("coursework") }).to be(true)
    end

    it "every cert item has an external link (course page)" do
      doc.css(".cert-list .cert-item").each do |item|
        link = item.at_css('a[href^="http"]')
        expect(link).not_to be_nil, "cert item missing external link: #{item.text.strip[0, 80]}"
      end
    end
  end
end
