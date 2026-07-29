export type ReportKpi = Readonly<{
  id: "revenue" | "leads" | "bookings" | "savings";
  label: string;
  value: string;
  supportingText: string;
  tone: "blue" | "violet" | "cyan" | "mint";
}>;

export type WeeklyPerformancePoint = Readonly<{
  period: string;
  revenue: number;
  bookings: number;
}>;

export type MonthlyPerformancePoint = Readonly<{
  period: string;
  revenue: number;
  bookings: number;
}>;

export type FunnelStage = Readonly<{
  id: string;
  label: string;
  count: number;
  previousStageRate: number;
}>;

export type ChannelPerformanceRecord = Readonly<{
  id: string;
  channel: "AI Call" | "Website" | "Referral" | "WhatsApp" | "Staff Entry";
  leads: number;
  bookings: number;
  conversionRate: number;
  revenue: number;
  trend: "up" | "down" | "steady";
  trendValue: string;
}>;

export type OperationalMetric = Readonly<{
  id: string;
  label: string;
  value: string;
  detail: string;
  progress?: number;
  tone: "blue" | "violet" | "cyan" | "mint" | "amber";
}>;

export type BusinessInsight = Readonly<{
  id: string;
  type: "Growth opportunity" | "Operational improvement" | "Attention required";
  description: string;
  tone: "green" | "blue" | "amber";
}>;

export const reportKpis: readonly ReportKpi[] = [
  {
    id: "revenue",
    label: "Revenue Generated",
    value: "$186,420",
    supportingText: "12.8% vs previous period",
    tone: "blue",
  },
  {
    id: "leads",
    label: "Qualified Leads",
    value: "86",
    supportingText: "40.2% qualification rate",
    tone: "violet",
  },
  {
    id: "bookings",
    label: "Completed Bookings",
    value: "396",
    supportingText: "8.4% improvement",
    tone: "cyan",
  },
  {
    id: "savings",
    label: "Automation Savings",
    value: "412 hours",
    supportingText: "Estimated operational time saved",
    tone: "mint",
  },
];

export const weeklyPerformance: readonly WeeklyPerformancePoint[] = [
  { period: "May 12", revenue: 23180, bookings: 48 },
  { period: "May 13", revenue: 25840, bookings: 54 },
  { period: "May 14", revenue: 24450, bookings: 52 },
  { period: "May 15", revenue: 28160, bookings: 61 },
  { period: "May 16", revenue: 26890, bookings: 57 },
  { period: "May 17", revenue: 30140, bookings: 66 },
  { period: "May 18", revenue: 27760, bookings: 58 },
];

export const monthlyPerformance: readonly MonthlyPerformancePoint[] = [
  { period: "Dec", revenue: 121800, bookings: 284 },
  { period: "Jan", revenue: 132450, bookings: 301 },
  { period: "Feb", revenue: 141620, bookings: 326 },
  { period: "Mar", revenue: 153980, bookings: 348 },
  { period: "Apr", revenue: 165260, bookings: 365 },
  { period: "May", revenue: 186420, bookings: 396 },
];

export const funnelStages: readonly FunnelStage[] = [
  {
    id: "inquiries",
    label: "Inbound inquiries",
    count: 1420,
    previousStageRate: 100,
  },
  {
    id: "qualified",
    label: "Qualified leads",
    count: 586,
    previousStageRate: 41.3,
  },
  {
    id: "created",
    label: "Bookings created",
    count: 428,
    previousStageRate: 73,
  },
  {
    id: "completed",
    label: "Bookings completed",
    count: 396,
    previousStageRate: 92.5,
  },
  {
    id: "returning",
    label: "Returning customers",
    count: 214,
    previousStageRate: 54,
  },
];

export const channelPerformance: readonly ChannelPerformanceRecord[] = [
  {
    id: "ai-call",
    channel: "AI Call",
    leads: 176,
    bookings: 127,
    conversionRate: 72.2,
    revenue: 54820,
    trend: "up",
    trendValue: "+14.6%",
  },
  {
    id: "website",
    channel: "Website",
    leads: 158,
    bookings: 103,
    conversionRate: 65.2,
    revenue: 42360,
    trend: "up",
    trendValue: "+8.2%",
  },
  {
    id: "referral",
    channel: "Referral",
    leads: 84,
    bookings: 69,
    conversionRate: 82.1,
    revenue: 38940,
    trend: "up",
    trendValue: "+17.4%",
  },
  {
    id: "whatsapp",
    channel: "WhatsApp",
    leads: 102,
    bookings: 76,
    conversionRate: 74.5,
    revenue: 31860,
    trend: "steady",
    trendValue: "+0.8%",
  },
  {
    id: "staff-entry",
    channel: "Staff Entry",
    leads: 66,
    bookings: 53,
    conversionRate: 80.3,
    revenue: 18440,
    trend: "down",
    trendValue: "-2.1%",
  },
];

export const operationalMetrics: readonly OperationalMetric[] = [
  {
    id: "ai-handled",
    label: "AI-handled interactions",
    value: "87.4%",
    detail: "Across calls and messages",
    progress: 87.4,
    tone: "blue",
  },
  {
    id: "response-time",
    label: "Average response time",
    value: "14 sec",
    detail: "6 seconds faster than target",
    tone: "cyan",
  },
  {
    id: "automations",
    label: "Successful automations",
    value: "12,486",
    detail: "99.2% completion rate",
    progress: 99.2,
    tone: "violet",
  },
  {
    id: "escalation",
    label: "Human escalation rate",
    value: "4.1%",
    detail: "Within the 5% target",
    progress: 4.1,
    tone: "amber",
  },
  {
    id: "integration-health",
    label: "Integration health",
    value: "94.8%",
    detail: "9 healthy connections",
    progress: 94.8,
    tone: "mint",
  },
  {
    id: "knowledge",
    label: "Knowledge coverage",
    value: "92.4%",
    detail: "4 gaps marked for review",
    progress: 92.4,
    tone: "blue",
  },
];

export const businessInsights: readonly BusinessInsight[] = [
  {
    id: "growth",
    type: "Growth opportunity",
    description:
      "Referral leads convert at the strongest rate and produce the highest average customer value.",
    tone: "green",
  },
  {
    id: "improvement",
    type: "Operational improvement",
    description: "Follow-up automation reduced delayed responses by 18.6%.",
    tone: "blue",
  },
  {
    id: "attention",
    type: "Attention required",
    description:
      "Support-related escalations increased slightly during the current reporting period.",
    tone: "amber",
  },
];
