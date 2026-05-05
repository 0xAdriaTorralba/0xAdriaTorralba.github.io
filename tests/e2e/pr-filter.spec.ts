import { expect, test } from "@playwright/test";

test.describe("/github/ PR filter", () => {
  test("all/merged/open/closed buttons toggle visibility of PR items", async ({ page }) => {
    await page.goto("/github/");

    const stateBar = page.locator("[data-pr-filter]");
    const total = await page.locator("li[data-pr-state]").count();
    expect(total).toBeGreaterThanOrEqual(60);

    // Start on "all" — every PR visible.
    const initialVisible = await page.locator("li[data-pr-state]:visible").count();
    expect(initialVisible).toBe(total);

    // Click state-filter "merged" — only merged items visible.
    await stateBar.getByRole("button", { name: /^merged/i }).click();
    const mergedVisible = await page.locator('li[data-pr-state="merged"]:visible').count();
    const nonMergedVisible = await page.locator('li[data-pr-state]:not([data-pr-state="merged"]):visible').count();
    expect(mergedVisible).toBeGreaterThan(0);
    expect(nonMergedVisible).toBe(0);

    // Click state-filter "all" again — full set restored.
    await stateBar.getByRole("button", { name: /^all/i }).click();
    const restoredVisible = await page.locator("li[data-pr-state]:visible").count();
    expect(restoredVisible).toBe(total);
  });

  test("active-state button carries .is-active class", async ({ page }) => {
    await page.goto("/github/");

    const stateBar = page.locator("[data-pr-filter]");
    const allBtn = stateBar.getByRole("button", { name: /^all/i });
    const mergedBtn = stateBar.getByRole("button", { name: /^merged/i });

    await expect(allBtn).toHaveClass(/is-active/);
    await expect(mergedBtn).not.toHaveClass(/is-active/);

    await mergedBtn.click();
    await expect(mergedBtn).toHaveClass(/is-active/);
    await expect(allBtn).not.toHaveClass(/is-active/);
  });

  test("group-level meta updates when filtering", async ({ page }) => {
    await page.goto("/github/");

    const firstMeta = page.locator("[data-pr-group-meta]").first();
    const initialText = await firstMeta.textContent();
    expect(initialText).toMatch(/\d+\s+PRs?/);

    const stateBar = page.locator("[data-pr-filter]");
    await stateBar.getByRole("button", { name: /^merged/i }).click();
    // After PR #22 added the scope filter, the JS collapses the per-state
    // breakdown to "<N> shown" whenever any non-default filter is active.
    const visibleMeta = page.locator("[data-pr-group]:visible [data-pr-group-meta]").first();
    const filteredText = await visibleMeta.textContent();
    expect(filteredText).toMatch(/\d+\s+shown/);
  });
});
