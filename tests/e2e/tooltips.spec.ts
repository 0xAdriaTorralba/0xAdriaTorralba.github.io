import { expect, test } from "@playwright/test";

test.describe("/security/ info-tip tooltips", () => {
  test("keyboard focus reveals the tip panel", async ({ page }) => {
    await page.goto("/security/");

    const firstTip = page.locator(".tip").first();
    const firstPanel = firstTip.locator(".tip__panel");

    // Panel starts hidden (opacity 0 / visibility hidden).
    const initialOpacity = await firstPanel.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(initialOpacity).toBe("0");

    // Focus the trigger — CSS :focus-within toggles the panel visible.
    // Panel has a 0.15s opacity transition; poll until it settles.
    await firstTip.focus();
    await expect.poll(async () => firstPanel.evaluate((el) => window.getComputedStyle(el).opacity), { timeout: 2000 }).toBe("1");

    // Blur — panel hides again.
    await firstTip.evaluate((el: HTMLElement) => el.blur());
    await expect.poll(async () => firstPanel.evaluate((el) => window.getComputedStyle(el).opacity), { timeout: 2000 }).toBe("0");
  });

  test("hover reveals the panel on desktop", async ({ page }) => {
    test.skip(process.env.CI_HEADLESS_HOVER === "broken", "hover events flaky on some CI runners");
    await page.goto("/security/");
    const tip = page.locator(".tip").first();
    const panel = tip.locator(".tip__panel");

    await tip.hover();
    await expect.poll(async () => panel.evaluate((el) => window.getComputedStyle(el).opacity), { timeout: 2000 }).toBe("1");
  });

  test("every tip has tabindex=0 + role=button + a non-empty aria-label", async ({ page }) => {
    await page.goto("/security/");
    const tips = page.locator(".tip");
    const count = await tips.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const tip = tips.nth(i);
      await expect(tip).toHaveAttribute("tabindex", "0");
      await expect(tip).toHaveAttribute("role", "button");
      const label = await tip.getAttribute("aria-label");
      expect(label?.length ?? 0).toBeGreaterThan(20);
    }
  });
});
