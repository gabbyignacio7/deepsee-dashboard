// Engineer Capacity Data - Updated March 9, 2026 at 12:22 PM MT
// Source: JIRA Extract - Sprint 2026-S4 (Active - Day 10 of 14)

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
  // Updated Mar 2, 2026 - Sprint S5 Day 10 data (JIRA API extraction)
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 9, s4Tickets: 5, s4Points: 17, status: 'yellow', statusNote: '1 IP, 2 CR (stale 5d+4d), 2 Done, backlog debt +2', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 6, s4Tickets: 7, s4Points: 20, status: 'yellow', statusNote: '3 IP (CI-937 stale 7d), 4 Done, backlog debt -1', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 4, s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP (stale 9d), 1 Done, backlog debt +1', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 3, s4Tickets: 9, s4Points: 26, status: 'yellow', statusNote: '1 IP (BACK-1326 new), 4 CR, 4 Done, backlog debt -4', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 8, s4Tickets: 4, s4Points: 6, status: 'green', statusNote: '1 IP (BACK-2018), 3 Done, backlog debt +1', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 7, s4Tickets: 6, s4Points: 15, status: 'green', statusNote: '1 IP, 5 Done, backlog debt -2', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 4, s4Tickets: 5, s4Points: 8, status: 'green', statusNote: '1 IP, 2 Done, 1 Canceled, 1 WFA, backlog debt -2', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 12, s4Tickets: 5, s4Points: 19, status: 'yellow', statusNote: '1 IP, 2 Done, 2 WFA, backlog debt +2', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 5, s4Tickets: 5, s4Points: 10, status: 'yellow', statusNote: '1 IP (stale 10d), 4 Done, backlog debt -4', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 9, s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '1 IP, 2 Done, backlog debt +3', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 8, s4Tickets: 2, s4Points: 10, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt 0', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Chief Architect -- no sprint tickets, advisory role', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +15', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +1', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 87,
  totalS3Points: 213,
  s3Assigned: 64,
  s3Unassigned: 23,
  s3UnassignedPercent: 26.4,
  totalAssignedPoints: 169,
  unassignedPoints: 44,
  avgPointsPerEngineer: 12.7,
  engineersWithNoS3Work: ["Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ["Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: ['Ivan Peev (21 pts)', 'Aleksander Winski (19 pts)'] as string[],
  belowMinimum: ['Matthew Snow (3)', 'Chad Hegerhorst (5)', 'Darius Ouderkirk (5)'],
  heavyWorkloads: ['Ivan Peev (9 tickets, 26 pts)', 'Jeff Hegerhorst (7 tickets, 20 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (5 tickets, 17 pts)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-1303', summary: 'ML Label or Challenge Workflow Template', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1302', summary: 'ML Label or Challenge Output Handler CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1301', summary: 'ML Label or Challenge Input CLI', assignee: 'Ivan Peev', points: 0, daysInReview: 4 },
  { ticket: 'BACK-1298', summary: 'ML Label or Challenge Workflow', assignee: 'Ivan Peev', points: 13, daysInReview: 4 },
  { ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 5 },
  { ticket: 'BACK-1980', summary: 'AWS SQS to Kafka Camel Adapter', assignee: 'Lane Terry', points: 5, daysInReview: 4 },
  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 10 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1603', summary: 'DTCC Sync - extend data from SFDC fields', assignee: 'Treven Trujillo', points: 5, resolved: '2026-02-18' },
  { ticket: 'UI-766', summary: 'Deep Recon - add horizontal scrollbar', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-757', summary: 'Deep Recon - Column reordering', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-755', summary: 'Deep Recon - Broadridge aggregated report', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' }
];

export const engineerAllocationData = {
  lastUpdated: "March 9, 2026, 12:22 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
