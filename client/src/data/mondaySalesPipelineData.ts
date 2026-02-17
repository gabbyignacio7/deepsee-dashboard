// Sales Pipeline Data - Monday.com CRM
// Last Updated: February 17, 2026 @ 12:00 PM MT
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
// FEBRUARY 13, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-02-13T15:52:00-07:00",
    totalPipeline: 12865000,
    weightedPipeline: 2009400,
    activeDeals: 47,
    activeAccounts: 47,
    totalAccounts: 102,
    avgOpportunityAge: 161,
    closingQ1_2026: 1060800,
    closingThisMonth: 2190000,
    existingCustomerArr: 990200,
    // Comparison to Feb 9
    previousPipeline: 13949000,
    previousWeighted: 1837050,
    previousDate: "2026-02-09",
    previousDeals: 98,
    pipelineChange: -1084000,
    pipelineChangePercent: -7.8,
    weightedChange: 172350,
    weightedChangePercent: 9.4,
    dealChange: -51
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 12, totalArr: 12870000, weightedArr: 148000 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 10, totalArr: 9900000, weightedArr: 372800 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 8, totalArr: 6180000, weightedArr: 517000 },
    { stage: "Business Case & Champion Commit", probability: 40, count: 5, totalArr: 4110000, weightedArr: 767600 },
    { stage: "Commercial Alignment", probability: 60, count: 2, totalArr: 2190000, weightedArr: 204000 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 0, note: "DTCC-ELA only — weighted shows $0 (dashboard anomaly)" }
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
      daysOverdue: 830,
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
      client: "Janney Montgomery Scott",
      arr: 525000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-31",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "US Bank",
      dealName: "Recon",
      arr: 525000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
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
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 751
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (Recon)",
      arr: 391000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-06-30",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 368
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (Comms)",
      arr: 391000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "yellow",
      daysOverdue: 368
    },
    {
      client: "CIBC",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 193
    },
    {
      client: "Nomura Securities Intl",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Goldman Sachs",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-07-01",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BMO Capital Markets",
      arr: 391000,
      stage: "Qualified Lead/Discovery",
      probability: 5,
      closeDate: "2026-07-31",
      product: "Comms",
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
      closeDate: "2026-02-20",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 514
    },
    {
      client: "Wells Fargo",
      dealName: "Wholesale Ops",
      arr: 313000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-04-30",
      product: "SSIs",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 451
    },
    {
      client: "JPM",
      dealName: "Payments",
      arr: 275000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-07-01",
      product: "Comms",
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
      closeDate: "2026-09-30",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Capstone Investment Advisors",
      arr: 265000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "Avaloq",
      arr: 250000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-02-27",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 235
    },
    {
      client: "CTC",
      dealName: "Chicago Trading Company",
      arr: 96000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-10",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "yellow",
      engNeed: "CTC PoV not started"
    }
  ],

  atRiskDeals: [
    {
      client: "Colony Bank",
      arr: 59000,
      daysOverdue: 14,
      issue: "Contract EXPIRED Jan 31 (-14 days)",
      priority: "P0",
      status: "URGENT: Renewal negotiation"
    },
    {
      client: "DTCC - ELA",
      arr: 1850000,
      daysOverdue: 830,
      issue: "Close date TODAY (Feb 13), 830 days in pipeline",
      priority: "P0"
    },
    {
      client: "Bank of America",
      arr: 432000,
      daysOverdue: 751,
      issue: "751 days in pipeline at BCC stage",
      priority: "P1"
    },
    {
      client: "BetaNxt",
      arr: 340000,
      daysOverdue: 514,
      issue: "Close date Feb 20, 514 days in pipeline",
      priority: "P1"
    },
    {
      client: "Wells Fargo",
      arr: 313000,
      daysOverdue: 451,
      issue: "451 days in pipeline at SFT stage",
      priority: "P1"
    },
    {
      client: "BBVA - CIB Ops",
      arr: 391000,
      daysOverdue: 368,
      issue: "Potential duplicate (SFT + BCC)",
      priority: "P1"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 3385000,
    atRiskPercent: 26.3,
    dealCount: 6,
    note: "Colony Bank expired contract adds urgency beyond pipeline ARR"
  },

  bySegment: [
    { segment: "Capital Markets", count: 34, arr: 8767000, percent: 68 },
    { segment: "Fin Market Infrastructure", count: 5, arr: 3440000, percent: 27 },
    { segment: "Banking", count: 8, arr: 658000, percent: 5 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 4075000 },
    { family: "Reconciliation", arr: 3460000 },
    { family: "ELA", arr: 2850000 },
    { family: "Operations", arr: 1644000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - February 13, 2026
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active", primary: "Joe Graziano" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active", primary: "Dominic Stanyer" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active", primary: "Steve Breen" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active", primary: "Sam Markey" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 59000, status: "At Risk", note: "Contract EXPIRED Jan 31 (-14 days)" },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active", primary: "Shawn Main" }
  ],

  existingCustomerSummary: {
    totalARR: 990200,
    customersWithARR: 6,
    customersWithoutARR: 0,
    dataQualityIssue: "Colony Bank contract expired. Contract dates, terms, and expiration fields are EMPTY for most."
  },

  engineeringNeeds: [
    {
      client: "Colony Bank",
      dealArr: 59000,
      need: "Mercury HITL (6 tickets ALL unassigned). Contract EXPIRED.",
      priority: "P0",
      jiraEpic: "BACK-1921"
    },
    {
      client: "DTCC - ELA",
      dealArr: 1850000,
      need: "BACK-1603 - Close date TODAY (Feb 13)",
      priority: "P0",
      jiraEpic: "BACK-1603"
    },
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "UI-743 blocked (export), UI-755 IP (email), BACK-1920 (counterparties)",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "CTC",
      dealArr: 96000,
      need: "PoV Not Started. Demo prep needed.",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output — 451 days in pipeline",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "BetaNxt",
      dealArr: 340000,
      need: "Design and Deployment — close Feb 20",
      priority: "P1",
      jiraEpic: null
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "Colony Bank", arr: 59000, jiraTicket: "BACK-1921", status: "Mercury HITL (6 tickets) ALL unassigned. Contract EXPIRED.", stage: "Won - At Risk", daysInPipeline: 0 },
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "Close date TODAY (Feb 13)", stage: "Contracting & Close 80%", daysInPipeline: 830 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "UI-743/UI-755", status: "Export blocked, email IP, counterparties To Do", stage: "Biz Case 40%", daysInPipeline: 354 },
    { priority: "P1", client: "BetaNxt", arr: 340000, jiraTicket: "Active", status: "Close Feb 20, 514 days in pipeline", stage: "Commercial Alignment 60%", daysInPipeline: 514 },
    { priority: "P1", client: "CTC", arr: 96000, jiraTicket: "None", status: "PoV Not Started, demo prep needed", stage: "Biz Case 40%" },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "451 days in pipeline at SFT", stage: "Solution Fit 25%", daysInPipeline: 451 }
  ],

  revenueAtRiskByBlocker: {
    total: 3994000,
    byBlocker: [
      { blocker: "BACK-1603 (DTCC)", arr: 1850000 },
      { blocker: "Security/UI (Broadridge)", arr: 1000000 },
      { blocker: "Mercury HITL (Colony Bank)", arr: 59000 },
      { blocker: "BACK-1654 (BBVA)", arr: 391000 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "Close Feb 20 (BetaNxt)", arr: 340000 },
      { blocker: "PoV Not Started (CTC)", arr: 96000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 1060800,
    q2WeightedARR: 617400,
    q3WeightedARR: 318750,
    q4WeightedARR: 12450,
    totalProjectedYear: 2009400,
    note: 'Q1 weighted: $1.06M across 10 deals. DTCC close TODAY, BetaNxt close Feb 20, Avaloq close Feb 27.'
  },

  dataQualityNotes: [
    'DTCC-ELA $1.85M close date TODAY (Feb 13)',
    'Colony Bank contract EXPIRED Jan 31 (-14 days)',
    'BetaNxt $340K closing Feb 20 (514 days in pipeline)',
    'Sprint S4 Day 1 — 65.6% tickets unassigned',
    'Mercury HITL (6 tickets) ALL unassigned — Colony Bank dependency',
    'S5 readiness: RED (97% unassigned, 93% unestimated)',
    '55 accounts missing ARR, 40 missing close date'
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
  { family: 'Comms', arr: 4075000 },
  { family: 'Reconciliation', arr: 3460000 },
  { family: 'ELA', arr: 2850000 },
  { family: 'Operations', arr: 1644000 },
  { family: 'SSIs', arr: 313000 }
];

// ═══════════════════════════════════════════════════════════════
// SEGMENT BREAKDOWN
// ═══════════════════════════════════════════════════════════════

export const segmentBreakdown = [
  { segment: 'Capital Markets', deals: 34, rawARR: 8767000, percent: 68 },
  { segment: 'Fin Market Infrastructure', deals: 5, rawARR: 3440000, percent: 27 },
  { segment: 'Banking', deals: 8, rawARR: 658000, percent: 5 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'DTCC-ELA ($1.85M) Close Date TODAY', description: '$1.85M deal — close date Feb 13 (today). 830 days in pipeline. Need status update from Steve.' },
  { type: 'critical', category: 'sales', title: 'Colony Bank Contract EXPIRED (-14 days)', description: 'Renewal contract expired Jan 31. $59K ARR at risk. Mercury HITL (6 tickets) ALL unassigned.' },
  { type: 'critical', category: 'engineering', title: 'Mercury HITL — ALL 6 TICKETS UNASSIGNED', description: 'BACK-1921 through BACK-1926 all To Do/Unassigned. Colony Bank dependency. Assign immediately.' },
  { type: 'critical', category: 'engineering', title: '65.6% Tickets Unassigned — Day 1', description: '40 of 61 sprint tickets have no owner. Sprint assignment session needed with Brandon.' },

  // HIGH
  { type: 'high', category: 'engineering', title: 'S5 Readiness: RED', description: '97% unassigned, 93% unestimated. Sprint planning needed before Feb 27.' },
  { type: 'high', category: 'sales', title: 'BetaNxt $340K Closing Feb 20', description: 'BetaNxt Design & Deploy closing in 7 days. 514 days in pipeline.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'Velocity Trending Strong', description: 'S3=140%, S2=126%, S1=98%. Team consistently outperforming commitments.' },
  { type: 'positive', category: 'engineering', title: 'ARTEMIS Mix Improved to 40%', description: 'Up from 28% in S3. Still below 50-60% target but trending positive.' }
];

// ═══════════════════════════════════════════════════════════════
// DATA LAST UPDATED
// ═══════════════════════════════════════════════════════════════

export const dataLastUpdated = "February 17, 2026, 12:00 PM MT";

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
