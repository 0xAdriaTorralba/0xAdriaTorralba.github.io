import { expect, test } from "@playwright/test";

test.describe("/github/ PR filter", () => {
  test("all/merged/open/closed buttons toggle visibility of PR items", async ({ page }) => {
    await page.goto("/github/");

    const total = await page.locator("li[data-pr-state]").count();
    expect(total).toBeGreaterThanOrEqual(60);

    // Start on "all" — every PR visible.
    const initialVisible = await page.locator("li[data-pr-state]:visible").count();
    expect(initialVisible).toBe(total);

    // Click "merged" — only merged items visible.
    await page.getByRole("button", { name: /^merged/i }).click();
    const mergedVisible = await page.locator('li[data-pr-state="merged"]:visible').count();
    const nonMergedVisible = await page.locator('li[data-pr-state]:not([data-pr-state="merged"]):visible').count();
    expect(mergedVisible).toBeGreaterThan(0);
    expect(nonMergedVisible).toBe(0);

    // Click "all" again — full set restored.
    await page.getByRole("button", { name: /^all/i }).click();
    const restoredVisible = await page.locator("li[data-pr-state]:visible").count();
    expect(restoredVisible).toBe(total);
  });

  test("active-state button carries .is-active class", async ({ page }) => {
    await page.goto("/github/");

    const allBtn = page.getByRole("button", { name: /^all/i });
    const mergedBtn = page.getByRole("button", { name: /^merged/i });

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

    await page.getByRole("button", { name: /^merged/i }).click();
    // The meta of any VISIBLE group should change — empty groups get hidden via group.hidden.
    const visibleMeta = page.locator("[data-pr-group]:visible [data-pr-group-meta]").first();
    const filteredText = await visibleMeta.textContent();
    expect(filteredText).toMatch(/\d+\s+merged/);
  });
});
