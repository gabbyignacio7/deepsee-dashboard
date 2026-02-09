// Broadridge Status Data - Updated February 9, 2026 at 10:14 AM MT
// Source: JIRA Sprint Extraction

export const broadridgeStatusData = {
  securityRemediation: {
    totalTickets: 17,
    doneTickets: 14,
    remainingToDo: 2,
    status: "Mostly complete — 14 of 17 resolved",
    remainingItems: [
      { id: "SC-300", summary: "Duplicate NATS vulnerability", status: "To Do" },
      { id: "SC-301", summary: "Duplicate PostgreSQL vulnerability", status: "To Do" }
    ]
  },
  newPentestFindings: {
    count: 6,
    severity: "5 Critical, 1 High",
    items: [
      { id: "SC-326", status: "To Do", assignee: "Unassigned", priority: "Critical" },
      { id: "SC-327", status: "To Do", assignee: "Unassigned", priority: "Critical" },
      { id: "SC-328", status: "To Do", assignee: "Unassigned", priority: "Critical" },
      { id: "SC-329", status: "To Do", assignee: "Unassigned", priority: "Critical" },
      { id: "SC-330", status: "To Do", assignee: "Unassigned", priority: "Critical" },
      { id: "SC-331", status: "To Do", assignee: "Unassigned", priority: "High" }
    ],
    alert: "P0 — 6 new pentest findings (access control issues), all unassigned"
  },
  accountOpeningPRD: {
    status: "PRD drafted (Feb 9)",
    estimatePoints: 88,
    adjustedPoints: 111,
    phase1Start: "S5 earliest (March 2026)",
    note: "Pending Ryan approval and Broadridge sample data from Sean"
  }
};
