// SPRINT DATA - Sprint 2026-S3 (Future Sprint)
// Generated: January 6, 2026 at 10:42 AM MT
// Source: DeepSee Collective Board + Browser Agent JIRA Extraction
// Sprint: 2026-S3 - NOT STARTED
// Note: This sprint contains ARTEMIS Platform and Fabric tickets

export interface SprintTicket {
  key: string;
  summary: string;
  assignee: string | null;
  status: string;
  points: number | null;
  epic: string | null;
  project: string;
  priority?: string;
}

export interface EngineerWorkload {
  name: string;
  role: string;
  s3Tickets: number;
  s3Points: number;
  fullWorkload: number;
  backlogDebt: number;
  status: 'over-capacity' | 'at-capacity' | 'under-capacity' | 'no-work';
}

export interface SprintAlert {
  type: string;
  message: string;
  severity: 'critical' | 'high' | 'warning' | 'info';
  action?: string;
  assignee?: string;
}

export interface StatusBreakdownItem {
  count: number;
  percent: number;
}

export const SPRINT_3_DATA = {
  sprint: {
    name: "2026-S3",
    displayName: "2026-S3",
    status: "Not Started",
    goal: "ARTEMIS Platform Infrastructure and Fabric Integration",
    startDate: "2026-01-27", // Estimated start
    endDate: "2026-02-10",   // Estimated end
    dataExtracted: "2026-01-06T10:42:00-07:00",
    sprintDay: 0,
    daysRemaining: 14,
    totalDays: 14,
    percentThroughSprint: 0,
    capacity: "TBD",
    capacityNote: "Sprint planning not yet complete",
    health: "YELLOW" as "GREEN" | "YELLOW" | "RED",
    healthReasons: [
      "93% of tickets unassigned",
      "Sprint planning session required",
      "Story point estimation needed for majority of tickets"
    ],
    healthPositives: [
      "All ARTEMIS S3 tickets created in JIRA",
      "Platform and Fabric epics properly linked",
      "No blocked tickets"
    ]
  },

  // Sprint Overview
  overview: {
    totalTickets: 15,
    totalPoints: 99, // Platform 67 + Fabric 32 from ARTEMIS data
    ticketsWithoutPoints: 0, // All ARTEMIS tickets have points in our data
    unassigned: {
      tickets: 14,
      percent: 93
    },
    statusBreakdown: {
      done: { count: 0, percent: 0 } as StatusBreakdownItem,
      inProgress: { count: 0, percent: 0 } as StatusBreakdownItem,
      inReview: { count: 0, percent: 0 } as StatusBreakdownItem,
      toDo: { count: 15, percent: 100 } as StatusBreakdownItem,
      blocked: { count: 0, percent: 0 } as StatusBreakdownItem
    },
    completion: {
      ticketPercent: 0,
      pointPercent: 0
    }
  },

  // ARTEMIS Epic Progress
  artemisProgress: {
    platform: {
      epicKey: "BACK-1680",
      epicName: "Platform Infrastructure - ARTEMIS Foundation",
      prd: "https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948",
      s3Tickets: 10,
      s3Points: 67,
      completion: 0,
      status: {
        done: 0,
        inProgress: 0,
        toDo: 10
      },
      tickets: [
        "BACK-1684", // Message routing (8 pts)
        "BACK-1685", // Message tracing (5 pts)
        "BACK-1688", // Document Store (5 pts)
        "BACK-1690", // Data lifecycle (5 pts)
        "BACK-1693", // GPU allocation (8 pts)
        "BACK-1694", // Cost monitoring (5 pts)
        "BACK-1697", // MCP adapter (13 pts)
        "BACK-1699", // Webhook delivery (5 pts)
        "BACK-1702", // Self-healing (8 pts)
        "BACK-1703"  // Health dashboard (5 pts)
      ]
    },
    fabric: {
      epicKey: "BACK-1704",
      epicName: "DeepSee Fabric Integration - Microsoft Ecosystem",
      prd: "", // TBD - SharePoint migration pending
      s3Tickets: 5,
      s3Points: 32,
      completion: 0,
      status: {
        done: 0,
        inProgress: 0,
        toDo: 5
      },
      tickets: [
        "BACK-1709", // Data Pipeline (8 pts)
        "BACK-1710", // Power BI (8 pts)
        "BACK-1711", // Real-Time Analytics (5 pts)
        "BACK-1712", // OneLake sync (8 pts)
        "BACK-1714"  // Audit logging (3 pts)
      ]
    }
  },

  // All S3 Tickets
  tickets: [
    // Platform tickets (S3)
    {
      key: "BACK-1684",
      summary: "[PLATFORM] Build message routing and orchestration layer",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1685",
      summary: "[PLATFORM] Add message tracing and correlation IDs",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1688",
      summary: "[PLATFORM] Document Store indexing improvements",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1690",
      summary: "[PLATFORM] Create data lifecycle management policies",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1693",
      summary: "[PLATFORM] GPU resource allocation for LLM inference",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1694",
      summary: "[PLATFORM] Create compute cost monitoring dashboard",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1697",
      summary: "[PLATFORM] MCP (Model Context Protocol) adapter",
      assignee: null,
      status: "To Do",
      points: 13,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1699",
      summary: "[PLATFORM] Webhook delivery and retry mechanism",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1702",
      summary: "[PLATFORM] Self-healing agent restart logic",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1680",
      project: "BACK"
    },
    {
      key: "BACK-1703",
      summary: "[PLATFORM] Create platform health dashboard",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1680",
      project: "BACK"
    },
    // Fabric tickets (S3)
    {
      key: "BACK-1709",
      summary: "[FABRIC] Fabric Data Pipeline for ETL workflows",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1704",
      project: "BACK"
    },
    {
      key: "BACK-1710",
      summary: "[FABRIC] Power BI embedded dashboards",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1704",
      project: "BACK"
    },
    {
      key: "BACK-1711",
      summary: "[FABRIC] Fabric Real-Time Analytics integration",
      assignee: null,
      status: "To Do",
      points: 5,
      epic: "BACK-1704",
      project: "BACK"
    },
    {
      key: "BACK-1712",
      summary: "[FABRIC] OneLake data sync for Information Graph",
      assignee: null,
      status: "To Do",
      points: 8,
      epic: "BACK-1704",
      project: "BACK"
    },
    {
      key: "BACK-1714",
      summary: "[FABRIC] Fabric audit logging integration",
      assignee: null,
      status: "To Do",
      points: 3,
      epic: "BACK-1704",
      project: "BACK"
    }
  ] as SprintTicket[],

  // Engineer Workload (Brandon's Two-View Method)
  engineerWorkload: {
    lastUpdated: "2026-01-06T10:42:00-07:00",
    sprint: "2026-S3",
    capacityTarget: 15,
    engineers: [
      {
        name: "Lane Terry",
        role: "Lead Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 3,
        backlogDebt: 3,
        status: "under-capacity" as const
      },
      {
        name: "Jeff Hegerhorst",
        role: "Principal DevOps Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 5,
        backlogDebt: 5,
        status: "under-capacity" as const
      },
      {
        name: "Chad Hegerhorst",
        role: "Lead Software Engineer in Test",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 3,
        backlogDebt: 3,
        status: "under-capacity" as const
      },
      {
        name: "Ivan Peev",
        role: "Senior Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 1,
        backlogDebt: 1,
        status: "under-capacity" as const
      },
      {
        name: "Darius Ouderkirk",
        role: "Principal Software Engineer",
        s3Tickets: 1,
        s3Points: 3,
        fullWorkload: 9,
        backlogDebt: 8,
        status: "under-capacity" as const
      },
      {
        name: "Kannal Mutharasu",
        role: "Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 5,
        backlogDebt: 5,
        status: "under-capacity" as const
      },
      {
        name: "Kalvin Willison",
        role: "Junior Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 2,
        backlogDebt: 2,
        status: "under-capacity" as const
      },
      {
        name: "Aleksander Winski",
        role: "Senior Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 9,
        backlogDebt: 9,
        status: "under-capacity" as const
      },
      {
        name: "Owen Riley",
        role: "Staff Frontend Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 7,
        backlogDebt: 7,
        status: "under-capacity" as const
      },
      {
        name: "Matt Snow",
        role: "Senior Frontend Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 0,
        backlogDebt: 0,
        status: "no-work" as const
      },
      {
        name: "Treven Trujillo",
        role: "Software Engineer",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 2,
        backlogDebt: 2,
        status: "under-capacity" as const
      },
      {
        name: "Konnor Willison",
        role: "Chief Architect",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 0,
        backlogDebt: 0,
        status: "no-work" as const
      },
      {
        name: "Loris D'Acunto",
        role: "Chief Data Scientist",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 15,
        backlogDebt: 15,
        status: "at-capacity" as const
      },
      {
        name: "Karolina Toman",
        role: "Director of Forward Deployed Engineering",
        s3Tickets: 0,
        s3Points: 0,
        fullWorkload: 0,
        backlogDebt: 0,
        status: "no-work" as const
      }
    ] as EngineerWorkload[],
    summary: {
      totalEngineers: 14,
      withS3Work: 1,
      withoutS3Work: 13,
      overCapacity: 0,
      underCapacity: 10,
      atCapacity: 1,
      noWork: 3
    }
  },

  // Sprint Alerts
  alerts: [
    {
      type: "unassigned",
      message: "93% of S3 tickets unassigned (13 of 14)",
      severity: "critical" as const,
      action: "Sprint planning session required"
    },
    {
      type: "no-progress",
      message: "0% sprint completion - all tickets in To Do",
      severity: "warning" as const,
      action: "Sprint has not started - expected behavior"
    },
    {
      type: "artemis-platform",
      message: "Platform: 9 tickets, 67 points ready for S3",
      severity: "info" as const,
      action: "Assign engineers during sprint planning"
    },
    {
      type: "artemis-fabric",
      message: "Fabric: 5 tickets, 32 points ready for S3",
      severity: "info" as const,
      action: "Assign engineers during sprint planning"
    }
  ] as SprintAlert[],

  // Metadata
  meta: {
    lastUpdated: "2026-01-06T10:42:00-07:00",
    source: "Browser Agent JIRA Extraction",
    notes: [
      "S3 is a future sprint - not yet started",
      "All ARTEMIS tickets have correct IDs (BACK-1680 epic, BACK-1681+ stories)",
      "Ticket IDs updated from placeholder values on Jan 6, 2026",
      "Platform: 9 tickets (67 pts), Fabric: 5 tickets (32 pts)"
    ]
  }
};

// Summary statistics
export const S3_SUMMARY = {
  sprint: "2026-S3",
  status: "Not Started",
  totalTickets: 15,
  totalPoints: 99,
  completion: 0,
  unassignedPercent: 93,
  artemis: {
    platform: { tickets: 10, points: 67 },
    fabric: { tickets: 5, points: 32 }
  },
  engineersWithWork: 1,
  criticalAlerts: 1
};
