// Sprint Health Data - Updated February 18, 2026 at 5:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 Day 5 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "13.1% (Day 5)", target: "35.7% expected", status: "red", detail: "13.1% complete vs 35.7% expected at Day 5. Need 2.4x current burn rate." },
  { metric: "Blocked Items", s2Value: 2, target: "GREEN 0-2", status: "yellow", detail: "UI-740 (5 days, Matthew Snow), UI-743 (1 day, unassigned Broadridge)" },
  { metric: "Code Review Queue", s2Value: "5 items", target: "GREEN <5", status: "green", detail: "5 items in CR, no single-engineer bottleneck" },
  { metric: "Unassigned Tickets", s2Value: "32 of 70", target: "GREEN <5, RED >15", status: "red", detail: "45.7% of sprint unassigned — Mercury HITL sprint goal tickets unowned" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "29%", target: "60%", status: "red", detail: "ARTEMIS at 29% vs 60% target — severely under-allocated" },
  { metric: "Engineer Capacity", s2Value: "~9.0 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina), Aleksander +8 backlog debt" },
  { metric: "Stale Items", s2Value: "4 items", target: "GREEN 0", status: "yellow", detail: "1 stale In Progress (12 days), 3 stale CR (5 days each)" },
  { metric: "Next Sprint Readiness", s2Value: "30 assigned", target: "GREEN >80%", status: "green", detail: "S5: 30 tickets already assigned for Feb 27" }
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

// Sprint health recommendations - Updated February 18, 2026
export const healthRecommendations = [
  {
    issue: "32 UNASSIGNED TICKETS (45.7%)",
    recommendation: "Mercury HITL sprint goal tickets have no owner. Biggest sprint risk. Sprint assignment session needed immediately.",
    priority: "critical"
  },
  {
    issue: "SPRINT BEHIND PACE — 13.1% vs 35.7%",
    recommendation: "Need 2.4x acceleration. Current pace projects 21.6% completion (38/176 pts). Sprint is tracking to complete less than S3.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX — 29% vs 60% target",
    recommendation: "Severely under-allocated. Even recategorizing generously, ARTEMIS would reach ~40-45%. Sprint scope adjustment needed.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-19 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31. No renewal deal tracked in Monday.com. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "Q1 Weighted Pipeline DOWN 21%",
    recommendation: "$1.18M to $929K. Deals slipping from Q1. Review with Steve.",
    priority: "critical"
  },
  {
    issue: "Stale Items (4)",
    recommendation: "BACK-1299 stale 12 days IP (Ivan Peev). BACK-1918, BACK-1805, BACK-1792 all stale 5 days in CR.",
    priority: "high"
  }
];

// Baseline comparison from Feb 13 to Feb 18
export const baselineComparison = {
  baselineDate: "February 13, 2026",
  currentDate: "February 18, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S4 Day 1", current: "S4 Day 5", delta: "+5 days", trend: "progressing" },
    { metric: "Tickets", baseline: 61, current: 70, delta: "+9", trend: "scope increased" },
    { metric: "Points", baseline: 120, current: 176, delta: "+56", trend: "scope increased" },
    { metric: "Completion", baseline: "0%", current: "13.1%", delta: "+13.1%", trend: "behind pace" },
    { metric: "Blocked (sprint)", baseline: 2, current: 2, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 40, current: 29, delta: "-11%", trend: "worsened" },
    { metric: "Unassigned", baseline: 40, current: 32, delta: "-8", trend: "improved" },
    { metric: "Health", baseline: "RED", current: "YELLOW-RED", delta: "Slight improvement", trend: "mixed" }
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
    id: '2026-S4',
    completionRate: 17.1,
    pointsCompletionRate: 13.1,
    daysRemaining: 9,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S5',
    totalTickets: 30,
    totalPoints: 8,
    assigned: 30,
    unassigned: 0,
    unassignedPercent: 0,
    missingEstimatesPercent: 93.3,
    readinessStatus: 'READY'
  },
  actionNeeded: 'S4 Day 5 — 13.1% complete vs 35.7% expected. 32 unassigned (45.7%). Mercury HITL sprint goal unowned. Colony contract expired (-19 days). ARTEMIS at 29% vs 60% target.'
};

// Work Mix Data - S4 Day 5
export const workMix = {
  artemis: { tickets: 13, points: 51, percent: 29, target: '60%', status: 'below' as const },
  client: { tickets: 20, points: 52, percent: 30, target: '30%', status: 'on-target' as const },
  infrastructure: { tickets: 12, points: 17, percent: 10, target: '10%', status: 'on-target' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 176, completed: 23, rate: 13.1, status: "in_progress" }
];

export const avgVelocity = 134;
