export interface JiraMetrics {
  lastUpdated: string;
  extractionSource: string;
  overall: {
    totalActiveTickets: number;
    totalInProgress: number;
    totalToDo: number;
    totalCodeReview: number;
    totalBlocked: number;
    totalWithStoryPoints: number;
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
  }>;
}

export const jiraMetrics: JiraMetrics = {
  lastUpdated: "January 5, 2026 3:00 AM MT",
  extractionSource: "JIRA - Sprint 2026-S1",
  
  overall: {
    totalActiveTickets: 100,
    totalInProgress: 18,
    totalToDo: 43,
    totalCodeReview: 6,
    totalBlocked: 0,
    totalWithStoryPoints: 70
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
      id: "BACK-1196",
      title: "Fix email status synchronization between Outlook and DeepView",
      assignee: "Lane Terry",
      status: "To Do",
      daysInStatus: 82,
      warningLevel: "critical"
    },
    {
      id: "BACK-1224",
      title: "Research and plan major scalability refactor",
      assignee: "Lane Terry",
      status: "In Progress",
      daysInStatus: 66,
      warningLevel: "critical"
    },
    {
      id: "NSI-10",
      title: "Set Up",
      assignee: "Loris D'Acunto",
      status: "In Progress",
      daysInStatus: 50,
      warningLevel: "warning"
    },
    {
      id: "BACK-882",
      title: "Update Classifier and DeepRecon API services",
      assignee: "Darius Ouderkirk",
      status: "In Progress",
      daysInStatus: 45,
      warningLevel: "warning"
    },
    {
      id: "BACK-1117",
      title: "Implement intent-agent logic in extractor-service",
      assignee: "Darius Ouderkirk",
      status: "Code Review",
      daysInStatus: 44,
      warningLevel: "warning"
    },
    {
      id: "BACK-1382",
      title: "Export for Vantage Commercial Lending Work Items",
      assignee: "Darius Ouderkirk",
      status: "In Progress",
      daysInStatus: 35,
      warningLevel: "warning"
    }
  ]
};
