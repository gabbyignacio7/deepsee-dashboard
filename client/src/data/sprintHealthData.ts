// Sprint Health Data - Updated January 26, 2026 at 12:40 PM MT
// Source: JIRA Extract - Sprint 2026-S2

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "42%", target: ">80%", status: "red", detail: "90/200 story points completed" },
  { metric: "Burndown Status", s2Value: "Behind", target: "On Track", status: "red", detail: "25-30 points behind ideal line" },
  { metric: "Commitment vs Velocity", s2Value: "150% over", target: "<10% variance", status: "red", detail: "200 pts vs 80 pt avg velocity" },
  { metric: "Blocked Items", s2Value: 4, target: "<3", status: "red", detail: "2 P0 items, 75 days max blocked" },
  { metric: "Scope Creep", s2Value: "+45 pts", target: "0", status: "red", detail: "45 points added mid-sprint" },
  { metric: "Days Remaining", s2Value: 4, target: "-", status: "red", detail: "73% of sprint elapsed" },
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

// Sprint health recommendations - Updated January 26, 2026
export const healthRecommendations = [
  {
    issue: "ARTEMIS Progress at 0% - CRITICAL",
    recommendation: "Immediately assign and start ARTEMIS tickets - strategic initiative at risk",
    priority: "critical"
  },
  {
    issue: "Sprint Behind Schedule (42% complete at 73% elapsed)",
    recommendation: "Focus on completing in-progress tickets, descope 25+ likely rollovers",
    priority: "critical"
  },
  {
    issue: "Over-Commitment (200 pts vs 80 pt avg velocity)",
    recommendation: "Move 50+ points to S3 backlog immediately",
    priority: "critical"
  },
  {
    issue: "Blocked Items Critical (75 days max - BACK-1489)",
    recommendation: "Assign owners to BACK-1489 and UI-719 immediately - security risk",
    priority: "critical"
  },
  {
    issue: "DTCC Revenue Risk ($1.85M ARR)",
    recommendation: "Executive escalation to DTCC for sample data - blocked 42 days",
    priority: "critical"
  },
  {
    issue: "Scope Creep (+45 points mid-sprint)",
    recommendation: "Implement strict scope freeze policy for S3",
    priority: "high"
  }
];

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2025-S2", committed: 75, completed: 49, rate: 65 },
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  { sprint: "2026-S2", committed: 200, completed: 90, rate: 42, status: "in_progress" }
];

export const avgVelocity = 80.08;
