import { expect, test } from "@playwright/test";

const reportKpis = [
  { label: "Revenue Generated", value: "$186,420" },
  { label: "Qualified Leads", value: "86" },
  { label: "Completed Bookings", value: "396" },
  { label: "Automation Savings", value: "412 hours" },
] as const;

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

test("reports route renders its header, navigation state, and KPI summary", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/reports");

  await expect(page.getByLabel("Reports dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Reports", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Understand performance, growth, automation, and operational outcomes.",
    ),
  ).toBeVisible();
  await expect(
    page.getByTestId("desktop-sidebar").getByRole("link", { name: "Reports" }),
  ).toHaveAttribute("aria-current", "page");

  for (const kpi of reportKpis) {
    const card = page.getByLabel(new RegExp(`^${kpi.label}:`));
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }
  await expectNoHorizontalOverflow(page);
});

test("performance period control changes the visible report summary", async ({
  page,
}) => {
  await page.goto("/reports");
  const weekly = page.getByRole("button", { name: "Weekly", exact: true });
  const monthly = page.getByRole("button", { name: "Monthly", exact: true });
  const summary = page.getByTestId("performance-summary");

  await expect(weekly).toHaveAttribute("aria-pressed", "true");
  await expect(summary).toContainText("7 daily points");
  await monthly.click();
  await expect(monthly).toHaveAttribute("aria-pressed", "true");
  await expect(weekly).toHaveAttribute("aria-pressed", "false");
  await expect(summary).toContainText("6 monthly points");
  await expect(
    page.getByTestId("performance-overview").locator("svg.recharts-surface"),
  ).toBeVisible();
});

test("funnel, channels, efficiency metrics, and insights render", async ({
  page,
}) => {
  await page.goto("/reports");

  await expect(page.locator('[data-testid^="funnel-stage-"]')).toHaveCount(5);
  await expect(page.locator('[data-testid^="channel-row-"]')).toHaveCount(5);
  for (const channel of [
    "AI Call",
    "Website",
    "Referral",
    "WhatsApp",
    "Staff Entry",
  ]) {
    await expect(
      page
        .getByTestId("channel-performance-table")
        .getByText(channel, { exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByTestId("operational-efficiency")).toContainText(
    "AI-handled interactions",
  );
  await expect(page.getByTestId("operational-efficiency")).toContainText(
    "Knowledge coverage",
  );
  await expect(page.getByTestId("report-insights")).toContainText(
    "Growth opportunity",
  );
  await expect(page.getByTestId("report-insights")).toContainText(
    "Attention required",
  );
});

test("report actions return local-only inline feedback", async ({ page }) => {
  await page.goto("/reports");

  await page.getByRole("button", { name: "Export report" }).click();
  await expect(page.getByTestId("reports-action-feedback")).toContainText(
    "Report export was prepared in this local preview.",
  );
  await page.getByRole("button", { name: "Schedule report" }).click();
  await expect(page.getByTestId("reports-action-feedback")).toContainText(
    "Weekly report scheduling was enabled in this local preview.",
  );
});

test("required viewports stay contained in the single dashboard scroller", async ({
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
    await page.goto("/reports");
    await expect(page.getByLabel("Reports dashboard")).toBeVisible();
    await expect(
      page.getByTestId("performance-overview").locator("svg.recharts-surface"),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const containment = await page.evaluate(() => {
      const content = document.querySelector<HTMLElement>(
        '[data-testid="dashboard-content"]',
      );
      if (!content) throw new Error("Dashboard content is missing");
      return {
        viewportHeight: window.innerHeight,
        htmlHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight,
        contentOverflowY: getComputedStyle(content).overflowY,
        contentScrolls: content.scrollHeight > content.clientHeight,
      };
    });
    expect(containment.htmlHeight).toBe(containment.viewportHeight);
    expect(containment.bodyHeight).toBe(containment.viewportHeight);
    expect(containment.contentOverflowY).toBe("auto");
    expect(containment.contentScrolls).toBe(true);
  }
});

test("mobile layout pairs KPIs, uses channel cards, and includes active Reports navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/reports");

  const kpis = ["revenue", "leads", "bookings", "savings"].map((id) =>
    page.getByTestId(`reports-kpi-${id}`),
  );
  const boxes = await Promise.all(kpis.map((card) => card.boundingBox()));
  expect(Math.round(boxes[0]?.y ?? 0)).toBe(Math.round(boxes[1]?.y ?? 0));
  expect(Math.round(boxes[2]?.y ?? 0)).toBe(Math.round(boxes[3]?.y ?? 0));
  expect(boxes[2]?.y ?? 0).toBeGreaterThan(boxes[0]?.y ?? 0);

  await expect(page.getByTestId("channel-performance-table")).toBeHidden();
  await expect(page.locator('[data-testid^="channel-card-"]')).toHaveCount(5);
  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Dashboard navigation" });
  await expect(drawer.getByRole("link", { name: "Reports" })).toBeVisible();
  await expect(drawer.getByRole("link", { name: "Reports" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expectNoHorizontalOverflow(page);
});

test("completed dashboard routes still load", async ({ page }) => {
  for (const route of [
    "/",
    "/calls",
    "/bookings",
    "/leads",
    "/customers",
    "/ai-agents",
    "/knowledge-base",
    "/integrations",
  ]) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    expect((await page.title()).length).toBeGreaterThan(0);
  }
});
