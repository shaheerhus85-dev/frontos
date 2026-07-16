export type KpiMetric = Readonly<{
  id: "calls" | "bookings" | "leads" | "revenue";
  label: string;
  value: string;
  change: string;
  icon: "phone" | "calendar" | "users" | "revenue";
  tone: "blue" | "cyan" | "violet" | "pink";
}>;

export type CallTrendPoint = Readonly<{
  date: string;
  calls: number;
}>;

export type ServiceBooking = Readonly<{
  name: string;
  value: number;
  color: string;
}>;

export type ActivityEntry = Readonly<{
  name: string;
  initials: string;
  action: string;
  category: string;
  time: string;
}>;

export type UpcomingEntry = Readonly<{
  title: string;
  category?: string;
  time: string;
}>;

export type PerformanceMetric = Readonly<{
  label: string;
  value: string;
  progress?: number;
}>;

export type Integration = Readonly<{
  id:
    "calendar" | "gmail" | "hubspot" | "slack" | "sheets" | "whatsapp" | "more";
  name: string;
}>;

export const kpiMetrics: readonly KpiMetric[] = [
  {
    id: "calls",
    label: "Total Calls",
    value: "1,248",
    change: "12.5%",
    icon: "phone",
    tone: "blue",
  },
  {
    id: "bookings",
    label: "Bookings",
    value: "328",
    change: "18.7%",
    icon: "calendar",
    tone: "cyan",
  },
  {
    id: "leads",
    label: "Leads Captured",
    value: "214",
    change: "8.1%",
    icon: "users",
    tone: "violet",
  },
  {
    id: "revenue",
    label: "Revenue Impact",
    value: "$42,680",
    change: "22.4%",
    icon: "revenue",
    tone: "pink",
  },
];

export const callTrendData: readonly CallTrendPoint[] = [
  { date: "May 12", calls: 142 },
  { date: "May 13", calls: 168 },
  { date: "May 14", calls: 154 },
  { date: "May 15", calls: 191 },
  { date: "May 16", calls: 184 },
  { date: "May 17", calls: 224 },
  { date: "May 18", calls: 237 },
];

export const serviceBookings: readonly ServiceBooking[] = [
  { name: "Consultation", value: 45, color: "#2878FF" },
  { name: "Cleaning", value: 25, color: "#35C6F4" },
  { name: "Support", value: 20, color: "#7457FF" },
  { name: "Other", value: 10, color: "#C765FF" },
];

export const recentActivity: readonly ActivityEntry[] = [
  {
    name: "Sarah Anderson",
    initials: "SA",
    action: "New booking",
    category: "Consultation",
    time: "Today, 10:24 AM",
  },
  {
    name: "Michael Brown",
    initials: "MB",
    action: "Service inquiry",
    category: "Support",
    time: "Today, 9:15 AM",
  },
  {
    name: "Jessica Davis",
    initials: "JD",
    action: "Call handled",
    category: "Consultation",
    time: "Today, 8:42 AM",
  },
  {
    name: "Daniel Wilson",
    initials: "DW",
    action: "New lead captured",
    category: "AI Agent",
    time: "Today, 8:31 AM",
  },
];

export const upcomingEntries: readonly UpcomingEntry[] = [
  { title: "Team Standup", time: "Today, 11:00 AM" },
  {
    title: "Dentist Clinic",
    category: "Consultation",
    time: "Today, 1:30 PM",
  },
  { title: "Meeting with Sarah Johnson", time: "Tomorrow, 10:00 AM" },
];

export const performanceMetrics: readonly PerformanceMetric[] = [
  { label: "Call Handling", value: "98%", progress: 98 },
  { label: "Booking Automation", value: "96%", progress: 96 },
  { label: "Escalation Rate", value: "2.1%" },
  { label: "Resolution Time", value: "1.3m" },
];

export const integrations: readonly Integration[] = [
  { id: "calendar", name: "Google Calendar" },
  { id: "gmail", name: "Gmail" },
  { id: "hubspot", name: "HubSpot" },
  { id: "slack", name: "Slack" },
  { id: "sheets", name: "Google Sheets" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "more", name: "12 more integrations" },
];
