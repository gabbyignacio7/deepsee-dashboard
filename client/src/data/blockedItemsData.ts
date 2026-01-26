// Blocked Items Data - Updated January 26, 2026 at 12:40 PM MT
// Source: JIRA Extract - Sprint 2026-S2

export interface BlockedItem {
  key: string;
  summary: string;
  assignee: string;
  daysBlocked: number;
  blockedSince?: string;
  category: string;
  priority: "P0" | "P1" | "P2";
  impact?: string;
  escalation?: string;
  jiraUrl: string;
  reason?: string;
}

// Current Sprint Blocked Items (4 items requiring immediate action)
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "BACK-1603",
    summary: "Deep Recon - DTCC Sync to DeepSee - extend data from additional fields to be imported from SFDC case",
    assignee: "Treven Trujillo",
    daysBlocked: 42,
    blockedSince: "2025-12-15",
    category: "client",
    priority: "P0",
    impact: "$1.85M ARR at risk",
    escalation: "DTCC executive follow-up required",
    reason: "Awaiting DTCC sample data",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1603"
  },
  {
    key: "BACK-1489",
    summary: "Update classification-api Base Image to Ubuntu 24.04 LTS",
    assignee: "Unassigned",
    daysBlocked: 75,
    blockedSince: "2025-11-12",
    category: "infrastructure",
    priority: "P0",
    impact: "Security vulnerability exposure",
    escalation: "Needs immediate assignment",
    reason: "No owner assigned",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1489"
  },
  {
    key: "UI-719",
    summary: "DeepRecon - Add To column to Actionable Data Pages (Accenture)",
    assignee: "Unassigned",
    daysBlocked: 46,
    blockedSince: "2025-12-11",
    category: "client",
    priority: "P1",
    impact: "Accenture deliverable delayed",
    reason: "No owner assigned",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-719"
  },
  {
    key: "BACK-1796",
    summary: "Automatically refresh the Allegro password before expiry",
    assignee: "Kannal Mutharasu",
    daysBlocked: 6,
    blockedSince: "2026-01-20",
    category: "artemis",
    priority: "P2",
    reason: "Waiting on Allegro API access",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1796"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  {
    key: "BACK-1603",
    summary: "Deep Recon - DTCC Sync to DeepSee - extend data from additional fields to be imported from SFDC case",
    assignee: "Treven Trujillo",
    daysBlocked: 42,
    blockedSince: "2025-12-15",
    category: "client",
    priority: "P0",
    impact: "$1.85M ARR at risk",
    escalation: "DTCC executive follow-up required",
    reason: "Awaiting DTCC sample data",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1603"
  },
  {
    key: "BACK-1489",
    summary: "Update classification-api Base Image to Ubuntu 24.04 LTS",
    assignee: "Unassigned",
    daysBlocked: 75,
    blockedSince: "2025-11-12",
    category: "infrastructure",
    priority: "P0",
    impact: "Security vulnerability exposure",
    escalation: "Needs immediate assignment",
    reason: "No owner assigned",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1489"
  },
  {
    key: "UI-719",
    summary: "DeepRecon - Add To column to Actionable Data Pages (Accenture)",
    assignee: "Unassigned",
    daysBlocked: 46,
    blockedSince: "2025-12-11",
    category: "client",
    priority: "P1",
    impact: "Accenture deliverable delayed",
    reason: "No owner assigned",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-719"
  },
  {
    key: "BACK-1796",
    summary: "Automatically refresh the Allegro password before expiry",
    assignee: "Kannal Mutharasu",
    daysBlocked: 6,
    blockedSince: "2026-01-20",
    category: "artemis",
    priority: "P2",
    reason: "Waiting on Allegro API access",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1796"
  }
];

export const blockedSummary = {
  total: 4,
  sprintBlocked: 4,
  p0Count: 2,
  p1Count: 1,
  p2Count: 1,
  avgDaysBlocked: 42,
  oldestBlocked: "BACK-1489 (75 days)",
  unassignedCount: 2,
  totalArrAtRisk: "$1.85M"
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
