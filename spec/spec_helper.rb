# Shared Nokogiri helpers for content + regression specs.
# The SITE_DIR env var lets CI and local use point at different build outputs
# (_site vs _site_test). Defaults to _site, matching the deploy.yml build-strict
# job's output directory.

require "nokogiri"
require "yaml"
require "date"
require "time"

SITE_DIR = ENV.fetch("SITE_DIR", File.expand_path("../_site", __dir__))
REPO_ROOT = File.expand_path("..", __dir__)

def site_path(relative)
  File.join(SITE_DIR, relative)
end

def repo_path(relative)
  File.join(REPO_ROOT, relative)
end

def doc_for(permalink)
  # Accepts "security" or "/security/" or "security/index.html"
  cleaned = permalink.sub(%r{^/}, "").sub(%r{/$}, "")
  candidates = [
    File.join(SITE_DIR, cleaned, "index.html"),
    File.join(SITE_DIR, "#{cleaned}.html"),
    File.join(SITE_DIR, cleaned),
  ]
  path = candidates.find { |p| File.file?(p) }
  raise "rendered HTML not found for permalink '#{permalink}' — looked in #{candidates.inspect}" unless path
  Nokogiri::HTML(File.read(path))
end

def raw_for(permalink)
  cleaned = permalink.sub(%r{^/}, "").sub(%r{/$}, "")
  candidates = [
    File.join(SITE_DIR, cleaned, "index.html"),
    File.join(SITE_DIR, "#{cleaned}.html"),
    File.join(SITE_DIR, cleaned),
  ]
  path = candidates.find { |p| File.file?(p) }
  raise "rendered HTML not found for permalink '#{permalink}'" unless path
  File.read(path)
end

RSpec.configure do |c|
  c.disable_monkey_patching!
  c.expect_with(:rspec) { |e| e.max_formatted_output_length = 500 }
end
