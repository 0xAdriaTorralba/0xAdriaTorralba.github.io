import { expect, test } from "@playwright/test";

// Theme toggle lives inside the navbar; on mobile it's tucked into the
// collapsed hamburger menu, which the mobile-nav.spec.ts tests cover. The
// theme-cycle behaviour itself is independent of viewport, so running it
// on the three desktop projects is enough.
test.describe("theme toggle (light / dark / system)", () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name.startsWith("mobile-"), "theme toggle is hidden inside the hamburger menu on mobile viewports");
  });

  test("clicking the toggle cycles theme attribute + persists to localStorage", async ({ page }) => {
    await page.goto("/");

    const toggle = page.locator("#light-toggle");
    await expect(toggle).toBeVisible();

    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme-setting"));

    await toggle.click();
    const afterFirst = await page.evaluate(() => document.documentElement.getAttribute("data-theme-setting"));
    expect(afterFirst).not.toBe(initialTheme);

    await toggle.click();
    const afterSecond = await page.evaluate(() => document.documentElement.getAttribute("data-theme-setting"));
    expect(afterSecond).not.toBe(afterFirst);

    // localStorage should have a theme entry after user interaction.
    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored).toMatch(/^(light|dark|system)$/);
  });

  test("stored theme survives a page reload", async ({ page }) => {
    await page.goto("/");
    await page.locator("#light-toggle").click();
    await page.locator("#light-toggle").click(); // land on a non-system state
    const before = await page.evaluate(() => localStorage.getItem("theme"));

    await page.reload();
    const after = await page.evaluate(() => localStorage.getItem("theme"));
    expect(after).toBe(before);
  });
});
