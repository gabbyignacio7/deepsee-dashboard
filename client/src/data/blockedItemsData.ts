// Blocked Items Data - Updated January 18, 2026
// Source: JIRA Extract

export interface BlockedItem {
  key: string;
  summary: string;
  assignee: string;
  daysBlocked: number;
  category: string;
  priority: "P0" | "P1" | "P2";
  jiraUrl: string;
}

export const blockedItems: BlockedItem[] = [
  {
    key: "CI-739",
    summary: "Update Pretoken-Generator Lambda",
    assignee: "Unassigned",
    daysBlocked: 330,
    category: "Infrastructure",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/CI-739"
  },
  {
    key: "UI-607",
    summary: "Sentiment and Relevance Visualization",
    assignee: "Matthew Snow",
    daysBlocked: 150,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-607"
  },
  {
    key: "UI-604",
    summary: "Result Detail Drawer",
    assignee: "Matthew Snow",
    daysBlocked: 150,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-604"
  },
  {
    key: "UI-606",
    summary: "Provenance and Trust Indicators",
    assignee: "Matthew Snow",
    daysBlocked: 150,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-606"
  },
  {
    key: "UI-658",
    summary: "Enable Customer Self-Service for SSO/SAML",
    assignee: "Matthew Snow",
    daysBlocked: 110,
    category: "Security",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-658"
  },
  {
    key: "UI-625",
    summary: "Implement UI for paginated work item tasks",
    assignee: "Owen Riley",
    daysBlocked: 135,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-625"
  },
  {
    key: "UI-544",
    summary: "Status Dashboard - fix 'other' hyperlinks",
    assignee: "Matthew Snow",
    daysBlocked: 220,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-544"
  },
  {
    key: "UI-682",
    summary: "Enhance 'Golden Source' Picker for Colony Bank",
    assignee: "Owen Riley",
    daysBlocked: 75,
    category: "Client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-682"
  },
  {
    key: "UI-692",
    summary: "Allow filtering and sorting by custom fields",
    assignee: "Unassigned",
    daysBlocked: 70,
    category: "UI/Feature",
    priority: "P2",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-692"
  },
  {
    key: "BACK-1603",
    summary: "Deep Recon - DTCC Sync to DeepSee",
    assignee: "Treven Trujillo",
    daysBlocked: 35,
    category: "Client - DTCC",
    priority: "P0",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1603"
  },
  {
    key: "UI-719",
    summary: "DeepRecon - Add To column (Accenture)",
    assignee: "Unassigned",
    daysBlocked: 40,
    category: "Client",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/UI-719"
  },
  {
    key: "BACK-1489",
    summary: "Update classification-api Base Image to Ubuntu",
    assignee: "Konnor Willison",
    daysBlocked: 70,
    category: "Infrastructure",
    priority: "P1",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1489"
  }
];

export const blockedSummary = {
  total: 12,
  p0Count: 1,
  p1Count: 4,
  p2Count: 7,
  avgDaysBlocked: 128,
  oldestBlocked: "CI-739 (330 days)"
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
