// Sprint Health Data - Updated March 17, 2026 at 10:15 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S6 Day 5 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "10.0% (Day 5)", target: "33.3% expected", status: "red", detail: "10.0% complete vs 33.3% expected at Day 5. 23.3% behind pace. Early sprint -- team ramping up." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked (32 days)." },
  { metric: "Code Review Queue", s2Value: "3 items (0 stale)", target: "GREEN <5", status: "green", detail: "3 CR items (BACK-1326, BACK-1840, BACK-1839). None stale yet. Massive improvement from 11 stale items in S5." },
  { metric: "Unassigned Tickets", s2Value: "72 of 100", target: "GREEN <5, RED >15", status: "red", detail: "72% unassigned. Early sprint typical but needs assignment push this week." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "4.0%", target: "60%", status: "red", detail: "ARTEMIS at 4.0% vs 60% target -- only 4 tickets. Worst ratio yet." },
  { metric: "Engineer Capacity", s2Value: "~6.0 avg", target: "GREEN 12-18", status: "yellow", detail: "5 engineers with 0 sprint tickets (Jeff, Chad, Konnor, Loris, Karolina). Early sprint -- many tickets unassigned." },
  { metric: "Stale Items", s2Value: "1 item", target: "GREEN 0", status: "yellow", detail: "BACK-1796 Allegro password refresh (17d, Kannal). Down from 11 -- MASSIVE improvement." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "green", detail: "S7 not due for 10 days. Focus on S6 execution." }
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

// Sprint health recommendations - Updated March 17, 2026
export const healthRecommendations = [
  { issue: "72 UNASSIGNED TICKETS (72%)", recommendation: "Early sprint typical but needs urgent assignment push. Sprint goals: Colony/Sunwest/CTC extraction + SOC 2.", priority: "critical" },
  { issue: "ARTEMIS WORK MIX -- 4.0% vs 60%", recommendation: "Worst ratio yet at 4%. Only 4 ARTEMIS tickets in S6. Must add ARTEMIS backlog items.", priority: "critical" },
  { issue: "STALE ITEMS DOWN 11 -> 1", recommendation: "BACK-1796 Allegro password (17d, Kannal) only stale item. S5 stale backlog fully cleared -- big win.", priority: "high" },
  { issue: "COLONY BANK EXPIRED -45 DAYS", recommendation: "BACK-1918 DONE, BACK-2028 CTC extraction DONE. Colony contract expired 45 days. Push renewal now.", priority: "critical" },
  { issue: "SPRINT PROGRESS 10% vs 33.3%", recommendation: "Early sprint ramp-up expected. 10 Done (21 pts) of 100 tickets (84 pts). 10 days remaining.", priority: "high" },
  { issue: "5 ENGINEERS WITH 0 SPRINT TICKETS", recommendation: "Jeff, Chad, Konnor, Loris, Karolina have no S6 sprint tickets. Assignment needed.", priority: "high" }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "March 10, 2026",
  currentDate: "March 17, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 11", current: "S6 Day 5", delta: "NEW SPRINT", trend: "transitioned" },
    { metric: "Tickets", baseline: 92, current: 100, delta: "+8", trend: "new sprint" },
    { metric: "Points", baseline: 222, current: 84, delta: "-138", trend: "new sprint (many unestimated)" },
    { metric: "Completion", baseline: "45.7%", current: "10.0%", delta: "RESET", trend: "new sprint" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 9.8, current: 4.0, delta: "-5.8%", trend: "worsened" },
    { metric: "Stale Items", baseline: 11, current: 1, delta: "-10", trend: "massive improvement" },
    { metric: "Health", baseline: "RED", current: "YELLOW", delta: "Improved", trend: "improving" }
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
    completionRate: 10.0,
    pointsCompletionRate: 25.0,
    daysRemaining: 10,
    status: 'YELLOW'
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
  actionNeeded: 'S6 Day 5 -- 10% vs 33.3%. 72 unassigned (72%). 1 stale (down from 11!). ARTEMIS 4%. Colony -45d. Goal: Colony/Sunwest/CTC/BBVA/SOC2.'
};

// Work Mix Data - S6 Day 5
export const workMix = {
  artemis: { tickets: 4, points: 5, percent: 4, target: '60%', status: 'below' as const },
  client: { tickets: 8, points: 10, percent: 8, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 3, points: 6, percent: 3, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 222, completed: 130, rate: 58.6, status: "completed" },
  { sprint: "2026-S6", committed: 84, completed: 21, rate: 25.0, status: "in_progress" }
];

export const avgVelocity = 129;
