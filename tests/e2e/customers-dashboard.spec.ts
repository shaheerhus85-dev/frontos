import { expect, test } from "@playwright/test";

const customerKpis = [
  {
    label: "Total Customers",
    value: "1,086",
    detail: "6.8% vs last month",
  },
  {
    label: "Active Customers",
    value: "842",
    detail: "77.5% engagement rate",
  },
  {
    label: "Returning Customers",
    value: "396",
    detail: "36.5% retention rate",
  },
  {
    label: "Customer Value",
    value: "$186,420",
    detail: "$171.65 average value",
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

test("customers route renders KPIs and route-aware navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/customers");

  await expect(page.getByLabel("Customers dashboard")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
  await expect(
    page.getByText(
      "Understand customer relationships, activity, and service history.",
    ),
  ).toBeVisible();

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "Customers", exact: true }),
  ).toHaveAttribute("aria-current", "page");

  for (const route of ["Overview", "Calls", "Bookings", "Leads"]) {
    await expect(
      sidebar.getByRole("link", { name: route, exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
  }

  for (const kpi of customerKpis) {
    const card = page.getByLabel(`${kpi.label}: ${kpi.value}, ${kpi.detail}`);
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  await expect(page.getByTestId("customers-table")).toBeVisible();
  await expect(page.getByText("12 customers shown")).toBeVisible();
  await expect(
    page.locator('[data-testid^="customer-row-customer-"]'),
  ).toHaveCount(12);
  await expectNoHorizontalOverflow(page);
});

test("search and customer filters combine locally and clear", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/customers");

  const search = page.getByRole("searchbox", {
    name: "Search customers by name, email, phone, or company",
  });
  await search.fill("Horizon Partners");
  await expect(page.getByText("1 customer shown")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-004")).toBeVisible();

  await page.getByRole("button", { name: "Clear customer filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("12 customers shown")).toBeVisible();

  await page
    .getByRole("combobox", { name: "Filter customers by segment" })
    .click();
  await page.getByRole("option", { name: "Returning", exact: true }).click();
  await expect(page.getByText("4 customers shown")).toBeVisible();

  await page.getByRole("button", { name: "Clear customer filters" }).click();
  await page
    .getByRole("combobox", { name: "Filter customers by service" })
    .click();
  await page
    .getByRole("option", { name: "Wellness Assessment", exact: true })
    .click();
  await expect(page.getByText("3 customers shown")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-003")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-007")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-012")).toBeVisible();

  await page.getByRole("button", { name: "Clear customer filters" }).click();
  await page
    .getByRole("combobox", { name: "Filter customers by assigned agent" })
    .click();
  await page.getByRole("option", { name: "Maya Chen", exact: true }).click();
  await expect(page.getByText("3 customers shown")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-001")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-005")).toBeVisible();
  await expect(page.getByTestId("customer-row-customer-010")).toBeVisible();
});

test("sorting updates directory order without changing result count", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/customers");

  const rows = page.locator('[data-testid^="customer-row-customer-"]');
  const sort = page.getByRole("combobox", { name: "Sort customers" });

  await expect(rows.first()).toContainText("Sarah Anderson");
  await expect(page.getByText("12 customers shown")).toBeVisible();

  await sort.click();
  await page.getByRole("option", { name: "Highest value" }).click();
  await expect(rows.first()).toContainText("Marcus Thompson");
  await expect(rows.nth(1)).toContainText("Jessica Davis");

  await sort.click();
  await page.getByRole("option", { name: "Most bookings" }).click();
  await expect(rows.first()).toContainText("Marcus Thompson");
  await expect(rows.nth(1)).toContainText("Jessica Davis");

  await sort.click();
  await page.getByRole("option", { name: "Customer name" }).click();
  await expect(rows.first()).toContainText("Ahmed Khan");
  await expect(page.getByText("12 customers shown")).toBeVisible();
});

test("tablet layouts keep KPIs paired and simplify the directory", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/customers");

    const cards = [
      page.getByTestId("customers-kpi-total"),
      page.getByTestId("customers-kpi-active"),
      page.getByTestId("customers-kpi-returning"),
      page.getByTestId("customers-kpi-value"),
    ];
    const boxes = await Promise.all(cards.map((card) => card.boundingBox()));

    expect(Math.round(boxes[0]?.y ?? 0)).toBe(Math.round(boxes[1]?.y ?? 0));
    expect(Math.round(boxes[2]?.y ?? 0)).toBe(Math.round(boxes[3]?.y ?? 0));
    expect(boxes[2]?.y ?? 0).toBeGreaterThan(boxes[0]?.y ?? 0);

    for (const column of ["Contact", "Company", "Last activity"]) {
      await expect(
        page.getByRole("columnheader", { name: column, exact: true }),
      ).toBeHidden();
    }
    await expect(page.getByTestId("customers-table")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("customer details provide relationship context, feedback, and close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/customers");

  await page
    .getByRole("button", {
      name: "View customer details for Sarah Anderson",
    })
    .click();

  const sheet = page.getByTestId("customer-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Sarah Anderson" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "AI-prepared customer summary" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Relationship signals" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Risks or concerns" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Recent activity" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Create follow-up" }).click();
  await expect(
    sheet.getByText("Follow-up drafted locally; no message has been sent."),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Add internal note" }).click();
  await expect(
    sheet.getByText(
      "Internal note prepared locally; no record has been saved.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Close customer details" }).click();
  await expect(sheet).toBeHidden();
});

test("mobile renders customer cards and a near-full customer sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/customers");

  const kpis = [
    page.getByTestId("customers-kpi-total"),
    page.getByTestId("customers-kpi-active"),
    page.getByTestId("customers-kpi-returning"),
    page.getByTestId("customers-kpi-value"),
  ];
  const boxes = await Promise.all(kpis.map((card) => card.boundingBox()));
  expect(Math.round(boxes[0]?.y ?? 0)).toBe(Math.round(boxes[1]?.y ?? 0));
  expect(Math.round(boxes[2]?.y ?? 0)).toBe(Math.round(boxes[3]?.y ?? 0));

  await expect(page.getByTestId("customers-table")).toBeHidden();
  await expect(page.getByTestId("mobile-customer-card")).toHaveCount(12);
  await expect(page.getByTestId("mobile-customer-card").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page
    .getByRole("button", {
      name: "View customer details for Sarah Anderson",
    })
    .click();
  const sheet = page.getByTestId("customer-detail-sheet");
  await expect(sheet).toBeVisible();
  expect((await sheet.boundingBox())?.width ?? 0).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
  await sheet.getByRole("button", { name: "Mark for review" }).click();
  await expect(
    sheet.getByText(
      "Review flag preview prepared; the customer record remains unchanged.",
    ),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Close customer details" }).click();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Customers", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("completed dashboard routes remain functional", async ({ page }) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
    { route: "/bookings", label: "Bookings dashboard" },
    { route: "/leads", label: "Leads dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByTestId("dashboard-shell")).toBeVisible();
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
