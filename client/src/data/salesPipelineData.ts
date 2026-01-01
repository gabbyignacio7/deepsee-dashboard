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
  status: 'Active' | 'Renewal' | 'At Risk' | 'Early Stage';
  notes: string;
}

export interface PipelineMetrics {
  total_pipeline_arr: number;
  weighted_pipeline_arr: number;
  closed_won_arr: number;
  at_risk_arr: number;
  opportunities_by_stage: {
    Introduction: number;
    Qualification: number;
    Proposal: number;
    POC: number;
    'Contract Negotiation': number;
    'Closed Won': number;
  };
}

export const salesOpportunities: SalesOpportunity[] = [
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
    status: "Active",
    notes: ""
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
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-003",
    opportunity_name: "Colony Bank SSI Deployment",
    account_name: "Regional Banks - Colony Bank",
    stage: "Closed Won",
    arr_value: 200000,
    close_date: "2025-12-15",
    probability_pct: 100,
    owner: "Armen Sargysan",
    agent_type: "Standing Settlement Instructions",
    mapped_feature_id: "F-036",
    status: "Active",
    notes: ""
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
    status: "Active",
    notes: ""
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
    notes: ""
  },
  {
    opportunity_id: "OPP-006",
    opportunity_name: "Sunwest Bank SSI Deployment",
    account_name: "Regional Banks - Sunwest Bank",
    stage: "Contract Negotiation",
    arr_value: 180000,
    close_date: "2026-01-31",
    probability_pct: 80,
    owner: "Armen Sargysan",
    agent_type: "Standing Settlement Instructions",
    mapped_feature_id: "F-037",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-007",
    opportunity_name: "Large Bank Trade Processing Platform",
    account_name: "[Confidential - Large US Bank]",
    stage: "Contract Negotiation",
    arr_value: 2500000,
    close_date: "2026-02-28",
    probability_pct: 80,
    owner: "Steve Shillingford",
    agent_type: "Trade Processing",
    mapped_feature_id: "F-040",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-008",
    opportunity_name: "Vantage Bank Custom Reconciliation POC",
    account_name: "Regional Banks - Vantage Bank",
    stage: "POC",
    arr_value: 200000,
    close_date: "2026-03-31",
    probability_pct: 50,
    owner: "Armen Sargysan",
    agent_type: "Core Reconciliation",
    mapped_feature_id: "F-038",
    status: "At Risk",
    notes: "Client tired of waiting, requires prepayment or binding contract"
  },
  {
    opportunity_id: "OPP-009",
    opportunity_name: "Insurance Company Loan Operations",
    account_name: "[Prospect - Insurance Co A]",
    stage: "POC",
    arr_value: 600000,
    close_date: "2026-04-30",
    probability_pct: 60,
    owner: "Armen Sargysan",
    agent_type: "Loan Operations",
    mapped_feature_id: "F-045",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-010",
    opportunity_name: "Asset Manager Email Automation",
    account_name: "[Prospect - Asset Manager B]",
    stage: "POC",
    arr_value: 400000,
    close_date: "2026-03-31",
    probability_pct: 60,
    owner: "Armen Sargysan",
    agent_type: "Email Automation",
    mapped_feature_id: "F-039",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-011",
    opportunity_name: "Regional Bank Consortium Platform",
    account_name: "[Prospect - Regional Bank Consortium]",
    stage: "Proposal",
    arr_value: 800000,
    close_date: "2026-05-31",
    probability_pct: 50,
    owner: "Steve Shillingford",
    agent_type: "Platform (All Agents)",
    mapped_feature_id: "Multiple platform features",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-012",
    opportunity_name: "Hedge Fund Trade Matching",
    account_name: "[Prospect - Hedge Fund D]",
    stage: "Proposal",
    arr_value: 350000,
    close_date: "2026-04-30",
    probability_pct: 50,
    owner: "Armen Sargysan",
    agent_type: "Matching Engine",
    mapped_feature_id: "F-043",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-013",
    opportunity_name: "Global Bank Security Settlements",
    account_name: "[Prospect - Global Bank E]",
    stage: "Qualification",
    arr_value: 1500000,
    close_date: "2026-06-30",
    probability_pct: 30,
    owner: "Steve Shillingford",
    agent_type: "Security Settlements",
    mapped_feature_id: "F-041",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-014",
    opportunity_name: "Investment Bank One View Platform",
    account_name: "[Prospect - Investment Bank F]",
    stage: "Qualification",
    arr_value: 900000,
    close_date: "2026-07-31",
    probability_pct: 30,
    owner: "Armen Sargysan",
    agent_type: "One View",
    mapped_feature_id: "F-044",
    status: "Active",
    notes: ""
  },
  {
    opportunity_id: "OPP-015",
    opportunity_name: "European Bank Multi-Agent Exploration",
    account_name: "[Prospect - European Bank G]",
    stage: "Introduction",
    arr_value: 2000000,
    close_date: "2026-09-30",
    probability_pct: 10,
    owner: "Steve Shillingford",
    agent_type: "Platform (All Agents)",
    mapped_feature_id: "Multiple platform features",
    status: "Early Stage",
    notes: ""
  },
  {
    opportunity_id: "OPP-016",
    opportunity_name: "Pension Fund DeepPilot Discussion",
    account_name: "[Prospect - Pension Fund H]",
    stage: "Introduction",
    arr_value: 500000,
    close_date: "2026-08-31",
    probability_pct: 10,
    owner: "Armen Sargysan",
    agent_type: "DeepPilot",
    mapped_feature_id: "F-047",
    status: "Early Stage",
    notes: ""
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

export const probabilityScale = {
  Introduction: { label: "Introduction", probability: 10, description: "Initial discussions (10%)" },
  Qualification: { label: "Qualification", probability: 30, description: "Evaluating fit and requirements (30%)" },
  Proposal: { label: "Proposal", probability: 50, description: "Formal proposal submitted (50%)" },
  POC: { label: "POC", probability: 55, description: "Proof of concept in progress (50-60%)" },
  "Contract Negotiation": { label: "Contract Negotiation", probability: 80, description: "Finalizing terms (80%)" },
  "Closed Won": { label: "Closed Won", probability: 100, description: "Deal completed (100%)" }
};

export const dataLastUpdated = "December 2, 2025 9:00 AM EST";
export const dataSource = "2025-11-07-DeepSee-prioritization-dashboard-v3__3_.xlsx";
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
  lastUpdated: "December 2, 2025 9:00 AM EST",
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
    source: "Excel Spreadsheet"
  })),
  
  bySegment: {
    "Enterprise (Closed Won)": {
      wonARR: pipelineMetrics.closed_won_arr,
      pipelineARR: 0,
      dealCount: salesOpportunities.filter(o => o.stage === "Closed Won").length
    },
    "Active Pipeline": {
      wonARR: 0,
      pipelineARR: pipelineMetrics.total_pipeline_arr - pipelineMetrics.closed_won_arr,
      dealCount: salesOpportunities.filter(o => o.stage !== "Closed Won").length
    }
  },
  
  byProduct: {
    "Trade Processing": { arr: 3250000, deals: 2 },
    "Email Automation": { arr: 900000, deals: 2 },
    "Core Reconciliation": { arr: 3200000, deals: 2 },
    "Platform (All Agents)": { arr: 4000000, deals: 3 },
    "Standing Settlement Instructions": { arr: 380000, deals: 2 },
    "Loan Operations": { arr: 600000, deals: 1 },
    "Security Settlements": { arr: 1500000, deals: 1 },
    "One View": { arr: 900000, deals: 1 },
    "Matching Engine": { arr: 350000, deals: 1 },
    "DeepPilot": { arr: 500000, deals: 1 }
  },
  
  dataQuality: {
    dealsMissingARR: 0,
    dealsMissingProbability: 0,
    dealsMissingCloseDate: 0,
    dealsMissingOwner: 0,
    dealsMissingProduct: 0,
    notes: "Complete data from Excel spreadsheet. Ryan populated Conversion Probability (Column O). All 16 opportunities have full data."
  }
};
