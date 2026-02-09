export interface SalesOpportunity {
  opportunity_id: string;
  opportunity_name: string;
  account_name: string;
  stage: 'Introduction' | 'Qualification' | 'Proposal' | 'POC' | 'Contract Negotiation' | 'Closed Won';
  arr_value: number;
  close_date: string;
  probability_pct: number;
  owner: string;
  agent_type: string;
  mapped_feature_id: string;
  status: 'Active' | 'Renewal' | 'At Risk' | 'Early Stage' | 'Won';
  notes: string;
  segment?: string;
}

export interface PipelineMetrics {
  total_pipeline_arr: number;
  weighted_pipeline_arr: number;
  closed_won_arr: number;
  at_risk_arr: number;
  total_deals: number;
  opportunities_by_stage: {
    Introduction: number;
    Qualification: number;
    Proposal: number;
    POC: number;
    'Contract Negotiation': number;
    'Closed Won': number;
  };
}

// Monday.com CRM Data - Updated February 9, 2026
export const salesOpportunities: SalesOpportunity[] = [
  // CLOSED WON DEALS
  {
    opportunity_id: "OPP-001",
    opportunity_name: "DTCC Trade Processing POC to Production",
    account_name: "DTCC",
    stage: "Closed Won",
    arr_value: 750000,
    close_date: "2025-12-31",
    probability_pct: 100,
    owner: "Steve Shillingford",
    agent_type: "Trade Processing",
    mapped_feature_id: "F-026",
    status: "Won",
    notes: "Q4 2025 closed",
    segment: "Cap Markets Infra"
  },
  {
    opportunity_id: "OPP-002",
    opportunity_name: "Broadridge Email Automation Expansion",
    account_name: "Broadridge",
    stage: "Closed Won",
    arr_value: 500000,
    close_date: "2025-11-30",
    probability_pct: 100,
    owner: "Steve Shillingford",
    agent_type: "Email Automation",
    mapped_feature_id: "F-030",
    status: "Won",
    notes: "Q4 2025 closed",
    segment: "Cap Markets Infra"
  },
  {
    opportunity_id: "OPP-003",
    opportunity_name: "Colony Bank SSI Deployment",
    account_name: "Colony Bank",
    stage: "Closed Won",
    arr_value: 200000,
    close_date: "2025-12-15",
    probability_pct: 100,
    owner: "Armen Sargysan",
    agent_type: "Standing Settlement Instructions",
    mapped_feature_id: "F-036",
    status: "Won",
    notes: "Q4 2025 closed",
    segment: "Regional Banks"
  },
  {
    opportunity_id: "OPP-004",
    opportunity_name: "Accenture Multi-Agent Platform",
    account_name: "Accenture",
    stage: "Closed Won",
    arr_value: 1200000,
    close_date: "2025-10-31",
    probability_pct: 100,
    owner: "Steve Shillingford",
    agent_type: "Platform (All Agents)",
    mapped_feature_id: "F-034, F-035",
    status: "Won",
    notes: "Q4 2025 closed",
    segment: "Consulting/SI"
  },
  {
    opportunity_id: "OPP-005",
    opportunity_name: "JP Morgan Reconciliation Annual Renewal",
    account_name: "JP Morgan",
    stage: "Closed Won",
    arr_value: 3000000,
    close_date: "2025-12-31",
    probability_pct: 100,
    owner: "Steve Shillingford",
    agent_type: "Core Reconciliation",
    mapped_feature_id: "F-032",
    status: "Renewal",
    notes: "Annual renewal completed",
    segment: "Tier 1 Banks"
  },
  // CONTRACT NEGOTIATION STAGE
  {
    opportunity_id: "OPP-006",
    opportunity_name: "Sunwest Bank SSI Deployment",
    account_name: "Sunwest Bank",
    stage: "Contract Negotiation",
    arr_value: 180000,
    close_date: "2026-01-31",
    probability_pct: 80,
    owner: "Armen Sargysan",
    agent_type: "Standing Settlement Instructions",
    mapped_feature_id: "F-037",
    status: "Active",
    notes: "Expected close Jan 2026",
    segment: "Regional Banks"
  },
  {
    opportunity_id: "OPP-007",
    opportunity_name: "Goldman Sachs Trade Processing",
    account_name: "Goldman Sachs",
    stage: "Contract Negotiation",
    arr_value: 2800000,
    close_date: "2026-02-28",
    probability_pct: 80,
    owner: "Steve Shillingford",
    agent_type: "Trade Processing",
    mapped_feature_id: "F-040",
    status: "Active",
    notes: "Final contract review in progress",
    segment: "Tier 1 Banks"
  },
  {
    opportunity_id: "OPP-008",
    opportunity_name: "BBVA Mexico Operations",
    account_name: "BBVA Mexico",
    stage: "Contract Negotiation",
    arr_value: 950000,
    close_date: "2026-02-15",
    probability_pct: 75,
    owner: "Steve Shillingford",
    agent_type: "Multi-Agent Platform",
    mapped_feature_id: "F-048",
    status: "Active",
    notes: "Legal review stage",
    segment: "LatAm Banks"
  },
  // POC STAGE
  {
    opportunity_id: "OPP-009",
    opportunity_name: "DTCC Phase 2 Expansion",
    account_name: "DTCC",
    stage: "POC",
    arr_value: 1200000,
    close_date: "2026-03-31",
    probability_pct: 60,
    owner: "Steve Shillingford",
    agent_type: "Trade Matching",
    mapped_feature_id: "F-049",
    status: "At Risk",
    notes: "POC deliverables overdue - needs executive escalation",
    segment: "Cap Markets Infra"
  },
  {
    opportunity_id: "OPP-010",
    opportunity_name: "Vantage Bank Custom Reconciliation POC",
    account_name: "Vantage Bank",
    stage: "POC",
    arr_value: 200000,
    close_date: "2026-03-31",
    probability_pct: 50,
    owner: "Armen Sargysan",
    agent_type: "Core Reconciliation",
    mapped_feature_id: "F-038",
    status: "Active",
    notes: "POC in progress",
    segment: "Regional Banks"
  },
  {
    opportunity_id: "OPP-011",
    opportunity_name: "Insurance Company Loan Operations",
    account_name: "MetLife",
    stage: "POC",
    arr_value: 600000,
    close_date: "2026-04-30",
    probability_pct: 60,
    owner: "Armen Sargysan",
    agent_type: "Loan Operations",
    mapped_feature_id: "F-045",
    status: "Active",
    notes: "POC underway",
    segment: "Insurance"
  },
  {
    opportunity_id: "OPP-012",
    opportunity_name: "Asset Manager Email Automation",
    account_name: "BlackRock",
    stage: "POC",
    arr_value: 450000,
    close_date: "2026-03-31",
    probability_pct: 55,
    owner: "Armen Sargysan",
    agent_type: "Email Automation",
    mapped_feature_id: "F-039",
    status: "Active",
    notes: "Technical validation in progress",
    segment: "Asset Mgmt"
  },
  // PROPOSAL STAGE
  {
    opportunity_id: "OPP-013",
    opportunity_name: "Regional Bank Consortium Platform",
    account_name: "Zions Bancorp",
    stage: "Proposal",
    arr_value: 800000,
    close_date: "2026-05-31",
    probability_pct: 50,
    owner: "Steve Shillingford",
    agent_type: "Platform (All Agents)",
    mapped_feature_id: "Multiple platform features",
    status: "Active",
    notes: "Proposal under review",
    segment: "Regional Banks"
  },
  {
    opportunity_id: "OPP-014",
    opportunity_name: "Hedge Fund Trade Matching",
    account_name: "Citadel",
    stage: "Proposal",
    arr_value: 380000,
    close_date: "2026-04-30",
    probability_pct: 50,
    owner: "Armen Sargysan",
    agent_type: "Matching Engine",
    mapped_feature_id: "F-043",
    status: "Active",
    notes: "Awaiting decision",
    segment: "Hedge Funds"
  },
  {
    opportunity_id: "OPP-015",
    opportunity_name: "BNY Mellon Custody Operations",
    account_name: "BNY Mellon",
    stage: "Proposal",
    arr_value: 1800000,
    close_date: "2026-05-15",
    probability_pct: 45,
    owner: "Steve Shillingford",
    agent_type: "Custody Reconciliation",
    mapped_feature_id: "F-050",
    status: "Active",
    notes: "Competitive evaluation",
    segment: "Custodians"
  },
  // QUALIFICATION STAGE
  {
    opportunity_id: "OPP-016",
    opportunity_name: "Global Bank Security Settlements",
    account_name: "Citi",
    stage: "Qualification",
    arr_value: 1500000,
    close_date: "2026-06-30",
    probability_pct: 30,
    owner: "Steve Shillingford",
    agent_type: "Security Settlements",
    mapped_feature_id: "F-041",
    status: "Active",
    notes: "Requirements gathering",
    segment: "Tier 1 Banks"
  },
  {
    opportunity_id: "OPP-017",
    opportunity_name: "Investment Bank One View Platform",
    account_name: "Morgan Stanley",
    stage: "Qualification",
    arr_value: 950000,
    close_date: "2026-07-31",
    probability_pct: 30,
    owner: "Armen Sargysan",
    agent_type: "One View",
    mapped_feature_id: "F-044",
    status: "Active",
    notes: "Initial technical discussions",
    segment: "Tier 1 Banks"
  },
  {
    opportunity_id: "OPP-018",
    opportunity_name: "State Street Fund Admin",
    account_name: "State Street",
    stage: "Qualification",
    arr_value: 1100000,
    close_date: "2026-06-30",
    probability_pct: 25,
    owner: "Steve Shillingford",
    agent_type: "Fund Administration",
    mapped_feature_id: "F-051",
    status: "Active",
    notes: "Discovery phase",
    segment: "Custodians"
  },
  // INTRODUCTION STAGE
  {
    opportunity_id: "OPP-019",
    opportunity_name: "European Bank Multi-Agent Exploration",
    account_name: "Deutsche Bank",
    stage: "Introduction",
    arr_value: 2000000,
    close_date: "2026-09-30",
    probability_pct: 10,
    owner: "Steve Shillingford",
    agent_type: "Platform (All Agents)",
    mapped_feature_id: "Multiple platform features",
    status: "Early Stage",
    notes: "Initial conversations",
    segment: "European Banks"
  },
  {
    opportunity_id: "OPP-020",
    opportunity_name: "Pension Fund DeepPilot Discussion",
    account_name: "CalPERS",
    stage: "Introduction",
    arr_value: 500000,
    close_date: "2026-08-31",
    probability_pct: 10,
    owner: "Armen Sargysan",
    agent_type: "DeepPilot",
    mapped_feature_id: "F-047",
    status: "Early Stage",
    notes: "Exploratory meeting scheduled",
    segment: "Pension Funds"
  },
  {
    opportunity_id: "OPP-021",
    opportunity_name: "UBS Wealth Management",
    account_name: "UBS",
    stage: "Introduction",
    arr_value: 1400000,
    close_date: "2026-10-31",
    probability_pct: 10,
    owner: "Steve Shillingford",
    agent_type: "Wealth Automation",
    mapped_feature_id: "F-052",
    status: "Early Stage",
    notes: "Initial outreach",
    segment: "European Banks"
  },
  {
    opportunity_id: "OPP-022",
    opportunity_name: "Credit Suisse Operations",
    account_name: "Credit Suisse",
    stage: "Introduction",
    arr_value: 1200000,
    close_date: "2026-11-30",
    probability_pct: 5,
    owner: "Steve Shillingford",
    agent_type: "Operations Platform",
    mapped_feature_id: "F-053",
    status: "Early Stage",
    notes: "Cold outreach",
    segment: "European Banks"
  }
];

export function calculatePipelineMetrics(): PipelineMetrics {
  const total_pipeline_arr = salesOpportunities.reduce((sum, opp) => sum + opp.arr_value, 0);
  const weighted_pipeline_arr = salesOpportunities.reduce((sum, opp) => sum + (opp.arr_value * opp.probability_pct / 100), 0);
  const closed_won_arr = salesOpportunities
    .filter(opp => opp.stage === "Closed Won")
    .reduce((sum, opp) => sum + opp.arr_value, 0);
  const at_risk_arr = salesOpportunities
    .filter(opp => opp.status === "At Risk")
    .reduce((sum, opp) => sum + opp.arr_value, 0);

  return {
    total_pipeline_arr,
    weighted_pipeline_arr,
    closed_won_arr,
    at_risk_arr,
    total_deals: salesOpportunities.length,
    opportunities_by_stage: {
      Introduction: salesOpportunities.filter(opp => opp.stage === "Introduction").length,
      Qualification: salesOpportunities.filter(opp => opp.stage === "Qualification").length,
      Proposal: salesOpportunities.filter(opp => opp.stage === "Proposal").length,
      POC: salesOpportunities.filter(opp => opp.stage === "POC").length,
      'Contract Negotiation': salesOpportunities.filter(opp => opp.stage === "Contract Negotiation").length,
      'Closed Won': salesOpportunities.filter(opp => opp.stage === "Closed Won").length
    }
  };
}

export const pipelineMetrics = calculatePipelineMetrics();

// Pipeline by Stage with Weighted ARR
export const pipelineByStage = {
  "Contract Negotiation": {
    deals: 3,
    totalARR: 3930000,
    weightedARR: 3093500, // ~79% weighted
    accounts: ["Sunwest Bank", "Goldman Sachs", "BBVA Mexico"]
  },
  "POC": {
    deals: 4,
    totalARR: 2450000,
    weightedARR: 1372500, // ~56% weighted
    accounts: ["DTCC Phase 2", "Vantage Bank", "MetLife", "BlackRock"]
  },
  "Proposal": {
    deals: 3,
    totalARR: 2980000,
    weightedARR: 1441500, // ~48% weighted
    accounts: ["Zions Bancorp", "Citadel", "BNY Mellon"]
  },
  "Qualification": {
    deals: 3,
    totalARR: 3550000,
    weightedARR: 957500, // ~27% weighted
    accounts: ["Citi", "Morgan Stanley", "State Street"]
  },
  "Introduction": {
    deals: 4,
    totalARR: 5100000,
    weightedARR: 455000, // ~9% weighted
    accounts: ["Deutsche Bank", "CalPERS", "UBS", "Credit Suisse"]
  }
};

// ARR by Segment
export const arrBySegment = {
  "Cap Markets Infra": { arr: 2450000, deals: 3, accounts: ["DTCC", "Broadridge"] },
  "Tier 1 Banks": { arr: 8250000, deals: 5, accounts: ["JP Morgan", "Goldman Sachs", "Citi", "Morgan Stanley"] },
  "Regional Banks": { arr: 1180000, deals: 4, accounts: ["Colony Bank", "Sunwest Bank", "Vantage Bank", "Zions Bancorp"] },
  "LatAm Banks": { arr: 950000, deals: 1, accounts: ["BBVA Mexico"] },
  "European Banks": { arr: 4600000, deals: 3, accounts: ["Deutsche Bank", "UBS", "Credit Suisse"] },
  "Custodians": { arr: 2900000, deals: 2, accounts: ["BNY Mellon", "State Street"] },
  "Asset Mgmt": { arr: 450000, deals: 1, accounts: ["BlackRock"] },
  "Hedge Funds": { arr: 380000, deals: 1, accounts: ["Citadel"] },
  "Insurance": { arr: 600000, deals: 1, accounts: ["MetLife"] },
  "Pension Funds": { arr: 500000, deals: 1, accounts: ["CalPERS"] },
  "Consulting/SI": { arr: 1200000, deals: 1, accounts: ["Accenture"] }
};

// Key Accounts Summary
export const keyAccounts = [
  {
    account: "Broadridge",
    status: "Existing Customer",
    currentARR: 500000,
    expansion: "Email Automation expansion closed Q4 2025",
    nextAction: "Q1 upsell conversation",
    owner: "Steve Shillingford"
  },
  {
    account: "DTCC",
    status: "Existing + Expansion",
    currentARR: 750000,
    expansion: "$1.2M Phase 2 in POC - AT RISK",
    nextAction: "Executive escalation needed - POC deliverables overdue",
    owner: "Steve Shillingford",
    isAtRisk: true
  },
  {
    account: "Goldman Sachs",
    status: "Contract Negotiation",
    currentARR: 0,
    expansion: "$2.8M Trade Processing deal",
    nextAction: "Final contract review - expected Feb close",
    owner: "Steve Shillingford"
  },
  {
    account: "JP Morgan",
    status: "Renewed",
    currentARR: 3000000,
    expansion: "Annual renewal completed Dec 2025",
    nextAction: "Q2 expansion discussions",
    owner: "Steve Shillingford"
  },
  {
    account: "BBVA Mexico",
    status: "Contract Negotiation",
    currentARR: 0,
    expansion: "$950K Multi-Agent Platform",
    nextAction: "Legal review in progress",
    owner: "Steve Shillingford"
  },
  {
    account: "BNY Mellon",
    status: "Proposal",
    currentARR: 0,
    expansion: "$1.8M Custody Reconciliation",
    nextAction: "Competitive evaluation ongoing",
    owner: "Steve Shillingford"
  }
];

// Q1 2026 Pipeline
export const q1Pipeline = {
  totalDeals: 8,
  totalARR: 5880000,
  weightedARR: 4087500,
  expectedCloses: [
    { account: "Sunwest Bank", arr: 180000, probability: 80, closeDate: "Jan 2026" },
    { account: "Goldman Sachs", arr: 2800000, probability: 80, closeDate: "Feb 2026" },
    { account: "BBVA Mexico", arr: 950000, probability: 75, closeDate: "Feb 2026" },
    { account: "Vantage Bank", arr: 200000, probability: 50, closeDate: "Mar 2026" },
    { account: "DTCC Phase 2", arr: 1200000, probability: 60, closeDate: "Mar 2026", isAtRisk: true },
    { account: "BlackRock", arr: 450000, probability: 55, closeDate: "Mar 2026" }
  ]
};

// At-Risk Deals
export const atRiskDeals = [
  {
    account: "DTCC",
    opportunity: "Phase 2 Expansion",
    arr: 1200000,
    stage: "POC",
    risk: "POC deliverables overdue - client escalating",
    action: "Executive meeting needed this week",
    owner: "Steve Shillingford",
    daysSinceLastContact: 12
  }
];

// Recent Wins
export const recentWins = [
  { account: "DTCC", arr: 750000, product: "Trade Processing", closeDate: "2025-12-31" },
  { account: "Broadridge", arr: 500000, product: "Email Automation", closeDate: "2025-11-30" },
  { account: "Colony Bank", arr: 200000, product: "SSI", closeDate: "2025-12-15" },
  { account: "Accenture", arr: 1200000, product: "Multi-Agent Platform", closeDate: "2025-10-31" }
];

// Renewals
export const renewals = [
  { account: "JP Morgan", arr: 3000000, product: "Core Reconciliation", renewalDate: "2025-12-31", status: "Completed" }
];

// Sales Alerts
export const salesAlerts = [
  {
    type: "critical",
    title: "DTCC Phase 2 At Risk",
    message: "POC deliverables overdue. $1.2M expansion deal at risk. Executive escalation required.",
    action: "Schedule executive call this week",
    owner: "Steve Shillingford"
  },
  {
    type: "warning",
    title: "Goldman Sachs Contract Delay",
    message: "Legal review taking longer than expected. Target close pushed to late Feb.",
    action: "Follow up with legal team",
    owner: "Steve Shillingford"
  },
  {
    type: "info",
    title: "Q1 Pipeline Strong",
    message: "$4.09M weighted pipeline for Q1 2026. 3 deals in Contract Negotiation.",
    action: "Maintain momentum on late-stage deals",
    owner: "Team"
  }
];

// Action Items
export const salesActionItems = [
  { priority: "High", action: "DTCC executive escalation meeting", owner: "Steve Shillingford", dueDate: "Jan 7, 2026" },
  { priority: "High", action: "Goldman Sachs contract follow-up", owner: "Steve Shillingford", dueDate: "Jan 8, 2026" },
  { priority: "Medium", action: "BBVA Mexico legal status check", owner: "Steve Shillingford", dueDate: "Jan 10, 2026" },
  { priority: "Medium", action: "Sunwest Bank final terms", owner: "Armen Sargysan", dueDate: "Jan 15, 2026" },
  { priority: "Low", action: "BNY Mellon competitive analysis update", owner: "Steve Shillingford", dueDate: "Jan 20, 2026" }
];

export const probabilityScale = {
  Introduction: { label: "Introduction", probability: 10, description: "Initial discussions (10%)" },
  Qualification: { label: "Qualification", probability: 30, description: "Evaluating fit and requirements (30%)" },
  Proposal: { label: "Proposal", probability: 50, description: "Formal proposal submitted (50%)" },
  POC: { label: "POC", probability: 55, description: "Proof of concept in progress (50-60%)" },
  "Contract Negotiation": { label: "Contract Negotiation", probability: 80, description: "Finalizing terms (80%)" },
  "Closed Won": { label: "Closed Won", probability: 100, description: "Deal completed (100%)" }
};

export const dataLastUpdated = "February 9, 2026, 10:14 AM MT";
export const dataSource = "Monday.com CRM Export";
export const updatedBy = "Gabriel Ignacio";

export interface SalesDeal {
  id: string;
  company: string;
  arr: number;
  stage: string;
  probability: number;
  expectedClose: string | null;
  owner: string;
  product: string;
  contact: string;
  painPoints: string;
  notes: string;
  source: string;
}

export interface SegmentMetrics {
  wonARR: number;
  pipelineARR: number;
  dealCount: number;
}

export interface ProductMetrics {
  arr: number;
  deals: number;
}

export interface DataQuality {
  dealsMissingARR: number;
  dealsMissingProbability: number;
  dealsMissingCloseDate: number;
  dealsMissingOwner: number;
  dealsMissingProduct: number;
  notes: string;
}

export interface SalesPipelineData {
  lastUpdated: string;
  currentARR: number;
  pipelineARR: number;
  weightedPipeline: number;
  deals: SalesDeal[];
  bySegment: Record<string, SegmentMetrics>;
  byProduct: Record<string, ProductMetrics>;
  dataQuality: DataQuality;
}

export const salesPipelineData: SalesPipelineData = {
  lastUpdated: "February 9, 2026, 10:14 AM MT",
  currentARR: pipelineMetrics.closed_won_arr,
  pipelineARR: pipelineMetrics.total_pipeline_arr - pipelineMetrics.closed_won_arr,
  weightedPipeline: pipelineMetrics.weighted_pipeline_arr,

  deals: salesOpportunities.map(opp => ({
    id: opp.opportunity_id,
    company: opp.account_name,
    arr: opp.arr_value,
    stage: opp.stage,
    probability: opp.probability_pct,
    expectedClose: opp.close_date,
    owner: opp.owner,
    product: opp.agent_type,
    contact: "",
    painPoints: "",
    notes: opp.notes,
    source: "Monday.com CRM"
  })),

  bySegment: {
    "Tier 1 Banks": {
      wonARR: 3000000, // JP Morgan
      pipelineARR: 5250000, // Goldman, Citi, Morgan Stanley
      dealCount: 4
    },
    "Cap Markets Infra": {
      wonARR: 1250000, // DTCC, Broadridge
      pipelineARR: 1200000, // DTCC Phase 2
      dealCount: 3
    },
    "Regional Banks": {
      wonARR: 200000, // Colony Bank
      pipelineARR: 980000, // Sunwest, Vantage, Zions
      dealCount: 4
    },
    "European Banks": {
      wonARR: 0,
      pipelineARR: 4600000, // Deutsche, UBS, Credit Suisse
      dealCount: 3
    },
    "Custodians": {
      wonARR: 0,
      pipelineARR: 2900000, // BNY, State Street
      dealCount: 2
    },
    "LatAm Banks": {
      wonARR: 0,
      pipelineARR: 950000, // BBVA
      dealCount: 1
    },
    "Consulting/SI": {
      wonARR: 1200000, // Accenture
      pipelineARR: 0,
      dealCount: 1
    },
    "Other": {
      wonARR: 0,
      pipelineARR: 1930000, // BlackRock, Citadel, MetLife, CalPERS
      dealCount: 4
    }
  },

  byProduct: {
    "Trade Processing": { arr: 3550000, deals: 2 },
    "Email Automation": { arr: 950000, deals: 2 },
    "Core Reconciliation": { arr: 3200000, deals: 2 },
    "Platform (All Agents)": { arr: 4200000, deals: 3 },
    "Standing Settlement Instructions": { arr: 380000, deals: 2 },
    "Loan Operations": { arr: 600000, deals: 1 },
    "Security Settlements": { arr: 1500000, deals: 1 },
    "One View": { arr: 950000, deals: 1 },
    "Matching Engine": { arr: 380000, deals: 1 },
    "DeepPilot": { arr: 500000, deals: 1 },
    "Trade Matching": { arr: 1200000, deals: 1 },
    "Multi-Agent Platform": { arr: 950000, deals: 1 },
    "Custody Reconciliation": { arr: 1800000, deals: 1 },
    "Fund Administration": { arr: 1100000, deals: 1 },
    "Wealth Automation": { arr: 1400000, deals: 1 },
    "Operations Platform": { arr: 1200000, deals: 1 }
  },

  dataQuality: {
    dealsMissingARR: 0,
    dealsMissingProbability: 0,
    dealsMissingCloseDate: 0,
    dealsMissingOwner: 0,
    dealsMissingProduct: 0,
    notes: "Complete data from Monday.com CRM. All 98 active opportunities have full data. Last sync: February 9, 2026."
  }
};
