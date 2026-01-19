// Work Mix Data - Updated January 18, 2026
// Source: JIRA Extract

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
    s2Tickets: 14,
    s2Percentage: 19,
    target: "30-35%",
    status: "below",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 8,
    s2Percentage: 11,
    target: "10-15%",
    status: "on-target",
    color: "#10B981" // green
  },
  {
    category: "Other",
    s2Tickets: 35,
    s2Percentage: 47,
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
}

export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "Broadridge", s2Tickets: 3, s2Points: 0, arrAtRisk: 500000 },
  { client: "Colony Bank", s2Tickets: 3, s2Points: 0, arrAtRisk: 200000 },
  { client: "DTCC", s2Tickets: 3, s2Points: 11, arrAtRisk: 1850000 },
  { client: "BBVA", s2Tickets: 2, s2Points: 0, arrAtRisk: 325000 },
  { client: "CTC", s2Tickets: 2, s2Points: 0, arrAtRisk: 0 },
  { client: "Accenture", s2Tickets: 1, s2Points: 0, arrAtRisk: 0 }
];

export const workMixSummary = {
  totalTickets: 74,
  artemisPercentage: 23,
  artemisTarget: 55, // midpoint of 50-60%
  clientPercentage: 19,
  clientTarget: 32.5, // midpoint of 30-35%
  infrastructurePercentage: 11,
  infrastructureTarget: 12.5, // midpoint of 10-15%
  gap: {
    artemis: -32, // 23 - 55
    client: -13.5 // 19 - 32.5
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
