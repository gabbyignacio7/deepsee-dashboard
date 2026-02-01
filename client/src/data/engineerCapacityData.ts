// Engineer Capacity Data - Updated January 28, 2026
// Source: JIRA Extract - Sprint 2026-S2 / S3

export interface TicketAssignment {
  key: string;
  summary: string;
  status: "TO DO" | "IN PROGRESS" | "CODE REVIEW" | "DONE" | "BLOCKED";
  points: number;
  daysInStatus?: number;
}

export interface EngineerCapacity {
  name: string;
  role: string;
  s2Tickets: number;
  s2Points: number;
  s2Done: number;
  s2InProgress: number;
  s2Blocked: number;
  completionPct: number;
  s3Tickets: number;
  s3Points: number;
  status: 'green' | 'yellow' | 'red' | 'warning';
  statusNote: string;
  tickets: TicketAssignment[];
}

export const engineers: EngineerCapacity[] = [
  {
    name: "Lane Terry",
    role: "Lead Software Engineer",
    s2Tickets: 7,
    s2Points: 7,
    s2Done: 7,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 100,
    s3Tickets: 0,
    s3Points: 0,
    status: 'warning',
    statusNote: 'No S3 work',
    tickets: []
  },
  {
    name: "Jeff Hegerhorst",
    role: "Principal DevOps Engineer",
    s2Tickets: 4,
    s2Points: 13,
    s2Done: 3,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 75,
    s3Tickets: 2,
    s3Points: 13,
    status: 'yellow',
    statusNote: '13pt',
    tickets: []
  },
  {
    name: "Chad Hegerhorst",
    role: "Lead Software Engineer in Test",
    s2Tickets: 5,
    s2Points: 18,
    s2Done: 4,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 80,
    s3Tickets: 2,
    s3Points: 10,
    status: 'yellow',
    statusNote: '10pt',
    tickets: []
  },
  {
    name: "Ivan Peev",
    role: "Senior Software Engineer",
    s2Tickets: 12,
    s2Points: 15,
    s2Done: 9,
    s2InProgress: 3,
    s2Blocked: 0,
    completionPct: 75,
    s3Tickets: 3,
    s3Points: 9,
    status: 'green',
    statusNote: '9pt',
    tickets: [
      { key: "BACK-1826", summary: "Move Migrations to DeepRecon Platform Image", status: "CODE REVIEW", points: 3 },
      { key: "BACK-1805", summary: "DeepPilot Client & Message Update Integration", status: "CODE REVIEW", points: 3 }
    ]
  },
  {
    name: "Darius Ouderkirk",
    role: "Principal Software Engineer",
    s2Tickets: 6,
    s2Points: 18,
    s2Done: 3,
    s2InProgress: 3,
    s2Blocked: 0,
    completionPct: 50,
    s3Tickets: 4,
    s3Points: 14,
    status: 'yellow',
    statusNote: '14pt - backlog risk',
    tickets: []
  },
  {
    name: "Kannal Mutharasu",
    role: "Software Engineer",
    s2Tickets: 10,
    s2Points: 32,
    s2Done: 8,
    s2InProgress: 2,
    s2Blocked: 0,
    completionPct: 80,
    s3Tickets: 2,
    s3Points: 10,
    status: 'yellow',
    statusNote: '10pt',
    tickets: [
      { key: "BACK-1548", summary: "Enable Conditional Reconciliation", status: "CODE REVIEW", points: 5 }
    ]
  },
  {
    name: "Kalvin Willison",
    role: "Junior Software Engineer",
    s2Tickets: 8,
    s2Points: 26,
    s2Done: 7,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 87.5,
    s3Tickets: 2,
    s3Points: 9,
    status: 'green',
    statusNote: '9pt',
    tickets: []
  },
  {
    name: "Aleksander Winski",
    role: "Senior Software Engineer",
    s2Tickets: 6,
    s2Points: 16,
    s2Done: 3,
    s2InProgress: 3,
    s2Blocked: 0,
    completionPct: 50,
    s3Tickets: 3,
    s3Points: 8,
    status: 'green',
    statusNote: '8pt',
    tickets: [
      { key: "BACK-1821", summary: "ACN Updates for IsReply", status: "CODE REVIEW", points: 0 }
    ]
  },
  {
    name: "Owen Riley",
    role: "Staff Frontend Engineer",
    s2Tickets: 7,
    s2Points: 17,
    s2Done: 7,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 100,
    s3Tickets: 1,
    s3Points: 3,
    status: 'green',
    statusNote: '3pt - capacity available',
    tickets: []
  },
  {
    name: "Matthew Snow",
    role: "Senior Frontend Engineer",
    s2Tickets: 3,
    s2Points: 9,
    s2Done: 2,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 67,
    s3Tickets: 1,
    s3Points: 3,
    status: 'red',
    statusNote: '5 long-blocked tickets',
    tickets: [
      { key: "UI-738", summary: "View Email Body in Actionable Screen", status: "CODE REVIEW", points: 3 }
    ]
  },
  {
    name: "Treven Trujillo",
    role: "Software Engineer",
    s2Tickets: 3,
    s2Points: 16,
    s2Done: 2,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 67,
    s3Tickets: 3,
    s3Points: 9,
    status: 'green',
    statusNote: '9pt',
    tickets: []
  },
  {
    name: "Konnor Willison",
    role: "Chief Architect",
    s2Tickets: 0,
    s2Points: 0,
    s2Done: 0,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 0,
    s3Tickets: 1,
    s3Points: 3,
    status: 'green',
    statusNote: '3pt',
    tickets: []
  },
  {
    name: "Loris D'Acunto",
    role: "Chief Data Scientist",
    s2Tickets: 0,
    s2Points: 0,
    s2Done: 0,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 0,
    s3Tickets: 0,
    s3Points: 0,
    status: 'warning',
    statusNote: 'No S3 work, estimates needed',
    tickets: []
  },
  {
    name: "Karolina Toman",
    role: "Director Forward Deployed Engineering",
    s2Tickets: 0,
    s2Points: 0,
    s2Done: 0,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 0,
    s3Tickets: 0,
    s3Points: 0,
    status: 'warning',
    statusNote: 'No S3 work',
    tickets: []
  }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS2Tickets: 98,
  totalS2Points: 204,
  completedTickets: 58,
  completedPoints: 138,
  completionRate: 59.2,
  pointsCompletionRate: 67.6,
  s3TotalTickets: 81,
  s3Assigned: 26,
  s3Unassigned: 55,
  s3UnassignedPercent: 67.9,
  teamVelocity: 138,
  avgCompletionPct: 59.2
};

// Code Review Queue
export const codeReviewQueue = [
  { ticket: 'UI-738', summary: 'View Email Body in Actionable Screen', assignee: 'Matthew Snow', points: 3 },
  { ticket: 'BACK-1826', summary: 'Move Migrations to DeepRecon Platform Image', assignee: 'Ivan Peev', points: 3 },
  { ticket: 'BACK-1821', summary: 'ACN Updates for IsReply', assignee: 'Aleksander Winski', points: 0 },
  { ticket: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', assignee: 'Ivan Peev', points: 3 },
  { ticket: 'BACK-1792', summary: 'Generate/Review Unit Test Agent Markdowns', assignee: 'Brandon Baguley', points: 1 },
  { ticket: 'BACK-1548', summary: 'Enable Conditional Reconciliation', assignee: 'Kannal Mutharasu', points: 5 }
];

// Get engineers sorted by various metrics
export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersByTicketCount(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.s2Tickets - a.s2Tickets);
}

export function getEngineersWithBlocked(): EngineerCapacity[] {
  return engineers.filter(e => e.s2Blocked > 0);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s3Tickets === 0);
}
