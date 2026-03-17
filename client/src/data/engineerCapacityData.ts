// Engineer Capacity Data - Updated March 17, 2026 at 10:15 AM MT
// Source: JIRA Extract - Sprint 2026-S6 (Active - Day 5 of 15)

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
  // Updated Mar 17, 2026 - Sprint S6 Day 5 data (JIRA API extraction)
  { name: 'Lane Terry', role: 'Lead Software Engineer', s2Tickets: 7, s2Points: 7, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 6, s3Points: 14, s3Done: 7, fullWorkload: 5, s4Tickets: 1, s4Points: 3, status: 'green', statusNote: '1 IP (BACK-2012 3pts), backlog debt +4', tickets: [] },
  { name: 'Jeff Hegerhorst', role: 'Principal DevOps Engineer', s2Tickets: 4, s2Points: 13, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 75, s3Tickets: 2, s3Points: 13, s3Done: 8, fullWorkload: 3, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: '0 sprint tickets, backlog debt +3. Needs S6 assignment.', tickets: [] },
  { name: 'Chad Hegerhorst', role: 'Lead Software Engineer in Test', s2Tickets: 5, s2Points: 18, s2Done: 4, s2InProgress: 0, s2Blocked: 0, completionPct: 80, s3Tickets: 2, s3Points: 10, s3Done: 10, fullWorkload: 2, s4Tickets: 0, s4Points: 0, status: 'yellow', statusNote: '0 sprint tickets, backlog debt +2. Needs S6 assignment.', tickets: [] },
  { name: 'Ivan Peev', role: 'Senior Software Engineer', s2Tickets: 12, s2Points: 15, s2Done: 9, s2InProgress: 3, s2Blocked: 0, completionPct: 75, s3Tickets: 6, s3Points: 16, s3Done: 12, fullWorkload: 1, s4Tickets: 5, s4Points: 18, status: 'green', statusNote: '4 Done, 1 CR (BACK-1326 5pts). S5 stale backlog CLEARED. Debt -4.', tickets: [] },
  { name: 'Darius Ouderkirk', role: 'Principal Software Engineer', s2Tickets: 6, s2Points: 18, s2Done: 3, s2InProgress: 3, s2Blocked: 0, completionPct: 50, s3Tickets: 5, s3Points: 13, s3Done: 5, fullWorkload: 5, s4Tickets: 2, s4Points: 0, status: 'green', statusNote: '1 IP (BACK-2018), 1 Done (BACK-2028 CTC). Debt +3.', tickets: [] },
  { name: 'Kannal Mutharasu', role: 'Software Engineer', s2Tickets: 10, s2Points: 32, s2Done: 8, s2InProgress: 2, s2Blocked: 0, completionPct: 80, s3Tickets: 4, s3Points: 16, s3Done: 8, fullWorkload: 6, s4Tickets: 4, s4Points: 5, status: 'yellow', statusNote: '2 IP (BACK-2051, BACK-1796 stale 17d!), 2 ToDo. Debt +2.', tickets: [] },
  { name: 'Kalvin Willison', role: 'Junior Software Engineer', s2Tickets: 8, s2Points: 26, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 7, s3Points: 20, s3Done: 17, fullWorkload: 3, s4Tickets: 5, s4Points: 5, status: 'green', statusNote: '3 Done, 1 IP (BACK-2054), 1 WFA. Strong velocity. Debt -2.', tickets: [] },
  { name: 'Aleksander Winski', role: 'Senior Software Engineer', s2Tickets: 6, s2Points: 16, s2Done: 3, s2InProgress: 1, s2Blocked: 0, completionPct: 50, s3Tickets: 4, s3Points: 14, s3Done: 6, fullWorkload: 7, s4Tickets: 3, s4Points: 8, status: 'yellow', statusNote: '1 IP (BACK-2030 retrain), 2 WFA (BACK-1658/1657). Debt +4.', tickets: [] },
  { name: 'Owen Riley', role: 'Staff Frontend Engineer', s2Tickets: 7, s2Points: 17, s2Done: 7, s2InProgress: 0, s2Blocked: 0, completionPct: 100, s3Tickets: 9, s3Points: 16, s3Done: 12, fullWorkload: 1, s4Tickets: 1, s4Points: 3, status: 'green', statusNote: '1 IP (UI-800 reqs spec). Debt 0.', tickets: [] },
  { name: 'Matthew Snow', role: 'Senior Frontend Engineer', s2Tickets: 3, s2Points: 9, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 2, s3Points: 6, s3Done: 0, fullWorkload: 6, s4Tickets: 2, s4Points: 6, status: 'green', statusNote: '1 IP (UI-797 overview recon), 1 Done (UI-798). Debt +4.', tickets: [] },
  { name: 'Treven Trujillo', role: 'Software Engineer', s2Tickets: 3, s2Points: 16, s2Done: 2, s2InProgress: 1, s2Blocked: 0, completionPct: 67, s3Tickets: 3, s3Points: 7, s3Done: 1, fullWorkload: 4, s4Tickets: 3, s4Points: 13, status: 'yellow', statusNote: '2 CR (BACK-1840/1839 storage adapters), 1 ToDo. Debt +1.', tickets: [] },
  { name: 'Konnor Willison', role: 'Chief Architect', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 1, s3Points: 8, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'green', statusNote: 'Chief Architect -- no sprint tickets, advisory role', tickets: [] },
  { name: "Loris D'Acunto", role: 'Chief Data Scientist', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 15, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets, backlog debt +15', tickets: [] },
  { name: 'Karolina Toman', role: 'Director FDE', s2Tickets: 0, s2Points: 0, s2Done: 0, s2InProgress: 0, s2Blocked: 0, completionPct: 0, s3Tickets: 0, s3Points: 0, s3Done: 0, fullWorkload: 0, s4Tickets: 0, s4Points: 0, status: 'red', statusNote: 'MISSING FROM SPRINT: 0 tickets', tickets: [] }
];

export const capacitySummary = {
  totalEngineers: 14,
  totalS3Tickets: 100,
  totalS3Points: 84,
  s3Assigned: 28,
  s3Unassigned: 72,
  s3UnassignedPercent: 72.0,
  totalAssignedPoints: 64,
  unassignedPoints: 20,
  avgPointsPerEngineer: 6.0,
  engineersWithNoS3Work: ["Jeff Hegerhorst", "Chad Hegerhorst", "Konnor Willison", "Loris D'Acunto", 'Karolina Toman'] as string[],
  rosterNotInSprint: ["Jeff Hegerhorst", "Chad Hegerhorst", "Konnor Willison", "Loris D'Acunto", 'Karolina Toman'],
  aboveThreshold: ['Ivan Peev (18 pts)', 'Treven Trujillo (13 pts)', 'Aleksander Winski (8 pts)'] as string[],
  belowMinimum: ['Darius Ouderkirk (0 pts)', 'Owen Riley (3 pts)', 'Lane Terry (3 pts)'],
  heavyWorkloads: ['Ivan Peev (5 tickets, 18 pts)', 'Kalvin Willison (5 tickets, 5 pts)', 'Kannal Mutharasu (4 tickets, 5 pts)', 'Treven Trujillo (3 tickets, 13 pts)']
};

export const codeReviewQueue = [
  { ticket: 'BACK-1326', summary: 'Process Reconstruction Workflow', assignee: 'Ivan Peev', points: 5, daysInReview: 2 },
  { ticket: 'BACK-1840', summary: 'Blob Storage Adapter', assignee: 'Treven Trujillo', points: 5, daysInReview: 2 },
  { ticket: 'BACK-1839', summary: 'S3 Adapter', assignee: 'Treven Trujillo', points: 5, daysInReview: 2 }
];

export const recentlyCompleted = [
  { ticket: 'BACK-1603', summary: 'DTCC Sync - extend data from SFDC fields', assignee: 'Treven Trujillo', points: 5, resolved: '2026-02-18' },
  { ticket: 'UI-766', summary: 'Deep Recon - add horizontal scrollbar', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-757', summary: 'Deep Recon - Column reordering', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' },
  { ticket: 'UI-755', summary: 'Deep Recon - Broadridge aggregated report', assignee: 'Owen Riley', points: 1, resolved: '2026-02-18' }
];

export const engineerAllocationData = {
  lastUpdated: "March 17, 2026, 10:15 AM MT",
  engineers: engineers
};

export function getEngineersByCompletion(): EngineerCapacity[] {
  return [...engineers].sort((a, b) => b.completionPct - a.completionPct);
}

export function getEngineersWithNoS3Work(): EngineerCapacity[] {
  return engineers.filter(e => e.s4Tickets === 0);
}
