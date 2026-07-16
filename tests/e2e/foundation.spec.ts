import { expect, test } from "@playwright/test";

const routes = ["/", "/onboarding", "/overview"] as const;
const viewports = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

test("foundation routes load with active tokens, fonts, and stable widths", async ({
  page,
}) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      const response = await page.goto(route);

      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);
    }
  }

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "FrontOS Foundation Ready." }),
  ).toBeVisible();

  const styles = await page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const heading = document.querySelector("h1");

    return {
      electricBlue: rootStyles
        .getPropertyValue("--aurora-electric-blue")
        .trim(),
      bodyFont: getComputedStyle(document.body).fontFamily,
      headingFont: heading ? getComputedStyle(heading).fontFamily : "",
    };
  });

  expect(styles.electricBlue.toLowerCase()).toBe("#2878ff");
  expect(styles.bodyFont).toContain("Inter");
  expect(styles.headingFont).toContain("Inter Tight");
});
