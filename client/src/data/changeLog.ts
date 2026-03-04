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

export const changeLogFeb22: ChangeLogEntry = {
  date: "February 22, 2026",
  timestamp: "7:30 PM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Owen Riley", change: "HIGHEST LOAD: 11 sprint tickets, 19 pts, 9 Done -- major velocity" },
    { engineer: "Konnor Willison", change: "Now assigned BACK-1862 Colony Bank (8pts IP)" },
    { engineer: "Aleksander Winski", change: "CAPACITY CONCERN: backlog debt +8, 2 WFA tickets" },
    { engineer: "Darius Ouderkirk", change: "CAPACITY CONCERN: only 1 sprint ticket, backlog debt +7" }
  ],

  ticketStatusChanges: [
    { ticketId: "UI-743", previousStatus: "Blocked", newStatus: "To Do", note: "No longer blocked -- Broadridge dependency resolved" },
    { ticketId: "BACK-1603", previousStatus: "In Progress", newStatus: "Done", note: "DTCC Sync DONE -- $1.85M deal unblocked" },
    { ticketId: "BACK-1965", previousStatus: "In Progress", newStatus: "Done", note: "Colony auto processing logic complete" },
    { ticketId: "BACK-1860", newStatus: "Canceled", note: "Mercury GPT5.2 model update canceled" }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 176, trackedTickets: 70 },
    current: { engineers: 14, totalStoryPoints: 197, trackedTickets: 82 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 103 accounts, $13.576M pipeline",
    "Orphan ticket reconciliation -- 2 orphans detected (GPT-5, UI-761), 1 status change (UI-743)",
    "Sprint S4 expanded: 70 -> 82 tickets, 176 -> 197 story points",
    "17 tickets completed (30 story points) vs 12 completed on Feb 18",
    "UI-743 no longer blocked, 1 sprint blocked item remaining (UI-740)",
    "Pipeline grew $1.476M (12.2%) from $12.1M to $13.576M",
    "Weighted pipeline UP 85% ($1.854M to $3.431M) -- DTCC now fully weighted at 80%"
  ]
};

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

export const changeLogFeb3: ChangeLogEntry = {
  date: "February 3, 2026",
  timestamp: "3:00 PM MT",
  source: "JIRA Sprint Extraction + Monday.com CRM + Confluence PRDs",

  engineerChanges: [],

  ticketStatusChanges: [],

  metricsComparison: {
    previous: { engineers: 12, totalStoryPoints: 137, trackedTickets: 70 },
    current: { engineers: 12, totalStoryPoints: 137, trackedTickets: 70 }
  },

  dataUpdates: [
    "Dashboard update for February 3, 2026 Board Meeting",
    "Added Q4 2026 roadmap column with 6 planned items",
    "Added descriptions to all 23 roadmap items",
    "Fixed PRD links to use correct Confluence URLs",
    "Added milestones M5 (Compliance Assurance) and M6 (Full Platform)",
    "Updated all data freshness timestamps to February 3, 2026"
  ]
};

export const changeLogJan20: ChangeLogEntry = {
  date: "January 20, 2026",
  timestamp: "1:00 PM MT",
  source: "JIRA Sprint 2026-S2 + Monday.com PoV & Client Tracker",

  engineerChanges: [
    {
      engineer: "Treven Trujillo",
      change: "BACK-1603 blocked 8 days - waiting for DTCC customer samples"
    },
    {
      engineer: "Unassigned",
      change: "BACK-1489 (40 days) and UI-719 (20 days) need immediate assignment"
    }
  ],

  ticketStatusChanges: [
    {
      ticketId: "BACK-1603",
      previousStatus: "In Progress",
      newStatus: "Blocked",
      note: "DTCC Sync - waiting for additional samples from customer"
    },
    {
      ticketId: "UI-719",
      previousStatus: "To Do",
      newStatus: "Blocked",
      note: "Accenture - needs assignment/clarification (20 days)"
    },
    {
      ticketId: "BACK-1489",
      note: "Still blocked - 40 days, needs assignment"
    }
  ],

  metricsComparison: {
    previous: { engineers: 12, totalStoryPoints: 131, trackedTickets: 131 },
    current: { engineers: 12, totalStoryPoints: 137, trackedTickets: 70 }
  },

  dataUpdates: [
    "Sprint 2026-S2 status update: 21% complete (29/137 pts), 7 days remaining",
    "Over-commitment identified: 137 pts vs 80 pt avg velocity (71% over)",
    "Burndown: 20-25 points behind ideal line",
    "Scope creep: +32 points added mid-sprint",
    "3 blocked items requiring immediate action",
    "Created clientTrackerData.ts for Monday.com PoV & Client Tracker",
    "Updated existing customer ARR to $990,200 (6 live clients)",
    "Client pipeline: 6 Live, 3 Implementation, 5 Active PoVs",
    "Epic progress: UI-694 30%, BACK-1232/1650/1656 at 0%"
  ]
};

export const changeLogFeb9: ChangeLogEntry = {
  date: "February 9, 2026",
  timestamp: "10:14 AM MT",
  source: "JIRA Sprint 2026-S3 Extraction + Monday.com CRM",

  engineerChanges: [
    {
      engineer: "Loris Friedel",
      change: "Removed from active roster (no sprint tickets)"
    },
    {
      engineer: "Karolina Toman",
      change: "Removed from active roster (no sprint tickets)"
    }
  ],

  ticketStatusChanges: [
    {
      ticketId: "BACK-1863",
      newStatus: "Blocked",
      note: "Colony Allegro - blocked 10 days, waiting for Colony Bank data samples"
    }
  ],

  metricsComparison: {
    previous: { engineers: 12, totalStoryPoints: 137, trackedTickets: 70 },
    current: { engineers: 13, totalStoryPoints: 209, trackedTickets: 109 }
  },

  dataUpdates: [
    "Sprint 2026-S3: 28.4% complete (31/109 tickets), 39.2% points (82/209), 4 days remaining",
    "ARTEMIS at 28% (up from 23%), still below 50-60% target — RED",
    "53 unassigned tickets — critical sprint health issue",
    "Blocked improved: 12 → 1 (BACK-1863 only)",
    "6 new Critical pentest findings (SC-326 through SC-331)",
    "Sales pipeline: $13.95M total (+24%), $1.84M weighted, 98 active deals",
    "DTCC $1.85M ELA closing Feb 13 — P0",
    "At-risk ARR: $4.84M across multiple deals",
    "Updated all data freshness timestamps to February 9, 2026"
  ]
};

export const changeLogFeb13: ChangeLogEntry = {
  date: "February 13, 2026",
  timestamp: "4:00 PM MT",
  source: "JIRA Sprint 2026-S4 Extraction + Monday.com CRM",

  engineerChanges: [
    {
      engineer: "Darius Ouderkirk",
      change: "No sprint tickets assigned (0 tickets, 0 pts)"
    },
    {
      engineer: "Loris D'Acunto",
      change: "No sprint tickets assigned — NSI anonymization work outside sprint"
    },
    {
      engineer: "Karolina Toman",
      change: "No sprint tickets assigned (0 tickets, 0 pts)"
    }
  ],

  ticketStatusChanges: [
    {
      ticketId: "UI-743",
      newStatus: "Blocked",
      note: "Broadridge Export — blocked, unassigned"
    },
    {
      ticketId: "UI-740",
      newStatus: "Blocked",
      note: "Blocked — assigned to Matthew Snow"
    },
    {
      ticketId: "BACK-1810",
      note: "Stale 14 days — Mercury HITL"
    }
  ],

  metricsComparison: {
    previous: { engineers: 13, totalStoryPoints: 209, trackedTickets: 109 },
    current: { engineers: 14, totalStoryPoints: 120, trackedTickets: 61 }
  },

  dataUpdates: [
    "Sprint 2026-S4 Day 1: 61 tickets, 120 pts, 0% complete",
    "40 of 61 tickets unassigned (65.6%) — RED health",
    "ARTEMIS at 40% (10 tickets, 48 pts) — still below 50-60% target",
    "S3 closed at 140% velocity (141 pts done vs 101 committed)",
    "Next sprint S5 readiness: 3% — 97% unassigned, 93% unestimated — RED",
    "Sales pipeline: $12.87M raw, $2.01M weighted, 47 active deals",
    "Won ARR: $990.2K from 6 live clients",
    "6 at-risk deals: Colony Bank, DTCC, BofA, BetaNxt, Wells Fargo, BBVA",
    "Colony Bank Allegro: P0 engineering need — doc classifier + Mercury HITL",
    "Mercury HITL: 6 tickets risk rollover (BACK-1810 stale 14 days)",
    "3 code reviews pending: BACK-1918, UI-755, BACK-1816",
    "Updated all data freshness timestamps to February 13, 2026"
  ]
};

export const changeLogFeb18: ChangeLogEntry = {
  date: "February 18, 2026",
  timestamp: "5:00 PM MT",
  source: "JIRA Sprint 2026-S4 Day 5 + Monday.com CRM",

  engineerChanges: [
    {
      engineer: "Treven Trujillo",
      change: "BACK-1603 DTCC ($1.85M ARR) marked DONE — major win"
    },
    {
      engineer: "Loris D'Acunto",
      change: "Still 0 sprint tickets — MISSING FROM SPRINT"
    },
    {
      engineer: "Karolina Toman",
      change: "Still 0 sprint tickets — MISSING FROM SPRINT"
    },
    {
      engineer: "Aleksander Winski",
      change: "+8 backlog debt — CAPACITY CONCERN"
    }
  ],

  ticketStatusChanges: [
    {
      ticketId: "BACK-1603",
      previousStatus: "In Progress",
      newStatus: "Done",
      note: "DTCC Sync ($1.85M ARR) — completed Feb 18"
    },
    {
      ticketId: "BACK-1489",
      newStatus: "Canceled",
      note: "Ubuntu upgrade CANCELED Jan 27 — removed from tracking"
    },
    {
      ticketId: "BACK-1299",
      note: "Stale 12 days In Progress — Ivan Peev"
    }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 120, trackedTickets: 61 },
    current: { engineers: 14, totalStoryPoints: 176, trackedTickets: 70 }
  },

  dataUpdates: [
    "Updated sprint data: 2026-S4 (Feb 13-27) — 70 tickets, 176 pts, 13.1% complete",
    "BACK-1603 DTCC ($1.85M ARR) marked DONE — major win",
    "BACK-1489 Ubuntu upgrade CANCELED — removed from tracking",
    "32 unassigned tickets (45.7%) — Mercury HITL sprint goal work unowned",
    "ARTEMIS work mix at 29% vs 60% target — severely under",
    "Colony Bank contract expired Jan 31 (-19 days) — no renewal deal tracked",
    "Pipeline: $12.1M total (+7.6%), $1.854M weighted (+11.7%)",
    "Q1 weighted pipeline down 21% ($1.18M to $929K) — deals slipping",
    "Next sprint 2026-S5 has 30 tickets pre-assigned",
    "Engineer capacity: Aleksander +8 backlog debt, Loris/Karolina 0 sprint tickets"
  ]
};

export const changeLogFeb25: ChangeLogEntry = {
  date: "February 25, 2026",
  timestamp: "8:28 AM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Owen Riley", change: "HIGHEST LOAD: 14 sprint tickets, 25 pts, 12 Done -- major velocity" },
    { engineer: "Ivan Peev", change: "11 tickets, 25 pts — 4 IP, 4 CR, 3 Done" },
    { engineer: "Kannal Mutharasu", change: "6 tickets, 20 pts — 1 IP, 5 Done" },
    { engineer: "Matthew Snow", change: "UI-740 blocked resolved, 2 IP, 3 Done" }
  ],

  ticketStatusChanges: [
    { ticketId: "BACK-1918", previousStatus: "Code Review", newStatus: "Done", note: "Colony GAP Coverage -- stale CR cleared" },
    { ticketId: "BACK-1792", previousStatus: "Code Review", newStatus: "Done", note: "JAVA Unit Test Markdowns -- stale CR cleared" },
    { ticketId: "BACK-1805", previousStatus: "Code Review", newStatus: "Done", note: "Stale CR cleared" },
    { ticketId: "UI-740", previousStatus: "Blocked", newStatus: "In Progress", note: "No longer blocked -- internal dependency resolved" }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 197, trackedTickets: 82 },
    current: { engineers: 14, totalStoryPoints: 226, trackedTickets: 99 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 107 accounts, $13.672M pipeline",
    "Orphan ticket reconciliation -- 2 orphans (GPT-5, UI-761), 6 status changes",
    "Sprint S4 expanded: 82 -> 99 tickets, 197 -> 226 story points (Day 12 of 14)",
    "38 tickets completed (81 story points) vs 17 completed on Feb 22",
    "Stale CR cleared: BACK-1918, BACK-1792, BACK-1805 all Done",
    "0 sprint blocked items (was 1), 4 stale IP remaining",
    "Pipeline: $13.672M total, $3.455M weighted, 107 active deals",
    "Colony Bank contract expired -25 days -- no renewal deal tracked",
    "ARTEMIS work mix at 10.1% vs 60% target -- worsened from 13.4%"
  ]
};

export const changeLogFeb27: ChangeLogEntry = {
  date: "February 27, 2026",
  timestamp: "9:38 AM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Owen Riley", change: "HIGHEST LOAD: 16 sprint tickets, 28 pts, 14 Done -- major velocity" },
    { engineer: "Ivan Peev", change: "11 tickets, 25 pts -- 2 IP, 4 CR, 5 Done" },
    { engineer: "Kannal Mutharasu", change: "8 tickets, 24 pts -- 1 IP, 1 CR, 6 Done" },
    { engineer: "Treven Trujillo", change: "9 tickets, 18 pts -- 6 Done, 5 security pentest fixes closed" },
    { engineer: "Lane Terry", change: "5 tickets all Done (15 pts) -- BACK-1911 artemis-platform Done" }
  ],

  ticketStatusChanges: [
    { ticketId: "BACK-1911", previousStatus: "In Progress", newStatus: "Done", note: "artemis-platform Project Setup complete" },
    { ticketId: "CI-935", previousStatus: "In Progress", newStatus: "Done", note: "CNPG Backup cleanup complete" },
    { ticketId: "CI-936", previousStatus: "In Progress", newStatus: "Done", note: "CNPG Cluster Definition complete" },
    { ticketId: "BACK-1975", previousStatus: "In Progress", newStatus: "Done", note: "Colony Description Extraction complete" },
    { ticketId: "SC-326", previousStatus: "In Progress", newStatus: "Done", note: "Pentest access control fix -- DeepRecon Actionable Data" },
    { ticketId: "SC-327", previousStatus: "In Progress", newStatus: "Done", note: "Pentest access control fix -- DeepRecon Data Source" }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 226, trackedTickets: 99 },
    current: { engineers: 14, totalStoryPoints: 252, trackedTickets: 103 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 113 accounts, $13.672M pipeline",
    "Orphan ticket reconciliation -- 2 orphans (GPT-5, UI-761), 5 status changes",
    "Sprint S4 LAST DAY (Day 14/14): 103 tickets, 252 pts, 56 Done (115 pts)",
    "Ticket completion: 58.3% (56/96 active), Points completion: 49.6% (115/232)",
    "ALL stale items cleared: 0 stale IP, 0 stale CR",
    "0 sprint blocked items, 11 long-blocked backlog items",
    "Pipeline: $13.672M total, $3.467M weighted, 113 active deals",
    "Colony Bank contract expired -27 days -- no renewal deal tracked",
    "ARTEMIS work mix at 9.7% vs 60% target -- remains severely under-allocated"
  ]
};

export const changeLogMar2: ChangeLogEntry = {
  date: "March 2, 2026",
  timestamp: "9:24 AM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Ivan Peev", change: "HIGHEST LOAD: 8 sprint tickets, 21 pts -- 2 IP, 3 CR (stale), 3 Done" },
    { engineer: "Owen Riley", change: "4 tickets, 8 pts -- 2 IP, 1 Done, 1 ToDo" },
    { engineer: "Loris D'Acunto", change: "Still 0 sprint tickets -- backlog debt +15" },
    { engineer: "Matthew Snow", change: "2 tickets, 3 pts -- backlog debt +5, CAPACITY CONCERN" },
    { engineer: "Aleksander Winski", change: "3 tickets, 8 pts -- 2 WFA, backlog debt +4" }
  ],

  ticketStatusChanges: [
    { ticketId: "BACK-1299", previousStatus: "In Progress", newStatus: "Code Review", note: "Single Model Input CLI -- stale CR, Ivan Peev" },
    { ticketId: "BACK-1300", previousStatus: "In Progress", newStatus: "Code Review", note: "Single Model Output Handler -- stale CR, Ivan Peev" },
    { ticketId: "BACK-1311", previousStatus: "In Progress", newStatus: "Code Review", note: "Workflow Template -- stale CR, Ivan Peev" },
    { ticketId: "2026-S4", newStatus: "Closed", note: "Sprint S4 closed Feb 27. Final: 103 tickets, 252 pts, 45.6% pts completion." },
    { ticketId: "2026-S5", newStatus: "Active", note: "Sprint S5 started Feb 27. Goal: Broadridge, Document Parser, Content Understanding, UI Dashboards, Infra." }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 252, trackedTickets: 103 },
    current: { engineers: 14, totalStoryPoints: 135, trackedTickets: 66 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 113 accounts, $13.672M pipeline",
    "Orphan ticket reconciliation -- 2 orphans (GPT-5, UI-761), 6 status changes",
    "NEW SPRINT S5 Day 3/14: 66 tickets, 135 pts, 6 Done (17 pts), 12.9% pts completion",
    "S4 CLOSED: 103 tickets, 252 pts, 56 Done (115 pts), 45.6% final pts completion",
    "30 of 66 tickets unassigned (45.5%) -- sprint planning session needed",
    "3 stale CR: BACK-1299, BACK-1300, BACK-1311 (all Ivan Peev, carryover from S4)",
    "ARTEMIS work mix at 9.1% vs 60% target -- carryover issue from S4",
    "Pipeline unchanged: $13.672M total, $3.467M weighted, 113 active deals",
    "Colony Bank contract expired -30 days -- no renewal deal tracked",
    "S5 Goal: Broadridge Account Creation, Document Parser, Content Understanding, UI Dashboards"
  ]
};

export const changeLogMar3: ChangeLogEntry = {
  date: "March 3, 2026",
  timestamp: "10:12 AM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Ivan Peev", change: "8 tickets, 21 pts -- 2 IP, 3 CR (stale), 3 Done. 6 stale items total." },
    { engineer: "Aleksander Winski", change: "5 tickets, 24 pts -- 2 IP, 1 CR, 2 WFA. Highest points load." },
    { engineer: "Kannal Mutharasu", change: "6 tickets, 9 pts -- 2 IP, 2 CR, 2 Done. Up from 3 tickets." },
    { engineer: "Owen Riley", change: "5 tickets, 10 pts -- 2 IP, 1 CR, 2 Done." },
    { engineer: "Loris D'Acunto", change: "Still 0 sprint tickets -- backlog debt +15" }
  ],

  ticketStatusChanges: [
    { ticketId: "BACK-1301", newStatus: "In Progress", note: "Single Model Workflow Orchestrator -- stale IP, Ivan Peev" },
    { ticketId: "BACK-1302", newStatus: "In Progress", note: "Single Model Result Aggregator -- stale IP, Ivan Peev" },
    { ticketId: "BACK-1303", newStatus: "In Progress", note: "Single Model Error Handler -- stale IP, Ivan Peev" }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 135, trackedTickets: 66 },
    current: { engineers: 14, totalStoryPoints: 154, trackedTickets: 67 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 113 accounts, $13.672M pipeline",
    "Orphan ticket reconciliation -- 2 orphans (GPT-5, UI-761), 6 status changes",
    "Sprint S5 Day 4/14: 67 tickets (+1), 154 pts (+19), 9 Done (23 pts)",
    "Completion: 13.6% tickets, 15.2% points (up from 9.2%/12.9%)",
    "6 stale items: 3 CR (BACK-1299/1300/1311) + 3 IP (BACK-1301/1302/1303) -- all Ivan Peev",
    "28 unassigned tickets (41.8%) -- improved from 45.5%",
    "ARTEMIS at 10.4% vs 60% -- slightly improved from 9.1%",
    "Pipeline unchanged: $13.672M total, $3.467M weighted, 113 deals",
    "Colony Bank contract expired -31 days. DTCC close date no longer flagged as expired."
  ]
};

export const changeLogMar4: ChangeLogEntry = {
  date: "March 4, 2026",
  timestamp: "12:09 PM MT",
  source: "JIRA API + Monday.com GraphQL API - Automated extraction",

  engineerChanges: [
    { engineer: "Ivan Peev", change: "8 tickets, 21 pts -- 4 IP, 4 Done. CLEARED 4 stale items (BACK-1297/1299/1300/1311 -> Done)." },
    { engineer: "Lane Terry", change: "4 tickets, 14 pts (was 1t/1pt) -- 2 IP, 1 CR, 1 Done. Major workload increase." },
    { engineer: "Aleksander Winski", change: "5 tickets, 19 pts (was 24pts) -- 1 IP, 1 CR, 2 WFA, 1 Done." },
    { engineer: "Owen Riley", change: "5 tickets, 10 pts -- 1 IP, 1 CR, 3 Done (+1 done)." },
    { engineer: "Brandon Baguley", change: "3 tickets, 5 pts -- 2 Done, 1 CR. Active contributor." }
  ],

  ticketStatusChanges: [
    { ticketId: "BACK-1297", previousStatus: "In Progress", newStatus: "Done", note: "Single Model Workflow -- 18d stale, now resolved" },
    { ticketId: "BACK-1299", previousStatus: "Code Review", newStatus: "Done", note: "Single Model Input CLI -- 25d stale, now resolved" },
    { ticketId: "BACK-1300", previousStatus: "Code Review", newStatus: "Done", note: "Single Model Output Handler -- was stale CR, now resolved" },
    { ticketId: "BACK-1311", previousStatus: "Code Review", newStatus: "Done", note: "Workflow Template for Single Model -- was stale CR, now resolved" },
    { ticketId: "BACK-1993", newStatus: "Code Review", note: "Documents Stuck in Mercury -- new stale CR (5d), unassigned" }
  ],

  metricsComparison: {
    previous: { engineers: 14, totalStoryPoints: 154, trackedTickets: 67 },
    current: { engineers: 14, totalStoryPoints: 186, trackedTickets: 70 }
  },

  dataUpdates: [
    "Full JIRA API extraction via automated Python scripts (tools/jira_extract.py)",
    "Full Monday.com GraphQL API extraction (tools/monday_extract.py) -- 113 accounts, $13.655M pipeline",
    "Orphan ticket reconciliation -- 2 orphans (GPT-5, UI-761), 2 status changes",
    "Sprint S5 Day 5/14: 70 tickets (+3), 186 pts (+32), 19 Done (42 pts) -- BIG progress day",
    "Completion: 27.1% tickets, 22.6% points (up from 13.6%/15.2%)",
    "Ivan Peev cleared 4 stale items to Done (BACK-1297/1299/1300/1311) -- major improvement",
    "Stale items reduced from 6 to 4: 3 IP (BACK-1301/1302/1303) + 1 CR (BACK-1993)",
    "23 unassigned tickets (32.9%) -- improved from 41.8%",
    "ARTEMIS at 11.4% vs 60% -- marginal improvement from 10.4%",
    "Pipeline: $13.655M total (-$17K), $3.467M weighted (unchanged), 113 deals",
    "Colony Bank contract expired -32 days. BetaNxt close date still expired."
  ]
};

export const changeLog: ChangeLogEntry[] = [
  changeLogMar4,
  changeLogMar3,
  changeLogMar2,
  changeLogFeb27,
  changeLogFeb25,
  changeLogFeb22,
  changeLogFeb18,
  changeLogFeb13,
  changeLogFeb9,
  changeLogFeb3,
  changeLogJan20,
  changeLogDec1,
  changeLogNov23
];
