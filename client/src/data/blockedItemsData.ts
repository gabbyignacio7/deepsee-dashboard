// Blocked Items Data - Updated February 17, 2026 at 12:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 (Day 1 of 14)

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

// Current Sprint Blocked Items - 2 in S4
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "UI-743",
    summary: "Deep Recon - Make aggregated report exportable (Broadridge)",
    assignee: "Unassigned",
    daysBlocked: 0,
    category: "client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-743",
    reason: "Blocked AND unassigned — Broadridge client dependency"
  },
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 0,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked — internal dependency"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  {
    key: "UI-743",
    summary: "Deep Recon - Make aggregated report exportable (Broadridge)",
    assignee: "Unassigned",
    daysBlocked: 0,
    category: "client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-743",
    reason: "Blocked AND unassigned — Broadridge client dependency"
  },
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 0,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked — internal dependency"
  }
];

// Stale In Progress items (no updates in 10+ days)
export const staleInProgressItems = [
  { key: "BACK-1810", summary: "[Pentest] Fix weak SSL Cipher for WPEngine", assignee: "Brandon Baguley", points: 2, lastUpdated: "2026-01-30", daysSinceUpdate: 14, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1810" }
];

export const blockedSummary = {
  total: 2,
  sprintBlocked: 2,
  backlogBlocked: 16,
  p0Count: 0,
  p1Count: 1,
  p2Count: 1,
  avgDaysBlocked: 0,
  oldestBlocked: "UI-743 (Day 1)",
  unassignedCount: 1,
  staleInProgress: 1,
  legacyFBItems: 6,
  longBlockedByAssignee: {
    'Matthew Snow': 5,
    'Owen Riley': 3,
    'Unassigned': 5,
    'Other': 3
  }
};

// Long-blocked items in backlog (not in current sprint) - 16 total
export const longBlockedItems = [
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 38, updated: 'Jan 6' },
  { ticket: 'UI-658', summary: 'Enable Customer Self-Service SSO/SAML', assignee: 'Matthew Snow', daysBlocked: 52, updated: 'Dec 23' },
  { ticket: 'UI-625', summary: 'Implement UI for paginated work item tasks', assignee: 'Owen Riley', daysBlocked: 38, updated: 'Jan 6' },
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 102, updated: 'Nov 3' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 52, updated: 'Dec 23' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 52, updated: 'Dec 23' },
  { ticket: 'UI-544', summary: 'Status Dashboard fix other hyperlinks', assignee: 'Matthew Snow', daysBlocked: 38, updated: 'Jan 6' },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 137, updated: 'Sep 29' },
  { ticket: 'SYSADMN-89', summary: 'BambooHR to Azure AD Integration', assignee: 'Unassigned', daysBlocked: 882, updated: 'Sep 15, 2023' },
  { ticket: 'FB-2013', summary: 'Increase timeout in FL server', assignee: 'Mitesh Yadav', daysBlocked: 905, updated: 'Aug 23, 2023' },
  { ticket: 'FB-2001', summary: 'Update Federated Learning Model', assignee: 'Mitesh Yadav', daysBlocked: 905, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1803', summary: 'Integrate Federated Learning', assignee: 'Mitesh Yadav', daysBlocked: 905, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1493', summary: 'Populate DeepGraph with evaluation results', assignee: 'Unassigned', daysBlocked: 1174, updated: 'Nov 28, 2022' },
  { ticket: 'FB-1442', summary: 'Save evaluations to DeepGraph', assignee: 'Matthew Poulton', daysBlocked: 932, updated: 'Jul 27, 2023' },
  { ticket: 'FB-1437', summary: 'Integrate Document Endpoints with DeepGraph', assignee: 'Unassigned', daysBlocked: 1156, updated: 'Dec 16, 2022' },
  { ticket: 'FB-786', summary: 'Set up separate PROD/non-PROD Azure accounts', assignee: 'Unassigned', daysBlocked: 71, updated: 'Dec 4' }
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
