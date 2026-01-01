import { calculatePriorityScore, getPriorityTier } from './lookupTables';

export interface ClientFeature {
  feature_id: string;
  feature_name: string;
  agent_type: string;
  category: 'Client-Specific Work' | 'Bug Fixes' | 'Platform Enhancement' | 'Infrastructure';
  quarter_planned: 'NOW' | 'NEXT' | 'LATER';
  replicability_score: number;
  primary_client: string;
  arr_amount: number;
  conversion_probability: number;
  current_status: string;
  completion_pct: number;
  effort_tshirt: 'XS' | 'S' | 'M' | 'L' | 'XL';
  effort_weeks: number;
  confidence_level: number;
  priority_score?: number;
  priority_tier?: string;
}

export const clientFeaturesData: ClientFeature[] = [
  {
    feature_id: "F-026",
    feature_name: "DTCC Agent Onboarding - Trade Processing Phase 1",
    agent_type: "Trade Processing",
    category: "Client-Specific Work",
    quarter_planned: "NEXT",
    replicability_score: 3,
    primary_client: "DTCC",
    arr_amount: 750000,
    conversion_probability: 100,
    current_status: "",
    completion_pct: 0.6,
    effort_tshirt: "L",
    effort_weeks: 8,
    confidence_level: 50
  },
  {
    feature_id: "F-030",
    feature_name: "Email Automation Workflow",
    agent_type: "Email Automation",
    category: "Client-Specific Work",
    quarter_planned: "NOW",
    replicability_score: 3,
    primary_client: "Broadridge",
    arr_amount: 500000,
    conversion_probability: 100,
    current_status: "",
    completion_pct: 0,
    effort_tshirt: "M",
    effort_weeks: 4,
    confidence_level: 50
  },
  {
    feature_id: "F-031",
    feature_name: "Broadridge Critical Bug Fix - Email Processing",
    agent_type: "Trade Processing",
    category: "Bug Fixes",
    quarter_planned: "NOW",
    replicability_score: 1,
    primary_client: "Broadridge",
    arr_amount: -500000,
    conversion_probability: 100,
    current_status: "In Progress",
    completion_pct: 0.7,
    effort_tshirt: "L",
    effort_weeks: 8,
    confidence_level: 50
  },
  {
    feature_id: "F-034",
    feature_name: "Accenture Email Automation Deployment - HERA",
    agent_type: "Email Automation",
    category: "Client-Specific Work",
    quarter_planned: "NOW",
    replicability_score: 4,
    primary_client: "Accenture",
    arr_amount: 1200000,
    conversion_probability: 100,
    current_status: "",
    completion_pct: 0,
    effort_tshirt: "M",
    effort_weeks: 4,
    confidence_level: 50
  },
  {
    feature_id: "F-036",
    feature_name: "HMDA / CRA Reporting - Colony Bank",
    agent_type: "HMDA / CRA",
    category: "Client-Specific Work",
    quarter_planned: "NOW",
    replicability_score: 5,
    primary_client: "Regional Banks",
    arr_amount: 200000,
    conversion_probability: 100,
    current_status: "In Progress",
    completion_pct: 0.4,
    effort_tshirt: "L",
    effort_weeks: 8,
    confidence_level: 50
  },
  {
    feature_id: "F-037",
    feature_name: "Treasury Agent Deployment - Sunwest Bank",
    agent_type: "Standing Settlement Instructions",
    category: "Client-Specific Work",
    quarter_planned: "NOW",
    replicability_score: 5,
    primary_client: "Regional Banks",
    arr_amount: 180000,
    conversion_probability: 80,
    current_status: "",
    completion_pct: 0,
    effort_tshirt: "M",
    effort_weeks: 4,
    confidence_level: 50
  },
  {
    feature_id: "F-038",
    feature_name: "Vantage Bank Custom Reconciliation (POC)",
    agent_type: "Core Reconciliation",
    category: "Client-Specific Work",
    quarter_planned: "NEXT",
    replicability_score: 2,
    primary_client: "Regional Banks",
    arr_amount: 200000,
    conversion_probability: 50,
    current_status: "Not Started",
    completion_pct: 0,
    effort_tshirt: "S",
    effort_weeks: 2,
    confidence_level: 50
  }
];

export function calculateFeaturePriorities(): (ClientFeature & { priority_score: number; priority_tier: string })[] {
  return clientFeaturesData.map(feature => {
    const priority_score = calculatePriorityScore({
      Primary_Client: feature.primary_client,
      ARR_Amount: feature.arr_amount,
      Replicability_Score: feature.replicability_score,
      Conversion_Probability_Pct: feature.conversion_probability,
      Effort_TShirt_Size: feature.effort_tshirt,
      Confidence_Level: feature.confidence_level
    });

    const priority_tier = getPriorityTier(priority_score, feature.arr_amount < 0);

    return {
      ...feature,
      priority_score,
      priority_tier
    };
  }).sort((a, b) => b.priority_score - a.priority_score);
}

export const calculatedPriorities = calculateFeaturePriorities();

export const featureSummary = {
  totalFeatures: clientFeaturesData.length,
  byQuarter: {
    NOW: clientFeaturesData.filter(f => f.quarter_planned === "NOW").length,
    NEXT: clientFeaturesData.filter(f => f.quarter_planned === "NEXT").length,
    LATER: clientFeaturesData.filter(f => f.quarter_planned === "LATER").length
  },
  byCategory: {
    "Client-Specific Work": clientFeaturesData.filter(f => f.category === "Client-Specific Work").length,
    "Bug Fixes": clientFeaturesData.filter(f => f.category === "Bug Fixes").length,
    "Platform Enhancement": clientFeaturesData.filter(f => f.category === "Platform Enhancement").length,
    "Infrastructure": clientFeaturesData.filter(f => f.category === "Infrastructure").length
  },
  totalARR: clientFeaturesData.reduce((sum, f) => sum + Math.abs(f.arr_amount), 0),
  atRiskARR: clientFeaturesData.filter(f => f.arr_amount < 0).reduce((sum, f) => sum + Math.abs(f.arr_amount), 0),
  inProgressCount: clientFeaturesData.filter(f => f.current_status === "In Progress").length
};

export const dataLastUpdated = "December 2, 2025 9:00 AM EST";
export const dataSource = "2025-11-07-DeepSee-prioritization-dashboard-v3__3_.xlsx";
export const updatedBy = "Gabriel Ignacio";
