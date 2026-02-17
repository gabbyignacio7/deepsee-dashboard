// Engineer Capacity Data - Updated February 17, 2026 at 12:00 PM MT
// Source: JIRA Extract - Sprint 2026-S4 (Active - Day 1 of 14)

export interface TicketAssignment {
  key: string;
  summary: string;
  status: "TO DO" | "IN PROGRESS" | "CODE REVIEW" | "DONE" | "BLOCKED" | "WAITING FOR APPROVAL";
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
  // Updated Feb 13, 2026 - Sprint S4 Day 1 data
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 13, s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 IP, backlog debt 12', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 27, s4Tickets: 1, s4Points: 3, status: 'red', statusNote: '1 IP, backlog debt 26', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 7, s4Tickets: 1, s4Points: 5, status: 'green', statusNote: '1 To Do', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 4, s4Tickets: 3, s4Points: 11, status: 'green', statusNote: '2 IP, 1 CR', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 23, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: '0 sprint tickets, backlog debt 23', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 4, s4Tickets: 1, s4Points: 5, status: 'green', statusNote: '1 CR', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 5, s4Tickets: 1, s4Points: 0, status: 'yellow', statusNote: '1 CR, 0 pts assigned', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 21, s4Tickets: 3, s4Points: 10, status: 'yellow', statusNote: '1 IP, 2 WFA, backlog debt 18', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 18, s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '2 IP, backlog debt 16', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 23, s4Tickets: 3, s4Points: 7, status: 'red', statusNote: '1 IP, 1 CR, 1 Blocked, backlog debt 20', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 10, s4Tickets: 2, s4Points: 8, status: 'yellow', statusNote: '1 IP, 1 To Do, backlog debt 8', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 1, s4Tickets: 1, s4Points: 8, status: 'green', statusNote: '1 IP', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: '0 sprint tickets, backlog debt 15', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Director role — no sprint tickets', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 61,
  totalS3Points: 120,
  s3Assigned: 21,
  s3Unassigned: 40,
  s3UnassignedPercent: 65.6,
  totalAssignedPoints: 67,
  unassignedPoints: 53,
  avgPointsPerEngineer: 8.6,
  engineersWithNoS3Work: ['Darius Ouderkirk', "Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ['Darius Ouderkirk', "Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: [] as string[],
  belowMinimum: ['Jeff Hegerhorst (3)', 'Kalvin Willison (0)', 'Lane Terry (5)', 'Chad Hegerhorst (5)', 'Kannal Mutharasu (5)'],
  heavyWorkloads: ['Ivan Peev (11)', 'Aleksander Winski (10)', 'Treven Trujillo (8)', 'Konnor Willison (8)', 'Matthew Snow (7)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-1918', summary: '[Colony] GAP Coverage Provider to Allegro', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 0 },
  { ticket: 'UI-755', summary: 'Second check on email recipients', assignee: 'Matthew Snow', points: 3, daysInReview: 0 },
  { ticket: 'BACK-1816', summary: 'Create Content Understanding client', assignee: 'Kalvin Willison', points: 3, daysInReview: 0 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1871', summary: 'Dates in calculations converted to date-time', assignee: 'Darius Ouderkirk', points: 2, resolved: '2026-02-03' },
  { ticket: 'BACK-1821', summary: 'ACN Updates for IsReply', assignee: 'Aleksander Winski', points: 3, resolved: '2026-02-03' },
  { ticket: 'BACK-911', summary: 'Sources incorrectly removed from consideration', assignee: 'Darius Ouderkirk', points: 3, resolved: '2026-02-03' },
  { ticket: 'BACK-1868', summary: 'Colony: Extraction Feedback - Live Loan 8588', assignee: 'Kalvin Willison', points: 1, resolved: '2026-02-02' },
  { ticket: 'UI-751', summary: 'Find missing terms in work item', assignee: 'Owen Riley', points: 2, resolved: '2026-02-02' }
];

export const engineerAllocationData = {
  lastUpdated: "February 17, 2026, 12:00 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
