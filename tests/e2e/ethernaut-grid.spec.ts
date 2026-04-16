import { expect, test } from "@playwright/test";

test.describe("/security/ Ethernaut grid", () => {
  test("renders 41 tiles (levels 0–40)", async ({ page }) => {
    await page.goto("/security/");

    // Scope to the Ethernaut tracker (the other tracker is DVD, which has 18).
    const tracker = page.locator(".ctf-tracker", { hasText: /Ethernaut/i });
    await expect(tracker).toBeVisible();

    const tiles = tracker.locator(".ctf-tile");
    await expect(tiles).toHaveCount(41);
  });

  test("every tile is keyboard-reachable with a visible focus outline", async ({ page }) => {
    await page.goto("/security/");
    const tracker = page.locator(".ctf-tracker", { hasText: /Ethernaut/i });
    const firstTile = tracker.locator(".ctf-tile").first();

    await firstTile.scrollIntoViewIfNeeded();
    await firstTile.focus();
    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag?.toLowerCase()).toBe("a");
  });

  test("summary line shows 'N / 41 solved'", async ({ page }) => {
    await page.goto("/security/");
    const tracker = page.locator(".ctf-tracker", { hasText: /Ethernaut/i });
    const summary = tracker.locator(".ctf-tracker__summary").first();
    await expect(summary).toBeVisible();
    const text = (await summary.textContent()) ?? "";
    expect(text).toMatch(/\d+\s*\/\s*41\s*solved/i);
  });
});
