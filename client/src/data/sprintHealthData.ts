// Sprint Health Data - Updated January 26, 2026 at 12:40 PM MT
// Source: JIRA Extract - Sprint 2026-S2

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

// Updated metrics reflecting January 26, 2026 status
// Sprint: 42% complete, 4 days remaining, 200 story points, scope creep 82%
export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "42%", target: ">75%", status: "red", detail: "90/200 story points completed" },
  { metric: "Blocked Items", s2Value: 4, target: "0", status: "red", detail: "BACK-1603 (42d), BACK-1489 (75d) critical" },
  { metric: "Unassigned Items", s2Value: "~12", target: "<10%", status: "yellow", detail: "~12% of items unassigned" },
  { metric: "Missing Estimates", s2Value: "TBD", target: "<5%", status: "yellow", detail: "Needs review" },
  { metric: "ARTEMIS % of Work", s2Value: "~0%", target: "50-60%", status: "red", detail: "0% ARTEMIS work started despite sprint" },
  { metric: "Scope Creep", s2Value: "82%", target: "<20%", status: "red", detail: "Grew from 110 to 200 story points" }
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

// Sprint health recommendations - Updated January 26, 2026
export const healthRecommendations = [
  {
    issue: "ARTEMIS Work Not Started (0% despite being in sprint)",
    recommendation: "Immediate sprint planning review needed - all 27 ARTEMIS tickets still in To Do",
    priority: "critical"
  },
  {
    issue: "Scope Creep at 82% (110 → 200 story points)",
    recommendation: "Establish strict scope freeze policy for remaining 4 days",
    priority: "critical"
  },
  {
    issue: "BACK-1603 Blocked 42 Days ($1.85M ARR at risk)",
    recommendation: "Escalate DTCC dependency immediately - highest revenue impact",
    priority: "critical"
  },
  {
    issue: "BACK-1489 Blocked 75 Days (Security Compliance)",
    recommendation: "Assign owner immediately for Ubuntu 24.04 upgrade",
    priority: "critical"
  },
  {
    issue: "Only 4 Days Remaining at 42% Complete",
    recommendation: "Focus on completing in-progress work, defer new starts to S3",
    priority: "high"
  },
  {
    issue: "Unassigned Items (~12%)",
    recommendation: "Assign or move to backlog before sprint end",
    priority: "high"
  }
];

// Velocity History for comparison - Updated January 26, 2026
export const velocityHistory = [
  { sprint: "Sprint 32", committed: 61, completed: 84, rate: 138 },
  { sprint: "Sprint 33", committed: 61, completed: 50, rate: 82 },
  { sprint: "2025-S1", committed: 22, completed: 97, rate: 441 },
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98 },
  { sprint: "2026-S2", committed: 200, completed: 90, rate: 45, status: "in_progress" }
];

export const avgVelocity = 63.58;
