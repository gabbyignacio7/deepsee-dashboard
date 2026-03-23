// Blocked Items Data - Updated March 23, 2026
// Source: JIRA Sprint Extraction - Sprint 2026-S6 (Day 11 of 15)

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

// Current Sprint Blocked Items - 4 blocked in sprint (same as Mar 19, now blocked 6 days)
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "BACK-2042",
    summary: "Tooling Library for Agent consumption",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2042",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2041",
    summary: "Artemis Implementation Checklist",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2041",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2017",
    summary: "Provision all documents returned by content understanding",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2017",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2001",
    summary: "Auto generate terms that don't exist in the schema",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2001",
    reason: "Blocked ~6 days"
  }
];

// All blocked items including backlog - 14 total (4 sprint + 10 backlog)
export const blockedItems: BlockedItem[] = [
  {
    key: "BACK-2042",
    summary: "Tooling Library for Agent consumption",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2042",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2041",
    summary: "Artemis Implementation Checklist",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2041",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2017",
    summary: "Provision all documents returned by content understanding",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2017",
    reason: "Blocked ~6 days"
  },
  {
    key: "BACK-2001",
    summary: "Auto generate terms that don't exist in the schema",
    assignee: "Unassigned",
    daysBlocked: 6,
    category: "backend",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2001",
    reason: "Blocked ~6 days"
  },
  {
    key: "UI-740",
    summary: "Deep Recon - Add Dropdown List for Assignee Names",
    assignee: "Matthew Snow",
    daysBlocked: 38,
    category: "internal",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-740",
    reason: "Blocked 38 days -- internal dependency"
  }
];

// Stale In Progress items (>5 days in status) -- from JIRA Mar 23 extraction
export const staleInProgressItems = [
  { key: "BACK-2023", summary: "Onboard Sunwest Treasury Onboarding with Custom Analyzers", assignee: "Brandon Baguley", points: 0, lastUpdated: "2026-03-13", daysSinceUpdate: 10, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2023" }
];

// Stale Code Review items (>3 days) -- from JIRA Mar 23 extraction
export const staleCodeReviewItems: typeof staleInProgressItems = [
  { key: "BACK-2043", summary: "Merge artemis-platform", assignee: "Treven Trujillo", points: 0, lastUpdated: "2026-03-18", daysSinceUpdate: 5, jiraUrl: "https://deepsee.atlassian.net/browse/BACK-2043" }
];

export const blockedSummary = {
  total: 14,
  sprintBlocked: 4,
  backlogBlocked: 10,
  p0Count: 0,
  p1Count: 0,
  p2Count: 5,
  avgDaysBlocked: 124,
  oldestBlocked: "SYSADMN-89 (897 days)",
  unassignedCount: 4,
  staleInProgress: 1,
  staleCodeReview: 1,
  legacyFBItems: 0,
  longBlockedByAssignee: {
    'Matthew Snow': 4,
    'Unassigned': 8,
    'Other': 2
  }
};

// Long-blocked items in backlog (not in current sprint) - 14 total
// FB-xxxx items Canceled, UI-544/625 Canceled -- cleaned up
// Added 4 new sprint blocked items (BACK-2042, 2041, 2017, 2001) on Mar 19
export const longBlockedItems = [
  { ticket: 'SYSADMN-89', summary: 'BambooHR to Azure AD Integration', assignee: 'Unassigned', daysBlocked: 897, updated: 'Sep 15, 2023' },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 173, updated: 'Sep 29, 2025' },
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 138, updated: 'Nov 3' },
  { ticket: 'FB-786', summary: 'Set up separate PROD/non-PROD Azure accounts', assignee: 'Unassigned', daysBlocked: 107, updated: 'Dec 4' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 88, updated: 'Dec 23' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 88, updated: 'Dec 23' },
  { ticket: 'UI-658', summary: 'Enable Customer Self-Service SSO/SAML', assignee: 'Matthew Snow', daysBlocked: 88, updated: 'Dec 23' },
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 74, updated: 'Jan 6' },
  { ticket: 'UI-740', summary: 'Deep Recon - Add Dropdown for Assignee Names', assignee: 'Matthew Snow', daysBlocked: 38, updated: 'Mar 3' },
  { ticket: 'UI-682', summary: 'Enhance Golden Source Picker for Colony', assignee: 'Unassigned', daysBlocked: 22, updated: 'Feb 27' },
  { ticket: 'BACK-2042', summary: 'Tooling Library for Agent consumption', assignee: 'Unassigned', daysBlocked: 6, updated: 'Mar 17' },
  { ticket: 'BACK-2041', summary: 'Artemis Implementation Checklist', assignee: 'Unassigned', daysBlocked: 6, updated: 'Mar 17' },
  { ticket: 'BACK-2017', summary: 'Provision all documents returned by content understanding', assignee: 'Unassigned', daysBlocked: 6, updated: 'Mar 17' },
  { ticket: 'BACK-2001', summary: 'Auto generate terms that don\'t exist in the schema', assignee: 'Unassigned', daysBlocked: 6, updated: 'Mar 17' }
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
