import { expect, test } from "@playwright/test";

const requiredNavigation = [
  "Overview",
  "Calls",
  "Bookings",
  "Leads",
  "Customers",
  "AI Agents",
  "Knowledge Base",
  "Integrations",
  "Reports",
  "Settings",
  "Help & Support",
] as const;

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
}

test("overview renders the responsive desktop and tablet shell", async ({
  page,
}) => {
  const layouts = [
    { width: 1440, height: 900, sidebarWidth: 240 },
    { width: 1024, height: 768, sidebarWidth: 240 },
    { width: 768, height: 1024, sidebarWidth: 72 },
  ] as const;

  for (const layout of layouts) {
    await page.setViewportSize(layout);
    await page.goto("/overview");

    await expect(page.getByTestId("dashboard-shell")).toBeVisible();
    await expect(page.getByTestId("dashboard-header")).toBeVisible();
    await expect(page.getByLabel("Overview dashboard")).toBeVisible();

    const sidebarBox = await page.getByTestId("desktop-sidebar").boundingBox();
    const headerBox = await page.getByTestId("dashboard-header").boundingBox();

    expect(Math.round(sidebarBox?.width ?? 0)).toBe(layout.sidebarWidth);
    expect(Math.round(headerBox?.height ?? 0)).toBe(72);
    await expectNoHorizontalOverflow(page);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/overview");

  const sidebar = page.getByTestId("desktop-sidebar");
  await expect(
    sidebar.locator('[data-testid="frontos-logo"]:visible'),
  ).toBeVisible();
  await expect(
    sidebar.locator('[data-logo-mark="aurora-prism-star"]:visible'),
  ).toBeVisible();
  await expect(
    sidebar.getByRole("button", {
      name: "Switch workspace. Current workspace: Acme Clinic",
    }),
  ).toBeVisible();
  await expect(
    sidebar.getByText("Business Workspace", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Good morning, Alex. Here’s what’s happening today."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Selected date range: May 12 through May 18",
    }),
  ).toBeVisible();

  for (const label of requiredNavigation) {
    await expect(sidebar.getByText(label, { exact: true })).toBeVisible();
  }

  const activeOverview = sidebar.getByRole("link", {
    name: "Overview",
    exact: true,
  });
  await expect(activeOverview).toHaveAttribute("aria-current", "page");
  expect(
    await activeOverview.evaluate(
      (element) => getComputedStyle(element).boxShadow,
    ),
  ).toBe("none");

  const avatarBox = await page.getByTestId("user-avatar").boundingBox();
  expect((avatarBox?.x ?? 0) + (avatarBox?.width ?? 0)).toBeGreaterThan(1380);
});

test("mobile navigation opens, closes, and preserves stable width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/overview");

  await expect(page.getByTestId("desktop-sidebar")).toBeHidden();
  await expect(page.getByTestId("user-avatar")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Notifications" }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const titleBox = await page
    .getByRole("heading", { name: "Overview" })
    .boundingBox();
  const searchBox = await page
    .getByRole("button", { name: "Search" })
    .boundingBox();
  const notificationBox = await page
    .getByRole("button", { name: "Notifications" })
    .boundingBox();
  const avatarBox = await page.getByTestId("user-avatar").boundingBox();

  expect((titleBox?.x ?? 0) + (titleBox?.width ?? 0)).toBeLessThanOrEqual(
    searchBox?.x ?? 0,
  );
  expect((searchBox?.x ?? 0) + (searchBox?.width ?? 0)).toBeLessThanOrEqual(
    notificationBox?.x ?? 0,
  );
  expect(
    (notificationBox?.x ?? 0) + (notificationBox?.width ?? 0),
  ).toBeLessThanOrEqual(avatarBox?.x ?? 0);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Dashboard navigation" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByTestId("frontos-logo")).toBeVisible();
  await expect(
    drawer.locator('[data-logo-mark="aurora-prism-star"]'),
  ).toBeVisible();
  await expect(
    drawer.getByRole("button", {
      name: "Switch workspace. Current workspace: Acme Clinic",
    }),
  ).toBeVisible();
  await expect(
    drawer.getByText("Business Workspace", { exact: true }),
  ).toBeVisible();

  for (const label of requiredNavigation) {
    await expect(drawer.getByText(label, { exact: true })).toBeVisible();
  }

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(drawer).toBeVisible();
  await drawer.getByRole("button", { name: "Close navigation" }).click();
  await expect(drawer).toBeHidden();
  await expectNoHorizontalOverflow(page);
});
