export interface ChangeLogEntry {
  date: string;
  timestamp: string;
  source: string;
  engineerChanges: Array<{ engineer: string; change: string }>;
  ticketStatusChanges: Array<{ ticketId: string; previousStatus?: string; newStatus?: string; note?: string }>;
  metricsComparison: {
    previous: { engineers: number; totalStoryPoints: number; trackedTickets: number };
    current: { engineers: number; totalStoryPoints: number; trackedTickets: number };
  };
  dataUpdates: string[];
}

export const changeLogNov23: ChangeLogEntry = {
  date: "November 23, 2025",
  timestamp: "7:30 PM EST",
  source: "JIRA - Comprehensive extraction",
  
  engineerChanges: [
    { 
      engineer: "Kalvin Willison", 
      change: "Added - 3 Code Review tickets discovered" 
    },
    { 
      engineer: "Nadiya", 
      change: "Reassigned ML work tickets from team member on leave" 
    }
  ],
  
  ticketStatusChanges: [
    { 
      ticketId: "BACK-1117", 
      previousStatus: "In Progress", 
      newStatus: "Code Review", 
      note: "Darius - 36 days in Code Review" 
    },
    { 
      ticketId: "SC-302", 
      newStatus: "Done", 
      note: "Security sub-task completed" 
    },
    { 
      ticketId: "SC-308", 
      newStatus: "Done", 
      note: "Security sub-task completed" 
    },
    { 
      ticketId: "SC-309", 
      newStatus: "Done", 
      note: "Security sub-task completed" 
    }
  ],
  
  metricsComparison: {
    previous: { engineers: 6, totalStoryPoints: 5, trackedTickets: 24 },
    current: { engineers: 10, totalStoryPoints: 264, trackedTickets: 43 }
  },
  
  dataUpdates: [
    "Complete JIRA extraction across all statuses (In Progress, To Do, Code Review, Blocked, Waiting)",
    "Added 4 engineers previously missing from extraction",
    "SC-299 security progress tracked"
  ]
};

export const changeLogDec1: ChangeLogEntry = {
  date: "December 1, 2025",
  timestamp: "9:00 AM EST / 7:00 AM MT",
  source: "JIRA + Monday.com + Project Knowledge",
  
  engineerChanges: [
    { 
      engineer: "Konnor Willison", 
      change: "No longer has active JIRA tickets (was 2 tickets, 13 pts) - Chief Architect role" 
    }
  ],
  
  ticketStatusChanges: [
    { 
      ticketId: "SC-304", 
      previousStatus: "To Do", 
      newStatus: "In Progress", 
      note: "Jeff Hegerhorst now working on Kafka vulnerabilities" 
    },
    { 
      ticketId: "BACK-1224", 
      note: "Still In Progress - now 66 days (was 58 days Nov 23)" 
    },
    { 
      ticketId: "BACK-1196", 
      note: "Still in To Do - now 82 days (was 74 days Nov 23)" 
    },
    { 
      ticketId: "BACK-1117", 
      note: "Still in Code Review - now 44 days (was 36 days Nov 23)" 
    },
    { 
      ticketId: "BACK-1382", 
      note: "Still In Progress - now 35 days (was 27 days Nov 23)" 
    }
  ],
  
  metricsComparison: {
    previous: { engineers: 10, totalStoryPoints: 264, trackedTickets: 43 },
    current: { engineers: 9, totalStoryPoints: 184, trackedTickets: 135 }
  },
  
  dataUpdates: [
    "Added T-shirt size to weeks lookup table (S=2, M=4, L=8, XL=12)",
    "Updated Client_Count for 'All' features to 7",
    "Updated ARR default for 'All' features to $10,000,000",
    "Updated Sales Pipeline with Monday.com ARR values",
    "Added Altaira ($150K) and BetaNXT ($90K) to Sales Pipeline",
    "Updated SC-299 progress: SC-304 now In Progress"
  ]
};

export const changeLog: ChangeLogEntry[] = [
  changeLogDec1,
  changeLogNov23
];
