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

async function openCategory(
  page: import("@playwright/test").Page,
  name: string,
) {
  await page.getByRole("tab", { name: new RegExp(`^${name}`) }).click();
}

async function expectSharedSwitchGeometry(
  page: import("@playwright/test").Page,
) {
  const geometries = await page
    .locator('[data-slot="switch"]')
    .evaluateAll((switches) =>
      switches.map((control) => {
        const track = control.querySelector<HTMLElement>(
          '[data-slot="switch-track"]',
        );
        const thumb = control.querySelector<HTMLElement>(
          '[data-slot="switch-thumb"]',
        );
        if (!track || !thumb) throw new Error("Switch geometry is incomplete");
        const controlBox = control.getBoundingClientRect();
        const trackBox = track.getBoundingClientRect();
        const thumbBox = thumb.getBoundingClientRect();
        return {
          controlWidth: controlBox.width,
          controlHeight: controlBox.height,
          trackWidth: trackBox.width,
          trackHeight: trackBox.height,
          thumbWidth: thumbBox.width,
          thumbHeight: thumbBox.height,
          leftInset: thumbBox.left - trackBox.left,
          rightInset: trackBox.right - thumbBox.right,
        };
      }),
    );

  expect(geometries.length).toBeGreaterThan(0);
  for (const geometry of geometries) {
    expect(geometry.controlWidth).toBeGreaterThanOrEqual(44);
    expect(geometry.controlHeight).toBeGreaterThanOrEqual(44);
    expect(geometry.trackWidth).toBe(44);
    expect(geometry.trackHeight).toBe(24);
    expect(geometry.thumbWidth).toBe(18);
    expect(geometry.thumbHeight).toBe(18);
    expect(geometry.leftInset).toBeGreaterThanOrEqual(2.9);
    expect(geometry.rightInset).toBeGreaterThanOrEqual(2.9);
  }
}

test("settings route renders its header and active navigation state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/settings");

  await expect(page.getByLabel("Settings dashboard")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Settings", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Configure your workspace, AI behavior, notifications, and operational preferences.",
    ),
  ).toBeVisible();
  await expect(
    page.getByTestId("desktop-sidebar").getByRole("link", { name: "Settings" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByTestId("workspace-profile")).toBeVisible();
  await expect(page.locator('[data-slot="card"]')).toHaveCount(1);
  await expect(page.getByTestId("unsaved-indicator")).toHaveText(
    "All changes saved",
  );
  await expectNoHorizontalOverflow(page);
});

test("category navigation switches the selected settings panel", async ({
  page,
}) => {
  await page.goto("/settings");

  for (const category of [
    { tab: "Hours", panel: "business-hours" },
    { tab: "AI Behavior", panel: "ai-behavior" },
    { tab: "Notifications", panel: "notification-settings" },
    { tab: "Privacy", panel: "privacy-settings" },
    { tab: "Workspace", panel: "workspace-profile" },
  ]) {
    await openCategory(page, category.tab);
    await expect(page.getByTestId(category.panel)).toBeVisible();
    await expect(
      page.getByRole("tab", { name: new RegExp(`^${category.tab}`) }),
    ).toHaveAttribute("aria-selected", "true");
  }
});

test("workspace fields support local update, save, and reset feedback", async ({
  page,
}) => {
  await page.goto("/settings");
  const workspaceName = page.getByLabel("Workspace name");

  await workspaceName.fill("Acme Wellness Group");
  await expect(page.getByTestId("unsaved-indicator")).toContainText(
    "Unsaved changes",
  );
  await page.getByRole("button", { name: "Reset changes" }).click();
  await expect(workspaceName).toHaveValue("Acme Clinic");
  await expect(page.getByTestId("settings-feedback")).toContainText(
    "Unsaved changes were reset",
  );

  await workspaceName.fill("Acme Wellness Group");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByTestId("unsaved-indicator")).toContainText(
    "All changes saved",
  );
  await expect(page.getByTestId("settings-feedback")).toContainText(
    "All settings were saved in this local preview.",
  );

  await page.getByLabel("Contact phone").fill("+1 (555) 010-0199");
  await expect(
    page.getByRole("button", { name: "Update workspace" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByTestId("settings-feedback")).toContainText(
    "All settings were saved in this local preview.",
  );
});

test("business hours toggles, time controls, and weekday copy update locally", async ({
  page,
}) => {
  await page.goto("/settings");
  await openCategory(page, "Hours");

  const sunday = page.getByRole("switch", {
    name: "Sunday business hours",
  });
  const sundayOpens = page.getByLabel("Sunday opening time");
  const sundayCloses = page.getByLabel("Sunday closing time");
  await expect(sunday).toHaveAttribute("aria-checked", "false");
  await expect(sundayOpens).toBeDisabled();
  await expect(sundayCloses).toBeDisabled();

  await sunday.focus();
  await page.keyboard.press("Space");
  await expect(sunday).toHaveAttribute("aria-checked", "true");
  await expect(sundayOpens).toBeEnabled();
  await expect(sundayCloses).toBeEnabled();

  await page.keyboard.press("Enter");
  await expect(sunday).toHaveAttribute("aria-checked", "false");
  await expect(sundayOpens).toBeDisabled();
  await expect(sundayCloses).toBeDisabled();

  await page.keyboard.press("Space");
  await sundayOpens.selectOption("10:00 AM");
  await expect(page.getByTestId("hours-feedback")).toContainText(
    "Business hours were updated",
  );

  await page.getByLabel("Monday opening time").selectOption("8:30 AM");
  await page.getByRole("button", { name: "Copy Monday to weekdays" }).click();
  await expect(page.getByLabel("Tuesday opening time")).toHaveValue("8:30 AM");
  await expect(page.getByTestId("hours-feedback")).toContainText(
    "copied to weekdays",
  );
  await expect(page.getByTestId("unsaved-indicator")).toContainText(
    "Unsaved changes",
  );
});

test("AI behavior controls update and save in local state", async ({
  page,
}) => {
  await page.goto("/settings");
  await openCategory(page, "AI Behavior");

  await page.getByLabel("Response tone").selectOption("Concise and direct");
  await page.getByLabel("Human handoff after").selectOption("3");
  const slider = page.getByRole("slider", { name: "Confidence threshold" });
  await slider.fill("84");
  await expect(slider).toHaveValue("84");

  const rescheduling = page.getByRole("switch", {
    name: "Allow appointment rescheduling",
  });
  await rescheduling.click();
  await expect(rescheduling).toHaveAttribute("aria-checked", "false");
  await expect(
    page.getByRole("button", { name: "Save AI behavior" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByTestId("settings-feedback")).toContainText(
    "All settings were saved in this local preview.",
  );
});

test("notification and privacy preferences use accessible local toggles", async ({
  page,
}) => {
  await page.goto("/settings");
  await openCategory(page, "Notifications");

  const missedCall = page.getByRole("switch", {
    name: "Missed or abandoned call",
  });
  await missedCall.click();
  await expect(missedCall).toHaveAttribute("aria-checked", "false");
  const weeklySummary = page.getByRole("switch", {
    name: "Weekly performance summary",
  });
  await weeklySummary.click();
  await expect(weeklySummary).toHaveAttribute("aria-checked", "true");
  const sms = page.getByRole("switch", { name: "SMS delivery" });
  await expect(sms).toBeDisabled();
  await expect(sms).toHaveAttribute("aria-checked", "false");
  await sms.evaluate((control: HTMLButtonElement) => control.click());
  await expect(sms).toHaveAttribute("aria-checked", "false");
  await expect(page.getByText("Not configured")).toBeVisible();

  await openCategory(page, "Privacy");
  const analytics = page.getByRole("switch", {
    name: "Allow anonymized analytics",
  });
  await analytics.click();
  await expect(analytics).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Review data policy" }).click();
  await expect(page.getByTestId("privacy-feedback")).toContainText(
    "prepared for local review",
  );
});

test("shared switches keep consistent geometry, states, and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/settings");
  await openCategory(page, "Notifications");

  const email = page.getByRole("switch", { name: "Email delivery" });
  const weeklySummary = page.getByRole("switch", {
    name: "Weekly performance summary",
  });
  const sms = page.getByRole("switch", { name: "SMS delivery" });

  const [onColor, offColor, disabledColor] = await Promise.all(
    [email, weeklySummary, sms].map((control) =>
      control
        .locator('[data-slot="switch-track"]')
        .evaluate((track) => getComputedStyle(track).backgroundColor),
    ),
  );
  expect(new Set([onColor, offColor, disabledColor]).size).toBe(3);

  await weeklySummary.focus();
  await page.keyboard.press("Space");
  await expect(weeklySummary).toHaveAttribute("aria-checked", "true");
  expect(
    await weeklySummary.evaluate(
      (control) => getComputedStyle(control).boxShadow !== "none",
    ),
  ).toBe(true);

  await expectSharedSwitchGeometry(page);
});

test("danger actions require confirmation and only change local preview state", async ({
  page,
}) => {
  await page.goto("/settings");
  await openCategory(page, "Privacy");

  await page.getByRole("button", { name: "Reset demo workspace" }).click();
  let dialog = page.getByRole("dialog", {
    name: "Reset the demo workspace?",
  });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Reset demo workspace" }).click();
  dialog = page.getByRole("dialog", { name: "Reset the demo workspace?" });
  await dialog.getByRole("button", { name: "Confirm reset" }).click();
  await expect(page.getByTestId("danger-feedback")).toContainText(
    "reset locally",
  );

  await page
    .getByRole("button", { name: "Disconnect all demo integrations" })
    .click();
  dialog = page.getByRole("dialog", {
    name: "Disconnect all demo integrations?",
  });
  await expect(dialog).toContainText("local preview state only");
  await dialog.getByRole("button", { name: "Confirm disconnect" }).click();
  await expect(page.getByTestId("danger-feedback")).toContainText(
    "marked disconnected",
  );
  await expect(page.getByText("Demo integrations disconnected")).toBeVisible();
});

test("responsive settings layouts preserve one application scrollbar", async ({
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
    await page.goto("/settings");
    await expect(page.getByLabel("Settings dashboard")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const tabs = [
      "Workspace",
      "Hours",
      "AI Behavior",
      "Notifications",
      "Privacy",
    ].map((name) => page.getByRole("tab", { name }));
    const tabBoxes = await Promise.all(tabs.map((tab) => tab.boundingBox()));
    expect(new Set(tabBoxes.map((box) => Math.round(box?.y ?? 0))).size).toBe(
      1,
    );
    for (const box of tabBoxes)
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    for (const category of [
      "Hours",
      "AI Behavior",
      "Notifications",
      "Privacy",
    ]) {
      await openCategory(page, category);
      await expectSharedSwitchGeometry(page);
      await expectNoHorizontalOverflow(page);

      if (category === "Hours") {
        const monday = page.getByTestId("business-hours-monday");
        const [switchBox, statusBox] = await Promise.all([
          monday
            .getByRole("switch", { name: "Monday business hours" })
            .boundingBox(),
          monday.getByText("Open", { exact: true }).boundingBox(),
        ]);
        expect(
          (statusBox?.x ?? 0) - ((switchBox?.x ?? 0) + (switchBox?.width ?? 0)),
        ).toBeGreaterThanOrEqual(10);
      }
    }

    const containment = await page.evaluate(() => {
      const content = document.querySelector<HTMLElement>(
        '[data-testid="dashboard-content"]',
      );
      if (!content) throw new Error("Dashboard content is missing");
      return {
        viewportHeight: window.innerHeight,
        htmlHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight,
        overflowY: getComputedStyle(content).overflowY,
      };
    });
    expect(containment.htmlHeight).toBe(containment.viewportHeight);
    expect(containment.bodyHeight).toBe(containment.viewportHeight);
    expect(containment.overflowY).toBe("auto");
  }

  expect(
    await page
      .getByRole("tablist", { name: "Settings categories" })
      .evaluate((tabs) => tabs.scrollWidth > tabs.clientWidth),
  ).toBe(true);
  const [resetBox, saveBox] = await Promise.all([
    page.getByRole("button", { name: "Reset", exact: true }).boundingBox(),
    page.getByRole("button", { name: "Save", exact: true }).boundingBox(),
  ]);
  expect(Math.round(resetBox?.y ?? 0)).toBe(Math.round(saveBox?.y ?? 0));
  expect((saveBox?.x ?? 0) + (saveBox?.width ?? 0)).toBeLessThanOrEqual(370);

  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Dashboard navigation" });
  await expect(drawer.getByRole("link", { name: "Settings" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await page.keyboard.press("Escape");

  await openCategory(page, "Privacy");
  expect(
    await page
      .getByTestId("dashboard-content")
      .evaluate((content) => content.scrollHeight > content.clientHeight),
  ).toBe(true);
  await page.getByRole("button", { name: "Reset demo workspace" }).click();
  const confirmation = page.getByTestId("danger-confirmation-dialog");
  const box = await confirmation.boundingBox();
  expect(box?.width ?? 0).toBeLessThanOrEqual(358);
  await expectNoHorizontalOverflow(page);
});

test("all completed application routes still load", async ({ page }) => {
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
  ]) {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    expect((await page.title()).length).toBeGreaterThan(0);
  }
});
