"use client";

import { BellRing, Mail, MessageSquare, Smartphone } from "lucide-react";

import { SettingsToggle } from "@/components/dashboard/settings/settings-controls";
import type { DeliveryChannel, NotificationPreference } from "@/data/settings";

const channelIcons = {
  email: Mail,
  "in-app": MessageSquare,
  sms: Smartphone,
} as const;

export function NotificationSettings({
  preferences,
  channels,
  onPreferencesChange,
  onChannelsChange,
}: Readonly<{
  preferences: NotificationPreference[];
  channels: DeliveryChannel[];
  onPreferencesChange: (preferences: NotificationPreference[]) => void;
  onChannelsChange: (channels: DeliveryChannel[]) => void;
}>) {
  return (
    <section data-testid="notification-settings" className="min-w-0">
      <header className="px-5 pt-6 sm:px-7 sm:pt-7">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#182136] sm:text-xl">
          <BellRing className="size-5 text-primary" aria-hidden="true" />
          Notifications
        </h3>
        <p className="mt-1 text-sm leading-6 text-secondary">
          Operational events and delivery preferences for workspace staff.
        </p>
      </header>

      <div className="px-5 pt-5 pb-7 sm:px-7">
        <section aria-labelledby="notification-events-heading">
          <h4
            id="notification-events-heading"
            className="font-display text-base font-semibold text-[#27334a]"
          >
            Notification events
          </h4>
          <div className="mt-2 divide-y divide-border border-y border-border">
            {preferences.map((preference) => (
              <div key={preference.id} className="py-3.5">
                <SettingsToggle
                  label={preference.label}
                  description={preference.description}
                  checked={preference.enabled}
                  onCheckedChange={(checked) =>
                    onPreferencesChange(
                      preferences.map((item) =>
                        item.id === preference.id
                          ? { ...item, enabled: checked }
                          : item,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7" aria-labelledby="delivery-channels-heading">
          <h4
            id="delivery-channels-heading"
            className="font-display text-base font-semibold text-[#27334a]"
          >
            Delivery channels
          </h4>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            Delivery remains fictional and local to this settings preview.
          </p>
          <div className="mt-3 grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {channels.map((channel) => {
              const Icon = channelIcons[channel.id];
              return (
                <div
                  key={channel.id}
                  className="min-w-0 px-1 py-4 sm:px-4 sm:first:pl-0 sm:last:pr-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#edf4ff] text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <SettingsToggle
                      compact
                      label={`${channel.label} delivery`}
                      checked={channel.enabled}
                      disabled={!channel.configured}
                      onCheckedChange={(checked) =>
                        onChannelsChange(
                          channels.map((item) =>
                            item.id === channel.id
                              ? { ...item, enabled: checked }
                              : item,
                          ),
                        )
                      }
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#344057]">
                    {channel.label}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-secondary">
                    {channel.description}
                  </p>
                  {!channel.configured ? (
                    <span className="mt-2 inline-flex rounded-full bg-[#fff7e8] px-2 py-0.5 text-xs font-semibold text-[#8f621d]">
                      Not configured
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
