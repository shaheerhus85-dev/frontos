export type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export type BookingSource = "AI Agent" | "Website" | "Phone" | "Staff";

export type BookingRecord = Readonly<{
  id: string;
  customer: string;
  initials: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  dateShort: string;
  dateIso: string;
  day: string;
  time: string;
  startHour: number;
  duration: string;
  durationMinutes: number;
  agent: string;
  source: BookingSource;
  status: BookingStatus;
  notes: string;
  summary: string;
  reminder: string;
  recommendation: string;
}>;

export type BookingsKpi = Readonly<{
  id: "total" | "confirmed" | "pending" | "completion";
  label: string;
  value: string;
  change: string;
  supportingText: string;
  icon: "calendar" | "confirmed" | "pending" | "completion";
  tone: "blue" | "violet" | "pink" | "cyan";
}>;

export const bookingsKpis: readonly BookingsKpi[] = [
  {
    id: "total",
    label: "Total Bookings",
    value: "328",
    change: "18.7%",
    supportingText: "vs last week",
    icon: "calendar",
    tone: "blue",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    value: "274",
    change: "83.5%",
    supportingText: "confirmation rate",
    icon: "confirmed",
    tone: "violet",
  },
  {
    id: "pending",
    label: "Pending",
    value: "32",
    change: "9",
    supportingText: "require attention",
    icon: "pending",
    tone: "pink",
  },
  {
    id: "completion",
    label: "Completion Rate",
    value: "91.4%",
    change: "4.2%",
    supportingText: "improvement",
    icon: "completion",
    tone: "cyan",
  },
];

export const bookingServices = [
  "Initial Consultation",
  "Follow-up Consultation",
  "Wellness Assessment",
  "Treatment Planning",
  "Progress Review",
] as const;

export const bookingRecords: readonly BookingRecord[] = [
  {
    id: "booking-001",
    customer: "Sarah Anderson",
    initials: "SA",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 010-0142",
    service: "Initial Consultation",
    date: "May 18, 2026",
    dateShort: "May 18",
    dateIso: "2026-05-18",
    day: "Mon",
    time: "9:00 AM",
    startHour: 9,
    duration: "45 min",
    durationMinutes: 45,
    agent: "Dr. Maya Chen",
    source: "AI Agent",
    status: "Confirmed",
    notes:
      "First visit. Prefers a quiet appointment room and email communication.",
    summary:
      "Sarah is preparing for a first-time consultation focused on recurring fatigue and a sustainable care plan.",
    reminder: "Email reminder sent; SMS scheduled for 8:00 AM.",
    recommendation:
      "Review the intake form before the appointment and prepare the new-patient checklist.",
  },
  {
    id: "booking-002",
    customer: "Michael Brown",
    initials: "MB",
    email: "michael.brown@example.com",
    phone: "+1 (555) 010-0198",
    service: "Follow-up Consultation",
    date: "May 18, 2026",
    dateShort: "May 18",
    dateIso: "2026-05-18",
    day: "Mon",
    time: "10:30 AM",
    startHour: 10.5,
    duration: "30 min",
    durationMinutes: 30,
    agent: "Dr. Maya Chen",
    source: "Website",
    status: "Pending",
    notes: "Requested confirmation after checking his work calendar.",
    summary:
      "Michael is due for a two-week follow-up to review progress and adjust the current plan if needed.",
    reminder: "Confirmation request sent; awaiting response.",
    recommendation:
      "Call by 4:00 PM if the confirmation request remains unanswered.",
  },
  {
    id: "booking-003",
    customer: "Jessica Davis",
    initials: "JD",
    email: "jessica.davis@example.com",
    phone: "+1 (555) 010-0116",
    service: "Wellness Assessment",
    date: "May 18, 2026",
    dateShort: "May 18",
    dateIso: "2026-05-18",
    day: "Mon",
    time: "1:00 PM",
    startHour: 13,
    duration: "60 min",
    durationMinutes: 60,
    agent: "Nina Patel",
    source: "Phone",
    status: "Confirmed",
    notes: "Will bring recent lab results and a current medication list.",
    summary:
      "Jessica booked a comprehensive wellness assessment and has the preparation checklist.",
    reminder: "SMS and email reminders delivered.",
    recommendation:
      "Attach incoming lab results to the appointment record when received.",
  },
  {
    id: "booking-004",
    customer: "Daniel Wilson",
    initials: "DW",
    email: "daniel.wilson@example.com",
    phone: "+1 (555) 010-0175",
    service: "Treatment Planning",
    date: "May 17, 2026",
    dateShort: "May 17",
    dateIso: "2026-05-17",
    day: "Sun",
    time: "3:30 PM",
    startHour: 15.5,
    duration: "45 min",
    durationMinutes: 45,
    agent: "Dr. Lucas Reed",
    source: "Staff",
    status: "Completed",
    notes: "Partner joined by video for the final 15 minutes.",
    summary:
      "Daniel completed a planning session and selected the phased treatment option discussed with the care team.",
    reminder: "Completed before appointment.",
    recommendation:
      "Send the agreed treatment plan and schedule a four-week progress review.",
  },
  {
    id: "booking-005",
    customer: "Emily Carter",
    initials: "EC",
    email: "emily.carter@example.com",
    phone: "+1 (555) 010-0133",
    service: "Progress Review",
    date: "May 16, 2026",
    dateShort: "May 16",
    dateIso: "2026-05-16",
    day: "Sat",
    time: "11:00 AM",
    startHour: 11,
    duration: "30 min",
    durationMinutes: 30,
    agent: "Nina Patel",
    source: "AI Agent",
    status: "Cancelled",
    notes: "Cancelled because of travel disruption; would like a weekday slot.",
    summary:
      "Emily cancelled her scheduled progress review and has not yet selected a replacement time.",
    reminder: "Cancelled after the email reminder was delivered.",
    recommendation:
      "Offer Tuesday and Thursday morning options for the following week.",
  },
  {
    id: "booking-006",
    customer: "Ahmed Khan",
    initials: "AK",
    email: "ahmed.khan@example.com",
    phone: "+1 (555) 010-0151",
    service: "Follow-up Consultation",
    date: "May 15, 2026",
    dateShort: "May 15",
    dateIso: "2026-05-15",
    day: "Fri",
    time: "9:30 AM",
    startHour: 9.5,
    duration: "30 min",
    durationMinutes: 30,
    agent: "Dr. Lucas Reed",
    source: "AI Agent",
    status: "Completed",
    notes: "Morning appointments work best. Previous visit notes are attached.",
    summary:
      "Ahmed completed a routine follow-up and reported steady improvement since his previous visit.",
    reminder: "SMS reminder delivered.",
    recommendation:
      "Continue the current plan and check in by phone in two weeks.",
  },
  {
    id: "booking-007",
    customer: "Olivia Martin",
    initials: "OM",
    email: "olivia.martin@example.com",
    phone: "+1 (555) 010-0184",
    service: "Initial Consultation",
    date: "May 14, 2026",
    dateShort: "May 14",
    dateIso: "2026-05-14",
    day: "Thu",
    time: "2:00 PM",
    startHour: 14,
    duration: "45 min",
    durationMinutes: 45,
    agent: "Dr. Maya Chen",
    source: "Website",
    status: "Completed",
    notes: "Completed digital intake form before arrival.",
    summary:
      "Olivia completed an initial consultation and agreed to begin with a wellness assessment.",
    reminder: "Email and SMS reminders delivered.",
    recommendation:
      "Send assessment preparation guidance before the next appointment.",
  },
  {
    id: "booking-008",
    customer: "David Lee",
    initials: "DL",
    email: "david.lee@example.com",
    phone: "+1 (555) 010-0127",
    service: "Treatment Planning",
    date: "May 13, 2026",
    dateShort: "May 13",
    dateIso: "2026-05-13",
    day: "Wed",
    time: "4:00 PM",
    startHour: 16,
    duration: "60 min",
    durationMinutes: 60,
    agent: "Dr. Lucas Reed",
    source: "Phone",
    status: "Completed",
    notes: "Asked for printed plan options to review at home.",
    summary:
      "David reviewed three care options and asked for additional time before choosing a final plan.",
    reminder: "Phone reminder completed by staff.",
    recommendation:
      "Follow up on Friday afternoon to answer questions and confirm his selection.",
  },
  {
    id: "booking-009",
    customer: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 010-0163",
    service: "Wellness Assessment",
    date: "May 12, 2026",
    dateShort: "May 12",
    dateIso: "2026-05-12",
    day: "Tue",
    time: "10:00 AM",
    startHour: 10,
    duration: "60 min",
    durationMinutes: 60,
    agent: "Nina Patel",
    source: "Staff",
    status: "Completed",
    notes: "Requested a copy of the assessment summary by email.",
    summary:
      "Priya completed a wellness assessment and identified sleep consistency as the first priority.",
    reminder: "Email reminder delivered.",
    recommendation:
      "Send the assessment summary with the approved sleep-habit guide.",
  },
  {
    id: "booking-010",
    customer: "Marcus Thompson",
    initials: "MT",
    email: "marcus.thompson@example.com",
    phone: "+1 (555) 010-0191",
    service: "Progress Review",
    date: "May 18, 2026",
    dateShort: "May 18",
    dateIso: "2026-05-18",
    day: "Mon",
    time: "4:00 PM",
    startHour: 16,
    duration: "30 min",
    durationMinutes: 30,
    agent: "Dr. Lucas Reed",
    source: "Staff",
    status: "Confirmed",
    notes: "Needs to leave promptly by 4:35 PM for another appointment.",
    summary:
      "Marcus is scheduled for a concise progress review focused on recent treatment response.",
    reminder: "SMS reminder scheduled for noon.",
    recommendation:
      "Review his latest progress notes in advance to keep the visit on schedule.",
  },
];
