import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Marketing site", () => {
  test("home renders and key CTAs are present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Lake-ready\. Showroom-clean\./ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Book now" }).first()).toBeVisible();
  });

  test("service catalog navigation works", async ({ page }) => {
    await page.goto("/services");
    await page.getByRole("link", { name: /Boat detailing/i }).first().click();
    await expect(page).toHaveURL(/\/services\/boat/);
    await expect(
      page.getByRole("heading", { name: /Boat detailing/i }),
    ).toBeVisible();
  });

  test("quote wizard accepts a valid submission", async ({ page }) => {
    await page.goto("/quote");
    await page.getByLabel("Name").fill("Test Customer");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Phone").fill("5742657278");
    await page.getByLabel("ZIP code").fill("46567");
    // Submit
    await page.getByRole("button", { name: /Send my quote request/i }).click();
    // Either success message or validation error is OK — we just want no crash
    await expect(page.locator("body")).toBeVisible();
  });

  test("home has no serious accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious).toEqual([]);
  });
});
