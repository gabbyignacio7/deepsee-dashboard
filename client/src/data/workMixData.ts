// Work Mix Data - Updated February 22, 2026
// Source: JIRA Extract - Sprint 2026-S4 (Day 9 of 14)

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
    s2Tickets: 11,
    s2Percentage: 13,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 14,
    s2Percentage: 17,
    target: "30-35%",
    status: "below",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 5,
    s2Percentage: 6,
    target: "10-15%",
    status: "below",
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

// Client work breakdown - Updated February 22, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "CTC/BBVA/Mercury", s2Tickets: 11, s2Points: 29, arrAtRisk: 878000, status: "BACK-1938 IP, BACK-1921 IP, Mercury HITL tickets unassigned" },
  { client: "Colony Bank", s2Tickets: 3, s2Points: 16, arrAtRisk: 59000, status: "Contract EXPIRED Jan 31 (-23 days). BACK-1965 Done, BACK-1918 CR (stale 9d), BACK-1970 CR." },
  { client: "Broadridge/Accenture", s2Tickets: 2, s2Points: 2, arrAtRisk: 1000000, status: "UI-743 now To Do (was Blocked)" },
  { client: "DTCC", s2Tickets: 2, s2Points: 5, arrAtRisk: 1850000, status: "BACK-1603 DONE Feb 22 — $1.85M close imminent" },
  { client: "Sunwest", s2Tickets: 2, s2Points: 5, arrAtRisk: 0, status: "BACK-1532/1653 Mercury extraction fine-tuning. Both unassigned." },
  { client: "Accenture", s2Tickets: 1, s2Points: 0, arrAtRisk: 225000, status: "BACK-1928 blank fields bug, To Do, unassigned" }
];

export const workMixSummary = {
  totalTickets: 82,
  totalPoints: 197,
  artemisPercentage: 13,
  artemisTarget: 60,
  clientPercentage: 17,
  clientTarget: 30,
  infrastructurePercentage: 6,
  infrastructureTarget: 10,
  gap: {
    artemis: -47, // 13 - 60 (SEVERELY UNDER)
    client: -13 // 17 - 30 (UNDER)
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
