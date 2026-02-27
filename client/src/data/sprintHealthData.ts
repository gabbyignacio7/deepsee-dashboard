// Sprint Health Data - Updated February 27, 2026 at 9:38 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 Day 14 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "49.6% (Day 14)", target: "100% expected", status: "red", detail: "49.6% complete vs 100% expected. Sprint ends today (Day 14 of 14)." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "8 items (0 stale)", target: "GREEN <5", status: "yellow", detail: "8 items in CR, 0 stale. Active code reviews in final sprint day." },
  { metric: "Unassigned Tickets", s2Value: "18 of 103", target: "GREEN <5, RED >15", status: "red", detail: "17.5% of sprint unassigned -- improved from 23.2%" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "9.7%", target: "60%", status: "red", detail: "ARTEMIS at 9.7% vs 60% target -- severely under-allocated" },
  { metric: "Engineer Capacity", s2Value: "~15.3 avg", target: "GREEN 12-18", status: "green", detail: "2 engineers missing (Loris, Karolina). 15.3 avg pts/engineer. Owen 28pts, Ivan 25pts highest." },
  { metric: "Stale Items", s2Value: "0 items", target: "GREEN 0", status: "green", detail: "0 stale In Progress, 0 stale CR. All stale items cleared on sprint final day." },
  { metric: "Next Sprint Readiness", s2Value: "30 assigned", target: "GREEN >80%", status: "green", detail: "S5: 30 tickets already assigned for Feb 27" }
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

// Sprint health recommendations - Updated February 27, 2026
export const healthRecommendations = [
  {
    issue: "18 UNASSIGNED TICKETS (17.5%)",
    recommendation: "Improved from 23.2% to 17.5%. Sprint ends today. Mercury HITL sprint goal tickets still unowned.",
    priority: "critical"
  },
  {
    issue: "SPRINT ENDS TODAY -- 49.6% vs 100%",
    recommendation: "Sprint day 14/14. 115/252 pts complete (49.6%). 137 pts remaining will carry over to S5.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 9.7% vs 60% target",
    recommendation: "At 9.7% vs 60% target. Severely under-allocated all sprint. Must be addressed in S5 planning.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-27 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-27 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "0 STALE ITEMS",
    recommendation: "All stale items cleared. BACK-1911, CI-935, CI-936 moved to Done. Sprint cleanup complete.",
    priority: "critical"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 390 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 22 to Feb 25
export const baselineComparison = {
  baselineDate: "February 25, 2026",
  currentDate: "February 27, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S4 Day 12", current: "S4 Day 14", delta: "+2 days", trend: "progressing" },
    { metric: "Tickets", baseline: 99, current: 103, delta: "+4", trend: "scope increased" },
    { metric: "Points", baseline: 226, current: 252, delta: "+26", trend: "scope increased" },
    { metric: "Completion", baseline: "35.8%", current: "49.6%", delta: "+13.8%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 10.1, current: 9.7, delta: "-0.4%", trend: "worsened" },
    { metric: "Unassigned", baseline: 23, current: 18, delta: "-5", trend: "improved" },
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
    id: '2026-S4',
    completionRate: 58.3,
    pointsCompletionRate: 49.6,
    daysRemaining: 0,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S5',
    totalTickets: 30,
    totalPoints: 8,
    assigned: 30,
    unassigned: 0,
    unassignedPercent: 0,
    missingEstimatesPercent: 93.3,
    readinessStatus: 'READY'
  },
  actionNeeded: 'S4 Day 14 (LAST DAY) -- 49.6% complete vs 100% expected. 18 unassigned (17.5%). 0 stale items. ARTEMIS at 9.7% vs 60% target. Colony expired (-27d). BetaNxt close date expired.'
};

// Work Mix Data - S4 Day 14
export const workMix = {
  artemis: { tickets: 10, points: 23, percent: 10, target: '60%', status: 'below' as const },
  client: { tickets: 21, points: 48, percent: 20, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 5, points: 12, percent: 5, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 49.6, status: "in_progress" }
];

export const avgVelocity = 134;
