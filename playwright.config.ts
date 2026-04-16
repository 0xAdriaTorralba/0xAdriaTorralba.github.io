import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for browser-level E2E tests.
 *
 * Serves the built _site (or _site_test locally) via http-server and exercises
 * the interactive behaviours: PR filter, mobile-nav collapse, theme toggle,
 * tooltip focus, CV PDF link, Ethernaut grid keyboard nav, profile easter egg.
 *
 * CI sets CI=1 and points SITE_DIR at whichever folder build-strict produced.
 * Locally: `SITE_DIR=_site_test npx playwright test` after `make test-build`.
 */

const SITE_DIR = process.env.SITE_DIR || "_site_test";
const PORT = 8080;

export default defineConfig({
  testDir: "./tests/e2e",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],

  webServer: {
    // http-server v14 serves static files. `-s` silences per-request logs so
    // the CI log stays readable; `--cors` avoids spurious failures on pages
    // that load assets from the same origin.
    command: `npx http-server ${SITE_DIR} -p ${PORT} -s --cors`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
    { name: "webkit", use: devices["Desktop Safari"] },
    { name: "firefox", use: devices["Desktop Firefox"] },
    { name: "mobile-chrome", use: devices["Pixel 5"] },
    { name: "mobile-safari", use: devices["iPhone 13"] },
  ],
});
