import { expect, test } from "@playwright/test";

const kpis = [
  { label: "Total Calls", value: "1,248" },
  { label: "Bookings", value: "328" },
  { label: "Leads Captured", value: "214" },
  { label: "Revenue Impact", value: "$42,680" },
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

test("overview dashboard renders all approved desktop sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/overview");

  for (const kpi of kpis) {
    const card = page.getByLabel(new RegExp(`^${kpi.label}:`));
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  const callTrend = page.getByTestId("call-trend-chart");
  const services = page.getByTestId("top-services-chart");
  await expect(callTrend).toBeVisible();
  await expect(callTrend.locator("svg.recharts-surface")).toBeVisible();
  await expect(page.getByRole("button", { name: "Weekly" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(services).toBeVisible();
  await expect(services.locator("svg.recharts-surface")).toBeVisible();

  await expect(page.getByTestId("recent-activity")).toBeVisible();
  await expect(page.getByTestId("upcoming")).toBeVisible();
  await expect(page.getByTestId("ai-agent-performance")).toBeVisible();
  await expect(page.getByTestId("integrations")).toBeVisible();
  await expect(page.getByTestId("user-avatar")).toBeVisible();

  const kpiBoxes = await Promise.all(
    kpis.map(({ label }) =>
      page.getByLabel(new RegExp(`^${label}:`)).boundingBox(),
    ),
  );
  expect(new Set(kpiBoxes.map((box) => Math.round(box?.y ?? 0))).size).toBe(1);
  await expectNoHorizontalOverflow(page);
});

test("overview dashboard uses two KPI columns and stacked sections on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/overview");

  const cards = kpis.map(({ label }) =>
    page.getByLabel(new RegExp(`^${label}:`)),
  );
  const cardBoxes = await Promise.all(cards.map((card) => card.boundingBox()));

  expect(Math.round(cardBoxes[0]?.y ?? 0)).toBe(
    Math.round(cardBoxes[1]?.y ?? 0),
  );
  expect(Math.round(cardBoxes[2]?.y ?? 0)).toBe(
    Math.round(cardBoxes[3]?.y ?? 0),
  );
  expect(cardBoxes[2]?.y ?? 0).toBeGreaterThan((cardBoxes[0]?.y ?? 0) + 100);
  expect(cardBoxes[0]?.width ?? 0).toBeGreaterThan(150);
  expect(cardBoxes[0]?.width ?? 0).toBeLessThan(180);

  const stackedSections = [
    page.getByTestId("call-trend-chart"),
    page.getByTestId("top-services-chart"),
    page.getByTestId("recent-activity"),
    page.getByTestId("upcoming"),
    page.getByTestId("ai-agent-performance"),
    page.getByTestId("integrations"),
  ];
  const sectionBoxes = await Promise.all(
    stackedSections.map((section) => section.boundingBox()),
  );

  for (const section of stackedSections) {
    await expect(section).toBeVisible();
  }
  for (let index = 1; index < sectionBoxes.length; index += 1) {
    expect(sectionBoxes[index]?.y ?? 0).toBeGreaterThan(
      sectionBoxes[index - 1]?.y ?? 0,
    );
  }
  expect(sectionBoxes[0]?.width ?? 0).toBeGreaterThan(340);

  const scrollState = await page.evaluate(() => {
    const content = document.querySelector<HTMLElement>(
      '[data-testid="dashboard-content"]',
    );
    return {
      bodyHeight: document.body.scrollHeight,
      viewportHeight: window.innerHeight,
      contentScrolls: Boolean(
        content && content.scrollHeight > content.clientHeight,
      ),
    };
  });
  expect(scrollState.bodyHeight).toBeLessThanOrEqual(
    scrollState.viewportHeight,
  );
  expect(scrollState.contentScrolls).toBe(true);
  await expectNoHorizontalOverflow(page);
});
