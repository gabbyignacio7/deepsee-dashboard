// Segment & Agent Family Data - Updated January 18, 2026
// Source: Monday.com CRM

export interface Segment {
  name: string;
  dealCount: number;
  totalARR: number;
  color: string;
}

export const segments: Segment[] = [
  {
    name: "Cap Markets",
    dealCount: 37,
    totalARR: 6894000,
    color: "#3B82F6"  // blue
  },
  {
    name: "Fin Market Infrastructure",
    dealCount: 4,
    totalARR: 3440000,
    color: "#10B981"  // green
  },
  {
    name: "Banking",
    dealCount: 16,
    totalARR: 918000,
    color: "#F59E0B"  // amber
  }
];

export interface AgentFamily {
  name: string;
  totalARR: number;
  color: string;
}

export const agentFamilies: AgentFamily[] = [
  { name: "Comms", totalARR: 3518000, color: "#3B82F6" },
  { name: "ELA", totalARR: 2850000, color: "#8B5CF6" },
  { name: "Reconciliation", totalARR: 2377000, color: "#10B981" },
  { name: "Operations", totalARR: 1524000, color: "#F59E0B" },
  { name: "Settlement", totalARR: 313000, color: "#EF4444" }
];
