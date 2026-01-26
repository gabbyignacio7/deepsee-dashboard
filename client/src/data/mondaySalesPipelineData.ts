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
  atRisk?: boolean;
  riskReason?: string;
}

export interface EngineeringNeed {
  client: string;
  dealArr: number;
  need: string;
  priority: Priority;
  jiraEpic: string | null;
  status?: string;
  blocking?: boolean;
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
  weightedArr?: number;
}

export interface PipelineOverview {
  asOf: string;
  totalPipeline: number;
  weightedPipeline: number;
  activeDeals: number;
  activeAccounts: number;
  avgOpportunityAge: number;
  closingQ1_2026: number;
  closingThisMonth: number;
  existingCustomerArr: number;
  atRiskARR: number;
  engineeringBlockedARR: number;
}

export interface BaselineComparison {
  jan18Total: number;
  jan18Weighted: number;
  jan18Accounts: number;
  changeTotal: number;
  changeWeighted: number;
  changeAccounts: number;
}

export interface MondaySalesPipelineData {
  overview: PipelineOverview;
  baseline: BaselineComparison;
  stageDistribution: StageData[];
  topDeals: Deal[];
  atRiskDeals: { client: string; arr: number; issue: string; status?: string }[];
  bySegment: { segment: string; count: number; arr: number; percent: number }[];
  byAgentFamily: { family: string; arr: number }[];
  existingCustomers: ExistingCustomer[];
  engineeringNeeds: EngineeringNeed[];
  quarterlyForecast: { quarter: string; weightedARR: number }[];
  keyAccountsStatus: { client: string; expectedARR: number; actualARR: number | null; status: string; stage: string; notes: string }[];
}

// ═══════════════════════════════════════════════════════════════
// JANUARY 26, 2026 PIPELINE DATA - Updated at 12:40 PM MT
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-01-26T12:40:00-07:00",
    totalPipeline: 11180000,
    weightedPipeline: 1655300,
    activeDeals: 96,
    activeAccounts: 96,
    avgOpportunityAge: 148,
    closingQ1_2026: 1183850,
    closingThisMonth: 340000, // BetaNxt
    existingCustomerArr: 990200,
    atRiskARR: 2350000,
    engineeringBlockedARR: 2350000
  },

  baseline: {
    jan18Total: 11250000,
    jan18Weighted: 1660000,
    jan18Accounts: 89,
    changeTotal: -70000,
    changeWeighted: -4700,
    changeAccounts: 7
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 50, totalArr: 10930000, weightedArr: 221550 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 15, totalArr: 6750000, weightedArr: 119100 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 10, totalArr: 5550000, weightedArr: 392250 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 4, totalArr: 3990000, weightedArr: 718400 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 340000, weightedArr: 204000 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 0 }
  ],

  topDeals: [
    {
      client: "DTCC",
      dealName: "ELA",
      arr: 1850000,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: "2026-01-31",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      riskReason: "JIRA BACK-1603 BLOCKED 42 days"
    },
    {
      client: "Linonia",
      arr: 1400000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
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
      client: "Abu Dhabi Investment Authority",
      arr: 749000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Coastal Community Bank",
      arr: 582400,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Fin Market Infrastructure",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops",
      arr: 367000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: true,
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
      client: "Wells Fargo",
      dealName: "Wholesale Ops",
      arr: 313000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Settlement",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "green"
    },
    {
      client: "JPM",
      dealName: "Payments",
      arr: 275000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    }
  ],

  atRiskDeals: [
    {
      client: "DTCC",
      arr: 1850000,
      issue: "JIRA BACK-1603 BLOCKED 42 days - Integration work stalled",
      status: "CRITICAL - Engineering blocked"
    },
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
    }
  ],

  bySegment: [
    { segment: "Capital Markets", count: 34, arr: 6819000, percent: 61 },
    { segment: "Fin Market Infrastructure", count: 5, arr: 3440000, percent: 31 },
    { segment: "Banking", count: 16, arr: 918000, percent: 8 }
  ],

  byAgentFamily: [
    { family: "Comms/Email", arr: 3518000 },
    { family: "ELA", arr: 2850000 },
    { family: "Reconciliation", arr: 2052000 },
    { family: "Operations", arr: 1774000 },
    { family: "Settlement", arr: 313000 }
  ],

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
      client: "DTCC",
      dealArr: 1850000,
      need: "Integration work",
      priority: "P0",
      jiraEpic: "BACK-1603",
      status: "BLOCKED",
      blocking: true
    },
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "Security remediation",
      priority: "P0",
      jiraEpic: "Multiple",
      status: "In Progress",
      blocking: true
    },
    {
      client: "BBVA",
      dealArr: 367000,
      need: "Term extraction",
      priority: "P1",
      jiraEpic: "BACK-1654",
      status: "In Progress",
      blocking: false
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output",
      priority: "P1",
      jiraEpic: "TBD",
      status: "TBD",
      blocking: false
    }
  ],

  quarterlyForecast: [
    { quarter: "Q1 2026", weightedARR: 1183850 },
    { quarter: "Q2 2026", weightedARR: 258700 },
    { quarter: "Q3 2026", weightedARR: 207750 },
    { quarter: "Q4 2026", weightedARR: 5000 }
  ],

  keyAccountsStatus: [
    { client: "DTCC", expectedARR: 1850000, actualARR: 1850000, status: "match", stage: "Contracting & Close (80%)", notes: "JIRA BACK-1603 BLOCKED" },
    { client: "Broadridge", expectedARR: 500000, actualARR: 1000000, status: "up", stage: "Business Case (40%)", notes: "Security remediation - P0" },
    { client: "Colony Bank", expectedARR: 200000, actualARR: null, status: "not_found", stage: "-", notes: "Not in pipeline" },
    { client: "Wells Fargo", expectedARR: 313000, actualARR: 313000, status: "match", stage: "Solution Fit (25%)", notes: "SSI Output" },
    { client: "BBVA", expectedARR: 325000, actualARR: 734000, status: "up", stage: "Solution Fit / Business Case", notes: "2 opps @ $367K each" },
    { client: "BetaNxt", expectedARR: 340000, actualARR: 340000, status: "match", stage: "Commercial Alignment (60%)", notes: "-" },
    { client: "Accenture", expectedARR: 1200000, actualARR: null, status: "not_found", stage: "-", notes: "Not in pipeline" }
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
    arr: 367000,
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
    product: "Settlement",
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

export const getBlockedEngineering = (): EngineeringNeed[] => {
  return mondaySalesPipelineData.engineeringNeeds.filter(n => n.blocking);
};
