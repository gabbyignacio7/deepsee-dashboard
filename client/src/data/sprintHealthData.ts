// Sprint Health Data - Updated February 25, 2026 at 8:28 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 Day 12 (Active)

export interface HealthMetric {
  metric: string;
  s2Value: number | string;
  target: string;
  status: "green" | "yellow" | "red";
  detail?: string;
}

export const sprintHealth: HealthMetric[] = [
  { metric: "Sprint Progress", s2Value: "35.8% (Day 12)", target: "85.7% expected", status: "red", detail: "35.8% complete vs 85.7% expected at Day 12. Sprint ending in 2 days." },
  { metric: "Blocked Items", s2Value: 0, target: "GREEN 0-2", status: "green", detail: "0 sprint blocked items. UI-740 still in backlog blocked." },
  { metric: "Code Review Queue", s2Value: "6 items (0 stale)", target: "GREEN <5", status: "yellow", detail: "6 items in CR, 0 stale. BACK-1918/1792/1805 now Done." },
  { metric: "Unassigned Tickets", s2Value: "23 of 99", target: "GREEN <5, RED >15", status: "red", detail: "23.2% of sprint unassigned -- improved from 32.9%" },
  { metric: "Work Mix (ARTEMIS %)", s2Value: "10.1%", target: "60%", status: "red", detail: "ARTEMIS at 10.1% vs 60% target -- severely under-allocated" },
  { metric: "Engineer Capacity", s2Value: "~12.9 avg", target: "GREEN 12-18", status: "green", detail: "2 engineers missing (Loris, Karolina). 12.9 avg pts/engineer. Owen 25pts, Ivan 25pts highest." },
  { metric: "Stale Items", s2Value: "4 items", target: "GREEN 0", status: "red", detail: "4 stale In Progress (>5 days), 0 stale CR" },
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

// Sprint health recommendations - Updated February 25, 2026
export const healthRecommendations = [
  {
    issue: "23 UNASSIGNED TICKETS (23.2%)",
    recommendation: "Improved from 32.9%. Mercury HITL sprint goal tickets still unowned. Sprint ends Feb 27.",
    priority: "critical"
  },
  {
    issue: "SPRINT BEHIND PACE -- 35.8% vs 85.7%",
    recommendation: "Sprint ends in 2 days. 81/226 pts complete (35.8%). Major scope risk -- 145 pts remaining.",
    priority: "critical"
  },
  {
    issue: "ARTEMIS WORK MIX -- 10.1% vs 60% target",
    recommendation: "Worsened from 13.4% to 10.1%. Severely under-allocated. Sprint scope adjustment urgently needed.",
    priority: "critical"
  },
  {
    issue: "Colony Bank Contract EXPIRED (-25 days)",
    recommendation: "$59K ARR at risk. Contract expired Jan 31 (-25 days). No renewal deal tracked. Immediate outreach needed.",
    priority: "critical"
  },
  {
    issue: "4 STALE ITEMS (4 IP + 0 CR)",
    recommendation: "BACK-1911 11d, CI-935 11d, BACK-1862 11d, CI-936 8d. Stale CR cleared -- BACK-1918/1792/1805 now Done.",
    priority: "critical"
  },
  {
    issue: "BetaNxt $340K Close Date EXPIRED",
    recommendation: "Close date was Feb 20. 390 days in pipeline at Commercial Alignment stage. Immediate follow-up needed.",
    priority: "high"
  }
];

// Baseline comparison from Feb 22 to Feb 25
export const baselineComparison = {
  baselineDate: "February 22, 2026",
  currentDate: "February 25, 2026",
  metrics: [
    { metric: "Sprint", baseline: "S4 Day 9", current: "S4 Day 12", delta: "+3 days", trend: "progressing" },
    { metric: "Tickets", baseline: 82, current: 99, delta: "+17", trend: "scope increased" },
    { metric: "Points", baseline: 197, current: 226, delta: "+29", trend: "scope increased" },
    { metric: "Completion", baseline: "15.2%", current: "35.8%", delta: "+20.6%", trend: "improving" },
    { metric: "Blocked (sprint)", baseline: 1, current: 0, delta: "-1", trend: "improved" },
    { metric: "ARTEMIS %", baseline: 13.4, current: 10.1, delta: "-3.3%", trend: "worsened" },
    { metric: "Unassigned", baseline: 27, current: 23, delta: "-4", trend: "improved" },
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
    completionRate: 38.4,
    pointsCompletionRate: 35.8,
    daysRemaining: 2,
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
  actionNeeded: 'S4 Day 12 -- 35.8% complete vs 85.7% expected. 23 unassigned (23.2%). 4 stale items. ARTEMIS at 10.1% vs 60% target. Colony expired (-25d). BetaNxt close date expired.'
};

// Work Mix Data - S4 Day 12
export const workMix = {
  artemis: { tickets: 10, points: 23, percent: 10, target: '60%', status: 'below' as const },
  client: { tickets: 19, points: 44, percent: 19, target: '30%', status: 'below' as const },
  infrastructure: { tickets: 5, points: 12, percent: 5, target: '10%', status: 'below' as const }
};

// Velocity History for comparison
export const velocityHistory = [
  { sprint: "2026-S1", committed: 131, completed: 129, rate: 98, status: "completed" },
  { sprint: "2026-S2", committed: 105, completed: 132, rate: 126, status: "completed" },
  { sprint: "2026-S3", committed: 101, completed: 141, rate: 140, status: "completed" },
  { sprint: "2026-S4", committed: 226, completed: 81, rate: 35.8, status: "in_progress" }
];

export const avgVelocity = 134;
