// Work Mix Data - Updated February 9, 2026
// Source: JIRA Extract - Sprint 2026-S3 (Day 11 of 15)

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
    s2Tickets: 28,
    s2Percentage: 28,
    target: "50-60%",
    status: "below",
    color: "#3B82F6" // blue
  },
  {
    category: "Client Work",
    s2Tickets: 55,
    s2Percentage: 53,
    target: "30-35%",
    status: "above",
    color: "#F59E0B" // amber
  },
  {
    category: "Infrastructure",
    s2Tickets: 20,
    s2Percentage: 19,
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

// Client work breakdown - Updated February 9, 2026
export const clientBreakdown: ClientWorkBreakdown[] = [
  { client: "Colony Bank", s2Tickets: 8, s2Points: 30, arrAtRisk: 59000, status: "Allegro integration, extraction feedback, GAP Coverage. BACK-1863 BLOCKED." },
  { client: "Broadridge/Accenture", s2Tickets: 4, s2Points: 7, arrAtRisk: 1264000, status: "QA exception (Done), cc response (IP), ACN updates (Done)" },
  { client: "DTCC", s2Tickets: 3, s2Points: 8, arrAtRisk: 1850000, status: "BACK-1603 SFDC sync (To Do), Deep Pilot groups (CICD)" },
  { client: "CTC", s2Tickets: 1, s2Points: 3, arrAtRisk: 0, status: "BACK-1901 Reconciliation Output (Done)" },
  { client: "BBVA", s2Tickets: 2, s2Points: 0, arrAtRisk: 367000, status: "BACK-1530/1532 Mercury schemas (To Do, unassigned)" },
  { client: "Pentest/Security", s2Tickets: 6, s2Points: 0, arrAtRisk: 0, status: "SC-326 through SC-331 — All Critical, unassigned (P0)" }
];

export const workMixSummary = {
  totalTickets: 109,
  totalPoints: 209,
  artemisPercentage: 28,
  artemisTarget: 55, // midpoint of 50-60%
  clientPercentage: 53,
  clientTarget: 32.5, // midpoint of 30-35%
  infrastructurePercentage: 19,
  infrastructureTarget: 12.5, // midpoint of 10-15%
  gap: {
    artemis: -27, // 28 - 55 (significant gap)
    client: 20.5 // 53 - 32.5 (well above target)
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
