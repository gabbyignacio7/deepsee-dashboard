// Sprint Health Data - Updated February 9, 2026 at 10:14 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 Day 11 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "28.4% tickets / 39.2% pts", target: "Day 11/15", status: "red", detail: "31/109 tickets completed, significant shortfall projected" },
  { metric: "Unassigned Tickets", s2Value: "53 of 109", target: "GREEN <5, RED >15", status: "red", detail: "49% of sprint unassigned — worsened from 38" },
  { metric: "Blocked Items (In Sprint)", s2Value: 1, target: "GREEN 0-2", status: "green", detail: "Major improvement from 12 → 1" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "28%", target: "50-60%", status: "red", detail: "Below target, marginal improvement from 23%" },
  { metric: "Points per Engineer", s2Value: "~12 avg", target: "GREEN 12-18", status: "yellow", detail: "12 avg across 13 engineers, wide variance" },
  { metric: "Code Review Queue", s2Value: "6 tickets", target: "GREEN <5, YELLOW 5-10", status: "yellow", detail: "6 tickets awaiting code review" }
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

// Sprint health recommendations - Updated February 9, 2026
export const healthRecommendations = [
  {
    issue: "S3 49% Unassigned at Day 11",
    recommendation: "53 of 109 tickets still unassigned at Day 11/15. Worsened from 38 at last check. Critical assignment needed for remaining 4 days.",
    priority: "critical"
  },
  {
    issue: "Sprint Projected Shortfall",
    recommendation: "Projected to complete ~42 tickets vs 109 committed. 67 ticket shortfall and 97 point shortfall expected.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS Work Mix Still RED at 28%",
    recommendation: "Marginal improvement from 23% → 28%, but well below 50-60% target. Client work at 53% still dominating.",
    priority: "critical"
  },
  {
    issue: "6 New Critical Pentest Findings",
    recommendation: "SC-326 through SC-331 — 5 Critical, 1 High. All unassigned. Access control vulnerabilities requiring immediate triage.",
    priority: "critical"
  },
  {
    issue: "Blocked Items Improved (12 → 1)",
    recommendation: "Major improvement. Only BACK-1863 (Colony Allegro) still blocked. Monitor stale in-progress items (BACK-1810, BACK-1677).",
    priority: "high"
  },
  {
    issue: "Code Review Queue (6 tickets)",
    recommendation: "Queue slightly above threshold. Clear reviews to prevent becoming bottleneck in final sprint days.",
    priority: "high"
  }
];

// Baseline comparison from Jan 18 to Feb 9
export const baselineComparison = {
  baselineDate: "January 18, 2026",
  currentDate: "February 9, 2026",
  metrics: [
    { metric: "Completed", baseline: 30, current: 31, delta: "+1", trend: "flat" },
    { metric: "Blocked (sprint)", baseline: 12, current: 1, delta: "-11", trend: "improved" },
    { metric: "ARTEMIS %", baseline: 23, current: 28, delta: "+5%", trend: "marginal" },
    { metric: "Unassigned", baseline: 38, current: 53, delta: "+15", trend: "worsened" },
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
    id: '2026-S3',
    completionRate: 28.4,
    pointsCompletionRate: 39.2,
    daysRemaining: 4,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S4',
    totalTickets: 19,
    totalPoints: 10,
    assigned: 2,
    unassigned: 17,
    unassignedPercent: 89.5,
    missingEstimatesPercent: 84.2,
    readinessStatus: 'NOT_READY'
  },
  actionNeeded: 'S3 at 28.4% completion on Day 11/15 - RED health. 53 tickets unassigned, projected 67-ticket shortfall. S4 has 19 tickets, 89% unassigned.'
};

// Work Mix Data - S3 Day 11
export const workMix = {
  artemis: { tickets: 28, points: 58, percent: 28, target: '50-60%', status: 'below' as const },
  client: { tickets: 55, points: 110, percent: 53, target: '30-35%', status: 'above' as const },
  infrastructure: { tickets: 20, points: 40, percent: 19, target: '10-15%', status: 'above' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 87, completed: 68, rate: 78, status: "completed" },
  { sprint: "2026-S2", committed: 98, completed: 64, rate: 65, status: "completed" },
  { sprint: "2026-S3", committed: 209, completed: 82, rate: 39, status: "in_progress" }
];

export const avgVelocity = 66;
