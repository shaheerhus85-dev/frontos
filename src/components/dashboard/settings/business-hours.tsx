"use client";

import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

import {
  NativeSelect,
  SettingsToggle,
} from "@/components/dashboard/settings/settings-controls";
import { Button } from "@/components/ui/button";
import { businessTimeOptions, type BusinessHoursDay } from "@/data/settings";
import { cn } from "@/lib/utils";

export function BusinessHours({
  hours,
  onChange,
}: Readonly<{
  hours: BusinessHoursDay[];
  onChange: (hours: BusinessHoursDay[]) => void;
}>) {
  const [feedback, setFeedback] = useState<string | null>(null);

  function updateDay(
    id: BusinessHoursDay["id"],
    patch: Partial<BusinessHoursDay>,
  ) {
    onChange(hours.map((day) => (day.id === id ? { ...day, ...patch } : day)));
    setFeedback("Business hours were updated in this local preview.");
  }

  function copyMonday() {
    const monday = hours.find((day) => day.id === "monday");
    if (!monday) return;
    onChange(
      hours.map((day) =>
        ["tuesday", "wednesday", "thursday", "friday"].includes(day.id)
          ? {
              ...day,
              isOpen: monday.isOpen,
              opensAt: monday.opensAt,
              closesAt: monday.closesAt,
            }
          : day,
      ),
    );
    setFeedback(
      "Monday's schedule was copied to weekdays in this local preview.",
    );
  }

  return (
    <section data-testid="business-hours" className="min-w-0">
      <header className="flex flex-col gap-3 px-5 pt-6 sm:flex-row sm:items-start sm:justify-between sm:px-7 sm:pt-7">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-[#182136] sm:text-xl">
            Business hours
          </h3>
          <p className="mt-1 text-sm leading-6 text-secondary">
            Weekly availability used by the fictional AI front desk.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={copyMonday}>
          <Copy className="size-4" aria-hidden="true" />
          Copy Monday to weekdays
        </Button>
      </header>

      <div className="px-5 pt-5 pb-7 sm:px-7">
        <div className="hidden border-b border-border px-1 pb-2 text-xs font-semibold text-[#687389] md:grid md:grid-cols-[7rem_9rem_minmax(8rem,12rem)_minmax(8rem,12rem)] md:gap-4">
          <span>Day</span>
          <span>Status</span>
          <span>Opens</span>
          <span>Closes</span>
        </div>
        <div className="divide-y divide-border">
          {hours.map((day) => (
            <div
              key={day.id}
              data-testid={`business-hours-${day.id}`}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 py-4 md:grid-cols-[7rem_9rem_minmax(8rem,12rem)_minmax(8rem,12rem)] md:gap-4"
            >
              <p className="text-sm font-semibold text-[#344057]">
                {day.label}
              </p>
              <div className="flex items-center justify-end gap-3 md:justify-start">
                <SettingsToggle
                  compact
                  label={`${day.label} business hours`}
                  checked={day.isOpen}
                  onCheckedChange={(checked) =>
                    updateDay(day.id, { isOpen: checked })
                  }
                />
                <span
                  className={cn(
                    "min-w-10 text-xs font-semibold",
                    day.isOpen ? "text-[#526078]" : "text-muted",
                  )}
                >
                  {day.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <div className="col-span-2 mt-3 grid grid-cols-2 gap-3 md:contents">
                <div>
                  <label
                    htmlFor={`${day.id}-opens`}
                    className="mb-1.5 block text-sm font-semibold text-[#526078] md:sr-only"
                  >
                    Opens
                  </label>
                  <NativeSelect
                    id={`${day.id}-opens`}
                    aria-label={`${day.label} opening time`}
                    value={day.opensAt}
                    disabled={!day.isOpen}
                    onChange={(event) =>
                      updateDay(day.id, { opensAt: event.target.value })
                    }
                  >
                    {businessTimeOptions.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </NativeSelect>
                </div>
                <div>
                  <label
                    htmlFor={`${day.id}-closes`}
                    className="mb-1.5 block text-sm font-semibold text-[#526078] md:sr-only"
                  >
                    Closes
                  </label>
                  <NativeSelect
                    id={`${day.id}-closes`}
                    aria-label={`${day.label} closing time`}
                    value={day.closesAt}
                    disabled={!day.isOpen}
                    onChange={(event) =>
                      updateDay(day.id, { closesAt: event.target.value })
                    }
                  >
                    {businessTimeOptions.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </NativeSelect>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="min-h-5 border-t border-border pt-3 text-xs font-medium text-[#39745f]"
          role="status"
          aria-live="polite"
          data-testid="hours-feedback"
        >
          {feedback ? (
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {feedback}
            </span>
          ) : null}
        </p>
      </div>
    </section>
  );
}
