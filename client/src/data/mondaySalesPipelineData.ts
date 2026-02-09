// Sales Pipeline Data - Monday.com CRM
// Last Updated: February 9, 2026 @ 10:14 AM MT
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
// FEBRUARY 9, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-02-09T10:14:00-07:00",
    totalPipeline: 13949000,
    weightedPipeline: 1837050,
    activeDeals: 98,
    activeAccounts: 98,
    totalAccounts: 107,
    avgOpportunityAge: 157,
    closingQ1_2026: 2541300,
    closingThisMonth: 0,
    existingCustomerArr: 990000,
    // Comparison to Jan 18
    previousPipeline: 11250000,
    previousWeighted: 1660000,
    previousDate: "2026-01-18",
    previousDeals: 89,
    pipelineChange: 2699000,
    pipelineChangePercent: 24.0,
    weightedChange: 177050,
    weightedChangePercent: 10.7,
    dealChange: 9
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 48, totalArr: 3994000, weightedArr: 199700 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 22, totalArr: 3728000, weightedArr: 372800 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 11, totalArr: 2118000, weightedArr: 529500 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 4, totalArr: 1919000, weightedArr: 767600 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 340000, weightedArr: 204000 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 1480000 }
  ],

  topDeals: [
    {
      client: "DTCC",
      dealName: "ELA",
      arr: 1850000,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: "2026-02-13",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      owner: "MS",
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 826,
      engNeed: "BACK-1603"
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
      riskLevel: "yellow",
      engNeed: "Security remediation"
    },
    {
      client: "US Bank",
      arr: 525000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Janney Montgomery Scott",
      arr: 525000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Bank of America",
      dealName: "Global Markets",
      arr: 432000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-04-30",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (BCC)",
      arr: 391000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "green",
      engNeed: "Term extraction BACK-1654"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (SFT)",
      arr: 391000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-06-30",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 364
    },
    {
      client: "BMO Capital Markets",
      arr: 391000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "CIBC",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 189
    },
    {
      client: "Goldman Sachs",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    }
  ],

  atRiskDeals: [
    {
      client: "DTCC - ELA",
      arr: 1850000,
      daysOverdue: 826,
      issue: "BACK-1603",
      priority: "P0"
    },
    {
      client: "Broadridge - Internal ELA",
      arr: 1000000,
      daysOverdue: 350,
      issue: "Security remediation",
      priority: "P0"
    },
    {
      client: "BetaNxt",
      arr: 340000,
      daysOverdue: 510,
      issue: "Design and Deployment",
      priority: "P1"
    },
    {
      client: "Wells Fargo",
      arr: 313000,
      daysOverdue: 447,
      issue: "SSI Output",
      priority: "P1"
    },
    {
      client: "BBVA - CIB Ops (SFT)",
      arr: 391000,
      daysOverdue: 364,
      issue: "BACK-1654",
      priority: "P1"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 4844000,
    atRiskPercent: 34.7,
    dealCount: 5
  },

  bySegment: [
    { segment: "Capital Markets", count: 55, arr: 8200000, percent: 58.8 },
    { segment: "Fin Market Infrastructure", count: 6, arr: 4190000, percent: 30.0 },
    { segment: "Banking", count: 22, arr: 1100000, percent: 7.9 },
    { segment: "Insurance", count: 1, arr: 0, percent: 0 }
  ],

  byAgentFamily: [
    { family: "ELA", arr: 2850000 },
    { family: "Reconciliation", arr: 1348000 },
    { family: "Comms", arr: 1027000 },
    { family: "Operations", arr: 986000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - February 9, 2026
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
    totalARR: 990000,
    customersWithARR: 5,
    customersWithoutARR: 4,
    dataQualityIssue: "Contract dates, terms, and expiration fields are EMPTY"
  },

  engineeringNeeds: [
    {
      client: "DTCC - ELA",
      dealArr: 1850000,
      need: "BACK-1603 - Feb 13 close imminent",
      priority: "P0",
      jiraEpic: "BACK-1603"
    },
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "Security remediation (390 C/H), Account Opening scope",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "BBVA - CIB Ops",
      dealArr: 391000,
      need: "Term extraction",
      priority: "P1",
      jiraEpic: "BACK-1654"
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "CTC",
      dealArr: 96000,
      need: "Mercury extraction schemas, Bulk email upload — client meeting THIS WEEK",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "BetaNxt",
      dealArr: 340000,
      need: "Design and Deployment",
      priority: "P2",
      jiraEpic: null
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "Feb 13 close imminent", stage: "Contracting & Close 80%", daysInPipeline: 826 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "Security", status: "Remediation needed (390 C/H)", stage: "Biz Case 40%", daysInPipeline: 350 },
    { priority: "P0", client: "CTC", arr: 96000, jiraTicket: "Mercury", status: "Extraction schemas, Bulk email upload — client meeting THIS WEEK", stage: "Biz Case 40%" },
    { priority: "P1", client: "BBVA - CIB Ops", arr: 391000, jiraTicket: "BACK-1654", status: "Term extraction", stage: "Biz Case 40%", daysInPipeline: 364 },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "Config needed", stage: "Not confirmed", daysInPipeline: 447 },
    { priority: "P2", client: "BetaNxt", arr: 340000, jiraTicket: "Unknown", status: "Design and Deployment", stage: "Commercial Alignment 60%", daysInPipeline: 510 }
  ],

  revenueAtRiskByBlocker: {
    total: 4590000,
    byBlocker: [
      { blocker: "BACK-1603 (DTCC)", arr: 1850000 },
      { blocker: "Security (Broadridge)", arr: 1000000 },
      { blocker: "BACK-1654 (BBVA)", arr: 391000 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "Stale (BetaNxt)", arr: 340000 },
      { blocker: "Mercury (CTC)", arr: 96000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 2541300,
    q2WeightedARR: 277050,
    q3WeightedARR: 241300,
    q4WeightedARR: 5000,
    totalProjectedYear: 1503200,
    note: 'Q1 weighted closing at $2,541,300 — DTCC close Feb 13, 6 new pentest findings, CTC meeting this week'
  },

  dataQualityNotes: [
    'DTCC close date Feb 13 - 4 days away',
    'BetaNxt 510 days in pipeline - needs engagement',
    '6 new Critical pentest findings (SC-326 to SC-331)',
    'CTC bulk email upload urgent - client meeting this week',
    'Sprint S3 at RED, 28.4% completion',
    'Broadridge security remediation 390 C/H findings',
    'BACK-1695 data anomaly - Status "To Do" but Resolution "Done"'
  ]
};

// ═══════════════════════════════════════════════════════════════
// Q1 2026 CLOSING DEALS
// ═══════════════════════════════════════════════════════════════

export const q1_2026_deals: Deal[] = [
  {
    client: "DTCC",
    dealName: "ELA",
    arr: 1850000,
    stage: "Contracting & Close",
    probability: 80,
    closeDate: "2026-02-13",
    product: "ELA",
    segment: "Fin Market Infrastructure",
    engineeringRequired: true,
    riskLevel: "red",
    atRisk: true,
    daysOverdue: 826,
    engNeed: "BACK-1603"
  },
  {
    client: "BetaNxt",
    dealName: "Design & Deploy",
    arr: 340000,
    stage: "Commercial Alignment",
    probability: 60,
    closeDate: "2026-02-20",
    product: "Operations",
    segment: "Fin Market Infrastructure",
    engineeringRequired: false,
    riskLevel: "red",
    atRisk: true,
    daysOverdue: 510
  },
  {
    client: "Avaloq",
    arr: 250000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-02-27",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "yellow"
  },
  {
    client: "CTC",
    arr: 96000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-10",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: true,
    riskLevel: "yellow",
    engNeed: "Mercury extraction schemas, Bulk email upload"
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
    riskLevel: "yellow",
    engNeed: "Security remediation"
  },
  {
    client: "BBVA",
    dealName: "CIB Ops",
    arr: 391000,
    stage: "Business Case & Champion Commit",
    probability: 40,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: true,
    riskLevel: "yellow",
    engNeed: "Term extraction BACK-1654"
  },
  {
    client: "Customers Bank",
    arr: 50000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Banking",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "M1 Financial",
    arr: 75000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  },
  {
    client: "Raymond James",
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
    client: "Janney Montgomery Scott",
    arr: 525000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Operations",
    segment: "Cap Markets",
    engineeringRequired: false,
    riskLevel: "green"
  }
];

// ═══════════════════════════════════════════════════════════════
// ARR BY AGENT FAMILY
// ═══════════════════════════════════════════════════════════════

export const arrByAgentFamily = [
  { family: 'ELA', arr: 2850000 },
  { family: 'Reconciliation', arr: 1348000 },
  { family: 'Comms', arr: 1027000 },
  { family: 'Operations', arr: 986000 },
  { family: 'SSIs', arr: 313000 }
];

// ═══════════════════════════════════════════════════════════════
// SEGMENT BREAKDOWN
// ═══════════════════════════════════════════════════════════════

export const segmentBreakdown = [
  { segment: 'Capital Markets', deals: 55, rawARR: 8200000, percent: 58.8 },
  { segment: 'Fin Market Infrastructure', deals: 6, rawARR: 4190000, percent: 30.0 },
  { segment: 'Banking', deals: 22, rawARR: 1100000, percent: 7.9 },
  { segment: 'Insurance', deals: 1, rawARR: 0, percent: 0 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'DTCC ELA ($1.85M) Close Feb 13 — 4 Days', description: 'DTCC deal closing Feb 13 - 4 days away. BACK-1603 must be resolved.' },
  { type: 'critical', category: 'engineering', title: 'Sprint S3 at RED — 28.4% Completion', description: 'Sprint 2026-S3 at RED status, only 28.4% completion.' },

  // HIGH
  { type: 'high', category: 'engineering', title: '6 New Critical SC Pentest Findings', description: '6 Critical SC pentest findings (SC-326 to SC-331) require triage.' },
  { type: 'high', category: 'sales', title: 'CTC Bulk Email Upload Urgent', description: 'CTC bulk email upload urgent — client meeting THIS WEEK.' },

  // MEDIUM
  { type: 'medium', category: 'sales', title: '9 Accounts No Stage', description: '9 accounts with no stage assigned.' },
  { type: 'medium', category: 'sales', title: 'At-Risk ARR at 34.7%', description: '$4.84M at-risk ARR across 5 deals — 34.7% of pipeline.' },

  // POSITIVE
  { type: 'positive', category: 'sales', title: 'Pipeline Growth +24%', description: 'Pipeline grew $2.7M (+24%) since Jan 18 baseline, 9 new deals added.' }
];

// ═══════════════════════════════════════════════════════════════
// DATA LAST UPDATED
// ═══════════════════════════════════════════════════════════════

export const dataLastUpdated = "February 9, 2026, 10:14 AM MT";

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
