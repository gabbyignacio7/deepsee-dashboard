export interface JiraMetrics {
  lastUpdated: string;
  extractionSource: string;
  sprintInfo: {
    name: string;
    dates: string;
    daysRemaining: number;
    totalStoryPoints: number;
    avgVelocity: number;
    overCommitment: string;
  };
  overall: {
    totalActiveTickets: number;
    totalInProgress: number;
    totalToDo: number;
    totalCodeReview: number;
    totalBlocked: number;
    totalDone: number;
    totalWithStoryPoints: number;
  };
  storyPoints: {
    completed: number;
    inProgress: number;
    notStarted: number;
    completionRate: number;
  };
  engineerSummary: {
    activeEngineers: number;
    engineersWithNoTickets: string[];
    highestLoad: { name: string; tickets: number }[];
  };
  longRunningTickets: Array<{
    id: string;
    title: string;
    assignee: string;
    status: string;
    daysInStatus: number;
    warningLevel: 'critical' | 'warning' | 'normal';
    reason?: string;
  }>;
}

export const jiraMetrics: JiraMetrics = {
  lastUpdated: "January 20, 2026 12:00 PM MT",
  extractionSource: "JIRA - Sprint 2026-S2",

  sprintInfo: {
    name: "2026-S2",
    dates: "Jan 16 - Jan 30, 2026",
    daysRemaining: 7,
    totalStoryPoints: 137,
    avgVelocity: 80,
    overCommitment: "71% over average velocity"
  },

  overall: {
    totalActiveTickets: 70,
    totalInProgress: 13,
    totalToDo: 44,
    totalCodeReview: 3,
    totalBlocked: 3,
    totalDone: 8,
    totalWithStoryPoints: 70
  },

  storyPoints: {
    completed: 29,
    inProgress: 44,
    notStarted: 64,
    completionRate: 21
  },

  engineerSummary: {
    activeEngineers: 12,
    engineersWithNoTickets: [],
    highestLoad: [
      { name: "Jeff Hegerhorst", tickets: 8 },
      { name: "Aleksander Winski", tickets: 7 },
      { name: "Kannal Mutharasu", tickets: 5 }
    ]
  },

  longRunningTickets: [
    {
      id: "BACK-1489",
      title: "Update classification-api Base Image to Ubuntu 24.04 LTS",
      assignee: "Unassigned",
      status: "Blocked",
      daysInStatus: 40,
      warningLevel: "critical",
      reason: "Technical dependency - needs assignment"
    },
    {
      id: "UI-719",
      title: "DeepRecon - Add To column to Actionable Data Pages (Accenture)",
      assignee: "Unassigned",
      status: "Blocked",
      daysInStatus: 20,
      warningLevel: "critical",
      reason: "Needs assignment/clarification"
    },
    {
      id: "BACK-1603",
      title: "Deep Recon - DTCC Sync to DeepSee - extend data from additional fields",
      assignee: "Treven Trujillo",
      status: "Blocked",
      daysInStatus: 8,
      warningLevel: "warning",
      reason: "Waiting for additional samples from customer"
    }
  ]
};

// Epic Progress - Updated January 20, 2026
export interface EpicProgress {
  key: string;
  description: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'complete';
}

export const epicProgress: EpicProgress[] = [
  { key: "UI-694", description: "UI and Dashboard Improvements (DeepRecon)", progress: 30, status: 'in_progress' },
  { key: "BACK-1232", description: "DTCC Scalability", progress: 0, status: 'not_started' },
  { key: "BACK-1650", description: "Mercury Extraction - Unified Document Service", progress: 0, status: 'not_started' },
  { key: "BACK-1656", description: "Document Parser - Multi-Format Parsing", progress: 0, status: 'not_started' }
];

// Sprint Comparison Data
export const sprintComparison = {
  s1: { sprint: "2026-S1", committed: 131, completed: 129, rate: 98.5 },
  s2: { sprint: "2026-S2", committed: 137, completed: 29, rate: 21, status: "in_progress" }
};
