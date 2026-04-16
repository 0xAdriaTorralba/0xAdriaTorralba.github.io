# Regression guard.
# - Bug: _data/ctf_progress.yml manually tracks Ethernaut levels 0-40.
#   An accidental delete or duplicate would break the "N / 41 solved"
#   narrative. OpenZeppelin itself can add new levels; if they do, the
#   count needs to be updated deliberately (this test signals that).
# - Why this test exists: catches accidental edits; reminds us to review
#   the count when OpenZeppelin adds a level.

require "yaml"

RSpec.describe "_data/ctf_progress.yml Ethernaut completeness" do
  let(:data) do
    YAML.safe_load(File.read(repo_path("_data/ctf_progress.yml")), permitted_classes: [Date, Time])
  end

  it "tracks exactly 41 Ethernaut levels (0 through 40)" do
    levels = data.dig("ethernaut", "levels")
    expect(levels).not_to be_nil
    expect(levels.length).to eq(41),
      "expected 41 Ethernaut levels (0-40); got #{levels.length}. " \
      "If OZ added a level, update this count deliberately + bump schemas/ctf_progress.json minItems/maxItems."

    nums = levels.map { |l| l["num"] }
    expect(nums).to eq((0..40).to_a),
      "Ethernaut level numbers must be consecutive 0..40; got #{nums.inspect}"
  end

  it "tracks exactly 18 Damn Vulnerable DeFi challenges (1 through 18)" do
    challenges = data.dig("damn_vulnerable_defi", "challenges")
    expect(challenges).not_to be_nil
    expect(challenges.length).to eq(18)
    nums = challenges.map { |c| c["num"] }
    expect(nums).to eq((1..18).to_a)
  end
end
