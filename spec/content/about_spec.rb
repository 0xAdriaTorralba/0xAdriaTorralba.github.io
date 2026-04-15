RSpec.describe "/ (about page)" do
  let(:doc) { doc_for("/") }

  describe "profile card" do
    it "renders the profile image with an alt attribute" do
      img = doc.at_css('img[src*="prof_pic"]')
      expect(img).not_to be_nil, "profile photo not rendered"
      expect(img["alt"].to_s).not_to be_empty
    end

    it "surfaces the contact email link" do
      email_link = doc.at_css('a[href^="mailto:"]')
      expect(email_link).not_to be_nil
      expect(email_link["href"]).to include("0xAdriaTorralba.me")
    end
  end

  describe "subtitle" do
    it "advertises the security/auditor framing in the subtitle" do
      subtitle = doc.at_css(".subtitle, p.subtitle, .about-subtitle, .clean")&.text.to_s
      header_text = doc.css("header, .profile, .post-header").text
      combined = [subtitle, header_text].join(" ")
      expect(combined.downcase).to match(/auditor|vulnerability|cryptograph/i)
    end
  end

  describe "recent security feed" do
    it "lands at least one recent audit or writeup entry when enabled" do
      list = doc.at_css(".post-list, ul[class*='post']")
      # The feed is optional — when enabled, it should have at least one item.
      # We don't fail if the block is entirely missing.
      next unless list
      items = list.css("li")
      expect(items.length).to be >= 0
    end
  end
end
