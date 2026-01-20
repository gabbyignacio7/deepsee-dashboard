// Work Mix Data - Updated January 20, 2026
// Source: JIRA Extract - Sprint 2026-S2

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
    s2Tickets: 17,
    s2Percentage: 23,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 22,
    s2Percentage: 31,
    target: "30-35%",
    status: "on-target",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 10,
    s2Percentage: 14,
    target: "10-15%",
    status: "on-target",
    color: "#10B981" // green
  },
  {
    category: "Bug Fixes/Tech Debt",
    s2Tickets: 21,
    s2Percentage: 30,
    target: "-",
    status: "above",
    color: "#6B7280" // gray
  }
];

export interface ClientWorkBreakdown {
  client: string;
  s2Tickets: number;
  s2Points: number;
  arrAtRisk: number;
  status?: string;
}

// Client work breakdown - Updated January 20, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "Accenture", s2Tickets: 4, s2Points: 0, arrAtRisk: 225000, status: "UI improvements (30% complete, 1 blocked)" },
  { client: "Broadridge", s2Tickets: 3, s2Points: 0, arrAtRisk: 500000, status: "DeepRecon enhancements" },
  { client: "DTCC", s2Tickets: 3, s2Points: 11, arrAtRisk: 416200, status: "Scalability (0%), Sync blocked" },
  { client: "Colony Bank", s2Tickets: 3, s2Points: 0, arrAtRisk: 59000, status: "HMDA/CRA ongoing" },
  { client: "BBVA", s2Tickets: 2, s2Points: 0, arrAtRisk: 325000, status: "Mercury Extraction" },
  { client: "Sunwest Bank", s2Tickets: 2, s2Points: 0, arrAtRisk: 0, status: "Active tickets" }
];

export const workMixSummary = {
  totalTickets: 70,
  totalPoints: 137,
  artemisPercentage: 23,
  artemisTarget: 55, // midpoint of 50-60%
  clientPercentage: 31,
  clientTarget: 32.5, // midpoint of 30-35%
  infrastructurePercentage: 14,
  infrastructureTarget: 12.5, // midpoint of 10-15%
  gap: {
    artemis: -32, // 23 - 55 (significant gap)
    client: -1.5 // 31 - 32.5 (on target)
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
