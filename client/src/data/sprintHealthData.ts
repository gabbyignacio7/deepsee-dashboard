// Sprint Health Data - Updated March 2, 2026 at 9:24 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 3 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "12.9% (Day 3)", target: "21.4% expected", status: "red", detail: "12.9% complete vs 21.4% expected at Day 3. New sprint S5 started Feb 27." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "7 items (3 stale)", target: "GREEN <5", status: "red", detail: "7 items in CR, 3 stale (BACK-1299/1300/1311 Ivan Peev). Carryover from S4." },
  { metric: "Unassigned Tickets", s2Value: "30 of 66", target: "GREEN <5, RED >15", status: "red", detail: "45.5% of sprint unassigned -- new sprint, many tickets need assignment" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "9.1%", target: "60%", status: "red", detail: "ARTEMIS at 9.1% vs 60% target -- severely under-allocated. Must improve in S5." },
  { metric: "Engineer Capacity", s2Value: "~8.8 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 8.8 avg pts/engineer. Ivan 21pts highest." },
  { metric: "Stale Items", s2Value: "3 items", target: "GREEN 0", status: "yellow", detail: "3 stale CR: BACK-1299, BACK-1300, BACK-1311 (all Ivan Peev). Carryover from S4." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned. S5 just started Day 3." }
];

export type OverallHealth = "GREEN" | "YELLOW" | "RED";

export const overallHealth: OverallHealth = "RED";

// Get metrics by status
export function getMetricsByStatus(status: "green" | "yellow" | "red"): HealthMetric[] {
  return sprintHealth.filter(metric => metric.status === status);
}

// Calculate overall health based on metrics
export function calculateOverallHealth(): OverallHealth {
  const redCount = sprintHealth.filter(m => m.status === "red").length;
  const yellowCount = sprintHealth.filter(m => m.status === "yellow").length;

  if (redCount >= 3) return "RED";
  if (redCount >= 1 || yellowCount >= 3) return "YELLOW";
  return "GREEN";
}

// Get health summary
export function getHealthSummary(): { red: number; yellow: number; green: number } {
  return {
    red: sprintHealth.filter(m => m.status === "red").length,
    yellow: sprintHealth.filter(m => m.status === "yellow").length,
    green: sprintHealth.filter(m => m.status === "green").length
  };
}

// Get critical issues (red status)
export function getCriticalIssues(): HealthMetric[] {
  return sprintHealth.filter(metric => metric.status === "red");
}

// Sprint health recommendations - Updated March 2, 2026
export const healthRecommendations = [
  {
    issue: "30 UNASSIGNED TICKETS (45.5%)",
    recommendation: "New sprint S5 has 30 of 66 tickets unassigned (45.5%). Sprint planning session needed urgently.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 3 -- 12.9% vs 21.4%",
    recommendation: "S5 Day 3/14. 17/135 pts complete (12.9%). Slightly behind pace. 30 tickets still unassigned.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 9.1% vs 60% target",
    recommendation: "At 9.1% vs 60% target. Severely under-allocated. Carryover issue from S4 -- must address immediately.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-30 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-30 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "3 STALE CR ITEMS",
    recommendation: "BACK-1299, BACK-1300, BACK-1311 stale in CR (all Ivan Peev). Carryover from S4 -- need review.",
    priority: "critical"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 390 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "February 27, 2026",
  currentDate: "March 2, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S4 Day 14", current: "S5 Day 3", delta: "New Sprint", trend: "new sprint" },
    { metric: "Tickets", baseline: 103, current: 66, delta: "-37", trend: "new sprint scope" },
    { metric: "Points", baseline: 252, current: 135, delta: "-117", trend: "new sprint scope" },
    { metric: "Completion", baseline: "49.6%", current: "12.9%", delta: "N/A", trend: "new sprint" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 9.7, current: 9.1, delta: "-0.6%", trend: "worsened" },
    { metric: "Unassigned", baseline: 18, current: 30, delta: "+12", trend: "new sprint" },
    { metric: "Health", baseline: "RED", current: "RED", delta: "No change", trend: "stagnant" }
  ]
};

// Sprint Planning Alert for Executive Summary
export interface SprintPlanningAlert {
  currentSprint: {
    id: string;
    completionRate: number;
    pointsCompletionRate: number;
    daysRemaining: number;
    status: string;
  };
  nextSprint: {
    id: string;
    totalTickets: number;
    totalPoints: number;
    assigned: number;
    unassigned: number;
    unassignedPercent: number;
    missingEstimatesPercent: number;
    readinessStatus: string;
  };
  actionNeeded: string;
}

export const sprintPlanningAlert: SprintPlanningAlert = {
  currentSprint: {
    id: '2026-S5',
    completionRate: 9.2,
    pointsCompletionRate: 12.9,
    daysRemaining: 11,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S6',
    totalTickets: 0,
    totalPoints: 0,
    assigned: 0,
    unassigned: 0,
    unassignedPercent: 0,
    missingEstimatesPercent: 100,
    readinessStatus: 'NOT STARTED'
  },
  actionNeeded: 'S5 Day 3 -- 12.9% complete vs 21.4% expected. 30 unassigned (45.5%). 3 stale CR. ARTEMIS at 9.1% vs 60% target. Colony expired (-30d). BetaNxt close date expired.'
};

// Work Mix Data - S5 Day 3
export const workMix = {
  artemis: { tickets: 6, points: 13, percent: 9, target: '60%', status: 'below' as const },
  client: { tickets: 6, points: 12, percent: 9, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 1, points: 2, percent: 2, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 135, completed: 17, rate: 12.9, status: "in_progress" }
];

export const avgVelocity = 134;
