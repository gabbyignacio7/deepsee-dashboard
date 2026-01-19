// Stage Funnel Data - Updated January 18, 2026
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
  {
    name: "Qualified Lead/Discovery",
    dealARR: 11250000,
    probability: 5,
    weightedValue: 225300,
    conversionPct: 60,
    color: "#E5E7EB"  // gray
  },
  {
    name: "Problem Validation",
    dealARR: 6750000,
    probability: 10,
    weightedValue: 119100,
    conversionPct: 82.3,
    color: "#DBEAFE"  // light blue
  },
  {
    name: "Solution Fit/Technical",
    dealARR: 5550000,
    probability: 25,
    weightedValue: 392250,
    conversionPct: 71.8,
    color: "#93C5FD"  // blue
  },
  {
    name: "Business Case & Champion",
    dealARR: 3990000,
    probability: 40,
    weightedValue: 718400,
    conversionPct: 54.9,
    color: "#60A5FA"  // darker blue
  },
  {
    name: "Commercial Alignment",
    dealARR: 2190000,
    probability: 60,
    weightedValue: 204000,
    conversionPct: 84.5,
    color: "#3B82F6"  // primary blue
  },
  {
    name: "Contracting & Close",
    dealARR: 1850000,
    probability: 80,
    weightedValue: 1480000,  // $1.85M * 80%
    conversionPct: 100,
    color: "#1D4ED8"  // dark blue
  }
];

export const overallConversionRate = 16.4;
export const avgSalesCycle = 259; // days
