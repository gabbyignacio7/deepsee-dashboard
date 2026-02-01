// Blocked Items Data - Updated January 28, 2026 at 12:00 PM MT
// Source: JIRA Sprint Extraction

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

// Current Sprint Blocked Items (0 items - no active blockers)
export const sprintBlockedItems: BlockedItem[] = [];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [];

// Long-blocked items (>30 days without progress)
export const longBlockedItems = [
  { ticket: 'UI-692', summary: 'Filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 30 },
  { ticket: 'UI-682', summary: 'Enhance Golden Source Picker (Colony)', assignee: 'Owen Riley', daysBlocked: 30 },
  { ticket: 'UI-658', summary: 'Customer Self-Service SSO/SAML mapping', assignee: 'Matthew Snow', daysBlocked: 45 },
  { ticket: 'UI-625', summary: 'UI for paginated work item tasks', assignee: 'Owen Riley', daysBlocked: 45 },
  { ticket: 'UI-607', summary: 'Sentiment and Relevance Visualization', assignee: 'Matthew Snow', daysBlocked: 60 },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 60 },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 60 },
  { ticket: 'UI-544', summary: 'Status Dashboard - fix other hyperlinks', assignee: 'Matthew Snow', daysBlocked: 90 },
  { ticket: 'CI-739', summary: 'Update Pretoken-Generator Lambda', assignee: 'Unassigned', daysBlocked: 30 }
];

export const blockedSummary = {
  total: 0,
  sprintBlocked: 0,
  longBlocked: 9,
  p0Count: 0,
  p1Count: 0,
  p2Count: 0,
  avgDaysBlocked: 0,
  oldestBlocked: "None",
  unassignedCount: 0,
  longBlockedByAssignee: {
    'Matthew Snow': 5,
    'Owen Riley': 2,
    'Unassigned': 2
  }
};

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
