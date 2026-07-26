import { expect, test } from "@playwright/test";

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);
}

test("Knowledge Base loads with route-aware navigation and KPIs", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/knowledge-base");
  await expect(page.getByLabel("Knowledge Base dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Knowledge Base", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Manage the information your AI agents use to answer and act accurately.",
    ),
  ).toBeVisible();
  await expect(
    page
      .getByTestId("desktop-sidebar")
      .getByRole("link", { name: "Knowledge Base" }),
  ).toHaveAttribute("aria-current", "page");
  for (const id of ["total", "published", "review", "coverage"])
    await expect(page.getByTestId(`knowledge-kpi-${id}`)).toBeVisible();
  await expect(page.getByText("12 articles shown")).toBeVisible();
  await expect(page.getByTestId("knowledge-coverage")).toBeVisible();
  await expect(page.getByTestId("knowledge-attention")).toBeVisible();
});

test("search and all filters work together and clear", async ({ page }) => {
  await page.goto("/knowledge-base");
  const search = page.getByRole("searchbox", {
    name: "Search by article title, summary, tags, or owner",
  });
  await search.fill("pricing overview");
  await expect(page.getByText("1 article shown")).toBeVisible();
  await expect(
    page.getByTestId("knowledge-row-pricing-overview"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear knowledge filters" }).click();
  await expect(page.getByText("12 articles shown")).toBeVisible();

  await page
    .getByRole("combobox", { name: "Filter articles by category" })
    .click();
  await page.getByRole("option", { name: "Pricing", exact: true }).click();
  await expect(page.getByText("2 articles shown")).toBeVisible();
  await page.getByRole("button", { name: "Clear knowledge filters" }).click();

  await page
    .getByRole("combobox", { name: "Filter articles by status" })
    .click();
  await page.getByRole("option", { name: "Needs Review" }).click();
  await expect(page.getByText("3 articles shown")).toBeVisible();
  await page.getByRole("button", { name: "Clear knowledge filters" }).click();

  await page
    .getByRole("combobox", { name: "Filter articles by freshness" })
    .click();
  await page.getByRole("option", { name: "Outdated" }).click();
  await expect(page.getByText("3 articles shown")).toBeVisible();
  await page.getByRole("button", { name: "Clear knowledge filters" }).click();
  await expect(search).toHaveValue("");
});

test("sort control changes article order", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/knowledge-base");
  const rows = page.locator('[data-testid^="knowledge-row-"]');
  await expect(rows.first()).toContainText("Urgent request routing guide");
  const sort = page.getByRole("combobox", { name: "Sort articles" });
  await sort.click();
  await page.getByRole("option", { name: "Most used" }).click();
  await expect(rows.first()).toContainText("Online scheduling FAQ");
  await sort.click();
  await page.getByRole("option", { name: "Article title" }).click();
  await expect(rows.first()).toContainText("2026 service pricing overview");
  await expect(page.getByText("12 articles shown")).toBeVisible();
});

test("article detail sheet opens, gives local feedback, and closes", async ({
  page,
}) => {
  await page.goto("/knowledge-base");
  await page
    .getByRole("button", {
      name: "View article details for 2026 service pricing overview",
    })
    .click();
  const sheet = page.getByTestId("article-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "2026 service pricing overview" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Knowledge health" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Recent activity" }),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Mark reviewed" }).click();
  await expect(
    sheet.getByText(/was marked reviewed in this local preview/),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Publish" }).click();
  await expect(
    sheet.getByText(/is now published in this local preview/),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Close article details" }).click();
  await expect(sheet).toBeHidden();
});

test("desktop and mobile layouts have no horizontal overflow", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1366, height: 850 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/knowledge-base");
    await expectNoHorizontalOverflow(page);
    if (viewport.width < 1024)
      await expect(page.getByTestId("mobile-knowledge-card")).toHaveCount(12);
  }
  const cards = ["total", "published", "review", "coverage"].map((id) =>
    page.getByTestId(`knowledge-kpi-${id}`),
  );
  const boxes = await Promise.all(cards.map((card) => card.boundingBox()));
  expect(Math.round(boxes[0]?.y ?? 0)).toBe(Math.round(boxes[1]?.y ?? 0));
  await page
    .getByRole("button", {
      name: "View article details for What to expect from your first consultation",
    })
    .click();
  expect(
    (await page.getByTestId("article-detail-sheet").boundingBox())?.width ?? 0,
  ).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
});

test("existing completed dashboard routes still work", async ({ page }) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
    { route: "/bookings", label: "Bookings dashboard" },
    { route: "/leads", label: "Leads dashboard" },
    { route: "/customers", label: "Customers dashboard" },
    { route: "/ai-agents", label: "AI Agents dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
