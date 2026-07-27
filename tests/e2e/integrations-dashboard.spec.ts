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

test("Integrations route renders KPIs, insights, and active navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/integrations");

  await expect(page.getByLabel("Integrations dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Integrations", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Monitor connected tools, automation activity, and operational health.",
    ),
  ).toBeVisible();
  await expect(
    page
      .getByTestId("desktop-sidebar")
      .getByRole("link", { name: "Integrations" }),
  ).toHaveAttribute("aria-current", "page");

  for (const id of ["connected", "automations", "syncs", "health"]) {
    await expect(page.getByTestId(`integration-kpi-${id}`)).toBeVisible();
  }
  await expect(
    page
      .getByTestId("integration-kpi-connected")
      .getByText("2 connected integrations need attention"),
  ).toBeVisible();
  await expect(page.getByText("11 integrations shown")).toBeVisible();
  await expect(page.getByTestId("integration-directory")).toBeVisible();
  await expect(page.getByTestId("integration-health-overview")).toBeVisible();
  await expect(page.getByTestId("workflow-distribution")).toBeVisible();
  await expect(page.getByTestId("integration-attention")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("search and all filters work together and clear", async ({ page }) => {
  await page.goto("/integrations");
  const search = page.getByRole("searchbox", {
    name: "Search integrations by name, purpose, or category",
  });
  await search.fill("payment");
  await expect(page.getByText("1 integration shown")).toBeVisible();
  await expect(page.getByTestId("integration-card-harbor-pay")).toBeVisible();
  await page.getByRole("button", { name: "Clear integration filters" }).click();

  await page
    .getByRole("combobox", { name: "Filter integrations by status" })
    .click();
  await page.getByRole("option", { name: "Connected", exact: true }).click();
  await expect(page.getByText("8 integrations shown")).toBeVisible();

  await page
    .getByRole("combobox", { name: "Filter integrations by category" })
    .click();
  await page
    .getByRole("option", { name: "Communication", exact: true })
    .click();
  await expect(page.getByText("2 integrations shown")).toBeVisible();
  await expect(page.getByTestId("integration-card-relay-chat")).toBeVisible();
  await expect(page.getByTestId("integration-card-team-line")).toBeVisible();
  await page.getByRole("button", { name: "Clear integration filters" }).click();

  await page
    .getByRole("combobox", { name: "Filter integrations by health" })
    .click();
  await page.getByRole("option", { name: "Degraded", exact: true }).click();
  await expect(page.getByText("2 integrations shown")).toBeVisible();
  await expect(page.getByTestId("integration-card-cloud-crate")).toBeVisible();
  await expect(
    page.getByTestId("integration-card-support-harbor"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear integration filters" }).click();
  await expect(search).toHaveValue("");
  await expect(page.getByText("11 integrations shown")).toBeVisible();
});

test("sorting changes integration order without changing result count", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/integrations");
  const cards = page.locator('[data-testid^="integration-card-"]');
  const sort = page.getByRole("combobox", { name: "Sort integrations" });

  await expect(cards.first()).toContainText("Relay Chat");
  await sort.click();
  await page.getByRole("option", { name: "Automation count" }).click();
  await expect(cards.first()).toContainText("FlowPilot");
  await sort.click();
  await page.getByRole("option", { name: "Integration name" }).click();
  await expect(cards.first()).toContainText("ArchiveDock");
  await expect(page.getByText("11 integrations shown")).toBeVisible();
});

test("detail sheet shows operating context and local action feedback", async ({
  page,
}) => {
  await page.goto("/integrations");
  await page
    .getByRole("button", { name: "View integration details for Relay Chat" })
    .click();
  const sheet = page.getByTestId("integration-detail-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Relay Chat" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Connection overview" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Operational health" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Recent activity" }),
  ).toBeVisible();
  await expect(sheet.getByRole("button", { name: "Reconnect" })).toHaveCount(0);

  await sheet.getByRole("button", { name: "Test connection" }).click();
  await expect(
    sheet.getByText(/connection test passed in this local preview/),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Pause sync" }).click();
  await expect(
    sheet.getByText(/sync is now paused in this local preview/),
  ).toBeVisible();
  await expect(
    sheet.getByRole("button", { name: "Resume sync" }),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Review workflows" }).click();
  await expect(sheet.getByText(/marked for local review/)).toBeVisible();
  await sheet.getByRole("button", { name: "Mark for review" }).click();
  await expect(
    sheet.getByText(/was marked for review in this local preview/),
  ).toBeVisible();
  await sheet
    .getByRole("button", { name: "Close integration details" })
    .click();
  await expect(sheet).toBeHidden();
});

test("detail footer actions follow paused, reconnect, and offline states", async ({
  page,
}) => {
  await page.goto("/integrations");

  await page
    .getByRole("button", { name: "View integration details for Harbor Pay" })
    .click();
  let sheet = page.getByTestId("integration-detail-sheet");
  await expect(
    sheet.getByRole("button", { name: "Test connection" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("button", { name: "Resume sync" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("button", { name: "Review workflows" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("button", { name: "Mark for review" }),
  ).toBeVisible();
  await expect(sheet.getByRole("button", { name: "Pause sync" })).toHaveCount(
    0,
  );
  await sheet.getByRole("button", { name: "Resume sync" }).click();
  await expect(
    sheet.getByText(/sync is now connected in this local preview/),
  ).toBeVisible();
  await expect(sheet.getByRole("button", { name: "Pause sync" })).toBeVisible();
  await sheet
    .getByRole("button", { name: "Close integration details" })
    .click();

  await page
    .getByRole("button", { name: "View integration details for CloudCrate" })
    .click();
  sheet = page.getByTestId("integration-detail-sheet");
  const reconnect = sheet.getByRole("button", { name: "Reconnect" });
  await expect(reconnect).toBeVisible();
  await expect(reconnect).toHaveClass(/bg-primary/);
  await expect(sheet.getByRole("button", { name: "Pause sync" })).toHaveCount(
    0,
  );
  await sheet.getByRole("button", { name: "Test connection" }).click();
  await expect(
    sheet.getByText(/confirmed that reconnection is required/),
  ).toBeVisible();
  await reconnect.click();
  await expect(
    sheet.getByText(/was reconnected in this local preview/),
  ).toBeVisible();
  await expect(sheet.getByRole("button", { name: "Pause sync" })).toBeVisible();
  await sheet
    .getByRole("button", { name: "Close integration details" })
    .click();

  await page
    .getByRole("button", { name: "View integration details for ArchiveDock" })
    .click();
  sheet = page.getByTestId("integration-detail-sheet");
  const configure = sheet.getByRole("button", { name: "Configure setup" });
  await expect(configure).toBeVisible();
  await expect(configure).toHaveClass(/bg-primary/);
  await expect(sheet.getByRole("button", { name: "Pause sync" })).toHaveCount(
    0,
  );
  await expect(sheet.getByRole("button", { name: "Resume sync" })).toHaveCount(
    0,
  );
  await expect(sheet.getByRole("button", { name: "Reconnect" })).toHaveCount(0);
  await expect(
    sheet.getByRole("button", { name: "Test connection" }),
  ).toHaveCount(0);
  await configure.click();
  await expect(
    sheet.getByText(/setup checklist opened in this local preview/),
  ).toBeVisible();
  await sheet.getByRole("button", { name: "Mark for review" }).click();
  await expect(
    sheet.getByText(/was marked for review in this local preview/),
  ).toBeVisible();
  await sheet
    .getByRole("button", { name: "Close integration details" })
    .click();
});

test("responsive directory, mobile navigation, and sheet stay unclipped", async ({
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
    await page.goto("/integrations");
    await expect(
      page.locator('[data-testid^="integration-card-"]'),
    ).toHaveCount(11);
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
      };
    });
    expect(containment.htmlHeight).toBe(containment.viewportHeight);
    expect(containment.bodyHeight).toBe(containment.viewportHeight);
    expect(containment.contentOverflowY).toBe("auto");
  }

  const cards = page.locator('[data-testid^="integration-card-"]');
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  expect(second?.y ?? 0).toBeGreaterThan(
    (first?.y ?? 0) + (first?.height ?? 0) - 1,
  );

  await page
    .getByRole("button", { name: "View integration details for Relay Chat" })
    .click();
  const sheet = page.getByTestId("integration-detail-sheet");
  expect((await sheet.boundingBox())?.width ?? 0).toBeGreaterThan(380);
  await expectNoHorizontalOverflow(page);
  await sheet.getByRole("button", { name: "Test connection" }).click();
  await expect(sheet.getByText(/local preview/)).toBeVisible();
  await sheet
    .getByRole("button", { name: "Close integration details" })
    .click();

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", {
    name: "Dashboard navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Integrations" }),
  ).toHaveAttribute("aria-current", "page");
});

test("existing completed dashboard routes remain functional", async ({
  page,
}) => {
  for (const { route, label } of [
    { route: "/overview", label: "Overview dashboard" },
    { route: "/calls", label: "Calls dashboard" },
    { route: "/bookings", label: "Bookings dashboard" },
    { route: "/leads", label: "Leads dashboard" },
    { route: "/customers", label: "Customers dashboard" },
    { route: "/ai-agents", label: "AI Agents dashboard" },
    { route: "/knowledge-base", label: "Knowledge Base dashboard" },
  ]) {
    await page.goto(route);
    await expect(page.getByLabel(label)).toBeVisible();
  }
});
