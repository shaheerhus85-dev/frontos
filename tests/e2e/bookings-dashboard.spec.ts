import { expect, test } from "@playwright/test";

const bookingKpis = [
  {
    label: "Total Bookings",
    value: "328",
    detail: "18.7% vs last week",
  },
  {
    label: "Confirmed",
    value: "274",
    detail: "83.5% confirmation rate",
  },
  {
    label: "Pending",
    value: "32",
    detail: "9 require attention",
  },
  {
    label: "Completion Rate",
    value: "91.4%",
    detail: "4.2% improvement",
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

async function expectControlContentFits(
  locator: import("@playwright/test").Locator,
) {
  expect(
    await locator.evaluate((element) => {
      const descendants = [
        element,
        ...Array.from(element.querySelectorAll<HTMLElement>("span, button")),
      ];

      return descendants.every(
        (item) => item.scrollWidth <= item.clientWidth + 1,
      );
    }),
  ).toBe(true);
}

test("bookings route renders KPIs and route-aware navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bookings");

  await expect(page.getByLabel("Bookings dashboard")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bookings" })).toBeVisible();
  await expect(
    page.getByText(
      "Manage appointments, availability, and scheduling outcomes.",
    ),
  ).toBeVisible();

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "Bookings", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    sidebar.getByRole("link", { name: "Overview", exact: true }),
  ).not.toHaveAttribute("aria-current", "page");
  await expect(
    sidebar.getByRole("link", { name: "Calls", exact: true }),
  ).not.toHaveAttribute("aria-current", "page");

  for (const kpi of bookingKpis) {
    const card = page.getByLabel(`${kpi.label}: ${kpi.value}, ${kpi.detail}`);
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  await expect(page.getByTestId("bookings-table")).toBeVisible();
  await expect(page.getByTestId("booking-row-booking-001")).toContainText(
    "Sarah Anderson",
  );
  await expect(page.getByTestId("booking-row-booking-010")).toContainText(
    "Marcus Thompson",
  );
  await expectNoHorizontalOverflow(page);
});

test("toolbar wraps cleanly at laptop widths and stays single-row on wide desktop", async ({
  page,
}) => {
  const search = page.getByRole("searchbox", {
    name: "Search by customer or service",
  });
  const status = page.getByRole("combobox", {
    name: "Filter bookings by status",
  });
  const service = page.getByRole("combobox", {
    name: "Filter bookings by service",
  });
  const date = page.getByRole("button", {
    name: "Booking date range: May 12 through May 18",
  });
  const view = page.getByRole("group", { name: "Booking view" });

  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/bookings");

  const laptopBoxes = await Promise.all(
    [search, status, service, date, view].map((control) =>
      control.boundingBox(),
    ),
  );
  expect(Math.round(laptopBoxes[0]?.y ?? 0)).toBe(
    Math.round(laptopBoxes[1]?.y ?? 0),
  );
  expect(Math.round(laptopBoxes[1]?.y ?? 0)).toBe(
    Math.round(laptopBoxes[2]?.y ?? 0),
  );
  expect(Math.round(laptopBoxes[3]?.y ?? 0)).toBe(
    Math.round(laptopBoxes[4]?.y ?? 0),
  );
  expect(laptopBoxes[3]?.y ?? 0).toBeGreaterThan(laptopBoxes[0]?.y ?? 0);

  for (const control of [status, service, date, view]) {
    await expectControlContentFits(control);
  }
  await expectNoHorizontalOverflow(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bookings");

  const desktopBoxes = await Promise.all(
    [search, status, service, date, view].map((control) =>
      control.boundingBox(),
    ),
  );
  for (const box of desktopBoxes.slice(1)) {
    expect(Math.round(box?.y ?? 0)).toBe(Math.round(desktopBoxes[0]?.y ?? 0));
  }

  expect(
    await search.evaluate((input) => {
      const element = input as HTMLInputElement;
      const styles = getComputedStyle(element);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return false;
      context.font = styles.font;

      const availableWidth =
        element.clientWidth -
        Number.parseFloat(styles.paddingLeft) -
        Number.parseFloat(styles.paddingRight);

      return context.measureText(element.placeholder).width <= availableWidth;
    }),
  ).toBe(true);
  for (const control of [status, service, date, view]) {
    await expectControlContentFits(control);
  }
  await expectNoHorizontalOverflow(page);
});

test("bookings filters search locally and narrow by status", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bookings");

  const search = page.getByRole("searchbox", {
    name: "Search by customer or service",
  });
  await search.fill("Sarah");
  await expect(page.getByText("1 booking shown")).toBeVisible();
  await expect(page.getByTestId("booking-row-booking-001")).toBeVisible();
  await expect(page.getByTestId("booking-row-booking-002")).toBeHidden();

  await page.getByRole("button", { name: "Clear booking filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("10 bookings shown")).toBeVisible();

  await page
    .getByRole("combobox", { name: "Filter bookings by status" })
    .click();
  await page.getByRole("option", { name: "Pending", exact: true }).click();
  await expect(page.getByText("1 booking shown")).toBeVisible();
  await expect(page.getByTestId("booking-row-booking-002")).toBeVisible();
  await expect(page.getByTestId("booking-row-booking-001")).toBeHidden();
});

test("list and schedule views switch with Today and Week ranges", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bookings");

  const workspace = page.getByTestId("bookings-workspace");
  const resultStatus = workspace.getByRole("status");
  const scheduleBookings = workspace.locator(
    '[data-testid^="schedule-booking-"]',
  );

  await expect(resultStatus).toHaveText("10 bookings shown");

  await page.getByRole("button", { name: "Schedule", exact: true }).click();
  await expect(page.getByTestId("bookings-table")).toBeHidden();
  await expect(page.getByTestId("bookings-schedule")).toBeVisible();
  await expect(page.getByTestId("today-schedule")).toBeVisible();
  await expect(page.getByText("Monday, May 18")).toBeVisible();
  await expect(page.getByText("4 scheduled appointments")).toBeVisible();
  await expect(resultStatus).toHaveText("4 bookings shown");
  await expect(scheduleBookings).toHaveCount(4);
  await expect(page.getByTestId("schedule-booking-booking-001")).toBeVisible();

  await page.getByRole("tab", { name: "Week", exact: true }).click();
  await expect(page.getByTestId("week-schedule")).toBeVisible();
  await expect(resultStatus).toHaveText("10 bookings shown");
  await expect(scheduleBookings).toHaveCount(10);
  await expect(page.getByLabel("Tue, May 12")).toBeVisible();
  await expect(page.getByLabel("Mon, May 18")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("tab", { name: "Today", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Filter bookings by status" })
    .click();
  await page.getByRole("option", { name: "Pending", exact: true }).click();
  await expect(resultStatus).toHaveText("1 booking shown");
  await expect(scheduleBookings).toHaveCount(1);
  await expect(page.getByTestId("schedule-booking-booking-002")).toBeVisible();
  await expect(page.getByTestId("schedule-booking-booking-001")).toBeHidden();

  await page.getByRole("button", { name: "Clear booking filters" }).click();
  await expect(resultStatus).toHaveText("4 bookings shown");
  await expect(scheduleBookings).toHaveCount(4);

  await page.getByRole("button", { name: "List", exact: true }).click();
  await expect(page.getByTestId("bookings-table")).toBeVisible();
  await expect(page.getByTestId("bookings-schedule")).toBeHidden();
  await expect(resultStatus).toHaveText("10 bookings shown");
});

test("tablet layouts preserve two KPI columns and simplify the table", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/bookings");

    const cards = [
      page.getByTestId("bookings-kpi-total"),
      page.getByTestId("bookings-kpi-confirmed"),
      page.getByTestId("bookings-kpi-pending"),
      page.getByTestId("bookings-kpi-completion"),
    ];
    const cardBoxes = await Promise.all(
      cards.map((card) => card.boundingBox()),
    );

    expect(Math.round(cardBoxes[0]?.y ?? 0)).toBe(
      Math.round(cardBoxes[1]?.y ?? 0),
    );
    expect(Math.round(cardBoxes[2]?.y ?? 0)).toBe(
      Math.round(cardBoxes[3]?.y ?? 0),
    );
    expect(cardBoxes[2]?.y ?? 0).toBeGreaterThan(cardBoxes[0]?.y ?? 0);

    for (const column of ["Duration", "Assigned agent", "Source"]) {
      await expect(
        page.getByRole("columnheader", { name: column, exact: true }),
      ).toBeHidden();
    }
    await expect(page.getByTestId("bookings-table")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("booking details open, provide local feedback, and close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/bookings");

  await page
    .getByRole("button", {
      name: "View booking details for Sarah Anderson",
    })
    .click();

  const sheet = page.getByTestId("booking-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Sarah Anderson" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", {
      name: "AI-prepared appointment summary",
    }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Reminder status" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Follow-up recommendation" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Reschedule" }).click();
  await expect(
    sheet.getByText(
      "Reschedule options prepared locally; the booking was not changed.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Cancel booking" }).click();
  await expect(
    sheet.getByText(
      "Cancellation preview prepared locally; the booking remains unchanged.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Close booking details" }).click();
  await expect(sheet).toBeHidden();
});

test("mobile uses booking cards, mobile schedule, and near-full sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/bookings");

  await expect(page.getByTestId("bookings-table")).toBeHidden();
  await expect(page.getByTestId("mobile-booking-card")).toHaveCount(10);
  await expect(page.getByTestId("mobile-booking-card").first()).toBeVisible();

  const mobileKpis = [
    page.getByTestId("bookings-kpi-total"),
    page.getByTestId("bookings-kpi-confirmed"),
    page.getByTestId("bookings-kpi-pending"),
    page.getByTestId("bookings-kpi-completion"),
  ];
  const mobileKpiBoxes = await Promise.all(
    mobileKpis.map((card) => card.boundingBox()),
  );
  expect(Math.round(mobileKpiBoxes[0]?.y ?? 0)).toBe(
    Math.round(mobileKpiBoxes[1]?.y ?? 0),
  );
  expect(Math.round(mobileKpiBoxes[2]?.y ?? 0)).toBe(
    Math.round(mobileKpiBoxes[3]?.y ?? 0),
  );
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Schedule", exact: true }).click();
  await expect(page.getByTestId("today-schedule")).toBeVisible();
  const scheduleBlock = page.getByTestId("schedule-booking-booking-001");
  await expect(scheduleBlock).toBeVisible();
  expect((await scheduleBlock.boundingBox())?.width ?? 0).toBeGreaterThan(240);
  await expectNoHorizontalOverflow(page);

  await scheduleBlock.click();
  const sheet = page.getByTestId("booking-detail-sheet");
  await expect(sheet).toBeVisible();
  expect((await sheet.boundingBox())?.width ?? 0).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
  await sheet.getByRole("button", { name: "Close booking details" }).click();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Bookings", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("overview and calls remain functional after bookings navigation changes", async ({
  page,
}) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByTestId("dashboard-shell")).toBeVisible();
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
