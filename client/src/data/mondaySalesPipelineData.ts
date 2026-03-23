// Sales Pipeline Data - Monday.com CRM
// Last Updated: March 23, 2026 @ 3:58 PM MT
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
// MARCH 23, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-03-23T15:58:00-07:00",
    totalPipeline: 14057000,
    weightedPipeline: 3463950,
    activeDeals: 117,
    activeAccounts: 117,
    totalAccounts: 117,
    avgOpportunityAge: 174,
    closingQ1_2026: 929500,
    closingThisMonth: 2190000,
    existingCustomerArr: 990200,
    // Comparison to Mar 19
    previousPipeline: 13672000,
    previousWeighted: 3429650,
    previousDate: "2026-03-19",
    previousDeals: 114,
    pipelineChange: 385000,
    pipelineChangePercent: 2.8,
    weightedChange: 34300,
    weightedChangePercent: 1.0,
    dealChange: 3
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 54, totalArr: 3531000, weightedArr: 176550, convRate: 75.5 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 28, totalArr: 4369000, weightedArr: 436900, convRate: 61.8 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 11, totalArr: 1932000, weightedArr: 483000, convRate: 72.7 },
    { stage: "Business Case & Champion Commit", probability: 35, count: 5, totalArr: 2250000, weightedArr: 787500, convRate: 53.3 },
    { stage: "Contracting & Close", probability: 80, count: 2, totalArr: 1975000, weightedArr: 1580000, note: "DTCC-ELA $1.85M + BetaNxt $125K" }
  ],

  topDeals: [
    {
      client: "DTCC",
      dealName: "ELA",
      arr: 1850000,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: "2026-03-20",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      owner: "Matt Sobolewski",
      engineeringRequired: true,
      riskLevel: "yellow",
      atRisk: true,
      daysOverdue: 3,
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
      daysOverdue: 391,
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
      daysOverdue: 764
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
      daysOverdue: 230
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
      daysOverdue: 300
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
      daysOverdue: 354
    },
    {
      client: "BetaNxt",
      dealName: "Design & Deploy",
      arr: 125000,
      stage: "Contracting & Close",
      probability: 80,
      closeDate: "2026-03-06",
      product: "Operations",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      atRisk: true,
      daysOverdue: 17
    },
    {
      client: "Wells Fargo",
      dealName: "Wholesale Ops",
      arr: 313000,
      stage: "Business Case & Champion Commit",
      probability: 35,
      closeDate: "2026-04-30",
      product: "SSIs",
      segment: "Cap Markets",
      engineeringRequired: true,
      riskLevel: "red",
      atRisk: true,
      daysOverdue: 357
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
      closeDate: "2026-03-09",
      product: "Comms",
      segment: "Cap Markets",
      engineeringRequired: false,
      riskLevel: "yellow",
      daysOverdue: 248
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
      daysOverdue: 51,
      issue: "Contract EXPIRED Jan 31 (-51 days). BACK-1918 DONE -- push renewal now.",
      priority: "P0",
      status: "URGENT: Renewal milestone achieved"
    },
    {
      client: "DTCC - ELA",
      arr: 1850000,
      daysOverdue: 3,
      issue: "BACK-1603 DONE — close date updated to Mar 20, now 3 days overdue. Push to close.",
      priority: "P0"
    },
    {
      client: "Bank of America",
      arr: 432000,
      daysOverdue: 764,
      issue: "764 days in pipeline at BCC stage",
      priority: "P1"
    },
    {
      client: "BetaNxt",
      arr: 125000,
      daysOverdue: 17,
      issue: "Close date Mar 6, 17 days overdue. CC 80%. ARR reduced $340K to $125K.",
      priority: "P1"
    },
    {
      client: "Wells Fargo",
      arr: 313000,
      daysOverdue: 357,
      issue: "357 days in pipeline, at BCC stage",
      priority: "P1"
    },
    {
      client: "Broadridge",
      arr: 1000000,
      daysOverdue: 391,
      issue: "Deal age 391 days. Steve — next steps needed.",
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
    { segment: "Capital Markets", count: 68, arr: 9802000, percent: 70 },
    { segment: "Fin Market Infrastructure", count: 11, arr: 3225000, percent: 23 },
    { segment: "Banking", count: 31, arr: 1030000, percent: 7 },
    { segment: "Insurance", count: 5, arr: 0, percent: 0 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 4075000 },
    { family: "Reconciliation", arr: 3460000 },
    { family: "ELA", arr: 2850000 },
    { family: "Operations", arr: 1644000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - March 23, 2026
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active", primary: "Joe Graziano" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active", primary: "Dominic Stanyer" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active", primary: "Steve Breen" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active", primary: "Sam Markey" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 59000, status: "At Risk", note: "Contract EXPIRED Jan 31 (-51 days). BACK-1918 DONE." },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active", primary: "Shawn Main" }
  ],

  existingCustomerSummary: {
    totalARR: 990200,
    customersWithARR: 6,
    customersWithoutARR: 0,
    dataQualityIssue: "Colony Bank contract expired (-51 days). 64 accounts missing ARR. 65 missing close date."
  },

  engineeringNeeds: [
    {
      client: "Colony Bank",
      dealArr: 59000,
      need: "Contract EXPIRED -51 days. BACK-1918 DONE -- push renewal now.",
      priority: "P0",
      jiraEpic: "BACK-1918"
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
      need: "UI-743 DONE (was blocked). Steve needs next steps on ELA.",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "CTC/BBVA",
      dealArr: 878000,
      need: "BACK-2028 CTC extraction DONE. BACK-2051 extraction issue IP. BBVA email processing sprint goal.",
      priority: "P0",
      jiraEpic: null
    },
    {
      client: "Wells Fargo",
      dealArr: 313000,
      need: "SSI Output — 357 days in pipeline, at BCC",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "BetaNxt",
      dealArr: 125000,
      need: "Design and Deployment — CC 80%, close Mar 6 expired (17d overdue)",
      priority: "P1",
      jiraEpic: null
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "DONE — close date updated to Mar 20, 3d overdue. Push to close.", stage: "Contracting & Close 80%", daysInPipeline: 3 },
    { priority: "P0", client: "Colony Bank", arr: 59000, jiraTicket: "BACK-1918", status: "Contract EXPIRED -51d. BACK-1918 DONE -- push renewal.", stage: "Won - At Risk", daysInPipeline: 0 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "UI-800", status: "UI-800 API reqs CR (Owen). UI-743 DONE.", stage: "Biz Case 30%", daysInPipeline: 391 },
    { priority: "P0", client: "CTC/BBVA", arr: 878000, jiraTicket: "BACK-2028", status: "BACK-2028 CTC DONE. BACK-2051 DONE. BBVA email sprint goal.", stage: "Solution Fit/Biz Case", daysInPipeline: 0 },
    { priority: "P1", client: "BetaNxt", arr: 125000, jiraTicket: "Active", status: "CC 80%, close Mar 6 expired (17d overdue)", stage: "Contracting & Close 80%", daysInPipeline: 17 },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "357 days in pipeline, at BCC", stage: "Biz Case 35%", daysInPipeline: 357 }
  ],

  revenueAtRiskByBlocker: {
    total: 4225000,
    byBlocker: [
      { blocker: "BACK-1603 DONE (DTCC) — close imminent", arr: 1850000 },
      { blocker: "UI-800 API reqs (Broadridge)", arr: 1000000 },
      { blocker: "BACK-2051 extraction IP (CTC/BBVA)", arr: 878000 },
      { blocker: "Close Mar 6 expired (BetaNxt)", arr: 125000 },
      { blocker: "SSI Output (Wells Fargo)", arr: 313000 },
      { blocker: "Contract expired -45d (Colony Bank)", arr: 59000 }
    ]
  },

  q1Closing: {
    q1WeightedARR: 929500,
    q2WeightedARR: 617400,
    q3WeightedARR: 318750,
    q4WeightedARR: 12450,
    totalProjectedYear: 1854250,
    note: 'Q1 weighted stable. DTCC $1.85M engineering complete -- push to close. BetaNxt $125K close Mar 6 expired. Avaloq close Mar 9 expired.'
  },

  dataQualityNotes: [
    'DTCC-ELA $1.85M -- close date UPDATED to Mar 20 (was Feb 13). Now only 3 days overdue!',
    'Colony Bank contract EXPIRED Jan 31 (-51 days) -- no renewal deal tracked',
    'BetaNxt $125K close date EXPIRED Mar 6 -- 17 days past',
    'Sprint S6 Day 11 -- 56 unassigned (43.4%), 51.9% complete, 4 blocked, health RED',
    'ARTEMIS at 5.4% vs 60% target -- still severely under',
    'Pipeline grew $385K (2.8%) from $13.672M to $14.057M -- NEW Vanguard $350K deal',
    '65 accounts missing ARR, 66 missing close date, 40 missing agent family',
    'SOC2 compliance batch: Jeff 16 tickets (14 Done), Chad 6 tickets (6 Done)',
    '67 of 129 tickets Done (51.9%) -- massive velocity surge from SOC2 + client work'
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
    closeDate: "2026-03-09",
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
  { segment: 'Capital Markets', deals: 68, rawARR: 9802000, percent: 70 },
  { segment: 'Fin Market Infrastructure', deals: 11, rawARR: 3225000, percent: 23 },
  { segment: 'Banking', deals: 31, rawARR: 1030000, percent: 7 },
  { segment: 'Insurance', deals: 5, rawARR: 0, percent: 0 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'Colony Bank Contract EXPIRED (-51 days)', description: 'Contract expired Jan 31. BACK-1918 DONE. Push renewal now. -51 days and counting.' },
  { type: 'critical', category: 'engineering', title: '4 Blocked Items — All Unassigned (6d)', description: 'BACK-2042, 2041, 2017, 2001 blocked 6 days. All unassigned. Need immediate owner + unblock.' },
  { type: 'critical', category: 'engineering', title: 'ARTEMIS at 5.4% vs 60% Target', description: '7 ARTEMIS tickets in S6 of 129 total. Severely under target. 4 days left in sprint.' },
  { type: 'critical', category: 'engineering', title: 'S7 Planning: Only 2 Tickets', description: 'S7 starts in 4 days with only 2 tickets pre-assigned. CRITICAL planning gap.' },

  // HIGH
  { type: 'high', category: 'engineering', title: 'Sprint Progress 51.9% vs 73.3%', description: 'S6 Day 11: 51.9% complete vs 73.3% expected. Still behind pace, health RED.' },
  { type: 'high', category: 'sales', title: 'BetaNxt $125K Close Expired (17d)', description: 'Close date Mar 6 expired. 17 days overdue at CC 80%.' },
  { type: 'high', category: 'sales', title: 'DTCC $1.85M: Close Date Updated', description: 'Close date moved to Mar 20. Now 3 days overdue (was 479!). Imminent close signal.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'Massive Velocity Surge: 67 Done', description: '25 Done -> 67 Done in 4 days. SOC2 batch (Jeff 14, Chad 6) + client work driving completion.' },
  { type: 'positive', category: 'engineering', title: 'Kalvin: Artemis Workflow Studio', description: '10 sprint tickets, 8 Done. Blueprint analytics, workflow studio, run experience all shipped.' },
  { type: 'positive', category: 'sales', title: 'Pipeline $14.057M (+$385K)', description: 'New Vanguard $350K at QLD. 3 new accounts added. Pipeline grew 2.8%.' }
];

// ═══════════════════════════════════════════════════════════════
// DATA LAST UPDATED
// ═══════════════════════════════════════════════════════════════

export const dataLastUpdated = "March 23, 2026, 3:58 PM MT";

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
