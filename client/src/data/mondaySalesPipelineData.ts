// Sales Pipeline Data - Monday.com CRM
// Last Updated: February 3, 2026 @ 7:30 PM MT
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
  totalAccounts: number;
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
  atRiskSummary: { totalAtRiskARR: number; atRiskPercent: number; dealCount: number; note?: string };
  bySegment: { segment: string; count: number; arr: number; percent: number }[];
  byAgentFamily: { family: string; arr: number }[];
  existingCustomers: ExistingCustomer[];
  existingCustomerSummary: { totalARR: number; customersWithARR: number; customersWithoutARR: number; dataQualityIssue: string };
  engineeringNeeds: EngineeringNeed[];
  engineeringAlignment: { priority: string; client: string; arr: number; jiraTicket: string; status: string; stage: string; daysInPipeline?: number }[];
  revenueAtRiskByBlocker: { total: number; byBlocker: { blocker: string; arr: number }[] };
  q1Closing: { q1WeightedARR: number; q2WeightedARR: number; q3WeightedARR: number; q4WeightedARR: number; totalProjectedYear: number; note: string };
}

// ═══════════════════════════════════════════════════════════════
// FEBRUARY 1, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-02-01T19:30:00-07:00",
    totalPipeline: 11177000,
    weightedPipeline: 1707200,
    activeDeals: 55,
    totalAccounts: 97,
    avgOpportunityAge: 157,
    closingQ1_2026: 979850,
    closingThisMonth: 0,
    existingCustomerArr: 931200,
    // Comparison to Jan 28
    previousPipeline: 11180000,
    previousWeighted: 1710000,
    previousDeals: 97,
    pipelineChange: -3000,
    pipelineChangePercent: 0,
    weightedChange: -2800,
    weightedChangePercent: -0.2,
    dealChange: -42  // 55 active vs 97 total accounts
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 52, totalArr: 11180000, weightedArr: 169650 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 20, totalArr: 7780000, weightedArr: 222900, convRate: 69.6 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 10, totalArr: 5550000, weightedArr: 392250, convRate: 71.4 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 4, totalArr: 3990000, weightedArr: 718400, convRate: 71.8 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 2190000, weightedArr: 204000, convRate: 54.9 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 0, convRate: 84.5, note: '$0 weighted - data issue' }
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
      riskNote: "800+ days, BACK-1603 blocked"
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
      riskNote: "342 days, security remediation"
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
      segment: "Fin Market Infrastructure",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "DTCC",
      dealName: "SSI",
      arr: 416200,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: null,
      product: "SSIs",
      segment: "Cap Markets",
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
      riskNote: "181+ days stale"
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
      dealName: "Payments",
      arr: 275000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Capstone Investment",
      arr: 265000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: null,
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
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
    }
  ],

  atRiskDeals: [
    {
      client: "DTCC - ELA",
      arr: 1850000,
      issue: "800+ days in pipeline (since Nov 2023), $0 weighted, BACK-1603 blocked",
      priority: "P0"
    },
    {
      client: "Broadridge - Internal ELA",
      arr: 1000000,
      issue: "342 days, Biz Case stage, security remediation blocker",
      priority: "P0"
    },
    {
      client: "Morgan Stanley",
      arr: 225000,
      issue: "On hold/Keep in touch status",
      priority: "P2"
    },
    {
      client: "Société Generale",
      arr: 225000,
      issue: "On hold/Keep in touch status",
      priority: "P2"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 3300000,
    atRiskPercent: 29.5,
    dealCount: 4,
    note: 'Additional 8+ accounts have no ARR/stage assigned (new Jan 2026 leads)'
  },

  bySegment: [
    { segment: "Capital Markets", count: 34, arr: 6819000, percent: 61.0 },
    { segment: "Fin Market Infrastructure", count: 5, arr: 3440000, percent: 30.8 },
    { segment: "Banking", count: 16, arr: 918000, percent: 8.2 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 3518000 },
    { family: "ELA", arr: 2850000 },
    { family: "Reconciliation", arr: 2052000 },
    { family: "Operations", arr: 1774000 },
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
    riskNote: "181+ days in pipeline"
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
  }
];

// ═══════════════════════════════════════════════════════════════
// ARR BY AGENT FAMILY
// ═══════════════════════════════════════════════════════════════

export const arrByAgentFamily = [
  { family: 'Comms', arr: 3518000 },
  { family: 'ELA', arr: 2850000 },
  { family: 'Reconciliation', arr: 2052000 },
  { family: 'Operations', arr: 1774000 },
  { family: 'SSIs', arr: 313000 }
];

// ═══════════════════════════════════════════════════════════════
// SEGMENT BREAKDOWN
// ═══════════════════════════════════════════════════════════════

export const segmentBreakdown = [
  { segment: 'Capital Markets', deals: 34, rawARR: 6819000, percent: 61.0 },
  { segment: 'Fin Market Infrastructure', deals: 5, rawARR: 3440000, percent: 30.8 },
  { segment: 'Banking', deals: 16, rawARR: 918000, percent: 8.2 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL - Engineering
  { type: 'critical', category: 'engineering', title: 'S3 67% Unassigned', description: '55 of 82 tickets unassigned on Day 2. 57% also missing story point estimates.' },

  // CRITICAL - Sales
  { type: 'critical', category: 'sales', title: 'DTCC ELA ($1.85M)', description: '800+ days in pipeline, BACK-1603 BLOCKED, $0 weighted ARR shown.' },
  { type: 'critical', category: 'sales', title: 'C&C Stage Data Issue', description: 'Contracting & Close shows $0 weighted despite $1.85M raw - data/filter issue.' },

  // HIGH
  { type: 'high', category: 'sales', title: 'Broadridge ($1.0M)', description: '342 days in Biz Case, security remediation blocker.' },
  { type: 'high', category: 'engineering', title: '17 Blocked in Backlog', description: 'All stale >14 days. Matthew Snow (4) and Owen Riley (5) have most.' },
  { type: 'high', category: 'sales', title: '8+ Accounts No Data', description: 'SS&C GlobeOp, KPMG, ING, etc. have no ARR or stage - need qualification.' },

  // MEDIUM
  { type: 'medium', category: 'engineering', title: 'S2 Overcommitment Pattern', description: '21 tickets never started in S2. Same risk in S3 with 67% unassigned.' },
  { type: 'medium', category: 'engineering', title: 'No S3 Work Assigned', description: 'Lane Terry, Loris D\'Acunto, Karolina Toman have zero S3 tickets.' },
  { type: 'medium', category: 'sales', title: 'Deals On Hold', description: 'Morgan Stanley + Société Generale ($450K combined) marked Keep in Touch.' },
  { type: 'medium', category: 'sales', title: 'Colony/BBVA Not Found', description: 'Colony Bank and BBVA not in active Sales Pipeline board.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'No S3 Blockers', description: 'Zero blocked tickets in current sprint.' },
  { type: 'positive', category: 'engineering', title: 'ARTEMIS Work Mix Up', description: '37.8% vs 10.3% in S2 - moving toward 50-60% target.' },
  { type: 'positive', category: 'engineering', title: 'Kalvin Available', description: 'Completed all S3 work - available for additional assignments.' },
  { type: 'positive', category: 'sales', title: 'Q1 Weighted $980K', description: 'Q1 closing pipeline improved from near-$0 to $979,850.' }
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
