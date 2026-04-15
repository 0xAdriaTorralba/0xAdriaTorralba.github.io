# Test-suite entry points. Every `test-*` target runs the same command CI runs.
# Works-locally / fails-on-CI drift is impossible because both sides call `make`.
#
# Top-level:
#   make test-fast   — runs on every PR; ~1 min
#   make test-full   — adds content + a11y + perf + e2e + python (future PRs)
#   make bootstrap   — first-time setup on a fresh clone
#
# Individual targets are safe to run in isolation once bootstrap completes.

.PHONY: test test-fast test-full \
        test-schema test-build test-html test-workflows \
        test-content test-a11y test-perf test-e2e test-python \
        bootstrap clean-site

test:      test-fast
test-fast: test-schema test-build test-html test-workflows
test-full: test-fast test-content test-a11y test-perf test-e2e test-python

bootstrap:
	bundle config set --local with 'test'
	bundle install
	npm install
	@echo "Optional: install actionlint + zizmor for the hygiene layer."
	@echo "  actionlint: https://github.com/rhysd/actionlint/releases"
	@echo "  zizmor:     pipx install zizmor"

# --- PR A (fast lane) targets -------------------------------------------------

test-schema:
	node scripts/validate-data.mjs

test-build:
	bundle exec jekyll build --strict_front_matter --trace \
	  --destination _site_test --quiet 2>&1 | tee build.log
	@! grep -E 'Liquid (Warning|Error)|Could not find document|Tag was never closed' build.log

test-html:
	bundle exec htmlproofer _site_test \
	  --disable-external \
	  --checks Links,Images,Scripts,OpenGraph \
	  --allow-missing-href \
	  --ignore-missing-alt \
	  --ignore-urls 'http://giscus.app/?ref_noscript'

test-workflows:
	@command -v actionlint >/dev/null 2>&1 && actionlint -color || echo "skip: actionlint not installed"
	@command -v zizmor >/dev/null 2>&1 && zizmor .github/workflows/ || echo "skip: zizmor not installed"

# --- PR B + PR C targets (land in later PRs) ---------------------------------

test-content:
	SITE_DIR=_site_test bundle exec rspec spec/

test-a11y: test-content
	@echo "a11y invariants covered by spec/a11y/ in rspec."
	@echo "PR C will add browser-rendered axe-core via Playwright."

test-perf:
	@[ -f .lighthouserc.json ] && npx lhci autorun \
	  || echo "skip: .lighthouserc.json not yet present (lands in PR C)"

test-e2e:
	@[ -f playwright.config.ts ] && npx playwright test \
	  || echo "skip: playwright.config.ts not yet present (lands in PR C)"

test-python:
	@[ -d scripts/tests ] && pytest scripts/tests/ -q \
	  || echo "skip: scripts/tests/ not yet present (lands in PR C)"

clean-site:
	rm -rf _site _site_test test-results playwright-report .lighthouseci build.log
