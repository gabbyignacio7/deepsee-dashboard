// SPRINT DATA - Auto-extracted from JIRA
// Generated: December 23, 2025 at 4:00 AM MT
// Source: DeepSee Collective Board > Active Sprints
// Current Sprint: 2025-S2 (Holiday Sprint) - Day 4 of 14
// Note: 55% capacity due to holidays. S1 completed with 85% completion rate.

export interface SprintTicket {
  id: string;
  summary: string;
  assignee: string | null;
  points: number | null;
  dueDate?: string | null;
  priority?: string;
  status?: string;
}

export interface SecurityTicket {
  id: string;
  summary: string;
  vulnerabilities: number | null;
  status: 'DONE' | 'IN_PROGRESS' | 'TO_DO';
  assignee: string;
  build?: 'PASSING' | 'FAILING';
  notes: string;
}

export interface EngineerWorkload {
  name: string;
  assigned: number;
  inProgress: number;
  codeReview: number;
  inTesting?: number;
  done: number;
  totalPoints: number | null;
}

export interface SprintRisk {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  item: string;
  description: string;
  owner: string;
  action?: string;
}

export interface SprintWin {
  title: string;
  description: string;
  tickets: string[];
  impact: string;
}

export interface StatusBreakdownItem {
  count: number;
  prevCount: number;
  change: string;
  points: number;
  percentage: number;
}

export interface ConfirmedTicket {
  ticket: string;
  summary: string;
  status: string;
  points?: number | null;
  verified: boolean;
  assignee?: string;
}

export interface LabelIssue {
  ticket: string;
  currentTitle: string;
  correctTitle: string;
  currentLabels: string;
  correctLabels: string;
  status: string;
  owner: string;
  actionNeeded: string;
}

export interface Engineer {
  name: string;
  role: string;
  team: 'Core' | 'Security' | 'Platform' | 'Data';
  sprint1Access: boolean;
  needsVerification: boolean;
  flagged: boolean;
  flagReason?: string;
  currentTickets?: number;
  pointsAssigned?: number;
}

export const SPRINT_1_DATA = {
  sprint: {
    name: "2025-S2",
    displayName: "2025-S2 (Holiday Sprint)",
    goal: "Maintain operations during holiday period, complete security Wave 2, and continue client deliverables with reduced capacity.",
    startDate: "2025-12-19",
    endDate: "2026-01-02",
    dataExtracted: "2025-12-23T04:00:00-07:00",
    sprintDay: 4,
    daysRemaining: 10,
    totalTickets: 69,
    prevTotalTickets: 69,
    scopeCreep: 0,
    totalPoints: 64 as number | null,
    remainingPoints: 34 as number | null,
    prevRemainingPoints: 34 as number | null,
    health: "YELLOW" as "GREEN" | "YELLOW" | "RED",
    prevHealth: "YELLOW" as "GREEN" | "YELLOW" | "RED",
    healthNote: "29% complete at Day 4. Holiday Sprint with 55% capacity. 2 blocked tickets (36+ days) require attention.",
    capacity: "55%",
    capacityNote: "Holiday Sprint - Reduced Capacity"
  },

  projectBreakdown: {
    BACK: 31,
    SC: 16,
    UI: 17,
    FB: 1,
    CI: 4,
    Epics: 0
  },

  statusBreakdown: {
    toDo: { count: 31, prevCount: 31, change: "0", points: 20, percentage: 45 } as StatusBreakdownItem,
    inProgress: { count: 9, prevCount: 9, change: "0", points: 10, percentage: 13 } as StatusBreakdownItem,
    codeReview: { count: 5, prevCount: 5, change: "0", points: 4, percentage: 7 } as StatusBreakdownItem,
    inTesting: { count: 1, prevCount: 1, change: "0", points: 0, percentage: 1 } as StatusBreakdownItem,
    done: { count: 20, prevCount: 20, change: "0", points: 30, percentage: 29 } as StatusBreakdownItem,
    blocked: { count: 2, prevCount: 2, change: "0", points: 0, percentage: 3 } as StatusBreakdownItem,
    cancelled: { count: 1, prevCount: 1, change: "0", points: 0, percentage: 1 } as StatusBreakdownItem
  },

  velocityNote: "29% complete at Day 4 (47% by story points). Holiday Sprint with 55% capacity. 2 blocked tickets are critical.",

  storyPoints: {
    total: 64,
    completed: 30,
    remaining: 34,
    completionPercent: 47,
    note: "47% by points vs 29% by tickets - larger items completing first"
  },

  blockedAlert: {
    show: true,
    severity: "critical",
    title: "2 BLOCKED TICKETS - CRITICAL",
    tickets: [
      { key: "CI-898", summary: "Upgrade JPM RDS version", assignee: "Chad Hegerhorst", daysBlocked: 36, reporter: "Jeff Hegerhorst", blockedSince: "2025-11-17" },
      { key: "BACK-1489", summary: "Update classification-api Base Image to Ubuntu 24.04 LTS", assignee: "UNASSIGNED", daysBlocked: 41, reporter: "Konnor Willison", blockedSince: "2025-11-12" }
    ]
  },

  codeReviewAlert: {
    show: true,
    severity: "warning",
    title: "CODE REVIEW: 5 tickets in queue",
    tickets: [
      { key: "UI-729", summary: "Deep Pilot - Add new stencil to return value", assignee: "Owen Riley", daysInReview: 1, reporter: "Nadiya Omelchuk" },
      { key: "UI-725", summary: "New Stencil - Subgroup Check Term Presens", assignee: "Owen Riley", daysInReview: 1, reporter: "Nadiya Omelchuk" },
      { key: "BACK-1610", summary: "Counterparties Across Time API", assignee: "Ivan Peev", daysInReview: 1, reporter: "Lane Terry" },
      { key: "BACK-839", summary: "Allow Event Status to be Updated via API", assignee: "Aleksander Winski", daysInReview: 4, reporter: "Lane Terry", isOverdue: true },
      { key: "BACK-811", summary: "Output processing fails for large work items", assignee: "Kannal Mutharasu", daysInReview: 1, reporter: "Darius Ouderkirk" }
    ]
  },

  unassignedAlert: {
    show: true,
    severity: "warning",
    title: "21 UNASSIGNED TICKETS",
    count: 21,
    threshold: 10,
    note: "Mostly UI tickets reported by Nadiya. Includes 1 blocked ticket (BACK-1489)."
  },

  clients: [
    { name: "Colony Bank", arr: "$200K", total: 2, done: 2, inProgress: 0, toDo: 0, blocked: 0, status: "green" },
    { name: "Accenture/HERA", arr: "$1.2M", total: 6, done: 0, inProgress: 0, toDo: 6, blocked: 0, status: "yellow" },
    { name: "Sunwest", arr: "$180K", total: 1, done: 0, inProgress: 1, toDo: 0, blocked: 0, status: "green" },
    { name: "DTCC", arr: "$750K", total: 1, done: 0, inProgress: 0, toDo: 1, blocked: 0, status: "yellow" },
    { name: "BBVA", arr: "TBD", total: 1, done: 0, inProgress: 0, toDo: 1, blocked: 0, status: "yellow" },
    { name: "Broadridge", arr: "$500K", total: 0, done: 0, inProgress: 0, toDo: 0, blocked: 0, status: "gray", note: "No tickets in S2" }
  ],

  completedSinceStart: {
    count: 12,
    tickets: [
      { key: "SC-325", summary: "Address application level vulnerabilities", assignee: "Kannal Mutharasu" },
      { key: "CI-902", summary: "AWS OpenSearch - Cost Savings", assignee: "Chad Hegerhorst" },
      { key: "BACK-1615", summary: "Deep Pilot - Normalized extractions", assignee: "Kannal Mutharasu" },
      { key: "BACK-1609", summary: "Label Statistics Across Time API", assignee: "Ivan Peev" },
      { key: "BACK-1591", summary: "More Feedback: Mercury Extraction for Colony", assignee: "Kalvin Willison" },
      { key: "BACK-1584", summary: "Create Message Sender Statistics Endpoint", assignee: "Ivan Peev" },
      { key: "BACK-1578", summary: "Feedback: Mercury Extraction for Colony Bank", assignee: "Kalvin Willison" },
      { key: "BACK-1573", summary: "Deep Pilot - Extra non-matching subgroups", assignee: "Darius Ouderkirk" },
      { key: "BACK-1567", summary: "Actionable Data Export", assignee: "Ivan Peev" },
      { key: "BACK-1488", summary: "Update deepview-status-service Base Image", assignee: "Treven Trujillo" },
      { key: "BACK-1224", summary: "Research and plan major scalability refactor", assignee: "Lane Terry" },
      { key: "BACK-1051", summary: "JPM - Work item created with extra .XML file", assignee: "Kannal Mutharasu" }
    ]
  },

  comparison: {
    s1Final: { sprint: "2025-S1", totalTickets: 129, done: 110, completionRate: 85, status: "Completed" },
    s2Current: { sprint: "2025-S2", totalTickets: 69, done: 20, completionRate: 29, daysElapsed: 4, daysRemaining: 10, status: "In Progress" },
    carryover: { count: 34, note: "34 tickets carried from S1 to S2" }
  },

  wave1Security: {
    targetReduction: 76,
    actualReduction: 100,
    targetAchieved: true,
    totalVulnerabilities: 390,
    addressedVulnerabilities: 298,
    arrProtected: 500000,
    status: "COMPLETE",
    tickets: [
      {
        id: "SC-302",
        summary: "Address PostgreSQL Vulnerabilities",
        vulnerabilities: 158,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "3 PRs merged, 6 commits"
      },
      {
        id: "SC-303",
        summary: "Address mlrig-box-to-tokens Vulnerabilities",
        vulnerabilities: 80,
        status: "DONE" as const,
        assignee: "Chad Hegerhorst",
        build: "PASSING" as const,
        notes: "Labels: broadridge-implementation, wave-1"
      },
      {
        id: "SC-304",
        summary: "Address Kafka Vulnerabilities",
        vulnerabilities: 60,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Build issue resolved - expected behavior, not blocking"
      }
    ] as SecurityTicket[]
  },

  wave2Security: {
    status: "COMPLETE",
    tickets: [
      {
        id: "SC-305",
        summary: "Address NATS Vulnerabilities",
        vulnerabilities: 26,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Completed by Jeff"
      },
      {
        id: "SC-306",
        summary: "Address Argo Events Vulnerabilities",
        vulnerabilities: 22,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Completed by Jeff"
      },
      {
        id: "SC-308",
        summary: "Address Argo CLI Vulnerabilities",
        vulnerabilities: 9,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Completed by Jeff"
      },
      {
        id: "SC-309",
        summary: "Address Argo Workflow Controller Vulnerabilities",
        vulnerabilities: null,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Completed by Jeff"
      },
      {
        id: "SC-311",
        summary: "Address Istio Proxy Vulnerabilities",
        vulnerabilities: 5,
        status: "DONE" as const,
        assignee: "Jeff Hegerhorst",
        build: "PASSING" as const,
        notes: "Completed by Jeff"
      }
    ] as SecurityTicket[]
  },

  confirmedDone: [
    { ticket: "BACK-1117", summary: "Implement intent-agent logic in extractor-service", status: "DONE", points: 8, verified: true },
    { ticket: "BACK-1540", summary: "Deep Pilot - unexisting extractions shown on Email Request", status: "DONE", points: null, verified: true },
    { ticket: "FB-2409", summary: "Train models for subcategories for Accenture", status: "DONE", points: 3, verified: true, assignee: "Nadiya" }
  ] as ConfirmedTicket[],

  labelIssue: {
    ticket: "BACK-1542",
    currentTitle: "Deploy v3 API to Broadridge & Demo",
    correctTitle: "Deploy v3 API to Broadridge & Demo",
    currentLabels: "none",
    correctLabels: "broadridge-implementation",
    status: "DONE - LABEL PENDING",
    owner: "Lane Terry",
    actionNeeded: "Add broadridge-implementation label"
  } as LabelIssue,

  toDo: [
    { id: "BACK-1548", summary: "Enable Conditional Reconciliation", assignee: "Darius Ouderkirk", points: 5, dueDate: null },
    { id: "BACK-1320", summary: "Inboxes/Data Sources API (parent)", assignee: "Lane Terry", points: null, dueDate: null },
    { id: "BACK-1344", summary: "Get Data Sources API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1345", summary: "Get Data Source Details API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1346", summary: "Update Data Source API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1347", summary: "Create Data Source API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1348", summary: "Delete Data Source API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1322", summary: "ML Models API (parent)", assignee: "Lane Terry", points: null, dueDate: null },
    { id: "BACK-1352", summary: "Get ML Models API", assignee: null, points: null, dueDate: null },
    { id: "BACK-1354", summary: "API subtask", assignee: null, points: null, dueDate: null }
  ] as SprintTicket[],

  inProgress: [
    { id: "BACK-839", summary: "Allow Event Status to be Updated via API", assignee: "Aleksander Winski", points: null, dueDate: null },
    { id: "BACK-1532", summary: "Fine-tune Mercury Extraction for Sunwest Bank", assignee: "Konnor Willison", points: null, dueDate: null },
    { id: "BACK-1572", summary: "Manual tasks push back to allegro", assignee: "Kannal Mutharasu", points: 5, dueDate: null },
    { id: "BACK-1573", summary: "Deep Pilot - Extra non-matching subgroups (DTCC)", assignee: "Darius Ouderkirk", points: 5, dueDate: null },
    { id: "BACK-1224", summary: "Research and plan major scalability refactor", assignee: "Lane Terry", points: null, dueDate: null },
    { id: "UI-703", summary: "Dashboards - preserve the same tab/filters", assignee: "Matthew Snow", points: null, dueDate: null },
    { id: "SC-322", summary: "Address OTEL Vulnerabilities", assignee: "Jeff Hegerhorst", points: null, dueDate: null },
    { id: "BACK-1596", summary: "Broadridge - create scripts to clean up project data", assignee: "Darius Ouderkirk", points: null, dueDate: null },
    { id: "BACK-1580", summary: "Update dependencies: Review 8 Dependabot PRs", assignee: "Kalvin Willison", points: null, dueDate: null },
    { id: "BACK-1586", summary: "Update node-forge from 1.3.1 to 1.3.3", assignee: "Kalvin Willison", points: null, dueDate: null },
    { id: "BACK-1591", summary: "More Feedback: Mercury Extraction for Colony Bank", assignee: "Kalvin Willison", points: null, dueDate: null },
    { id: "BACK-1578", summary: "Feedback: Mercury Extraction for Colony Bank", assignee: "Kalvin Willison", points: null, dueDate: null },
    { id: "BACK-1584", summary: "Create Message Sender Statistics Endpoint", assignee: "Ivan Peev", points: null, dueDate: null },
    { id: "BACK-849", summary: "Accenture unable to consume delivery failure email", assignee: "Aleksander Winski", points: null, dueDate: null },
    { id: "BACK-1430", summary: "ArrayIndexOutOfBounds Processing Actors", assignee: "Lane Terry", points: null, dueDate: null }
  ] as SprintTicket[],

  codeReview: [
    { id: "BACK-1521", summary: "Integrate SubCategory Model Calls into Prediction Pipeline", assignee: "Aleksander Winski", points: 3 },
    { id: "BACK-1488", summary: "Update deepview-status-service Base Image to Alpine 3.22.2", assignee: "Treven Trujillo", points: 1 },
    { id: "UI-701", summary: "Adjust the UI layout to show email attachment", assignee: "Matthew Snow", points: 5 },
    { id: "CI-436", summary: "Port over inference pipeline to argo workflows", assignee: "Jeff Hegerhorst", points: 8 },
    { id: "SC-324", summary: "Address Stakater Reloader Vulnerabilities", assignee: "Jeff Hegerhorst", points: null },
    { id: "BACK-1589", summary: "Update starlette from 0.45.3 to 0.49.1", assignee: "Kalvin Willison", points: null },
    { id: "BACK-1567", summary: "Actionable Data Export", assignee: "Ivan Peev", points: null },
    { id: "UI-711", summary: "Add New Blockly Block to check Term presence", assignee: "Owen Riley", points: null },
    { id: "UI-722", summary: "Create Stencil for Integer / Whole Number", assignee: "Owen Riley", points: null }
  ] as SprintTicket[],

  blocked: [
    { id: "CI-898", summary: "Upgrade JPM RDS version", assignee: "Chad Hegerhorst", points: null, status: "BLOCKED - 36 days (since Nov 17)" },
    { id: "BACK-1489", summary: "Update classification-api Base Image to Ubuntu 24.04 LTS", assignee: "UNASSIGNED", points: null, status: "BLOCKED - 41 days (since Nov 12)" }
  ] as SprintTicket[],

  inTesting: [] as SprintTicket[],

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
    { id: "SC-305", summary: "Address NATS Vulnerabilities (26 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "SC-306", summary: "Address Argo Events Vulnerabilities (22 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "SC-308", summary: "Address Argo CLI Vulnerabilities (9 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "SC-309", summary: "Address Argo Workflow Controller Vulnerabilities", assignee: "Jeff Hegerhorst", points: null },
    { id: "SC-311", summary: "Address Istio Proxy Vulnerabilities (5 C+H)", assignee: "Jeff Hegerhorst", points: null },
    { id: "BACK-870", summary: "Misc Broadridge DeepView Issues", assignee: "Darius Ouderkirk", points: null },
    { id: "BACK-850", summary: "(Accenture) Light Extraction - Handle Merged cells", assignee: "Aleksander Winski", points: null },
    { id: "BACK-1117", summary: "Implement intent-agent logic in extractor-service", assignee: "Darius Ouderkirk", points: 8 },
    { id: "BACK-1540", summary: "Deep Pilot - unexisting extractions shown on Email Request", assignee: null, points: null },
    { id: "BACK-1542", summary: "Deploy v3 API to Broadridge & Demo", assignee: "Lane Terry", points: null },
    { id: "BACK-1570", summary: "Test HMDA Mercury Extraction End-to-End", assignee: "Kalvin Willison", points: 3 },
    { id: "BACK-1494", summary: "HMDA Mercury Schema Updates", assignee: "Kalvin Willison", points: null },
    { id: "UI-690", summary: "DeepRecon Dashboard Updates", assignee: "Matthew Snow", points: 3 },
    { id: "BACK-847", summary: "ML Preprocessing Optimization", assignee: "Aleksander Winski", points: null },
    { id: "BACK-840", summary: "SubCategory Model Integration", assignee: "Aleksander Winski", points: null },
    { id: "BACK-849", summary: "Prediction Pipeline Updates", assignee: "Aleksander Winski", points: null },
    { id: "FB-2409", summary: "Train models for subcategories for Accenture", assignee: "Nadiya", points: 3 },
    { id: "BACK-1531", summary: "Fine-tune Mercury Extraction for Colony Bank", assignee: "Konnor Willison", points: null },
    { id: "BACK-1576", summary: "BBVA Reconciliation - Phase 2", assignee: "Kannal Mutharasu", points: null },
    { id: "BACK-1560", summary: "BBVA Reconciliation Output", assignee: "Kannal Mutharasu", points: null },
    { id: "UI-712", summary: "Dashboard Layout Updates", assignee: "Owen Riley", points: null },
    { id: "UI-708", summary: "UI Component Styling", assignee: "Owen Riley", points: null },
    { id: "UI-706", summary: "Filter Component Updates", assignee: "Owen Riley", points: null },
    { id: "BACK-1322", summary: "ML Models API", assignee: "Ivan Peev", points: null },
    { id: "BACK-1567", summary: "API Documentation Updates", assignee: "Ivan Peev", points: null },
    { id: "BACK-1572", summary: "Manual tasks pushed back to allegro - validation", assignee: "Kannal Mutharasu", points: null },
    { id: "BACK-1575", summary: "Mercury Extraction Schema Parameters", assignee: "Kalvin Willison", points: null },
    { id: "SC-316", summary: "Backup Restoration Test", assignee: "Chad Hegerhorst", points: null },
    { id: "SC-320", summary: "MLFlow Server Vulnerabilities", assignee: "Jeff Hegerhorst", points: null }
  ] as SprintTicket[],

  engineers: [
    { name: "Ivan Peev", assigned: 10, inProgress: 2, codeReview: 1, done: 3, totalPoints: null },
    { name: "Jeff Hegerhorst", assigned: 8, inProgress: 1, codeReview: 0, done: 7, totalPoints: null },
    { name: "Kannal Mutharasu", assigned: 5, inProgress: 0, codeReview: 1, inTesting: 1, done: 3, totalPoints: null },
    { name: "Kalvin Willison", assigned: 4, inProgress: 1, codeReview: 0, done: 1, totalPoints: null },
    { name: "Aleksander Winski", assigned: 4, inProgress: 0, codeReview: 1, done: 0, totalPoints: null },
    { name: "Chad Hegerhorst", assigned: 4, inProgress: 1, codeReview: 0, done: 2, totalPoints: null },
    { name: "Owen Riley", assigned: 3, inProgress: 0, codeReview: 2, done: 1, totalPoints: null },
    { name: "Darius Ouderkirk", assigned: 3, inProgress: 1, codeReview: 0, done: 0, totalPoints: null },
    { name: "Konnor Willison", assigned: 2, inProgress: 1, codeReview: 0, done: 0, totalPoints: null },
    { name: "Lane Terry", assigned: 1, inProgress: 0, codeReview: 0, done: 1, totalPoints: null },
    { name: "Matthew Snow", assigned: 1, inProgress: 1, codeReview: 0, done: 0, totalPoints: null },
    { name: "Treven Trujillo", assigned: 1, inProgress: 0, codeReview: 0, done: 1, totalPoints: null },
    { name: "UNASSIGNED", assigned: 21, inProgress: 0, codeReview: 0, done: 0, totalPoints: null }
  ] as EngineerWorkload[],

  unassigned: [
    { id: "BACK-1548", summary: "Enable Conditional Reconciliation", priority: "Major", points: 5 },
    { id: "BACK-1486", summary: "Update core-service Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1487", summary: "Update deeppilot-poll-inbox-trigger Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1488", summary: "Update deepview-status-service Base Image to Alpine 3.22.2", priority: "Major", points: null },
    { id: "BACK-1305", summary: "Create Message API", priority: "Major", points: null },
    { id: "BACK-1306", summary: "Update Message API", priority: "Major", points: null },
    { id: "SC-310", summary: "Address deepview-status vulnerabilities", priority: "Major", points: null },
    { id: "SC-312", summary: "Address preprocessor vulnerabilities", priority: "Major", points: null },
    { id: "SC-313", summary: "Address embeddings vulnerabilities", priority: "Major", points: null },
    { id: "SC-314", summary: "Verify promethia-api Baseline", priority: "Major", points: null },
    { id: "SC-307", summary: "Address core-service Vulnerabilities", priority: "Major", points: null },
    { id: "SC-299", summary: "Priority: Address Wiz-Identified Assets", priority: "Critical", points: null },
    { id: "BACK-1368", summary: "Update Workflow API (subtask)", priority: "Major", points: null },
    { id: "BACK-1367", summary: "Get Workflow Details API (subtask)", priority: "Major", points: null }
  ] as SprintTicket[],

  risks: [
    {
      severity: "HIGH" as const,
      item: "2 Blocked Tickets (36+ days)",
      description: "CI-898 (36 days) and BACK-1489 (41 days) blocking. Critical priority.",
      owner: "Chad Hegerhorst / UNASSIGNED",
      action: "Escalate to leadership"
    },
    {
      severity: "MEDIUM" as const,
      item: "21 Unassigned Tickets",
      description: "Exceeds 10-ticket threshold. Mostly UI tickets from Nadiya.",
      owner: "Brandon Baguley",
      action: "Assign or move to Sprint 3"
    },
    {
      severity: "LOW" as const,
      item: "Code Review Queue (5 tickets)",
      description: "BACK-839 overdue at 4 days. Others at 1 day.",
      owner: "Team Leads",
      action: "Clear BACK-839 first"
    }
  ] as SprintRisk[],

  wins: [
    {
      title: "Colony Bank Complete",
      description: "All 2 Colony Bank tickets done - 100% delivery",
      tickets: [],
      impact: "$200K ARR protected"
    },
    {
      title: "Security Wave 2 Progress",
      description: "63% security tickets complete. Jeff driving efficiency.",
      tickets: [],
      impact: "$500K ARR (Broadridge)"
    },
    {
      title: "12 Tickets Completed",
      description: "Strong start with 12 tickets done in first 4 days",
      tickets: [],
      impact: "Sprint momentum"
    },
    {
      title: "Story Points Ahead",
      description: "47% by points vs 29% by tickets - larger items completing first",
      tickets: [],
      impact: "Velocity tracking"
    }
  ] as SprintWin[],

  engineerRoster: [
    { name: "Aleksander Winski", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 3, pointsAssigned: 3 },
    { name: "Chad Hegerhorst", role: "Engineer", team: "Security" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 0, pointsAssigned: 0 },
    { name: "Darius Ouderkirk", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 3, pointsAssigned: 10 },
    { name: "Ivan Peev", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 2, pointsAssigned: 0 },
    { name: "Jeff Hegerhorst", role: "Lead Engineer", team: "Security" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 3, pointsAssigned: 8 },
    { name: "Kalvin Willison", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: true, flagReason: "BACK-1489 blocked 4 days", currentTickets: 6, pointsAssigned: 1 },
    { name: "Kannal Mutharasu", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 1, pointsAssigned: 5 },
    { name: "Konnor Willison", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 1, pointsAssigned: 0 },
    { name: "Lane Terry", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 4, pointsAssigned: 0 },
    { name: "Matthew Snow", role: "Engineer", team: "Platform" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 2, pointsAssigned: 5 },
    { name: "Owen Riley", role: "Engineer", team: "Platform" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 2, pointsAssigned: 0 },
    { name: "Treven Trujillo", role: "Engineer", team: "Core" as const, sprint1Access: true, needsVerification: false, flagged: false, currentTickets: 1, pointsAssigned: 1 }
  ] as Engineer[],

  engineerSummary: {
    total: 13,
    activeOnSprint: 12,
    needsVerification: 0,
    flagged: 1,
    unassignedTickets: 7,
    byTeam: {
      Core: 8,
      Security: 2,
      Platform: 2,
      Data: 0
    }
  }
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    "toDo": "#6c757d",
    "inProgress": "#007bff",
    "codeReview": "#6f42c1",
    "inTesting": "#17a2b8",
    "done": "#28a745",
    "blocked": "#dc3545",
    "cancelled": "#868e96"
  };
  return colors[status] || "#6c757d";
};

// Helper function to get health color (returns Tailwind classes)
export const getHealthColor = (health: string): string => {
  const colors: Record<string, string> = {
    "green": "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    "GREEN": "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    "yellow": "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    "YELLOW": "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    "red": "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    "RED": "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
  };
  return colors[health] || "bg-gray-100 dark:bg-gray-900/20";
};

// Helper function to get risk severity color (returns Tailwind classes)
export const getRiskColor = (severity: string): string => {
  const colors: Record<string, string> = {
    "HIGH": "bg-red-500",
    "MEDIUM": "bg-amber-500",
    "LOW": "bg-blue-500"
  };
  return colors[severity] || "bg-gray-500";
};

// Get sprint progress with full metrics
export function getSprintProgress(): {
  health: string;
  completionPct: number;
  pointsCompletionPct: number;
  total: number;
  done: number;
  inProgress: number;
  remaining: number;
  blocked: number;
  scopeCreep: number;
  daysRemaining: number;
  sprintDay: number;
} {
  const { done, toDo, inProgress, codeReview, blocked, inTesting } = SPRINT_1_DATA.statusBreakdown;
  const total = done.count + toDo.count + inProgress.count + codeReview.count + blocked.count + (inTesting?.count || 0);
  const totalPoints = done.points + toDo.points + inProgress.points + codeReview.points + blocked.points + (inTesting?.points || 0);
  
  return {
    health: SPRINT_1_DATA.sprint.health.toLowerCase(),
    completionPct: total > 0 ? Math.round((done.count / total) * 100) : 0,
    pointsCompletionPct: totalPoints > 0 ? Math.round((done.points / totalPoints) * 100) : 0,
    total,
    done: done.count,
    inProgress: inProgress.count + codeReview.count + (inTesting?.count || 0),
    remaining: toDo.count,
    blocked: blocked.count,
    scopeCreep: SPRINT_1_DATA.sprint.scopeCreep,
    daysRemaining: SPRINT_1_DATA.sprint.daysRemaining,
    sprintDay: SPRINT_1_DATA.sprint.sprintDay
  };
}

// Get points completion percentage
export function getPointsProgress(): number {
  const { done, toDo, inProgress, codeReview, blocked, inTesting } = SPRINT_1_DATA.statusBreakdown;
  const total = done.points + toDo.points + inProgress.points + codeReview.points + blocked.points + (inTesting?.points || 0);
  return total > 0 ? Math.round((done.points / total) * 100) : 0;
}

// Get security progress with full metrics
export function getSecurityProgress(): {
  resolvedPct: number;
  targetPct: number;
  achievedPct: number;
  progressPct: number;
  resolved: number;
  remaining: number;
  total: number;
  status: string;
} {
  const { addressedVulnerabilities, totalVulnerabilities, targetReduction, actualReduction, status } = SPRINT_1_DATA.wave1Security;
  const resolvedPct = totalVulnerabilities > 0 
    ? Math.round((addressedVulnerabilities / totalVulnerabilities) * 100) 
    : 0;
  
  return {
    resolvedPct,
    targetPct: targetReduction,
    achievedPct: Math.round((actualReduction / targetReduction) * 100),
    progressPct: resolvedPct,
    resolved: addressedVulnerabilities,
    remaining: totalVulnerabilities - addressedVulnerabilities,
    total: totalVulnerabilities,
    status: status || "IN_PROGRESS"
  };
}

// Get scope creep info
export function getScopeCreepInfo(): {
  ticketsAdded: number;
  pointsAdded: number | null;
  healthChange: string;
  alert: boolean;
} {
  const remainingPoints = SPRINT_1_DATA.sprint.remainingPoints;
  const prevRemainingPoints = SPRINT_1_DATA.sprint.prevRemainingPoints;
  const pointsAdded = (remainingPoints !== null && prevRemainingPoints !== null) 
    ? remainingPoints - prevRemainingPoints 
    : null;
  
  return {
    ticketsAdded: SPRINT_1_DATA.sprint.scopeCreep,
    pointsAdded,
    healthChange: `${SPRINT_1_DATA.sprint.prevHealth} → ${SPRINT_1_DATA.sprint.health}`,
    alert: SPRINT_1_DATA.sprint.scopeCreep > 5
  };
}

// Get status change info for display
export function getStatusChanges(): {
  status: string;
  count: number;
  prevCount: number;
  change: string;
  direction: 'up' | 'down' | 'same';
}[] {
  const breakdown = SPRINT_1_DATA.statusBreakdown;
  return Object.entries(breakdown).map(([status, data]) => ({
    status,
    count: data.count,
    prevCount: data.prevCount,
    change: data.change,
    direction: data.change.startsWith('+') ? 'up' as const : 
               data.change.startsWith('-') ? 'down' as const : 'same' as const
  }));
}

export default SPRINT_1_DATA;
