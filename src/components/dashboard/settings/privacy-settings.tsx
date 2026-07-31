"use client";

import { CheckCircle2, FileSearch, Info, Shield } from "lucide-react";
import { useState } from "react";

import { DangerZone } from "@/components/dashboard/settings/danger-zone";
import { SettingsToggle } from "@/components/dashboard/settings/settings-controls";
import { Button } from "@/components/ui/button";
import type { DangerActionId, PrivacyControl } from "@/data/settings";

export function PrivacySettings({
  controls,
  integrationsConnected,
  onChange,
  onDangerConfirm,
}: Readonly<{
  controls: PrivacyControl[];
  integrationsConnected: boolean;
  onChange: (controls: PrivacyControl[]) => void;
  onDangerConfirm: (action: DangerActionId) => void;
}>) {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <section data-testid="privacy-settings" className="min-w-0">
      <header className="px-5 pt-6 sm:px-7 sm:pt-7">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#182136] sm:text-xl">
          <Shield className="size-5 text-success" aria-hidden="true" />
          Privacy and data controls
        </h3>
        <p className="mt-1 text-sm leading-6 text-secondary">
          Fictional data-handling preferences for this local preview.
        </p>
      </header>

      <div className="px-5 pt-5 pb-7 sm:px-7">
        <div className="divide-y divide-border border-y border-border">
          {controls.map((control) => (
            <div key={control.id} className="py-3.5">
              <SettingsToggle
                label={control.label}
                description={control.description}
                checked={control.enabled}
                onCheckedChange={(checked) => {
                  onChange(
                    controls.map((item) =>
                      item.id === control.id
                        ? { ...item, enabled: checked }
                        : item,
                    ),
                  );
                  setFeedback(null);
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 border-l-2 border-primary bg-[#f8faff] px-3 py-2.5 text-[13px] leading-5 text-[#526078]">
          <Info
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            <span className="font-semibold text-[#315b9e]">
              Fictional compliance note:
            </span>{" "}
            These product-design controls do not represent legal, regulatory, or
            compliance guarantees.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              setFeedback(
                "The demo data policy was prepared for local review; no policy or record was changed.",
              )
            }
          >
            <FileSearch className="size-4" aria-hidden="true" />
            Review data policy
          </Button>
          <p
            data-testid="privacy-feedback"
            className="min-h-5 text-xs font-medium text-[#39745f]"
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

        <DangerZone
          integrationsConnected={integrationsConnected}
          onConfirm={onDangerConfirm}
        />
      </div>
    </section>
  );
}
