// Engineer Capacity Data - Updated February 1, 2026 at 7:30 PM MT
// Source: JIRA Extract - Sprint 2026-S2 (Final) / S3 (Active) / S4 (Next)

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
  s3Done: number;
  fullWorkload: number;
  s4Tickets: number;
  s4Points: number;
  status: 'green' | 'yellow' | 'red' | 'warning';
  statusNote: string;
  tickets: TicketAssignment[];
}

export const engineers: EngineerCapacity[] = [
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 5, s4Tickets: 0, s4Points: 0, status: 'warning', statusNote: 'No S3 tickets', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 0, fullWorkload: 5, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Active', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 1, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 0, fullWorkload: 4, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Active', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 4, s3Points: 12, s3Done: 0, fullWorkload: 4, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: 'Heavy (2 in CR)', tickets: [{ key: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', status: 'CODE REVIEW', points: 3 }, { key: 'BACK-1826', summary: 'Move Migrations to DeepRecon Platform Image', status: 'CODE REVIEW', points: 3 }] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 0, fullWorkload: 11, s4Tickets: 1, s4Points: 3, status: 'yellow', statusNote: 'Heavy workload', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 0, fullWorkload: 4, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Active (1 in CR)', tickets: [{ key: 'BACK-1548', summary: 'Enable Conditional Reconciliation', status: 'CODE REVIEW', points: 5 }] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 1, s2Blocked: 0, completionPct: 87.5, s3Tickets: 2, s3Points: 9, s3Done: 2, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'All S3 done - available', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 3, s3Points: 8, s3Done: 0, fullWorkload: 10, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: 'Heavy backlog', tickets: [{ key: 'BACK-1821', summary: 'ACN Updates for IsReply', status: 'CODE REVIEW', points: 0 }] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 1, s3Points: 3, s3Done: 0, fullWorkload: 6, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Light S3', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 1, s3Points: 3, s3Done: 0, fullWorkload: 16, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'Heavy backlog (16 open)', tickets: [{ key: 'UI-738', summary: 'Deep Recon - View Email Body in Actionable Screen', status: 'CODE REVIEW', points: 3 }] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 9, s3Done: 1, fullWorkload: 4, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Active', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 3, s3Done: 0, fullWorkload: 3, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Light', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'warning', statusNote: 'No S3 tickets, 15 backlog', tickets: [] },
  { name: 'Karolina Toman', role: 'Director Forward Deployed Engineering', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'warning', statusNote: 'No tickets assigned', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 82,
  totalS3Points: 129,
  s3Assigned: 27,
  s3Unassigned: 55,
  s3UnassignedPercent: 67.1,
  engineersWithNoS3Work: ['Lane Terry', "Loris D'Acunto", 'Karolina Toman'],
  engineersCompleted: ['Kalvin Willison'],
  heavyWorkloads: ['Darius Ouderkirk (11)', 'Aleksander Winski (10)', 'Matthew Snow (16)', "Loris D'Acunto (15)"]
};

export const codeReviewQueue = [
  { ticket: 'BACK-1548', summary: 'Enable Conditional Reconciliation', assignee: 'Kannal Mutharasu', points: 5 },
  { ticket: 'BACK-1792', summary: 'JAVA - Generate/Review Unit/Integration Test Agent', assignee: 'Brandon Baguley', points: 1 },
  { ticket: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', assignee: 'Ivan Peev', points: 3 },
  { ticket: 'BACK-1821', summary: 'ACN Updates for IsReply', assignee: 'Aleksander Winski', points: 0 },
  { ticket: 'BACK-1826', summary: 'Move Migrations to DeepRecon Platform Image', assignee: 'Ivan Peev', points: 3 },
  { ticket: 'UI-738', summary: 'Deep Recon - View Email Body in Actionable Screen', assignee: 'Matthew Snow', points: 3 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1858', summary: 'Purge test work items from Colony RV/Marine', assignee: 'Treven Trujillo', points: 1, resolved: '2026-01-30' },
  { ticket: 'BACK-1833', summary: 'Colony: Extraction Feedback - Live Loan 8566399', assignee: 'Kalvin Willison', points: 1, resolved: '2026-01-30' },
  { ticket: 'BACK-1651', summary: '[MERCURY] Core extraction engine performance optimization', assignee: 'Kalvin Willison', points: 8, resolved: '2026-01-30' }
];

export const engineerAllocationData = {
  lastUpdated: "February 1, 2026, 7:30 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s3Tickets === 0);
}
