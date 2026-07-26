export const agentStatuses = ["Active", "Paused", "Needs Attention"] as const;
export type AgentStatus = (typeof agentStatuses)[number];

export const agentFunctions = [
  "Reception",
  "Scheduling",
  "Lead Qualification",
  "Follow-up",
  "Support",
] as const;
export type AgentFunction = (typeof agentFunctions)[number];

export type AgentKpi = Readonly<{
  id: "active" | "tasks" | "automation" | "success";
  label: string;
  value: string;
  supportingText: string;
  tone: "blue" | "violet" | "cyan" | "pink";
}>;

export type AgentActivity = Readonly<{
  id: string;
  title: string;
  detail: string;
  time: string;
}>;

export type AIAgent = Readonly<{
  id: string;
  name: string;
  initials: string;
  role: string;
  function: AgentFunction;
  responsibility: string;
  status: AgentStatus;
  successRate: number;
  tasksHandled: number;
  responseTimeSeconds: number;
  responseTime: string;
  automationLevel: number;
  escalationRate: number;
  lastActive: string;
  channels: readonly string[];
  workflows: readonly string[];
  summary: string;
  strengths: readonly string[];
  issues: readonly string[];
  optimization: string;
  timeline: readonly AgentActivity[];
  configuration: Readonly<{
    model: string;
    language: string;
    handoffRule: string;
    knowledgeScope: string;
  }>;
}>;

export type AttentionItem = Readonly<{
  id: string;
  agentName: string;
  issue: string;
  severity: "High" | "Medium" | "Low";
  recommendation: string;
}>;

export type TrendPoint = Readonly<{
  label: string;
  completed: number;
  successful: number;
}>;

export const agentKpis: readonly AgentKpi[] = [
  {
    id: "active",
    label: "Active Agents",
    value: "6",
    supportingText: "5 operational, 1 paused",
    tone: "blue",
  },
  {
    id: "tasks",
    label: "Tasks Completed",
    value: "1,842",
    supportingText: "18.6% vs last week",
    tone: "violet",
  },
  {
    id: "automation",
    label: "Automation Rate",
    value: "87.4%",
    supportingText: "1,610 tasks automated",
    tone: "cyan",
  },
  {
    id: "success",
    label: "Success Rate",
    value: "96.2%",
    supportingText: "1.8% improvement",
    tone: "pink",
  },
];

export const aiAgents: readonly AIAgent[] = [
  {
    id: "front-desk",
    name: "Front Desk Agent",
    initials: "FD",
    role: "AI Receptionist",
    function: "Reception",
    responsibility:
      "Answers inbound requests, identifies intent, and routes every conversation.",
    status: "Active",
    successRate: 98.4,
    tasksHandled: 456,
    responseTimeSeconds: 8,
    responseTime: "8 sec",
    automationLevel: 94,
    escalationRate: 2.1,
    lastActive: "Just now",
    channels: ["Phone", "Web chat", "WhatsApp"],
    workflows: ["Inbound greeting", "Intent routing", "Urgent handoff"],
    summary:
      "Consistently resolves high-volume first-contact requests with accurate routing and a calm customer experience.",
    strengths: [
      "Fastest first response across the agent team",
      "Reliable intent classification during peak hours",
    ],
    issues: ["Occasional ambiguity when callers request multiple services."],
    optimization:
      "Add a short confirmation step before routing multi-intent conversations.",
    timeline: [
      {
        id: "front-desk-a",
        title: "Inbound request resolved",
        detail: "Answered eligibility questions and routed a booking request.",
        time: "Just now",
      },
      {
        id: "front-desk-b",
        title: "Priority handoff completed",
        detail: "Transferred an urgent service request to the support queue.",
        time: "12 min ago",
      },
      {
        id: "front-desk-c",
        title: "Greeting workflow updated",
        detail: "Applied the approved after-hours response variation.",
        time: "Today · 8:05 AM",
      },
    ],
    configuration: {
      model: "FrontOS Conversational v2",
      language: "English (US)",
      handoffRule: "Route after 2 failed intent checks",
      knowledgeScope: "Services, hours, policies, and routing",
    },
  },
  {
    id: "scheduling",
    name: "Scheduling Agent",
    initials: "SA",
    role: "Appointment Coordinator",
    function: "Scheduling",
    responsibility:
      "Finds availability, books appointments, and manages rescheduling requests.",
    status: "Active",
    successRate: 97.8,
    tasksHandled: 372,
    responseTimeSeconds: 12,
    responseTime: "12 sec",
    automationLevel: 92,
    escalationRate: 2.8,
    lastActive: "2 min ago",
    channels: ["Phone", "Web chat", "SMS"],
    workflows: ["New booking", "Reschedule", "Cancellation recovery"],
    summary:
      "Maintains a strong booking completion rate while protecting availability rules and customer preferences.",
    strengths: [
      "Accurate availability matching",
      "Strong recovery rate for rescheduling requests",
    ],
    issues: ["Complex multi-person appointments still require staff review."],
    optimization:
      "Create a dedicated workflow for appointments with multiple attendees.",
    timeline: [
      {
        id: "scheduling-a",
        title: "Appointment booked",
        detail:
          "Reserved a consultation after confirming time-zone preference.",
        time: "2 min ago",
      },
      {
        id: "scheduling-b",
        title: "Cancellation recovered",
        detail: "Converted a cancellation into a rescheduled appointment.",
        time: "18 min ago",
      },
      {
        id: "scheduling-c",
        title: "Availability check completed",
        detail: "Shared three approved openings with a returning customer.",
        time: "Today · 9:42 AM",
      },
    ],
    configuration: {
      model: "FrontOS Scheduling v3",
      language: "English (US)",
      handoffRule: "Escalate multi-attendee or exception requests",
      knowledgeScope: "Availability, services, staff, and booking policy",
    },
  },
  {
    id: "lead-qualification",
    name: "Lead Qualification Agent",
    initials: "LQ",
    role: "Growth Qualifier",
    function: "Lead Qualification",
    responsibility:
      "Qualifies inbound prospects, captures fit signals, and assigns lead priority.",
    status: "Active",
    successRate: 96.7,
    tasksHandled: 318,
    responseTimeSeconds: 15,
    responseTime: "15 sec",
    automationLevel: 89,
    escalationRate: 3.4,
    lastActive: "5 min ago",
    channels: ["Web chat", "Email", "WhatsApp"],
    workflows: ["Inbound qualification", "Lead scoring", "Sales handoff"],
    summary:
      "Produces consistent qualification notes and prioritizes high-intent leads with minimal staff intervention.",
    strengths: [
      "High completion rate for qualification fields",
      "Clear, concise sales handoff summaries",
    ],
    issues: ["Industry-specific budget language can reduce confidence."],
    optimization:
      "Expand budget-range examples for the three most common customer segments.",
    timeline: [
      {
        id: "lead-qualification-a",
        title: "Lead qualified",
        detail: "Marked a multi-location inquiry as high intent.",
        time: "5 min ago",
      },
      {
        id: "lead-qualification-b",
        title: "Sales handoff prepared",
        detail: "Shared fit signals, budget, and preferred timing.",
        time: "26 min ago",
      },
      {
        id: "lead-qualification-c",
        title: "Nurture path assigned",
        detail: "Moved an early-stage prospect to educational follow-up.",
        time: "Today · 9:20 AM",
      },
    ],
    configuration: {
      model: "FrontOS Qualification v2",
      language: "English (US)",
      handoffRule: "Handoff at score 80 or explicit purchase intent",
      knowledgeScope: "Services, fit criteria, pricing bands, and lead stages",
    },
  },
  {
    id: "follow-up",
    name: "Follow-up Agent",
    initials: "FA",
    role: "Engagement Specialist",
    function: "Follow-up",
    responsibility:
      "Runs timely follow-ups for missed calls, open leads, and pending bookings.",
    status: "Active",
    successRate: 95.6,
    tasksHandled: 284,
    responseTimeSeconds: 24,
    responseTime: "24 sec",
    automationLevel: 91,
    escalationRate: 4.2,
    lastActive: "7 min ago",
    channels: ["Email", "SMS", "WhatsApp"],
    workflows: ["Missed-call recovery", "Lead nurture", "Booking reminder"],
    summary:
      "Keeps outstanding conversations moving with well-timed, context-aware messages across customer channels.",
    strengths: [
      "Strong missed-call recovery performance",
      "Consistent message timing and tone",
    ],
    issues: ["Response windows slow when customer consent data is incomplete."],
    optimization:
      "Surface communication consent earlier in the follow-up queue.",
    timeline: [
      {
        id: "follow-up-a",
        title: "Reminder acknowledged",
        detail: "Customer confirmed the pending appointment by SMS.",
        time: "7 min ago",
      },
      {
        id: "follow-up-b",
        title: "Missed call recovered",
        detail: "Re-engaged a caller and opened a booking conversation.",
        time: "34 min ago",
      },
      {
        id: "follow-up-c",
        title: "Nurture message sent",
        detail: "Shared a relevant service guide with an early-stage lead.",
        time: "Today · 8:48 AM",
      },
    ],
    configuration: {
      model: "FrontOS Engagement v2",
      language: "English (US)",
      handoffRule: "Escalate after a direct reply requesting staff",
      knowledgeScope: "Conversation history, consent, and approved templates",
    },
  },
  {
    id: "customer-support",
    name: "Customer Support Agent",
    initials: "CS",
    role: "Service Support Specialist",
    function: "Support",
    responsibility:
      "Resolves service questions, handles routine requests, and prepares support handoffs.",
    status: "Needs Attention",
    successRate: 92.8,
    tasksHandled: 238,
    responseTimeSeconds: 38,
    responseTime: "38 sec",
    automationLevel: 78,
    escalationRate: 8.6,
    lastActive: "11 min ago",
    channels: ["Phone", "Web chat", "Email"],
    workflows: ["Service question", "Request resolution", "Specialist handoff"],
    summary:
      "Handles routine support well, but a recent increase in policy exceptions is driving more escalations.",
    strengths: [
      "Clear summaries for staff handoffs",
      "Strong resolution quality for standard service questions",
    ],
    issues: [
      "Escalation rate is 3.1 points above the team target.",
      "Policy exception requests are taking longer to classify.",
    ],
    optimization:
      "Review the exception decision tree and add examples for recent policy edge cases.",
    timeline: [
      {
        id: "customer-support-a",
        title: "Specialist handoff delayed",
        detail: "A policy exception waited four minutes for queue acceptance.",
        time: "11 min ago",
      },
      {
        id: "customer-support-b",
        title: "Support request resolved",
        detail: "Answered a routine service preparation question.",
        time: "21 min ago",
      },
      {
        id: "customer-support-c",
        title: "Escalation threshold reached",
        detail: "Monitoring flagged an elevated seven-day escalation rate.",
        time: "Today · 8:30 AM",
      },
    ],
    configuration: {
      model: "FrontOS Support v3",
      language: "English (US)",
      handoffRule: "Escalate policy exceptions or confidence below 75%",
      knowledgeScope: "Services, policies, preparation, and support playbooks",
    },
  },
  {
    id: "escalation-coordinator",
    name: "Escalation Coordinator",
    initials: "EC",
    role: "Human Handoff Coordinator",
    function: "Support",
    responsibility:
      "Prioritizes escalations, packages context, and coordinates human ownership.",
    status: "Paused",
    successRate: 94.1,
    tasksHandled: 174,
    responseTimeSeconds: 31,
    responseTime: "31 sec",
    automationLevel: 69,
    escalationRate: 5.9,
    lastActive: "42 min ago",
    channels: ["Phone", "Web chat", "Internal queue"],
    workflows: ["Priority triage", "Context packaging", "Owner assignment"],
    summary:
      "Produces reliable handoff context and prioritization, but its assignment workflow is paused for a rules review.",
    strengths: [
      "Complete context packages for human reviewers",
      "Accurate urgency classification",
    ],
    issues: [
      "Owner-assignment workflow is paused.",
      "Two recent handoffs exceeded the target acceptance window.",
    ],
    optimization:
      "Validate the revised owner-assignment rules, then resume with monitored sampling.",
    timeline: [
      {
        id: "escalation-coordinator-a",
        title: "Workflow paused",
        detail: "Owner assignment paused locally for a routing-rule review.",
        time: "42 min ago",
      },
      {
        id: "escalation-coordinator-b",
        title: "Handoff packaged",
        detail: "Prepared conversation context and urgency signals.",
        time: "1 hr ago",
      },
      {
        id: "escalation-coordinator-c",
        title: "Delayed acceptance detected",
        detail: "Monitoring flagged a handoff outside the three-minute target.",
        time: "Today · 8:14 AM",
      },
    ],
    configuration: {
      model: "FrontOS Routing v2",
      language: "English (US)",
      handoffRule: "Assign by severity, skill, and live availability",
      knowledgeScope: "Queue state, staff skills, and escalation policy",
    },
  },
];

export const attentionItems: readonly AttentionItem[] = [
  {
    id: "attention-support",
    agentName: "Customer Support Agent",
    issue: "Escalation rate reached 8.6% over the last seven days.",
    severity: "High",
    recommendation: "Review policy exception routing and recent handoffs.",
  },
  {
    id: "attention-handoff",
    agentName: "Escalation Coordinator",
    issue: "Owner assignment is paused while routing rules are reviewed.",
    severity: "Medium",
    recommendation: "Validate the revised rule set before resuming.",
  },
  {
    id: "attention-follow-up",
    agentName: "Follow-up Agent",
    issue: "Consent checks delayed 12 follow-up tasks this morning.",
    severity: "Low",
    recommendation: "Surface consent state earlier in the task queue.",
  },
];

export const dailyAgentTrend: readonly TrendPoint[] = [
  { label: "8 AM", completed: 31, successful: 29 },
  { label: "10 AM", completed: 54, successful: 52 },
  { label: "12 PM", completed: 68, successful: 65 },
  { label: "2 PM", completed: 61, successful: 59 },
  { label: "4 PM", completed: 72, successful: 69 },
  { label: "6 PM", completed: 49, successful: 47 },
];

export const weeklyAgentTrend: readonly TrendPoint[] = [
  { label: "Mon", completed: 238, successful: 228 },
  { label: "Tue", completed: 264, successful: 254 },
  { label: "Wed", completed: 251, successful: 242 },
  { label: "Thu", completed: 289, successful: 279 },
  { label: "Fri", completed: 307, successful: 296 },
  { label: "Sat", completed: 258, successful: 248 },
  { label: "Sun", completed: 235, successful: 225 },
];
