// SPRINT 2 STATUS DATA - Auto-extracted from JIRA
// Generated: December 29, 2025 at 8:30 PM MT
// Source: DeepSee Collective Board > Active Sprints
// Sprint: 2025-S2 (Holiday Sprint)
// Note: 55% capacity due to holidays

export interface SprintTicket {
  id: string;
  summary: string;
  assignee: string | null;
  points: number | null;
  dueDate?: string | null;
  priority?: string;
  status?: string;
}

export interface SecurityTicket {
  id: string;
  summary: string;
  vulnerabilities: number | null;
  status: 'DONE' | 'IN_PROGRESS' | 'TO_DO';
  assignee: string;
  build?: 'PASSING' | 'FAILING';
  notes: string;
}

export interface EngineerWorkload {
  name: string;
  total: number;
  toDo: number;
  inProgress: number;
  codeReview: number;
  inTesting: number;
  blocked: number;
  done: number;
  storyPoints: number | null;
  isAlert?: boolean;
}

export interface SprintRisk {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  item: string;
  description: string;
  owner: string;
  action?: string;
}

export interface SprintWin {
  title: string;
  description: string;
  tickets: string[];
  impact: string;
}

export interface StatusBreakdownItem {
  count: number;
  percent: number;
}

export interface BlockedTicket {
  key: string;
  summary: string;
  assignee: string;
  daysBlocked: number;
  reporter: string;
  blockedSince: string;
  critical?: boolean;
}

export interface CodeReviewTicket {
  key: string;
  summary: string;
  assignee: string;
  daysInReview: number;
  reporter: string;
  isOverdue?: boolean;
}

export interface ClientTicket {
  name: string;
  arr: string;
  total: number;
  done: number;
  inProgress: number;
  toDo: number;
  blocked: number;
  status: 'green' | 'yellow' | 'red' | 'gray';
  note?: string;
}

export interface CompletedTicket {
  key: string;
  summary: string;
  assignee: string;
  project?: string;
}

export interface InProgressAtRiskTicket {
  key: string;
  summary: string;
  assignee: string;
}

export interface ComparisonData {
  baseline: {
    date: string;
    total: number;
    done: number;
    donePercent: number;
    inProgress: number;
    codeReview: number;
    blocked: number;
    unassigned: number;
  };
  current: {
    date: string;
    total: number;
    done: number;
    donePercent: number;
    inProgress: number;
    codeReview: number;
    blocked: number;
    unassigned: number;
  };
  delta: {
    total: string;
    done: string;
    donePercent: string;
    inProgress: string;
    codeReview: string;
    blocked: string;
    unassigned: string;
  };
}

export interface AlertBanner {
  type: 'critical' | 'warning' | 'info';
  color: string;
  title: string;
  message: string;
  tickets?: string[];
  count?: number;
  engineer?: string;
}

export interface SprintHealth {
  status: 'CRITICAL' | 'MODERATE' | 'GOOD';
  color: string;
  summary: string;
  metrics: {
    completionRate: string;
    trend: string;
    dailyVelocity: string;
    ticketsNeededFor50: number;
    estimatedCarryover: string;
  };
  recommendations: string[];
}

export const SPRINT_2_DATA = {
  sprint: {
    name: "2025-S2",
    displayName: "2025-S2 (Holiday Sprint)",
    goal: "Maintain operations during holiday period, complete security Wave 2, and continue client deliverables with reduced capacity.",
    startDate: "2025-12-19",
    endDate: "2026-01-02",
    dataExtracted: "2025-12-29T20:30:00-07:00",
    sprintDay: 11,
    daysRemaining: 3,
    totalDays: 14,
    capacity: "55%",
    capacityNote: "Holiday Sprint - Reduced Capacity",
    totalTickets: 73,
    health: "YELLOW" as "GREEN" | "YELLOW" | "RED",
    healthReasons: [
      "3 blocked tickets (42+ and 47+ days) - CRITICAL",
      "23 unassigned tickets (exceeds 10 threshold)",
      "8 items in progress with only 3 days left",
      "41% completion at Day 11 (good progress but significant work remains)"
    ],
    healthPositives: [
      "+10 tickets done since Dec 23 (+12% completion)",
      "Security wave 68.8% complete (11/16)",
      "Ivan Peev top performer (4 tickets completed)",
      "Code review queue cleared from 5 to 3"
    ]
  },

  projectBreakdown: {
    BACK: 33,
    UI: 18,
    SC: 16,
    CI: 5,
    FB: 1,
    PR: 0
  },

  statusBreakdown: {
    done: { count: 30, percent: 41.1 } as StatusBreakdownItem,
    toDo: { count: 27, percent: 37.0 } as StatusBreakdownItem,
    inProgress: { count: 8, percent: 11.0 } as StatusBreakdownItem,
    codeReview: { count: 3, percent: 4.1 } as StatusBreakdownItem,
    inTesting: { count: 1, percent: 1.4 } as StatusBreakdownItem,
    blocked: { count: 3, percent: 4.1 } as StatusBreakdownItem,
    cancelled: { count: 1, percent: 1.4 } as StatusBreakdownItem
  },

  storyPoints: {
    total: 64,
    completed: 35,
    remaining: 29,
    completionPercent: 55,
    note: "55% by points vs 41% by tickets - larger items completing first"
  },

  blockedAlert: {
    show: true,
    severity: "critical" as const,
    title: "3 BLOCKED TICKETS - CRITICAL",
    tickets: [
      {
        key: "CI-898",
        summary: "Upgrade JPM RDS version",
        assignee: "Chad Hegerhorst",
        daysBlocked: 42,
        reporter: "Jeff Hegerhorst",
        blockedSince: "2025-11-17",
        critical: true
      },
      {
        key: "BACK-1489",
        summary: "Update classification-api Base Image to Ubuntu 24.04 LTS",
        assignee: "Unassigned",
        daysBlocked: 47,
        reporter: "Konnor Willison",
        blockedSince: "2025-11-12",
        critical: true
      },
      {
        key: "UI-721",
        summary: "DeepRecon - Make Subcategory Models' predictions...",
        assignee: "Unassigned",
        daysBlocked: 1,
        reporter: "Nadiya Omelchuk",
        blockedSince: "2025-12-28",
        critical: false
      }
    ] as BlockedTicket[]
  },

  codeReviewAlert: {
    show: true,
    severity: "warning" as const,
    title: "CODE REVIEW: 3 tickets in queue",
    tickets: [
      {
        key: "UI-724",
        summary: "Deep Recon - Allow downloading more than 1000...",
        assignee: "Matthew Snow",
        daysInReview: 2,
        reporter: "Nadiya Omelchuk"
      },
      {
        key: "BACK-1612",
        summary: "Age Distribution API",
        assignee: "Ivan Peev",
        daysInReview: 1,
        reporter: "Lane Terry"
      },
      {
        key: "BACK-811",
        summary: "Output processing fails for large work items",
        assignee: "Kannal Mutharasu",
        daysInReview: 3,
        reporter: "Darius Ouderkirk"
      }
    ] as CodeReviewTicket[]
  },

  unassignedAlert: {
    show: true,
    severity: "warning" as const,
    title: "23 UNASSIGNED TICKETS",
    count: 23,
    threshold: 10,
    note: "Assign or defer to S3 before sprint close."
  },

  engineers: [
    { name: "Ivan Peev", total: 10, toDo: 3, inProgress: 2, codeReview: 1, inTesting: 0, blocked: 0, done: 4, storyPoints: null },
    { name: "Jeff Hegerhorst", total: 8, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 7, storyPoints: null },
    { name: "Chad Hegerhorst", total: 5, toDo: 1, inProgress: 0, codeReview: 0, inTesting: 0, blocked: 1, done: 3, storyPoints: null },
    { name: "Kannal Mutharasu", total: 5, toDo: 2, inProgress: 0, codeReview: 1, inTesting: 0, blocked: 0, done: 2, storyPoints: null },
    { name: "Owen Riley", total: 4, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 2, storyPoints: null },
    { name: "Aleksander Winski", total: 4, toDo: 2, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 1, storyPoints: null },
    { name: "Konnor Willison", total: 4, toDo: 3, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "Kalvin Willison", total: 3, toDo: 2, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "Darius Ouderkirk", total: 3, toDo: 2, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "Matthew Snow", total: 2, toDo: 1, inProgress: 0, codeReview: 1, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "Treven Trujillo", total: 1, toDo: 1, inProgress: 0, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "Lane Terry", total: 1, toDo: 1, inProgress: 0, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null },
    { name: "UNASSIGNED", total: 23, toDo: 20, inProgress: 1, codeReview: 1, inTesting: 0, blocked: 0, done: 1, storyPoints: null, isAlert: true }
  ] as EngineerWorkload[],

  clients: [
    { name: "Accenture/HERA", arr: "$1.2M", total: 6, done: 0, inProgress: 2, toDo: 3, blocked: 1, status: "yellow" as const },
    { name: "Colony Bank", arr: "$200K", total: 2, done: 0, inProgress: 0, toDo: 2, blocked: 0, status: "yellow" as const },
    { name: "DTCC", arr: "$750K", total: 2, done: 0, inProgress: 0, toDo: 2, blocked: 0, status: "yellow" as const },
    { name: "Sunwest", arr: "$150K", total: 1, done: 0, inProgress: 1, toDo: 0, blocked: 0, status: "green" as const },
    { name: "BBVA", arr: "$100K", total: 1, done: 0, inProgress: 0, toDo: 1, blocked: 0, status: "yellow" as const },
    { name: "Broadridge", arr: "$500K", total: 0, done: 0, inProgress: 0, toDo: 0, blocked: 0, status: "gray" as const, note: "No tickets in S2" }
  ] as ClientTicket[],

  completedSinceStart: {
    count: 30,
    tickets: [
      { key: "UI-729", summary: "Deep Pilot - Add a new stencil to return the value", assignee: "Owen Riley", project: "UI" },
      { key: "UI-725", summary: "New Stencil - Subgroup Check Term Presens", assignee: "Owen Riley", project: "UI" },
      { key: "CI-911", summary: "Restrict allowed ip addresses for aws load balancer", assignee: "Chad Hegerhorst", project: "CI" },
      { key: "CI-901", summary: "AWS Cloudtrail - Cost Savings", assignee: "Chad Hegerhorst", project: "CI" },
      { key: "BACK-1611", summary: "Add With Priority Functionality to Counterparty", assignee: "Ivan Peev", project: "BACK" },
      { key: "BACK-1610", summary: "Counterparties Across Time API", assignee: "Ivan Peev", project: "BACK" },
      { key: "BACK-1605", summary: "Add Manual Intervention Required Filter", assignee: "Ivan Peev", project: "BACK" },
      { key: "BACK-1581", summary: "Message Breakout Chart API", assignee: "Ivan Peev", project: "BACK" },
      { key: "BACK-1572", summary: "Manual tasks have to be pushed back to allegro", assignee: "Kannal Mutharasu", project: "BACK" },
      { key: "BACK-839", summary: "Allow Event Status to be Updated via API", assignee: "Aleksander Winski", project: "BACK" }
    ] as CompletedTicket[]
  },

  completedSinceDec23: [
    { key: "UI-729", summary: "Deep Pilot - Add a new stencil to return the value", assignee: "Owen Riley", project: "UI" },
    { key: "UI-725", summary: "New Stencil - Subgroup Check Term Presens", assignee: "Owen Riley", project: "UI" },
    { key: "CI-911", summary: "Restrict allowed ip addresses for aws load balancer", assignee: "Chad Hegerhorst", project: "CI" },
    { key: "CI-901", summary: "AWS Cloudtrail - Cost Savings", assignee: "Chad Hegerhorst", project: "CI" },
    { key: "BACK-1611", summary: "Add With Priority Functionality to Counterparty", assignee: "Ivan Peev", project: "BACK" },
    { key: "BACK-1610", summary: "Counterparties Across Time API", assignee: "Ivan Peev", project: "BACK" },
    { key: "BACK-1605", summary: "Add Manual Intervention Required Filter", assignee: "Ivan Peev", project: "BACK" },
    { key: "BACK-1581", summary: "Message Breakout Chart API", assignee: "Ivan Peev", project: "BACK" },
    { key: "BACK-1572", summary: "Manual tasks have to be pushed back to allegro", assignee: "Kannal Mutharasu", project: "BACK" },
    { key: "BACK-839", summary: "Allow Event Status to be Updated via API", assignee: "Aleksander Winski", project: "BACK" }
  ] as CompletedTicket[],

  inProgressAtRisk: [
    { key: "UI-700", summary: "Identify the top five senders to a Project", assignee: "Owen Riley" },
    { key: "SC-298", summary: "Fix Remaining Application-Level Dependencies", assignee: "Unassigned" },
    { key: "CI-436", summary: "Port over the inference pipeline to argo workflows", assignee: "Jeff Hegerhorst" },
    { key: "BACK-1645", summary: "Feedback: Mercury Extraction for HMDA", assignee: "Kalvin Willison" },
    { key: "BACK-1640", summary: "Inbox Statistics API", assignee: "Ivan Peev" },
    { key: "BACK-1602", summary: "Evaluate GPT-5 Responses API + Structured", assignee: "Darius Ouderkirk" },
    { key: "BACK-1582", summary: "Deep Recon - make term predictions", assignee: "Aleksander Winski" },
    { key: "BACK-1532", summary: "Fine-tune Mercury Extraction for Sunwest", assignee: "Konnor Willison" }
  ] as InProgressAtRiskTicket[],

  security: {
    total: 16,
    done: 11,
    inProgress: 0,
    toDo: 5,
    completionRate: 68.8,
    waveStatus: "Wave 2 - 68.8% complete",
    lead: "Jeff Hegerhorst",
    tickets: [
      { id: "SC-325", summary: "Address application level vulnerabilities", status: "DONE" as const, assignee: "Kannal Mutharasu", vulnerabilities: null, notes: "Completed" },
      { id: "SC-314", summary: "Verify promethia-api (0 C+H - Baseline)", status: "TO_DO" as const, assignee: "Unassigned", vulnerabilities: 0, notes: "Wave 2" },
      { id: "SC-313", summary: "Address embeddings Vulnerabilities (1 C+H)", status: "TO_DO" as const, assignee: "Unassigned", vulnerabilities: 1, notes: "Wave 2" },
      { id: "SC-312", summary: "Address preprocessor Vulnerabilities (2 C+H)", status: "TO_DO" as const, assignee: "Unassigned", vulnerabilities: 2, notes: "Wave 2" },
      { id: "SC-311", summary: "Address Istio Proxy Vulnerabilities (5 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 5, notes: "Completed" },
      { id: "SC-310", summary: "Address deepview-status-service Vulnerabilities", status: "TO_DO" as const, assignee: "Unassigned", vulnerabilities: null, notes: "Wave 2" },
      { id: "SC-309", summary: "Address Argo Workflow Controller Vulnerabilities", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: null, notes: "Completed" },
      { id: "SC-308", summary: "Address Argo CLI Vulnerabilities (9 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 9, notes: "Completed" },
      { id: "SC-307", summary: "Address core-service Vulnerabilities (16 C+H)", status: "TO_DO" as const, assignee: "Unassigned", vulnerabilities: 16, notes: "Wave 2" },
      { id: "SC-306", summary: "Address Argo Events Vulnerabilities (22 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 22, notes: "Completed" },
      { id: "SC-305", summary: "Address NATS Vulnerabilities (26 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 26, notes: "Completed" },
      { id: "SC-304", summary: "Address Kafka Vulnerabilities (60 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 60, notes: "Completed" },
      { id: "SC-303", summary: "Address mlrig-box-to-tokens Vulnerabilities (80 C+H)", status: "DONE" as const, assignee: "Chad Hegerhorst", vulnerabilities: 80, notes: "Completed" },
      { id: "SC-302", summary: "Address PostgreSQL Vulnerabilities (158 C+H)", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: 158, notes: "Completed" },
      { id: "SC-299", summary: "Priority: Address vulnerabilities", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: null, notes: "Completed" },
      { id: "SC-298", summary: "Fix Remaining Application-Level Dependencies", status: "DONE" as const, assignee: "Jeff Hegerhorst", vulnerabilities: null, notes: "Completed" }
    ] as SecurityTicket[]
  },

  comparison: {
    baseline: {
      date: "2025-12-23",
      total: 69,
      done: 20,
      donePercent: 29,
      inProgress: 9,
      codeReview: 5,
      blocked: 2,
      unassigned: 21
    },
    current: {
      date: "2025-12-29",
      total: 73,
      done: 30,
      donePercent: 41,
      inProgress: 8,
      codeReview: 3,
      blocked: 3,
      unassigned: 23
    },
    delta: {
      total: "+4",
      done: "+10",
      donePercent: "+12%",
      inProgress: "-1",
      codeReview: "-2",
      blocked: "+1",
      unassigned: "+2"
    }
  } as ComparisonData,

  alertBanners: [
    {
      type: "critical" as const,
      color: "red",
      title: "Blocked > 7 Days",
      message: "CI-898 (42 days), BACK-1489 (47 days) - Address blockers or move to S3",
      tickets: ["CI-898", "BACK-1489"]
    },
    {
      type: "warning" as const,
      color: "yellow",
      title: "In Progress at Risk",
      message: "8 items in progress with only 3 days left - Prioritize for completion",
      count: 8
    },
    {
      type: "warning" as const,
      color: "yellow",
      title: "Unassigned Tickets",
      message: "23 tickets unassigned - Assign or defer to S3",
      count: 23
    },
    {
      type: "info" as const,
      color: "green",
      title: "Top Performer",
      message: "Ivan Peev - 4 tickets completed since Dec 23",
      engineer: "Ivan Peev"
    }
  ] as AlertBanner[],

  sprintHealth: {
    status: "MODERATE" as const,
    color: "yellow",
    summary: "Good progress (+12% completion) but significant work remains with only 3 days left",
    metrics: {
      completionRate: "41.1%",
      trend: "+12% from Dec 23",
      dailyVelocity: "1.67 tickets/day",
      ticketsNeededFor50: 7,
      estimatedCarryover: "~30 tickets"
    },
    recommendations: [
      "Unblock CI-898 and BACK-1489 or move to S3",
      "Assign the 23 unassigned tickets or defer",
      "Priority focus on 8 In Progress items",
      "Clear 3 items in Code Review",
      "Triage To Do items - move non-essential to S3"
    ]
  } as SprintHealth,

  sprintCloseReadiness: {
    likelyToComplete: [
      "3 Code Review tickets (quick reviews)",
      "8 In Progress items (if focused)",
      "Low complexity To Do items"
    ],
    achievable: "50%+ completion",
    atRisk: [
      "27 To Do tickets",
      "3 Blocked tickets",
      "23 Unassigned items"
    ],
    expectedCarryover: "~30 tickets",
    finalActions: [
      { priority: 1, action: "Unblock CI-898 and BACK-1489", color: "red" },
      { priority: 2, action: "Assign or defer 23 unassigned", color: "yellow" },
      { priority: 3, action: "Focus on 8 In Progress items", color: "blue" },
      { priority: 4, action: "Clear Code Review queue", color: "purple" }
    ]
  },

  risks: [
    {
      severity: "HIGH" as const,
      item: "3 Blocked Tickets (42+ days)",
      description: "CI-898 (42 days), BACK-1489 (47 days), and new UI-721. Critical priority.",
      owner: "Chad Hegerhorst / UNASSIGNED",
      action: "Escalate to leadership or move to S3"
    },
    {
      severity: "MEDIUM" as const,
      item: "23 Unassigned Tickets",
      description: "Exceeds 10-ticket threshold. Assign or defer to Sprint 3.",
      owner: "Brandon Baguley",
      action: "Assign or move to Sprint 3"
    },
    {
      severity: "MEDIUM" as const,
      item: "8 In Progress Items at Risk",
      description: "Only 3 days remaining to complete 8 in-progress items.",
      owner: "Team Leads",
      action: "Focus and prioritize completion"
    },
    {
      severity: "LOW" as const,
      item: "Code Review Queue (3 tickets)",
      description: "BACK-811 at 3 days. Clear quickly.",
      owner: "Team Leads",
      action: "Priority reviews"
    }
  ] as SprintRisk[],

  wins: [
    {
      title: "+10 Tickets Completed",
      description: "Strong progress since Dec 23: 20 → 30 done (+12% completion)",
      tickets: [],
      impact: "Sprint momentum"
    },
    {
      title: "Security Wave 2 Progress",
      description: "68.8% security tickets complete (11/16). Jeff driving efficiency.",
      tickets: [],
      impact: "$500K ARR (Broadridge)"
    },
    {
      title: "Code Review Queue Cleared",
      description: "Reduced from 5 tickets to 3 since Dec 23",
      tickets: [],
      impact: "Faster throughput"
    },
    {
      title: "Top Performer: Ivan Peev",
      description: "4 tickets completed since Dec 23, leading the team",
      tickets: [],
      impact: "Team leadership"
    }
  ] as SprintWin[]
};

// Helper functions
export function getSprintProgress() {
  const data = SPRINT_2_DATA.sprint;
  return {
    percentComplete: Math.round((SPRINT_2_DATA.statusBreakdown.done.count / data.totalTickets) * 100),
    daysRemaining: data.daysRemaining,
    totalDays: data.totalDays,
    daysElapsed: data.sprintDay
  };
}

export function getHealthStatus() {
  return {
    status: SPRINT_2_DATA.sprint.health,
    reasons: SPRINT_2_DATA.sprint.healthReasons,
    positives: SPRINT_2_DATA.sprint.healthPositives
  };
}

export function getBlockedTicketsCount() {
  return SPRINT_2_DATA.blockedAlert.tickets.length;
}

export function getUnassignedCount() {
  return SPRINT_2_DATA.unassignedAlert.count;
}

export function formatDataTimestamp() {
  const date = new Date(SPRINT_2_DATA.sprint.dataExtracted);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Denver'
  }) + ' MT';
}

export function getComparisonSummary() {
  const { comparison } = SPRINT_2_DATA;
  return {
    ticketsCompleted: comparison.current.done - comparison.baseline.done,
    completionIncrease: comparison.current.donePercent - comparison.baseline.donePercent,
    baselineDate: comparison.baseline.date,
    currentDate: comparison.current.date
  };
}

export function getSprintCloseReadiness() {
  return SPRINT_2_DATA.sprintCloseReadiness;
}
