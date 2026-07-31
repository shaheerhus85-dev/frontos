export type SettingsCategoryId =
  "workspace" | "hours" | "ai-behavior" | "notifications" | "privacy";

export interface SettingsCategory {
  id: SettingsCategoryId;
  label: string;
  description: string;
}

export interface WorkspaceProfile {
  name: string;
  businessType: string;
  timeZone: string;
  language: string;
  contactEmail: string;
  contactPhone: string;
}

export type BusinessDayId =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface BusinessHoursDay {
  id: BusinessDayId;
  label: string;
  isOpen: boolean;
  opensAt: string;
  closesAt: string;
}

export interface AiBehaviorSettings {
  responseTone: string;
  primaryLanguage: string;
  confidenceThreshold: number;
  handoffAttempts: number;
  allowRescheduling: boolean;
  allowLeadQualification: boolean;
  confirmSensitiveChanges: boolean;
  afterHoursHandling: string;
}

export type NotificationPreferenceId =
  | "missed-call"
  | "high-intent-lead"
  | "new-booking"
  | "booking-change"
  | "integration-degraded"
  | "human-review"
  | "weekly-summary";

export interface NotificationPreference {
  id: NotificationPreferenceId;
  label: string;
  description: string;
  enabled: boolean;
}

export type DeliveryChannelId = "email" | "in-app" | "sms";

export interface DeliveryChannel {
  id: DeliveryChannelId;
  label: string;
  description: string;
  enabled: boolean;
  configured: boolean;
}

export type PrivacyControlId =
  "summaries" | "redaction" | "retention" | "staff-review" | "analytics";

export interface PrivacyControl {
  id: PrivacyControlId;
  label: string;
  description: string;
  enabled: boolean;
}

export type DangerActionId = "reset-workspace" | "disconnect-integrations";

export interface DangerZoneAction {
  id: DangerActionId;
  label: string;
  description: string;
  confirmLabel: string;
  confirmationTitle: string;
  confirmationDescription: string;
}

export interface SettingsState {
  workspace: WorkspaceProfile;
  businessHours: BusinessHoursDay[];
  aiBehavior: AiBehaviorSettings;
  notifications: NotificationPreference[];
  deliveryChannels: DeliveryChannel[];
  privacyControls: PrivacyControl[];
}

export const settingsCategories: readonly SettingsCategory[] = [
  {
    id: "workspace",
    label: "Workspace",
    description: "Business profile and regional defaults",
  },
  {
    id: "hours",
    label: "Hours",
    description: "Weekly availability and coverage",
  },
  {
    id: "ai-behavior",
    label: "AI Behavior",
    description: "Tone, confidence, and handoff rules",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Events and delivery preferences",
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Data handling and demo controls",
  },
];

export const businessTypeOptions = [
  "Healthcare Services",
  "Professional Services",
  "Home Services",
  "Hospitality",
] as const;

export const timeZoneOptions = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
] as const;

export const languageOptions = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
] as const;

export const responseToneOptions = [
  "Professional and warm",
  "Friendly and conversational",
  "Concise and direct",
  "Formal and precise",
] as const;

export const afterHoursOptions = [
  "Capture message and notify staff",
  "Offer next available booking",
  "Route urgent requests to staff",
] as const;

export const businessTimeOptions = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
] as const;

export const dangerZoneActions: readonly DangerZoneAction[] = [
  {
    id: "reset-workspace",
    label: "Reset demo workspace",
    description:
      "Restore all settings on this screen to their original fictional demo values.",
    confirmLabel: "Confirm reset",
    confirmationTitle: "Reset the demo workspace?",
    confirmationDescription:
      "This only resets local preview state. No records, accounts, or external systems will be changed.",
  },
  {
    id: "disconnect-integrations",
    label: "Disconnect all demo integrations",
    description:
      "Preview the disconnected state for every fictional integration in this workspace.",
    confirmLabel: "Confirm disconnect",
    confirmationTitle: "Disconnect all demo integrations?",
    confirmationDescription:
      "This updates local preview state only. No real integration or connection will be affected.",
  },
];

const initialSettings: SettingsState = {
  workspace: {
    name: "Acme Clinic",
    businessType: "Healthcare Services",
    timeZone: "America/New_York",
    language: "English (US)",
    contactEmail: "operations@acmeclinic.example",
    contactPhone: "+1 (555) 010-0184",
  },
  businessHours: [
    {
      id: "monday",
      label: "Monday",
      isOpen: true,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
    {
      id: "tuesday",
      label: "Tuesday",
      isOpen: true,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
    {
      id: "wednesday",
      label: "Wednesday",
      isOpen: true,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
    {
      id: "thursday",
      label: "Thursday",
      isOpen: true,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
    {
      id: "friday",
      label: "Friday",
      isOpen: true,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
    {
      id: "saturday",
      label: "Saturday",
      isOpen: true,
      opensAt: "10:00 AM",
      closesAt: "2:00 PM",
    },
    {
      id: "sunday",
      label: "Sunday",
      isOpen: false,
      opensAt: "9:00 AM",
      closesAt: "6:00 PM",
    },
  ],
  aiBehavior: {
    responseTone: "Professional and warm",
    primaryLanguage: "English (US)",
    confidenceThreshold: 78,
    handoffAttempts: 2,
    allowRescheduling: true,
    allowLeadQualification: true,
    confirmSensitiveChanges: true,
    afterHoursHandling: "Capture message and notify staff",
  },
  notifications: [
    {
      id: "missed-call",
      label: "Missed or abandoned call",
      description: "Notify staff when a caller leaves before resolution.",
      enabled: true,
    },
    {
      id: "high-intent-lead",
      label: "High-intent lead identified",
      description:
        "Surface qualified prospects that show strong buying intent.",
      enabled: true,
    },
    {
      id: "new-booking",
      label: "New booking created",
      description: "Share a confirmation when a new appointment is created.",
      enabled: true,
    },
    {
      id: "booking-change",
      label: "Booking cancelled or rescheduled",
      description: "Flag schedule changes that may require staff awareness.",
      enabled: true,
    },
    {
      id: "integration-degraded",
      label: "Integration connection degraded",
      description: "Notify the team when a demo connection needs review.",
      enabled: true,
    },
    {
      id: "human-review",
      label: "AI agent requires human review",
      description: "Escalate low-confidence or policy-sensitive interactions.",
      enabled: true,
    },
    {
      id: "weekly-summary",
      label: "Weekly performance summary",
      description: "Prepare a weekly overview of fictional operating results.",
      enabled: false,
    },
  ],
  deliveryChannels: [
    {
      id: "email",
      label: "Email",
      description: "Send notices to the workspace contact email.",
      enabled: true,
      configured: true,
    },
    {
      id: "in-app",
      label: "In-app",
      description: "Show notices inside the FrontOS workspace.",
      enabled: true,
      configured: true,
    },
    {
      id: "sms",
      label: "SMS",
      description: "Text message delivery is unavailable in this preview.",
      enabled: false,
      configured: false,
    },
  ],
  privacyControls: [
    {
      id: "summaries",
      label: "Store conversation summaries",
      description: "Keep concise fictional summaries for operating context.",
      enabled: true,
    },
    {
      id: "redaction",
      label: "Redact sensitive information",
      description:
        "Mask sensitive-looking demo content before it appears in summaries.",
      enabled: true,
    },
    {
      id: "retention",
      label: "Retain interaction history for 90 days",
      description:
        "Use a fictional 90-day retention preference in this preview.",
      enabled: true,
    },
    {
      id: "staff-review",
      label: "Require staff review for flagged conversations",
      description:
        "Hold flagged conversations for a fictional staff review step.",
      enabled: true,
    },
    {
      id: "analytics",
      label: "Allow anonymized analytics",
      description:
        "Include de-identified fictional activity in aggregate reporting.",
      enabled: false,
    },
  ],
};

export function createInitialSettings(): SettingsState {
  return {
    workspace: { ...initialSettings.workspace },
    businessHours: initialSettings.businessHours.map((day) => ({ ...day })),
    aiBehavior: { ...initialSettings.aiBehavior },
    notifications: initialSettings.notifications.map((item) => ({ ...item })),
    deliveryChannels: initialSettings.deliveryChannels.map((item) => ({
      ...item,
    })),
    privacyControls: initialSettings.privacyControls.map((item) => ({
      ...item,
    })),
  };
}
