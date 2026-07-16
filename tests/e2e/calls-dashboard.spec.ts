import { expect, test } from "@playwright/test";

const callsKpis = [
  {
    label: "Total Calls",
    value: "1,248",
    detail: "12.5% vs last week",
  },
  {
    label: "AI Handled",
    value: "1,086",
    detail: "87% automation rate",
  },
  {
    label: "Escalated",
    value: "74",
    detail: "5.9% of total calls",
  },
  {
    label: "Average Duration",
    value: "3m 42s",
    detail: "8.4% faster than last week",
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

test("calls route renders approved KPIs and route-aware navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/calls");

  await expect(page.getByLabel("Calls dashboard")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Calls" })).toBeVisible();
  await expect(
    page.getByText(
      "Review AI-handled conversations, outcomes, and escalations.",
    ),
  ).toBeVisible();

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "Calls", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    sidebar.getByRole("link", { name: "Overview", exact: true }),
  ).not.toHaveAttribute("aria-current", "page");

  for (const kpi of callsKpis) {
    const card = page.getByLabel(`${kpi.label}: ${kpi.value}, ${kpi.detail}`);
    await expect(card).toBeVisible();
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  await expect(page.getByTestId("call-history-table")).toBeVisible();
  await expect(page.getByTestId("call-row-call-001")).toContainText(
    "Sarah Anderson",
  );
  await expect(page.getByTestId("call-row-call-008")).toContainText(
    "David Lee",
  );
  await expectNoHorizontalOverflow(page);
});

test("calls filters search locally and narrow by status", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/calls");

  const search = page.getByRole("searchbox", {
    name: "Search calls by caller or phone",
  });
  await search.fill("Ahmed");
  await expect(page.getByText("1 call shown")).toBeVisible();
  await expect(page.getByTestId("call-row-call-006")).toBeVisible();
  await expect(page.getByTestId("call-row-call-001")).toBeHidden();

  await page.getByRole("button", { name: "Clear call filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("8 calls shown")).toBeVisible();

  await page.getByRole("combobox", { name: "Filter calls by status" }).click();
  await page.getByRole("option", { name: "Escalated", exact: true }).click();
  await expect(page.getByText("2 calls shown")).toBeVisible();
  await expect(page.getByTestId("call-row-call-003")).toBeVisible();
  await expect(page.getByTestId("call-row-call-008")).toBeVisible();
  await expect(page.getByTestId("call-row-call-006")).toBeHidden();
});

test("tablet layouts keep two KPI columns and simplify call history", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/calls");

    const cards = [
      page.getByTestId("calls-kpi-total"),
      page.getByTestId("calls-kpi-ai-handled"),
      page.getByTestId("calls-kpi-escalated"),
      page.getByTestId("calls-kpi-duration"),
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

    for (const column of ["Phone", "Duration", "Intent", "Outcome"]) {
      await expect(
        page.getByRole("columnheader", { name: column, exact: true }),
      ).toBeHidden();
    }
    await expect(page.getByTestId("call-history-table")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("call details open, provide local action feedback, and close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/calls");

  await page
    .getByRole("button", { name: "View call details for Sarah Anderson" })
    .click();

  const sheet = page.getByTestId("call-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Sarah Anderson" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "AI summary" }),
  ).toBeVisible();
  await expect(
    sheet.getByText("Appointment booked", { exact: true }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Transcript" }),
  ).toBeVisible();
  await expect(
    sheet.getByText("Caller", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    sheet.getByText("AI Agent", { exact: true }).last(),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Create follow-up" }).click();
  await expect(
    sheet.getByText("Follow-up draft created locally for this call."),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Close call details" }).click();
  await expect(sheet).toBeHidden();
});

test("mobile uses call cards and a near-full-width details sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/calls");

  await expect(page.getByTestId("call-history-table")).toBeHidden();
  await expect(page.getByTestId("mobile-call-card")).toHaveCount(8);
  await expect(page.getByTestId("mobile-call-card").first()).toBeVisible();
  const mobileKpis = [
    page.getByTestId("calls-kpi-total"),
    page.getByTestId("calls-kpi-ai-handled"),
    page.getByTestId("calls-kpi-escalated"),
    page.getByTestId("calls-kpi-duration"),
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

  await page
    .getByRole("button", { name: "View call details for Sarah Anderson" })
    .click();
  const sheet = page.getByTestId("call-detail-sheet");
  await expect(sheet).toBeVisible();
  const sheetBox = await sheet.boundingBox();
  expect(sheetBox?.width ?? 0).toBeGreaterThan(370);
  await expectNoHorizontalOverflow(page);

  await sheet.getByRole("button", { name: "Close call details" }).click();
  await expect(sheet).toBeHidden();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Calls", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
});
