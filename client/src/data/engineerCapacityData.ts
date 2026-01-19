// Engineer Capacity Data - Updated January 18, 2026
// Source: JIRA Extract

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
  tickets: TicketAssignment[];
}

export const engineers: EngineerCapacity[] = [
  {
    name: "Aleksander Winski",
    role: "Backend",
    s2Tickets: 1,
    s2Points: 0,
    s2Done: 0,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "BACK-1723", summary: "Performance Improvements for Accenture", status: "IN PROGRESS", points: 0 }
    ]
  },
  {
    name: "Brandon Baguley",
    role: "Head of Engineering",
    s2Tickets: 2,
    s2Points: 0,
    s2Done: 1,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 50,
    tickets: [
      { key: "BACK-1792", summary: "JAVA - Generate and Review Unit/Integration Tests", status: "IN PROGRESS", points: 0 },
      { key: "CI-912", summary: "Mercury terraform modules", status: "DONE", points: 8 }
    ]
  },
  {
    name: "Chad Hegerhorst",
    role: "DevOps",
    s2Tickets: 1,
    s2Points: 8,
    s2Done: 1,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 100,
    tickets: [
      { key: "CI-912", summary: "Mercury - Configure initial terraform modules", status: "DONE", points: 8 }
    ]
  },
  {
    name: "Darius Ouderkirk",
    role: "Backend",
    s2Tickets: 6,
    s2Points: 15,
    s2Done: 1,
    s2InProgress: 3,
    s2Blocked: 0,
    completionPct: 17,
    tickets: [
      { key: "BACK-1602", summary: "Backend task", status: "DONE", points: 5 },
      { key: "BACK-1288", summary: "Backend task", status: "TO DO", points: 2 },
      { key: "BACK-1722", summary: "Backend task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1678", summary: "Backend task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1548", summary: "Backend task", status: "IN PROGRESS", points: 5 },
      { key: "BACK-911", summary: "Backend task", status: "TO DO", points: 3 }
    ]
  },
  {
    name: "Ivan Peev",
    role: "Backend",
    s2Tickets: 9,
    s2Points: 6,
    s2Done: 2,
    s2InProgress: 5,
    s2Blocked: 0,
    completionPct: 22,
    tickets: [
      { key: "BACK-1794", summary: "Backend task", status: "CODE REVIEW", points: 0 },
      { key: "BACK-1776", summary: "Broadridge task", status: "CODE REVIEW", points: 0 },
      { key: "BACK-1583", summary: "Backend task", status: "DONE", points: 3 },
      { key: "BACK-1708", summary: "Backend task", status: "DONE", points: 3 },
      { key: "BACK-1327", summary: "Backend task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1305", summary: "Backend task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1306", summary: "Backend task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1789", summary: "Broadridge task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1793", summary: "Backend task", status: "IN PROGRESS", points: 0 }
    ]
  },
  {
    name: "Jeff Hegerhorst",
    role: "DevOps",
    s2Tickets: 1,
    s2Points: 3,
    s2Done: 0,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "CI-927", summary: "Upgrade argo workflows to v3.7.7", status: "IN PROGRESS", points: 3 }
    ]
  },
  {
    name: "Kalvin Willison",
    role: "Backend",
    s2Tickets: 1,
    s2Points: 4,
    s2Done: 0,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "BACK-1720", summary: "Backend task", status: "IN PROGRESS", points: 4 }
    ]
  },
  {
    name: "Kannal Mutharasu",
    role: "Backend",
    s2Tickets: 1,
    s2Points: 5,
    s2Done: 0,
    s2InProgress: 0,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "BACK-1790", summary: "Backend task", status: "CODE REVIEW", points: 5 }
    ]
  },
  {
    name: "Konnor Willison",
    role: "Architecture / ARTEMIS",
    s2Tickets: 7,
    s2Points: 9,
    s2Done: 0,
    s2InProgress: 2,
    s2Blocked: 1,
    completionPct: 0,
    tickets: [
      { key: "BACK-1651", summary: "Mercury CTC task", status: "TO DO", points: 8 },
      { key: "BACK-1655", summary: "Mercury task", status: "TO DO", points: 0 },
      { key: "BACK-1530", summary: "BBVA task", status: "TO DO", points: 0 },
      { key: "BACK-1529", summary: "CTC task", status: "TO DO", points: 0 },
      { key: "BACK-1528", summary: "CTC task", status: "TO DO", points: 0 },
      { key: "BACK-1532", summary: "Sunwest task", status: "IN PROGRESS", points: 0 },
      { key: "BACK-1489", summary: "Update classification-api Base Image to Ubuntu", status: "BLOCKED", points: 1, daysInStatus: 70 }
    ]
  },
  {
    name: "Lane Terry",
    role: "Security / Infrastructure",
    s2Tickets: 2,
    s2Points: 2,
    s2Done: 0,
    s2InProgress: 2,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "BACK-1644", summary: "Security task", status: "IN PROGRESS", points: 2 },
      { key: "BACK-1793", summary: "Backend task", status: "IN PROGRESS", points: 0 }
    ]
  },
  {
    name: "Matthew Snow",
    role: "Frontend",
    s2Tickets: 1,
    s2Points: 0,
    s2Done: 0,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 0,
    tickets: [
      { key: "UI-715", summary: "UI task", status: "IN PROGRESS", points: 0 }
    ]
  },
  {
    name: "Owen Riley",
    role: "Frontend",
    s2Tickets: 2,
    s2Points: 6,
    s2Done: 1,
    s2InProgress: 1,
    s2Blocked: 0,
    completionPct: 50,
    tickets: [
      { key: "UI-714", summary: "UI task", status: "DONE", points: 3 },
      { key: "UI-697", summary: "UI task", status: "IN PROGRESS", points: 3 }
    ]
  },
  {
    name: "Treven Trujillo",
    role: "Backend",
    s2Tickets: 2,
    s2Points: 11,
    s2Done: 0,
    s2InProgress: 1,
    s2Blocked: 1,
    completionPct: 0,
    tickets: [
      { key: "BACK-1603", summary: "Deep Recon - DTCC Sync to DeepSee", status: "BLOCKED", points: 3, daysInStatus: 35 },
      { key: "BACK-1781", summary: "FEEL Refactor", status: "IN PROGRESS", points: 8 }
    ]
  }
];

export const capacitySummary = {
  totalEngineers: 13,
  totalS2Tickets: 36, // assigned tickets
  unassignedTickets: 38, // 74 - 36
  totalS2Points: 69,
  completedPoints: 22,
  teamVelocity: 22, // based on current done
  avgCompletionPct: 19
};

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
