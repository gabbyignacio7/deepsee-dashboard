// Sprint Health Data - Updated February 3, 2026 at 3:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 (Active), S2 (Final)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "S2 Final Completion", s2Value: "62.4%", target: ">80%", status: "yellow", detail: "58/93 tickets, 21 never started" },
  { metric: "S3 Progress (Day 2)", s2Value: "3.8%", target: "On track", status: "green", detail: "3/80 tickets, early in sprint" },
  { metric: "S3 Assigned", s2Value: "32.9%", target: ">80%", status: "red", detail: "55 of 82 unassigned" },
  { metric: "S3 Estimated", s2Value: "42.7%", target: ">90%", status: "red", detail: "47 of 82 missing estimates" },
  { metric: "Blocked Items", s2Value: 0, target: "<3", status: "green", detail: "No S3 blockers" },
  { metric: "Code Review Queue", s2Value: 6, target: "<5", status: "yellow", detail: "6 tickets, 15 points" },
  { metric: "ARTEMIS Work Mix", s2Value: "37.8%", target: "50-60%", status: "yellow", detail: "Up from 10.3% in S2" }
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

// Sprint health recommendations - Updated February 1, 2026
export const healthRecommendations = [
  {
    issue: "S3 67% Unassigned (Day 2)",
    recommendation: "55 of 82 tickets still unassigned. Sprint started Jan 30 - immediate assignment session needed.",
    priority: "critical"
  },
  {
    issue: "S3 Missing Estimates - 57%",
    recommendation: "47 tickets missing story points. Cannot accurately forecast sprint capacity or velocity.",
    priority: "critical"
  },
  {
    issue: "S2 Overcommitment Pattern",
    recommendation: "21 tickets never started in S2. Same risk in S3 with 67% unassigned - reduce sprint scope or assign immediately.",
    priority: "high"
  },
  {
    issue: "No S3 Work: Lane/Loris/Karolina",
    recommendation: "Three engineers have zero S3 tickets. Assign work from unassigned pool.",
    priority: "high"
  },
  {
    issue: "Code Review Bottleneck (6 tickets, 15 pts)",
    recommendation: "Clear code review queue to unblock progress. Ivan Peev has 2 tickets in CR.",
    priority: "high"
  },
  {
    issue: "ARTEMIS Work Mix at 37.8%",
    recommendation: "Improved from 10.3% in S2 but still below 50-60% target. Client work at 6.1% (target 30-40%).",
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
    id: '2026-S3',
    completionRate: 3.8,
    pointsCompletionRate: 7.8,
    daysRemaining: 12,
    status: 'YELLOW'
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
  actionNeeded: 'S4 has only 10 tickets, 90% unassigned. Only Darius Ouderkirk has S4 work. Mostly Microsoft Fabric integration.'
};

// Work Mix Data - S3
export const workMix = {
  artemis: { tickets: 31, points: 50, percent: 37.8, target: '50-60%', status: 'improved' as const },
  client: { tickets: 5, points: 11, percent: 6.1, target: '30-40%', status: 'below' as const },
  infrastructure: { tickets: 19, points: 28, percent: 23.2, target: '10-20%', status: 'above' as const },
  other: { tickets: 27, points: 40, percent: 32.9, note: 'Unlabeled tickets' }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  { sprint: "2026-S2", committed: 204, completed: 138, rate: 70.4, status: "completed" },
  { sprint: "2026-S3", committed: 129, completed: 10, rate: 7.8, status: "in_progress" }
];

export const avgVelocity = 81.5;
