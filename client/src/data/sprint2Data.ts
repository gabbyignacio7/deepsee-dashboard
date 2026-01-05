// SPRINT DATA - Auto-extracted from JIRA
// Generated: January 5, 2026 at 1:30 AM MT
// Source: DeepSee Collective Board > Active Sprints
// Sprint: 2026-S1
// Goal: Complete S2 carryover, stabilize Mercury Extraction for Colony/Sunwest production, and deliver BBVA term type extraction

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
  activeWork?: string;
  alert?: string;
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
  notes?: string;
}

export interface CodeReviewTicket {
  key: string;
  summary: string;
  assignee: string;
  daysInReview: number;
  reporter: string;
  isOverdue?: boolean;
  project?: string;
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
  completedDate?: string;
}

export interface InProgressTicket {
  key: string;
  summary: string;
  assignee: string;
  type?: string;
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
  type: 'critical' | 'warning' | 'info' | 'success';
  color: string;
  title: string;
  message: string;
  tickets?: string[];
  count?: number;
  engineer?: string;
  severity?: string;
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
    name: "2026-S1",
    displayName: "2026-S1",
    goal: "Complete S2 carryover, stabilize Mercury Extraction for Colony/Sunwest production, and deliver BBVA term type extraction",
    startDate: "2026-01-02",
    endDate: "2026-01-16",
    dataExtracted: "2026-01-05T01:30:00-07:00",
    sprintDay: 3,
    daysRemaining: 11,
    totalDays: 14,
    percentThroughSprint: 21,
    capacity: "100%",
    capacityNote: "Full capacity sprint",
    totalTickets: 58,
    health: "YELLOW" as "GREEN" | "YELLOW" | "RED",
    healthReasons: [
      "4 blocked tickets need attention",
      "Code Review bottleneck - Owen Riley has 5 tickets in queue",
      "All 17 PRD tickets (89 pts) still in To Do status",
      "16 unassigned tickets need owners"
    ],
    healthPositives: [
      "Sprint just started (Day 3) - low completion expected",
      "Strong in-progress workload (11 tickets active)",
      "Security project clear (0 open tickets)",
      "2 tickets completed in first 3 days"
    ]
  },

  projectBreakdown: {
    BACK: 28,
    UI: 19,
    CI: 5,
    FB: 4,
    SC: 0,
    PR: 2
  },

  statusBreakdown: {
    done: { count: 2, percent: 3.4 } as StatusBreakdownItem,
    toDo: { count: 34, percent: 58.6 } as StatusBreakdownItem,
    inProgress: { count: 11, percent: 19.0 } as StatusBreakdownItem,
    codeReview: { count: 6, percent: 10.3 } as StatusBreakdownItem,
    inTesting: { count: 0, percent: 0 } as StatusBreakdownItem,
    blocked: { count: 4, percent: 6.9 } as StatusBreakdownItem,
    cancelled: { count: 1, percent: 1.7 } as StatusBreakdownItem
  },

  storyPoints: {
    total: 89,
    completed: 0,
    remaining: 89,
    completionPercent: 0,
    note: "PRD tickets (Mercury 24 + Parser 31 + BluePrint 34) = 89 pts - NOT STARTED"
  },

  inProgressTickets: [
    { key: "UI-733", summary: "[SPIKE] Research cursor rules for one repeatable flow", assignee: "Matthew Snow", type: "Spike", project: "UI" },
    { key: "FB-2407", summary: "Update ml-workflows Base Image to Ubuntu 24.04", assignee: "Aleksander Winski", type: "Story", project: "FB" },
    { key: "BACK-1666", summary: "[BE] trigger automations for emails pushed to CRM", assignee: "Aleksander Winski", type: "Story", project: "BACK" },
    { key: "CI-899", summary: "Clean up old training datasets", assignee: "Chad Hegerhorst", type: "Task", project: "CI" },
    { key: "CI-436", summary: "Port over the inference pipeline to argo workflows", assignee: "Jeff Hegerhorst", type: "Story", project: "CI" },
    { key: "BACK-1648", summary: "Deep Pilot - Some PDF Documents are incorrectly parsed", assignee: "Treven Trujillo", type: "Bug", project: "BACK" },
    { key: "BACK-1643", summary: "Fine-tune Mercury Extraction for CTC", assignee: "Kalvin Willison", type: "Story", project: "BACK" },
    { key: "BACK-1606", summary: "Add Non-Project Scoped Statistics Endpoints", assignee: "Ivan Peev", type: "Story", project: "BACK" },
    { key: "BACK-1602", summary: "Evaluate GPT-5 Responses API + Structured Outputs", assignee: "Darius Ouderkirk", type: "Story", project: "BACK" },
    { key: "BACK-1532", summary: "Fine-tune Mercury Extraction for Sunwest Bank", assignee: "Konnor Willison", type: "Story", project: "BACK" },
    { key: "BACK-1402", summary: "Deep Pilot - Re-enable .zip reprocessing", assignee: "Kannal Mutharasu", type: "Story", project: "BACK" }
  ] as InProgressTicket[],

  blockedAlert: {
    show: true,
    severity: "warning" as const,
    title: "4 BLOCKED TICKETS",
    tickets: [
      {
        key: "UI-691",
        summary: "Deep Recon - Display Custom fields in Actionable Data",
        assignee: "Matthew Snow",
        daysBlocked: 0,
        reporter: "",
        blockedSince: "",
        critical: false,
        notes: ""
      },
      {
        key: "UI-718",
        summary: "DeepRecon - Display Mailbox ID in the UI",
        assignee: "Matthew Snow",
        daysBlocked: 0,
        reporter: "",
        blockedSince: "",
        critical: false,
        notes: ""
      },
      {
        key: "UI-719",
        summary: "DeepRecon - Add To column to Actionable Data Page",
        assignee: "Unassigned",
        daysBlocked: 0,
        reporter: "",
        blockedSince: "",
        critical: false,
        notes: "Needs owner"
      },
      {
        key: "BACK-1489",
        summary: "Update classification-api Base Image to Ubuntu 24.04",
        assignee: "Unassigned",
        daysBlocked: 0,
        reporter: "",
        blockedSince: "",
        critical: false,
        notes: "Part of SC-296"
      }
    ] as BlockedTicket[]
  },

  codeReviewAlert: {
    show: true,
    severity: "critical" as const,
    title: "CODE REVIEW BOTTLENECK: 6 tickets in queue",
    tickets: [
      {
        key: "UI-699",
        summary: "Update Overview > 'Message Volume Across Time'",
        assignee: "Owen Riley",
        daysInReview: 0,
        reporter: "",
        project: "UI"
      },
      {
        key: "UI-713",
        summary: "Update Overview > 'Message Volume Across Time'",
        assignee: "Owen Riley",
        daysInReview: 0,
        reporter: "",
        project: "UI"
      },
      {
        key: "UI-700",
        summary: "Identify the top five senders to a Project",
        assignee: "Owen Riley",
        daysInReview: 0,
        reporter: "",
        project: "UI"
      },
      {
        key: "UI-730",
        summary: "Allow using raw values in calculation logic",
        assignee: "Owen Riley",
        daysInReview: 0,
        reporter: "",
        project: "UI"
      },
      {
        key: "UI-731",
        summary: "Deep Recon - Auto-refresh Actionable Data page",
        assignee: "Owen Riley",
        daysInReview: 0,
        reporter: "",
        project: "UI"
      },
      {
        key: "CI-898",
        summary: "Upgrade JPM RDS version",
        assignee: "Chad Hegerhorst",
        daysInReview: 0,
        reporter: "",
        project: "CI"
      }
    ] as CodeReviewTicket[]
  },

  unassignedAlert: {
    show: true,
    severity: "warning" as const,
    title: "16 UNASSIGNED TICKETS",
    count: 16,
    threshold: 10,
    note: "Assign tickets before sprint progresses further."
  },

  engineers: [
    { name: "Konnor Willison", total: 3, toDo: 2, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "BACK-1532: Fine-tune Mercury Extraction for Sunwest Bank" },
    { name: "Kalvin Willison", total: 2, toDo: 1, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "BACK-1643: Fine-tune Mercury Extraction for CTC" },
    { name: "Ivan Peev", total: 2, toDo: 1, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "BACK-1606: Add Non-Project Scoped Statistics Endpoints" },
    { name: "Owen Riley", total: 5, toDo: 0, inProgress: 0, codeReview: 5, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "5 tickets in Code Review queue", alert: "Bottleneck risk - needs reviewer support" },
    { name: "Matthew Snow", total: 3, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 2, done: 0, storyPoints: null, activeWork: "UI-733: [SPIKE] Research cursor rules", alert: "2 tickets blocked" },
    { name: "Aleksander Winski", total: 2, toDo: 0, inProgress: 2, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "FB-2407, BACK-1666" },
    { name: "Chad Hegerhorst", total: 2, toDo: 0, inProgress: 1, codeReview: 1, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "CI-899: Clean up old training datasets" },
    { name: "Jeff Hegerhorst", total: 1, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "CI-436: Port inference pipeline to argo workflows" },
    { name: "Treven Trujillo", total: 1, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "BACK-1648: Deep Pilot PDF parsing bug" },
    { name: "Darius Ouderkirk", total: 2, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 1, storyPoints: null, activeWork: "BACK-1602: Evaluate GPT-5 Responses API" },
    { name: "Kannal Mutharasu", total: 2, toDo: 0, inProgress: 1, codeReview: 0, inTesting: 0, blocked: 0, done: 1, storyPoints: null, activeWork: "BACK-1402: Deep Pilot .zip reprocessing" },
    { name: "Gabriel Ignacio", total: 3, toDo: 3, inProgress: 0, codeReview: 0, inTesting: 0, blocked: 0, done: 0, storyPoints: null, activeWork: "PRD tickets (not yet started)" },
    { name: "UNASSIGNED", total: 16, toDo: 14, inProgress: 0, codeReview: 0, inTesting: 0, blocked: 2, done: 0, storyPoints: null, isAlert: true, alert: "16 tickets need owners" }
  ] as EngineerWorkload[],

  clients: [
    { name: "Colony Bank", arr: "$200K", total: 3, done: 0, inProgress: 1, toDo: 2, blocked: 0, status: "yellow" as const, note: "Mercury HMDA work" },
    { name: "Sunwest Bank", arr: "$150K", total: 2, done: 0, inProgress: 1, toDo: 1, blocked: 0, status: "yellow" as const, note: "Mercury fine-tuning" },
    { name: "BBVA", arr: "$100K", total: 1, done: 0, inProgress: 0, toDo: 1, blocked: 0, status: "yellow" as const, note: "Term type extraction" },
    { name: "Broadridge", arr: "$500K", total: 0, done: 0, inProgress: 0, toDo: 0, blocked: 0, status: "gray" as const, note: "No tickets in S1" }
  ] as ClientTicket[],

  completedSinceStart: {
    count: 2,
    tickets: [
      { key: "BACK-811", summary: "Output processing fails for large work items", assignee: "Kannal Mutharasu", project: "BACK", completedDate: "2026-01-04" },
      { key: "BACK-1647", summary: "Support Broadridge Data Cleanup", assignee: "Darius Ouderkirk", project: "BACK", completedDate: "2026-01-03" }
    ] as CompletedTicket[]
  },

  completedSinceDec23: [] as CompletedTicket[],

  inProgressAtRisk: [] as InProgressAtRiskTicket[],

  prdSummary: {
    mercury: {
      totalTickets: 6,
      totalPoints: 24,
      assigned: 4,
      unassigned: 2,
      status: "Not Started",
      tickets: ["BACK-1650", "BACK-1651", "BACK-1652", "BACK-1653", "BACK-1654", "BACK-1655"]
    },
    parser: {
      totalTickets: 6,
      totalPoints: 31,
      assigned: 1,
      unassigned: 5,
      status: "Not Started",
      tickets: ["BACK-1656", "BACK-1657", "BACK-1658", "BACK-1659", "BACK-1660", "BACK-1661"]
    },
    blueprint: {
      totalTickets: 5,
      totalPoints: 34,
      assigned: 2,
      unassigned: 3,
      status: "Not Started",
      tickets: ["BACK-1662", "BACK-1663", "BACK-1664", "BACK-1665", "UI-734"]
    },
    total: {
      tickets: 17,
      points: 89,
      alert: "All 17 PRD tickets not yet started - may impact sprint goals"
    }
  },

  longBlockedTickets: [
    { key: "FB-1493", project: "FB" },
    { key: "FB-1437", project: "FB" },
    { key: "FB-1442", project: "FB" },
    { key: "FB-2013", project: "FB" },
    { key: "FB-1803", project: "FB" },
    { key: "FB-2001", project: "FB" },
    { key: "SYSADMN-89", project: "SYSADMN" },
    { key: "UI-544", project: "UI" },
    { key: "CI-739", project: "CI" },
    { key: "UI-625", project: "UI" },
    { key: "UI-607", project: "UI" },
    { key: "FB-786", project: "FB" }
  ],

  security: {
    total: 0,
    done: 0,
    inProgress: 0,
    toDo: 0,
    completionRate: 100,
    waveStatus: "Security project is clear",
    lead: "",
    status: "clear",
    icon: "✅",
    message: "0 open security tickets",
    tickets: [] as SecurityTicket[]
  },

  comparison: {
    baseline: {
      date: "2026-01-02",
      total: 58,
      done: 0,
      donePercent: 0,
      inProgress: 0,
      codeReview: 0,
      blocked: 4,
      unassigned: 16
    },
    current: {
      date: "2026-01-05",
      total: 58,
      done: 2,
      donePercent: 3.4,
      inProgress: 11,
      codeReview: 6,
      blocked: 4,
      unassigned: 16
    },
    delta: {
      total: "0",
      done: "+2",
      donePercent: "+3.4%",
      inProgress: "+11",
      codeReview: "+6",
      blocked: "0",
      unassigned: "0"
    }
  } as ComparisonData,

  alertBanners: [
    {
      type: "warning" as const,
      color: "yellow",
      title: "Code Review Bottleneck",
      message: "Owen Riley has 5 tickets in Code Review queue - may need additional reviewer support",
      severity: "high"
    },
    {
      type: "warning" as const,
      color: "yellow",
      title: "PRD Work Not Started",
      message: "All 17 PRD feature tickets (89 pts) still in To Do status - Mercury, Parser, BluePrint",
      severity: "medium"
    },
    {
      type: "info" as const,
      color: "blue",
      title: "Sprint Progress",
      message: "Day 3 of 14 (21%) - 3.4% completion rate (2 tickets done)",
      severity: "low"
    },
    {
      type: "success" as const,
      color: "green",
      title: "Security Clear",
      message: "0 open security tickets",
      severity: "low"
    }
  ] as AlertBanner[],

  sprintHealth: {
    status: "MODERATE" as const,
    color: "yellow",
    summary: "Sprint just started (Day 3) - good in-progress workload but code review bottleneck emerging",
    metrics: {
      completionRate: "3.4%",
      trend: "Day 3 of 14",
      dailyVelocity: "0.67 tickets/day",
      ticketsNeededFor50: 27,
      estimatedCarryover: "TBD - early in sprint"
    },
    recommendations: [
      "Address code review bottleneck - Owen Riley has 5 tickets",
      "Unblock 4 blocked tickets (UI-691, UI-718, UI-719, BACK-1489)",
      "Start PRD feature work (Mercury, Parser, BluePrint)",
      "Assign 16 unassigned tickets"
    ]
  } as SprintHealth,

  sprintCloseReadiness: {
    likelyToComplete: [
      "11 In Progress tickets (if focused)",
      "6 Code Review tickets (if reviewed)",
      "Low complexity To Do items"
    ],
    achievable: "TBD - early in sprint",
    atRisk: [
      "34 To Do tickets",
      "4 Blocked tickets",
      "16 Unassigned items",
      "17 PRD tickets not started"
    ],
    expectedCarryover: "TBD",
    finalActions: [
      { priority: 1, action: "Clear code review queue - Owen has 5 tickets", color: "purple" },
      { priority: 2, action: "Unblock 4 blocked tickets", color: "red" },
      { priority: 3, action: "Start PRD feature work", color: "blue" },
      { priority: 4, action: "Assign 16 unassigned tickets", color: "yellow" }
    ]
  },

  risks: [
    {
      severity: "HIGH" as const,
      item: "Code Review Bottleneck",
      description: "Owen Riley has 5 tickets pending review - may need additional reviewer support",
      owner: "Engineering leads",
      action: "Assign additional reviewers"
    },
    {
      severity: "HIGH" as const,
      item: "4 Blocked Tickets",
      description: "UI-691, UI-718, UI-719, BACK-1489 need attention",
      owner: "Team leads",
      action: "Resolve blockers"
    },
    {
      severity: "MEDIUM" as const,
      item: "PRD Tickets Not Started",
      description: "All 17 PRD tickets (89 story points) are still in To Do - Mercury, Parser, BluePrint",
      owner: "Product/Engineering",
      action: "Prioritize and start work"
    },
    {
      severity: "MEDIUM" as const,
      item: "16 Unassigned Tickets",
      description: "Unassigned blocked tickets (UI-719, BACK-1489) need owners",
      owner: "Brandon/Team leads",
      action: "Assign or defer"
    },
    {
      severity: "LOW" as const,
      item: "12 Long-Blocked Tickets (>14 days)",
      description: "12 tickets blocked >14 days across organization (mostly FB project)",
      owner: "Project leads",
      action: "Cleanup or close"
    }
  ] as SprintRisk[],

  wins: [
    {
      title: "Sprint Kicked Off",
      description: "2026-S1 started with clear goals - Mercury Extraction for Colony/Sunwest production",
      tickets: [],
      impact: "Sprint momentum"
    },
    {
      title: "Security Clear",
      description: "0 open security tickets - project is clear",
      tickets: [],
      impact: "No security debt"
    },
    {
      title: "Strong In-Progress Workload",
      description: "11 tickets actively in progress across the team",
      tickets: [],
      impact: "Team momentum"
    },
    {
      title: "First Completions",
      description: "2 tickets completed in first 3 days (BACK-811, BACK-1647)",
      tickets: ["BACK-811", "BACK-1647"],
      impact: "Early progress"
    }
  ] as SprintWin[],

  notes: [
    "Sprint just started (Day 3) - low completion rate expected",
    "Strong in-progress workload across team (11 tickets active)",
    "Heavy UI project presence in sprint (19 tickets)",
    "All PRD feature work not yet started - may impact sprint goals",
    "Code review queue growing - 6 tickets awaiting review"
  ]
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
