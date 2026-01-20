// Sprint Health Data - Updated January 20, 2026
// Source: JIRA Extract - Sprint 2026-S2

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "21%", target: ">80%", status: "red", detail: "29/137 story points completed" },
  { metric: "Burndown Status", s2Value: "Behind", target: "On Track", status: "red", detail: "20-25 points behind ideal line" },
  { metric: "Commitment vs Velocity", s2Value: "71% over", target: "<10% variance", status: "red", detail: "137 pts vs 80 pt avg velocity" },
  { metric: "Blocked Items", s2Value: 3, target: "<3", status: "yellow", detail: "1 blocked 40 days, 2 unassigned" },
  { metric: "Scope Creep", s2Value: "+32 pts", target: "0", status: "yellow", detail: "32 points added mid-sprint" },
  { metric: "Days Remaining", s2Value: 7, target: "-", status: "yellow", detail: "50% of sprint elapsed" },
  { metric: "Not Started", s2Value: "47%", target: "<20%", status: "red", detail: "64 points not started" }
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

// Sprint health recommendations - Updated January 20, 2026
export const healthRecommendations = [
  {
    issue: "Sprint Behind Schedule (21% complete at 50% elapsed)",
    recommendation: "Focus on completing in-progress tickets before starting new work",
    priority: "critical"
  },
  {
    issue: "Over-Commitment (137 pts vs 80 pt avg velocity)",
    recommendation: "Consider descoping 20-30 points to align with realistic delivery",
    priority: "critical"
  },
  {
    issue: "Blocked Items Aging (40 days max)",
    recommendation: "Assign owners to BACK-1489 and UI-719 immediately",
    priority: "high"
  },
  {
    issue: "Customer Dependency (BACK-1603)",
    recommendation: "Follow up with DTCC for samples - Treven's ticket blocked 8 days",
    priority: "high"
  },
  {
    issue: "Scope Creep (+32 points mid-sprint)",
    recommendation: "Establish mid-sprint scope freeze policy for S3",
    priority: "medium"
  },
  {
    issue: "47% Work Not Started",
    recommendation: "Prioritize and either start or move to backlog for S3",
    priority: "high"
  }
];

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  { sprint: "2026-S2", committed: 137, completed: 29, rate: 21, status: "in_progress" }
];

export const avgVelocity = 80.08;
