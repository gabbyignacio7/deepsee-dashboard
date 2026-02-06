// Sprint Health Data - Updated February 6, 2026 at 3:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 Day 7 (Active), S2 (Final)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "S2 Final Completion", s2Value: "65.3%", target: ">80%", status: "yellow", detail: "64/98 tickets completed" },
  { metric: "S3 Completion (Day 7)", s2Value: "27.5%", target: "On track", status: "red", detail: "~30/109 tickets, behind pace at midpoint" },
  { metric: "S3 Assigned", s2Value: "49.5%", target: ">80%", status: "red", detail: "55 of 109 unassigned" },
  { metric: "S3 Estimated", s2Value: "61.5%", target: ">90%", status: "red", detail: "42 of 109 missing estimates" },
  { metric: "Blocked Items", s2Value: 2, target: "<3", status: "green", detail: "2 S3 blockers" },
  { metric: "Code Review Queue", s2Value: 5, target: "<5", status: "yellow", detail: "5 tickets in review" },
  { metric: "ARTEMIS Work Mix", s2Value: "27%", target: "50-60%", status: "red", detail: "Below target, down from 37.8% at sprint start" }
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

// Sprint health recommendations - Updated February 6, 2026
export const healthRecommendations = [
  {
    issue: "S3 50% Unassigned at Day 7",
    recommendation: "55 of 109 tickets still unassigned at sprint midpoint. Immediate assignment session needed to avoid S2 repeat.",
    priority: "critical"
  },
  {
    issue: "S3 Missing Estimates - 39%",
    recommendation: "42 of 109 tickets missing story points. Cannot accurately forecast remaining sprint capacity.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS Work Mix Dropped to 27%",
    recommendation: "Down from 37.8% at sprint start, well below 50-60% target. Client work dominating at 43%.",
    priority: "critical"
  },
  {
    issue: "S3 Completion Only 27.5% at Midpoint",
    recommendation: "At Day 7 of 14, completion should be ~50%. Current pace projects ~55% completion - repeating S2 overcommitment pattern.",
    priority: "critical"
  },
  {
    issue: "2 Blocked Tickets",
    recommendation: "Resolve blocked items to maintain flow. Monitor for additional blockers as sprint progresses.",
    priority: "high"
  },
  {
    issue: "Code Review Queue (5 tickets)",
    recommendation: "Queue near threshold. Clear reviews promptly to prevent bottleneck.",
    priority: "high"
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
    id: '2026-S3',
    completionRate: 27.5,
    pointsCompletionRate: 38.0,
    daysRemaining: 7,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S4',
    totalTickets: 10,
    totalPoints: 8,
    assigned: 1,
    unassigned: 9,
    unassignedPercent: 90.0,
    missingEstimatesPercent: 80.0,
    readinessStatus: 'NOT_READY'
  },
  actionNeeded: 'S3 at 27.5% completion on Day 7 - RED health. 55 tickets unassigned, 42 missing estimates. S4 has only 10 tickets, 90% unassigned.'
};

// Work Mix Data - S3 Day 7
export const workMix = {
  artemis: { tickets: 29, points: 45, percent: 27, target: '50-60%', status: 'below' as const },
  client: { tickets: 47, points: 72, percent: 43, target: '30-35%', status: 'above' as const },
  infrastructure: { tickets: 20, points: 30, percent: 18, target: '10-15%', status: 'above' as const },
  other: { tickets: 13, points: 20, percent: 12, note: 'Unlabeled tickets' }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 87, completed: 68, rate: 78, status: "completed" },
  { sprint: "2026-S2", committed: 98, completed: 64, rate: 65, status: "completed" },
  { sprint: "2026-S3", committed: 210, completed: 80, rate: 38, status: "in_progress" }
];

export const avgVelocity = 66;
