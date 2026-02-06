// Engineer Capacity Data - Updated February 6, 2026 at 3:00 PM MT
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
  // Updated Feb 6, 2026 - Sprint S3 Day 7 data from megaprompt
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 17, s3Done: 6, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: '6 of 7 done', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 15, s3Done: 7, fullWorkload: 2, s4Tickets: 1, s4Points: 3, status: 'green', statusNote: '7 of 9 done', tickets: [{ key: 'UI-754', summary: 'No extractions block in the middle of emails', status: 'CODE REVIEW', points: 1 }] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 23, s3Done: 3, fullWorkload: 3, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: '3 of 6 done', tickets: [{ key: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', status: 'CODE REVIEW', points: 3, daysInStatus: 17 }] },
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 4, s3Points: 12, s3Done: 3, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: '3 of 4 done', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 3, s3Done: 0, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'No done tickets', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 15, s3Done: 3, fullWorkload: 2, s4Tickets: 1, s4Points: 3, status: 'green', statusNote: '3 of 5 done', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 16, s3Done: 1, fullWorkload: 3, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: '1 of 4 done', tickets: [{ key: 'BACK-1859', summary: '[BE][Accenture] - find way to reduce response size', status: 'CODE REVIEW', points: 3 }] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'No done tickets', tickets: [{ key: 'UI-738', summary: 'Deep Recon - View Email Body in Actionable Screen', status: 'CODE REVIEW', points: 3, daysInStatus: 24 }] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 9, s3Done: 1, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: '1 of 3 done', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 1, s2Blocked: 0, completionPct: 80, s3Tickets: 3, s3Points: 15, s3Done: 2, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: '2 of 3 done', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 3, s3Points: 18, s3Done: 1, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: '1 of 3 done', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 2, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: '2 of 4 done', tickets: [] },
  { name: 'Brandon Baguley', role: 'Software Engineer', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 2, s3Points: 3, s3Done: 0, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'No done tickets', tickets: [{ key: 'BACK-1792', summary: 'JAVA - Generate and Review Unit/Integration Test Agent Markdowns', status: 'CODE REVIEW', points: 1, daysInStatus: 22 }] },
  { name: 'Loris Friedel', role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'warning', statusNote: 'No S3 tickets', tickets: [] },
  { name: 'Karolina Toman', role: 'Software Engineer', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'warning', statusNote: 'No S3 tickets', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 15,
  totalS3Tickets: 109,
  totalS3Points: 210,
  s3Assigned: 54,
  s3Unassigned: 55,
  s3UnassignedPercent: 50.5,
  engineersWithNoS3Work: ['Loris Friedel', 'Karolina Toman'],
  engineersCompleted: [],
  heavyWorkloads: ['Owen Riley (9)', 'Kalvin Willison (7)', 'Ivan Peev (6)', 'Darius Ouderkirk (5)']
};

export const codeReviewQueue = [
  { ticket: 'UI-754', summary: 'No extractions block in the middle of emails', assignee: 'Owen Riley', points: 1, daysInReview: 4 },
  { ticket: 'UI-738', summary: 'Deep Recon - View Email Body in Actionable Screen', assignee: 'Matthew Snow', points: 3, daysInReview: 24 },
  { ticket: 'BACK-1859', summary: '[BE][Accenture] - find way to reduce response size', assignee: 'Aleksander Winski', points: 3, daysInReview: 1 },
  { ticket: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', assignee: 'Ivan Peev', points: 3, daysInReview: 17 },
  { ticket: 'BACK-1792', summary: 'JAVA - Generate and Review Unit/Integration Test Agent Markdowns', assignee: 'Brandon Baguley', points: 1, daysInReview: 22 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1871', summary: 'Dates in calculations converted to date-time', assignee: 'Darius Ouderkirk', points: 2, resolved: '2026-02-03' },
  { ticket: 'BACK-1821', summary: 'ACN Updates for IsReply', assignee: 'Aleksander Winski', points: 3, resolved: '2026-02-03' },
  { ticket: 'BACK-911', summary: 'Sources incorrectly removed from consideration', assignee: 'Darius Ouderkirk', points: 3, resolved: '2026-02-03' },
  { ticket: 'BACK-1868', summary: 'Colony: Extraction Feedback - Live Loan 8588', assignee: 'Kalvin Willison', points: 1, resolved: '2026-02-02' },
  { ticket: 'UI-751', summary: 'Find missing terms in work item', assignee: 'Owen Riley', points: 2, resolved: '2026-02-02' },
  { ticket: 'BACK-1867', summary: 'Update term type in mercury schema', assignee: 'Kalvin Willison', points: 2, resolved: '2026-02-02' },
  { ticket: 'BACK-1865', summary: 'Production Issue: Colony Bank Amounts', assignee: 'Kalvin Willison', points: 2, resolved: '2026-02-02' },
  { ticket: 'BACK-1826', summary: 'Move Migrations to DeepRecon Platform Image', assignee: 'Ivan Peev', points: 3, resolved: '2026-02-02' },
  { ticket: 'BACK-1825', summary: 'Add Indexes to Support New Statistics Endpoint', assignee: 'Ivan Peev', points: 3, resolved: '2026-02-02' }
];

export const engineerAllocationData = {
  lastUpdated: "February 6, 2026, 3:00 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s3Tickets === 0);
}
