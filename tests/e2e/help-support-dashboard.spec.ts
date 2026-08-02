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

test("Help & Support route renders connected health and active navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/help-support");

  await expect(page.getByLabel("Help & Support dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Help & Support", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Find guidance, review system health, and get help with your FrontOS workspace.",
    ),
  ).toBeVisible();
  await expect(
    page
      .getByTestId("desktop-sidebar")
      .getByRole("link", { name: "Help & Support" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("heading", { name: "How can we help?" }),
  ).toBeVisible();

  const health = page.getByTestId("workspace-health");
  for (const value of ["Operational", "9", "94.8%", "5 of 6", "92.4%"]) {
    await expect(health.getByText(value, { exact: true })).toBeVisible();
  }
  await expectNoHorizontalOverflow(page);
});

test("search, clearing, and suggested shortcuts filter support content", async ({
  page,
}) => {
  await page.goto("/help-support");
  const search = page.getByLabel("Search help resources");

  await search.fill("integration");
  await expect(
    page.getByRole("heading", { name: "Integrations" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Getting Started" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Open article Reconnect a degraded integration",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Open article Set up your FrontOS workspace",
    }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "Clear help search" }).click();
  await expect(search).toHaveValue("");
  await expect(
    page.getByRole("heading", { name: "Getting Started" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Configure AI behavior" }).click();
  await expect(search).toHaveValue("AI behavior");
  await expect(
    page.getByRole("button", {
      name: "Open article Understand AI confidence thresholds",
    }),
  ).toBeVisible();
  await expect(page.getByTestId("support-workspace-feedback")).toContainText(
    "Configure AI behavior",
  );
});

test("quick actions and categories open the relevant article browser state", async ({
  page,
}) => {
  await page.goto("/help-support");

  await page.getByRole("button", { name: "Browse documentation" }).click();
  await expect(page.getByTestId("support-workspace-feedback")).toContainText(
    "complete article browser",
  );

  await page.getByRole("button", { name: "Troubleshoot integrations" }).click();
  await expect(page.getByLabel("Filter help articles")).toHaveValue(
    "integration",
  );
  await expect(
    page.getByRole("button", {
      name: "Open article Reconnect a degraded integration",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Clear help search" }).click();
  await page
    .getByRole("button", { name: "View Workspace Settings articles" })
    .click();
  await expect(page.getByLabel("Article category")).toHaveValue(
    "workspace-settings",
  );
  await expect(
    page.getByRole("button", {
      name: "Open article Configure weekly business hours",
    }),
  ).toBeVisible();
  await expect(page.getByTestId("support-workspace-feedback")).toContainText(
    "Workspace Settings articles",
  );
});

test("article detail sheet provides guidance and feedback", async ({
  page,
}) => {
  await page.goto("/help-support");
  await page
    .getByRole("button", { name: "Open article Set up your FrontOS workspace" })
    .click();

  const sheet = page.getByTestId("help-article-sheet");
  await expect(sheet).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Set up your FrontOS workspace" }),
  ).toBeVisible();
  await expect(
    sheet.getByRole("heading", { name: "Step-by-step guidance" }),
  ).toBeVisible();

  await sheet.getByRole("button", { name: "Helpful", exact: true }).click();
  await expect(sheet.getByTestId("article-feedback")).toContainText(
    "marked helpful",
  );
  await sheet.getByRole("button", { name: "Copy article link" }).click();
  await expect(sheet.getByTestId("article-feedback")).toContainText(
    "Article link copied",
  );

  await sheet
    .getByRole("button", { name: "Configure weekly business hours" })
    .click();
  await expect(
    sheet.getByRole("heading", { name: "Configure weekly business hours" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
});

test("support request validates fields, toggles diagnostics, and stays local", async ({
  page,
}) => {
  await page.goto("/help-support");
  await page.getByRole("button", { name: "Contact support" }).click();

  const panel = page.getByTestId("support-request-panel");
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: "Create request" }).click();
  await expect(panel.getByRole("alert")).toContainText(
    "Review the required fields",
  );
  await expect(panel.getByLabel("Topic")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(panel.getByLabel("Subject")).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  const diagnostics = panel.getByRole("switch", {
    name: "Include workspace diagnostics",
  });
  await expect(diagnostics).toHaveAttribute("aria-checked", "true");
  await diagnostics.focus();
  await page.keyboard.press("Space");
  await expect(diagnostics).toHaveAttribute("aria-checked", "false");
  await page.keyboard.press("Enter");
  await expect(diagnostics).toHaveAttribute("aria-checked", "true");

  await panel.getByLabel("Topic").selectOption("integrations");
  await panel.getByLabel("Priority").selectOption("high");
  await panel.getByLabel("Subject").fill("Calendar connection needs review");
  await panel
    .getByLabel("Description")
    .fill("The calendar sync is showing a degraded state.");
  await panel.getByLabel("Email").fill("ops@example.com");
  await panel.getByRole("button", { name: "Create request" }).click();

  await expect(panel.getByTestId("support-request-feedback")).toContainText(
    "Support request FR-2048 was created in this local preview.",
  );
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.getByTestId("support-workspace-feedback")).toContainText(
    "FR-2048",
  );
  await expect(
    page.getByText("Support request FR-2048 prepared"),
  ).toBeVisible();
});

test("required viewports preserve the fixed shell and one content scrollbar", async ({
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
    await page.goto("/help-support");
    await expect(page.getByLabel("Help & Support dashboard")).toBeVisible();
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
        overflowX: getComputedStyle(content).overflowX,
        overflowY: getComputedStyle(content).overflowY,
      };
    });
    expect(containment.htmlHeight).toBe(containment.viewportHeight);
    expect(containment.bodyHeight).toBe(containment.viewportHeight);
    expect(containment.overflowX).toBe("hidden");
    expect(containment.overflowY).toBe("auto");
  }
});

test("mobile cards, sheets, and navigation remain contained at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/help-support");

  const quickAction = page.getByRole("button", {
    name: "Browse documentation",
  });
  const actionBox = await quickAction.boundingBox();
  expect(actionBox?.width ?? 0).toBeGreaterThanOrEqual(340);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("dialog", { name: "Dashboard navigation" });
  await expect(
    navigation.getByRole("link", { name: "Help & Support" }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Contact support" }).click();
  const requestPanel = page.getByTestId("support-request-panel");
  const requestBox = await requestPanel.boundingBox();
  expect(requestBox?.width ?? 0).toBeLessThanOrEqual(386);
  const requestActionFits = await requestPanel
    .getByRole("button", { name: "Create request" })
    .evaluate((button) => ({
      horizontal: button.scrollWidth <= button.clientWidth,
      vertical: button.scrollHeight <= button.clientHeight,
    }));
  expect(requestActionFits.horizontal).toBe(true);
  expect(requestActionFits.vertical).toBe(true);
  await expectNoHorizontalOverflow(page);
  await page.keyboard.press("Escape");

  await page
    .getByRole("button", { name: "Open article Set up your FrontOS workspace" })
    .click();
  const articleSheet = page.getByTestId("help-article-sheet");
  const articleBox = await articleSheet.boundingBox();
  expect(Math.round(articleBox?.width ?? 0)).toBe(390);
  await expectNoHorizontalOverflow(page);
  await page.keyboard.press("Escape");
});

test("all completed dashboard routes still load", async ({ page }) => {
  for (const route of [
    "/",
    "/overview",
    "/calls",
    "/bookings",
    "/leads",
    "/customers",
    "/ai-agents",
    "/knowledge-base",
    "/integrations",
    "/reports",
    "/settings",
  ]) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    expect((await page.title()).length).toBeGreaterThan(0);
  }
});
