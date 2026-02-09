// Blocked Items Data - Updated February 9, 2026 at 10:14 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 (Day 11 of 15)

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

// Current Sprint Blocked Items - 1 in S3 (improved from 12 → 1)
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "BACK-1863",
    summary: "[Colony] Allegro post process validation",
    assignee: "Unassigned",
    daysBlocked: 10,
    category: "client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1863",
    reason: "Blocked AND unassigned — no owner to resolve"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  {
    key: "BACK-1863",
    summary: "[Colony] Allegro post process validation",
    assignee: "Unassigned",
    daysBlocked: 10,
    category: "client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1863",
    reason: "Blocked AND unassigned — no owner to resolve"
  }
];

// Stale In Progress items (no updates in 10+ days)
export const staleInProgressItems = [
  { key: "BACK-1810", summary: "[Pentest] Fix weak SSL Cipher for WPEngine", assignee: "Brandon Baguley", points: 2, lastUpdated: "2026-01-30", daysSinceUpdate: 10, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1810" },
  { key: "BACK-1677", summary: "Add support for custom data validation to LLM schema", assignee: "Darius Ouderkirk", points: null, lastUpdated: "2026-01-30", daysSinceUpdate: 10, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1677" }
];

export const blockedSummary = {
  total: 1,
  sprintBlocked: 1,
  backlogBlocked: 16,
  p0Count: 0,
  p1Count: 1,
  p2Count: 0,
  avgDaysBlocked: 10,
  oldestBlocked: "BACK-1863 (10 days)",
  unassignedCount: 1,
  staleInProgress: 2,
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
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 34, updated: 'Jan 6' },
  { ticket: 'UI-658', summary: 'Enable Customer Self-Service SSO/SAML', assignee: 'Matthew Snow', daysBlocked: 48, updated: 'Dec 23' },
  { ticket: 'UI-625', summary: 'Implement UI for paginated work item tasks', assignee: 'Owen Riley', daysBlocked: 34, updated: 'Jan 6' },
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 98, updated: 'Nov 3' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 48, updated: 'Dec 23' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 48, updated: 'Dec 23' },
  { ticket: 'UI-544', summary: 'Status Dashboard fix other hyperlinks', assignee: 'Matthew Snow', daysBlocked: 34, updated: 'Jan 6' },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 133, updated: 'Sep 29' },
  { ticket: 'SYSADMN-89', summary: 'BambooHR to Azure AD Integration', assignee: 'Unassigned', daysBlocked: 878, updated: 'Sep 15, 2023' },
  { ticket: 'FB-2013', summary: 'Increase timeout in FL server', assignee: 'Mitesh Yadav', daysBlocked: 901, updated: 'Aug 23, 2023' },
  { ticket: 'FB-2001', summary: 'Update Federated Learning Model', assignee: 'Mitesh Yadav', daysBlocked: 901, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1803', summary: 'Integrate Federated Learning', assignee: 'Mitesh Yadav', daysBlocked: 901, updated: 'Aug 23, 2023' },
  { ticket: 'FB-1493', summary: 'Populate DeepGraph with evaluation results', assignee: 'Unassigned', daysBlocked: 1170, updated: 'Nov 28, 2022' },
  { ticket: 'FB-1442', summary: 'Save evaluations to DeepGraph', assignee: 'Matthew Poulton', daysBlocked: 928, updated: 'Jul 27, 2023' },
  { ticket: 'FB-1437', summary: 'Integrate Document Endpoints with DeepGraph', assignee: 'Unassigned', daysBlocked: 1152, updated: 'Dec 16, 2022' },
  { ticket: 'FB-786', summary: 'Set up separate PROD/non-PROD Azure accounts', assignee: 'Unassigned', daysBlocked: 67, updated: 'Dec 4' }
];
// Note: 16 total long-running blocked. 6 are legacy FB items that should be closed/archived. 5 UI items assigned to Matthew Snow need triage.

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
