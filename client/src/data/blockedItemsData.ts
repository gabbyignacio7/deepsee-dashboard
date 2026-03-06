// Blocked Items Data - Updated March 6, 2026 at 1:36 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 (Day 5 of 14)

export interface BlockedItem {
  key: string;
  summary: string;
  assignee: string;
  daysBlocked: number;
  category: string;
  priority: "P0" | "P1" | "P2";
  jiraUrl: string;
  reason?: string;
}

// Current Sprint Blocked Items - 1 in S4 (UI-743 moved to To Do)
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 21,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 21 days -- internal dependency"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 21,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 21 days -- internal dependency"
  },
  {
    key: "UI-743",
    summary: "Deep Recon - Make aggregated report exportable (Broadridge)",
    assignee: "Unassigned",
    daysBlocked: 1,
    category: "client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-743",
    reason: "Blocked AND unassigned — Broadridge client dependency"
  }
];

// Stale In Progress items (no updates in 10+ days)
export const staleInProgressItems = [
  { key: "BACK-1299", summary: "Single Model Input CLI", assignee: "Ivan Peev", points: 0, lastUpdated: "2026-02-06", daysSinceUpdate: 28, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1299" },
  { key: "BACK-1795", summary: "Add AccountName2 to DTCC Output", assignee: "Aleksander Winski", points: 2, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1795" },
  { key: "BACK-1911", summary: "Complete artemis-platform Project Setup", assignee: "Lane Terry", points: 5, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1911" },
  { key: "BACK-1297", summary: "Single Model Workflow", assignee: "Ivan Peev", points: 8, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1297" },
  { key: "BACK-1810", summary: "Pentest - SSL Cipher for WPEngine", assignee: "Brandon Baguley", points: 2, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1810" },
  { key: "CI-935", summary: "CNPG Backup cleanup", assignee: "Jeff Hegerhorst", points: 3, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/CI-935" },
  { key: "BACK-1862", summary: "Colony Bank RV loans evaluation", assignee: "Konnor Willison", points: 8, lastUpdated: "2026-02-13", daysSinceUpdate: 21, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1862" }
];

// Stale Code Review items (>3 days)
export const staleCodeReviewItems = [
  { key: "BACK-1918", summary: "[Colony] GAP Coverage Provider", assignee: "Kannal Mutharasu", points: 5, daysInReview: 20, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1918" },
  { key: "BACK-1792", summary: "JAVA Unit Test Markdowns", assignee: "Brandon Baguley", points: 1, daysInReview: 20, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1792" }
];

export const blockedSummary = {
  total: 20,
  sprintBlocked: 1,
  backlogBlocked: 19,
  p0Count: 0,
  p1Count: 0,
  p2Count: 1,
  avgDaysBlocked: 3,
  oldestBlocked: "UI-740 (5 days)",
  unassignedCount: 1,
  staleInProgress: 1,
  staleCodeReview: 3,
  legacyFBItems: 6,
  longBlockedByAssignee: {
    'Matthew Snow': 5,
    'Owen Riley': 3,
    'Unassigned': 5,
    'Other': 3
  }
};

// Long-blocked items in backlog (not in current sprint) - 15 total
export const longBlockedItems = [
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 106, updated: 'Nov 3' },
  { ticket: 'UI-658', summary: 'Enable Customer Self-Service SSO/SAML', assignee: 'Matthew Snow', daysBlocked: 56, updated: 'Dec 23' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 56, updated: 'Dec 23' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 56, updated: 'Dec 23' },
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 42, updated: 'Jan 6' },
  { ticket: 'UI-625', summary: 'Implement UI for paginated work item tasks', assignee: 'Owen Riley', daysBlocked: 42, updated: 'Jan 6' },
  { ticket: 'UI-544', summary: 'Status Dashboard fix other hyperlinks', assignee: 'Matthew Snow', daysBlocked: 42, updated: 'Jan 6' },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 141, updated: 'Sep 29' },
  { ticket: 'SYSADMN-89', summary: 'BambooHR to Azure AD Integration', assignee: 'Unassigned', daysBlocked: 886, updated: 'Sep 15, 2023' },
  { ticket: 'FB-2013', summary: 'Increase timeout in FL server', assignee: 'Mitesh Yadav', daysBlocked: 909, updated: 'Aug 23, 2023' },
  { ticket: 'FB-2001', summary: 'Update Federated Learning Model', assignee: 'Mitesh Yadav', daysBlocked: 909, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1803', summary: 'Integrate Federated Learning', assignee: 'Mitesh Yadav', daysBlocked: 909, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1493', summary: 'Populate DeepGraph with evaluation results', assignee: 'Unassigned', daysBlocked: 1177, updated: 'Nov 28, 2022' },
  { ticket: 'FB-1442', summary: 'Save evaluations to DeepGraph', assignee: 'Matthew Poulton', daysBlocked: 936, updated: 'Jul 27, 2023' },
  { ticket: 'FB-1437', summary: 'Integrate Document Endpoints with DeepGraph', assignee: 'Unassigned', daysBlocked: 1159, updated: 'Dec 16, 2022' }
];

export function getBlockedByPriority(priority: "P0" | "P1" | "P2"): BlockedItem[] {
  return blockedItems.filter(item => item.priority === priority);
}

export function getBlockedByAge(): BlockedItem[] {
  return [...blockedItems].sort((a, b) => b.daysBlocked - a.daysBlocked);
}

export function getCriticalBlocked(): BlockedItem[] {
  return blockedItems.filter(item => item.priority === "P0" || item.priority === "P1");
}

export function getBlockedByCategory(category: string): BlockedItem[] {
  return blockedItems.filter(item => item.category.includes(category));
}

export function getLongBlockedByAssignee(assignee: string) {
  return longBlockedItems.filter(item => item.assignee === assignee);
}
