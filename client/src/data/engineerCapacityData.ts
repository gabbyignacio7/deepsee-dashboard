// Engineer Capacity Data - Updated February 22, 2026 at 7:30 PM MT
// Source: JIRA Extract - Sprint 2026-S4 (Active - Day 9 of 14)

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
  // Updated Feb 22, 2026 - Sprint S4 Day 9 data (JIRA API extraction)
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 9, s4Tickets: 4, s4Points: 14, status: 'yellow', statusNote: '2 IP, 1 CR, 1 Done, backlog debt +5', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 6, s4Tickets: 3, s4Points: 6, status: 'yellow', statusNote: '3 IP infra, backlog debt +3', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 4, s4Tickets: 3, s4Points: 5, status: 'green', statusNote: '2 IP, 1 Done, backlog debt +1', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 3, s4Tickets: 5, s4Points: 12, status: 'yellow', statusNote: '2 IP (BACK-1299 stale 16d), 1 CR, 2 Done', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 8, s4Tickets: 1, s4Points: 5, status: 'red', statusNote: '1 IP, backlog debt +7 -- CAPACITY CONCERN', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 7, s4Tickets: 5, s4Points: 17, status: 'yellow', statusNote: '1 IP, 3 CR (1 stale 9d), 1 Done, backlog debt +2', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 4, s4Tickets: 3, s4Points: 8, status: 'green', statusNote: '2 IP, 1 CR, backlog debt +1', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 12, s4Tickets: 4, s4Points: 13, status: 'red', statusNote: '2 IP, 2 WFA, backlog debt +8 -- CAPACITY CONCERN', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 5, s4Tickets: 11, s4Points: 19, status: 'yellow', statusNote: 'HIGHEST LOAD: 11 tickets/19pts, 1 IP, 1 CR, 9 Done -- major velocity', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 9, s4Tickets: 4, s4Points: 7, status: 'red', statusNote: '1 IP, 1 Blocked (9d), 2 Done, backlog debt +5', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 8, s4Tickets: 8, s4Points: 13, status: 'yellow', statusNote: '1 IP, 5 SC To Do, 1 Done, 1 Canceled', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Chief Architect -- BACK-1862 Colony Bank 8pts IP in full workload', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +15', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 1, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +1', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 82,
  totalS3Points: 197,
  s3Assigned: 55,
  s3Unassigned: 27,
  s3UnassignedPercent: 32.9,
  totalAssignedPoints: 143,
  unassignedPoints: 54,
  avgPointsPerEngineer: 10.2,
  engineersWithNoS3Work: ["Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ["Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: ['Owen Riley (19 pts)', 'Kannal Mutharasu (17 pts)'] as string[],
  belowMinimum: ['Darius Ouderkirk (5)', 'Chad Hegerhorst (5)'],
  heavyWorkloads: ['Owen Riley (11 tickets, 19 pts)', 'Kannal Mutharasu (5 tickets, 17 pts)', 'Lane Terry (4 tickets, 14 pts)', 'Treven Trujillo (8 tickets, 13 pts)', 'Aleksander Winski (4 tickets, 13 pts)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-1918', summary: '[Colony] GAP Coverage Provider to Allegro', assignee: 'Kannal Mutharasu', points: 5, daysInReview: 9 },
  { ticket: 'BACK-1805', summary: 'DeepPilot Client & Message Update Integration', assignee: 'Ivan Peev', points: 3, daysInReview: 9 },
  { ticket: 'BACK-1792', summary: 'JAVA - Generate/Review Unit Test Markdowns', assignee: 'Brandon Baguley', points: 1, daysInReview: 9 },
  { ticket: 'BACK-1970', summary: '[Colony] Enable conditional reconciliation', assignee: 'Kannal Mutharasu', points: 3, daysInReview: 2 },
  { ticket: 'BACK-1913', summary: 'Use Single Entity Manager for All Queries', assignee: 'Kannal Mutharasu', points: 3, daysInReview: 2 },
  { ticket: 'BACK-1968', summary: "Don't Check Source for Recon Extractions", assignee: 'Lane Terry', points: 2, daysInReview: 2 },
  { ticket: 'BACK-1966', summary: 'API: List users with access to tenant globally', assignee: 'Kalvin Willison', points: 5, daysInReview: 2 },
  { ticket: 'UI-778', summary: 'Fix CSV rendering', assignee: 'Owen Riley', points: 1, daysInReview: 2 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1603', summary: 'DTCC Sync - extend data from SFDC fields', assignee: 'Treven Trujillo', points: 5, resolved: '2026-02-18' },
  { ticket: 'UI-766', summary: 'Deep Recon - add horizontal scrollbar', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-757', summary: 'Deep Recon - Column reordering', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-755', summary: 'Deep Recon - Broadridge aggregated report', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' }
];

export const engineerAllocationData = {
  lastUpdated: "February 22, 2026, 7:30 PM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
