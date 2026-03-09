// Sprint Health Data - Updated March 9, 2026 at 12:22 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 10 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "43.7% (Day 10)", target: "71.4% expected", status: "red", detail: "43.7% complete vs 71.4% expected at Day 10. 27.7% behind pace with only 4 days remaining." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked. New: UI-794 (Colony HMDA) blocked, assigned to Karolina." },
  { metric: "Code Review Queue", s2Value: "7 items (3 stale CR + 3 stale IP)", target: "GREEN <5", status: "red", detail: "7 CR items. 3 stale CR (BACK-1993 10d, BACK-2011 5d, BACK-1980 4d) + 3 stale IP (UI-780 10d, CI-946 9d, CI-937 7d)." },
  { metric: "Unassigned Tickets", s2Value: "23 of 87", target: "GREEN <5, RED >15", status: "red", detail: "26.4% of sprint unassigned -- still far above 5% target." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "9.2%", target: "60%", status: "red", detail: "ARTEMIS at 9.2% vs 60% target -- 8 tickets, continuing to decline." },
  { metric: "Engineer Capacity", s2Value: "~12.7 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). Ivan 26pts, Jeff 20pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "6 items", target: "GREEN 0", status: "red", detail: "3 stale IP (UI-780 10d, CI-946 9d, CI-937 7d) + 3 stale CR (BACK-1993 10d, BACK-2011 5d, BACK-1980 4d). Back up from 3." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "red", detail: "S6 not yet planned -- only 4 days to sprint start. Grooming must happen immediately." }
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

// Sprint health recommendations - Updated March 9, 2026
export const healthRecommendations = [
  { issue: "SPRINT S5 DAY 10 -- 43.7% vs 71.4% PACE", recommendation: "S5 Day 10/14. 89/213 pts complete (41.8%). 124 pts in 4 days = 31 pts/day needed.", priority: "critical" },
  { issue: "6 STALE ITEMS (3 IP + 3 CR) -- DOUBLED", recommendation: "Stale doubled from 3 to 6. Lane 2 CRs now stale. CI-937 Jeff stale. BACK-1993 at 10d unassigned.", priority: "critical" },
  { issue: "S6 PLANNING NOT STARTED -- 4 DAYS LEFT", recommendation: "Next sprint starts Mar 13. Zero tickets planned. Grooming must happen immediately.", priority: "critical" },
  { issue: "23 UNASSIGNED TICKETS (26.4%)", recommendation: "23 of 87 unassigned. With 4 days left, unassigned tickets are likely rollovers.", priority: "critical" },
  { issue: "ARTEMIS WORK MIX -- 9.2% vs 60%", recommendation: "At 9.2% vs 60% target. S6 planning MUST prioritize ARTEMIS.", priority: "critical" },
  { issue: "PIPELINE DOWN 84K", recommendation: "3.655M to 3.171M. BetaNxt 40K to 25K but advanced to CC. Colony expired -37d.", priority: "high" }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "February 27, 2026",
  currentDate: "March 9, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 7", current: "S5 Day 10", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 80, current: 87, delta: "+7", trend: "scope added" },
    { metric: "Points", baseline: 202, current: 213, delta: "+11", trend: "scope added" },
    { metric: "Completion", baseline: "40.0%", current: "43.7%", delta: "+3.7%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 10.0, current: 9.2, delta: "-0.8%", trend: "declining" },
    { metric: "Unassigned", baseline: 22, current: 23, delta: "+1", trend: "worsened" },
    { metric: "Health", baseline: "YELLOW", current: "RED", delta: "Worsened", trend: "declining" }
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
    completionRate: 43.7,
    pointsCompletionRate: 41.8,
    daysRemaining: 4,
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
  actionNeeded: 'S5 Day 10 -- 43.7% vs 71.4%. 23 unassigned (26.4%). 6 stale (doubled). ARTEMIS 9.2%. Colony -37d. S6 NOT STARTED (4 days).'
};

// Work Mix Data - S5 Day 10
export const workMix = {
  artemis: { tickets: 8, points: 18, percent: 9, target: '60%', status: 'below' as const },
  client: { tickets: 14, points: 38, percent: 16, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 3, points: 7, percent: 3, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 213, completed: 89, rate: 41.8, status: "in_progress" }
];

export const avgVelocity = 134;
