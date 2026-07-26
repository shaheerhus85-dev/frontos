export const knowledgeStatuses = [
  "Published",
  "Draft",
  "Needs Review",
  "Archived",
] as const;
export type KnowledgeStatus = (typeof knowledgeStatuses)[number];

export const knowledgeCategories = [
  "Services",
  "Pricing",
  "Policies",
  "FAQs",
  "Operations",
  "Scheduling",
] as const;
export type KnowledgeCategory = (typeof knowledgeCategories)[number];

export const freshnessStatuses = [
  "Current",
  "Review Soon",
  "Outdated",
] as const;
export type FreshnessStatus = (typeof freshnessStatuses)[number];

export type ReviewPriority = "High" | "Medium" | "Low";
export type KnowledgeSource = "Manual" | "Imported" | "AI Assisted";

export type KnowledgeActivity = Readonly<{
  id: string;
  title: string;
  detail: string;
  time: string;
}>;

export type KnowledgeArticle = Readonly<{
  id: string;
  title: string;
  slug: string;
  category: KnowledgeCategory;
  status: KnowledgeStatus;
  owner: string;
  source: KnowledgeSource;
  summary: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  lastReviewedAt: string;
  nextReviewAt: string;
  usageCount: number;
  successRate: number;
  linkedAgents: readonly string[];
  linkedChannels: readonly string[];
  tags: readonly string[];
  freshnessStatus: FreshnessStatus;
  reviewPriority: ReviewPriority;
  confidenceScore: number;
  relatedQuestions: readonly string[];
  strengths: readonly string[];
  missingInformation: readonly string[];
  reviewRisks: readonly string[];
  recommendedAction: string;
  recentActivity: readonly KnowledgeActivity[];
}>;

export type KnowledgeKpi = Readonly<{
  id: "total" | "published" | "review" | "coverage";
  label: string;
  value: string;
  supportingText: string;
  tone: "blue" | "mint" | "amber" | "violet";
}>;

export const knowledgeKpis: readonly KnowledgeKpi[] = [
  {
    id: "total",
    label: "Total Articles",
    value: "148",
    supportingText: "12 added this month",
    tone: "blue",
  },
  {
    id: "published",
    label: "Published",
    value: "126",
    supportingText: "85.1% of knowledge base",
    tone: "mint",
  },
  {
    id: "review",
    label: "Needs Review",
    value: "14",
    supportingText: "6 high-priority updates",
    tone: "amber",
  },
  {
    id: "coverage",
    label: "AI Coverage",
    value: "92.4%",
    supportingText: "4.8% improvement",
    tone: "violet",
  },
];

const common = {
  createdAt: "Jan 12, 2026",
  lastReviewedAt: "Jul 12, 2026",
  nextReviewAt: "Oct 12, 2026",
  linkedChannels: ["Web chat", "Phone"],
  strengths: [
    "Clear answer structure",
    "Aligned with current service workflow",
  ],
  missingInformation: ["Add an example for unusual customer requests"],
  reviewRisks: [
    "Operational changes could make part of this answer inaccurate",
  ],
  recentActivity: [
    {
      id: "a",
      title: "Article reviewed",
      detail: "Language and answer guidance were verified.",
      time: "2 days ago",
    },
    {
      id: "b",
      title: "Linked to AI agent",
      detail: "Coverage was expanded for a customer-facing workflow.",
      time: "1 week ago",
    },
  ],
} as const;

export const knowledgeArticles: readonly KnowledgeArticle[] = [
  {
    ...common,
    id: "service-consultation",
    title: "What to expect from your first consultation",
    slug: "first-consultation",
    category: "Services",
    status: "Published",
    owner: "Maya Chen",
    source: "Manual",
    summary: "Explains the consultation journey, preparation, and follow-up.",
    contentPreview:
      "A first consultation begins with a short needs assessment. The specialist reviews goals, relevant history, and the best available service options before recommending next steps. Customers should arrive ten minutes early and bring any requested records.",
    updatedAt: "Jul 22, 2026",
    usageCount: 1842,
    successRate: 97.8,
    linkedAgents: ["Front Desk Agent", "Customer Support Agent"],
    tags: ["consultation", "onboarding", "services"],
    freshnessStatus: "Current",
    reviewPriority: "Low",
    confidenceScore: 98,
    relatedQuestions: [
      "How long is the first consultation?",
      "What should I bring?",
    ],
    recommendedAction:
      "Keep the preparation checklist aligned with the intake team.",
  },
  {
    ...common,
    id: "service-plans",
    title: "Core service plans and inclusions",
    slug: "core-service-plans",
    category: "Services",
    status: "Published",
    owner: "Noah Williams",
    source: "AI Assisted",
    summary: "Compares the scope and intended use of the three core plans.",
    contentPreview:
      "Essential, Plus, and Complete plans support different service needs. Each includes an initial assessment and standard support, while higher tiers add priority scheduling and extended follow-up.",
    updatedAt: "Jul 20, 2026",
    usageCount: 1350,
    successRate: 95.1,
    linkedAgents: ["Lead Qualification Agent"],
    tags: ["plans", "services", "comparison"],
    freshnessStatus: "Current",
    reviewPriority: "Low",
    confidenceScore: 96,
    relatedQuestions: [
      "Which plan is right for me?",
      "Does every plan include follow-up?",
    ],
    recommendedAction: "Add the next approved plan comparison when available.",
  },
  {
    ...common,
    id: "pricing-overview",
    title: "2026 service pricing overview",
    slug: "2026-pricing-overview",
    category: "Pricing",
    status: "Needs Review",
    owner: "Priya Shah",
    source: "Imported",
    summary:
      "Lists baseline prices, package ranges, and approved quote guidance.",
    contentPreview:
      "Standard consultations begin at $95. Service packages vary by scope and duration; agents should provide the approved range and arrange a specialist follow-up for a final quote.",
    updatedAt: "May 18, 2026",
    usageCount: 2260,
    successRate: 86.4,
    linkedAgents: ["Front Desk Agent", "Lead Qualification Agent"],
    tags: ["pricing", "quotes", "packages"],
    freshnessStatus: "Outdated",
    reviewPriority: "High",
    confidenceScore: 78,
    relatedQuestions: [
      "How much does a consultation cost?",
      "Can I get an exact quote?",
    ],
    missingInformation: [
      "Latest seasonal package pricing",
      "Approved discount eligibility",
    ],
    reviewRisks: ["Two package prices changed after the last review"],
    recommendedAction:
      "Confirm current rates with Finance and publish the revised pricing table.",
    recentActivity: [
      {
        id: "p1",
        title: "Outdated answer flagged",
        detail: "An agent detected a mismatch in package pricing.",
        time: "Yesterday",
      },
      {
        id: "p2",
        title: "Pricing section updated",
        detail: "Consultation baseline was adjusted.",
        time: "May 18",
      },
    ],
  },
  {
    ...common,
    id: "payment-options",
    title: "Payment methods and installment options",
    slug: "payment-options",
    category: "Pricing",
    status: "Published",
    owner: "Priya Shah",
    source: "Manual",
    summary:
      "Covers accepted payments, deposits, receipts, and installment rules.",
    contentPreview:
      "Customers may pay by major card, bank transfer, or approved digital wallet. A deposit may be required for longer appointments. Installment options apply only to eligible service plans.",
    updatedAt: "Jul 10, 2026",
    usageCount: 1124,
    successRate: 94.7,
    linkedAgents: ["Customer Support Agent"],
    tags: ["payments", "deposit", "billing"],
    freshnessStatus: "Review Soon",
    reviewPriority: "Medium",
    confidenceScore: 93,
    relatedQuestions: [
      "Which cards do you accept?",
      "Can I pay in installments?",
    ],
    recommendedAction:
      "Verify installment thresholds during the August review.",
  },
  {
    ...common,
    id: "cancellation-policy",
    title: "Cancellation and rescheduling policy",
    slug: "cancellation-policy",
    category: "Policies",
    status: "Needs Review",
    owner: "Elena Brooks",
    source: "Manual",
    summary:
      "Defines notice periods, late cancellation charges, and exceptions.",
    contentPreview:
      "Appointments can be moved without charge when notice is provided at least 24 hours ahead. Late cancellations may incur a fee. Exceptional circumstances are reviewed by the service team.",
    updatedAt: "Jun 2, 2026",
    usageCount: 1988,
    successRate: 89.2,
    linkedAgents: ["Scheduling Agent", "Customer Support Agent"],
    tags: ["cancellation", "reschedule", "fees"],
    freshnessStatus: "Review Soon",
    reviewPriority: "High",
    confidenceScore: 84,
    relatedQuestions: [
      "Will I be charged if I cancel?",
      "How late can I reschedule?",
    ],
    missingInformation: ["Clarify same-day emergency exceptions"],
    reviewRisks: ["Exception language is open to interpretation"],
    recommendedAction: "Have Operations approve explicit exception examples.",
  },
  {
    ...common,
    id: "privacy-requests",
    title: "Handling customer privacy requests",
    slug: "privacy-requests",
    category: "Policies",
    status: "Published",
    owner: "Elena Brooks",
    source: "Manual",
    summary:
      "Gives agents a safe response and escalation path for privacy requests.",
    contentPreview:
      "Agents should acknowledge the request, avoid confirming sensitive account details, and route the conversation to the privacy owner. Identity verification occurs outside the AI conversation.",
    updatedAt: "Jul 19, 2026",
    usageCount: 438,
    successRate: 99.1,
    linkedAgents: ["Customer Support Agent", "Escalation Coordinator"],
    tags: ["privacy", "escalation", "data"],
    freshnessStatus: "Current",
    reviewPriority: "Low",
    confidenceScore: 99,
    relatedQuestions: [
      "Can you delete my information?",
      "What data do you store?",
    ],
    recommendedAction: "Retain the current escalation-first response.",
  },
  {
    ...common,
    id: "insurance-faq",
    title: "Insurance and reimbursement FAQ",
    slug: "insurance-reimbursement-faq",
    category: "FAQs",
    status: "Draft",
    owner: "Marcus Lee",
    source: "AI Assisted",
    summary:
      "Answers common questions about receipts and reimbursement documents.",
    contentPreview:
      "FrontOS can provide an itemized receipt after payment. Coverage and reimbursement depend on the customer’s provider, so agents must not guarantee eligibility or repayment.",
    updatedAt: "Jul 23, 2026",
    usageCount: 96,
    successRate: 81.5,
    linkedAgents: ["Customer Support Agent"],
    tags: ["insurance", "receipt", "reimbursement"],
    freshnessStatus: "Current",
    reviewPriority: "Medium",
    confidenceScore: 82,
    relatedQuestions: [
      "Do you accept insurance?",
      "Can I get an itemized receipt?",
    ],
    recommendedAction: "Complete compliance review before publishing.",
  },
  {
    ...common,
    id: "scheduling-faq",
    title: "Online scheduling FAQ",
    slug: "online-scheduling-faq",
    category: "Scheduling",
    status: "Needs Review",
    owner: "Sofia Martin",
    source: "Imported",
    summary:
      "Helps customers find availability, book, and change appointments.",
    contentPreview:
      "Online availability reflects the current booking calendar. If no suitable time appears, the Scheduling Agent can collect preferences and request a staff follow-up.",
    updatedAt: "Jun 14, 2026",
    usageCount: 2541,
    successRate: 83.8,
    linkedAgents: ["Scheduling Agent", "Front Desk Agent"],
    tags: ["booking", "availability", "online"],
    freshnessStatus: "Outdated",
    reviewPriority: "High",
    confidenceScore: 74,
    relatedQuestions: [
      "Why can’t I see next-week availability?",
      "Can you book for two people?",
    ],
    missingInformation: ["Group booking workflow", "New waitlist rules"],
    reviewRisks: ["Availability guidance predates the waitlist update"],
    recommendedAction:
      "Add waitlist guidance and validate group booking behavior.",
    recentActivity: [
      {
        id: "s1",
        title: "Outdated answer flagged",
        detail: "Waitlist guidance was missing from two answers.",
        time: "3 days ago",
      },
      {
        id: "s2",
        title: "Linked to Scheduling Agent",
        detail: "The scheduling workflow began using this article.",
        time: "Jun 14",
      },
    ],
  },
  {
    ...common,
    id: "appointment-prep",
    title: "Appointment preparation checklist",
    slug: "appointment-preparation",
    category: "Scheduling",
    status: "Published",
    owner: "Sofia Martin",
    source: "Manual",
    summary: "A concise checklist customers receive before an appointment.",
    contentPreview:
      "Customers should confirm their appointment, complete requested forms, bring relevant records, and arrive ten minutes early. Remote appointments require a stable connection and a private setting.",
    updatedAt: "Jul 16, 2026",
    usageCount: 1665,
    successRate: 98.2,
    linkedAgents: ["Scheduling Agent", "Follow-up Agent"],
    tags: ["appointment", "preparation", "checklist"],
    freshnessStatus: "Current",
    reviewPriority: "Low",
    confidenceScore: 98,
    relatedQuestions: [
      "What do I need to bring?",
      "How early should I arrive?",
    ],
    recommendedAction:
      "Keep the checklist synchronized with reminder messages.",
  },
  {
    ...common,
    id: "urgent-routing",
    title: "Urgent request routing guide",
    slug: "urgent-request-routing",
    category: "Operations",
    status: "Published",
    owner: "Jon Bell",
    source: "Manual",
    summary:
      "Defines signals that require immediate human review or escalation.",
    contentPreview:
      "When a customer describes an urgent safety concern, the agent should stop the routine workflow, show the approved safety message, and immediately alert the on-duty coordinator.",
    updatedAt: "Jul 24, 2026",
    usageCount: 382,
    successRate: 99.4,
    linkedAgents: ["Front Desk Agent", "Escalation Coordinator"],
    tags: ["urgent", "routing", "safety"],
    freshnessStatus: "Current",
    reviewPriority: "High",
    confidenceScore: 99,
    relatedQuestions: [
      "Can someone help me right now?",
      "Is this request urgent?",
    ],
    recommendedAction: "Run the scheduled monthly safety review.",
  },
  {
    ...common,
    id: "service-areas",
    title: "Service areas and travel boundaries",
    slug: "service-areas",
    category: "Operations",
    status: "Archived",
    owner: "Jon Bell",
    source: "Imported",
    summary: "Legacy service-area guidance retained for reference.",
    contentPreview:
      "This article reflects the former service boundary model and should not be used in live answers. Current coverage is determined by the operations team during intake.",
    updatedAt: "Mar 4, 2026",
    usageCount: 44,
    successRate: 68.0,
    linkedAgents: [],
    tags: ["locations", "travel", "legacy"],
    freshnessStatus: "Outdated",
    reviewPriority: "Low",
    confidenceScore: 61,
    relatedQuestions: ["Do you serve my area?"],
    missingInformation: ["Current operating boundaries"],
    reviewRisks: ["Legacy locations are no longer reliable"],
    recommendedAction:
      "Keep archived until the new coverage model is approved.",
  },
  {
    ...common,
    id: "follow-up-timing",
    title: "Post-service follow-up timing",
    slug: "post-service-follow-up",
    category: "FAQs",
    status: "Published",
    owner: "Marcus Lee",
    source: "AI Assisted",
    summary: "Explains when customers should expect follow-up communication.",
    contentPreview:
      "Most customers receive a follow-up within two business days. Complex requests may take longer, and the agent should set expectations without promising a precise completion time.",
    updatedAt: "Jul 8, 2026",
    usageCount: 908,
    successRate: 93.6,
    linkedAgents: ["Follow-up Agent", "Customer Support Agent"],
    tags: ["follow-up", "timing", "support"],
    freshnessStatus: "Review Soon",
    reviewPriority: "Medium",
    confidenceScore: 91,
    relatedQuestions: [
      "When will someone contact me?",
      "Why has follow-up taken longer?",
    ],
    recommendedAction:
      "Confirm the two-day target with the service team next month.",
  },
];

export const knowledgeCoverage = [
  { category: "Services", value: 98 },
  { category: "Pricing", value: 84 },
  { category: "Policies", value: 91 },
  { category: "FAQs", value: 88 },
  { category: "Operations", value: 94 },
  { category: "Scheduling", value: 89 },
] as const;

export const knowledgeAttention = [
  {
    title: "2026 service pricing overview",
    detail: "Pricing article is outdated",
    priority: "High",
  },
  {
    title: "Cancellation and rescheduling policy",
    detail: "Policy needs review",
    priority: "High",
  },
  {
    title: "Online scheduling FAQ",
    detail: "Scheduling FAQ has low confidence",
    priority: "Medium",
  },
] as const;
