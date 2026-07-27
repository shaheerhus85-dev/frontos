export const integrationStatuses = [
  "Connected",
  "Paused",
  "Needs Reconnect",
  "Not Connected",
] as const;
export type IntegrationStatus = (typeof integrationStatuses)[number];

export const integrationCategories = [
  "Communication",
  "CRM",
  "Calendar",
  "Payments",
  "Automation",
  "Storage",
  "Analytics",
  "Support",
] as const;
export type IntegrationCategory = (typeof integrationCategories)[number];

export const integrationHealthStatuses = [
  "Healthy",
  "Degraded",
  "Attention",
  "Offline",
] as const;
export type IntegrationHealth = (typeof integrationHealthStatuses)[number];

export type IntegrationActivity = Readonly<{
  id: string;
  title: string;
  detail: string;
  time: string;
}>;

export type IntegrationRecord = Readonly<{
  id: string;
  name: string;
  initials: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  health: IntegrationHealth;
  purpose: string;
  lastSync: string;
  lastSyncOrder: number;
  successfulSyncs: number;
  automationCount: number;
  uptime: number;
  dataHandled: readonly string[];
  activeWorkflows: readonly string[];
  strengths: readonly string[];
  risks: readonly string[];
  recommendedAction: string;
  recentActivity: readonly IntegrationActivity[];
}>;

export type IntegrationKpi = Readonly<{
  id: "connected" | "automations" | "syncs" | "health";
  label: string;
  value: string;
  supportingText: string;
  tone: "blue" | "violet" | "cyan" | "mint";
}>;

export const integrationKpis: readonly IntegrationKpi[] = [
  {
    id: "connected",
    label: "Connected Integrations",
    value: "9",
    supportingText: "2 connected integrations need attention",
    tone: "blue",
  },
  {
    id: "automations",
    label: "Active Automations",
    value: "38",
    supportingText: "6 added this month",
    tone: "violet",
  },
  {
    id: "syncs",
    label: "Successful Syncs",
    value: "12,486",
    supportingText: "99.2% success rate",
    tone: "cyan",
  },
  {
    id: "health",
    label: "Integration Health",
    value: "94.8%",
    supportingText: "2.4% improvement",
    tone: "mint",
  },
];

const baseline = {
  dataHandled: ["Customer profiles", "Activity metadata"],
  strengths: [
    "Reliable sync performance during peak hours",
    "Clear ownership and workflow coverage",
  ],
  risks: ["Configuration should be reviewed after major workflow changes"],
  recentActivity: [
    {
      id: "activity-a",
      title: "Scheduled sync completed",
      detail: "All queued demo records passed local validation.",
      time: "18 minutes ago",
    },
    {
      id: "activity-b",
      title: "Workflow reviewed",
      detail: "Routing rules were checked by the operations team.",
      time: "3 days ago",
    },
  ],
} as const;

export const integrations: readonly IntegrationRecord[] = [
  {
    ...baseline,
    id: "relay-chat",
    name: "Relay Chat",
    initials: "RC",
    category: "Communication",
    status: "Connected",
    health: "Healthy",
    purpose:
      "Routes website conversations and handoff context to FrontOS agents.",
    lastSync: "4 minutes ago",
    lastSyncOrder: 4,
    successfulSyncs: 2840,
    automationCount: 7,
    uptime: 99.9,
    dataHandled: ["Conversation metadata", "Routing outcomes", "Handoff notes"],
    activeWorkflows: ["Inbound routing", "Human handoff", "After-hours triage"],
    recommendedAction: "Keep the current routing and monitoring schedule.",
  },
  {
    ...baseline,
    id: "northstar-crm",
    name: "Northstar CRM",
    initials: "NC",
    category: "CRM",
    status: "Connected",
    health: "Healthy",
    purpose: "Keeps fictional lead stages and customer context aligned.",
    lastSync: "12 minutes ago",
    lastSyncOrder: 12,
    successfulSyncs: 2316,
    automationCount: 8,
    uptime: 99.7,
    dataHandled: ["Lead profiles", "Pipeline stages", "Owner assignments"],
    activeWorkflows: ["Lead capture", "Stage update", "Owner notification"],
    recommendedAction:
      "Review field mapping when the next lead stage is introduced.",
  },
  {
    ...baseline,
    id: "dayline-calendar",
    name: "Dayline Calendar",
    initials: "DC",
    category: "Calendar",
    status: "Connected",
    health: "Healthy",
    purpose: "Coordinates availability, bookings, and schedule updates.",
    lastSync: "18 minutes ago",
    lastSyncOrder: 18,
    successfulSyncs: 1905,
    automationCount: 6,
    uptime: 99.8,
    dataHandled: [
      "Availability windows",
      "Booking metadata",
      "Schedule changes",
    ],
    activeWorkflows: [
      "Availability lookup",
      "Booking confirmation",
      "Reschedule alert",
    ],
    recommendedAction: "Keep the current availability refresh interval.",
  },
  {
    ...baseline,
    id: "harbor-pay",
    name: "Harbor Pay",
    initials: "HP",
    category: "Payments",
    status: "Paused",
    health: "Attention",
    purpose: "Provides fictional payment-status signals for service workflows.",
    lastSync: "2 days ago",
    lastSyncOrder: 2880,
    successfulSyncs: 654,
    automationCount: 2,
    uptime: 91.4,
    dataHandled: ["Payment status", "Invoice references", "Refund state"],
    activeWorkflows: ["Payment confirmation", "Failed payment review"],
    risks: ["Sync is paused while the fictional field mapping is reviewed"],
    recommendedAction:
      "Review payment-state mappings before resuming the local preview.",
    recentActivity: [
      {
        id: "hp-a",
        title: "Sync paused",
        detail: "Operations paused the demo workflow for review.",
        time: "2 days ago",
      },
      {
        id: "hp-b",
        title: "Mapping warning detected",
        detail: "A renamed payment state needs confirmation.",
        time: "3 days ago",
      },
    ],
  },
  {
    ...baseline,
    id: "flow-pilot",
    name: "FlowPilot",
    initials: "FP",
    category: "Automation",
    status: "Connected",
    health: "Healthy",
    purpose:
      "Coordinates multi-step fictional operations across FrontOS workspaces.",
    lastSync: "7 minutes ago",
    lastSyncOrder: 7,
    successfulSyncs: 1688,
    automationCount: 9,
    uptime: 99.6,
    dataHandled: ["Workflow events", "Task outcomes", "Escalation state"],
    activeWorkflows: [
      "Lead follow-up",
      "Booking reminder",
      "Service escalation",
      "Review request",
    ],
    recommendedAction:
      "Evaluate the new follow-up workflow after one more review cycle.",
  },
  {
    ...baseline,
    id: "cloud-crate",
    name: "CloudCrate",
    initials: "CC",
    category: "Storage",
    status: "Needs Reconnect",
    health: "Degraded",
    purpose: "Organizes approved reference files used by operations teams.",
    lastSync: "9 hours ago",
    lastSyncOrder: 540,
    successfulSyncs: 846,
    automationCount: 1,
    uptime: 88.2,
    dataHandled: [
      "Reference filenames",
      "Folder metadata",
      "Review timestamps",
    ],
    activeWorkflows: ["Approved file index"],
    strengths: ["Clear folder ownership", "Consistent file naming rules"],
    risks: ["The local demo connection requires a review before the next sync"],
    recommendedAction:
      "Reconnect the local preview and test the approved file index.",
    recentActivity: [
      {
        id: "cc-a",
        title: "Reconnect requested",
        detail: "The demo credential state was marked for review.",
        time: "9 hours ago",
      },
      {
        id: "cc-b",
        title: "Sync completed with warning",
        detail: "Two renamed folders were skipped.",
        time: "Yesterday",
      },
    ],
  },
  {
    ...baseline,
    id: "vista-metrics",
    name: "Vista Metrics",
    initials: "VM",
    category: "Analytics",
    status: "Connected",
    health: "Healthy",
    purpose: "Summarizes fictional operational events for dashboard reporting.",
    lastSync: "31 minutes ago",
    lastSyncOrder: 31,
    successfulSyncs: 1034,
    automationCount: 2,
    uptime: 99.4,
    dataHandled: ["Aggregate activity", "Outcome totals", "Channel trends"],
    activeWorkflows: ["Daily summary", "Weekly performance snapshot"],
    recommendedAction:
      "Keep metric definitions aligned with dashboard reporting.",
  },
  {
    ...baseline,
    id: "support-harbor",
    name: "Support Harbor",
    initials: "SH",
    category: "Support",
    status: "Connected",
    health: "Degraded",
    purpose: "Shares fictional support topics and resolution outcomes.",
    lastSync: "46 minutes ago",
    lastSyncOrder: 46,
    successfulSyncs: 742,
    automationCount: 4,
    uptime: 95.1,
    dataHandled: ["Support topics", "Resolution state", "Priority labels"],
    activeWorkflows: [
      "Issue classification",
      "Priority escalation",
      "Resolution follow-up",
    ],
    risks: ["Recent sync latency is above the preferred operating range"],
    recommendedAction:
      "Test the local connection and review the high-volume workflow.",
  },
  {
    ...baseline,
    id: "team-line",
    name: "TeamLine",
    initials: "TL",
    category: "Communication",
    status: "Connected",
    health: "Healthy",
    purpose:
      "Delivers internal workflow notices to fictional operations teams.",
    lastSync: "1 hour ago",
    lastSyncOrder: 60,
    successfulSyncs: 318,
    automationCount: 3,
    uptime: 99.5,
    dataHandled: ["Workflow alerts", "Team destinations", "Delivery state"],
    activeWorkflows: ["Urgent alert", "Daily operations digest"],
    recommendedAction:
      "Review destination ownership during the next team audit.",
  },
  {
    ...baseline,
    id: "form-bridge",
    name: "FormBridge",
    initials: "FB",
    category: "Automation",
    status: "Connected",
    health: "Healthy",
    purpose:
      "Turns fictional intake submissions into structured FrontOS tasks.",
    lastSync: "2 hours ago",
    lastSyncOrder: 120,
    successfulSyncs: 143,
    automationCount: 4,
    uptime: 98.9,
    dataHandled: ["Intake fields", "Consent state", "Task metadata"],
    activeWorkflows: [
      "New intake",
      "Missing detail request",
      "Owner assignment",
    ],
    recommendedAction:
      "Add the approved optional-field guidance to the intake review.",
  },
  {
    ...baseline,
    id: "archive-dock",
    name: "ArchiveDock",
    initials: "AD",
    category: "Storage",
    status: "Not Connected",
    health: "Offline",
    purpose: "Reserved for a future fictional records-archive workflow.",
    lastSync: "Never",
    lastSyncOrder: 99999,
    successfulSyncs: 0,
    automationCount: 0,
    uptime: 0,
    dataHandled: ["No data handled"],
    activeWorkflows: [],
    strengths: ["Purpose and ownership are documented before activation"],
    risks: ["No local demo connection is configured"],
    recommendedAction:
      "Leave disconnected until an approved archive workflow exists.",
    recentActivity: [
      {
        id: "ad-a",
        title: "Integration added",
        detail: "A placeholder profile was created for planning.",
        time: "1 week ago",
      },
    ],
  },
];

export const integrationHealthOverview = [
  { label: "Healthy", count: 7, value: 64, tone: "bg-success" },
  { label: "Degraded", count: 2, value: 18, tone: "bg-warning" },
  { label: "Attention", count: 1, value: 9, tone: "bg-[#f08a4b]" },
  { label: "Offline", count: 1, value: 9, tone: "bg-error" },
] as const;

export const workflowDistribution = [
  { label: "Customer operations", count: 14, value: 37 },
  { label: "Scheduling", count: 9, value: 24 },
  { label: "Lead management", count: 8, value: 21 },
  { label: "Reporting & support", count: 7, value: 18 },
] as const;

export const integrationAttention = [
  { name: "CloudCrate", issue: "Reconnect required", severity: "High" },
  { name: "Harbor Pay", issue: "Payment sync is paused", severity: "High" },
  {
    name: "Support Harbor",
    issue: "Sync latency is elevated",
    severity: "Medium",
  },
] as const;
