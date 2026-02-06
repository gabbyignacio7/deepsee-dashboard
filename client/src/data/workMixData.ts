// Work Mix Data - Updated February 6, 2026
// Source: JIRA Extract - Sprint 2026-S3 (Day 7 of 14)

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
    s2Tickets: 29,
    s2Percentage: 27,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 47,
    s2Percentage: 43,
    target: "30-35%",
    status: "above",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 20,
    s2Percentage: 18,
    target: "10-15%",
    status: "above",
    color: "#10B981" // green
  },
  {
    category: "Bug Fixes/Tech Debt",
    s2Tickets: 13,
    s2Percentage: 12,
    target: "-",
    status: "on-target",
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

// Client work breakdown - Updated February 6, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "Broadridge", s2Tickets: 5, s2Points: 8, arrAtRisk: 1000000, status: "DeepRecon enhancements, 1 blocked (UI-743)" },
  { client: "Accenture", s2Tickets: 4, s2Points: 5, arrAtRisk: 264000, status: "Response size optimization, DeepPilot integration" },
  { client: "DTCC", s2Tickets: 3, s2Points: 11, arrAtRisk: 1850000, status: "ELA contracting — 37 days overdue" },
  { client: "Colony Bank", s2Tickets: 4, s2Points: 6, arrAtRisk: 59000, status: "HMDA/CRA, Allegro validation (1 blocked)" },
  { client: "BBVA", s2Tickets: 2, s2Points: 3, arrAtRisk: 367000, status: "Mercury Extraction reconciliation" },
  { client: "Sunwest Bank", s2Tickets: 2, s2Points: 0, arrAtRisk: 0, status: "Active tickets" }
];

export const workMixSummary = {
  totalTickets: 109,
  totalPoints: 210,
  artemisPercentage: 27,
  artemisTarget: 55, // midpoint of 50-60%
  clientPercentage: 43,
  clientTarget: 32.5, // midpoint of 30-35%
  infrastructurePercentage: 18,
  infrastructureTarget: 12.5, // midpoint of 10-15%
  gap: {
    artemis: -28, // 27 - 55 (significant gap)
    client: 10.5 // 43 - 32.5 (above target)
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
