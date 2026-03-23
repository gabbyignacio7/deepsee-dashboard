// Engineer Capacity Data - Updated March 23, 2026
// Source: JIRA Extract - Sprint 2026-S6 (Active - Day 11 of 15)

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
  // Updated Mar 23, 2026 - Sprint S6 Day 11 data (JIRA API extraction)
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 5, s4Tickets: 1, s4Points: 3, status: 'red', statusNote: 'Sprint=1(3pts), debt +4', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 3, s4Tickets: 16, s4Points: 8, status: 'green', statusNote: 'Sprint=16(8pts), debt -12 (SOC2 batch - 14 Done)', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 2, s4Tickets: 6, s4Points: 0, status: 'green', statusNote: 'Sprint=6(0pts), debt -4 (SOC2 batch - 6 Done)', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 1, s4Tickets: 8, s4Points: 25, status: 'green', statusNote: 'Sprint=8(25pts), debt -6', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 5, s4Tickets: 6, s4Points: 8, status: 'green', statusNote: 'Sprint=6(8pts), debt 0', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 6, s4Tickets: 7, s4Points: 9, status: 'green', statusNote: 'Sprint=7(9pts), debt -3', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 3, s4Tickets: 10, s4Points: 12, status: 'green', statusNote: 'Sprint=10(12pts), debt -8 (Artemis workflow studio)', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 7, s4Tickets: 5, s4Points: 14, status: 'yellow', statusNote: 'Sprint=5(14pts), debt +2', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 1, s4Tickets: 3, s4Points: 8, status: 'green', statusNote: 'Sprint=3(8pts), debt -1', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 6, s4Tickets: 3, s4Points: 9, status: 'yellow', statusNote: 'Sprint=3(9pts), debt +3', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 4, s4Tickets: 4, s4Points: 21, status: 'green', statusNote: 'Sprint=4(21pts), debt -1', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Sprint=0(0pts), debt 0 -- Chief Architect, advisory role', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'Sprint=0(0pts), debt +15 -- MISSING FROM SPRINT', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'Sprint=0(0pts), debt 0 -- MISSING FROM SPRINT', tickets: [] },
  { name: 'Brandon Baguley', role: 'Software Engineer', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 4, s4Points: 6, status: 'green', statusNote: 'Sprint=4(6pts), debt 0', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 15,
  totalS3Tickets: 122,
  totalS3Points: 179,
  s3Assigned: 43,
  s3Unassigned: 79,
  s3UnassignedPercent: 64.8,
  totalAssignedPoints: 143,
  unassignedPoints: 0,
  avgPointsPerEngineer: 9.5,
  engineersWithNoS3Work: ["Konnor Willison", "Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ["Konnor Willison", "Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: ['Ivan Peev (25 pts)', 'Treven Trujillo (21 pts)', 'Aleksander Winski (14 pts)', 'Kalvin Willison (12 pts)'] as string[],
  belowMinimum: ['Lane Terry (3 pts)', 'Chad Hegerhorst (0 pts)', 'Konnor Willison (0 pts)', "Loris D'Acunto (0 pts)", 'Karolina Toman (0 pts)'],
  heavyWorkloads: ['Jeff Hegerhorst (16 tickets, 8 pts)', 'Kalvin Willison (10 tickets, 12 pts)', 'Ivan Peev (8 tickets, 25 pts)', 'Kannal Mutharasu (7 tickets, 9 pts)', 'Chad Hegerhorst (6 tickets, 0 pts)', 'Darius Ouderkirk (6 tickets, 8 pts)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-2060', summary: 'Counterparty Statistics', assignee: 'Ivan Peev', points: 2, daysInReview: 2 },
  { ticket: 'BACK-1326', summary: 'Process Reconstruction', assignee: 'Ivan Peev', points: 5, daysInReview: 4 },
  { ticket: 'BACK-2043', summary: 'Merge artemis-platform', assignee: 'Treven Trujillo', points: 3, daysInReview: 2 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1603', summary: 'DTCC Sync - extend data from SFDC fields', assignee: 'Treven Trujillo', points: 5, resolved: '2026-02-18' },
  { ticket: 'UI-766', summary: 'Deep Recon - add horizontal scrollbar', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-757', summary: 'Deep Recon - Column reordering', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-755', summary: 'Deep Recon - Broadridge aggregated report', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' }
];

export const engineerAllocationData = {
  lastUpdated: "March 23, 2026",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
