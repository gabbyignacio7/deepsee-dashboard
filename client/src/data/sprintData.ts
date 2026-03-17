// Sprint Data - Updated March 17, 2026 at 10:15 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S6 (Active - Day 5 of 15)
// CRITICAL: NEXT_SPRINT_READINESS export is required by executive.tsx - DO NOT REMOVE

export const EXTRACTION_TIMESTAMP = "2026-03-17T10:15:00-07:00";
export const DATA_SOURCE = "JIRA Sprint Extraction + Monday.com CRM";

export interface SprintStatus {
  toDo: number;
  blocked: number;
  inProgress: number;
  codeReview: number;
  done: number;
}

export interface SprintMix {
  artemis: number;
  client: number;
  infrastructure: number;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned' | 'future';
  totalTickets: number;
  totalPoints: number;
  completedTickets: number;
  completedPoints: number;
  completion: SprintStatus;
  completionRate: number;
  pointsCompletionRate?: number;
  health: 'green' | 'yellow' | 'red';
  daysRemaining: number;
  daysElapsed: number;
  likelyRollovers?: number;
  mix: SprintMix;
  assessment: 'artemis-focused' | 'balanced' | 'client-heavy';
}

export interface SprintItem {
  key: string;
  summary: string;
  category?: string;
  client?: string;
  staleDays?: number;
  blockedDays?: number;
  unassigned?: boolean;
  priority?: string;
  recommended?: boolean;
}

export interface NextSprintArtemisItem {
  key: string;
  summary: string;
  category: string;
}

export interface NextSprintClientItem {
  key: string;
  summary: string;
  client: string;
}

// S5 - COMPLETED (closed Mar 13, 2026)
export const PREVIOUS_SPRINT: Sprint = {
  id: '2026-S5',
  name: 'Sprint 2026-S5',
  startDate: '2026-02-27',
  endDate: '2026-03-13',
  status: 'completed',
  totalTickets: 92,
  totalPoints: 222,
  completedTickets: 55,
  completedPoints: 130,
  completion: {
    toDo: 0,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 130
  },
  completionRate: 59.8,
  pointsCompletionRate: 58.6,
  health: 'red',
  daysRemaining: 0,
  daysElapsed: 14,
  mix: { artemis: 9, client: 16, infrastructure: 3 },
  assessment: 'client-heavy'
};

// S6 - ACTIVE (current sprint - Day 5 of 15)
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S6',
  name: 'Sprint 2026-S6',
  startDate: '2026-03-12',
  endDate: '2026-03-27',
  status: 'active',
  totalTickets: 100,
  totalPoints: 84,
  completedTickets: 10,
  completedPoints: 21,
  completion: {
    toDo: 77,
    blocked: 0,
    inProgress: 9,
    codeReview: 3,
    done: 10
  },
  completionRate: 10.0,
  pointsCompletionRate: 25.0,
  health: 'yellow',
  daysRemaining: 10,
  daysElapsed: 5,
  likelyRollovers: 0,
  mix: { artemis: 4, client: 8, infrastructure: 3 },
  assessment: 'client-heavy'
};

// S7 - PLANNED (next sprint)
export const NEXT_SPRINT: Sprint = {
  id: '2026-S7',
  name: 'Sprint 2026-S7',
  startDate: '2026-03-27',
  endDate: 'TBD',
  status: 'planned',
  totalTickets: 0,
  totalPoints: 0,
  completedTickets: 0,
  completedPoints: 0,
  completion: {
    toDo: 0,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  health: 'green',
  daysRemaining: 14,
  daysElapsed: 0,
  mix: { artemis: 60, client: 25, infrastructure: 15 },
  assessment: 'artemis-focused'
};

export const FUTURE_SPRINT: Sprint = {
  id: 'Future',
  name: 'Sprint Future',
  startDate: '',
  endDate: '',
  status: 'future',
  totalTickets: 0,
  totalPoints: 0,
  completedTickets: 0,
  completedPoints: 0,
  completion: { toDo: 0, blocked: 0, inProgress: 0, codeReview: 0, done: 0 },
  completionRate: 0,
  health: 'green',
  daysRemaining: 28,
  daysElapsed: 0,
  mix: { artemis: 60, client: 25, infrastructure: 15 },
  assessment: 'artemis-focused'
};

export const SPRINTS: Sprint[] = [CURRENT_SPRINT, NEXT_SPRINT, FUTURE_SPRINT];
export const sprints = SPRINTS;
export const currentSprint = CURRENT_SPRINT;

// CRITICAL: This export is required by executive.tsx and NextSprintReadiness.tsx - DO NOT REMOVE
export const NEXT_SPRINT_READINESS = {
  totalTickets: 0,
  assigned: 0,
  unassigned: 0,
  withStoryPoints: 0,
  missingEstimates: 0,
  readinessStatus: 'NOT STARTED',
  projectBreakdown: [] as { project: string; count: number }[],
  assignedEngineers: [] as { name: string; tickets: number }[],
  blockers: [
    'S7 not yet planned -- 10 days until sprint start',
    'S6 Day 5: 10% complete vs 33.3% expected -- early sprint, typical ramp-up',
    'Focus on S6 execution: Colony/Sunwest/CTC extraction + SOC 2 audit sprint goals'
  ]
};

// Blocked Items in current sprint (S6)
export const BLOCKED_ITEMS: SprintItem[] = [
  // 0 sprint blocked items as of Mar 17 extraction
];

// Rollover candidates - items from S5 that resolved
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  // All S5 rollovers resolved: BACK-1921 Done, BACK-1532/1653 Canceled, BACK-1311/1300/1299 Done
];

// ARTEMIS Backlog Items -- Verified against JIRA Feb 22, 2026
export const ARTEMIS_BACKLOG: SprintItem[] = [
  // === VERIFIED ACTIVE (KEEP) ===
  { key: 'BACK-1620', summary: 'Implement Document Boundary Detection for Multi-Document Files', priority: 'Critical', recommended: true },

  // === UNDER REVIEW (stale >90 days, awaiting product decision) ===
  { key: 'PR-1559', summary: 'Document Classifier and Parser - Q1 2025', priority: 'Critical', recommended: false },
  { key: 'BACK-1400', summary: 'Email Replies not loading message details', priority: 'Blocker', recommended: false },
  { key: 'BACK-1399', summary: '30-50 minute delay between email received and created in DeepSee', priority: 'Blocker', recommended: false },
  { key: 'BACK-1281', summary: 'JPM - Unable to access DeepSee: No healthy upstream', priority: 'Blocker', recommended: false },
  { key: 'BACK-1096', summary: 'Duplicated inquiry ids in current_label_view', priority: 'Critical', recommended: false },
  { key: 'BACK-906', summary: 'Some Sent emails STILL getting Action Required added', priority: 'Critical', recommended: false },

  // === NEW ARTEMIS CANDIDATES (Jan-Feb 2026, all To Do, no sprint) ===
  { key: 'BACK-1687', summary: 'Vector Store optimization for embeddings', priority: 'Critical', recommended: true },
  { key: 'BACK-1686', summary: 'Information Graph enhanced infrastructure', priority: 'Critical', recommended: true },
  { key: 'BACK-1682', summary: 'Create agent message schema and contracts', priority: 'Critical', recommended: true },
  { key: 'BACK-1681', summary: 'Implement Kafka-based message bus for agent communication', priority: 'Critical', recommended: true },
  { key: 'BACK-1872', summary: 'Generic Reason Model - File Spec Ingestion and Interpretation Tool', priority: 'Major', recommended: true },
  { key: 'BACK-1853', summary: '[EPA] Kafka Queue for Action Response Storage and Correlation', priority: 'Major', recommended: true },
  { key: 'BACK-1848', summary: '[EPA] Email Category to Action Mapping Engine', priority: 'Major', recommended: true },
  { key: 'BACK-1845', summary: '[EPA] Email-Triggered Action Framework - Generic Follow-On Actions', priority: 'Major', recommended: true },
  { key: 'BACK-1688', summary: 'Document Store indexing improvements', priority: 'Major', recommended: true },
  { key: 'BACK-1685', summary: 'Add message tracing and correlation IDs', priority: 'Major', recommended: true },
  { key: 'BACK-1684', summary: 'Build message routing and orchestration layer', priority: 'Major', recommended: true },
  { key: 'BACK-1683', summary: 'Implement dead letter queue handling', priority: 'Major', recommended: true },
  { key: 'BACK-1680', summary: 'Platform Infrastructure - ARTEMIS Foundation', priority: 'Major', recommended: true },
  { key: 'UI-734', summary: '[BLUEPRINT] ARTEMIS UI for BluePrint viewing and configuration', priority: 'Major', recommended: true },
];

export const SPRINT_DATA_UPDATED = "2026-03-17T10:15:00-07:00";

export function getSprintByStatus(status: 'active' | 'planned' | 'future'): Sprint | undefined {
  return SPRINTS.find(s => s.status === status);
}

export function formatSprintDate(dateStr: string): string {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getSprintMixChartData() {
  return [
    {
      sprint: `${CURRENT_SPRINT.name} (Current)`,
      ARTEMIS: CURRENT_SPRINT.mix.artemis,
      Client: CURRENT_SPRINT.mix.client,
      Infrastructure: CURRENT_SPRINT.mix.infrastructure
    },
    {
      sprint: `${NEXT_SPRINT.name} (Next)`,
      ARTEMIS: NEXT_SPRINT.mix.artemis,
      Client: NEXT_SPRINT.mix.client,
      Infrastructure: NEXT_SPRINT.mix.infrastructure
    },
    {
      sprint: `${FUTURE_SPRINT.name} (Future)`,
      ARTEMIS: FUTURE_SPRINT.mix.artemis,
      Client: FUTURE_SPRINT.mix.client,
      Infrastructure: FUTURE_SPRINT.mix.infrastructure
    }
  ];
}

export function formatDataTimestamp(isoString: string = EXTRACTION_TIMESTAMP): string {
  return "March 17, 2026, 10:15 AM MT";
}

