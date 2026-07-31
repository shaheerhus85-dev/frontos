"use client";

import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  Bot,
  Building2,
  CheckCircle2,
  Clock3,
  Save,
  Shield,
  Undo2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AiBehavior } from "@/components/dashboard/settings/ai-behavior";
import { BusinessHours } from "@/components/dashboard/settings/business-hours";
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings";
import { PrivacySettings } from "@/components/dashboard/settings/privacy-settings";
import { WorkspaceProfile } from "@/components/dashboard/settings/workspace-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  createInitialSettings,
  settingsCategories,
  type DangerActionId,
  type SettingsCategoryId,
  type SettingsState,
} from "@/data/settings";
import { cn } from "@/lib/utils";

const categoryIcons: Record<SettingsCategoryId, LucideIcon> = {
  workspace: Building2,
  hours: Clock3,
  "ai-behavior": Bot,
  notifications: BellRing,
  privacy: Shield,
};

function cloneSettings(settings: SettingsState): SettingsState {
  return {
    workspace: { ...settings.workspace },
    businessHours: settings.businessHours.map((day) => ({ ...day })),
    aiBehavior: { ...settings.aiBehavior },
    notifications: settings.notifications.map((item) => ({ ...item })),
    deliveryChannels: settings.deliveryChannels.map((item) => ({ ...item })),
    privacyControls: settings.privacyControls.map((item) => ({ ...item })),
  };
}

export function SettingsWorkspace() {
  const [activeCategory, setActiveCategory] =
    useState<SettingsCategoryId>("workspace");
  const [draft, setDraft] = useState<SettingsState>(createInitialSettings);
  const [saved, setSaved] = useState<SettingsState>(createInitialSettings);
  const [integrationsConnected, setIntegrationsConnected] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(saved),
    [draft, saved],
  );

  function changeDraft(patch: Partial<SettingsState>) {
    setDraft((current) => ({ ...current, ...patch }));
    setFeedback(null);
  }

  function saveAllChanges() {
    setSaved(cloneSettings(draft));
    setFeedback("All settings were saved in this local preview.");
  }

  function resetChanges() {
    setDraft(cloneSettings(saved));
    setFeedback("Unsaved changes were reset to the last local save.");
  }

  function handleDangerAction(action: DangerActionId) {
    if (action === "reset-workspace") {
      const initial = createInitialSettings();
      setDraft(cloneSettings(initial));
      setSaved(cloneSettings(initial));
      setIntegrationsConnected(true);
      setFeedback("The demo workspace was reset in local state only.");
      return;
    }
    setIntegrationsConnected(false);
    setFeedback("Demo integrations were disconnected in local state only.");
  }

  return (
    <section
      className="mx-auto w-full max-w-[1240px] pb-2"
      aria-label="Settings dashboard"
    >
      <Card className="min-w-0 overflow-hidden" data-testid="settings-surface">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-[#11182a]">
                Settings workspace
              </h2>
              <span
                data-testid="unsaved-indicator"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                  hasUnsavedChanges
                    ? "bg-[#fff7e8] text-[#8f621d]"
                    : "bg-[#ebfaf4] text-[#168861]",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    hasUnsavedChanges ? "bg-warning" : "bg-success",
                  )}
                  aria-hidden="true"
                />
                {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
            <p className="mt-1 text-sm text-secondary">
              Manage operational preferences for the Acme Clinic workspace.
            </p>
            <p
              data-testid="settings-feedback"
              className={cn(
                "text-xs font-medium text-[#39745f]",
                feedback ? "mt-1" : "sr-only",
              )}
              role="status"
              aria-live="polite"
            >
              {feedback ? (
                <span className="inline-flex items-start gap-1.5">
                  <CheckCircle2
                    className="mt-0.5 size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {feedback}
                </span>
              ) : null}
            </p>
          </div>
          <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              className="min-w-0 px-2 text-xs sm:px-3 sm:text-sm"
              disabled={!hasUnsavedChanges}
              onClick={resetChanges}
            >
              <Undo2 className="size-4" aria-hidden="true" />
              <span className="sm:hidden">Reset</span>
              <span className="hidden sm:inline">Reset changes</span>
            </Button>
            <Button
              size="sm"
              className="min-w-0 px-2 text-xs sm:px-3 sm:text-sm"
              disabled={!hasUnsavedChanges}
              onClick={saveAllChanges}
            >
              <Save className="size-4" aria-hidden="true" />
              <span className="sm:hidden">Save</span>
              <span className="hidden sm:inline">Save changes</span>
            </Button>
          </div>
        </div>

        <div className="relative border-b border-border bg-[#fbfcfe]">
          <div
            className="flex min-w-0 [scrollbar-width:none] gap-1 overflow-x-auto px-3 py-2 sm:px-5 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Settings categories"
          >
            {settingsCategories.map((category) => {
              const Icon = categoryIcons[category.id];
              const active = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`settings-tab-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`settings-panel-${category.id}`}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-primary/20 sm:px-4",
                    active
                      ? "bg-surface text-[#1f67d7] shadow-[0_1px_3px_rgb(16_21_37/0.1)]"
                      : "text-[#536078] hover:bg-[#f1f4fa] hover:text-[#18233a]",
                  )}
                >
                  <Icon className="size-[17px] shrink-0" aria-hidden="true" />
                  {category.label}
                </button>
              );
            })}
          </div>
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#fbfcfe] to-transparent lg:hidden"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-[#fbfcfe] to-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>

        <div
          id={`settings-panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`settings-tab-${activeCategory}`}
          className="min-w-0"
        >
          {activeCategory === "workspace" ? (
            <WorkspaceProfile
              profile={draft.workspace}
              onChange={(workspace) => changeDraft({ workspace })}
            />
          ) : null}
          {activeCategory === "hours" ? (
            <BusinessHours
              hours={draft.businessHours}
              onChange={(businessHours) => changeDraft({ businessHours })}
            />
          ) : null}
          {activeCategory === "ai-behavior" ? (
            <AiBehavior
              settings={draft.aiBehavior}
              onChange={(aiBehavior) => changeDraft({ aiBehavior })}
            />
          ) : null}
          {activeCategory === "notifications" ? (
            <NotificationSettings
              preferences={draft.notifications}
              channels={draft.deliveryChannels}
              onPreferencesChange={(notifications) =>
                changeDraft({ notifications })
              }
              onChannelsChange={(deliveryChannels) =>
                changeDraft({ deliveryChannels })
              }
            />
          ) : null}
          {activeCategory === "privacy" ? (
            <PrivacySettings
              controls={draft.privacyControls}
              integrationsConnected={integrationsConnected}
              onChange={(privacyControls) => changeDraft({ privacyControls })}
              onDangerConfirm={handleDangerAction}
            />
          ) : null}
        </div>
      </Card>
    </section>
  );
}
