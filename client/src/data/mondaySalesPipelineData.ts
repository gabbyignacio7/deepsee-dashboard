// Sales Pipeline Data - Monday.com CRM
// Last Updated: January 28, 2026 @ 12:00 PM MT
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
  riskNote?: string;
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
}

export interface StageData {
  stage: DealStage;
  probability: number;
  count: number;
  totalArr: number;
  weightedArr: number;
  convRate?: number;
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
  previousPipeline: number;
  previousWeighted: number;
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
  atRiskDeals: { client: string; arr: number; issue: string; priority: string; status?: string }[];
  atRiskSummary: { totalAtRiskARR: number; atRiskPercent: number; dealCount: number };
  bySegment: { segment: string; count: number; arr: number; percent: number }[];
  byAgentFamily: { family: string; arr: number }[];
  existingCustomers: ExistingCustomer[];
  existingCustomerSummary: { totalARR: number; dataQualityIssue: string };
  engineeringNeeds: EngineeringNeed[];
  engineeringAlignment: { priority: string; client: string; arr: number; jiraTicket: string; status: string; stage: string }[];
  revenueAtRiskByBlocker: { total: number; byBlocker: { blocker: string; arr: number }[] };
  q1Closing: { q1WeightedARR: number; targetFromBaseline: number; gap: number; alert: string };
}

// ═══════════════════════════════════════════════════════════════
// JANUARY 28, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-01-28T12:00:00-07:00",
    totalPipeline: 11180000,
    weightedPipeline: 1710000,
    activeDeals: 97,
    avgOpportunityAge: 157,
    closingQ1_2026: 0,  // Near $0 weighted - CRITICAL
    closingThisMonth: 0,
    existingCustomerArr: 990200,
    // Comparison to Jan 18
    previousPipeline: 11250000,
    previousWeighted: 1660000,
    previousDeals: 89,
    pipelineChange: -70000,
    pipelineChangePercent: -0.6,
    weightedChange: 50000,
    weightedChangePercent: 3.0,
    dealChange: 8
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 52, totalArr: 11180000, weightedArr: 169650 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 20, totalArr: 7780000, weightedArr: 222900, convRate: 69.6 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 10, totalArr: 5550000, weightedArr: 392250, convRate: 71.4 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 4, totalArr: 3990000, weightedArr: 718400, convRate: 71.8 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 2190000, weightedArr: 204000, convRate: 54.9 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 0, convRate: 84.5 }  // $0 weighted - DTCC issue
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
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      riskNote: "BACK-1603 BLOCKED, 26+ months in stage"
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
      riskLevel: "red",
      atRisk: true,
      riskNote: "Security remediation blocker"
    },
    {
      client: "Abu Dhabi Inv Authority",
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
      segment: "Banking",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "CIBC",
      arr: 367000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops",
      arr: 367000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "yellow",
      engNeed: "BACK-1654"
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
      engineeringRequired: false,
      riskLevel: "yellow",
      atRisk: true,
      riskNote: "16+ months in pipeline"
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
      client: "Wells Fargo",
      dealName: "Wholesale Ops",
      arr: 313000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "yellow",
      engNeed: "SSI Output"
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
    },
    {
      client: "Northern Trust",
      dealName: "Alt Fund",
      arr: 264000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "MUFG",
      dealName: "Loan Ops",
      arr: 264000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "SMBC Europe",
      arr: 250000,
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
      client: "DTCC - ELA",
      arr: 1850000,
      issue: "In pipeline since Nov 2023 (26+ months), BACK-1603 BLOCKED, C&C weighted = $0",
      priority: "P0"
    },
    {
      client: "Broadridge - Internal ELA",
      arr: 1000000,
      issue: "In pipeline since Feb 2025 (11 months), Security remediation blocker",
      priority: "P0"
    },
    {
      client: "BetaNxt - Design",
      arr: 340000,
      issue: "In pipeline since Sep 2024 (16+ months)",
      priority: "P1"
    },
    {
      client: "Wells Fargo - Wholesale",
      arr: 313000,
      issue: "In pipeline since Nov 2024 (14+ months)",
      priority: "P1"
    },
    {
      client: "Deutsche Bank",
      arr: 149000,
      issue: "In pipeline since Aug 2024 (17+ months)",
      priority: "P2"
    },
    {
      client: "Marsh Insurance",
      arr: 50000,
      issue: "In pipeline since Oct 2024 (15+ months)",
      priority: "P2"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 3702000,
    atRiskPercent: 33.1,
    dealCount: 6
  },

  bySegment: [
    { segment: "Capital Markets", count: 34, arr: 6819000, percent: 61.0 },
    { segment: "Fin Market Infrastructure", count: 5, arr: 3440000, percent: 30.8 },
    { segment: "Banking", count: 16, arr: 918000, percent: 8.2 }
  ],

  byAgentFamily: [
    { family: "ELA", arr: 3090000 },
    { family: "Operations", arr: 2335000 },
    { family: "Comms", arr: 1464000 },
    { family: "Reconciliation", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - January 28, 2026
  // Total Live ARR: $990,200
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 177000, status: "Active", note: "HMDA/CRA - BACK-1778" },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active" }
  ],

  existingCustomerSummary: {
    totalARR: 990200,
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
      client: "Colony Bank",
      dealArr: 59000,
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
      client: "BBVA - CIB Ops",
      dealArr: 367000,
      need: "Term extraction / Mercury PRD",
      priority: "P2",
      jiraEpic: "BACK-1654"
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "BLOCKED", stage: "C&C 80%" },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "Security", status: "Remediation needed", stage: "BCC 40%" },
    { priority: "P1", client: "Colony Bank", arr: 59000, jiraTicket: "BACK-1778", status: "HMDA/CRA", stage: "Renewal" },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "Config needed", stage: "SFT 25%" },
    { priority: "P2", client: "BBVA - CIB Ops", arr: 367000, jiraTicket: "BACK-1654", status: "Term extraction", stage: "SFT 25%" }
  ],

  revenueAtRiskByBlocker: {
    total: 3589000,
    byBlocker: [
      { blocker: "BACK-1603 (DTCC)", arr: 1850000 },
      { blocker: "Security (Broadridge)", arr: 1000000 },
      { blocker: "BACK-1778 (Colony)", arr: 59000 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "BACK-1654 (BBVA)", arr: 367000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 0,
    targetFromBaseline: 1180000,
    gap: -1180000,
    alert: "Q1 closing pipeline appears significantly under-tracked. Many deals lack close dates."
  }
};

// ═══════════════════════════════════════════════════════════════
// Q1 2026 CLOSING DEALS
// ═══════════════════════════════════════════════════════════════

export const q1_2026_deals: Deal[] = [
  {
    client: "BetaNxt",
    dealName: "Design & Deploy",
    arr: 340000,
    stage: "Commercial Alignment",
    probability: 60,
    closeDate: "2026-01-31",
    product: "Operations",
    segment: "Fin Market Infrastructure",
    engineeringRequired: false,
    riskLevel: "yellow",
    atRisk: true,
    riskNote: "16+ months in pipeline"
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
    riskLevel: "red",
    atRisk: true,
    riskNote: "Security remediation blocker"
  },
  {
    client: "BBVA",
    dealName: "CIB Ops",
    arr: 367000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-31",
    product: "Comms",
    segment: "Cap Markets",
    engineeringRequired: true,
    riskLevel: "yellow",
    engNeed: "BACK-1654"
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
    riskLevel: "yellow",
    engNeed: "SSI Output"
  }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL - Engineering
  { type: 'critical', category: 'engineering', title: 'S3 Readiness Critical', description: '68% of S3 tickets unassigned, 58% missing estimates. Sprint starts Jan 30 (2 days).' },

  // CRITICAL - Sales
  { type: 'critical', category: 'sales', title: 'DTCC ELA ($1.85M)', description: 'In Contracting since Nov 2023 (26+ months). BACK-1603 BLOCKED. Weighted ARR shows $0.' },
  { type: 'critical', category: 'sales', title: 'Q1 Closing Gap', description: 'Dashboard shows near-$0 weighted ARR for Q1 2026 vs $1.18M baseline target.' },

  // HIGH
  { type: 'high', category: 'sales', title: 'Broadridge ($1.0M)', description: 'Security remediation blocker at Business Case stage. Combined with DTCC, $2.85M at risk.' },
  { type: 'high', category: 'engineering', title: 'Matthew Snow Blocked Backlog', description: '5 long-blocked tickets (>30 days) driving up workload to 16 tickets / 18pts.' },
  { type: 'high', category: 'sales', title: 'Renewals Board Incomplete', description: 'No contract dates, terms, or expiration dates populated. Cannot assess renewal risk.' },

  // MEDIUM
  { type: 'medium', category: 'engineering', title: 'Darius Ouderkirk Backlog Risk', description: '23pt full workload with 11 open tickets. Only 3 of 6 S2 tickets done.' },
  { type: 'medium', category: 'engineering', title: 'No S3 Work Assigned', description: 'Lane Terry, Loris D\'Acunto, Karolina Toman have zero S3 tickets.' },
  { type: 'medium', category: 'sales', title: 'Pipeline Hygiene', description: '33%+ of pipeline is stale (>12 months without stage progression).' },
  { type: 'medium', category: 'engineering', title: 'Work Mix Imbalance', description: 'ARTEMIS 10.3% (target 50-60%), Client 9.8% (target 30-40%). 64% uncategorized.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'No Active Blockers', description: 'Zero blocked tickets in S2/S3. Good signal.' },
  { type: 'positive', category: 'engineering', title: 'Strong Velocity', description: '58 tickets / 138 points done with 2 days remaining. 67.6% point completion.' }
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
