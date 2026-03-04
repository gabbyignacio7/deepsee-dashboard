// Sales Pipeline Data - Monday.com CRM
// Last Updated: March 4, 2026 @ 12:09 PM MT
// Source: Monday.com GraphQL API Extraction + PoV & Client Tracker

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
// MARCH 4, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-03-04T12:09:00-07:00",
    totalPipeline: 13655000,
    weightedPipeline: 3467300,
    activeDeals: 113,
    activeAccounts: 113,
    totalAccounts: 113,
    avgOpportunityAge: 163,
    closingQ1_2026: 929500,
    closingThisMonth: 2190000,
    existingCustomerArr: 990200,
    // Comparison to Feb 22
    previousPipeline: 12100000,
    previousWeighted: 1854250,
    previousDate: "2026-02-22",
    previousDeals: 91,
    pipelineChange: 1476000,
    pipelineChangePercent: 12.2,
    weightedChange: 1576550,
    weightedChangePercent: 85.0,
    dealChange: 12
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 49, totalArr: 3635000, weightedArr: 181750, convRate: 75.5 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 22, totalArr: 3764000, weightedArr: 376400, convRate: 61.8 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 11, totalArr: 2068000, weightedArr: 517000, convRate: 72.7 },
    { stage: "Business Case & Champion Commit", probability: 35, count: 4, totalArr: 1919000, weightedArr: 671650, convRate: 53.3 },
    { stage: "Commercial Alignment", probability: 60, count: 1, totalArr: 340000, weightedArr: 204000, convRate: 84.5 },
    { stage: "Contracting & Close", probability: 80, count: 1, totalArr: 1850000, weightedArr: 1480000, note: "DTCC-ELA only -- BACK-1603 DONE, close imminent" }
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
      owner: "Matt Sobolewski",
      engineeringRequired: true,
      riskLevel: "yellow",
      atRisk: true,
      daysOverdue: 470,
      engNeed: "BACK-1603 DONE — push to close"
    },
    {
      client: "Broadridge",
      dealName: "Internal ELA",
      arr: 1000000,
      stage: "Business Case & Champion Commit",
      probability: 30,
      closeDate: "2026-03-31",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      owner: "Steve Shillingford",
      engineeringRequired: true,
      riskLevel: "yellow",
      daysOverdue: 358,
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
      owner: "Matt Sobolewski",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "US Bank",
      dealName: "DTCC",
      arr: 525000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
      segment: "Cap Markets",
      owner: "Matt Sobolewski",
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
      owner: "Matt Sobolewski",
      engineeringRequired: false,
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 751
    },
    {
      client: "CIBC",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-05-29",
      product: "Reconciliation",
      segment: "Cap Markets",
      owner: "Matt Sobolewski",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 193
    },
    {
      client: "Goldman Sachs",
      arr: 391000,
      stage: "Problem Validation & Value Framing",
      probability: 10,
      closeDate: "2026-07-01",
      product: "Reconciliation",
      segment: "Cap Markets",
      owner: "Matt Sobolewski",
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
      owner: "Matt Sobolewski",
      engineeringRequired: false,
      riskLevel: "green"
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (A)",
      arr: 391000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-06-30",
      product: "Reconciliation",
      segment: "Cap Markets",
      owner: "Matt Sobolewski",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 368
    },
    {
      client: "BBVA",
      dealName: "CIB Ops (B)",
      arr: 391000,
      stage: "Business Case & Champion Commit",
      probability: 40,
      closeDate: "2026-03-31",
      product: "Comms",
      segment: "Cap Markets",
      owner: "Matt Sobolewski",
      engineeringRequired: true,
      riskLevel: "yellow",
      daysOverdue: 368
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
      client: "Avaloq",
      arr: 250000,
      stage: "Solution Fit/Technical Validation",
      probability: 25,
      closeDate: "2026-03-04",
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
      engNeed: "Mercury demo, Microsoft partner"
    }
  ],

  atRiskDeals: [
    {
      client: "Colony Bank",
      arr: 59000,
      daysOverdue: 19,
      issue: "Contract EXPIRED Jan 31 (-32 days). No renewal deal tracked.",
      priority: "P0",
      status: "URGENT: Immediate outreach needed"
    },
    {
      client: "DTCC - ELA",
      arr: 1850000,
      daysOverdue: 470,
      issue: "BACK-1603 DONE — engineering complete, push to close",
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
      client: "Broadridge",
      arr: 1000000,
      daysOverdue: 358,
      issue: "Deal age 358 days. Steve — next steps needed.",
      priority: "P1"
    }
  ],

  atRiskSummary: {
    totalAtRiskARR: 3994000,
    atRiskPercent: 33.0,
    dealCount: 6,
    note: "Colony Bank expired contract adds urgency beyond pipeline ARR. Q1 weighted down 21%."
  },

  bySegment: [
    { segment: "Capital Markets", count: 61, arr: 9442000, percent: 70 },
    { segment: "Fin Market Infrastructure", count: 11, arr: 3440000, percent: 25 },
    { segment: "Banking", count: 23, arr: 694000, percent: 5 },
    { segment: "Insurance", count: 5, arr: 0, percent: 0 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 4075000 },
    { family: "Reconciliation", arr: 3460000 },
    { family: "ELA", arr: 2850000 },
    { family: "Operations", arr: 1644000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - March 4, 2026
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active", primary: "Joe Graziano" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active", primary: "Dominic Stanyer" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active", primary: "Steve Breen" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active", primary: "Sam Markey" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 59000, status: "At Risk", note: "Contract EXPIRED Jan 31 (-19 days)" },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active", primary: "Shawn Main" }
  ],

  existingCustomerSummary: {
    totalARR: 990200,
    customersWithARR: 6,
    customersWithoutARR: 0,
    dataQualityIssue: "Colony Bank contract expired (-32 days). 55+ accounts missing ARR. 25+ missing close date."
  },

  engineeringNeeds: [
    {
      client: "Colony Bank",
      dealArr: 59000,
      need: "Contract EXPIRED -32 days. No renewal deal tracked. Immediate outreach.",
      priority: "P0",
      jiraEpic: "BACK-1965"
    },
    {
      client: "DTCC - ELA",
      dealArr: 1850000,
      need: "BACK-1603 DONE Feb 22 — engineering complete, push to close",
      priority: "P0",
      jiraEpic: "BACK-1603"
    },
    {
      client: "Broadridge",
      dealArr: 1000000,
      need: "UI-743 blocked (unassigned). UI-755 Done. Steve needs next steps.",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "CTC/BBVA",
      dealArr: 878000,
      need: "BACK-1938 IP (Lane/Treven). 8 Mercury HITL tickets unassigned — sprint goal.",
      priority: "P0",
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
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "DONE Feb 22 — engineering complete, push to close", stage: "Contracting & Close 80%", daysInPipeline: 470 },
    { priority: "P0", client: "Colony Bank", arr: 59000, jiraTicket: "BACK-1965/1918/1862", status: "Contract EXPIRED -32 days. No renewal deal tracked.", stage: "Won - At Risk", daysInPipeline: 0 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "UI-743", status: "UI-743 blocked unassigned, UI-755 Done", stage: "Biz Case 30%", daysInPipeline: 358 },
    { priority: "P0", client: "CTC/BBVA", arr: 878000, jiraTicket: "BACK-1938", status: "IP, Mercury HITL sprint goal unowned", stage: "Solution Fit/Biz Case", daysInPipeline: 0 },
    { priority: "P1", client: "BetaNxt", arr: 340000, jiraTicket: "Active", status: "Close Feb 20, 514 days in pipeline", stage: "Commercial Alignment 60%", daysInPipeline: 514 },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "451 days in pipeline at SFT", stage: "Solution Fit 25%", daysInPipeline: 451 }
  ],

  revenueAtRiskByBlocker: {
    total: 4440000,
    byBlocker: [
      { blocker: "BACK-1603 DONE (DTCC) — close imminent", arr: 1850000 },
      { blocker: "Security/UI (Broadridge)", arr: 1000000 },
      { blocker: "Mercury HITL unassigned (CTC/BBVA)", arr: 878000 },
      { blocker: "Close Feb 20 (BetaNxt)", arr: 340000 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "Contract expired (Colony Bank)", arr: 59000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 929500,
    q2WeightedARR: 617400,
    q3WeightedARR: 318750,
    q4WeightedARR: 12450,
    totalProjectedYear: 1854250,
    note: 'Q1 weighted DOWN 21% ($1.18M to $929K). DTCC $1.85M engineering complete. BetaNxt close Feb 20, Avaloq close Mar 2.'
  },

  dataQualityNotes: [
    'DTCC-ELA $1.85M -- BACK-1603 DONE, push to close (9 days past close date)',
    'Colony Bank contract EXPIRED Jan 31 (-32 days) -- no renewal deal tracked',
    'BetaNxt $340K close date EXPIRED Feb 20 -- 2 days past',
    'Sprint S4 Day 9 -- 23 unassigned (32.9%), 27.1% complete',
    'ARTEMIS at 11.4% vs 60% target -- severely under-allocated',
    'Pipeline grew $1.476M (12.2%) from $12.1M to $13.576M',
    '55+ accounts missing ARR, 25+ missing close date, 40+ missing agent family',
    '5+ stale accounts (365+ days) should be archived'
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
    riskLevel: "yellow",
    atRisk: true,
    daysOverdue: 470,
    engNeed: "BACK-1603 DONE"
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
    daysOverdue: 514
  },
  {
    client: "Avaloq",
    arr: 250000,
    stage: "Solution Fit/Technical Validation",
    probability: 25,
    closeDate: "2026-03-04",
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
    engNeed: "Mercury demo, Microsoft partner"
  },
  {
    client: "Broadridge",
    dealName: "Internal ELA",
    arr: 1000000,
    stage: "Business Case & Champion Commit",
    probability: 30,
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
  { segment: 'Capital Markets', deals: 61, rawARR: 9442000, percent: 70 },
  { segment: 'Fin Market Infrastructure', deals: 11, rawARR: 3440000, percent: 25 },
  { segment: 'Banking', deals: 23, rawARR: 694000, percent: 5 },
  { segment: 'Insurance', deals: 5, rawARR: 0, percent: 0 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'DTCC $1.85M: Engineering Complete', description: 'BACK-1603 DONE. Push to close immediately. 9 days past close date.' },
  { type: 'critical', category: 'sales', title: 'Colony Bank Contract EXPIRED (-32 days)', description: 'Renewal contract expired Jan 31. No renewal deal tracked. Immediate outreach needed.' },
  { type: 'critical', category: 'engineering', title: '27 Unassigned Sprint Tickets (32.9%)', description: 'Mercury HITL / Sunwest sprint goals at risk. Improved from 45.7% but still high.' },
  { type: 'critical', category: 'sales', title: 'BetaNxt $340K Close Date EXPIRED', description: 'Close date was Feb 20. 390 days in pipeline at Commercial Alignment. Follow up urgently.' },

  // HIGH
  { type: 'high', category: 'engineering', title: 'ARTEMIS at 13.4% vs 60% Target', description: 'Worsened from 29%. Severely under-allocated. Sprint scope adjustment urgently needed.' },
  { type: 'high', category: 'engineering', title: 'Sprint Behind Pace', description: '15.2% complete vs 64.3% expected at Day 9. Need 3.1x acceleration with 5 days left.' },
  { type: 'high', category: 'engineering', title: '9 Stale Items', description: '7 stale In Progress (>5 days), 2 stale Code Review (9 days). BACK-1299 stale 16 days.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'BACK-1603 DTCC ($1.85M) DONE', description: 'Major win -- engineering dependency cleared for largest deal in pipeline.' },
  { type: 'positive', category: 'engineering', title: 'Owen Riley: 9 Tickets Done', description: 'Major velocity -- 11 sprint tickets, 9 already complete. Leading sprint execution.' },
  { type: 'positive', category: 'sales', title: 'Pipeline Grew 12.2%', description: '$12.1M to $13.576M. Weighted pipeline up 85% to $3.43M.' }
];

// ═══════════════════════════════════════════════════════════════
// DATA LAST UPDATED
// ═══════════════════════════════════════════════════════════════

export const dataLastUpdated = "March 4, 2026, 12:09 PM MT";

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
