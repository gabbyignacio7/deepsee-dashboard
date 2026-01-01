// SPRINT 1 STATUS DATA - Auto-extracted from JIRA
// Generated: December 5, 2025 at 1:30 PM MT
// Source: DeepSee JIRA - Sprint 1 Board

export const SPRINT_1_DATA = {
  // Sprint Summary
  sprint: {
    name: "Sprint 1",
    goal: "First sprint after Kanban transition; Wave 1 Security remediation for Broadridge",
    startDate: "2025-12-05",
    endDate: "2025-12-19",
    totalTickets: 47,
    totalPoints: 63,
    remainingPoints: 29,
    health: "GREEN"
  },

  // Status Breakdown
  statusBreakdown: {
    toDo: { count: 17, points: 5, percentage: 36 },
    inProgress: { count: 7, points: 24, percentage: 15 },
    codeReview: { count: 4, points: 6, percentage: 8 },
    done: { count: 20, points: 34, percentage: 43 },
    blocked: { count: 0, points: 0, percentage: 0 }
  },

  // Wave 1 Security (CRITICAL PATH - COMPLETE)
  wave1Security: {
    targetReduction: 76,
    actualReduction: 76,
    targetAchieved: true,
    totalVulnerabilities: 390,
    addressedVulnerabilities: 298,
    arrProtected: 500000,
    tickets: [
      {
        id: "SC-302",
        summary: "Address PostgreSQL Vulnerabilities",
        vulnerabilities: 158,
        status: "DONE",
        assignee: "Jeff Hegerhorst",
        notes: "3 PRs merged, 6 commits, build passing"
      },
      {
        id: "SC-303",
        summary: "Address mlrig-box-to-tokens Vulnerabilities",
        vulnerabilities: 80,
        status: "DONE",
        assignee: "Chad Hegerhorst",
        notes: "Labels: broadridge-implementation, wave-1"
      },
      {
        id: "SC-304",
        summary: "Address Kafka Vulnerabilities",
        vulnerabilities: 60,
        status: "DONE",
        assignee: "Jeff Hegerhorst",
        notes: "7 PRs merged, 31 commits (1 build failing - needs attention)"
      }
    ]
  },

  // Tickets In Progress
  inProgress: [
    { id: "BACK-1304", summary: "Messages API (parent with 5 subtasks)", assignee: "Lane Terry", points: 13, dueDate: null },
    { id: "BACK-1436", summary: "Deep Recon - Always run on import Automations (Broadridge)", assignee: "Treven Trujillo", points: 5, dueDate: null },
    { id: "BACK-1531", summary: "Fine-tune Mercury Extraction for Colony Bank", assignee: null, points: null, dueDate: null },
    { id: "BACK-1532", summary: "Fine-tune Mercury Extraction for Sunwest Bank", assignee: null, points: null, dueDate: null },
    { id: "BACK-1560", summary: "BBVA Reconciliation Output", assignee: "Kannal Mutharasu", points: null, dueDate: null },
    { id: "BACK-1564", summary: "Setup Colony HMDA Mercury Extraction Schema", assignee: "Kalvin Willison", points: null, dueDate: null },
    { id: "BACK-1570", summary: "Test HMDA Mercury Extraction End-to-End", assignee: "Kalvin Willison", points: 3, dueDate: "2025-12-05" }
  ],

  // Tickets In Code Review
  codeReview: [
    { id: "BACK-1521", summary: "Integrate SubCategory Model Calls into Prediction Pipeline", assignee: "Aleksander Winski", points: 3 },
    { id: "BACK-1318", summary: "Counterparties API", assignee: "Ivan Peev", points: null },
    { id: "BACK-1322", summary: "ML Models API", assignee: "Ivan Peev", points: null },
    { id: "BACK-1542", summary: "Deploy v3 API to Accenture & Demo", assignee: "Lane Terry", points: null }
  ],

  // Completed Tickets
  done: [
    { id: "BACK-760", summary: "Implement RBAC for Message Endpoints", assignee: "Treven Trujillo", points: 5 },
    { id: "BACK-761", summary: "Implement RBAC for Automation Endpoints", assignee: "Darius Ouderkirk", points: 3 },
    { id: "BACK-807", summary: "Add Additional Retries for Async Operations", assignee: "Lane Terry", points: 8 },
    { id: "BACK-806", summary: "[BE] preprocessor becomes unavailable with high load", assignee: "Aleksander Winski", points: 8 },
    { id: "BACK-211", summary: "Auto-generate RBAC Configuration from API", assignee: "Darius Ouderkirk", points: 3 },
    { id: "BACK-826", summary: "Update Completed tab filter to include Emails moved to a Folder", assignee: "Treven Trujillo", points: 3 },
    { id: "UI-429", summary: "DeepRecon - Disable Mark Complete option for completed emails", assignee: "Owen Riley", points: 2 },
    { id: "UI-431", summary: "DeepRecon - View Email Page - Add Flagged / Not Flagged options", assignee: "Owen Riley", points: 1 },
    { id: "UI-696", summary: "Update sso-ui Base Image to Alpine 3.22.2", assignee: null, points: 1 },
    { id: "SC-302", summary: "Address PostgreSQL Vulnerabilities (158 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "SC-303", summary: "Address mlrig-box-to-tokens Vulnerabilities (80 C+H)", assignee: "Chad Hegerhorst", points: null },
    { id: "SC-304", summary: "Address Kafka Vulnerabilities (60 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "BACK-870", summary: "Misc Broadridge DeepView Issues", assignee: "Darius Ouderkirk", points: null },
    { id: "BACK-850", summary: "(Accenture) Light Extraction - Handle Merged cells", assignee: "Aleksander Winski", points: null }
  ],

  // Engineer Workload
  engineers: [
    { name: "Lane Terry", assigned: 2, inProgress: 1, codeReview: 1, done: 1, totalPoints: 21 },
    { name: "Jeff Hegerhorst", assigned: 2, inProgress: 0, codeReview: 0, done: 2, totalPoints: null },
    { name: "Chad Hegerhorst", assigned: 1, inProgress: 0, codeReview: 0, done: 1, totalPoints: null },
    { name: "Aleksander Winski", assigned: 4, inProgress: 0, codeReview: 1, done: 4, totalPoints: 11 },
    { name: "Treven Trujillo", assigned: 3, inProgress: 1, codeReview: 0, done: 2, totalPoints: 13 },
    { name: "Darius Ouderkirk", assigned: 4, inProgress: 0, codeReview: 0, done: 4, totalPoints: 6 },
    { name: "Kalvin Willison", assigned: 2, inProgress: 2, codeReview: 0, done: 0, totalPoints: 3 },
    { name: "Owen Riley", assigned: 2, inProgress: 0, codeReview: 0, done: 2, totalPoints: 3 },
    { name: "Konnor Willison", assigned: 2, inProgress: 0, codeReview: 0, done: 0, totalPoints: null },
    { name: "Ivan Peev", assigned: 2, inProgress: 0, codeReview: 2, done: 0, totalPoints: null },
    { name: "Kannal Mutharasu", assigned: 2, inProgress: 1, codeReview: 0, done: 1, totalPoints: null },
    { name: "Unassigned", assigned: 12, inProgress: 0, codeReview: 0, done: 0, totalPoints: 5 }
  ],

  // Unassigned Tickets
  unassigned: [
    { id: "BACK-1548", summary: "Enable Conditional Reconciliation", priority: "Major", points: 5 },
    { id: "BACK-1485", summary: "Update preprocessor Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1486", summary: "Update core-service Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1487", summary: "Update deeppilot-poll-inbox-trigger Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1488", summary: "Update deepview-status-service Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1489", summary: "Update classification-api Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1305", summary: "Create Message API", priority: "Major", points: null },
    { id: "BACK-1306", summary: "Update Message API", priority: "Major", points: null },
    { id: "SC-310", summary: "Address deepview-status vulnerabilities", priority: "Major", points: null },
    { id: "SC-312", summary: "Address preprocessor vulnerabilities", priority: "Major", points: null },
    { id: "SC-313", summary: "Address embeddings vulnerabilities", priority: "Major", points: null }
  ],

  // Risks & Alerts
  risks: [
    {
      severity: "MEDIUM",
      item: "SC-304 Build Failing",
      description: "Kafka vulnerability ticket is merged but has 1 failing build - may need hotfix",
      owner: "Jeff Hegerhorst"
    },
    {
      severity: "MEDIUM",
      item: "12+ Unassigned Tickets",
      description: "Multiple TO DO items need owners before Monday standup",
      owner: "Brandon Baguley"
    },
    {
      severity: "LOW",
      item: "BACK-1570 Due Today",
      description: "HMDA Mercury Extraction testing has Dec 5 due date",
      owner: "Kalvin Willison"
    }
  ],

  // Wins
  wins: [
    {
      title: "Wave 1 Security Complete",
      description: "298/390 vulnerabilities addressed (76% reduction) - Broadridge $500K ARR protected",
      tickets: ["SC-302", "SC-303", "SC-304"],
      impact: "$500K ARR"
    },
    {
      title: "RBAC Implementation Done",
      description: "Role-based access control for Message and Automation endpoints complete",
      tickets: ["BACK-760", "BACK-761", "BACK-211"],
      impact: "Security compliance"
    },
    {
      title: "Zero Blocked Tickets",
      description: "Sprint 1 is running smoothly with no blockers on Day 1",
      tickets: [],
      impact: "Sprint velocity"
    }
  ]
};

// Helper function to get status color
export const getStatusColor = (status) => {
  const colors = {
    "toDo": "#6c757d",      // Gray
    "inProgress": "#007bff", // Blue
    "codeReview": "#6f42c1", // Purple
    "done": "#28a745",       // Green
    "blocked": "#dc3545"     // Red
  };
  return colors[status] || "#6c757d";
};

// Helper function to get health color
export const getHealthColor = (health) => {
  const colors = {
    "GREEN": "#28a745",
    "YELLOW": "#ffc107",
    "RED": "#dc3545"
  };
  return colors[health] || "#6c757d";
};

// Helper function to get risk severity color
export const getRiskColor = (severity) => {
  const colors = {
    "HIGH": "#dc3545",
    "MEDIUM": "#ffc107",
    "LOW": "#17a2b8"
  };
  return colors[severity] || "#6c757d";
};

export default SPRINT_1_DATA;
