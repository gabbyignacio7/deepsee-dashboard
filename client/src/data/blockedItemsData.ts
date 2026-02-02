// Blocked Items Data - Updated February 1, 2026 at 7:30 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3

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

// Current Sprint Blocked Items - 0 in S3 (good!)
export const sprintBlockedItems: BlockedItem[] = [

];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [

];

export const blockedSummary = {
  total: 0,
  sprintBlocked: 0,
  backlogBlocked: 17,
  p0Count: 0,
  p1Count: 0,
  p2Count: 0,
  avgDaysBlocked: 0,
  oldestBlocked: "None in sprint",
  unassignedCount: 0,
  longBlockedByAssignee: {
    'Matthew Snow': 4,
    'Owen Riley': 5,
    'Unassigned': 1,
    'Other': 7
  }
};

// Long-blocked items in backlog (not in current sprint)
export const longBlockedItems = [
  { ticket: 'UI-692', summary: 'Allow filtering/sorting by custom fields', assignee: 'Unassigned', daysBlocked: 26, updated: 'Jan 6' },
  { ticket: 'UI-682', summary: 'Golden Source Picker for Colony Bank', assignee: 'Owen Riley', daysBlocked: 26, updated: 'Jan 6' },
  { ticket: 'UI-544', summary: 'Status Dashboard - fix other hyperlinks', assignee: 'Matthew Snow', daysBlocked: 26, updated: 'Jan 6' },
  { ticket: 'UI-625', summary: 'Implement UI for paginated work item tasks', assignee: 'Owen Riley', daysBlocked: 26, updated: 'Jan 6' },
  { ticket: 'UI-658', summary: 'SSO/SAML attribute mapping (front end)', assignee: 'Matthew Snow', daysBlocked: 40, updated: 'Dec 23' },
  { ticket: 'UI-606', summary: 'Provenance and Trust Indicators', assignee: 'Matthew Snow', daysBlocked: 40, updated: 'Dec 23' },
  { ticket: 'UI-604', summary: 'Result Detail Drawer', assignee: 'Matthew Snow', daysBlocked: 40, updated: 'Dec 23' },
  { ticket: 'UI-559', summary: 'Work Item Relationship Viewer', assignee: 'Owen Riley', daysBlocked: 40, updated: 'Dec 23' },
  { ticket: 'UI-551', summary: 'Data Catalog - Natural Language Search', assignee: 'Owen Riley', daysBlocked: 40, updated: 'Dec 23' },
  { ticket: 'UI-413', summary: 'Extraction Configurator - Preview panel', assignee: 'Owen Riley', daysBlocked: 52, updated: 'Dec 11' }
];
// Note: 17 total blocked in backlog, showing top 10. Matthew Snow has 4, Owen Riley has 5.

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
