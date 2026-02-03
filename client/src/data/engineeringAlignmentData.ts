// Engineering Alignment Data - Updated February 3, 2026
// Source: Monday.com CRM + JIRA

export interface EngineeringDeal {
  company: string;
  arr: number;
  needDescription: string;
  jiraTicket: string;
  priority: "P0" | "P1" | "P2";
  status: string;
  jiraUrl?: string;
}

export const engineeringDeals: EngineeringDeal[] = [
  {
    company: "Broadridge",
    arr: 1000000,
    needDescription: "Security remediation",
    jiraTicket: "SC project",
    priority: "P0",
    status: "In Progress",
    jiraUrl: "https://deepsee.atlassian.net/jira/software/c/projects/SC"
  },
  {
    company: "DTCC",
    arr: 1850000,
    needDescription: "Settlement instructions / Deep Recon sync",
    jiraTicket: "BACK-1603",
    priority: "P0",
    status: "BLOCKED",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1603"
  },
  {
    company: "Colony Bank",
    arr: 59000,
    needDescription: "HMDA/CRA compliance tool",
    jiraTicket: "BACK-1778",
    priority: "P1",
    status: "TO DO",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1778"
  },
  {
    company: "Wells Fargo",
    arr: 313000,
    needDescription: "SSI Output config",
    jiraTicket: "-",
    priority: "P1",
    status: "Unknown"
  },
  {
    company: "CTC",
    arr: 0,
    needDescription: "Mercury conversion",
    jiraTicket: "BACK-1528/1529",
    priority: "P1",
    status: "TO DO",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1528"
  },
  {
    company: "BBVA",
    arr: 325000,
    needDescription: "Term extraction",
    jiraTicket: "BACK-1654",
    priority: "P2",
    status: "TO DO",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1654"
  },
  {
    company: "Accenture",
    arr: 225000,
    needDescription: "Performance improvements",
    jiraTicket: "BACK-1723",
    priority: "P2",
    status: "In Progress",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1723"
  }
];

export const engineeringSummary = {
  totalDeals: 7,
  totalARR: 3772000,
  p0Count: 2,
  p0ARR: 2850000,
  p1Count: 3,
  p1ARR: 372000,
  p2Count: 2,
  p2ARR: 550000
};
