// Sprint Health Data - Updated February 13, 2026 at 4:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 Day 1 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "0% (Day 1)", target: "N/A — Day 1", status: "yellow", detail: "Sprint just started today — no completion data yet" },
  { metric: "Unassigned Tickets", s2Value: "40 of 61", target: "GREEN <5, RED >15", status: "red", detail: "65.6% of sprint unassigned — includes Mercury HITL (6)" },
  { metric: "Blocked Items (In Sprint)", s2Value: 2, target: "GREEN 0-2", status: "yellow", detail: "UI-743 (Broadridge export), UI-740 (assignee dropdown)" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "40%", target: "50-60%", status: "yellow", detail: "Improved from 28% in S3, still below 50-60% target" },
  { metric: "Points per Engineer", s2Value: "~8.6 avg", target: "GREEN 12-18", status: "red", detail: "8.6 avg across 14 engineers. 57% capacity utilization." },
  { metric: "Next Sprint Readiness", s2Value: "3% assigned", target: "GREEN >80%", status: "red", detail: "S5: 97% unassigned, 93% unestimated" }
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

// Sprint health recommendations - Updated February 13, 2026
export const healthRecommendations = [
  {
    issue: "Mercury HITL — ALL 6 TICKETS UNASSIGNED",
    recommendation: "BACK-1921 through BACK-1926 are all To Do and Unassigned. Highest priority for at-risk Colony Bank client. Darius Ouderkirk created them but has 0 sprint assignments.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-14 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31. Engineering dependencies on Mercury extraction blocking progress. Escalate to Ryan and Steve.",
    priority: "critical"
  },
  {
    issue: "DTCC-ELA Close Date is TODAY",
    recommendation: "$1.85M deal — close date Feb 13 (today). 830 days in pipeline. Contracting & Close stage. Need status update from Steve.",
    priority: "critical"
  },
  {
    issue: "65.6% Tickets Unassigned — Day 1",
    recommendation: "40 of 61 sprint tickets have no owner. Includes Mercury HITL (6), pen test (6), Sunwest (2), and multiple platform tickets. Sprint assignment session needed.",
    priority: "critical"
  },
  {
    issue: "Next Sprint (S5) Readiness: RED",
    recommendation: "97% unassigned, 93% unestimated. Currently a parking lot for Fabric/Platform backlog. Sprint planning needed before Feb 27.",
    priority: "critical"
  },
  {
    issue: "Blocked Items (2)",
    recommendation: "UI-743 (Broadridge export) and UI-740 (assignee dropdown). Monitor — both are new blocks.",
    priority: "high"
  }
];

// Baseline comparison from Feb 9 to Feb 13
export const baselineComparison = {
  baselineDate: "February 9, 2026",
  currentDate: "February 13, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S3 Day 11", current: "S4 Day 1", delta: "New Sprint", trend: "transition" },
    { metric: "Tickets", baseline: 109, current: 61, delta: "-48", trend: "smaller sprint" },
    { metric: "Points", baseline: 209, current: 120, delta: "-89", trend: "right-sized" },
    { metric: "Blocked (sprint)", baseline: 1, current: 2, delta: "+1", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 28, current: 40, delta: "+12%", trend: "improved" },
    { metric: "Unassigned", baseline: 53, current: 40, delta: "-13", trend: "still high" },
    { metric: "Health", baseline: "RED", current: "RED", delta: "No change", trend: "flat" }
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
    completionRate: 0,
    pointsCompletionRate: 0,
    daysRemaining: 14,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S5',
    totalTickets: 30,
    totalPoints: 8,
    assigned: 1,
    unassigned: 29,
    unassignedPercent: 96.7,
    missingEstimatesPercent: 93.3,
    readinessStatus: 'NOT_READY'
  },
  actionNeeded: 'S4 Day 1 — 65.6% unassigned (40/61). Mercury HITL (6 tickets) ALL unassigned. S5 at RED readiness (97% unassigned). Colony Bank contract expired (-14 days).'
};

// Work Mix Data - S4 Day 1
export const workMix = {
  artemis: { tickets: 10, points: 48, percent: 40, target: '50-60%', status: 'below' as const },
  client: { tickets: 12, points: 33, percent: 28, target: '30-35%', status: 'on-target' as const },
  infrastructure: { tickets: 14, points: 24, percent: 20, target: '10-15%', status: 'above' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 120, completed: 0, rate: 0, status: "in_progress" }
];

export const avgVelocity = 134;
