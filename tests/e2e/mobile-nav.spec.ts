import { expect, test } from "@playwright/test";

test.describe("mobile navbar collapse", () => {
  test("hamburger toggle opens and closes the nav on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const toggle = page.locator(".navbar-toggler");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Nav collapse starts hidden on mobile.
    const navCollapse = page.locator("#navbarNav");
    await expect(navCollapse).not.toHaveClass(/show/);

    await toggle.click();
    await expect(navCollapse).toHaveClass(/show/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await toggle.click();
    await expect(navCollapse).not.toHaveClass(/show/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("security link is reachable from the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.locator(".navbar-toggler").click();

    const link = page.locator("#navbarNav a[href='/security/']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/security\/?$/);
  });
});
