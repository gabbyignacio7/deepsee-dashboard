// Sales Pipeline Data - Monday.com CRM
// Last Updated: February 6, 2026 @ 2:25 PM MT
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
  segment: 'Cap Markets' | 'Fin Market Infrastructure' | 'Banking' | 'Insurance';
  owner?: string;
  engineeringRequired: boolean;
  riskLevel: RiskLevel;
  atRisk?: boolean;
  riskNote?: string;
  daysOverdue?: number;
  engNeed?: string;
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
  note?: string;
  primary?: string;
}

export interface StageData {
  stage: DealStage;
  probability: number;
  count: number;
  totalArr: number;
  weightedArr: number;
  convRate?: number;
  note?: string;
}

export interface PipelineOverview {
  asOf: string;
  totalPipeline: number;
  weightedPipeline: number;
  activeDeals: number;
  activeAccounts: number;
  totalAccounts: number;
  avgOpportunityAge: number;
  closingQ1_2026: number;
  closingThisMonth: number;
  existingCustomerArr: number;
  previousPipeline: number;
  previousWeighted: number;
  previousDate: string;
  previousDeals: number;
  pipelineChange: number;
  pipelineChangePercent: number;
  weightedChange: number;
  weightedChangePercent: number;
  dealChange: number;
}

export interface MondaySalesPipelineData {
  overview: PipelineOverview;
  stageDistribution: StageData[];
  topDeals: Deal[];
  atRiskDeals: { client: string; arr: number; originalClose?: string; daysOverdue?: number; issue: string; priority: string; status?: string }[];
  atRiskSummary: { totalAtRiskARR: number; atRiskPercent: number; dealCount: number; note?: string };
  bySegment: { segment: string; count: number; arr: number; percent: number }[];
  byAgentFamily: { family: string; arr: number }[];
  existingCustomers: ExistingCustomer[];
  existingCustomerSummary: { totalARR: number; customersWithARR: number; customersWithoutARR: number; dataQualityIssue: string };
  engineeringNeeds: EngineeringNeed[];
  engineeringAlignment: { priority: string; client: string; arr: number; jiraTicket: string; status: string; stage: string; daysInPipeline?: number }[];
  revenueAtRiskByBlocker: { total: number; byBlocker: { blocker: string; arr: number }[] };
  q1Closing: { q1WeightedARR: number; q2WeightedARR: number; q3WeightedARR: number; q4WeightedARR: number; totalProjectedYear: number; note: string };
  dataQualityNotes?: string[];
}

// ═══════════════════════════════════════════════════════════════
// FEBRUARY 6, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-02-06T14:25:00-07:00",
    totalPipeline: 11470000,
    weightedPipeline: 1720000,
    activeDeals: 90,
    activeAccounts: 90,
    totalAccounts: 97,
    avgOpportunityAge: 157,
    closingQ1_2026: 979850,
    closingThisMonth: 0,
    existingCustomerArr: 931200,
    // Comparison to Jan 26
    previousPipeline: 11250000,
    previousWeighted: 1660000,
    previousDate: "2026-01-26",
    previousDeals: 97,
    pipelineChange: 220000,
    pipelineChangePercent: 2.0,
    weightedChange: 60000,
    weightedChangePercent: 3.6,
    dealChange: -7  // 90 active vs 97 total accounts
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 54, totalArr: 11470000, weightedArr: 184550 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 20, totalArr: 7780000, weightedArr: 222900 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 12, totalArr: 5550000, weightedArr: 392250 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 4, totalArr: 3990000, weightedArr: 718400 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 340000, weightedArr: 204000 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 0, note: 'DTCC overdue - may exclude from weighted calc' }
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
      owner: "MS",
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      riskNote: "Legal review - ELA Order under senior attorney review",
      daysOverdue: 37
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
      riskNote: "ARR up from $500K",
      engineeringRequired: true,
      riskLevel: "yellow"
    },
    {
      client: "Janney",
      arr: 525000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Operations",
      segment: "Cap Markets",
      owner: "MS",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "CIBC",
      arr: 367000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-15",
      product: "Operations",
      segment: "Cap Markets",
      owner: "MS",
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
      product: "Operations",
      segment: "Cap Markets",
      owner: "MS",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BetaNxt",
      dealName: "Design & Deploy",
      arr: 340000,
      stage: "Commercial Alignment",
      probability: 60,
      closeDate: "2026-01-31",
      product: "Operations",
      segment: "Fin Market Infrastructure",
      owner: "MS",
      engineeringRequired: false,
      riskLevel: "red",
      atRisk: true,
      riskNote: "Close date overdue - needs status update",
      daysOverdue: 6
    },
    {
      client: "BMO Capital Markets",
      arr: 333000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      owner: "MS",
      engineeringRequired: false,
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
      owner: "MS",
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
      owner: "MS",
      engineeringRequired: true,
      riskLevel: "yellow",
      engNeed: "SSI Output"
    },
    {
      client: "JPM",
      dealName: "Payments",
      arr: 275000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-07-01",
      product: "Operations",
      segment: "Cap Markets",
      owner: "MS",
      engineeringRequired: false,
      riskLevel: "green"
    }
  ],

  atRiskDeals: [
    {
      client: "DTCC - ELA",
      arr: 1850000,
      originalClose: "2025-12-31",
      daysOverdue: 37,
      issue: "Legal review - ELA Order under senior attorney review",
      priority: "P0"
    },
    {
      client: "BetaNxt - Design & Deploy",
      arr: 340000,
      originalClose: "2026-01-31",
      daysOverdue: 6,
      issue: "Close date overdue - needs status update",
      priority: "P1"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 2190000,
    atRiskPercent: 19.1,
    dealCount: 2,
    note: 'DTCC 37 days overdue, BetaNxt 6 days overdue'
  },

  bySegment: [
    { segment: "Capital Markets", count: 32, arr: 6968000, percent: 60.7 },
    { segment: "Fin Market Infrastructure", count: 5, arr: 3440000, percent: 30.0 },
    { segment: "Banking", count: 15, arr: 1067000, percent: 9.3 },
    { segment: "Insurance", count: 3, arr: 0, percent: 0 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 3518000 },
    { family: "ELA", arr: 2850000 },
    { family: "Reconciliation", arr: 2201000 },
    { family: "Operations", arr: 1923000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - February 3, 2026
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active", primary: "Joe Graziano" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active", primary: "Dominic Stanyer" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active", primary: "Steve Breen" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active", primary: "Sam Markey" },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active", primary: "Shawn Main" },
    { client: "Sunwest", arr: 0, tcv3yr: 0, status: "Active", note: "No ARR listed" },
    { client: "Broadridge", arr: 0, tcv3yr: 0, status: "Active", note: "No ARR listed" },
    { client: "DTCC", arr: 0, tcv3yr: 0, status: "Active", note: "No ARR listed" },
    { client: "JP Morgan Chase", arr: 0, tcv3yr: 0, status: "Active", note: "No ARR listed" }
  ],

  existingCustomerSummary: {
    totalARR: 931200,
    customersWithARR: 5,
    customersWithoutARR: 4,
    dataQualityIssue: "Contract dates, terms, and expiration fields are EMPTY"
  },

  engineeringNeeds: [
    {
      client: "DTCC - ELA",
      dealArr: 1850000,
      need: "BACK-1603 BLOCKED - Deep Recon sync",
      priority: "P0",
      jiraEpic: "BACK-1603"
    },
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "Security vulnerability remediation",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "Coastal Community Bank",
      dealArr: 582400,
      need: "HMDA/CRA compliance configuration",
      priority: "P1",
      jiraEpic: "BACK-1778"
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output configuration",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "BetaNxt",
      dealArr: 340000,
      need: "181+ days stale - needs engagement",
      priority: "P2",
      jiraEpic: null
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "BLOCKED", stage: "Biz Case 40%", daysInPipeline: 800 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "Security", status: "Remediation needed", stage: "Biz Case 40%", daysInPipeline: 342 },
    { priority: "P1", client: "Coastal Community Bank", arr: 582400, jiraTicket: "BACK-1778?", status: "HMDA/CRA", stage: "Not confirmed" },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "Config needed", stage: "Not confirmed" },
    { priority: "P2", client: "BetaNxt", arr: 340000, jiraTicket: "Unknown", status: "181+ days stale", stage: "Not confirmed" }
  ],

  revenueAtRiskByBlocker: {
    total: 4085400,
    byBlocker: [
      { blocker: "BACK-1603 (DTCC)", arr: 1850000 },
      { blocker: "Security (Broadridge)", arr: 1000000 },
      { blocker: "BACK-1778? (Coastal)", arr: 582400 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "Stale (BetaNxt)", arr: 340000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 979850,
    q2WeightedARR: 277050,
    q3WeightedARR: 241300,
    q4WeightedARR: 5000,
    totalProjectedYear: 1503200,
    note: 'Q1 has largest weighted closing at $979,850'
  },

  dataQualityNotes: [
    'DTCC close date overdue 37 days',
    'BetaNxt close date overdue 6 days',
    'Colony Bank not in Sales Pipeline - tracked in separate board',
    'Accenture is channel partner, not direct deal',
    'Broadridge ARR shows $1M (was $500K) - verify scope change',
    'BACK-1695 data anomaly - Status "To Do" but Resolution "Done"'
  ]
};

// ═══════════════════════════════════════════════════════════════
// Q1 2026 CLOSING DEALS
// ═══════════════════════════════════════════════════════════════

export const q1_2026_deals: Deal[] = [
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
    riskLevel: "yellow",
    riskNote: "ARR up from $500K"
  },
  {
    client: "Janney",
    arr: 525000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    owner: "MS",
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
    product: "Operations",
    segment: "Cap Markets",
    owner: "MS",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "BetaNxt",
    dealName: "Design & Deploy",
    arr: 340000,
    stage: "Commercial Alignment",
    probability: 60,
    closeDate: "2026-01-31",
    product: "Operations",
    segment: "Fin Market Infrastructure",
    owner: "MS",
    engineeringRequired: false,
    riskLevel: "red",
    atRisk: true,
    riskNote: "Close date overdue - needs status update",
    daysOverdue: 6
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
    owner: "MS",
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
    owner: "MS",
    engineeringRequired: true,
    riskLevel: "yellow",
    engNeed: "SSI Output"
  },
  {
    client: "Capstone Investment Advisors",
    arr: 265000,
    stage: "Qualified Lead/Discovery",
    probability: 5,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Texas Capital Bank",
    arr: 120000,
    stage: "Qualified Lead/Discovery",
    probability: 5,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Banking",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Chicago Trading Company",
    arr: 96000,
    stage: "Qualified Lead/Discovery",
    probability: 5,
    closeDate: "2026-03-10",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Customers Bank",
    arr: 50000,
    stage: "Qualified Lead/Discovery",
    probability: 5,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Banking",
    engineeringRequired: false,
    riskLevel: "green"
  }
];

// ═══════════════════════════════════════════════════════════════
// ARR BY AGENT FAMILY
// ═══════════════════════════════════════════════════════════════

export const arrByAgentFamily = [
  { family: 'Comms', arr: 3518000 },
  { family: 'ELA', arr: 2850000 },
  { family: 'Reconciliation', arr: 2201000 },
  { family: 'Operations', arr: 1923000 },
  { family: 'SSIs', arr: 313000 }
];

// ═══════════════════════════════════════════════════════════════
// SEGMENT BREAKDOWN
// ═══════════════════════════════════════════════════════════════

export const segmentBreakdown = [
  { segment: 'Capital Markets', deals: 32, rawARR: 6968000, percent: 60.7 },
  { segment: 'Fin Market Infrastructure', deals: 5, rawARR: 3440000, percent: 30.0 },
  { segment: 'Banking', deals: 15, rawARR: 1067000, percent: 9.3 },
  { segment: 'Insurance', deals: 3, rawARR: 0, percent: 0 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'DTCC ELA ($1.85M) 37 Days Overdue', description: 'DTCC deal 37 days past close - legal review pending. ELA Order under senior attorney review.' },
  { type: 'critical', category: 'engineering', title: 'Sprint 2026-S3 at RED', description: '50% unassigned, velocity declining.' },

  // HIGH
  { type: 'high', category: 'engineering', title: '5 Critical SC Pentest Findings', description: '5 Critical SC pentest findings unassigned (SC-326 to SC-330).' },
  { type: 'high', category: 'engineering', title: 'Blocked Tickets No Assignee', description: 'Both blocked tickets (UI-743, BACK-1863) have no assignee.' },
  { type: 'high', category: 'sales', title: 'BetaNxt 6 Days Overdue', description: 'BetaNxt 6 days past close - needs status update.' },

  // MEDIUM
  { type: 'medium', category: 'sales', title: '9 Accounts No Stage', description: '9 accounts with no stage assigned.' },
  { type: 'medium', category: 'sales', title: '17 Deals On Hold', description: '17 deals On Hold - pipeline hygiene needed.' },

  // POSITIVE
  { type: 'positive', category: 'sales', title: 'Broadridge ARR Increased', description: 'Broadridge ARR increased to $1M (was $500K).' }
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
