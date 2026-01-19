// Sprint Health Data - Updated January 18, 2026
// Source: JIRA Extract

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Completion Rate", s2Value: "8%", target: ">80%", status: "red" },
  { metric: "Blocked Items", s2Value: 12, target: "<3", status: "red" },
  { metric: "Unassigned Tickets", s2Value: 38, target: "<5", status: "red" },
  { metric: "ARTEMIS Mix", s2Value: "23%", target: "50-60%", status: "red" },
  { metric: "Foundation Epics Started", s2Value: "0/12", target: "12/12", status: "red" },
  { metric: "Days Remaining", s2Value: 12, target: "-", status: "yellow" }
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

// Sprint health recommendations
export const healthRecommendations = [
  {
    issue: "Low Completion Rate (8%)",
    recommendation: "Focus on completing in-progress tickets before starting new work",
    priority: "high"
  },
  {
    issue: "High Blocked Count (12 items)",
    recommendation: "Schedule daily standup to address blockers, escalate P0/P1 items",
    priority: "critical"
  },
  {
    issue: "Many Unassigned Tickets (38)",
    recommendation: "Sprint planning session needed to assign work based on capacity",
    priority: "high"
  },
  {
    issue: "ARTEMIS Mix Below Target (23% vs 50-60%)",
    recommendation: "Prioritize ARTEMIS foundation epics in next sprint planning",
    priority: "medium"
  },
  {
    issue: "No Foundation Epics Started",
    recommendation: "Assign resources to BACK-1680, BACK-1681, BACK-1682 immediately",
    priority: "high"
  }
];
