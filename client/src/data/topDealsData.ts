// Top Deals Data - Updated January 18, 2026
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
    rank: 1,
    company: "DTCC - ELA",
    stage: "Contracting & Close",
    arr: 1850000,
    probability: 80,
    weighted: 1480000,
    daysInStage: 804,
    segment: "Fin Market Infra",
    agentFamily: "ELA",
    q1Close: true,
    atRisk: true,
    riskReason: "Extended timeline (804 days)",
    engineeringNeed: {
      description: "Settlement instructions / Deep Recon sync",
      jiraTicket: "BACK-1603",
      priority: "P0",
      status: "BLOCKED"
    }
  },
  {
    rank: 2,
    company: "Broadridge - Internal ELA",
    stage: "Business Case",
    arr: 1000000,
    probability: 40,
    weighted: 400000,
    daysInStage: 328,
    segment: "Fin Market Infra",
    agentFamily: "ELA",
    q1Close: true,
    atRisk: true,
    riskReason: "At-risk per notes, 328 days in stage",
    engineeringNeed: {
      description: "Security remediation",
      jiraTicket: "SC project",
      priority: "P0",
      status: "In Progress"
    }
  },
  {
    rank: 3,
    company: "CIBC",
    stage: "Qualified Lead",
    arr: 367000,
    probability: 5,
    weighted: 18350,
    daysInStage: 167,
    segment: "Cap Markets",
    agentFamily: "Comms"
  },
  {
    rank: 4,
    company: "BetaNxt",
    stage: "Commercial Alignment",
    arr: 340000,
    probability: 60,
    weighted: 204000,
    daysInStage: 488,
    segment: "Fin Market Infra",
    q1Close: true,
    atRisk: true,
    riskReason: "Long cycle (488 days)"
  },
  {
    rank: 5,
    company: "Wells Fargo",
    stage: "Solution Fit",
    arr: 313000,
    probability: 25,
    weighted: 78250,
    daysInStage: 425,
    segment: "Cap Markets",
    agentFamily: "Settlement",
    q1Close: true,
    atRisk: true,
    riskReason: "Extended (425 days)",
    engineeringNeed: {
      description: "SSI Output config",
      jiraTicket: "-",
      priority: "P1",
      status: "Unknown"
    }
  },
  {
    rank: 6,
    company: "BBVA (combined)",
    stage: "Mixed",
    arr: 325000,
    probability: 32,  // avg of 25-40%
    weighted: 104000,
    daysInStage: 342,
    segment: "Cap Markets",
    atRisk: true,
    riskReason: "Multiple entries, 342 days",
    engineeringNeed: {
      description: "Term extraction",
      jiraTicket: "BACK-1654",
      priority: "P2",
      status: "TO DO"
    }
  },
  {
    rank: 7,
    company: "JPM - Payments",
    stage: "Qualified Lead",
    arr: 275000,
    probability: 5,
    weighted: 13750,
    daysInStage: 0,
    segment: "Cap Markets"
  },
  {
    rank: 8,
    company: "Northern Trust",
    stage: "Qualified Lead",
    arr: 264000,
    probability: 5,
    weighted: 13200,
    daysInStage: 285,
    segment: "Cap Markets"
  }
];

export const topDealsSummary = {
  top5TotalARR: 3870000,
  top5WeightedARR: 2180600,
  atRiskCount: 5,
  atRiskARR: 3828000
};
