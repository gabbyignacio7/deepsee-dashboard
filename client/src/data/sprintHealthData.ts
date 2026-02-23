// Sprint Health Data - Updated February 22, 2026 at 7:30 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 Day 9 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "15.2% (Day 9)", target: "64.3% expected", status: "red", detail: "15.2% complete vs 64.3% expected at Day 9. Need 3.1x current burn rate." },
  { metric: "Blocked Items", s2Value: 1, target: "GREEN 0-2", status: "green", detail: "UI-740 (9 days, Matthew Snow). UI-743 unblocked -- moved to To Do." },
  { metric: "Code Review Queue", s2Value: "8 items (2 stale)", target: "GREEN <5", status: "yellow", detail: "8 items in CR, BACK-1918 and BACK-1792 stale 9 days each" },
  { metric: "Unassigned Tickets", s2Value: "27 of 82", target: "GREEN <5, RED >15", status: "red", detail: "32.9% of sprint unassigned -- improved from 45.7% but still high" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "13.4%", target: "60%", status: "red", detail: "ARTEMIS at 13.4% vs 60% target -- severely under-allocated" },
  { metric: "Engineer Capacity", s2Value: "~10.2 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina), Aleksander +8 backlog debt, Darius +7" },
  { metric: "Stale Items", s2Value: "9 items", target: "GREEN 0", status: "red", detail: "7 stale In Progress (>5 days), 2 stale CR (9 days each)" },
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

// Sprint health recommendations - Updated February 22, 2026
export const healthRecommendations = [
  {
    issue: "27 UNASSIGNED TICKETS (32.9%)",
    recommendation: "Improved from 45.7% but still high. Mercury HITL sprint goal tickets still unowned. Sprint assignment session needed.",
    priority: "critical"
  },
  {
    issue: "SPRINT BEHIND PACE -- 15.2% vs 64.3%",
    recommendation: "Need 3.1x acceleration with 5 days remaining. Sprint tracking to complete ~24% (47/197 pts). Major scope risk.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 13.4% vs 60% target",
    recommendation: "Worsened from 29% to 13.4%. Severely under-allocated. Sprint scope adjustment urgently needed.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-23 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31. No renewal deal tracked in Monday.com. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "9 STALE ITEMS (7 IP + 2 CR)",
    recommendation: "BACK-1299 stale 16 days IP (Ivan Peev). 6 more IP items stale 9 days. BACK-1918/1792 stale 9 days in CR.",
    priority: "critical"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 390 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 18 to Feb 22
export const baselineComparison = {
  baselineDate: "February 18, 2026",
  currentDate: "February 22, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S4 Day 5", current: "S4 Day 9", delta: "+4 days", trend: "progressing" },
    { metric: "Tickets", baseline: 70, current: 82, delta: "+12", trend: "scope increased" },
    { metric: "Points", baseline: 176, current: 197, delta: "+21", trend: "scope increased" },
    { metric: "Completion", baseline: "13.1%", current: "15.2%", delta: "+2.1%", trend: "behind pace" },
    { metric: "Blocked (sprint)", baseline: 2, current: 1, delta: "-1", trend: "improved" },
    { metric: "ARTEMIS %", baseline: 29, current: 13.4, delta: "-15.6%", trend: "worsened" },
    { metric: "Unassigned", baseline: 32, current: 27, delta: "-5", trend: "improved" },
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
    id: '2026-S4',
    completionRate: 20.7,
    pointsCompletionRate: 15.2,
    daysRemaining: 5,
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
  actionNeeded: 'S4 Day 9 -- 15.2% complete vs 64.3% expected. 27 unassigned (32.9%). 9 stale items. ARTEMIS at 13.4% vs 60% target. Colony expired (-23d). BetaNxt close date expired.'
};

// Work Mix Data - S4 Day 5
export const workMix = {
  artemis: { tickets: 11, points: 26, percent: 13, target: '60%', status: 'below' as const },
  client: { tickets: 14, points: 34, percent: 17, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 5, points: 14, percent: 6, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 197, completed: 30, rate: 15.2, status: "in_progress" }
];

export const avgVelocity = 134;
