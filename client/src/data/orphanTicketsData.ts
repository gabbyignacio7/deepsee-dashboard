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
  // Populated by reconciliation script output
  // Run: python3 tools/reconcile.py
];

export const orphanSummary = {
  lastReconciliation: "February 22, 2026",
  totalOrphans: 0,
  deleted: 0,
  completed: 0,
  statusChanged: 0,
  reassigned: 0,
};

// Helper functions
export function getOrphansByType(type: OrphanTicket['orphanType']): OrphanTicket[] {
  return orphanTicketsData.filter(t => t.orphanType === type);
}

export function getTotalItemsNeedingReview(): number {
  return orphanTicketsData.length;
}
