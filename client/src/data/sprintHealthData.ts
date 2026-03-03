// Sprint Health Data - Updated March 3, 2026 at 10:12 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 4 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "15.2% (Day 4)", target: "28.6% expected", status: "red", detail: "15.2% complete vs 28.6% expected at Day 4. Sprint S5 picking up momentum." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "10 items (3 stale CR + 3 stale IP)", target: "GREEN <5", status: "red", detail: "10 items in CR. 3 stale CR + 3 stale IP (BACK-1299/1300/1301/1302/1303/1311 all Ivan Peev)." },
  { metric: "Unassigned Tickets", s2Value: "28 of 67", target: "GREEN <5, RED >15", status: "red", detail: "41.8% of sprint unassigned -- slightly improved from 45.5% but still critical" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "10.4%", target: "60%", status: "red", detail: "ARTEMIS at 10.4% vs 60% target -- severely under-allocated." },
  { metric: "Engineer Capacity", s2Value: "~10.3 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 10.3 avg pts/engineer. Aleksander 24pts, Ivan 21pts highest." },
  { metric: "Stale Items", s2Value: "6 items", target: "GREEN 0", status: "yellow", detail: "3 stale CR + 3 stale IP (all Ivan Peev). BACK-1299/1300/1311 CR, BACK-1301/1302/1303 IP." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned. S5 Day 4 -- focus on current sprint." }
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

// Sprint health recommendations - Updated March 3, 2026
export const healthRecommendations = [
  {
    issue: "28 UNASSIGNED TICKETS (41.8%)",
    recommendation: "28 of 67 tickets unassigned (41.8%). Slightly improved but still critical. Sprint planning ongoing.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 4 -- 15.2% vs 28.6%",
    recommendation: "S5 Day 4/14. 23/154 pts complete (15.2%). Behind pace (28.6% expected). 28 tickets unassigned.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 10.4% vs 60% target",
    recommendation: "At 10.4% vs 60% target. Slightly improved from 9.1% but still severely under-allocated.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-31 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-30 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "6 STALE ITEMS (3 CR + 3 IP)",
    recommendation: "Ivan Peev has 6 stale items: 3 CR (BACK-1299/1300/1311) + 3 IP (BACK-1301/1302/1303). Needs review.",
    priority: "critical"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 390 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "February 27, 2026",
  currentDate: "March 3, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 3", current: "S5 Day 4", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 66, current: 67, delta: "+1", trend: "scope added" },
    { metric: "Points", baseline: 135, current: 154, delta: "+19", trend: "scope added" },
    { metric: "Completion", baseline: "12.9%", current: "15.2%", delta: "+2.3%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 9.1, current: 10.4, delta: "+1.3%", trend: "improved" },
    { metric: "Unassigned", baseline: 30, current: 28, delta: "-2", trend: "improved" },
    { metric: "Health", baseline: "RED", current: "RED", delta: "No change", trend: "stagnant" }
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
    id: '2026-S5',
    completionRate: 13.6,
    pointsCompletionRate: 15.2,
    daysRemaining: 10,
    status: 'RED'
  },
  nextSprint: {
    id: '2026-S6',
    totalTickets: 0,
    totalPoints: 0,
    assigned: 0,
    unassigned: 0,
    unassignedPercent: 0,
    missingEstimatesPercent: 100,
    readinessStatus: 'NOT STARTED'
  },
  actionNeeded: 'S5 Day 4 -- 15.2% complete vs 28.6% expected. 28 unassigned (41.8%). 6 stale items. ARTEMIS at 10.4% vs 60% target. Colony expired (-31d). BetaNxt expired.'
};

// Work Mix Data - S5 Day 4
export const workMix = {
  artemis: { tickets: 7, points: 15, percent: 10, target: '60%', status: 'below' as const },
  client: { tickets: 7, points: 14, percent: 10, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 1, points: 2, percent: 2, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 154, completed: 23, rate: 15.2, status: "in_progress" }
];

export const avgVelocity = 134;
