"use client";

import { Bot, ShieldCheck } from "lucide-react";

import {
  FieldLabel,
  NativeSelect,
  SettingsToggle,
} from "@/components/dashboard/settings/settings-controls";
import {
  afterHoursOptions,
  languageOptions,
  responseToneOptions,
  type AiBehaviorSettings,
} from "@/data/settings";

export function AiBehavior({
  settings,
  onChange,
}: Readonly<{
  settings: AiBehaviorSettings;
  onChange: (settings: AiBehaviorSettings) => void;
}>) {
  function update<Key extends keyof AiBehaviorSettings>(
    key: Key,
    value: AiBehaviorSettings[Key],
  ) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <section data-testid="ai-behavior" className="min-w-0">
      <header className="px-5 pt-6 sm:px-7 sm:pt-7">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-[#182136] sm:text-xl">
          <Bot className="size-5 text-violet" aria-hidden="true" />
          AI front desk behavior
        </h3>
        <p className="mt-1 text-sm leading-6 text-secondary">
          Conversational defaults, confidence rules, and allowed actions.
        </p>
      </header>

      <div className="px-5 pt-5 pb-7 sm:px-7">
        <div className="grid max-w-[920px] grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="response-tone">Response tone</FieldLabel>
            <NativeSelect
              id="response-tone"
              value={settings.responseTone}
              onChange={(event) => update("responseTone", event.target.value)}
            >
              {responseToneOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="primary-language">Primary language</FieldLabel>
            <NativeSelect
              id="primary-language"
              value={settings.primaryLanguage}
              onChange={(event) =>
                update("primaryLanguage", event.target.value)
              }
            >
              {languageOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="handoff-attempts">
              Human handoff after
            </FieldLabel>
            <NativeSelect
              id="handoff-attempts"
              value={settings.handoffAttempts}
              onChange={(event) =>
                update("handoffAttempts", Number(event.target.value))
              }
            >
              {[1, 2, 3, 4].map((attempts) => (
                <option key={attempts} value={attempts}>
                  {attempts} failed intent {attempts === 1 ? "check" : "checks"}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="after-hours-handling">
              After-hours handling
            </FieldLabel>
            <NativeSelect
              id="after-hours-handling"
              value={settings.afterHoursHandling}
              onChange={(event) =>
                update("afterHoursHandling", event.target.value)
              }
            >
              {afterHoursOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
        </div>

        <section
          className="mt-6 border-y border-[#e3dcfb] bg-[#faf9ff] px-3 py-4 sm:px-4"
          aria-labelledby="confidence-heading"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                id="confidence-heading"
                htmlFor="confidence-threshold"
                className="text-base font-semibold text-[#344057]"
              >
                Confidence threshold
              </label>
              <p className="mt-0.5 text-[13px] leading-5 text-secondary">
                Below this level, ask for clarification or hand off to staff.
              </p>
            </div>
            <output
              htmlFor="confidence-threshold"
              className="shrink-0 font-display text-lg font-semibold text-violet"
            >
              {settings.confidenceThreshold}%
            </output>
          </div>
          <input
            id="confidence-threshold"
            type="range"
            min={50}
            max={95}
            step={1}
            value={settings.confidenceThreshold}
            aria-valuetext={`${settings.confidenceThreshold}% confidence`}
            onChange={(event) =>
              update("confidenceThreshold", Number(event.target.value))
            }
            className="mt-3 h-2 w-full cursor-pointer accent-[#7457ff] focus-visible:outline-none"
          />
          <div className="mt-1 flex justify-between text-xs font-medium text-muted">
            <span>More autonomous</span>
            <span>More cautious</span>
          </div>
        </section>

        <section className="mt-6" aria-labelledby="ai-permissions-heading">
          <h4
            id="ai-permissions-heading"
            className="font-display text-base font-semibold text-[#27334a]"
          >
            Allowed actions
          </h4>
          <div className="mt-2 divide-y divide-border border-y border-border">
            <div className="py-4">
              <SettingsToggle
                label="Allow appointment rescheduling"
                description="Move eligible fictional bookings after customer confirmation."
                checked={settings.allowRescheduling}
                onCheckedChange={(checked) =>
                  update("allowRescheduling", checked)
                }
              />
            </div>
            <div className="py-4">
              <SettingsToggle
                label="Allow lead qualification"
                description="Collect and score fictional prospect details during conversations."
                checked={settings.allowLeadQualification}
                onCheckedChange={(checked) =>
                  update("allowLeadQualification", checked)
                }
              />
            </div>
            <div className="py-4">
              <SettingsToggle
                label="Confirm sensitive changes"
                description="Require clear confirmation before high-impact schedule or profile changes."
                checked={settings.confirmSensitiveChanges}
                onCheckedChange={(checked) =>
                  update("confirmSensitiveChanges", checked)
                }
              />
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-start gap-3 border-l-2 border-primary bg-[#f8faff] px-3 py-2.5 text-[13px] leading-5 text-[#526078]">
          <ShieldCheck
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          These preferences model local behavior only; no AI service is
          connected.
        </div>
      </div>
    </section>
  );
}
