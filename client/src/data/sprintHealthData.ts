// Sprint Health Data - Updated March 23, 2026
// Source: JIRA Sprint Extraction - Sprint 2026-S6 Day 11 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "51.9% (Day 11)", target: "73.3% expected", status: "red", detail: "51.9% complete vs 73.3% expected at Day 11 of 15. 21.4% behind pace." },
  { metric: "Blocked Items", s2Value: 4, target: "GREEN 0", status: "red", detail: "4 blocked items. Target is 0. Needs immediate resolution." },
  { metric: "Code Review Queue", s2Value: "1 stale (BACK-2043 5d)", target: "GREEN 0 stale", status: "yellow", detail: "1 stale CR item: BACK-2043 (5 days). Target is 0 stale." },
  { metric: "Unassigned Tickets", s2Value: "43.4%", target: "GREEN <5%", status: "red", detail: "43.4% unassigned vs <5% target. Needs urgent assignment push." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "5.4%", target: "60%", status: "red", detail: "ARTEMIS at 5.4% vs 60% target. Critical gap persists." },
  { metric: "Stale Items", s2Value: "2 items", target: "GREEN 0", status: "yellow", detail: "1 stale In Progress: BACK-2023 (10d). 1 stale Code Review: BACK-2043 (5d). 2 total stale items." },
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

// Sprint health recommendations - Updated March 23, 2026 (S6 Day 11)
export const healthRecommendations = [
  { issue: "4 BLOCKED ITEMS", recommendation: "Resolve all 4 blocked items immediately. Target is 0 blocked. With only 4 days left, blockers are critical.", priority: "critical" },
  { issue: "43.4% UNASSIGNED TICKETS", recommendation: "Assign remaining unassigned tickets urgently. 43.4% unassigned vs <5% target.", priority: "critical" },
  { issue: "ARTEMIS WORK MIX -- 5.4% vs 60%", recommendation: "ARTEMIS at 5.4% vs 60% target. Critical gap. Must prioritize ARTEMIS backlog items.", priority: "critical" },
  { issue: "SPRINT PROGRESS 21.4% BEHIND PACE", recommendation: "51.9% complete vs 73.3% expected. 4 days remaining. Focus on completing in-progress items.", priority: "critical" },
  { issue: "2 STALE ITEMS", recommendation: "Clear BACK-2023 (10d stale IP) and BACK-2043 (5d stale CR). Both need immediate attention.", priority: "high" },
  { issue: "1 STALE CODE REVIEW", recommendation: "BACK-2043 has been in CR for 5 days. Complete review and merge or reject.", priority: "high" }
];

// Baseline comparison from Mar 19 to Mar 23
export const baselineComparison = {
  baselineDate: "March 19, 2026",
  currentDate: "March 23, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S6 Day 7", current: "S6 Day 11", delta: "+4 days", trend: "progressing" },
    { metric: "Completion", baseline: "20.5%", current: "51.9%", delta: "+31.4%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 4, current: 4, delta: "0", trend: "unchanged" },
    { metric: "ARTEMIS %", baseline: 4.9, current: 5.4, delta: "+0.5%", trend: "slight improvement" },
    { metric: "Unassigned %", baseline: "64.8%", current: "43.4%", delta: "-21.4%", trend: "improving" },
    { metric: "Stale Items", baseline: 2, current: 2, delta: "0", trend: "unchanged" },
    { metric: "Code Review Stale", baseline: 0, current: 1, delta: "+1", trend: "regression" },
    { metric: "Health", baseline: "RED", current: "RED", delta: "Unchanged", trend: "still critical (avg score 1.33)" }
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
    id: '2026-S6',
    completionRate: 51.9,
    pointsCompletionRate: 0,
    daysRemaining: 4,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S7',
    totalTickets: 0,
    totalPoints: 0,
    assigned: 0,
    unassigned: 0,
    unassignedPercent: 0,
    missingEstimatesPercent: 100,
    readinessStatus: 'NOT STARTED'
  },
  actionNeeded: 'S6 Day 11 -- 51.9% vs 73.3%. 4 blocked. 43.4% unassigned. 2 stale. ARTEMIS 5.4%. 4 days remaining. Avg score 1.33.'
};

// Work Mix Data - S6 Day 11
export const workMix = {
  artemis: { tickets: 0, points: 0, percent: 5.4, target: '60%', status: 'below' as const },
  client: { tickets: 0, points: 0, percent: 0, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 0, points: 0, percent: 0, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 222, completed: 130, rate: 58.6, status: "completed" },
  { sprint: "2026-S6", committed: 179, completed: 0, rate: 51.9, status: "in_progress" }
];

export const avgVelocity = 129;
