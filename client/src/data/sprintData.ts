// Sprint Data - Updated February 1, 2026 at 7:30 PM MT
// Source: JIRA Sprint Extraction - Sprint 2026-S3 (Active)
// NOTE: NEXT_SPRINT_READINESS export is required by executive.tsx - do not remove

export const EXTRACTION_TIMESTAMP = "2026-02-01T19:30:00-07:00";
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
  status: 'active' | 'planned' | 'future';
  totalTickets: number;
  completion: SprintStatus;
  completionRate: number;
  daysRemaining: number;
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

// Previous Sprint Data - 2026-S2 (Completed)
export const PREVIOUS_SPRINT = {
  id: '2026-S2',
  name: 'Sprint 2026-S2',
  startDate: '2026-01-16',
  endDate: '2026-01-30',
  status: 'completed',
  totalTickets: 98,
  totalPoints: 204,
  effectiveTickets: 93,  // excluding 5 canceled
  effectivePoints: 196,  // excluding canceled
  completion: {
    done: 58,
    toDo: 21,
    inProgress: 6,
    codeReview: 6,
    canceled: 5,
    waitingApproval: 1,
    backlog: 1
  },
  completionRate: 62.4,  // 58/93 effective
  pointsCompletionRate: 70.4,  // 138/196 effective
  pointsCompleted: 138,
  insight: 'Points rate > ticket rate suggests team prioritized larger-effort items. 21 tickets never started indicates overcommitment in sprint planning.'
};

// Current Sprint Data - 2026-S3 (Active)
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S3',
  name: 'Sprint 2026-S3',
  startDate: '2026-01-30',
  endDate: '2026-02-13',
  status: 'active',
  totalTickets: 82,
  completion: {
    toDo: 59,
    blocked: 0,
    inProgress: 11,
    codeReview: 6,
    done: 3
  },
  completionRate: 3.8,  // 3/80 effective (excl 2 canceled)
  daysRemaining: 12,
  likelyRollovers: 55,
  mix: {
    artemis: 37.8,
    client: 6.1,
    infrastructure: 23.2
  },
  assessment: 'artemis-focused'
};

export const NEXT_SPRINT: Sprint = {
  id: '2026-S4',
  name: 'Sprint 2026-S4',
  startDate: '2026-02-13',
  endDate: '2026-02-27',
  status: 'planned',
  totalTickets: 10,
  completion: {
    toDo: 9,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  daysRemaining: 12,
  mix: {
    artemis: 50,
    client: 30,
    infrastructure: 20
  },
  assessment: 'artemis-focused'
};

export const FUTURE_SPRINT: Sprint = {
  id: 'Future',
  name: 'Sprint Future',
  startDate: '',
  endDate: '',
  status: 'future',
  totalTickets: 0,
  completion: { toDo: 0, blocked: 0, inProgress: 0, codeReview: 0, done: 0 },
  completionRate: 0,
  daysRemaining: 28,
  mix: { artemis: 60, client: 25, infrastructure: 15 },
  assessment: 'artemis-focused'
};

export const SPRINTS = [CURRENT_SPRINT, NEXT_SPRINT, FUTURE_SPRINT];
export const sprints = SPRINTS;
export const currentSprint = CURRENT_SPRINT;

// Next Sprint Planned Items (S4 - Microsoft Fabric integration)
export const NEXT_SPRINT_ARTEMIS_ITEMS: NextSprintArtemisItem[] = [
  { key: 'BACK-1382', summary: 'Export for Vantage Commercial Lending Work Items', category: 'artemis' },
  { key: 'BACK-1710', summary: 'Power BI embedded dashboards', category: 'artemis' },
  { key: 'BACK-1711', summary: 'Fabric Real-Time Analytics integration', category: 'artemis' },
  { key: 'BACK-1712', summary: 'OneLake data sync for Information Graph', category: 'artemis' },
  { key: 'BACK-1714', summary: 'Fabric audit logging integration', category: 'artemis' },
  { key: 'BACK-1706', summary: 'Microsoft Fabric workspace setup', category: 'artemis' },
  { key: 'BACK-1707', summary: 'Fabric Lakehouse integration for document storage', category: 'artemis' },
  { key: 'BACK-1709', summary: 'Fabric Data Pipeline for ETL workflows', category: 'artemis' },
  { key: 'BACK-1713', summary: 'Fabric row-level security for multi-tenancy', category: 'artemis' }
];

export const NEXT_SPRINT_CLIENT_ITEMS: NextSprintClientItem[] = [

];

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
  { key: 'BACK-1690', summary: 'Create data lifecycle management policies', category: 'ARTEMIS', staleDays: 26, unassigned: true },
  { key: 'BACK-1691', summary: 'Kubernetes workload autoscaling configuration', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1692', summary: 'Implement agent container health monitoring', category: 'ARTEMIS', staleDays: 2, unassigned: true },
  { key: 'BACK-1693', summary: 'GPU resource allocation for LLM inference', category: 'ARTEMIS', staleDays: 26, unassigned: true },
  { key: 'BACK-1694', summary: 'Create compute cost monitoring dashboard', category: 'ARTEMIS', staleDays: 26, unassigned: true },
  { key: 'BACK-1695', summary: 'API Gateway rate limiting implementation', category: 'ARTEMIS', staleDays: 2, unassigned: true }
];

// Blocked Items in current sprint (S3)
export const BLOCKED_ITEMS: SprintItem[] = [
  // 0 blocked in S3 - good!
];

// ARTEMIS Backlog Items
export const ARTEMIS_BACKLOG: SprintItem[] = [
  { key: 'BACK-846', summary: 'For Product OTC - 304288 While saving the annotation in XML system is throwing a error message " There was a problem saving your feedback. " ', priority: 'Blocker', recommended: true },
  { key: 'BACK-1048', summary: 'JPM - 600+ work items are not processing', priority: 'Blocker', recommended: true },
  { key: 'BACK-1281', summary: 'JPM - Unable to access DeepSee: "No healthy upstream."', priority: 'Blocker', recommended: true },
  { key: 'BACK-1399', summary: '30-50 minute delay between email received and created in DeepSee', priority: 'Blocker', recommended: true },
  { key: 'BACK-1400', summary: 'Email Replies not loading message details', priority: 'Blocker', recommended: true },
  { key: 'BACK-376', summary: 'Add sealed config for promethia__workflows to changing pod resource requests in vault', priority: 'Critical', recommended: true },
  { key: 'BACK-1096', summary: 'Duplicated inquiry ids in current_label_view', priority: 'Critical', recommended: true },
  { key: 'BACK-906', summary: 'Some \'Sent\' emails STILL getting Action Required added', priority: 'Critical', recommended: true },
  { key: 'PR-1559', summary: 'Document Classifier and Parser - Q1 2025', priority: 'Critical', recommended: true },
  { key: 'BACK-1620', summary: 'Implement Document Boundary Detection for Multi-Document Files', priority: 'Critical', recommended: true }
];

export const SPRINT_DATA_UPDATED = EXTRACTION_TIMESTAMP;

export function getSprintByStatus(status: 'active' | 'planned' | 'future'): Sprint | undefined {
  return SPRINTS.find(s => s.status === status);
}

export function formatSprintDate(dateStr: string): string {
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

// CRITICAL EXPORT - Required by executive.tsx and NextSprintReadiness.tsx
// This refers to S4 readiness (next sprint from current S3)
export const NEXT_SPRINT_READINESS = {
  totalTickets: 10,
  assigned: 1,
  unassigned: 9,
  withStoryPoints: 2,
  missingEstimates: 8,
  readinessStatus: 'NOT READY',
  blockers: [
    '90% of tickets unassigned',
    '80% missing story point estimates',
    'Only Darius Ouderkirk has S4 work (BACK-1382, 3 pts)'
  ]
};

export function formatDataTimestamp(isoString: string = EXTRACTION_TIMESTAMP): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Denver'
  }) + ' MT';
}
