export type CallStatus = "Completed" | "Escalated" | "Missed";

export type CallHandler = "AI Agent" | "Human Agent";

export type TranscriptEntry = Readonly<{
  speaker: "Caller" | "AI Agent";
  message: string;
}>;

export type CallRecord = Readonly<{
  id: string;
  caller: string;
  initials: string;
  phone: string;
  date: string;
  time: string;
  duration: string;
  handler: CallHandler;
  intent: string;
  outcome:
    | "Appointment booked"
    | "Question answered"
    | "Escalated to staff"
    | "Follow-up required"
    | "No answer";
  status: CallStatus;
  summary: string;
  recommendation: string;
  transcript: readonly TranscriptEntry[];
}>;

export type CallsKpi = Readonly<{
  id: "total" | "ai-handled" | "escalated" | "duration";
  label: string;
  value: string;
  change: string;
  supportingText: string;
  icon: "phone" | "bot" | "escalation" | "duration";
  tone: "blue" | "violet" | "pink" | "cyan";
}>;

export const callsKpis: readonly CallsKpi[] = [
  {
    id: "total",
    label: "Total Calls",
    value: "1,248",
    change: "12.5%",
    supportingText: "vs last week",
    icon: "phone",
    tone: "blue",
  },
  {
    id: "ai-handled",
    label: "AI Handled",
    value: "1,086",
    change: "87%",
    supportingText: "automation rate",
    icon: "bot",
    tone: "violet",
  },
  {
    id: "escalated",
    label: "Escalated",
    value: "74",
    change: "5.9%",
    supportingText: "of total calls",
    icon: "escalation",
    tone: "pink",
  },
  {
    id: "duration",
    label: "Average Duration",
    value: "3m 42s",
    change: "8.4%",
    supportingText: "faster than last week",
    icon: "duration",
    tone: "cyan",
  },
];

export const callRecords: readonly CallRecord[] = [
  {
    id: "call-001",
    caller: "Sarah Anderson",
    initials: "SA",
    phone: "+1 (555) 010-0142",
    date: "May 18, 2026",
    time: "10:24 AM",
    duration: "4m 18s",
    handler: "AI Agent",
    intent: "Book consultation",
    outcome: "Appointment booked",
    status: "Completed",
    summary:
      "Sarah requested a first-time consultation and confirmed an afternoon appointment after the AI agent reviewed available times.",
    recommendation:
      "Send the standard appointment reminder 24 hours before the visit.",
    transcript: [
      {
        speaker: "Caller",
        message: "I’d like to schedule a consultation for next week.",
      },
      {
        speaker: "AI Agent",
        message: "I can help with that. Tuesday at 2:30 PM is available.",
      },
      {
        speaker: "Caller",
        message: "Tuesday works perfectly. Please book it.",
      },
    ],
  },
  {
    id: "call-002",
    caller: "Michael Brown",
    initials: "MB",
    phone: "+1 (555) 010-0198",
    date: "May 18, 2026",
    time: "9:15 AM",
    duration: "2m 46s",
    handler: "AI Agent",
    intent: "Service pricing",
    outcome: "Question answered",
    status: "Completed",
    summary:
      "Michael asked about consultation pricing and the AI agent explained the standard service fee and what it includes.",
    recommendation:
      "No immediate action is needed; include Michael in the pricing-guide follow-up sequence.",
    transcript: [
      {
        speaker: "Caller",
        message: "Can you tell me what the initial consultation costs?",
      },
      {
        speaker: "AI Agent",
        message:
          "The initial consultation is $95 and includes a needs assessment.",
      },
    ],
  },
  {
    id: "call-003",
    caller: "Jessica Davis",
    initials: "JD",
    phone: "+1 (555) 010-0116",
    date: "May 18, 2026",
    time: "8:42 AM",
    duration: "6m 02s",
    handler: "Human Agent",
    intent: "Billing dispute",
    outcome: "Escalated to staff",
    status: "Escalated",
    summary:
      "Jessica reported a duplicated invoice charge. The AI agent gathered the invoice details before transferring the call to the billing team.",
    recommendation:
      "Billing staff should review invoice INV-2048 and return the call today.",
    transcript: [
      {
        speaker: "Caller",
        message: "I think I was charged twice on my latest invoice.",
      },
      {
        speaker: "AI Agent",
        message:
          "I’m sorry about that. I’ll collect the invoice number and connect you with billing.",
      },
    ],
  },
  {
    id: "call-004",
    caller: "Daniel Wilson",
    initials: "DW",
    phone: "+1 (555) 010-0175",
    date: "May 17, 2026",
    time: "4:38 PM",
    duration: "3m 21s",
    handler: "AI Agent",
    intent: "Reschedule visit",
    outcome: "Follow-up required",
    status: "Completed",
    summary:
      "Daniel requested a different appointment date, but none of the available options matched his schedule.",
    recommendation:
      "Call Daniel when the following week’s appointment calendar opens.",
    transcript: [
      {
        speaker: "Caller",
        message: "I need to move Friday’s appointment to the following week.",
      },
      {
        speaker: "AI Agent",
        message:
          "That calendar is not open yet, but I can flag your request for follow-up.",
      },
    ],
  },
  {
    id: "call-005",
    caller: "Emily Carter",
    initials: "EC",
    phone: "+1 (555) 010-0133",
    date: "May 17, 2026",
    time: "2:06 PM",
    duration: "1m 12s",
    handler: "AI Agent",
    intent: "Return missed call",
    outcome: "No answer",
    status: "Missed",
    summary:
      "The outbound return call reached voicemail before a conversation could begin.",
    recommendation:
      "Retry once tomorrow morning and send a short text reminder if unanswered.",
    transcript: [
      {
        speaker: "AI Agent",
        message:
          "Hello, this is the Acme Clinic virtual assistant returning your call.",
      },
    ],
  },
  {
    id: "call-006",
    caller: "Ahmed Khan",
    initials: "AK",
    phone: "+1 (555) 010-0151",
    date: "May 17, 2026",
    time: "11:52 AM",
    duration: "5m 09s",
    handler: "AI Agent",
    intent: "Book follow-up",
    outcome: "Appointment booked",
    status: "Completed",
    summary:
      "Ahmed booked a routine follow-up and confirmed his preferred contact number.",
    recommendation:
      "Attach the previous visit notes to the appointment before confirmation.",
    transcript: [
      {
        speaker: "Caller",
        message: "I’m due for a follow-up and would prefer a morning slot.",
      },
      {
        speaker: "AI Agent",
        message:
          "Thursday at 9:00 AM is available. Would you like me to reserve it?",
      },
    ],
  },
  {
    id: "call-007",
    caller: "Olivia Martin",
    initials: "OM",
    phone: "+1 (555) 010-0184",
    date: "May 16, 2026",
    time: "3:17 PM",
    duration: "3m 55s",
    handler: "AI Agent",
    intent: "Preparation guidance",
    outcome: "Question answered",
    status: "Completed",
    summary:
      "Olivia asked how to prepare for her upcoming consultation and received the approved preparation checklist.",
    recommendation:
      "Include the preparation checklist again in the appointment reminder.",
    transcript: [
      {
        speaker: "Caller",
        message: "Is there anything I should bring to tomorrow’s consultation?",
      },
      {
        speaker: "AI Agent",
        message:
          "Please bring your identification and any relevant prior records.",
      },
    ],
  },
  {
    id: "call-008",
    caller: "David Lee",
    initials: "DL",
    phone: "+1 (555) 010-0127",
    date: "May 16, 2026",
    time: "9:44 AM",
    duration: "7m 28s",
    handler: "Human Agent",
    intent: "Urgent service request",
    outcome: "Escalated to staff",
    status: "Escalated",
    summary:
      "David described an urgent service issue. The AI agent identified the escalation criteria and routed him to the on-duty staff member.",
    recommendation:
      "Confirm that the staff callback was completed and document the resolution.",
    transcript: [
      {
        speaker: "Caller",
        message: "I need to speak with someone about an urgent issue today.",
      },
      {
        speaker: "AI Agent",
        message:
          "I understand. I’m connecting you with the on-duty staff member now.",
      },
    ],
  },
];
