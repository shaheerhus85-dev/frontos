"use client";

import { Building2 } from "lucide-react";

import {
  FieldLabel,
  NativeSelect,
} from "@/components/dashboard/settings/settings-controls";
import { Input } from "@/components/ui/input";
import {
  businessTypeOptions,
  languageOptions,
  timeZoneOptions,
  type WorkspaceProfile as WorkspaceProfileData,
} from "@/data/settings";

export function WorkspaceProfile({
  profile,
  onChange,
}: Readonly<{
  profile: WorkspaceProfileData;
  onChange: (profile: WorkspaceProfileData) => void;
}>) {
  function update<Key extends keyof WorkspaceProfileData>(
    key: Key,
    value: WorkspaceProfileData[Key],
  ) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <section data-testid="workspace-profile" className="min-w-0">
      <header className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold tracking-tight text-[#182136] sm:text-xl">
            Workspace profile
          </h3>
          <p className="mt-1 text-sm leading-6 text-secondary">
            Business identity and regional defaults used throughout FrontOS.
          </p>
        </div>
        <div
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf4ff] font-display text-sm font-semibold text-primary"
          aria-label="Acme Clinic workspace initials"
        >
          AC
        </div>
      </header>

      <div className="px-5 pt-5 pb-7 sm:px-7">
        <div className="mb-6 flex items-start gap-3 border-y border-[#dbe7fb] bg-[#f8faff] px-3 py-3 text-[13px] leading-5 text-[#526078]">
          <Building2
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          These fictional details appear across the local FrontOS workspace.
        </div>

        <div className="grid max-w-[920px] grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
            <Input
              id="workspace-name"
              value={profile.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="business-type">Business type</FieldLabel>
            <NativeSelect
              id="business-type"
              value={profile.businessType}
              onChange={(event) => update("businessType", event.target.value)}
            >
              {businessTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="time-zone">Time zone</FieldLabel>
            <NativeSelect
              id="time-zone"
              value={profile.timeZone}
              onChange={(event) => update("timeZone", event.target.value)}
            >
              {timeZoneOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="default-language">Default language</FieldLabel>
            <NativeSelect
              id="default-language"
              value={profile.language}
              onChange={(event) => update("language", event.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
          <div>
            <FieldLabel htmlFor="contact-email">Contact email</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              value={profile.contactEmail}
              onChange={(event) => update("contactEmail", event.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="contact-phone">Contact phone</FieldLabel>
            <Input
              id="contact-phone"
              type="tel"
              value={profile.contactPhone}
              onChange={(event) => update("contactPhone", event.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
