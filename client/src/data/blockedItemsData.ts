// Blocked Items Data - Updated March 17, 2026 at 10:15 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S6 (Day 5 of 15)

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
    daysBlocked: 32,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 32 days -- internal dependency"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 32,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 32 days -- internal dependency"
  }
];

// Stale In Progress items (>5 days in status) -- from JIRA Mar 17 extraction
export const staleInProgressItems = [
  { key: "BACK-1796", summary: "Auto refresh Allegro password before expiry", assignee: "Kannal Mutharasu", points: 5, lastUpdated: "2026-02-28", daysSinceUpdate: 17, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1796" }
];

// Stale Code Review items (>3 days) -- from JIRA Mar 17 extraction
// ALL CLEARED -- 0 stale CR items. Massive improvement from 7 stale CR in S5.
export const staleCodeReviewItems: typeof staleInProgressItems = [];

export const blockedSummary = {
  total: 11,
  sprintBlocked: 0,
  backlogBlocked: 10,
  p0Count: 0,
  p1Count: 0,
  p2Count: 1,
  avgDaysBlocked: 32,
  oldestBlocked: "UI-740 (32 days)",
  unassignedCount: 0,
  staleInProgress: 1,
  staleCodeReview: 0,
  legacyFBItems: 0,
  longBlockedByAssignee: {
    'Matthew Snow': 4,
    'Unassigned': 4,
    'Other': 2
  }
};

// Long-blocked items in backlog (not in current sprint) - 10 total
// FB-xxxx items Canceled, UI-544/625 Canceled -- cleaned up
export const longBlockedItems = [
  { ticket: 'SYSADMN-89', summary: 'BambooHR to Azure AD Integration', assignee: 'Unassigned', daysBlocked: 893, updated: 'Sep 15, 2023' },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 169, updated: 'Sep 29, 2025' },
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 134, updated: 'Nov 3' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 84, updated: 'Dec 23' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 84, updated: 'Dec 23' },
  { ticket: 'UI-658', summary: 'Enable Customer Self-Service SSO/SAML', assignee: 'Matthew Snow', daysBlocked: 84, updated: 'Dec 23' },
  { ticket: 'FB-786', summary: 'Set up separate PROD/non-PROD Azure accounts', assignee: 'Unassigned', daysBlocked: 103, updated: 'Dec 4' },
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 70, updated: 'Jan 6' },
  { ticket: 'UI-682', summary: 'Enhance Golden Source Picker for Colony', assignee: 'Unassigned', daysBlocked: 18, updated: 'Feb 27' },
  { ticket: 'UI-740', summary: 'Deep Recon - Add Dropdown for Assignee Names', assignee: 'Matthew Snow', daysBlocked: 32, updated: 'Mar 3' }
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
