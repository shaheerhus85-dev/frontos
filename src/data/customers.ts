export type CustomerSegment =
  "New" | "Active" | "Returning" | "At Risk" | "Inactive";

export type CustomerHealth =
  "Healthy" | "Stable" | "Needs Attention" | "At Risk";

export type CustomerService =
  | "Initial Consultation"
  | "Progress Review"
  | "Wellness Assessment"
  | "Treatment Planning"
  | "Follow-up Consultation";

export type CustomerAgent =
  "Maya Chen" | "Lucas Reed" | "Nina Patel" | "Alex Morgan";

export type CustomerActivity = Readonly<{
  id: string;
  title: string;
  detail: string;
  time: string;
}>;

export type CustomerRecord = Readonly<{
  id: string;
  name: string;
  initials: string;
  company: string;
  email: string;
  phone: string;
  primaryService: CustomerService;
  totalBookings: number;
  completedBookings: number;
  lifetimeValue: number;
  lastActivity: string;
  activityOrder: number;
  health: CustomerHealth;
  segment: CustomerSegment;
  agent: CustomerAgent;
  customerSince: string;
  lastInteraction: string;
  nextBooking: string;
  summary: string;
  preferences: readonly string[];
  relationshipSignals: readonly string[];
  risks: readonly string[];
  recommendation: string;
  timeline: readonly CustomerActivity[];
}>;

export type CustomersKpi = Readonly<{
  id: "total" | "active" | "returning" | "value";
  label: string;
  value: string;
  change: string;
  supportingText: string;
  icon: "customers" | "active" | "returning" | "value";
  tone: "blue" | "violet" | "pink" | "cyan";
}>;

export const customerSegments: readonly CustomerSegment[] = [
  "New",
  "Active",
  "Returning",
  "At Risk",
  "Inactive",
];

export const customerServices: readonly CustomerService[] = [
  "Initial Consultation",
  "Progress Review",
  "Wellness Assessment",
  "Treatment Planning",
  "Follow-up Consultation",
];

export const customerAgents: readonly CustomerAgent[] = [
  "Maya Chen",
  "Lucas Reed",
  "Nina Patel",
  "Alex Morgan",
];

export const customersKpis: readonly CustomersKpi[] = [
  {
    id: "total",
    label: "Total Customers",
    value: "1,086",
    change: "6.8%",
    supportingText: "vs last month",
    icon: "customers",
    tone: "blue",
  },
  {
    id: "active",
    label: "Active Customers",
    value: "842",
    change: "77.5%",
    supportingText: "engagement rate",
    icon: "active",
    tone: "violet",
  },
  {
    id: "returning",
    label: "Returning Customers",
    value: "396",
    change: "36.5%",
    supportingText: "retention rate",
    icon: "returning",
    tone: "pink",
  },
  {
    id: "value",
    label: "Customer Value",
    value: "$186,420",
    change: "$171.65",
    supportingText: "average value",
    icon: "value",
    tone: "cyan",
  },
];

export const customerRecords: readonly CustomerRecord[] = [
  {
    id: "customer-001",
    name: "Sarah Anderson",
    initials: "SA",
    company: "Northstar Studio",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 010-0142",
    primaryService: "Initial Consultation",
    totalBookings: 7,
    completedBookings: 6,
    lifetimeValue: 8420,
    lastActivity: "12 min ago",
    activityOrder: 1,
    health: "Healthy",
    segment: "Returning",
    agent: "Maya Chen",
    customerSince: "August 14, 2024",
    lastInteraction: "Follow-up call · Today, 10:24 AM",
    nextBooking: "May 22 · 2:30 PM",
    summary:
      "Sarah is a consistently engaged customer who values concise preparation guidance and afternoon appointments.",
    preferences: [
      "Prefers email for preparation materials",
      "Afternoon appointments after 2:00 PM",
    ],
    relationshipSignals: [
      "Six completed bookings",
      "Responds promptly to reminders",
      "Referred one new customer",
    ],
    risks: ["No current relationship concerns."],
    recommendation:
      "Send the preparation checklist two days before her upcoming appointment.",
    timeline: [
      {
        id: "customer-001-a",
        title: "Follow-up call completed",
        detail: "Confirmed progress and the next appointment objective.",
        time: "Today · 10:24 AM",
      },
      {
        id: "customer-001-b",
        title: "Appointment completed",
        detail: "Initial consultation follow-up completed successfully.",
        time: "May 8 · 2:30 PM",
      },
    ],
  },
  {
    id: "customer-002",
    name: "Michael Brown",
    initials: "MB",
    company: "Brown & Co.",
    email: "michael.brown@example.com",
    phone: "+1 (555) 010-0198",
    primaryService: "Progress Review",
    totalBookings: 3,
    completedBookings: 2,
    lifetimeValue: 3750,
    lastActivity: "1 hr ago",
    activityOrder: 4,
    health: "Stable",
    segment: "Active",
    agent: "Alex Morgan",
    customerSince: "January 9, 2025",
    lastInteraction: "Email response · Today, 9:12 AM",
    nextBooking: "May 27 · 11:00 AM",
    summary:
      "Michael uses progress reviews to keep his team aligned and is currently evaluating a broader service plan.",
    preferences: [
      "Prefers email communication",
      "Needs calendar invitations with an agenda",
    ],
    relationshipSignals: [
      "Two completed reviews",
      "Opens preparation resources",
      "Shared positive feedback",
    ],
    risks: ["Comparing the broader plan with another provider."],
    recommendation:
      "Send a concise plan comparison before his scheduled review.",
    timeline: [
      {
        id: "customer-002-a",
        title: "Email response received",
        detail: "Asked for details about the broader service plan.",
        time: "Today · 9:12 AM",
      },
      {
        id: "customer-002-b",
        title: "Progress review booked",
        detail: "Reserved the May 27 morning appointment.",
        time: "May 15 · 3:40 PM",
      },
    ],
  },
  {
    id: "customer-003",
    name: "Jessica Davis",
    initials: "JD",
    company: "Davis Wellness",
    email: "jessica.davis@example.com",
    phone: "+1 (555) 010-0116",
    primaryService: "Wellness Assessment",
    totalBookings: 11,
    completedBookings: 10,
    lifetimeValue: 12860,
    lastActivity: "2 hrs ago",
    activityOrder: 5,
    health: "Healthy",
    segment: "Returning",
    agent: "Nina Patel",
    customerSince: "March 22, 2023",
    lastInteraction: "Assessment review · Today, 8:42 AM",
    nextBooking: "June 3 · 9:30 AM",
    summary:
      "Jessica is a long-term customer with strong engagement and a dependable quarterly assessment rhythm.",
    preferences: [
      "Prefers morning appointments",
      "Welcomes SMS reminders one day before",
    ],
    relationshipSignals: [
      "Ten completed bookings",
      "High recurring engagement",
      "Two successful referrals",
    ],
    risks: ["No material risks currently recorded."],
    recommendation:
      "Maintain the quarterly cadence and acknowledge her recent referral.",
    timeline: [
      {
        id: "customer-003-a",
        title: "Assessment review completed",
        detail: "Reviewed progress and agreed on next-quarter priorities.",
        time: "Today · 8:42 AM",
      },
      {
        id: "customer-003-b",
        title: "Next assessment scheduled",
        detail: "Booked the June 3 morning slot.",
        time: "Yesterday · 4:10 PM",
      },
    ],
  },
  {
    id: "customer-004",
    name: "Ahmed Khan",
    initials: "AK",
    company: "Horizon Partners",
    email: "ahmed.khan@example.com",
    phone: "+1 (555) 010-0151",
    primaryService: "Treatment Planning",
    totalBookings: 2,
    completedBookings: 1,
    lifetimeValue: 5200,
    lastActivity: "3 hrs ago",
    activityOrder: 6,
    health: "Stable",
    segment: "New",
    agent: "Lucas Reed",
    customerSince: "April 28, 2026",
    lastInteraction: "WhatsApp conversation · Today, 7:54 AM",
    nextBooking: "May 21 · 9:00 AM",
    summary:
      "Ahmed recently completed onboarding and is preparing for his second treatment-planning session.",
    preferences: [
      "Prefers WhatsApp for short updates",
      "Morning appointments before 10:00 AM",
    ],
    relationshipSignals: [
      "Onboarding completed",
      "Preparation form submitted",
      "Second booking confirmed",
    ],
    risks: ["Limited morning availability may affect future scheduling."],
    recommendation:
      "Confirm the preparation materials today and protect the morning cadence.",
    timeline: [
      {
        id: "customer-004-a",
        title: "Appointment confirmed",
        detail: "Confirmed the May 21 treatment-planning session.",
        time: "Today · 7:54 AM",
      },
      {
        id: "customer-004-b",
        title: "First session completed",
        detail: "Initial plan and goals documented.",
        time: "May 6 · 9:00 AM",
      },
    ],
  },
  {
    id: "customer-005",
    name: "Olivia Martin",
    initials: "OM",
    company: "Martin Advisory",
    email: "olivia.martin@example.com",
    phone: "+1 (555) 010-0184",
    primaryService: "Initial Consultation",
    totalBookings: 8,
    completedBookings: 8,
    lifetimeValue: 9340,
    lastActivity: "Yesterday",
    activityOrder: 8,
    health: "Healthy",
    segment: "Returning",
    agent: "Maya Chen",
    customerSince: "November 3, 2023",
    lastInteraction: "Booking follow-up · Yesterday, 3:17 PM",
    nextBooking: "Not scheduled",
    summary:
      "Olivia has completed every scheduled appointment and typically returns when a new planning cycle begins.",
    preferences: [
      "Prefers phone calls for complex decisions",
      "Email summaries after appointments",
    ],
    relationshipSignals: [
      "Perfect completion history",
      "Consistent satisfaction feedback",
      "Referred Jessica Davis",
    ],
    risks: ["No next appointment is currently scheduled."],
    recommendation:
      "Check in next month as her normal planning cycle approaches.",
    timeline: [
      {
        id: "customer-005-a",
        title: "Follow-up completed",
        detail: "Confirmed satisfaction and closed the current service cycle.",
        time: "Yesterday · 3:17 PM",
      },
      {
        id: "customer-005-b",
        title: "Consultation completed",
        detail: "All current objectives were reviewed.",
        time: "May 10 · 2:30 PM",
      },
    ],
  },
  {
    id: "customer-006",
    name: "David Lee",
    initials: "DL",
    company: "Lee Operations",
    email: "david.lee@example.com",
    phone: "+1 (555) 010-0127",
    primaryService: "Treatment Planning",
    totalBookings: 4,
    completedBookings: 3,
    lifetimeValue: 4680,
    lastActivity: "2 days ago",
    activityOrder: 10,
    health: "Needs Attention",
    segment: "At Risk",
    agent: "Lucas Reed",
    customerSince: "September 17, 2024",
    lastInteraction: "Missed appointment call · May 16, 4:40 PM",
    nextBooking: "Not scheduled",
    summary:
      "David was previously engaged but missed his latest appointment after internal priorities changed.",
    preferences: [
      "Prefers phone outreach",
      "Avoid Monday morning appointments",
    ],
    relationshipSignals: [
      "Three completed bookings",
      "Previously responsive to direct calls",
    ],
    risks: [
      "Missed the latest appointment",
      "No future booking",
      "Current initiative is delayed",
    ],
    recommendation:
      "Place one personal call this week and offer a low-commitment review option.",
    timeline: [
      {
        id: "customer-006-a",
        title: "Missed appointment follow-up",
        detail: "Voicemail left with rescheduling options.",
        time: "May 16 · 4:40 PM",
      },
      {
        id: "customer-006-b",
        title: "Appointment missed",
        detail: "No attendance or cancellation notice received.",
        time: "May 16 · 3:00 PM",
      },
    ],
  },
  {
    id: "customer-007",
    name: "Priya Sharma",
    initials: "PS",
    company: "Prism Health",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 010-0163",
    primaryService: "Wellness Assessment",
    totalBookings: 1,
    completedBookings: 1,
    lifetimeValue: 1850,
    lastActivity: "18 days ago",
    activityOrder: 12,
    health: "At Risk",
    segment: "Inactive",
    agent: "Nina Patel",
    customerSince: "February 12, 2025",
    lastInteraction: "Email check-in · April 30, 10:08 AM",
    nextBooking: "Not scheduled",
    summary:
      "Priya completed an initial assessment but has not engaged with recent follow-up outreach.",
    preferences: [
      "Email communication only",
      "Prefers appointments near midday",
    ],
    relationshipSignals: ["Initial assessment completed", "Positive survey"],
    risks: [
      "No response to two follow-ups",
      "No activity in more than two weeks",
    ],
    recommendation:
      "Send one helpful, non-promotional resource and pause outreach if there is no response.",
    timeline: [
      {
        id: "customer-007-a",
        title: "Check-in email sent",
        detail: "Shared a progress resource and invitation to reconnect.",
        time: "April 30 · 10:08 AM",
      },
      {
        id: "customer-007-b",
        title: "Wellness assessment completed",
        detail: "Assessment summary delivered by email.",
        time: "March 14 · 12:00 PM",
      },
    ],
  },
  {
    id: "customer-008",
    name: "Marcus Thompson",
    initials: "MT",
    company: "Thompson Group",
    email: "marcus.thompson@example.com",
    phone: "+1 (555) 010-0191",
    primaryService: "Progress Review",
    totalBookings: 12,
    completedBookings: 11,
    lifetimeValue: 15620,
    lastActivity: "Yesterday",
    activityOrder: 7,
    health: "Healthy",
    segment: "Returning",
    agent: "Alex Morgan",
    customerSince: "June 5, 2022",
    lastInteraction: "Staff booking call · Yesterday, 4:05 PM",
    nextBooking: "May 25 · 4:00 PM",
    summary:
      "Marcus is a high-value returning customer with a dependable review schedule and clear time expectations.",
    preferences: [
      "Appointments must finish within 30 minutes",
      "Prefers phone confirmations",
    ],
    relationshipSignals: [
      "Eleven completed bookings",
      "Highest directory lifetime value",
      "Regular quarterly cadence",
    ],
    risks: ["Schedule delays would create a poor experience."],
    recommendation:
      "Review his notes in advance and keep the upcoming session tightly structured.",
    timeline: [
      {
        id: "customer-008-a",
        title: "Appointment confirmed",
        detail: "Progress review booked for May 25.",
        time: "Yesterday · 4:05 PM",
      },
      {
        id: "customer-008-b",
        title: "Review completed",
        detail: "Quarterly progress review completed on time.",
        time: "February 24 · 4:00 PM",
      },
    ],
  },
  {
    id: "customer-009",
    name: "Emma Wilson",
    initials: "EW",
    company: "Wilson Design",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 010-0138",
    primaryService: "Follow-up Consultation",
    totalBookings: 2,
    completedBookings: 1,
    lifetimeValue: 2900,
    lastActivity: "24 min ago",
    activityOrder: 2,
    health: "Stable",
    segment: "New",
    agent: "Nina Patel",
    customerSince: "May 2, 2026",
    lastInteraction: "WhatsApp question · Today, 10:12 AM",
    nextBooking: "May 29 · 1:00 PM",
    summary:
      "Emma is a new customer preparing for her first follow-up consultation and remains actively engaged.",
    preferences: [
      "Prefers WhatsApp for quick questions",
      "Needs records guidance before appointments",
    ],
    relationshipSignals: [
      "First booking completed",
      "Second booking confirmed",
      "Responds quickly",
    ],
    risks: ["Previous-provider records have not yet been received."],
    recommendation:
      "Confirm the records process this week so her next visit stays productive.",
    timeline: [
      {
        id: "customer-009-a",
        title: "Records question answered",
        detail: "Shared the secure preparation steps.",
        time: "Today · 10:12 AM",
      },
      {
        id: "customer-009-b",
        title: "Follow-up booked",
        detail: "Reserved the May 29 afternoon appointment.",
        time: "May 17 · 1:22 PM",
      },
    ],
  },
  {
    id: "customer-010",
    name: "Noah Carter",
    initials: "NC",
    company: "Carter Works",
    email: "noah.carter@example.com",
    phone: "+1 (555) 010-0172",
    primaryService: "Initial Consultation",
    totalBookings: 5,
    completedBookings: 4,
    lifetimeValue: 6100,
    lastActivity: "45 min ago",
    activityOrder: 3,
    health: "Needs Attention",
    segment: "Active",
    agent: "Maya Chen",
    customerSince: "October 19, 2024",
    lastInteraction: "Outbound call · Today, 9:51 AM",
    nextBooking: "Awaiting confirmation",
    summary:
      "Noah has a positive service history but has not yet confirmed the appointment options sent this week.",
    preferences: [
      "Prefers email appointment options",
      "Afternoon follow-up calls",
    ],
    relationshipSignals: [
      "Four completed bookings",
      "Positive service feedback",
    ],
    risks: ["Two appointment options are awaiting confirmation."],
    recommendation:
      "Follow up tomorrow afternoon with one clear preferred appointment.",
    timeline: [
      {
        id: "customer-010-a",
        title: "Outbound call completed",
        detail: "Discussed timing and sent two appointment options.",
        time: "Today · 9:51 AM",
      },
      {
        id: "customer-010-b",
        title: "Consultation completed",
        detail: "Reviewed the current service plan.",
        time: "April 22 · 3:30 PM",
      },
    ],
  },
  {
    id: "customer-011",
    name: "Sophia Martinez",
    initials: "SM",
    company: "Solis Creative",
    email: "sophia.martinez@example.com",
    phone: "+1 (555) 010-0159",
    primaryService: "Treatment Planning",
    totalBookings: 6,
    completedBookings: 5,
    lifetimeValue: 7800,
    lastActivity: "Yesterday",
    activityOrder: 9,
    health: "Healthy",
    segment: "Active",
    agent: "Alex Morgan",
    customerSince: "July 8, 2024",
    lastInteraction: "Video review · Yesterday, 1:30 PM",
    nextBooking: "June 1 · 1:30 PM",
    summary:
      "Sophia coordinates a multi-stakeholder service plan and engages reliably with structured review materials.",
    preferences: [
      "Prefers video appointments",
      "Needs written summaries for stakeholders",
    ],
    relationshipSignals: [
      "Five completed bookings",
      "Stakeholders remain aligned",
      "Next review scheduled",
    ],
    risks: ["Stakeholder approval can extend decision timelines."],
    recommendation:
      "Send the one-page summary early enough for stakeholder review.",
    timeline: [
      {
        id: "customer-011-a",
        title: "Video review completed",
        detail: "Aligned the team on next-stage priorities.",
        time: "Yesterday · 1:30 PM",
      },
      {
        id: "customer-011-b",
        title: "Next review scheduled",
        detail: "Reserved the June 1 video appointment.",
        time: "May 16 · 11:05 AM",
      },
    ],
  },
  {
    id: "customer-012",
    name: "Ethan Clark",
    initials: "EC",
    company: "Clark Services",
    email: "ethan.clark@example.com",
    phone: "+1 (555) 010-0189",
    primaryService: "Wellness Assessment",
    totalBookings: 3,
    completedBookings: 2,
    lifetimeValue: 4250,
    lastActivity: "36 min ago",
    activityOrder: 2.5,
    health: "Stable",
    segment: "Active",
    agent: "Lucas Reed",
    customerSince: "December 11, 2025",
    lastInteraction: "AI inbound call · Today, 10:00 AM",
    nextBooking: "May 30 · 10:30 AM",
    summary:
      "Ethan is expanding an individual assessment into a broader team wellness initiative.",
    preferences: [
      "Prefers concise phone calls",
      "Email documentation for team review",
    ],
    relationshipSignals: [
      "Two completed bookings",
      "Exploring an expanded service",
      "Next assessment scheduled",
    ],
    risks: ["Final participant count remains unconfirmed."],
    recommendation:
      "Confirm participant count before preparing the next assessment.",
    timeline: [
      {
        id: "customer-012-a",
        title: "Scope call completed",
        detail: "Discussed expanding the assessment to his team.",
        time: "Today · 10:00 AM",
      },
      {
        id: "customer-012-b",
        title: "Assessment booked",
        detail: "Reserved the May 30 morning appointment.",
        time: "May 17 · 2:16 PM",
      },
    ],
  },
];
