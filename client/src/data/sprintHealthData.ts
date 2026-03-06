// Sprint Health Data - Updated March 6, 2026 at 1:36 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 7 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "40.0% (Day 7)", target: "50.0% expected", status: "yellow", detail: "40.0% complete vs 50.0% expected at Day 7. 6 tickets Done overnight. Closing gap." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "9 items (1 stale CR + 2 stale IP)", target: "GREEN <5", status: "yellow", detail: "9 items in CR. 1 stale CR (BACK-1993 7d) + 2 stale IP (UI-780 7d, CI-946 7d). Ivan's 4 items moved IP->CR." },
  { metric: "Unassigned Tickets", s2Value: "22 of 80", target: "GREEN <5, RED >15", status: "red", detail: "27.5% of sprint unassigned -- improved from 30.6%. Denominator grew (72->80)." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "10.0%", target: "60%", status: "red", detail: "ARTEMIS at 10.0% vs 60% target -- 8 tickets, still severely under-allocated." },
  { metric: "Engineer Capacity", s2Value: "~13.2 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). 13.2 avg pts/engineer. Ivan 21pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "3 items", target: "GREEN 0", status: "yellow", detail: "1 stale CR (BACK-1993 7d) + 2 stale IP (UI-780 7d, CI-946 7d). Down from 6 -- Ivan moved 4 items to CR." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "yellow", detail: "S6 not yet planned (7 days to sprint start). Grooming must begin immediately." }
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

// Sprint health recommendations - Updated March 6, 2026
export const healthRecommendations = [
  {
    issue: "22 UNASSIGNED TICKETS (27.5%)",
    recommendation: "22 of 80 tickets unassigned (27.5%). Trending down from 30.6%. Denominator grew with 8 new CI tickets.",
    priority: "critical"
  },
  {
    issue: "SPRINT S5 DAY 7 -- 40.0% vs 50.0%",
    recommendation: "S5 Day 7/14. 78/202 pts complete (38.6%). Strong velocity continues -- 6 Done overnight. 10% behind pace.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 10.0% vs 60% target",
    recommendation: "At 10.0% vs 60% target. Dropped slightly as new CI tickets diluted mix. Must address in S6 planning.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-34 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-34 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "3 STALE ITEMS (1 CR + 2 IP)",
    recommendation: "3 stale items (down from 6). 2 IP (UI-780 7d, CI-946 7d) + 1 CR (BACK-1993 7d unassigned). Ivan cleared 4 stale IPs.",
    priority: "high"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 402 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "February 27, 2026",
  currentDate: "March 6, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 5", current: "S5 Day 7", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 72, current: 80, delta: "+8", trend: "scope added" },
    { metric: "Points", baseline: 190, current: 202, delta: "+12", trend: "scope added" },
    { metric: "Completion", baseline: "36.1%", current: "40.0%", delta: "+3.9%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 11.1, current: 10.0, delta: "-1.1%", trend: "declining" },
    { metric: "Unassigned", baseline: 22, current: 22, delta: "0", trend: "stable" },
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
    id: '2026-S5',
    completionRate: 40.0,
    pointsCompletionRate: 38.6,
    daysRemaining: 7,
    status: 'YELLOW'
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
  actionNeeded: 'S5 Day 7 -- 36.1% complete vs 42.9% expected. 22 unassigned (30.6%). 6 stale items. ARTEMIS at 11.1% vs 60% target. Colony expired (-33d). BetaNxt expired.'
};

// Work Mix Data - S5 Day 7
export const workMix = {
  artemis: { tickets: 8, points: 18, percent: 10, target: '60%', status: 'below' as const },
  client: { tickets: 12, points: 33, percent: 15, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 3, points: 7, percent: 4, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 202, completed: 78, rate: 38.6, status: "in_progress" }
];

export const avgVelocity = 134;
