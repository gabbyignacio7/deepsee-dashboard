// Sprint Health Data - Updated March 10, 2026 at 12:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 Day 11 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "45.7% (Day 11)", target: "84.6% expected", status: "red", detail: "45.7% complete vs 84.6% expected at Day 11. 38.9% behind pace with only 3 days remaining." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked. UI-794 (Colony HMDA) blocked, assigned to Karolina." },
  { metric: "Code Review Queue", s2Value: "8 items (7 stale CR + 4 stale IP)", target: "GREEN <5", status: "red", detail: "8 CR items. 7 stale CR (BACK-1993 11d, BACK-2011 6d, BACK-1980 5d, Ivan 4x4d) + 4 stale IP (UI-780 11d, CI-946 10d, CI-937 8d, BACK-1835 6d)." },
  { metric: "Unassigned Tickets", s2Value: "24 of 92", target: "GREEN <5, RED >15", status: "red", detail: "26.1% of sprint unassigned -- still far above 5% target." },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "9.8%", target: "60%", status: "red", detail: "ARTEMIS at 9.8% vs 60% target -- 9 tickets, continuing to decline." },
  { metric: "Engineer Capacity", s2Value: "~13.1 avg", target: "GREEN 12-18", status: "yellow", detail: "2 engineers missing (Loris, Karolina). Ivan 26pts, Jeff 22pts, Aleksander 19pts highest." },
  { metric: "Stale Items", s2Value: "11 items", target: "GREEN 0", status: "red", detail: "4 stale IP (UI-780 11d, CI-946 10d, CI-937 8d, BACK-1835 6d) + 7 stale CR (BACK-1993 11d, BACK-2011 6d, BACK-1980 5d, Ivan 4x4d). Nearly doubled from 6." },
  { metric: "Next Sprint Readiness", s2Value: "N/A", target: "GREEN >80%", status: "red", detail: "S6 not yet planned -- only 3 days to sprint start. Grooming must happen immediately." }
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

// Sprint health recommendations - Updated March 10, 2026
export const healthRecommendations = [
  { issue: "SPRINT S5 DAY 11 -- 45.7% vs 84.6% PACE", recommendation: "S5 Day 11/14. 97/222 pts complete (43.7%). 125 pts in 3 days = 42 pts/day needed.", priority: "critical" },
  { issue: "11 STALE ITEMS (4 IP + 7 CR) -- NEARLY DOUBLED AGAIN", recommendation: "Stale nearly doubled from 6 to 11. Ivan 4 CRs now stale. BACK-1835 new stale IP. BACK-1993 at 11d unassigned.", priority: "critical" },
  { issue: "S6 PLANNING NOT STARTED -- 3 DAYS LEFT", recommendation: "Next sprint starts Mar 13. Zero tickets planned. Grooming must happen this week.", priority: "critical" },
  { issue: "24 UNASSIGNED TICKETS (26.1%)", recommendation: "24 of 92 unassigned. With 3 days left, unassigned tickets are likely rollovers.", priority: "critical" },
  { issue: "ARTEMIS WORK MIX -- 9.8% vs 60%", recommendation: "At 9.8% vs 60% target. S6 planning MUST prioritize ARTEMIS.", priority: "critical" },
  { issue: "COLONY GAP COVERAGE DONE -- PUSH RENEWAL", recommendation: "BACK-1918 completed! Key milestone for renewal conversation. Colony expired -38d.", priority: "high" }
];

// Baseline comparison from Feb 27 to Mar 2
export const baselineComparison = {
  baselineDate: "February 27, 2026",
  currentDate: "March 10, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S5 Day 10", current: "S5 Day 11", delta: "+1 day", trend: "progressing" },
    { metric: "Tickets", baseline: 87, current: 92, delta: "+5", trend: "scope added" },
    { metric: "Points", baseline: 213, current: 222, delta: "+9", trend: "scope added" },
    { metric: "Completion", baseline: "43.7%", current: "45.7%", delta: "+2.0%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 0, current: 0, delta: "0", trend: "stable" },
    { metric: "ARTEMIS %", baseline: 9.2, current: 9.8, delta: "+0.6%", trend: "stable" },
    { metric: "Unassigned", baseline: 23, current: 24, delta: "+1", trend: "worsened" },
    { metric: "Health", baseline: "RED", current: "RED", delta: "Unchanged", trend: "stable" }
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
    completionRate: 45.7,
    pointsCompletionRate: 43.7,
    daysRemaining: 3,
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
  actionNeeded: 'S5 Day 11 -- 45.7% vs 84.6%. 24 unassigned (26.1%). 11 stale (nearly doubled). ARTEMIS 9.8%. Colony -38d. S6 NOT STARTED (3 days).'
};

// Work Mix Data - S5 Day 11
export const workMix = {
  artemis: { tickets: 9, points: 20, percent: 10, target: '60%', status: 'below' as const },
  client: { tickets: 16, points: 42, percent: 17, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 3, points: 7, percent: 3, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 252, completed: 115, rate: 45.6, status: "completed" },
  { sprint: "2026-S5", committed: 222, completed: 97, rate: 43.7, status: "in_progress" }
];

export const avgVelocity = 134;
