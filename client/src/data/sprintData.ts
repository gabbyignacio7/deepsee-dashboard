// Sprint Data - Updated March 5, 2026 at 10:49 AM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S5 (Active - Day 6 of 14)
// CRITICAL: NEXT_SPRINT_READINESS export is required by executive.tsx - DO NOT REMOVE

export const EXTRACTION_TIMESTAMP = "2026-03-05T10:49:00-07:00";
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

// S4 - COMPLETED (closed Feb 27, 2026)
export const PREVIOUS_SPRINT: Sprint = {
  id: '2026-S4',
  name: 'Sprint 2026-S4',
  startDate: '2026-02-13',
  endDate: '2026-02-27',
  status: 'completed',
  totalTickets: 103,
  totalPoints: 252,
  completedTickets: 56,
  completedPoints: 115,
  completion: {
    toDo: 0,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 115
  },
  completionRate: 58.3,
  pointsCompletionRate: 45.6,
  health: 'red',
  daysRemaining: 0,
  daysElapsed: 14,
  mix: { artemis: 10, client: 21, infrastructure: 5 },
  assessment: 'client-heavy'
};

// S5 - ACTIVE (current sprint - Day 6 of 14)
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S5',
  name: 'Sprint 2026-S5',
  startDate: '2026-02-27',
  endDate: '2026-03-13',
  status: 'active',
  totalTickets: 72,
  totalPoints: 190,
  completedTickets: 26,
  completedPoints: 66,
  completion: {
    toDo: 19,
    blocked: 0,
    inProgress: 12,
    codeReview: 7,
    done: 26
  },
  completionRate: 36.1,
  pointsCompletionRate: 34.7,
  health: 'red',
  daysRemaining: 8,
  daysElapsed: 6,
  likelyRollovers: 0,
  mix: { artemis: 8, client: 9, infrastructure: 1 },
  assessment: 'client-heavy'
};

// S6 - PLANNED (next sprint)
export const NEXT_SPRINT: Sprint = {
  id: '2026-S6',
  name: 'Sprint 2026-S6',
  startDate: '2026-03-13',
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
  health: 'red',
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
    'S6 not yet planned',
    'S5 just started -- focus on current sprint first',
    'Sprint planning session needed before Mar 13'
  ]
};

// Blocked Items in current sprint (S5)
export const BLOCKED_ITEMS: SprintItem[] = [
  // 0 sprint blocked items as of Mar 2 extraction
];

// Rollover candidates - High risk items from S4
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1921', summary: 'Mercury HITL - Upload CSV & Create Training Set', category: 'Mercury HITL', staleDays: 0, unassigned: true },
  { key: 'BACK-1532', summary: 'Fine-tune Mercury Extraction for Sunwest Bank', category: 'Sunwest', staleDays: 0, unassigned: true },
  { key: 'BACK-1653', summary: 'Sunwest Bank - Extraction model fine-tuning', category: 'Sunwest', staleDays: 0, unassigned: true },
  { key: 'BACK-1311', summary: 'Workflow Template for Single Model', category: 'Platform', staleDays: 0, unassigned: true },
  { key: 'BACK-1300', summary: 'Single Model Output Handler CLI', category: 'Platform', staleDays: 0, unassigned: true },
  { key: 'BACK-1299', summary: 'Single Model Input CLI', category: 'Platform', staleDays: 16, unassigned: false }
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

export const SPRINT_DATA_UPDATED = "2026-03-05T10:49:00-07:00";

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
  return "March 5, 2026, 10:49 AM MT";
}
