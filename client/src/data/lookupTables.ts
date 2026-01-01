export const effortLookup: Record<string, number> = {
  'XS': 1,
  'S': 2,
  'M': 4,
  'L': 8,
  'XL': 16
};

export const getEffortWeeks = (tshirtSize: string | null): number => {
  if (!tshirtSize) return 4;
  return effortLookup[tshirtSize.toUpperCase()] || 4;
};

export const PLATFORM_CLIENT_COUNT = 7;

export const PLATFORM_DEFAULT_ARR = 10000000;

export const DEFAULT_CONFIDENCE_LEVEL = 50;

export const confidenceLevels = {
  High: 100,
  Medium: 50,
  Low: 33
};

export const PAYING_CLIENTS = [
  { name: "JP Morgan", arr: 3000000, status: "Renewal" },
  { name: "Accenture", arr: 1200000, status: "Closed Won" },
  { name: "DTCC", arr: 750000, status: "Closed Won" },
  { name: "Broadridge", arr: 500000, status: "Closed Won" },
  { name: "Colony Bank", arr: 200000, status: "Closed Won" },
  { name: "Sunwest Bank", arr: 180000, status: "Contract Negotiation (80%)" }
] as const;

export interface Feature {
  Primary_Client?: string;
  ARR_Amount?: number;
  Replicability_Score?: number;
  Conversion_Probability_Pct?: number;
  Effort_TShirt_Size?: string;
  Confidence_Level?: number;
  Revenue_at_Risk?: boolean | string;
}

export const calculatePriorityScore = (feature: Feature): number => {
  const arr = feature.Primary_Client === 'All' && !feature.ARR_Amount 
    ? PLATFORM_DEFAULT_ARR 
    : Math.abs(feature.ARR_Amount || 0);
  
  const replicability = feature.Replicability_Score || 1;
  const conversion = (feature.Conversion_Probability_Pct || 100) / 100;
  const effortWeeks = getEffortWeeks(feature.Effort_TShirt_Size || null);
  const confidence = (feature.Confidence_Level || DEFAULT_CONFIDENCE_LEVEL) / 100;
  
  const arrMultiplier = (feature.ARR_Amount || 0) < 0 ? 2 : 1;
  
  if (effortWeeks === 0 || confidence === 0) return 0;
  return Math.round((arr * arrMultiplier * replicability * conversion) / (effortWeeks * confidence));
};

export const getPriorityTier = (score: number, revenueAtRisk: boolean | string): string => {
  const isAtRisk = revenueAtRisk === true || revenueAtRisk === "Yes" || revenueAtRisk === "yes";
  if (isAtRisk || score >= 500000) return "Tier 0: Emergency";
  if (score >= 200000) return "Tier 1: Fast Track";
  if (score >= 100000) return "Tier 2: Standard Delivery";
  if (score >= 50000) return "Tier 3: Custom Engagement";
  return "Tier 4: Backlog";
};

export const getClientCount = (primaryClient: string | undefined): number => {
  if (primaryClient === 'All') return PLATFORM_CLIENT_COUNT;
  return 1;
};

export const tierThresholds = {
  tier0: { min: 500000, label: "Tier 0: Emergency", description: "Revenue at risk or extremely high priority" },
  tier1: { min: 200000, label: "Tier 1: Fast Track", description: "High-value, high-urgency features" },
  tier2: { min: 100000, label: "Tier 2: Standard Delivery", description: "Standard priority features" },
  tier3: { min: 50000, label: "Tier 3: Custom Engagement", description: "Lower priority or specialized features" },
  tier4: { min: 0, label: "Tier 4: Backlog", description: "Future consideration" }
};

export const probabilityScale = {
  Introduction: 10,
  Qualification: 30,
  Proposal: 50,
  POC: 55,
  "Contract Negotiation": 80,
  "Closed Won": 100
};

export const dataLastUpdated = "December 2, 2025 9:00 AM EST";
export const dataSource = "2025-11-07-DeepSee-prioritization-dashboard-v3__3_.xlsx";
