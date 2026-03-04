// Engineer Capacity Data - Updated March 4, 2026 at 12:09 PM MT
// Source: JIRA Extract - Sprint 2026-S4 (Active - Day 5 of 14)

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
  // Updated Mar 2, 2026 - Sprint S5 Day 5 data (JIRA API extraction)
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 9, s4Tickets: 4, s4Points: 14, status: 'yellow', statusNote: '2 IP, 1 CR, 1 Done, backlog debt +3', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 6, s4Tickets: 2, s4Points: 10, status: 'yellow', statusNote: '2 IP, backlog debt +2', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 4, s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 CR, backlog debt +2', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 3, s4Tickets: 8, s4Points: 21, status: 'green', statusNote: '4 IP, 4 Done (cleared 4 stale), backlog debt -4', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 8, s4Tickets: 2, s4Points: 5, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +3', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 7, s4Tickets: 6, s4Points: 12, status: 'yellow', statusNote: '1 IP, 2 ToDo, 1 CR, 2 Done, backlog debt +1', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 4, s4Tickets: 4, s4Points: 8, status: 'green', statusNote: '1 IP, 1 Done, 1 WFA, backlog debt -1', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 12, s4Tickets: 5, s4Points: 19, status: 'yellow', statusNote: '1 IP, 1 CR, 2 WFA, 1 Done, backlog debt +3', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 5, s4Tickets: 5, s4Points: 10, status: 'green', statusNote: '1 IP, 1 CR, 3 Done, backlog debt -3', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 9, s4Tickets: 2, s4Points: 3, status: 'yellow', statusNote: '1 IP, 1 Done, backlog debt +4', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 8, s4Tickets: 1, s4Points: 5, status: 'yellow', statusNote: '1 CR, backlog debt +1', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Chief Architect -- BACK-1862 Colony Bank 8pts IP in full workload', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +15', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +1', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 70,
  totalS3Points: 186,
  s3Assigned: 47,
  s3Unassigned: 23,
  s3UnassignedPercent: 32.9,
  totalAssignedPoints: 117,
  unassignedPoints: 69,
  avgPointsPerEngineer: 12.4,
  engineersWithNoS3Work: ["Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ["Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: ['Ivan Peev (21 pts)', 'Aleksander Winski (19 pts)'] as string[],
  belowMinimum: ['Matthew Snow (3)', 'Chad Hegerhorst (5)', 'Darius Ouderkirk (5)'],
  heavyWorkloads: ['Ivan Peev (8 tickets, 21 pts)', 'Aleksander Winski (5 tickets, 19 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Kannal Mutharasu (6 tickets, 12 pts)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-2011', summary: 'Automations Improvements', assignee: 'Lane Terry', points: 5, daysInReview: 1 },
  { ticket: 'BACK-1930', summary: '[BE] preprocessor bugfixes accenture', assignee: 'Aleksander Winski', points: 5, daysInReview: 3 },
  { ticket: 'BACK-2005', summary: '[Colony] Allegro Integration Feedback Feb 26', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 2 },
  { ticket: 'BACK-1981', summary: 'Account Creation XLSX Parser', assignee: 'Treven Trujillo', points: 5, daysInReview: 1 },
  { ticket: 'BACK-2008', summary: '[Sunwest] Troubleshoot token errors', assignee: 'Brandon Baguley', points: 1, daysInReview: 1 },
  { ticket: 'UI-788', summary: 'Make AD filters persist through session', assignee: 'Owen Riley', points: 2, daysInReview: 1 },
  { ticket: 'BACK-1993', summary: 'Documents Stuck in Mercury Bottleneck', assignee: 'Unassigned', points: 0, daysInReview: 5 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1603', summary: 'DTCC Sync - extend data from SFDC fields', assignee: 'Treven Trujillo', points: 5, resolved: '2026-02-18' },
  { ticket: 'UI-766', summary: 'Deep Recon - add horizontal scrollbar', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-757', summary: 'Deep Recon - Column reordering', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-755', summary: 'Deep Recon - Broadridge aggregated report', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' }
];

export const engineerAllocationData = {
  lastUpdated: "March 4, 2026, 12:09 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
