// Top Deals Data - Updated February 9, 2026
// Source: Monday.com CRM

export interface Deal {
  rank: number;
  company: string;
  stage: string;
  arr: number;
  probability: number;
  weighted: number;
  daysInStage: number;
  owner?: string;
  segment?: string;
  agentFamily?: string;
  q1Close?: boolean;
  atRisk?: boolean;
  riskReason?: string;
  engineeringNeed?: {
    description: string;
    jiraTicket: string;
    priority: "P0" | "P1" | "P2";
    status: string;
  };
}

export const topDeals: Deal[] = [
  {
    rank: 1, company: "DTCC - ELA", stage: "Contracting & Close", arr: 1850000, probability: 80, weighted: 1480000, daysInStage: 826,
    segment: "Fin Market Infra", agentFamily: "ELA", q1Close: true, atRisk: true, riskReason: "826 days, BACK-1603 blocker, close Feb 13",
    engineeringNeed: { description: "Settlement instructions / Deep Recon sync", jiraTicket: "BACK-1603", priority: "P0", status: "At Risk" }
  },
  {
    rank: 2, company: "Broadridge - Internal ELA", stage: "Business Case", arr: 1000000, probability: 40, weighted: 400000, daysInStage: 350,
    segment: "Fin Market Infra", agentFamily: "ELA", q1Close: true, atRisk: true, riskReason: "Security remediation (390 C/H vulnerabilities)",
    engineeringNeed: { description: "Security remediation + Account Opening", jiraTicket: "SC project + Account Opening PRD", priority: "P0", status: "In Progress" }
  },
  {
    rank: 3, company: "US Bank", stage: "Problem Validation", arr: 525000, probability: 10, weighted: 52500, daysInStage: 0, segment: "Cap Markets"
  },
  {
    rank: 4, company: "Janney Montgomery Scott", stage: "Solution Fit", arr: 525000, probability: 25, weighted: 131250, daysInStage: 5,
    segment: "Cap Markets", agentFamily: "Operations", q1Close: true
  },
  {
    rank: 5, company: "Bank of America - Global Markets", stage: "Business Case", arr: 432000, probability: 40, weighted: 172800, daysInStage: 33,
    segment: "Cap Markets", agentFamily: "Reconciliation"
  },
  {
    rank: 6, company: "BBVA - CIB Ops (BCC)", stage: "Business Case", arr: 391000, probability: 40, weighted: 156400, daysInStage: 342,
    segment: "Cap Markets", q1Close: true,
    engineeringNeed: { description: "Term extraction", jiraTicket: "BACK-1654", priority: "P1", status: "TO DO" }
  },
  {
    rank: 7, company: "BBVA - CIB Ops (SFT)", stage: "Solution Fit", arr: 391000, probability: 25, weighted: 97750, daysInStage: 364,
    segment: "Cap Markets", atRisk: true, riskReason: "364 days in pipeline"
  },
  {
    rank: 8, company: "BMO Capital Markets", stage: "Qualified Lead", arr: 391000, probability: 5, weighted: 19550, daysInStage: 0, segment: "Cap Markets"
  },
  {
    rank: 9, company: "CIBC", stage: "Problem Validation", arr: 391000, probability: 10, weighted: 39100, daysInStage: 189,
    segment: "Cap Markets", atRisk: true, riskReason: "189 days"
  },
  {
    rank: 10, company: "Goldman Sachs", stage: "Problem Validation", arr: 391000, probability: 10, weighted: 39100, daysInStage: 0, segment: "Cap Markets"
  },
  {
    rank: 11, company: "Nomura Securities", stage: "Problem Validation", arr: 391000, probability: 10, weighted: 39100, daysInStage: 0, segment: "Cap Markets"
  },
  {
    rank: 12, company: "BetaNxt", stage: "Commercial Alignment", arr: 340000, probability: 60, weighted: 204000, daysInStage: 510,
    segment: "Fin Market Infra", q1Close: true, atRisk: true, riskReason: "510 days in pipeline"
  },
  {
    rank: 13, company: "Wells Fargo - Wholesale Ops", stage: "Solution Fit", arr: 313000, probability: 25, weighted: 78250, daysInStage: 447,
    segment: "Cap Markets", agentFamily: "Settlement", atRisk: true, riskReason: "447 days, SSI dependency",
    engineeringNeed: { description: "SSI Output config", jiraTicket: "-", priority: "P1", status: "Pending" }
  },
  {
    rank: 14, company: "Capstone Investment Advisors", stage: "Problem Validation", arr: 265000, probability: 10, weighted: 26500, daysInStage: 0, segment: "Cap Markets"
  },
  {
    rank: 15, company: "JPM - Fixed Income", stage: "Solution Fit", arr: 265000, probability: 25, weighted: 66250, daysInStage: 0,
    segment: "Cap Markets", agentFamily: "Operations"
  }
];

export const topDealsSummary = {
  top5TotalARR: 4332000,
  top5WeightedARR: 2236550,
  atRiskCount: 5,
  atRiskARR: 4844000
};
