// Sprint Health Data - Updated January 28, 2026 at 11:00 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S2

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "48%", target: ">80%", status: "yellow", detail: "48/95 tickets completed" },
  { metric: "Burndown Status", s2Value: "Behind", target: "On Track", status: "yellow", detail: "~47 tickets likely to roll over" },
  { metric: "Days Remaining", s2Value: 2, target: "-", status: "red", detail: "Sprint ends Jan 30" },
  { metric: "Blocked Items", s2Value: 2, target: "<3", status: "yellow", detail: "Down from 4 - 2 remaining" },
  { metric: "Code Review Queue", s2Value: 6, target: "<5", status: "yellow", detail: "6 tickets in review queue" },
  { metric: "Next Sprint (S3)", s2Value: "NOT READY", target: "READY", status: "red", detail: "95% unassigned, 70% missing estimates" },
  { metric: "ARTEMIS Progress", s2Value: "0%", target: ">40%", status: "red", detail: "0% ARTEMIS work started - CRITICAL" }
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

// Sprint health recommendations - Updated January 28, 2026
export const healthRecommendations = [
  {
    issue: "S3 NOT READY - 95% unassigned",
    recommendation: "Assignment session needed before Jan 30 sprint start - 35 tickets unassigned",
    priority: "critical"
  },
  {
    issue: "S3 Missing Estimates - 70%",
    recommendation: "Pointing session needed - 26 tickets missing story points",
    priority: "critical"
  },
  {
    issue: "S2 Carryover Risk (~47 tickets)",
    recommendation: "Prepare for significant carryover - only 2 days remaining in S2",
    priority: "high"
  },
  {
    issue: "ARTEMIS Progress at 0% - CRITICAL",
    recommendation: "Immediately assign and start ARTEMIS tickets - strategic initiative at risk",
    priority: "critical"
  },
  {
    issue: "Code Review Bottleneck (6 tickets)",
    recommendation: "Clear code review queue to maximize S2 completion",
    priority: "high"
  }
];

// Sprint Planning Alert for Executive Summary
export interface SprintPlanningAlert {
  currentSprint: {
    id: string;
    completionRate: number;
    daysRemaining: number;
    status: string;
  };
  nextSprint: {
    id: string;
    totalTickets: number;
    unassignedPercent: number;
    missingEstimatesPercent: number;
    readinessStatus: string;
  };
  actionNeeded: string;
}

export const sprintPlanningAlert: SprintPlanningAlert = {
  currentSprint: {
    id: '2026-S2',
    completionRate: 48,
    daysRemaining: 2,
    status: 'YELLOW'
  },
  nextSprint: {
    id: '2026-S3',
    totalTickets: 37,
    unassignedPercent: 95,
    missingEstimatesPercent: 70,
    readinessStatus: 'NOT_READY'
  },
  actionNeeded: 'Assignment + pointing session before Jan 30 sprint start'
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  { sprint: "2026-S2", committed: 95, completed: 48, rate: 48, status: "in_progress" }
];

export const avgVelocity = 80.08;
