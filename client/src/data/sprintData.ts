// Sprint Data - Updated February 6, 2026 at 2:22 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 (Active - Day 7 of 14)
// CRITICAL: NEXT_SPRINT_READINESS export is required by executive.tsx - DO NOT REMOVE

export const EXTRACTION_TIMESTAMP = "2026-02-06T14:22:00-07:00";
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

// S2 - COMPLETED (ended Jan 30, 2026)
export const PREVIOUS_SPRINT: Sprint = {
  id: '2026-S2',
  name: 'Sprint 2026-S2',
  startDate: '2026-01-16',
  endDate: '2026-01-30',
  status: 'completed',
  totalTickets: 98,
  totalPoints: 204,
  completedTickets: 58,
  completedPoints: 138,
  completion: {
    toDo: 21,
    blocked: 0,
    inProgress: 6,
    codeReview: 6,
    done: 58
  },
  completionRate: 62.4,
  pointsCompletionRate: 70.4,
  health: 'yellow',
  daysRemaining: 0,
  daysElapsed: 14,
  mix: { artemis: 10.3, client: 45.2, infrastructure: 12.5 },
  assessment: 'client-heavy'
};

// S3 - ACTIVE (current sprint - Day 7 of 14)
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S3',
  name: 'Sprint 2026-S3',
  startDate: '2026-01-30',
  endDate: '2026-02-13',
  status: 'active',
  totalTickets: 109,
  totalPoints: 210,
  completedTickets: 30,
  completedPoints: 80,
  completion: {
    toDo: 52,
    blocked: 2,
    inProgress: 14,
    codeReview: 5,
    done: 30
  },
  completionRate: 27.5,
  pointsCompletionRate: 38.1,
  health: 'red',
  daysRemaining: 7,
  daysElapsed: 7,
  likelyRollovers: 55,
  mix: { artemis: 27, client: 43, infrastructure: 18 },
  assessment: 'client-heavy'
};

// S4 - PLANNED (next sprint)
export const NEXT_SPRINT: Sprint = {
  id: '2026-S4',
  name: 'Sprint 2026-S4',
  startDate: '2026-02-13',
  endDate: '2026-02-27',
  status: 'planned',
  totalTickets: 11,
  totalPoints: 10,
  completedTickets: 0,
  completedPoints: 0,
  completion: {
    toDo: 11,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  health: 'yellow',
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
  totalTickets: 11,
  assigned: 2,
  unassigned: 9,
  withStoryPoints: 3,
  missingEstimates: 8,
  readinessStatus: 'NOT_READY',
  projectBreakdown: [
    { project: 'BACK', count: 8 },
    { project: 'FB', count: 2 },
    { project: 'CI', count: 1 }
  ],
  assignedEngineers: [
    { name: 'Owen Riley', tickets: 1 },
    { name: 'Darius Ouderkirk', tickets: 1 }
  ],
  blockers: [
    '82% of tickets unassigned (9 of 11)',
    '73% missing story point estimates',
    'Only Owen Riley & Darius Ouderkirk assigned',
    'S4 is mostly Microsoft Fabric integration work'
  ]
};

// Rollover candidates - High risk items that may not complete in S3
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1655', summary: '[MERCURY] API documentation and developer guide', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1658', summary: '[PARSER] HTML structured file parsing for SEC filings', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1661', summary: '[PARSER] Integration between Document Parser and Mercury Extraction', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1654', summary: '[MERCURY] BBVA - Term type extraction for reconciliation', category: 'ARTEMIS', staleDays: 4, unassigned: true },
  { key: 'BACK-1659', summary: '[PARSER] Automatic document type classification', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1663', summary: '[BLUEPRINT] Define data model and storage infrastructure', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1530', summary: 'Setup BBVA Mercury Extraction Schema for Trade Fail Reconciliation', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1532', summary: 'Fine-tune Mercury Extraction for Sunwest Bank Treasury Onboarding Project', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1689', summary: 'Implement data partitioning strategy', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1690', summary: 'Create data lifecycle management policies', category: 'ARTEMIS', staleDays: 26, unassigned: true }
];

// Blocked Items in current sprint (S3)
export const BLOCKED_ITEMS: SprintItem[] = [
  { key: 'UI-743', summary: 'Deep Recon - Make aggregated report exportable (Broadridge)', category: 'Broadridge', blockedDays: 5, unassigned: true, priority: 'High' },
  { key: 'BACK-1863', summary: '[Colony] Allegro post process validation', category: 'Colony', blockedDays: 5, unassigned: true, priority: 'High' }
];

// ARTEMIS Backlog Items
export const ARTEMIS_BACKLOG: SprintItem[] = [
  { key: 'BACK-846', summary: 'For Product OTC - 304288 While saving the annotation in XML system is throwing a error message', priority: 'Blocker', recommended: true },
  { key: 'BACK-1048', summary: 'JPM - 600+ work items are not processing', priority: 'Blocker', recommended: true },
  { key: 'BACK-1281', summary: 'JPM - Unable to access DeepSee: "No healthy upstream."', priority: 'Blocker', recommended: true },
  { key: 'BACK-1399', summary: '30-50 minute delay between email received and created in DeepSee', priority: 'Blocker', recommended: true },
  { key: 'BACK-1400', summary: 'Email Replies not loading message details', priority: 'Blocker', recommended: true },
  { key: 'BACK-376', summary: 'Add sealed config for promethia__workflows to changing pod resource requests in vault', priority: 'Critical', recommended: true },
  { key: 'BACK-1096', summary: 'Duplicated inquiry ids in current_label_view', priority: 'Critical', recommended: true },
  { key: 'BACK-906', summary: 'Some Sent emails STILL getting Action Required added', priority: 'Critical', recommended: true },
  { key: 'PR-1559', summary: 'Document Classifier and Parser - Q1 2025', priority: 'Critical', recommended: true },
  { key: 'BACK-1620', summary: 'Implement Document Boundary Detection for Multi-Document Files', priority: 'Critical', recommended: true }
];

export const SPRINT_DATA_UPDATED = "2026-02-06T14:22:00-07:00";

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
  return "February 6, 2026, 2:22 PM MT";
}
