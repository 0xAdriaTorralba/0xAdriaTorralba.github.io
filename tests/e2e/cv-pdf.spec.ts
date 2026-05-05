import { expect, test } from "@playwright/test";

test.describe("/cv/ PDF download", () => {
  test("PDF link has target=_blank + rel=noopener", async ({ page }) => {
    await page.goto("/cv/");

    const pdfLink = page.locator('a[href*=".pdf"]').first();
    await expect(pdfLink).toBeVisible();

    await expect(pdfLink).toHaveAttribute("target", "_blank");
    const rel = await pdfLink.getAttribute("rel");
    expect(rel).toMatch(/noopener/);
  });

  test("PDF href resolves to a file the server can serve", async ({ page, request }) => {
    await page.goto("/cv/");
    const pdfLink = page.locator('a[href*=".pdf"]').first();
    const href = await pdfLink.getAttribute("href");
    expect(href).not.toBeNull();

    const absolute = new URL(href!, page.url()).toString();
    const resp = await request.get(absolute);
    expect(resp.status()).toBeLessThan(400);
    const contentType = resp.headers()["content-type"] || "";
    expect(contentType).toMatch(/pdf|octet-stream/i);
  });

  test("certifications list shows ≥ 4 entries", async ({ page }) => {
    await page.goto("/cv/");
    const items = page.locator(".cert-list .cert-item");
    await expect.poll(async () => items.count()).toBeGreaterThanOrEqual(4);
  });
});
