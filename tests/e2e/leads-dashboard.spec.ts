import { expect, test } from "@playwright/test";

const leadsKpis = [
  {
    label: "Total Leads",
    value: "214",
    detail: "8.1% vs last week",
  },
  {
    label: "Qualified",
    value: "86",
    detail: "40.2% qualification rate",
  },
  {
    label: "Appointments Booked",
    value: "52",
    detail: "12 new this week",
  },
  {
    label: "Conversion Rate",
    value: "24.3%",
    detail: "3.6% improvement",
  },
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

test("leads route renders KPIs and route-aware navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/leads");

  await expect(page.getByLabel("Leads dashboard")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Leads" })).toBeVisible();
  await expect(
    page.getByText(
      "Track prospects, qualification progress, and conversion opportunities.",
    ),
  ).toBeVisible();

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "Leads", exact: true }),
  ).toHaveAttribute("aria-current", "page");

  for (const route of ["Overview", "Calls", "Bookings"]) {
    await expect(
      sidebar.getByRole("link", { name: route, exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
  }

  for (const kpi of leadsKpis) {
    const card = page.getByLabel(`${kpi.label}: ${kpi.value}, ${kpi.detail}`);
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  await expect(page.getByTestId("leads-pipeline")).toBeVisible();
  await expect(page.getByText("12 leads shown")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("search, stage, source, and clear filters work locally", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/leads");

  const search = page.getByRole("searchbox", {
    name: "Search by lead name, company, email, or phone",
  });
  await search.fill("Ahmed");
  await expect(page.getByText("1 lead shown")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-004")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-001")).toBeHidden();

  await page.getByRole("button", { name: "Clear lead filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("12 leads shown")).toBeVisible();

  await page.getByRole("combobox", { name: "Filter leads by stage" }).click();
  await page.getByRole("option", { name: "Qualified", exact: true }).click();
  await expect(page.getByText("3 leads shown")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-003")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-004")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-011")).toBeVisible();

  await page.getByRole("button", { name: "Clear lead filters" }).click();
  await page.getByRole("combobox", { name: "Filter leads by source" }).click();
  await page.getByRole("option", { name: "AI Call", exact: true }).click();
  await expect(page.getByText("3 leads shown")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-001")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-005")).toBeVisible();
  await expect(page.getByTestId("pipeline-lead-lead-012")).toBeVisible();
});

test("pipeline counts match cards and list view displays all records", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/leads");

  const expectedCounts = {
    new: 3,
    contacted: 2,
    qualified: 3,
    booked: 2,
    lost: 2,
  } as const;

  for (const [stage, count] of Object.entries(expectedCounts)) {
    const column = page.getByTestId(`pipeline-stage-${stage}`);
    await expect(column).toBeVisible();
    await expect(column.locator('[data-testid^="pipeline-lead-"]')).toHaveCount(
      count,
    );
  }

  await page.getByRole("button", { name: "List", exact: true }).click();
  await expect(page.getByTestId("leads-pipeline")).toBeHidden();
  await expect(page.getByTestId("leads-table")).toBeVisible();
  await expect(page.locator('[data-testid^="lead-row-lead-"]')).toHaveCount(12);
  await expect(page.getByTestId("lead-row-lead-001")).toContainText(
    "Sarah Anderson",
  );
  await expect(page.getByTestId("lead-row-lead-010")).toContainText(
    "Noah Carter",
  );
  await expectNoHorizontalOverflow(page);
});

test("tablet layouts keep KPIs paired and pipeline internally contained", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/leads");

    const cards = [
      page.getByTestId("leads-kpi-total"),
      page.getByTestId("leads-kpi-qualified"),
      page.getByTestId("leads-kpi-booked"),
      page.getByTestId("leads-kpi-conversion"),
    ];
    const boxes = await Promise.all(cards.map((card) => card.boundingBox()));

    expect(Math.round(boxes[0]?.y ?? 0)).toBe(Math.round(boxes[1]?.y ?? 0));
    expect(Math.round(boxes[2]?.y ?? 0)).toBe(Math.round(boxes[3]?.y ?? 0));
    expect(boxes[2]?.y ?? 0).toBeGreaterThan(boxes[0]?.y ?? 0);

    const pipeline = page.getByTestId("leads-pipeline");
    expect(
      await pipeline.evaluate((element) => element.scrollWidth),
    ).toBeGreaterThan(
      await pipeline.evaluate((element) => element.clientWidth),
    );
    await expectNoHorizontalOverflow(page);
  }
});

test("lead details expose qualification context, local actions, and close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/leads");

  await page
    .getByRole("button", {
      name: "View lead details for Sarah Anderson",
    })
    .click();

  const sheet = page.getByTestId("lead-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Sarah Anderson" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "AI-prepared lead summary" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Qualification signals" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Concerns or objections" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Interaction timeline" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Create follow-up" }).click();
  await expect(
    sheet.getByText("Follow-up drafted locally; no message has been sent."),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Convert to booking" }).click();
  await expect(
    sheet.getByText(
      "Booking conversion preview prepared; the lead remains unchanged.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Close lead details" }).click();
  await expect(sheet).toBeHidden();
});

test("mobile uses lead cards, contained pipeline, and near-full sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/leads");

  const kpis = [
    page.getByTestId("leads-kpi-total"),
    page.getByTestId("leads-kpi-qualified"),
    page.getByTestId("leads-kpi-booked"),
    page.getByTestId("leads-kpi-conversion"),
  ];
  const kpiBoxes = await Promise.all(kpis.map((card) => card.boundingBox()));
  expect(Math.round(kpiBoxes[0]?.y ?? 0)).toBe(Math.round(kpiBoxes[1]?.y ?? 0));
  expect(Math.round(kpiBoxes[2]?.y ?? 0)).toBe(Math.round(kpiBoxes[3]?.y ?? 0));

  const pipeline = page.getByTestId("leads-pipeline");
  await expect(pipeline).toBeVisible();
  expect(
    await pipeline.evaluate((element) => element.scrollWidth),
  ).toBeGreaterThan(await pipeline.evaluate((element) => element.clientWidth));
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "List", exact: true }).click();
  await expect(page.getByTestId("leads-table")).toBeHidden();
  await expect(page.getByTestId("mobile-lead-card")).toHaveCount(12);
  await expect(page.getByTestId("mobile-lead-card").first()).toBeVisible();

  await page
    .getByRole("button", {
      name: "View lead details for Sarah Anderson",
    })
    .click();
  const sheet = page.getByTestId("lead-detail-sheet");
  await expect(sheet).toBeVisible();
  expect((await sheet.boundingBox())?.width ?? 0).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
  await sheet.getByRole("button", { name: "Close lead details" }).click();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Leads", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("existing dashboard routes remain functional", async ({ page }) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
    { route: "/bookings", label: "Bookings dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByTestId("dashboard-shell")).toBeVisible();
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
