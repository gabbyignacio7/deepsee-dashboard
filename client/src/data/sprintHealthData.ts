// Sprint Health Data - Updated March 5, 2026 at 10:49 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 6 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "36.1% (Day 6)", target: "42.9% expected", status: "yellow", detail: "36.1% complete vs 42.9% expected at Day 6. Strong velocity -- 7 tickets Done overnight." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "7 items (1 stale CR + 5 stale IP)", target: "GREEN <5", status: "red", detail: "7 items in CR. 1 stale CR (BACK-1993 6d) + 5 stale IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d)." },
  { metric: "Unassigned Tickets", s2Value: "22 of 72", target: "GREEN <5, RED >15", status: "red", detail: "30.6% of sprint unassigned -- improved from 32.9%. Trending down but still above 5% target." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "11.1%", target: "60%", status: "red", detail: "ARTEMIS at 11.1% vs 60% target -- 8 tickets, still severely under-allocated." },
  { metric: "Engineer Capacity", s2Value: "~12.7 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 12.7 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "6 items", target: "GREEN 0", status: "red", detail: "1 stale CR (BACK-1993 6d) + 5 stale IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d). Stale increased." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned (8 days to sprint start). Grooming must begin this week." }
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

// Sprint health recommendations - Updated March 5, 2026
export const healthRecommendations = [
  {
    issue: "22 UNASSIGNED TICKETS (30.6%)",
    recommendation: "22 of 72 tickets unassigned (30.6%). Trending down from 32.9% but still far above 5% target.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 6 -- 36.1% vs 42.9%",
    recommendation: "S5 Day 6/14. 66/190 pts complete (34.7%). Strong overnight velocity -- 7 tickets Done. Closing gap on pace.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 11.1% vs 60% target",
    recommendation: "At 11.1% vs 60% target. Essentially flat. Must address in S6 planning.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-33 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-30 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "6 STALE ITEMS (1 CR + 5 IP)",
    recommendation: "6 stale items (up from 4). 5 IP (BACK-1301/1302/1303 9d, BACK-1298 6d, UI-780 6d) + 1 CR (BACK-1993 6d).",
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
  currentDate: "March 5, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 5", current: "S5 Day 6", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 70, current: 72, delta: "+2", trend: "scope added" },
    { metric: "Points", baseline: 186, current: 190, delta: "+4", trend: "scope added" },
    { metric: "Completion", baseline: "27.1%", current: "36.1%", delta: "+9.0%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 11.4, current: 11.1, delta: "-0.3%", trend: "flat" },
    { metric: "Unassigned", baseline: 23, current: 22, delta: "-1", trend: "improved" },
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
    completionRate: 36.1,
    pointsCompletionRate: 34.7,
    daysRemaining: 8,
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
  actionNeeded: 'S5 Day 6 -- 36.1% complete vs 42.9% expected. 22 unassigned (30.6%). 6 stale items. ARTEMIS at 11.1% vs 60% target. Colony expired (-33d). BetaNxt expired.'
};

// Work Mix Data - S5 Day 6
export const workMix = {
  artemis: { tickets: 8, points: 18, percent: 11, target: '60%', status: 'below' as const },
  client: { tickets: 9, points: 18, percent: 13, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 1, points: 2, percent: 2, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 190, completed: 66, rate: 34.7, status: "in_progress" }
];

export const avgVelocity = 134;
