// Stage Funnel Data - Updated February 9, 2026
// Source: Monday.com CRM

export interface Stage {
  name: string;
  dealARR: number;
  probability: number;
  weightedValue: number;
  conversionPct: number;
  color: string;
}

export const stageFunnel: Stage[] = [
  { name: "Qualified Lead/Discovery", dealARR: 3994000, probability: 5, weightedValue: 199700, conversionPct: 45.8, color: "#E5E7EB" },
  { name: "Problem Validation", dealARR: 3728000, probability: 10, weightedValue: 372800, conversionPct: 50.0, color: "#DBEAFE" },
  { name: "Solution Fit/Technical", dealARR: 2118000, probability: 25, weightedValue: 529500, conversionPct: 36.4, color: "#93C5FD" },
  { name: "Business Case & Champion", dealARR: 1919000, probability: 40, weightedValue: 767600, conversionPct: 25.0, color: "#60A5FA" },
  { name: "Commercial Alignment", dealARR: 340000, probability: 60, weightedValue: 204000, conversionPct: 100, color: "#3B82F6" },
  { name: "Contracting & Close", dealARR: 1850000, probability: 80, weightedValue: 1480000, conversionPct: 100, color: "#1D4ED8" }
];

export const overallConversionRate = 14.3;
export const avgSalesCycle = 275; // days
