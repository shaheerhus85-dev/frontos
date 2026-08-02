export type HelpCategoryId =
  | "getting-started"
  | "calls-conversations"
  | "bookings-leads"
  | "ai-agents"
  | "knowledge-base"
  | "integrations"
  | "reports"
  | "workspace-settings";

export type SupportActionId =
  "documentation" | "integrations" | "ai-setup" | "contact";

export type HealthTone = "success" | "warning" | "info";

export interface SuggestedSearch {
  label: string;
  query: string;
}

export interface SupportAction {
  id: SupportActionId;
  title: string;
  description: string;
  actionLabel: string;
}

export interface WorkspaceHealthMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: HealthTone;
}

export interface HelpCategory {
  id: HelpCategoryId;
  title: string;
  description: string;
  articleCount: number;
  featuredArticles: readonly string[];
}

export interface HelpArticleStep {
  title: string;
  description: string;
}

export interface HelpArticle {
  id: string;
  categoryId: HelpCategoryId;
  title: string;
  summary: string;
  readingTime: string;
  updatedAt: string;
  helpfulCount: number;
  tags: readonly string[];
  steps: readonly HelpArticleStep[];
  relatedArticleIds: readonly string[];
}

export interface SupportActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: HealthTone;
}

export const suggestedSearches: readonly SuggestedSearch[] = [
  { label: "Connect an integration", query: "integration" },
  { label: "Configure AI behavior", query: "AI behavior" },
  { label: "Manage business hours", query: "business hours" },
  { label: "Review agent performance", query: "agent performance" },
  { label: "Update knowledge articles", query: "knowledge article" },
];

export const supportActions: readonly SupportAction[] = [
  {
    id: "documentation",
    title: "Browse documentation",
    description: "Explore practical guides for daily FrontOS operations.",
    actionLabel: "Browse articles",
  },
  {
    id: "integrations",
    title: "Troubleshoot integrations",
    description: "Find reconnect, sync, and workflow health guidance.",
    actionLabel: "View troubleshooting",
  },
  {
    id: "ai-setup",
    title: "Review AI agent setup",
    description: "Check behavior, confidence, handoff, and paused-agent setup.",
    actionLabel: "Review AI guidance",
  },
  {
    id: "contact",
    title: "Contact support",
    description: "Draft a support request with workspace context.",
    actionLabel: "Create request",
  },
];

export const workspaceHealthMetrics: readonly WorkspaceHealthMetric[] = [
  {
    id: "platform",
    label: "Platform status",
    value: "Operational",
    detail: "All services available",
    tone: "success",
  },
  {
    id: "connections",
    label: "Connected integrations",
    value: "9",
    detail: "2 need attention",
    tone: "info",
  },
  {
    id: "integration-health",
    label: "Integration health",
    value: "94.8%",
    detail: "Healthy overall",
    tone: "success",
  },
  {
    id: "agents",
    label: "AI agents active",
    value: "5 of 6",
    detail: "1 agent paused",
    tone: "warning",
  },
  {
    id: "knowledge",
    label: "Knowledge coverage",
    value: "92.4%",
    detail: "14 articles need review",
    tone: "success",
  },
];

export const helpCategories: readonly HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Workspace setup, navigation, and operating basics.",
    articleCount: 12,
    featuredArticles: [
      "Set up your FrontOS workspace",
      "Navigate the operations dashboard",
      "Prepare your first workflow review",
    ],
  },
  {
    id: "calls-conversations",
    title: "Calls & Conversations",
    description: "Conversation outcomes, missed calls, and escalation.",
    articleCount: 18,
    featuredArticles: [
      "Resolve a missed call escalation",
      "Review conversation outcomes",
      "Understand human handoffs",
    ],
  },
  {
    id: "bookings-leads",
    title: "Bookings & Leads",
    description: "Scheduling, pipeline updates, and follow-up.",
    articleCount: 21,
    featuredArticles: [
      "Troubleshoot missed booking updates",
      "Tune booking follow-up workflows",
      "Review lead qualification stages",
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Behavior, confidence, performance, and handoffs.",
    articleCount: 16,
    featuredArticles: [
      "Understand AI confidence thresholds",
      "Review paused AI agents",
      "Configure safe agent handoffs",
    ],
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Coverage, freshness, review, and answer quality.",
    articleCount: 24,
    featuredArticles: [
      "Improve knowledge coverage",
      "Update knowledge articles",
      "Review outdated guidance",
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connections, sync health, and troubleshooting.",
    articleCount: 19,
    featuredArticles: [
      "Reconnect a degraded integration",
      "Test connection health",
      "Review integration workflows",
    ],
  },
  {
    id: "reports",
    title: "Reports",
    description: "Performance periods, exports, and interpretation.",
    articleCount: 11,
    featuredArticles: [
      "Export a performance report",
      "Interpret conversion trends",
      "Review operational efficiency",
    ],
  },
  {
    id: "workspace-settings",
    title: "Workspace Settings",
    description: "Hours, notifications, privacy, and preferences.",
    articleCount: 17,
    featuredArticles: [
      "Configure weekly business hours",
      "Manage notification preferences",
      "Review privacy and data controls",
    ],
  },
];

export const helpArticles: readonly HelpArticle[] = [
  {
    id: "workspace-setup",
    categoryId: "getting-started",
    title: "Set up your FrontOS workspace",
    summary:
      "Review the core profile and operating defaults for a new workspace.",
    readingTime: "6 min read",
    updatedAt: "Jul 28, 2026",
    helpfulCount: 184,
    tags: ["setup", "workspace", "getting started"],
    steps: [
      {
        title: "Review the workspace profile",
        description:
          "Confirm the business name, contact details, language, and time zone in Settings.",
      },
      {
        title: "Set operating availability",
        description:
          "Add weekly business hours and verify that closed-day time controls remain disabled.",
      },
      {
        title: "Save workspace changes",
        description:
          "Review the unsaved indicator, then use Save changes to keep the workspace draft.",
      },
    ],
    relatedArticleIds: ["business-hours", "notification-preferences"],
  },
  {
    id: "missed-call-escalation",
    categoryId: "calls-conversations",
    title: "Resolve a missed call escalation",
    summary: "Trace an unresolved conversation and prepare a human follow-up.",
    readingTime: "5 min read",
    updatedAt: "Jul 27, 2026",
    helpfulCount: 126,
    tags: ["calls", "conversation", "handoff", "missed call"],
    steps: [
      {
        title: "Open the call record",
        description:
          "Review the outcome, intent, and last activity shown in Calls.",
      },
      {
        title: "Check the escalation context",
        description:
          "Confirm why the AI agent requested a human review and note the preferred callback window.",
      },
      {
        title: "Record the follow-up",
        description:
          "Use the available preview action to model the next staff step without contacting a real customer.",
      },
    ],
    relatedArticleIds: ["paused-agents", "notification-preferences"],
  },
  {
    id: "business-hours",
    categoryId: "workspace-settings",
    title: "Configure weekly business hours",
    summary:
      "Set open days, opening times, and closing times for the workspace.",
    readingTime: "4 min read",
    updatedAt: "Jul 29, 2026",
    helpfulCount: 231,
    tags: ["business hours", "settings", "availability"],
    steps: [
      {
        title: "Open Hours in Settings",
        description:
          "Use the Settings category bar to open the weekly availability controls.",
      },
      {
        title: "Choose open days",
        description:
          "Toggle each day and confirm the Open or Closed status before adjusting time fields.",
      },
      {
        title: "Review and save",
        description:
          "Check every weekday and use the shared Save changes action to keep the workspace draft.",
      },
    ],
    relatedArticleIds: ["workspace-setup", "notification-preferences"],
  },
  {
    id: "confidence-thresholds",
    categoryId: "ai-agents",
    title: "Understand AI confidence thresholds",
    summary:
      "Learn how the confidence setting influences clarification and handoff.",
    readingTime: "7 min read",
    updatedAt: "Jul 30, 2026",
    helpfulCount: 198,
    tags: ["AI behavior", "confidence", "handoff", "agent setup"],
    steps: [
      {
        title: "Review the current threshold",
        description:
          "Open AI Behavior in Settings and note the percentage shown beside the range control.",
      },
      {
        title: "Consider operating risk",
        description:
          "Use a more cautious value when higher-risk requests require clearer staff oversight.",
      },
      {
        title: "Test the preference",
        description:
          "Save the draft and review related agent outcomes before adjusting the setting further.",
      },
    ],
    relatedArticleIds: ["paused-agents", "workspace-setup"],
  },
  {
    id: "paused-agents",
    categoryId: "ai-agents",
    title: "Review paused AI agents",
    summary:
      "Identify paused coverage and review the workflow before a resume action.",
    readingTime: "5 min read",
    updatedAt: "Jul 26, 2026",
    helpfulCount: 143,
    tags: ["AI agents", "agent performance", "paused", "review"],
    steps: [
      {
        title: "Filter the agent directory",
        description:
          "Open AI Agents and use the status filter to isolate the paused agent.",
      },
      {
        title: "Review responsibilities",
        description:
          "Check assigned workflows, recent activity, and the reason coverage was paused.",
      },
      {
        title: "Confirm the next action",
        description:
          "Use the available controls after the workflow owner has reviewed the displayed context.",
      },
    ],
    relatedArticleIds: ["confidence-thresholds", "missed-call-escalation"],
  },
  {
    id: "booking-updates",
    categoryId: "bookings-leads",
    title: "Troubleshoot missed booking updates",
    summary:
      "Check availability, schedule state, and integration health for a missing update.",
    readingTime: "8 min read",
    updatedAt: "Jul 25, 2026",
    helpfulCount: 167,
    tags: ["bookings", "calendar", "integration", "sync"],
    steps: [
      {
        title: "Verify the booking state",
        description:
          "Find the booking and confirm its status, date, and most recent activity.",
      },
      {
        title: "Review calendar health",
        description:
          "Open Integrations and check whether the connected scheduling tool is degraded or paused.",
      },
      {
        title: "Compare the workflow",
        description:
          "Review the active sync workflow before modeling any reconnect or schedule update.",
      },
    ],
    relatedArticleIds: ["reconnect-integration", "business-hours"],
  },
  {
    id: "booking-follow-up",
    categoryId: "bookings-leads",
    title: "Tune booking follow-up workflows",
    summary:
      "Review confirmation, reminder, and staff-awareness steps after a booking.",
    readingTime: "6 min read",
    updatedAt: "Jul 24, 2026",
    helpfulCount: 108,
    tags: ["bookings", "leads", "workflow", "follow-up"],
    steps: [
      {
        title: "Map the booking outcome",
        description: "Confirm which booking states should trigger a follow-up.",
      },
      {
        title: "Review delivery preferences",
        description:
          "Check notification events and configured delivery channels in Settings.",
      },
      {
        title: "Validate the workflow",
        description:
          "Use the preview controls to review expected staff awareness without sending messages.",
      },
    ],
    relatedArticleIds: ["booking-updates", "notification-preferences"],
  },
  {
    id: "reconnect-integration",
    categoryId: "integrations",
    title: "Reconnect a degraded integration",
    summary: "Review connection context and follow a safe reconnect workflow.",
    readingTime: "7 min read",
    updatedAt: "Jul 30, 2026",
    helpfulCount: 219,
    tags: ["integration", "reconnect", "degraded", "troubleshooting"],
    steps: [
      {
        title: "Open the integration profile",
        description:
          "Filter the directory by health and open the degraded connection.",
      },
      {
        title: "Review recent sync activity",
        description:
          "Check the last successful sync, risks, and recommended next action.",
      },
      {
        title: "Model the reconnect",
        description:
          "Use Reconnect after reviewing the displayed health and workflow context.",
      },
    ],
    relatedArticleIds: ["booking-updates", "workspace-diagnostics"],
  },
  {
    id: "knowledge-coverage",
    categoryId: "knowledge-base",
    title: "Improve knowledge coverage",
    summary:
      "Prioritize outdated or missing guidance that affects AI answer quality.",
    readingTime: "9 min read",
    updatedAt: "Jul 29, 2026",
    helpfulCount: 176,
    tags: ["knowledge article", "coverage", "review", "quality"],
    steps: [
      {
        title: "Review the coverage metric",
        description:
          "Open Knowledge Base and compare current coverage with articles that need review.",
      },
      {
        title: "Prioritize operating gaps",
        description:
          "Filter by freshness and review priority to identify the most useful updates.",
      },
      {
        title: "Check linked agents",
        description:
          "Confirm which agents and channels use the article before modeling a content change.",
      },
    ],
    relatedArticleIds: ["confidence-thresholds", "workspace-setup"],
  },
  {
    id: "export-report",
    categoryId: "reports",
    title: "Export a performance report",
    summary: "Choose a reporting period and prepare a performance export.",
    readingTime: "4 min read",
    updatedAt: "Jul 23, 2026",
    helpfulCount: 94,
    tags: ["reports", "export", "performance", "agent performance"],
    steps: [
      {
        title: "Choose the reporting period",
        description:
          "Open Reports and select the period that matches the review window.",
      },
      {
        title: "Inspect performance context",
        description:
          "Review conversion, channel, and operational-efficiency sections before exporting.",
      },
      {
        title: "Export the report",
        description:
          "Use the export action and review the confirmation before sharing the report.",
      },
    ],
    relatedArticleIds: ["paused-agents", "knowledge-coverage"],
  },
  {
    id: "notification-preferences",
    categoryId: "workspace-settings",
    title: "Manage notification preferences",
    summary:
      "Choose operational events and configured delivery channels for staff awareness.",
    readingTime: "5 min read",
    updatedAt: "Jul 28, 2026",
    helpfulCount: 152,
    tags: ["notifications", "settings", "delivery", "workspace"],
    steps: [
      {
        title: "Open Notifications in Settings",
        description:
          "Review the event list and identify the alerts relevant to the team.",
      },
      {
        title: "Choose delivery channels",
        description:
          "Use Email or In-app and note that SMS remains disabled and not configured.",
      },
      {
        title: "Save the preference draft",
        description:
          "Confirm the unsaved indicator and keep changes with the global Save action.",
      },
    ],
    relatedArticleIds: ["business-hours", "privacy-controls"],
  },
  {
    id: "privacy-controls",
    categoryId: "workspace-settings",
    title: "Review privacy and data controls",
    summary: "Understand retention, redaction, and review preferences.",
    readingTime: "8 min read",
    updatedAt: "Jul 27, 2026",
    helpfulCount: 137,
    tags: ["privacy", "data controls", "settings", "compliance"],
    steps: [
      {
        title: "Review each preference",
        description:
          "Open Privacy and read the supporting description beside every switch.",
      },
      {
        title: "Confirm staff review coverage",
        description:
          "Keep human review enabled where flagged conversations need oversight.",
      },
      {
        title: "Use approved human guidance",
        description:
          "Treat the compliance note as product context, not legal or regulatory advice.",
      },
    ],
    relatedArticleIds: ["notification-preferences", "workspace-diagnostics"],
  },
  {
    id: "workspace-diagnostics",
    categoryId: "getting-started",
    title: "Review workspace diagnostics",
    summary: "Collect workspace context before drafting a support request.",
    readingTime: "3 min read",
    updatedAt: "Jul 31, 2026",
    helpfulCount: 88,
    tags: ["diagnostics", "support", "workspace", "setup"],
    steps: [
      {
        title: "Review workspace health",
        description:
          "Check platform, integration, agent, and knowledge indicators on this support screen.",
      },
      {
        title: "Describe the issue",
        description:
          "Note the affected workflow, expected result, and observed state.",
      },
      {
        title: "Choose diagnostic inclusion",
        description:
          "Use the shared diagnostics switch when drafting a support request.",
      },
    ],
    relatedArticleIds: ["workspace-setup", "reconnect-integration"],
  },
];

export const recentSupportActivity: readonly SupportActivityItem[] = [
  {
    id: "reconnect-viewed",
    title: "Integration reconnect guide viewed",
    detail: "Reconnect a degraded integration",
    time: "18 minutes ago",
    tone: "info",
  },
  {
    id: "ai-helpful",
    title: "AI behavior article marked helpful",
    detail: "Understand AI confidence thresholds",
    time: "Yesterday, 4:20 PM",
    tone: "success",
  },
  {
    id: "diagnostics-reviewed",
    title: "Workspace diagnostics reviewed",
    detail: "Health summary checked before a request draft",
    time: "Yesterday, 10:08 AM",
    tone: "success",
  },
  {
    id: "request-drafted",
    title: "Support request draft prepared",
    detail: "Request details were added to workspace activity",
    time: "Jul 29, 2026",
    tone: "warning",
  },
];

export function getHelpCategory(id: HelpCategoryId) {
  return helpCategories.find((category) => category.id === id);
}
