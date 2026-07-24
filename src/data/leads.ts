export type LeadStage = "New" | "Contacted" | "Qualified" | "Booked" | "Lost";

export type LeadSource =
  "AI Call" | "Website" | "Referral" | "WhatsApp" | "Staff";

export type LeadAgent =
  "Maya Chen" | "Lucas Reed" | "Nina Patel" | "Alex Morgan";

export type LeadPriority = "High" | "Medium" | "Standard";

export type LeadInteraction = Readonly<{
  id: string;
  title: string;
  detail: string;
  time: string;
}>;

export type LeadRecord = Readonly<{
  id: string;
  name: string;
  initials: string;
  company?: string;
  email: string;
  phone: string;
  serviceInterest: string;
  source: LeadSource;
  stage: LeadStage;
  score: number;
  agent: LeadAgent;
  lastActivity: string;
  lastInteraction: string;
  priority: LeadPriority;
  estimatedValue: number;
  summary: string;
  qualificationSignals: readonly string[];
  concerns: readonly string[];
  recommendation: string;
  timeline: readonly LeadInteraction[];
}>;

export type LeadsKpi = Readonly<{
  id: "total" | "qualified" | "booked" | "conversion";
  label: string;
  value: string;
  change: string;
  supportingText: string;
  icon: "leads" | "qualified" | "booked" | "conversion";
  tone: "blue" | "violet" | "pink" | "cyan";
}>;

export const leadStages: readonly LeadStage[] = [
  "New",
  "Contacted",
  "Qualified",
  "Booked",
  "Lost",
];

export const leadSources: readonly LeadSource[] = [
  "AI Call",
  "Website",
  "Referral",
  "WhatsApp",
  "Staff",
];

export const leadAgents: readonly LeadAgent[] = [
  "Maya Chen",
  "Lucas Reed",
  "Nina Patel",
  "Alex Morgan",
];

export const leadsKpis: readonly LeadsKpi[] = [
  {
    id: "total",
    label: "Total Leads",
    value: "214",
    change: "8.1%",
    supportingText: "vs last week",
    icon: "leads",
    tone: "blue",
  },
  {
    id: "qualified",
    label: "Qualified",
    value: "86",
    change: "40.2%",
    supportingText: "qualification rate",
    icon: "qualified",
    tone: "violet",
  },
  {
    id: "booked",
    label: "Appointments Booked",
    value: "52",
    change: "12",
    supportingText: "new this week",
    icon: "booked",
    tone: "pink",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "24.3%",
    change: "3.6%",
    supportingText: "improvement",
    icon: "conversion",
    tone: "cyan",
  },
];

export const leadRecords: readonly LeadRecord[] = [
  {
    id: "lead-001",
    name: "Sarah Anderson",
    initials: "SA",
    company: "Northstar Studio",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 010-0142",
    serviceInterest: "Initial Consultation",
    source: "AI Call",
    stage: "New",
    score: 82,
    agent: "Maya Chen",
    lastActivity: "12 min ago",
    lastInteraction: "AI discovery call · May 18, 10:24 AM",
    priority: "High",
    estimatedValue: 4800,
    summary:
      "Sarah is evaluating an initial consultation for her growing team and wants to understand timing before the end of the month.",
    qualificationSignals: [
      "Clear service need",
      "Decision-maker",
      "Ready within 30 days",
    ],
    concerns: ["Needs confirmation that afternoon appointments are available."],
    recommendation:
      "Call this afternoon with two consultation options and a concise preparation overview.",
    timeline: [
      {
        id: "timeline-001-a",
        title: "AI discovery call completed",
        detail:
          "Captured service goals, preferred timing, and contact details.",
        time: "Today · 10:24 AM",
      },
      {
        id: "timeline-001-b",
        title: "Lead created",
        detail: "High-intent language triggered priority review.",
        time: "Today · 10:19 AM",
      },
    ],
  },
  {
    id: "lead-002",
    name: "Michael Brown",
    initials: "MB",
    company: "Brown & Co.",
    email: "michael.brown@example.com",
    phone: "+1 (555) 010-0198",
    serviceInterest: "Progress Review",
    source: "Website",
    stage: "Contacted",
    score: 68,
    agent: "Alex Morgan",
    lastActivity: "1 hr ago",
    lastInteraction: "Email reply · May 18, 9:12 AM",
    priority: "Medium",
    estimatedValue: 3600,
    summary:
      "Michael submitted a pricing enquiry and replied to the first outreach with questions about the review process.",
    qualificationSignals: [
      "Responded to outreach",
      "Confirmed service fit",
      "Shared preferred schedule",
    ],
    concerns: ["Comparing the scope with another provider."],
    recommendation:
      "Send a short scope comparison and offer a 15-minute qualification call tomorrow.",
    timeline: [
      {
        id: "timeline-002-a",
        title: "Email response received",
        detail: "Asked what is included in a progress review.",
        time: "Today · 9:12 AM",
      },
      {
        id: "timeline-002-b",
        title: "Website form submitted",
        detail: "Requested pricing and next available dates.",
        time: "Yesterday · 4:38 PM",
      },
    ],
  },
  {
    id: "lead-003",
    name: "Jessica Davis",
    initials: "JD",
    company: "Davis Wellness",
    email: "jessica.davis@example.com",
    phone: "+1 (555) 010-0116",
    serviceInterest: "Wellness Assessment",
    source: "Referral",
    stage: "Qualified",
    score: 94,
    agent: "Nina Patel",
    lastActivity: "2 hrs ago",
    lastInteraction: "Qualification call · May 18, 8:42 AM",
    priority: "High",
    estimatedValue: 7200,
    summary:
      "Jessica was referred by an existing customer and has confirmed budget, timing, and decision authority for a wellness assessment.",
    qualificationSignals: [
      "Referral trust established",
      "Budget confirmed",
      "Decision-maker",
      "Target start this month",
    ],
    concerns: ["Would like written preparation guidance before booking."],
    recommendation:
      "Send the preparation guide today and offer the two remaining assessment appointments.",
    timeline: [
      {
        id: "timeline-003-a",
        title: "Qualification completed",
        detail: "Budget, authority, need, and timing were confirmed.",
        time: "Today · 8:42 AM",
      },
      {
        id: "timeline-003-b",
        title: "Referral received",
        detail: "Referred by Olivia Martin.",
        time: "Yesterday · 3:05 PM",
      },
    ],
  },
  {
    id: "lead-004",
    name: "Ahmed Khan",
    initials: "AK",
    email: "ahmed.khan@example.com",
    phone: "+1 (555) 010-0151",
    serviceInterest: "Treatment Planning",
    source: "WhatsApp",
    stage: "Qualified",
    score: 88,
    agent: "Lucas Reed",
    lastActivity: "3 hrs ago",
    lastInteraction: "WhatsApp conversation · May 18, 7:54 AM",
    priority: "High",
    estimatedValue: 5200,
    summary:
      "Ahmed has a defined treatment-planning need and requested a morning appointment during the next two weeks.",
    qualificationSignals: [
      "Specific service requested",
      "Timeline confirmed",
      "Engaged in two-way conversation",
    ],
    concerns: ["Morning availability is limited on his preferred days."],
    recommendation:
      "Hold the Thursday morning option locally and confirm his availability by phone.",
    timeline: [
      {
        id: "timeline-004-a",
        title: "Qualification questions answered",
        detail: "Confirmed objectives and preferred appointment window.",
        time: "Today · 7:54 AM",
      },
      {
        id: "timeline-004-b",
        title: "WhatsApp enquiry received",
        detail: "Asked about treatment-planning availability.",
        time: "Yesterday · 6:21 PM",
      },
    ],
  },
  {
    id: "lead-005",
    name: "Olivia Martin",
    initials: "OM",
    company: "Martin Advisory",
    email: "olivia.martin@example.com",
    phone: "+1 (555) 010-0184",
    serviceInterest: "Initial Consultation",
    source: "AI Call",
    stage: "Booked",
    score: 91,
    agent: "Maya Chen",
    lastActivity: "Yesterday",
    lastInteraction: "Booking confirmation · May 17, 3:17 PM",
    priority: "Medium",
    estimatedValue: 4200,
    summary:
      "Olivia completed qualification and selected an initial consultation after reviewing the available times.",
    qualificationSignals: [
      "Consultation booked",
      "Contact details verified",
      "Preparation checklist accepted",
    ],
    concerns: ["None currently recorded."],
    recommendation:
      "Keep the normal reminder sequence active and review her intake form before the visit.",
    timeline: [
      {
        id: "timeline-005-a",
        title: "Appointment booked",
        detail: "Initial consultation reserved for Tuesday at 2:30 PM.",
        time: "Yesterday · 3:17 PM",
      },
      {
        id: "timeline-005-b",
        title: "AI qualification completed",
        detail: "Service fit and timing confirmed.",
        time: "Yesterday · 3:08 PM",
      },
    ],
  },
  {
    id: "lead-006",
    name: "David Lee",
    initials: "DL",
    company: "Lee Operations",
    email: "david.lee@example.com",
    phone: "+1 (555) 010-0127",
    serviceInterest: "Treatment Planning",
    source: "Staff",
    stage: "Lost",
    score: 43,
    agent: "Lucas Reed",
    lastActivity: "2 days ago",
    lastInteraction: "Closing call · May 16, 4:40 PM",
    priority: "Standard",
    estimatedValue: 3900,
    summary:
      "David decided to pause treatment planning after his internal priorities changed.",
    qualificationSignals: ["Service need was confirmed", "Authority verified"],
    concerns: ["Project timing moved beyond the current quarter."],
    recommendation:
      "Place in a low-frequency nurture sequence and revisit in three months.",
    timeline: [
      {
        id: "timeline-006-a",
        title: "Opportunity closed",
        detail: "David confirmed the initiative is paused.",
        time: "May 16 · 4:40 PM",
      },
      {
        id: "timeline-006-b",
        title: "Staff follow-up completed",
        detail: "Discussed timeline and current priorities.",
        time: "May 14 · 11:20 AM",
      },
    ],
  },
  {
    id: "lead-007",
    name: "Priya Sharma",
    initials: "PS",
    company: "Prism Health",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 010-0163",
    serviceInterest: "Wellness Assessment",
    source: "Website",
    stage: "Lost",
    score: 51,
    agent: "Nina Patel",
    lastActivity: "2 days ago",
    lastInteraction: "Email update · May 16, 10:08 AM",
    priority: "Standard",
    estimatedValue: 4600,
    summary:
      "Priya explored a wellness assessment but selected a provider closer to her office.",
    qualificationSignals: ["Need confirmed", "Engaged with pricing guide"],
    concerns: ["Location convenience outweighed the proposed service fit."],
    recommendation:
      "Thank her for the update and retain consent for occasional educational resources.",
    timeline: [
      {
        id: "timeline-007-a",
        title: "Lead marked lost",
        detail: "Selected a provider closer to her office.",
        time: "May 16 · 10:08 AM",
      },
      {
        id: "timeline-007-b",
        title: "Pricing guide opened",
        detail: "Viewed the wellness assessment overview.",
        time: "May 14 · 2:31 PM",
      },
    ],
  },
  {
    id: "lead-008",
    name: "Marcus Thompson",
    initials: "MT",
    company: "Thompson Group",
    email: "marcus.thompson@example.com",
    phone: "+1 (555) 010-0191",
    serviceInterest: "Progress Review",
    source: "Referral",
    stage: "Booked",
    score: 96,
    agent: "Alex Morgan",
    lastActivity: "Yesterday",
    lastInteraction: "Staff booking call · May 17, 4:05 PM",
    priority: "High",
    estimatedValue: 6800,
    summary:
      "Marcus was referred by a partner, completed qualification, and booked a progress review for next week.",
    qualificationSignals: [
      "Strong partner referral",
      "Budget confirmed",
      "Appointment booked",
    ],
    concerns: ["Needs the appointment to finish within 30 minutes."],
    recommendation:
      "Review his submitted notes in advance and keep the appointment tightly structured.",
    timeline: [
      {
        id: "timeline-008-a",
        title: "Appointment confirmed",
        detail: "Progress review booked for Monday at 4:00 PM.",
        time: "Yesterday · 4:05 PM",
      },
      {
        id: "timeline-008-b",
        title: "Partner referral logged",
        detail: "Introduced by Northstar Partners.",
        time: "May 16 · 1:18 PM",
      },
    ],
  },
  {
    id: "lead-009",
    name: "Emma Wilson",
    initials: "EW",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 010-0138",
    serviceInterest: "Follow-up Consultation",
    source: "WhatsApp",
    stage: "New",
    score: 74,
    agent: "Nina Patel",
    lastActivity: "24 min ago",
    lastInteraction: "WhatsApp enquiry · May 18, 10:12 AM",
    priority: "Medium",
    estimatedValue: 3200,
    summary:
      "Emma asked whether a follow-up consultation can review records from a previous provider.",
    qualificationSignals: ["Specific question", "Contact details verified"],
    concerns: ["Has not yet confirmed budget or preferred timing."],
    recommendation:
      "Answer the records question and ask two short qualification questions in the same reply.",
    timeline: [
      {
        id: "timeline-009-a",
        title: "WhatsApp enquiry received",
        detail: "Asked about bringing records from another provider.",
        time: "Today · 10:12 AM",
      },
      {
        id: "timeline-009-b",
        title: "Lead created",
        detail: "Contact details captured automatically.",
        time: "Today · 10:11 AM",
      },
    ],
  },
  {
    id: "lead-010",
    name: "Noah Carter",
    initials: "NC",
    company: "Carter Works",
    email: "noah.carter@example.com",
    phone: "+1 (555) 010-0172",
    serviceInterest: "Initial Consultation",
    source: "Staff",
    stage: "Contacted",
    score: 63,
    agent: "Maya Chen",
    lastActivity: "45 min ago",
    lastInteraction: "Outbound call · May 18, 9:51 AM",
    priority: "Medium",
    estimatedValue: 4400,
    summary:
      "Noah was introduced at a local event and asked staff to call with consultation options.",
    qualificationSignals: ["Warm staff introduction", "Call answered"],
    concerns: ["Requested time to review his schedule before continuing."],
    recommendation:
      "Send two appointment windows by email and follow up tomorrow afternoon.",
    timeline: [
      {
        id: "timeline-010-a",
        title: "Outbound call completed",
        detail: "Discussed service fit and timing preferences.",
        time: "Today · 9:51 AM",
      },
      {
        id: "timeline-010-b",
        title: "Staff lead added",
        detail: "Met at the Acme community event.",
        time: "Yesterday · 7:15 PM",
      },
    ],
  },
  {
    id: "lead-011",
    name: "Sophia Martinez",
    initials: "SM",
    company: "Solis Creative",
    email: "sophia.martinez@example.com",
    phone: "+1 (555) 010-0159",
    serviceInterest: "Treatment Planning",
    source: "Website",
    stage: "Qualified",
    score: 86,
    agent: "Alex Morgan",
    lastActivity: "Yesterday",
    lastInteraction: "Video consultation · May 17, 1:30 PM",
    priority: "High",
    estimatedValue: 6100,
    summary:
      "Sophia completed a video qualification session and wants a structured treatment-planning proposal.",
    qualificationSignals: [
      "Budget range confirmed",
      "Multiple stakeholders aligned",
      "Proposal requested",
    ],
    concerns: ["Needs stakeholder approval before selecting a date."],
    recommendation:
      "Send a one-page proposal and schedule a decision check-in for Friday.",
    timeline: [
      {
        id: "timeline-011-a",
        title: "Video qualification completed",
        detail: "Confirmed objectives, stakeholders, and budget range.",
        time: "Yesterday · 1:30 PM",
      },
      {
        id: "timeline-011-b",
        title: "Website enquiry received",
        detail: "Requested treatment-planning information.",
        time: "May 16 · 9:22 AM",
      },
    ],
  },
  {
    id: "lead-012",
    name: "Ethan Clark",
    initials: "EC",
    company: "Clark Services",
    email: "ethan.clark@example.com",
    phone: "+1 (555) 010-0189",
    serviceInterest: "Wellness Assessment",
    source: "AI Call",
    stage: "New",
    score: 79,
    agent: "Lucas Reed",
    lastActivity: "36 min ago",
    lastInteraction: "AI inbound call · May 18, 10:00 AM",
    priority: "Medium",
    estimatedValue: 5600,
    summary:
      "Ethan called to understand whether a wellness assessment could support a broader team initiative.",
    qualificationSignals: ["Clear exploratory need", "Follow-up permission"],
    concerns: ["Scope and participant count are not yet confirmed."],
    recommendation:
      "Schedule a short discovery call to confirm scope and participant count.",
    timeline: [
      {
        id: "timeline-012-a",
        title: "AI inbound call completed",
        detail: "Captured the initial use case and follow-up consent.",
        time: "Today · 10:00 AM",
      },
      {
        id: "timeline-012-b",
        title: "Lead scored",
        detail: "Intent and engagement produced a score of 79.",
        time: "Today · 9:58 AM",
      },
    ],
  },
];
