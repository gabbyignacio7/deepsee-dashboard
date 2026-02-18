// Work Mix Data - Updated February 18, 2026
// Source: JIRA Extract - Sprint 2026-S4 (Day 5 of 14)

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
    s2Tickets: 13,
    s2Percentage: 29,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 20,
    s2Percentage: 30,
    target: "30-35%",
    status: "on-target",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 12,
    s2Percentage: 10,
    target: "10-15%",
    status: "on-target",
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

// Client work breakdown - Updated February 18, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "CTC/BBVA/Mercury", s2Tickets: 11, s2Points: 29, arrAtRisk: 878000, status: "BACK-1938 IP, 8 Mercury HITL unassigned — sprint goal at risk" },
  { client: "Colony Bank", s2Tickets: 3, s2Points: 16, arrAtRisk: 59000, status: "Contract EXPIRED Jan 31 (-19 days). BACK-1965 IP, BACK-1918 CR (5d stale)." },
  { client: "Broadridge/Accenture", s2Tickets: 3, s2Points: 2, arrAtRisk: 1000000, status: "UI-743 Blocked (unassigned), UI-755 Done" },
  { client: "DTCC", s2Tickets: 2, s2Points: 5, arrAtRisk: 1850000, status: "BACK-1603 DONE Feb 18 — $1.85M close imminent" },
  { client: "Sunwest", s2Tickets: 2, s2Points: 5, arrAtRisk: 0, status: "BACK-1532/1653 Mercury extraction fine-tuning. Both unassigned." },
  { client: "Accenture", s2Tickets: 1, s2Points: 0, arrAtRisk: 225000, status: "BACK-1928 blank fields bug, To Do, unassigned" }
];

export const workMixSummary = {
  totalTickets: 70,
  totalPoints: 176,
  artemisPercentage: 29,
  artemisTarget: 60,
  clientPercentage: 30,
  clientTarget: 30,
  infrastructurePercentage: 10,
  infrastructureTarget: 10,
  gap: {
    artemis: -31, // 29 - 60 (SEVERELY UNDER)
    client: 0 // 30 - 30 (ON TARGET)
  }
};

// Get work mix chart data for Recharts
export function getWorkMixChartData() {
  return workMix.map(item => ({
    name: item.category,
    actual: item.s2Percentage,
    target: item.category === 'ARTEMIS/Platform' ? 60 :
            item.category === 'Client Work' ? 30 :
            item.category === 'Infrastructure' ? 10 : 0,
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
