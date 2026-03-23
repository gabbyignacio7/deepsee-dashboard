export interface OrphanTicket {
  key: string;
  summary: string;
  lastKnownStatus: string;
  lastKnownAssignee: string;
  orphanType: 'deleted' | 'completed' | 'status_changed' | 'reassigned';
  flaggedDate: string;
  recommendation: string;
}

export const orphanTicketsData: OrphanTicket[] = [
  // Populated by reconciliation script - March 23, 2026
  {
    key: "GPT-5",
    summary: "Referenced in dashboard but does not exist in JIRA",
    lastKnownStatus: "Unknown",
    lastKnownAssignee: "Unknown",
    orphanType: "deleted",
    flaggedDate: "2026-03-09",
    recommendation: "Remove from dashboard"
  },
  {
    key: "UI-761",
    summary: "Referenced in dashboard but not found in JIRA",
    lastKnownStatus: "Unknown",
    lastKnownAssignee: "Unknown",
    orphanType: "deleted",
    flaggedDate: "2026-03-09",
    recommendation: "Remove from dashboard"
  },
  {
    key: "UI-743",
    summary: "Deep Recon - Make aggregated report exportable (Broadridge)",
    lastKnownStatus: "Blocked",
    lastKnownAssignee: "Unassigned",
    orphanType: "status_changed",
    flaggedDate: "2026-03-09",
    recommendation: "Update status: Blocked -> To Do"
  }
];

export const orphanSummary = {
  lastReconciliation: "March 23, 2026",
  totalOrphans: 3,
  deleted: 2,
  completed: 0,
  statusChanged: 1,
  reassigned: 0,
};

// Helper functions
export function getOrphansByType(type: OrphanTicket['orphanType']): OrphanTicket[] {
  return orphanTicketsData.filter(t => t.orphanType === type);
}

export function getTotalItemsNeedingReview(): number {
  return orphanTicketsData.length;
}
