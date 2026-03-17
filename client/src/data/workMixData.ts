// Work Mix Data - Updated March 17, 2026
// Source: JIRA Extract - Sprint 2026-S6 (Day 5 of 15)

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
    s2Tickets: 4,
    s2Percentage: 4,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 8,
    s2Percentage: 8,
    target: "30-35%",
    status: "below",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 3,
    s2Percentage: 3,
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

// Client work breakdown - Updated March 17, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "CTC/BBVA", s2Tickets: 3, s2Points: 0, arrAtRisk: 878000, status: "BACK-2028 CTC extraction DONE. BACK-2051 extraction issue IP. BBVA email processing sprint goal." },
  { client: "Colony Bank", s2Tickets: 1, s2Points: 0, arrAtRisk: 59000, status: "Contract EXPIRED Jan 31 (-45 days). Extraction sprint goal. BACK-1918 DONE." },
  { client: "Sunwest", s2Tickets: 1, s2Points: 2, arrAtRisk: 0, status: "BACK-2023 custom analyzers IP (Brandon). Treasury onboarding active." },
  { client: "DTCC", s2Tickets: 1, s2Points: 0, arrAtRisk: 1850000, status: "BACK-1603 DONE. $1.85M ELA push to close." },
  { client: "JPM", s2Tickets: 1, s2Points: 0, arrAtRisk: 540000, status: "BACK-2047 Missing work items, ToDo." },
  { client: "Broadridge", s2Tickets: 1, s2Points: 3, arrAtRisk: 1000000, status: "UI-800 API requirements spec (Owen). UI-743 DONE." }
];

export const workMixSummary = {
  totalTickets: 100,
  totalPoints: 84,
  artemisPercentage: 4,
  artemisTarget: 60,
  clientPercentage: 8,
  clientTarget: 30,
  infrastructurePercentage: 3,
  infrastructureTarget: 10,
  gap: {
    artemis: -56, // 4 - 60 (SEVERELY UNDER -- worst yet)
    client: -22 // 8 - 30 (UNDER)
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
