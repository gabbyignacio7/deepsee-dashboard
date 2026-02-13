// Work Mix Data - Updated February 13, 2026
// Source: JIRA Extract - Sprint 2026-S4 (Day 1 of 14)

export interface WorkCategory {
  category: string;
  s2Tickets: number;
  s2Percentage: number;
  target: string;
  status: "on-target" | "below" | "above";
  color: string;
}

export const workMix: WorkCategory[] = [
  {
    category: "ARTEMIS/Platform",
    s2Tickets: 10,
    s2Percentage: 40,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 12,
    s2Percentage: 28,
    target: "30-35%",
    status: "on-target",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 14,
    s2Percentage: 20,
    target: "10-15%",
    status: "above",
    color: "#10B981" // green
  }
];

export interface ClientWorkBreakdown {
  client: string;
  s2Tickets: number;
  s2Points: number;
  arrAtRisk: number;
  status?: string;
}

// Client work breakdown - Updated February 13, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "Colony Bank", s2Tickets: 9, s2Points: 21, arrAtRisk: 59000, status: "Contract EXPIRED Jan 31. Mercury HITL (6 tickets) ALL unassigned. BACK-1862 IP." },
  { client: "Broadridge/Accenture", s2Tickets: 3, s2Points: 6, arrAtRisk: 1000000, status: "UI-755 IP (email recipients), UI-743 Blocked (export), BACK-1920 To Do (counterparties)" },
  { client: "DTCC", s2Tickets: 1, s2Points: 0, arrAtRisk: 1850000, status: "BACK-1603 SFDC sync. $1.85M close date TODAY (Feb 13)" },
  { client: "CTC", s2Tickets: 0, s2Points: 0, arrAtRisk: 96000, status: "PoV Not Started. Demo prep needed." },
  { client: "Sunwest", s2Tickets: 2, s2Points: 5, arrAtRisk: 0, status: "BACK-1532/1653 Mercury extraction fine-tuning. Both unassigned." },
  { client: "Pentest/Security", s2Tickets: 6, s2Points: 0, arrAtRisk: 0, status: "SC-326 through SC-331 — All Critical, unassigned" }
];

export const workMixSummary = {
  totalTickets: 61,
  totalPoints: 120,
  artemisPercentage: 40,
  artemisTarget: 55, // midpoint of 50-60%
  clientPercentage: 28,
  clientTarget: 32.5, // midpoint of 30-35%
  infrastructurePercentage: 20,
  infrastructureTarget: 12.5, // midpoint of 10-15%
  gap: {
    artemis: -15, // 40 - 55 (still below but improved)
    client: -4.5 // 28 - 32.5 (slightly below target)
  }
};

// Get work mix chart data for Recharts
export function getWorkMixChartData() {
  return workMix.map(item => ({
    name: item.category,
    actual: item.s2Percentage,
    target: item.category === 'ARTEMIS/Platform' ? 55 :
            item.category === 'Client Work' ? 32.5 :
            item.category === 'Infrastructure' ? 12.5 : 0,
    fill: item.color
  }));
}

// Get client breakdown sorted by ARR at risk
export function getClientsByArrRisk(): ClientWorkBreakdown[] {
  return [...clientBreakdown].sort((a, b) => b.arrAtRisk - a.arrAtRisk);
}

// Get total ARR at risk
export function getTotalArrAtRisk(): number {
  return clientBreakdown.reduce((sum, c) => sum + c.arrAtRisk, 0);
}
