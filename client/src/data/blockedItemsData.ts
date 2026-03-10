// Blocked Items Data - Updated March 10, 2026 at 12:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 (Day 11 of 14)

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
    daysBlocked: 25,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 25 days -- internal dependency"
  }
];

// All blocked items including backlog
// UI-743 DONE as of Mar 10 -- removed from blocked list
export const blockedItems: BlockedItem[] = [
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 25,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 25 days -- internal dependency"
  }
];

// Stale In Progress items (>5 days in status) -- from JIRA Mar 10 extraction
export const staleInProgressItems = [
  { key: "UI-780", summary: "Handle 401 errors better", assignee: "Owen Riley", points: 2, lastUpdated: "2026-02-27", daysSinceUpdate: 11, jiraUrl: "https://deepsee.atlassian.net/browse/UI-780" },
  { key: "CI-946", summary: "Investigate gpu node failure", assignee: "Chad Hegerhorst", points: 3, lastUpdated: "2026-02-28", daysSinceUpdate: 10, jiraUrl: "https://deepsee.atlassian.net/browse/CI-946" },
  { key: "CI-937", summary: "Create Basic K8s Operator POC", assignee: "Jeff Hegerhorst", points: 5, lastUpdated: "2026-03-02", daysSinceUpdate: 8, jiraUrl: "https://deepsee.atlassian.net/browse/CI-937" },
  { key: "BACK-1835", summary: "Documents PSQL Schema", assignee: "Aleksander Winski", points: 5, lastUpdated: "2026-03-04", daysSinceUpdate: 6, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1835" }
];

// Stale Code Review items (>3 days) -- from JIRA Mar 10 extraction
export const staleCodeReviewItems = [
  { key: "BACK-1993", summary: "Documents Stuck in Mercury Bottleneck", assignee: "Unassigned", points: 0, daysInReview: 11, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1993" },
  { key: "BACK-2011", summary: "Automations Improvements", assignee: "Lane Terry", points: 5, daysInReview: 6, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2011" },
  { key: "BACK-1980", summary: "AWS SQS to Kafka Camel Adapter", assignee: "Lane Terry", points: 5, daysInReview: 5, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1980" },
  { key: "BACK-1303", summary: "ML Label/Challenge Workflow Template", assignee: "Ivan Peev", points: 0, daysInReview: 4, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1303" },
  { key: "BACK-1302", summary: "ML Label/Challenge Output Handler CLI", assignee: "Ivan Peev", points: 0, daysInReview: 4, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1302" },
  { key: "BACK-1298", summary: "ML Label/Challenge Workflow", assignee: "Ivan Peev", points: 13, daysInReview: 4, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1298" },
  { key: "BACK-1301", summary: "ML Label/Challenge Input CLI", assignee: "Ivan Peev", points: 0, daysInReview: 4, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1301" }
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
