// Segment & Agent Family Data - Updated February 9, 2026
// Source: Monday.com CRM

export interface Segment {
  name: string;
  dealCount: number;
  totalARR: number;
  color: string;
}

export const segments: Segment[] = [
  { name: "Cap Markets", dealCount: 55, totalARR: 8200000, color: "#3B82F6" },
  { name: "Fin Market Infrastructure", dealCount: 6, totalARR: 4190000, color: "#10B981" },
  { name: "Banking", dealCount: 22, totalARR: 1100000, color: "#F59E0B" },
  { name: "Insurance", dealCount: 1, totalARR: 0, color: "#9CA3AF" }
];

export interface AgentFamily {
  name: string;
  totalARR: number;
  color: string;
}

export const agentFamilies: AgentFamily[] = [
  { name: "ELA", totalARR: 2850000, color: "#8B5CF6" },
  { name: "Reconciliation", totalARR: 1348000, color: "#10B981" },
  { name: "Comms", totalARR: 1027000, color: "#3B82F6" },
  { name: "Operations", totalARR: 986000, color: "#F59E0B" },
  { name: "Settlement", totalARR: 313000, color: "#EF4444" }
];
