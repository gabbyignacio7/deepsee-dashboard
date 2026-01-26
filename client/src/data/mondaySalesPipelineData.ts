// Sales Pipeline Data - Monday.com CRM
// Last Updated: January 26, 2026 @ 12:40 PM MT
// Source: Browser Agent Monday.com Extraction + PoV & Client Tracker

export type RiskLevel = 'green' | 'yellow' | 'red';
export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type DealStage =
  | 'Qualified Lead/Discovery'
  | 'Problem Validation & Value Framing'
  | 'Solution Fit/Technical Validation'
  | 'Business Case & Champion Commit'
  | 'Commercial Alignment'
  | 'Contracting & Close'
  | 'Won'
  | 'Lost'
  | 'On Hold';

export interface Deal {
  client: string;
  dealName?: string;
  arr: number;
  stage: DealStage;
  probability: number;
  closeDate: string | null;
  product: string;
  segment: 'Cap Markets' | 'Fin Market Infrastructure' | 'Banking';
  engineeringRequired: boolean;
  riskLevel: RiskLevel;
}

export interface EngineeringNeed {
  client: string;
  dealArr: number;
  need: string;
  priority: Priority;
  jiraEpic: string | null;
}

export interface ExistingCustomer {
  client: string;
  arr: number;
  tcv3yr: number;
  status: 'Active' | 'Renewal Due' | 'At Risk';
}

export interface StageData {
  stage: DealStage;
  probability: number;
  count: number;
  totalArr: number;
}

export interface PipelineOverview {
  asOf: string;
  totalPipeline: number;
  weightedPipeline: number;
  activeDeals: number;
  avgOpportunityAge: number;
  closingQ1_2026: number;
  closingThisMonth: number;
  existingCustomerArr: number;
}

export interface MondaySalesPipelineData {
  overview: PipelineOverview;
  stageDistribution: StageData[];
  topDeals: Deal[];
  atRiskDeals: { client: string; arr: number; issue: string; status?: string }[];
  bySegment: { segment: string; count: number; arr: number }[];
  byAgentFamily: { family: string; arr: number }[];
  existingCustomers: ExistingCustomer[];
  engineeringNeeds: EngineeringNeed[];
}

// ═══════════════════════════════════════════════════════════════
// JANUARY 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-01-26T12:40:00-07:00",
    totalPipeline: 11180000,
    weightedPipeline: 1660000,
    activeDeals: 96,
    avgOpportunityAge: 142,
    closingQ1_2026: 3100000,
    closingThisMonth: 340000, // BetaNxt - closing January 31
    existingCustomerArr: 990200 // Updated from Monday.com Client Tracker
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 58, totalArr: 4540000 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 8, totalArr: 1207000 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 12, totalArr: 1826000 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 5, totalArr: 1854000 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 340000 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000 }
  ],

  topDeals: [
    {
      client: "DTCC",
      dealName: "ELA",
      arr: 1850000,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: "2025-12-31",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Broadridge",
      dealName: "Internal ELA",
      arr: 1000000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      engineeringRequired: true,
      riskLevel: "yellow"
    },
    {
      client: "Coastal Bank",
      arr: 582400,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Banking",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "CIBC",
      arr: 367000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BetaNxt",
      dealName: "Design & Deployment",
      arr: 340000,
      stage: "Commercial Alignment",
      probability: 60,
      closeDate: "2026-01-31",
      product: "Operations",
      segment: "Fin Market Infrastructure",
      engineeringRequired: false,
      riskLevel: "yellow"
    },
    {
      client: "Bank of America",
      dealName: "Global Markets",
      arr: 333000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BMO Capital Markets",
      arr: 333000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops",
      arr: 325000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "green"
    },
    {
      client: "Wells Fargo",
      dealName: "Wholesale Ops",
      arr: 313000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "green"
    },
    {
      client: "JPM",
      dealName: "Fixed Income",
      arr: 265000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-07-01",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    }
  ],

  atRiskDeals: [
    {
      client: "Broadridge",
      arr: 1000000,
      issue: "Security vulnerabilities requiring P0 remediation",
      status: "Active but blocked"
    },
    {
      client: "AQR Capital Management",
      arr: 149000,
      issue: "Deal on hold",
      status: "Keep in touch"
    },
    {
      client: "Leader Bank",
      arr: 50000,
      issue: "Deal lost",
      status: "Lost"
    }
  ],

  bySegment: [
    { segment: "Cap Markets", count: 36, arr: 6424000 },
    { segment: "Fin Market Infrastructure", count: 4, arr: 3440000 },
    { segment: "Banking", count: 15, arr: 858000 }
  ],

  byAgentFamily: [
    { family: "ELA", arr: 3090000 },
    { family: "Operations", arr: 2335000 },
    { family: "Comms", arr: 1464000 },
    { family: "Reconciliation", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - January 20, 2026
  // Total Live ARR: $990,200
  existingCustomers: [
    { client: "DTCC", arr: 416200, tcv3yr: 1162200, status: "Active" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 177000, status: "Active" },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active" }
  ],

  engineeringNeeds: [
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "Security vulnerability remediation",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "Colony Bank",
      dealArr: 59000,
      need: "HMDA/CRA compliance configuration",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output configuration",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "BBVA - CIB Ops",
      dealArr: 325000,
      need: "Term extraction / Mercury PRD",
      priority: "P2",
      jiraEpic: "BACK-1654"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════
// Q1 2026 CLOSING DEALS
// ═══════════════════════════════════════════════════════════════

export const q1_2026_deals: Deal[] = [
  {
    client: "BetaNxt",
    dealName: "Design & Deployment",
    arr: 340000,
    stage: "Commercial Alignment",
    probability: 60,
    closeDate: "2026-01-31",
    product: "Operations",
    segment: "Fin Market Infrastructure",
    engineeringRequired: false,
    riskLevel: "yellow"
  },
  {
    client: "Avaloq",
    dealName: "Mercury",
    arr: 250000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-02-27",
    product: "Mercury",
    segment: "Fin Market Infrastructure",
    engineeringRequired: false,
    riskLevel: "yellow"
  },
  {
    client: "Chicago Trading Company",
    dealName: "Comms",
    arr: 96000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-10",
    product: "Comms",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Broadridge",
    dealName: "Internal ELA",
    arr: 1000000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-31",
    product: "ELA",
    segment: "Fin Market Infrastructure",
    engineeringRequired: true,
    riskLevel: "yellow"
  },
  {
    client: "BBVA",
    dealName: "CIB Ops",
    arr: 325000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-31",
    product: "Comms",
    segment: "Cap Markets",
    engineeringRequired: true,
    riskLevel: "green"
  },
  {
    client: "Bank of America",
    dealName: "Global Markets",
    arr: 333000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-31",
    product: "Reconciliation",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Wells Fargo",
    dealName: "Wholesale Ops",
    arr: 313000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Reconciliation",
    segment: "Cap Markets",
    engineeringRequired: true,
    riskLevel: "green"
  },
  {
    client: "Raymond James",
    dealName: "Operations",
    arr: 150000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "M1 Financial",
    dealName: "Operations",
    arr: 75000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Banking",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Customers Bank",
    dealName: "Operations",
    arr: 50000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Banking",
    engineeringRequired: false,
    riskLevel: "green"
  }
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export const getWeightedValue = (arr: number, probability: number): number => {
  return arr * (probability / 100);
};

export const getTotalWeightedPipeline = (): number => {
  return mondaySalesPipelineData.stageDistribution.reduce((sum, stage) => {
    return sum + (stage.totalArr * (stage.probability / 100));
  }, 0);
};

export const getDealsByRisk = (risk: RiskLevel): Deal[] => {
  return mondaySalesPipelineData.topDeals.filter(d => d.riskLevel === risk);
};

export const getDealsRequiringEngineering = (): Deal[] => {
  return mondaySalesPipelineData.topDeals.filter(d => d.engineeringRequired);
};

export const getEngineeringNeedsByPriority = (priority: Priority): EngineeringNeed[] => {
  return mondaySalesPipelineData.engineeringNeeds.filter(n => n.priority === priority);
};

export const getPipelineHealthScore = (): 'healthy' | 'attention' | 'critical' => {
  const atRiskValue = mondaySalesPipelineData.atRiskDeals.reduce((sum, d) => sum + d.arr, 0);
  const atRiskPercent = (atRiskValue / mondaySalesPipelineData.overview.totalPipeline) * 100;
  const p0Count = mondaySalesPipelineData.engineeringNeeds.filter(n => n.priority === 'P0').length;

  if (p0Count > 1 || atRiskPercent > 20) return 'critical';
  if (p0Count > 0 || atRiskPercent > 10) return 'attention';
  return 'healthy';
};
