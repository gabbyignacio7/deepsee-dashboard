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
// Updated: January 26, 2026
export const sprintBlockedItems: BlockedItem[] = [
  {
    key: "BACK-1603",
    summary: "Deep Recon - DTCC Sync to DeepSee",
    assignee: "Treven Trujillo",
    daysBlocked: 42,
    blockedSince: "2025-12-15",
    category: "Client - DTCC",
    priority: "P0",
    impact: "$1.85M ARR at risk",
    escalation: "IMMEDIATE",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1603",
    reason: "Waiting for additional samples from customer"
  },
  {
    key: "BACK-1489",
    summary: "Update classification-api Base Image to Ubuntu 24.04",
    assignee: "Unassigned",
    daysBlocked: 75,
    blockedSince: "2025-11-12",
    category: "Infrastructure",
    priority: "P0",
    impact: "Security compliance",
    escalation: "IMMEDIATE",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1489",
    reason: "Technical dependency - needs assignment"
  },
  {
    key: "UI-719",
    summary: "DeepRecon - Add To column to Actionable Data Pages (Accenture)",
    assignee: "Unassigned",
    daysBlocked: 46,
    blockedSince: "2025-12-11",
    category: "Client - Accenture",
    priority: "P1",
    impact: "Client feature request",
    escalation: "This week",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-719",
    reason: "Needs assignment/clarification"
  },
  {
    key: "BACK-1796",
    summary: "Automatically refresh the Allegro password before expiry",
    assignee: "Kannal Mutharasu",
    daysBlocked: 6,
    blockedSince: "2026-01-20",
    category: "Infrastructure",
    priority: "P1",
    impact: "Operational",
    escalation: "Monitor",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1796",
    reason: "Investigating automation approach"
  }
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
  ...sprintBlockedItems,
  {
    key: "CI-739",
    summary: "Update Pretoken-Generator Lambda",
    assignee: "Unassigned",
    daysBlocked: 336,
    category: "Infrastructure",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/CI-739"
  },
  {
    key: "UI-607",
    summary: "Sentiment and Relevance Visualization",
    assignee: "Matthew Snow",
    daysBlocked: 156,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-607"
  },
  {
    key: "UI-604",
    summary: "Result Detail Drawer",
    assignee: "Matthew Snow",
    daysBlocked: 156,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-604"
  },
  {
    key: "UI-606",
    summary: "Provenance and Trust Indicators",
    assignee: "Matthew Snow",
    daysBlocked: 156,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-606"
  },
  {
    key: "UI-658",
    summary: "Enable Customer Self-Service for SSO/SAML",
    assignee: "Matthew Snow",
    daysBlocked: 116,
    category: "Security",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-658"
  },
  {
    key: "UI-625",
    summary: "Implement UI for paginated work item tasks",
    assignee: "Owen Riley",
    daysBlocked: 141,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-625"
  },
  {
    key: "UI-544",
    summary: "Status Dashboard - fix 'other' hyperlinks",
    assignee: "Matthew Snow",
    daysBlocked: 226,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-544"
  },
  {
    key: "UI-682",
    summary: "Enhance 'Golden Source' Picker for Colony Bank",
    assignee: "Owen Riley",
    daysBlocked: 81,
    category: "Client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-682"
  },
  {
    key: "UI-692",
    summary: "Allow filtering and sorting by custom fields",
    assignee: "Unassigned",
    daysBlocked: 76,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-692"
  }
];

export const blockedSummary = {
  total: 4,
  criticalCount: 2,
  totalDaysBlocked: 169, // 42 + 75 + 46 + 6
  arrAtRisk: 1850000,
  escalationRequired: ["BACK-1603", "BACK-1489"],
  p0Count: 2,
  p1Count: 2,
  p2Count: 0,
  avgDaysBlocked: 42, // Average for sprint blocked items
  oldestBlocked: "BACK-1489 (75 days)",
  unassignedCount: 2
};

// Get blocked items by priority
export function getBlockedByPriority(priority: "P0" | "P1" | "P2"): BlockedItem[] {
  return blockedItems.filter(item => item.priority === priority);
}

// Get blocked items sorted by days blocked (descending)
export function getBlockedByAge(): BlockedItem[] {
  return [...blockedItems].sort((a, b) => b.daysBlocked - a.daysBlocked);
}

// Get critical blocked items (P0 and P1)
export function getCriticalBlocked(): BlockedItem[] {
  return blockedItems.filter(item => item.priority === "P0" || item.priority === "P1");
}

// Get blocked items by category
export function getBlockedByCategory(category: string): BlockedItem[] {
  return blockedItems.filter(item => item.category.includes(category));
}

// Get sprint blocked items only
export function getSprintBlockedItems(): BlockedItem[] {
  return sprintBlockedItems;
}

// Get escalation required items
export function getEscalationRequired(): BlockedItem[] {
  return sprintBlockedItems.filter(item => item.escalation === "IMMEDIATE");
}
