import { expect, test } from "@playwright/test";

const agentKpis = [
  {
    id: "active",
    label: "Active Agents",
    value: "6",
    detail: "5 operational, 1 paused",
  },
  {
    id: "tasks",
    label: "Tasks Completed",
    value: "1,842",
    detail: "18.6% vs last week",
  },
  {
    id: "automation",
    label: "Automation Rate",
    value: "87.4%",
    detail: "1,610 tasks automated",
  },
  {
    id: "success",
    label: "Success Rate",
    value: "96.2%",
    detail: "1.8% improvement",
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

test("AI Agents route renders KPIs and route-aware navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ai-agents");

  await expect(page.getByLabel("AI Agents dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AI Agents", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Monitor agent performance, responsibilities, and operational health.",
    ),
  ).toBeVisible();

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "AI Agents", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  for (const route of ["Overview", "Calls", "Bookings", "Leads", "Customers"]) {
    await expect(
      sidebar.getByRole("link", { name: route, exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
  }

  for (const kpi of agentKpis) {
    const card = page.getByTestId(`ai-agents-kpi-${kpi.id}`);
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute(
      "aria-label",
      `${kpi.label}: ${kpi.value}, ${kpi.detail}`,
    );
    await expect(card.getByText(kpi.value, { exact: true })).toBeVisible();
  }

  await expect(page.getByText("6 agents shown")).toBeVisible();
  await expect(page.locator('[data-testid^="agent-card-"]')).toHaveCount(6);
  await expect(page.getByTestId("agent-activity-trend")).toBeVisible();
  await expect(page.getByTestId("attention-required")).toBeVisible();
  await expect(page.getByTestId("workload-distribution")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("search, status, and function filters work locally and clear", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ai-agents");

  const search = page.getByRole("searchbox", {
    name: "Search by agent name, role, or responsibility",
  });
  await search.fill("human handoff");
  await expect(page.getByText("1 agent shown")).toBeVisible();
  await expect(
    page.getByTestId("agent-card-escalation-coordinator"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Clear agent filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("6 agents shown")).toBeVisible();

  await page.getByRole("combobox", { name: "Filter agents by status" }).click();
  await page.getByRole("option", { name: "Needs Attention" }).click();
  await expect(page.getByText("1 agent shown")).toBeVisible();
  await expect(page.getByTestId("agent-card-customer-support")).toBeVisible();

  await page.getByRole("button", { name: "Clear agent filters" }).click();
  await page
    .getByRole("combobox", { name: "Filter agents by function" })
    .click();
  await page.getByRole("option", { name: "Support", exact: true }).click();
  await expect(page.getByText("2 agents shown")).toBeVisible();
  await expect(page.getByTestId("agent-card-customer-support")).toBeVisible();
  await expect(
    page.getByTestId("agent-card-escalation-coordinator"),
  ).toBeVisible();
});

test("sorting changes agent order without changing the result count", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ai-agents");

  const cards = page.locator('[data-testid^="agent-card-"]');
  const sort = page.getByRole("combobox", { name: "Sort agents" });

  await expect(cards.first()).toContainText("Front Desk Agent");
  await expect(page.getByText("6 agents shown")).toBeVisible();

  await sort.click();
  await page.getByRole("option", { name: "Agent Name" }).click();
  await expect(cards.first()).toContainText("Customer Support Agent");
  await expect(cards.nth(1)).toContainText("Escalation Coordinator");

  await sort.click();
  await page.getByRole("option", { name: "Most Tasks" }).click();
  await expect(cards.first()).toContainText("Front Desk Agent");

  await sort.click();
  await page.getByRole("option", { name: "Response Time" }).click();
  await expect(cards.first()).toContainText("Front Desk Agent");
  await expect(page.getByText("6 agents shown")).toBeVisible();
});

test("agent detail sheet provides context, local controls, and close", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ai-agents");

  await page
    .getByRole("button", { name: "View details for Front Desk Agent" })
    .click();

  const sheet = page.getByTestId("agent-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Front Desk Agent" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", {
      name: "AI-prepared performance summary",
    }),
  ).toBeVisible();
  await expect(sheet.getByRole("heading", { name: "Strengths" })).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Issues or risks" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Recent activity" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Current configuration summary" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Pause agent" }).click();
  await expect(
    sheet.getByText(
      "Front Desk Agent paused in this local preview; no persistent configuration was changed.",
    ),
  ).toBeVisible();
  await expect(
    sheet.getByRole("button", { name: "Resume agent" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Resume agent" }).click();
  await expect(
    sheet.getByText(
      "Front Desk Agent resumed in this local preview; no persistent configuration was changed.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Mark for review" }).click();
  await expect(
    sheet.getByText(
      "Review flag applied locally; no persistent agent record was updated.",
    ),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Close agent details" }).click();
  await expect(sheet).toBeHidden();
});

test("activity range controls update the accessible chart summary", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/ai-agents");

  const chart = page.getByTestId("agent-activity-trend");
  await expect(chart.getByRole("button", { name: "Weekly" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await chart.getByRole("button", { name: "Daily" }).click();
  await expect(chart.getByRole("button", { name: "Daily" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    chart.getByText(/Daily agent activity: 335 tasks completed/),
  ).toBeAttached();
});

test("responsive directory and KPI layouts stay unclipped", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1366, height: 850 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/ai-agents");

    await expect(page.locator('[data-testid^="agent-card-"]')).toHaveCount(6);
    await expect(page.getByTestId("agent-activity-trend")).toBeVisible();
    await expect(page.getByTestId("attention-required")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("mobile renders one-column cards and a near-full agent sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ai-agents");

  const kpis = agentKpis.map((kpi) =>
    page.getByTestId(`ai-agents-kpi-${kpi.id}`),
  );
  const kpiBoxes = await Promise.all(kpis.map((card) => card.boundingBox()));
  expect(Math.round(kpiBoxes[0]?.y ?? 0)).toBe(Math.round(kpiBoxes[1]?.y ?? 0));
  expect(Math.round(kpiBoxes[2]?.y ?? 0)).toBe(Math.round(kpiBoxes[3]?.y ?? 0));

  const cards = page.locator('[data-testid^="agent-card-"]');
  await expect(cards).toHaveCount(6);
  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  expect(secondBox?.y ?? 0).toBeGreaterThan(
    (firstBox?.y ?? 0) + (firstBox?.height ?? 0) - 1,
  );
  await expectNoHorizontalOverflow(page);

  await page
    .getByRole("button", { name: "View details for Front Desk Agent" })
    .click();
  const sheet = page.getByTestId("agent-detail-sheet");
  await expect(sheet).toBeVisible();
  expect((await sheet.boundingBox())?.width ?? 0).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
  await sheet.getByRole("button", { name: "Pause agent" }).click();
  await expect(sheet.getByText(/paused in this local preview/)).toBeVisible();
  await sheet.getByRole("button", { name: "Close agent details" }).click();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "AI Agents", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("AI Agents keeps one internal dashboard scrollbar at every target width", async ({
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
    await page.goto("/ai-agents");

    const content = page.getByTestId("dashboard-content");
    const header = page.getByTestId("dashboard-header");
    const sidebar = page.getByTestId("desktop-sidebar");
    const headerBefore = await header.boundingBox();
    const sidebarBefore = await sidebar.boundingBox();

    const containment = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      const shell = document.querySelector<HTMLElement>(
        '[data-testid="dashboard-shell"]',
      );
      const dashboardContent = document.querySelector<HTMLElement>(
        '[data-testid="dashboard-content"]',
      );
      const workload = document.querySelector<HTMLElement>(
        '[data-testid="workload-distribution"]',
      );

      if (!shell || !dashboardContent || !workload) {
        throw new Error("Dashboard containment elements are missing.");
      }

      const contentBox = dashboardContent.getBoundingClientRect();
      const workloadBox = workload.getBoundingClientRect();
      const workloadBottom =
        workloadBox.bottom - contentBox.top + dashboardContent.scrollTop;
      const contentPaddingBottom = Number.parseFloat(
        getComputedStyle(dashboardContent).paddingBottom,
      );

      return {
        viewportHeight: window.innerHeight,
        htmlClientHeight: html.clientHeight,
        htmlScrollHeight: html.scrollHeight,
        bodyClientHeight: body.clientHeight,
        bodyScrollHeight: body.scrollHeight,
        shellHeight: shell.getBoundingClientRect().height,
        shellOverflowY: getComputedStyle(shell).overflowY,
        contentClientHeight: dashboardContent.clientHeight,
        contentScrollHeight: dashboardContent.scrollHeight,
        contentOverflowY: getComputedStyle(dashboardContent).overflowY,
        trailingSpace: dashboardContent.scrollHeight - workloadBottom,
        maximumExpectedTrailingSpace: contentPaddingBottom + 10,
        windowScrollY: window.scrollY,
      };
    });

    expect(containment.htmlScrollHeight).toBeLessThanOrEqual(
      containment.htmlClientHeight,
    );
    expect(containment.bodyScrollHeight).toBeLessThanOrEqual(
      containment.bodyClientHeight,
    );
    expect(containment.htmlClientHeight).toBe(containment.viewportHeight);
    expect(containment.bodyClientHeight).toBe(containment.viewportHeight);
    expect(Math.round(containment.shellHeight)).toBe(
      containment.viewportHeight,
    );
    expect(containment.shellOverflowY).toBe("hidden");
    expect(containment.contentOverflowY).toBe("auto");
    expect(containment.contentScrollHeight).toBeGreaterThan(
      containment.contentClientHeight,
    );
    expect(containment.trailingSpace).toBeLessThanOrEqual(
      containment.maximumExpectedTrailingSpace,
    );
    expect(containment.windowScrollY).toBe(0);

    await content.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect(page.getByTestId("workload-distribution")).toBeVisible();

    const headerAfter = await header.boundingBox();
    const sidebarAfter = await sidebar.boundingBox();
    expect(headerAfter?.y).toBe(headerBefore?.y);
    expect(sidebarAfter?.y).toBe(sidebarBefore?.y);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await expectNoHorizontalOverflow(page);

    await page
      .getByRole("button", { name: "View details for Front Desk Agent" })
      .click();
    await expect(page.getByTestId("agent-detail-sheet")).toBeVisible();

    const sheetContainment = await page.evaluate(() => ({
      viewportHeight: window.innerHeight,
      htmlScrollHeight: document.documentElement.scrollHeight,
      bodyScrollHeight: document.body.scrollHeight,
      bodyOverflowY: getComputedStyle(document.body).overflowY,
      windowScrollY: window.scrollY,
    }));
    expect(sheetContainment.htmlScrollHeight).toBe(
      sheetContainment.viewportHeight,
    );
    expect(sheetContainment.bodyScrollHeight).toBe(
      sheetContainment.viewportHeight,
    );
    expect(sheetContainment.bodyOverflowY).toBe("hidden");
    expect(sheetContainment.windowScrollY).toBe(0);
    await expectNoHorizontalOverflow(page);

    await page
      .getByTestId("agent-detail-sheet")
      .getByRole("button", { name: "Close agent details" })
      .click();

    if (viewport.width === 390) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      const navigation = page.getByRole("dialog", {
        name: "Dashboard navigation",
      });
      await expect(navigation).toBeVisible();
      await navigation
        .getByRole("button", { name: "Close navigation" })
        .click();
      await expect(navigation).toBeHidden();
    }
  }
});

test("completed routes share the fixed shell containment contract", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const route of [
    "/overview",
    "/calls",
    "/bookings",
    "/leads",
    "/customers",
    "/ai-agents",
  ]) {
    await page.goto(route);
    await expect(page.getByTestId("dashboard-shell")).toBeVisible();

    const metrics = await page.evaluate(() => {
      const content = document.querySelector<HTMLElement>(
        '[data-testid="dashboard-content"]',
      );
      if (!content) {
        throw new Error("Dashboard content is missing.");
      }

      return {
        viewportHeight: window.innerHeight,
        htmlScrollHeight: document.documentElement.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        contentClientHeight: content.clientHeight,
        contentScrollHeight: content.scrollHeight,
        contentOverflowY: getComputedStyle(content).overflowY,
      };
    });

    expect(metrics.htmlScrollHeight).toBe(metrics.viewportHeight);
    expect(metrics.bodyScrollHeight).toBe(metrics.viewportHeight);
    expect(metrics.contentOverflowY).toBe("auto");
    expect(metrics.contentScrollHeight).toBeGreaterThan(
      metrics.contentClientHeight,
    );
  }
});

test("all completed dashboard routes remain functional", async ({ page }) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
    { route: "/bookings", label: "Bookings dashboard" },
    { route: "/leads", label: "Leads dashboard" },
    { route: "/customers", label: "Customers dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByTestId("dashboard-shell")).toBeVisible();
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
