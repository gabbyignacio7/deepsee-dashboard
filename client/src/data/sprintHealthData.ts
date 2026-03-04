// Sprint Health Data - Updated March 4, 2026 at 12:09 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 5 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "27.1% (Day 5)", target: "35.7% expected", status: "yellow", detail: "27.1% complete vs 35.7% expected at Day 5. Major progress -- Ivan cleared 4 stale items." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "7 items (1 stale CR + 3 stale IP)", target: "GREEN <5", status: "yellow", detail: "7 items in CR. 1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d)." },
  { metric: "Unassigned Tickets", s2Value: "23 of 70", target: "GREEN <5, RED >15", status: "red", detail: "32.9% of sprint unassigned -- improved from 41.8% but still above 5% target" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "11.4%", target: "60%", status: "red", detail: "ARTEMIS at 11.4% vs 60% target -- 8 tickets, still severely under-allocated." },
  { metric: "Engineer Capacity", s2Value: "~12.4 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 12.4 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "4 items", target: "GREEN 0", status: "yellow", detail: "1 stale CR (BACK-1993 5d unassigned) + 3 stale IP (BACK-1301/1302/1303 Ivan Peev 8d). Ivan cleared 4." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned (9 days to sprint start). Grooming should begin." }
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

// Sprint health recommendations - Updated March 4, 2026
export const healthRecommendations = [
  {
    issue: "23 UNASSIGNED TICKETS (32.9%)",
    recommendation: "23 of 70 tickets unassigned (32.9%). Improved from 41.8% but still far above 5% target.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 5 -- 27.1% vs 35.7%",
    recommendation: "S5 Day 5/14. 42/186 pts complete (22.6%). Closer to pace (35.7% expected). Ivan cleared 4 stale items.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 11.4% vs 60% target",
    recommendation: "At 11.4% vs 60% target. Marginal improvement from 10.4% but still severely under-allocated.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-32 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-30 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "4 STALE ITEMS (1 CR + 3 IP)",
    recommendation: "Ivan cleared 4 stale items to Done. Remaining: 3 IP (BACK-1301/1302/1303 8d) + 1 CR (BACK-1993 5d unassigned).",
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
  currentDate: "March 4, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 4", current: "S5 Day 5", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 67, current: 70, delta: "+3", trend: "scope added" },
    { metric: "Points", baseline: 154, current: 186, delta: "+32", trend: "scope added" },
    { metric: "Completion", baseline: "15.2%", current: "27.1%", delta: "+11.9%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 10.4, current: 11.4, delta: "+1.0%", trend: "improved" },
    { metric: "Unassigned", baseline: 28, current: 23, delta: "-5", trend: "improved" },
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
    completionRate: 27.1,
    pointsCompletionRate: 22.6,
    daysRemaining: 9,
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
  actionNeeded: 'S5 Day 5 -- 27.1% complete vs 35.7% expected. 23 unassigned (32.9%). 4 stale items. ARTEMIS at 11.4% vs 60% target. Colony expired (-32d). BetaNxt expired.'
};

// Work Mix Data - S5 Day 5
export const workMix = {
  artemis: { tickets: 8, points: 18, percent: 11, target: '60%', status: 'below' as const },
  client: { tickets: 8, points: 16, percent: 11, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 1, points: 2, percent: 2, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 186, completed: 42, rate: 22.6, status: "in_progress" }
];

export const avgVelocity = 134;
