import { expect, test } from "@playwright/test";

test.describe("profile-image easter egg (6 clicks → Telegram)", () => {
  test("6 rapid clicks trigger navigation to the Telegram URL", async ({ page }) => {
    // Intercept ALL requests to t.me so we capture the navigation attempt
    // without actually loading the external origin.
    let capturedUrl: string | null = null;
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (url.includes("t.me/")) {
        capturedUrl = url;
        // Abort the navigation to avoid loading an external page.
        route.abort();
        return;
      }
      route.continue();
    });

    await page.goto("/");

    const avatar = page.locator("#profile-container img");
    await expect(avatar).toBeVisible();

    for (let i = 0; i < 6; i++) {
      await avatar.click({ delay: 120 });
    }

    await expect.poll(() => capturedUrl, { timeout: 3000 }).toContain("t.me/AdriaTorralba");
  });

  test("a single click does not navigate", async ({ page }) => {
    await page.goto("/");
    const avatar = page.locator("#profile-container img");
    const before = page.url();
    await avatar.click();
    await page.waitForTimeout(300);
    expect(page.url()).toBe(before);
  });

  test("counter resets after 3s of inactivity", async ({ page }) => {
    await page.goto("/");
    const avatar = page.locator("#profile-container img");

    for (let i = 0; i < 3; i++) {
      await avatar.click({ delay: 120 });
    }
    // Wait > 3s for the reset timeout.
    await page.waitForTimeout(3500);
    const before = page.url();
    // Three more clicks should NOT trigger navigation (counter was reset).
    for (let i = 0; i < 3; i++) {
      await avatar.click({ delay: 120 });
    }
    await page.waitForTimeout(300);
    expect(page.url()).toBe(before);
  });
});
