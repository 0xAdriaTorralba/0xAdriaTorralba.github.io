# Regression guard.
# - Bug: each "Cyfrin Updraft" cert must have a verification_url pointing at
#   https://profiles.cyfrin.io/... (not the course URL pasted in error).
#   This is a common copy-paste mistake when adding a new completion.
# - Why this test exists: the schema (schemas/certifications.json) enforces
#   this at data-validation time with a conditional pattern. This spec is
#   a belt-and-suspenders check rendered against the final output.

require "yaml"

RSpec.describe "Cyfrin cert verification URLs" do
  let(:certs) do
    data = YAML.safe_load(
      File.read(repo_path("_data/certifications.yml")),
      permitted_classes: [Date, Time],
    )
    data["certifications"]
  end

  it "every Cyfrin Updraft cert has a profiles.cyfrin.io verification URL" do
    cyfrin = certs.select { |c| c["provider"] == "Cyfrin Updraft" }
    expect(cyfrin).not_to be_empty, "no Cyfrin Updraft certs in data — adjust spec if track changed"

    cyfrin.each do |c|
      v = c["verification_url"]
      expect(v).to match(%r{^https://profiles\.cyfrin\.io/}),
        "cert '#{c['title']}' has wrong verification_url: #{v.inspect}. " \
        "Expected https://profiles.cyfrin.io/... (common mistake: pasting the course URL here)."
    end
  end
end
