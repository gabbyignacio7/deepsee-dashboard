// Sprint Health Data - Updated January 28, 2026 at 12:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S2

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "59.2%", target: ">80%", status: "yellow", detail: "58/98 tickets completed" },
  { metric: "Points Completion", s2Value: "67.6%", target: ">80%", status: "yellow", detail: "138/204 points completed" },
  { metric: "Days Remaining", s2Value: 2, target: "-", status: "red", detail: "86% of sprint elapsed" },
  { metric: "Blocked Items", s2Value: 0, target: "<3", status: "green", detail: "No active blockers" },
  { metric: "Code Review Queue", s2Value: 6, target: "<5", status: "yellow", detail: "6 tickets in review queue" },
  { metric: "S3 Readiness", s2Value: "32%", target: ">80%", status: "red", detail: "68% unassigned, 58% missing estimates" },
  { metric: "Work Mix", s2Value: "Imbalanced", target: "Balanced", status: "yellow", detail: "ARTEMIS 10.3% vs 50-60% target" }
];

export type OverallHealth = "GREEN" | "YELLOW" | "RED";

export const overallHealth: OverallHealth = "YELLOW";

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

// Sprint health recommendations - Updated January 28, 2026
export const healthRecommendations = [
  {
    issue: "S3 NOT READY - 68% unassigned",
    recommendation: "Assignment session needed before Jan 30 sprint start - 55 tickets unassigned of 81 total",
    priority: "critical"
  },
  {
    issue: "S3 Missing Estimates - 58%",
    recommendation: "Pointing session needed - 47 tickets missing story points",
    priority: "critical"
  },
  {
    issue: "S2 Completion at 59.2% with 2 days left",
    recommendation: "Focus on completing in-progress and code review items to maximize S2 completion",
    priority: "high"
  },
  {
    issue: "Work Mix Imbalance",
    recommendation: "ARTEMIS at 10.3% (target 50-60%), Client at 9.8% (target 30-40%). 64% needs labeling.",
    priority: "high"
  },
  {
    issue: "Code Review Bottleneck (6 tickets)",
    recommendation: "Clear code review queue to maximize S2 completion",
    priority: "high"
  },
  {
    issue: "Lane/Loris/Karolina have 0 S3 tickets",
    recommendation: "Assign S3 work to engineers with no planned work",
    priority: "medium"
  }
];

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
    id: '2026-S2',
    completionRate: 59.2,
    pointsCompletionRate: 67.6,
    daysRemaining: 2,
    status: 'YELLOW'
  },
  nextSprint: {
    id: '2026-S3',
    totalTickets: 81,
    totalPoints: 126,
    assigned: 26,
    unassigned: 55,
    unassignedPercent: 67.9,
    missingEstimatesPercent: 58.0,
    readinessStatus: 'NOT_READY'
  },
  actionNeeded: 'Assignment + pointing session before Jan 30 sprint start. Lane, Loris, Karolina have 0 S3 tickets.'
};

// Work Mix Data
export const workMix = {
  artemis: { tickets: 11, points: 21, percent: 10.3, target: '50-60%', status: 'below' as const },
  client: { tickets: 7, points: 20, percent: 9.8, target: '30-40%', status: 'below' as const },
  infrastructure: { tickets: 14, points: 32, percent: 15.7, target: '10-20%', status: 'on-target' as const },
  other: { tickets: 66, points: 131, percent: 64.2, note: 'Needs labeling' }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  { sprint: "2026-S2", committed: 204, completed: 138, rate: 67.6, status: "in_progress" }
];

export const avgVelocity = 80.08;
