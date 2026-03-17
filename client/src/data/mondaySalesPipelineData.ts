// Sales Pipeline Data - Monday.com CRM
// Last Updated: March 17, 2026 @ 10:15 AM MT
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
// MARCH 17, 2026 PIPELINE DATA
// ═══════════════════════════════════════════════════════════════

export const mondaySalesPipelineData: MondaySalesPipelineData = {
  overview: {
    asOf: "2026-03-17T10:15:00-07:00",
    totalPipeline: 13576000,
    weightedPipeline: 3420050,
    activeDeals: 114,
    activeAccounts: 114,
    totalAccounts: 114,
    avgOpportunityAge: 170,
    closingQ1_2026: 929500,
    closingThisMonth: 2190000,
    existingCustomerArr: 990200,
    // Comparison to Mar 10
    previousPipeline: 13171000,
    previousWeighted: 3383500,
    previousDate: "2026-03-10",
    previousDeals: 113,
    pipelineChange: 405000,
    pipelineChangePercent: 3.1,
    weightedChange: 36550,
    weightedChangePercent: 1.1,
    dealChange: 1
  },

  stageDistribution: [
    { stage: "Qualified Lead/Discovery", probability: 5, count: 53, totalArr: 3159000, weightedArr: 157950, convRate: 75.5 },
    { stage: "Problem Validation & Value Framing", probability: 10, count: 28, totalArr: 4356000, weightedArr: 435600, convRate: 61.8 },
    { stage: "Solution Fit/Technical Validation", probability: 25, count: 10, totalArr: 1836000, weightedArr: 459000, convRate: 72.7 },
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
      closeDate: "2026-02-13",
      product: "ELA",
      segment: "Fin Market Infrastructure",
      owner: "Matt Sobolewski",
      engineeringRequired: true,
      riskLevel: "yellow",
      atRisk: true,
      daysOverdue: 477,
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
      daysOverdue: 384,
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
      daysOverdue: 758
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
      daysOverdue: 224
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
      daysOverdue: 293
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
      daysOverdue: 348
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
      daysOverdue: 11
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
      daysOverdue: 350
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
      daysOverdue: 242
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
      daysOverdue: 45,
      issue: "Contract EXPIRED Jan 31 (-45 days). BACK-1918 DONE -- push renewal now.",
      priority: "P0",
      status: "URGENT: Renewal milestone achieved"
    },
    {
      client: "DTCC - ELA",
      arr: 1850000,
      daysOverdue: 477,
      issue: "BACK-1603 DONE — engineering complete, push to close",
      priority: "P0"
    },
    {
      client: "Bank of America",
      arr: 432000,
      daysOverdue: 758,
      issue: "758 days in pipeline at BCC stage",
      priority: "P1"
    },
    {
      client: "BetaNxt",
      arr: 125000,
      daysOverdue: 11,
      issue: "Close date Mar 6, 11 days overdue. CC 80%. ARR reduced $340K to $125K.",
      priority: "P1"
    },
    {
      client: "Wells Fargo",
      arr: 313000,
      daysOverdue: 350,
      issue: "350 days in pipeline, advanced from SFT to BCC stage",
      priority: "P1"
    },
    {
      client: "Broadridge",
      arr: 1000000,
      daysOverdue: 384,
      issue: "Deal age 384 days. Steve — next steps needed.",
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
    { segment: "Capital Markets", count: 65, arr: 9417000, percent: 69 },
    { segment: "Fin Market Infrastructure", count: 11, arr: 3225000, percent: 24 },
    { segment: "Banking", count: 31, arr: 934000, percent: 7 },
    { segment: "Insurance", count: 5, arr: 0, percent: 0 }
  ],

  byAgentFamily: [
    { family: "Comms", arr: 4075000 },
    { family: "Reconciliation", arr: 3460000 },
    { family: "ELA", arr: 2850000 },
    { family: "Operations", arr: 1644000 },
    { family: "SSIs", arr: 313000 }
  ],

  // Updated from Monday.com PoV & Client Tracker - March 17, 2026
  existingCustomers: [
    { client: "DTCC - SSI", arr: 416200, tcv3yr: 1162200, status: "Active", primary: "Joe Graziano" },
    { client: "Accenture", arr: 225000, tcv3yr: 725000, status: "Active", primary: "Dominic Stanyer" },
    { client: "Altaira", arr: 150000, tcv3yr: 450000, status: "Active", primary: "Steve Breen" },
    { client: "BetaNXT - UI", arr: 90000, tcv3yr: 90000, status: "Active", primary: "Sam Markey" },
    { client: "Colony Bank", arr: 59000, tcv3yr: 59000, status: "At Risk", note: "Contract EXPIRED Jan 31 (-45 days). BACK-1918 DONE." },
    { client: "Vantage Bank Texas", arr: 50000, tcv3yr: 150000, status: "Active", primary: "Shawn Main" }
  ],

  existingCustomerSummary: {
    totalARR: 990200,
    customersWithARR: 6,
    customersWithoutARR: 0,
    dataQualityIssue: "Colony Bank contract expired (-45 days). 64 accounts missing ARR. 65 missing close date."
  },

  engineeringNeeds: [
    {
      client: "Colony Bank",
      dealArr: 59000,
      need: "Contract EXPIRED -45 days. BACK-1918 DONE -- push renewal now.",
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
      need: "SSI Output — 350 days in pipeline, advanced to BCC",
      priority: "P1",
      jiraEpic: null
    },
    {
      client: "BetaNxt",
      dealArr: 125000,
      need: "Design and Deployment — CC 80%, close Mar 6 expired (11d overdue)",
      priority: "P1",
      jiraEpic: null
    }
  ],

  engineeringAlignment: [
    { priority: "P0", client: "DTCC - ELA", arr: 1850000, jiraTicket: "BACK-1603", status: "DONE — engineering complete, push to close", stage: "Contracting & Close 80%", daysInPipeline: 477 },
    { priority: "P0", client: "Colony Bank", arr: 59000, jiraTicket: "BACK-1918", status: "Contract EXPIRED -45d. BACK-1918 DONE -- push renewal.", stage: "Won - At Risk", daysInPipeline: 0 },
    { priority: "P0", client: "Broadridge", arr: 1000000, jiraTicket: "UI-800", status: "UI-800 API reqs spec (Owen). UI-743 DONE.", stage: "Biz Case 30%", daysInPipeline: 384 },
    { priority: "P0", client: "CTC/BBVA", arr: 878000, jiraTicket: "BACK-2028", status: "BACK-2028 CTC DONE. BACK-2051 extraction IP. BBVA email sprint goal.", stage: "Solution Fit/Biz Case", daysInPipeline: 0 },
    { priority: "P1", client: "BetaNxt", arr: 125000, jiraTicket: "Active", status: "CC 80%, close Mar 6 expired (11d overdue)", stage: "Contracting & Close 80%", daysInPipeline: 11 },
    { priority: "P1", client: "Wells Fargo", arr: 313000, jiraTicket: "SSI Output", status: "350 days in pipeline, advanced from SFT to BCC", stage: "Biz Case 35%", daysInPipeline: 350 }
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
    'DTCC-ELA $1.85M -- BACK-1603 DONE, push to close (477 days past close date)',
    'Colony Bank contract EXPIRED Jan 31 (-45 days) -- no renewal deal tracked',
    'BetaNxt $125K close date EXPIRED Mar 6 -- 11 days past',
    'Sprint S6 Day 5 -- 72 unassigned (72%), 10.0% complete',
    'ARTEMIS at 4.0% vs 60% target -- worst ratio yet',
    'Pipeline grew $405K (3.1%) from $13.171M to $13.576M',
    '64 accounts missing ARR, 65 missing close date, 40 missing agent family',
    'Wells Fargo advanced from SFT to BCC -- positive stage movement'
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
  { segment: 'Capital Markets', deals: 65, rawARR: 9417000, percent: 69 },
  { segment: 'Fin Market Infrastructure', deals: 11, rawARR: 3225000, percent: 24 },
  { segment: 'Banking', deals: 31, rawARR: 934000, percent: 7 },
  { segment: 'Insurance', deals: 5, rawARR: 0, percent: 0 }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD ALERTS
// ═══════════════════════════════════════════════════════════════

export const dashboardAlerts = [
  // CRITICAL
  { type: 'critical', category: 'sales', title: 'Colony Bank Contract EXPIRED (-45 days)', description: 'Contract expired Jan 31. BACK-1918 DONE. Push renewal now. -45 days and counting.' },
  { type: 'critical', category: 'engineering', title: '72 Unassigned Sprint Tickets (72%)', description: 'Early S6 sprint typical but needs urgent assignment push. 5 engineers with 0 tickets.' },
  { type: 'critical', category: 'engineering', title: 'ARTEMIS at 4% vs 60% Target', description: 'Worst ratio yet. Only 4 ARTEMIS tickets in S6. Must add ARTEMIS backlog items urgently.' },
  { type: 'critical', category: 'sales', title: 'DTCC $1.85M: Push to Close', description: 'BACK-1603 DONE. Engineering complete. Close date 477 days overdue.' },

  // HIGH
  { type: 'high', category: 'engineering', title: 'Sprint Progress 10% vs 33.3%', description: 'S6 Day 5: 10% complete vs 33.3% expected. Early sprint ramp-up but needs acceleration.' },
  { type: 'high', category: 'sales', title: 'BetaNxt $125K Close Expired (11d)', description: 'Close date Mar 6 expired. 11 days overdue at CC 80%.' },
  { type: 'high', category: 'engineering', title: '5 Engineers Missing From Sprint', description: 'Jeff, Chad, Konnor, Loris, Karolina have 0 S6 tickets. Assignment needed.' },

  // POSITIVE
  { type: 'positive', category: 'engineering', title: 'Stale Items: 11 -> 1', description: 'MASSIVE improvement. Only BACK-1796 (17d) remains. S5 stale backlog fully cleared.' },
  { type: 'positive', category: 'engineering', title: 'Code Review Queue Clear', description: '0 stale CR items (was 7 in S5). 3 active CRs all <3 days.' },
  { type: 'positive', category: 'engineering', title: 'Health Improved: RED -> YELLOW', description: 'Sprint transition brought health improvement. Blocked at 0, stale nearly eliminated.' }
];

// ═══════════════════════════════════════════════════════════════
// DATA LAST UPDATED
// ═══════════════════════════════════════════════════════════════

export const dataLastUpdated = "March 17, 2026, 10:15 AM MT";

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
