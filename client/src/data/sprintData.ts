// Sprint Data - Updated February 13, 2026 at 4:00 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S4 (Active - Day 1 of 14)
// CRITICAL: NEXT_SPRINT_READINESS export is required by executive.tsx - DO NOT REMOVE

export const EXTRACTION_TIMESTAMP = "2026-02-13T16:00:00-07:00";
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

// S3 - COMPLETED (ended Feb 13, 2026)
export const PREVIOUS_SPRINT: Sprint = {
  id: '2026-S3',
  name: 'Sprint 2026-S3',
  startDate: '2026-01-30',
  endDate: '2026-02-13',
  status: 'completed',
  totalTickets: 101,
  totalPoints: 209,
  completedTickets: 141,
  completedPoints: 141,
  completion: {
    toDo: 0,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 141
  },
  completionRate: 140,
  pointsCompletionRate: 140,
  health: 'green',
  daysRemaining: 0,
  daysElapsed: 15,
  mix: { artemis: 28, client: 53, infrastructure: 19 },
  assessment: 'client-heavy'
};

// S4 - ACTIVE (current sprint - Day 1 of 14)
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S4',
  name: 'Sprint 2026-S4',
  startDate: '2026-02-13',
  endDate: '2026-02-27',
  status: 'active',
  totalTickets: 61,
  totalPoints: 120,
  completedTickets: 0,
  completedPoints: 0,
  completion: {
    toDo: 41,
    blocked: 2,
    inProgress: 11,
    codeReview: 5,
    done: 0
  },
  completionRate: 0,
  pointsCompletionRate: 0,
  health: 'red',
  daysRemaining: 14,
  daysElapsed: 0,
  likelyRollovers: 0,
  mix: { artemis: 40, client: 28, infrastructure: 20 },
  assessment: 'artemis-focused'
};

// S5 - PLANNED (next sprint)
export const NEXT_SPRINT: Sprint = {
  id: '2026-S5',
  name: 'Sprint 2026-S5',
  startDate: '2026-02-27',
  endDate: 'TBD',
  status: 'planned',
  totalTickets: 30,
  totalPoints: 8,
  completedTickets: 0,
  completedPoints: 0,
  completion: {
    toDo: 30,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  health: 'red',
  daysRemaining: 14,
  daysElapsed: 0,
  mix: { artemis: 50, client: 30, infrastructure: 20 },
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
  totalTickets: 30,
  assigned: 1,
  unassigned: 29,
  withStoryPoints: 2,
  missingEstimates: 28,
  readinessStatus: 'NOT_READY',
  projectBreakdown: [
    { project: 'BACK', count: 20 },
    { project: 'UI', count: 6 },
    { project: 'CI', count: 4 }
  ],
  assignedEngineers: [
    { name: 'Unassigned', tickets: 29 }
  ],
  blockers: [
    '97% of tickets unassigned (29 of 30)',
    '93% missing story point estimates',
    'Only 1 ticket assigned',
    'S5 planning not yet started — RED readiness'
  ]
};

// Blocked Items in current sprint (S4)
export const BLOCKED_ITEMS: SprintItem[] = [
  { key: 'UI-743', summary: 'Deep Recon - Make aggregated report exportable (Broadridge)', category: 'Broadridge', blockedDays: 0, unassigned: true, priority: 'Major' },
  { key: 'UI-740', summary: 'Deep Recon - Add Dropdown List for Assignee Names', category: 'Internal', blockedDays: 0, unassigned: false, priority: 'Major' }
];

// Rollover candidates - High risk items from S4
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1921', summary: 'Mercury HITL - Capture Additional Context', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1922', summary: 'Mercury HITL - Improve Description Sent with Term', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1923', summary: 'Mercury HITL - Provide Examples to Model', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1924', summary: 'Mercury HITL - Post Training Evaluation', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1925', summary: 'Mercury HITL - Validation Recommendations', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1926', summary: 'Mercury HITL - Automated Testing Suite', category: 'Colony Bank', staleDays: 0, unassigned: true },
  { key: 'BACK-1532', summary: 'Fine-tune Mercury Extraction for Sunwest Bank', category: 'Sunwest', staleDays: 0, unassigned: true },
  { key: 'BACK-1653', summary: 'Sunwest Bank - Extraction model fine-tuning', category: 'Sunwest', staleDays: 0, unassigned: true }
];

// ARTEMIS Backlog Items — Verified against JIRA Feb 13, 2026
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

export const SPRINT_DATA_UPDATED = "2026-02-13T16:00:00-07:00";

export function getSprintByStatus(status: 'active' | 'planned' | 'future'): Sprint | undefined {
  return SPRINTS.find(s => s.status === status);
}

export function formatSprintDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
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
  return "February 13, 2026, 4:00 PM MT";
}
