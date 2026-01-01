import type { Feature, JiraTicket, SalesOpportunity } from "@shared/schema";

/**
 * Board View Metrics Calculation Utilities
 * Calculates executive-level metrics for the 3 strategic pillars:
 * 1. Revenue Growth (How We Make Money)
 * 2. Operational Excellence (How We Don't Lose Money)
 * 3. Innovation (How We Keep Competitive Advantage)
 */

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse Priority_Tier string to number
 */
function parseTier(tier: string): number | null {
  if (!tier || tier === "null" || tier === "n/a") return null;
  const parsed = parseInt(tier, 10);
  return isNaN(parsed) ? null : parsed;
}

// ============================================================================
// PILLAR 1: REVENUE GROWTH METRICS
// ============================================================================

export interface RevenueMetrics {
  totalARR: number;
  newClients: number;
  avgDealSize: number;
  conversionRate: number;
  salesVelocity: number;
  growthRate: number;
  topFeatures: Array<{
    featureId: string;
    featureName: string;
    arrImpact: number;
    tier: number;
  }>;
  revenueByStage: Record<string, number>;
}

export function calculateRevenueMetrics(
  features: Feature[],
  pipeline: SalesOpportunity[]
): RevenueMetrics {
  // Filter revenue-focused features (Tier 0-1, high ARR impact)
  const revenueFeatures = features.filter(f => {
    const tier = parseTier(f.Priority_Tier);
    return tier !== null && tier <= 1;
  });

  // Calculate total ARR from pipeline
  const totalARR = pipeline.reduce((sum, opp) => {
    const arr = parseFloat(String(opp.ARR_Value || 0));
    return sum + (isNaN(arr) ? 0 : arr);
  }, 0);

  // Count unique clients in pipeline
  const uniqueClients = new Set(
    pipeline.map(opp => opp.Account_Name).filter(Boolean)
  );
  const newClients = uniqueClients.size;

  // Calculate average deal size
  const avgDealSize = pipeline.length > 0 ? totalARR / pipeline.length : 0;

  // Calculate conversion rate (Closed Won / Total Opportunities)
  const closedWon = pipeline.filter(
    opp => opp.Stage === "Closed Won"
  ).length;
  const conversionRate =
    pipeline.length > 0 ? (closedWon / pipeline.length) * 100 : 0;

  // Sales velocity (simplified - avg days in pipeline)
  const salesVelocity = 45; // Placeholder - would need date calculations

  // Growth rate (placeholder - would need historical data)
  const growthRate = 15;

  // Top revenue-driving features
  const topFeatures = revenueFeatures
    .map(f => ({
      featureId: f.Feature_ID,
      featureName: f.Feature_Name,
      arrImpact: f.ARR_Amount || 0,
      tier: parseTier(f.Priority_Tier) || 4
    }))
    .sort((a, b) => b.arrImpact - a.arrImpact)
    .slice(0, 10);

  // Revenue by pipeline stage
  const revenueByStage = pipeline.reduce((acc, opp) => {
    const stage = opp.Stage || "Unknown";
    const arr = parseFloat(String(opp.ARR_Value || 0));
    acc[stage] = (acc[stage] || 0) + (isNaN(arr) ? 0 : arr);
    return acc;
  }, {} as Record<string, number>);

  return {
    totalARR,
    newClients,
    avgDealSize,
    conversionRate,
    salesVelocity,
    growthRate,
    topFeatures,
    revenueByStage
  };
}

// ============================================================================
// PILLAR 2: OPERATIONAL EXCELLENCE METRICS
// ============================================================================

export interface OperationsMetrics {
  arrAtRisk: number;
  costAvoidance: number;
  uptime: number;
  mttr: number;
  criticalIssues: number;
  criticalFeatures: Array<{
    featureId: string;
    featureName: string;
    arrImpact: number;
    tier: number;
    status: string;
  }>;
  efficiencyGains: number;
  incidentCount: number;
}

export function calculateOperationsMetrics(
  features: Feature[],
  tickets: JiraTicket[]
): OperationsMetrics {
  // Find Tier 0 features (critical issues)
  const tier0Features = features.filter(f => parseTier(f.Priority_Tier) === 0);
  
  // Calculate ARR at risk from Tier 0 features
  const arrAtRisk = tier0Features.reduce(
    (sum, f) => sum + (f.ARR_Amount || 0),
    0
  );

  // Critical features list
  const criticalFeatures = tier0Features
    .map(f => ({
      featureId: f.Feature_ID,
      featureName: f.Feature_Name,
      arrImpact: f.ARR_Amount || 0,
      tier: parseTier(f.Priority_Tier) || 0,
      status: f.Current_Status || "Unknown"
    }))
    .sort((a, b) => b.arrImpact - a.arrImpact)
    .slice(0, 10);

  // Count critical issues
  const criticalIssues = tier0Features.length;

  // Cost avoidance (efficiency + tech debt prevention)
  const techDebtFeatures = features.filter(
    f =>
      f.Feature_Name?.toLowerCase().includes("tech debt") ||
      f.Feature_Name?.toLowerCase().includes("performance") ||
      f.Feature_Name?.toLowerCase().includes("optimization")
  );
  const costAvoidance = techDebtFeatures.reduce(
    (sum, f) => sum + (f.ARR_Amount || 0) * 0.1,
    0
  );

  // System uptime (placeholder - would need monitoring data)
  const uptime = 99.7;

  // Mean Time to Resolution in hours (placeholder)
  const mttr = 4.5;

  // Efficiency gains (placeholder - engineering hours saved)
  const efficiencyGains = 320;

  // Incident count from blocked tickets
  const blockedTickets = tickets.filter(
    t => t.Status?.toLowerCase() === "blocked"
  );
  const incidentCount = blockedTickets.length;

  return {
    arrAtRisk,
    costAvoidance,
    uptime,
    mttr,
    criticalIssues,
    criticalFeatures,
    efficiencyGains,
    incidentCount
  };
}

// ============================================================================
// PILLAR 3: INNOVATION METRICS
// ============================================================================

export interface InnovationMetrics {
  artemisPercentage: number;
  engineeringWeeks: number;
  strategicFeatures: Array<{
    featureId: string;
    featureName: string;
    category: string;
    completion: number;
  }>;
  rdInvestment: number;
  competitiveAdvantages: string[];
  platformProgress: number;
}

export function calculateInnovationMetrics(
  features: Feature[],
  tickets: JiraTicket[]
): InnovationMetrics {
  // Identify Artemis/strategic platform features
  const artemisKeywords = [
    "artemis",
    "information graph",
    "service fabric",
    "platform",
    "infrastructure",
    "llm",
    "mcp",
    "multi-agent"
  ];

  const artemisFeatures = features.filter(f =>
    artemisKeywords.some(keyword =>
      f.Feature_Name?.toLowerCase().includes(keyword)
    )
  );

  // Calculate total engineering effort
  const totalEffort = features.reduce(
    (sum, f) => sum + (f.Effort_Estimate_Weeks || 0),
    0
  );
  const artemisEffort = artemisFeatures.reduce(
    (sum, f) => sum + (f.Effort_Estimate_Weeks || 0),
    0
  );

  // Artemis percentage of total engineering capacity
  const artemisPercentage =
    totalEffort > 0 ? Math.round((artemisEffort / totalEffort) * 100) : 0;

  // Engineering weeks invested in innovation
  const engineeringWeeks = Math.round(artemisEffort);

  // Strategic features list
  const strategicFeatures = artemisFeatures.map(f => {
    // Use Completion_Percent directly from schema
    const completion = f.Completion_Percent || 0;

    return {
      featureId: f.Feature_ID,
      featureName: f.Feature_Name,
      category: categorizeInnovationFeature(f),
      completion: Math.round(completion)
    };
  });

  // R&D investment (estimated ARR impact of strategic work)
  const rdInvestment = artemisFeatures.reduce(
    (sum, f) => sum + (f.ARR_Amount || 0),
    0
  );

  // Competitive advantages (key differentiators)
  const competitiveAdvantages = [
    "Information Graph (Knowledge Network)",
    "Multi-Agent Orchestration",
    "LLM-Enhanced Extraction",
    "Microsoft Ecosystem Integration",
    "DeepSee Service Fabric"
  ];

  // Platform progress (avg completion of Artemis features)
  const platformProgress =
    strategicFeatures.length > 0
      ? Math.round(
          strategicFeatures.reduce((sum, f) => sum + f.completion, 0) /
            strategicFeatures.length
        )
      : 0;

  return {
    artemisPercentage,
    engineeringWeeks,
    strategicFeatures,
    rdInvestment,
    competitiveAdvantages,
    platformProgress
  };
}

/**
 * Categorize innovation features into strategic categories
 */
function categorizeInnovationFeature(feature: Feature): string {
  const name = feature.Feature_Name?.toLowerCase() || "";

  if (name.includes("information graph")) return "Information Graph";
  if (name.includes("llm") || name.includes("ai")) return "AI/LLM Enhancement";
  if (name.includes("service fabric") || name.includes("multi-agent"))
    return "Multi-Agent Platform";
  if (name.includes("mcp") || name.includes("integration"))
    return "Ecosystem Integration";
  if (name.includes("artemis")) return "Artemis Platform";
  if (name.includes("testing") || name.includes("infrastructure"))
    return "Platform Infrastructure";

  return "Strategic R&D";
}

// ============================================================================
// FEATURE CATEGORIZATION (Which pillar does this feature belong to?)
// ============================================================================

export type PillarCategory = "revenue" | "operations" | "innovation";

export interface CategorizedFeature extends Feature {
  primaryPillar: PillarCategory;
  secondaryPillars: PillarCategory[];
}

/**
 * Categorize a feature into one or more strategic pillars
 */
export function categorizeFeature(feature: Feature): CategorizedFeature {
  const name = feature.Feature_Name?.toLowerCase() || "";
  const tier = parseTier(feature.Priority_Tier) ?? 4;
  const arrImpact = feature.ARR_Amount || 0;

  let primaryPillar: PillarCategory;
  const secondaryPillars: PillarCategory[] = [];

  // Artemis/Platform work = Innovation
  if (
    name.includes("artemis") ||
    name.includes("information graph") ||
    name.includes("service fabric") ||
    name.includes("platform") ||
    name.includes("llm") ||
    name.includes("mcp")
  ) {
    primaryPillar = "innovation";
    if (arrImpact > 100000) secondaryPillars.push("revenue");
  }
  // Tier 0 (critical) = Operations
  else if (tier === 0) {
    primaryPillar = "operations";
  }
  // High ARR + Tier 1 = Revenue
  else if (arrImpact > 50000 && tier <= 1) {
    primaryPillar = "revenue";
  }
  // Tech debt, performance, security = Operations
  else if (
    name.includes("tech debt") ||
    name.includes("performance") ||
    name.includes("security") ||
    name.includes("bug") ||
    name.includes("fix")
  ) {
    primaryPillar = "operations";
    if (arrImpact > 0) secondaryPillars.push("revenue");
  }
  // Default: categorize by ARR impact
  else {
    if (arrImpact > 20000) {
      primaryPillar = "revenue";
    } else {
      primaryPillar = "operations";
    }
  }

  return {
    ...feature,
    primaryPillar,
    secondaryPillars
  };
}

/**
 * Filter features by pillar category
 */
export function filterFeaturesByPillar(
  features: Feature[],
  pillar: PillarCategory
): CategorizedFeature[] {
  return features
    .map(categorizeFeature)
    .filter(
      f => f.primaryPillar === pillar || f.secondaryPillars.includes(pillar)
    );
}
