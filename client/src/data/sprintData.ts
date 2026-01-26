// Sprint Data - Updated January 26, 2026 at 12:40 PM MT
// Source: Monday.com CRM + JIRA
// Sprint 2026-S2 Status Update

export const EXTRACTION_TIMESTAMP = "2026-01-26T12:40:00-07:00"; // MT timezone
export const DATA_SOURCE = "Monday.com CRM + JIRA";

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

// Current Sprint Data - 2026-S2 (Active)
// Updated: January 26, 2026 - 4 days remaining
export const CURRENT_SPRINT: Sprint = {
  id: '2026-S2',
  name: 'Sprint 2026-S2',
  startDate: '2026-01-16',
  endDate: '2026-01-30',
  status: 'active',
  totalTickets: 96,
  completion: {
    toDo: 32,
    blocked: 4,
    inProgress: 14,
    codeReview: 3,
    done: 40
  },
  completionRate: 42, // 90/200 story points
  daysRemaining: 4,
  likelyRollovers: 25,
  mix: {
    artemis: 0, // CRITICAL: 0% ARTEMIS work started
    client: 45,
    infrastructure: 55
  },
  assessment: 'client-heavy'
};

export const NEXT_SPRINT: Sprint = {
  id: '2026-S3',
  name: 'Sprint 2026-S3',
  startDate: '2026-01-30',
  endDate: '2026-02-13',
  status: 'planned',
  totalTickets: 15,
  completion: {
    toDo: 15,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  daysRemaining: 18,
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

// Next Sprint Planned Items
export const NEXT_SPRINT_ARTEMIS_ITEMS: NextSprintArtemisItem[] = [
  { key: 'BACK-1382', summary: 'Export for Vantage Commercial Lending Work Items', category: 'artemis' },
  { key: 'BACK-1654', summary: '[MERCURY] BBVA - Term type extraction for reconciliation', category: 'artemis' },
  { key: 'BACK-1690', summary: 'Create data lifecycle management policies', category: 'artemis' },
  { key: 'BACK-1693', summary: 'GPU resource allocation for LLM inference', category: 'artemis' },
  { key: 'BACK-1694', summary: 'Create compute cost monitoring dashboard', category: 'artemis' },
  { key: 'BACK-1697', summary: 'MCP (Model Context Protocol) adapter', category: 'artemis' },
  { key: 'BACK-1699', summary: 'Webhook delivery and retry mechanism', category: 'artemis' },
  { key: 'BACK-1700', summary: 'API Gateway rate limiting implementation', category: 'artemis' },
  { key: 'BACK-1702', summary: 'Self-healing agent restart logic', category: 'artemis' },
  { key: 'BACK-1703', summary: 'Create platform health dashboard', category: 'artemis' },
  { key: 'BACK-1710', summary: 'Power BI embedded dashboards', category: 'artemis' },
  { key: 'BACK-1711', summary: 'Fabric Real-Time Analytics integration', category: 'artemis' }
];

export const NEXT_SPRINT_CLIENT_ITEMS: NextSprintClientItem[] = [
  { key: 'BACK-1795', summary: 'Add AccountName2 checklist item result to the Output (DTCC)', client: 'Back End Development' }
];

// Rollover candidates - High risk items that may not complete
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1653', summary: '[MERCURY] Sunwest Bank - Extraction model fine-tuning', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'BACK-1603', summary: 'Deep Recon - DTCC Sync to DeepSee - extend data from additional fields to be imported from SFDC case', category: 'CLIENT', staleDays: 10 },
  { key: 'BACK-1655', summary: '[MERCURY] API documentation and developer guide', category: 'ARTEMIS', staleDays: 1, unassigned: true },
  { key: 'BACK-1658', summary: '[PARSER] HTML structured file parsing for SEC filings', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'BACK-1657', summary: '[PARSER] PDF extraction for multi-page documents that have multiple documents within', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'BACK-1661', summary: '[PARSER] Integration between Document Parser and Mercury Extraction', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'BACK-1638', summary: 'Deep Pilot - Some password protected files make the Work Item stuck in processing (DTCC)', category: 'CLIENT', staleDays: 2, unassigned: true },
  { key: 'BACK-1659', summary: '[PARSER] Automatic document type classification', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'UI-698', summary: 'Create "Recategorized By HITL" ', category: 'CLIENT', staleDays: 0, unassigned: true },
  { key: 'BACK-1663', summary: '[BLUEPRINT] Define data model and storage infrastructure', category: 'ARTEMIS', staleDays: 6, unassigned: true },
  { key: 'UI-719', summary: 'DeepRecon - Add To column to Actionable Data Pages (Accenture)', category: 'CLIENT', staleDays: 22, unassigned: true },
  { key: 'BACK-1489', summary: 'Update classification-api Base Image to Ubuntu 24.04 LTS', category: 'INFRASTRUCTURE', staleDays: 42, unassigned: true },
  { key: 'BACK-1530', summary: 'Setup BBVA Mercury Extraction Schema for Trade Fail Reconciliation', category: 'ARTEMIS', staleDays: 1, unassigned: true },
  { key: 'BACK-1532', summary: 'Fine-tune Mercury Extraction for Sunwest Bank Treasury Onboarding Project', category: 'ARTEMIS', staleDays: 1, unassigned: true },
  { key: 'BACK-1689', summary: 'Implement data partitioning strategy', category: 'ARTEMIS', staleDays: 16, unassigned: true }
];

// Blocked Items in current sprint - Updated January 26, 2026
export const BLOCKED_ITEMS: SprintItem[] = [
  { key: 'BACK-1603', summary: 'Deep Recon - DTCC Sync to DeepSee', category: 'Client', client: 'DTCC', blockedDays: 42 },
  { key: 'BACK-1489', summary: 'Update classification-api Base Image to Ubuntu 24.04 LTS', category: 'Infrastructure', blockedDays: 75, unassigned: true },
  { key: 'UI-719', summary: 'DeepRecon - Add To column to Actionable Data Pages (Accenture)', category: 'Client', client: 'Accenture', blockedDays: 46, unassigned: true },
  { key: 'BACK-1796', summary: 'Automatically refresh the Allegro password before expiry', category: 'Infrastructure', blockedDays: 6 }
];

// ARTEMIS Backlog Items
export const ARTEMIS_BACKLOG: SprintItem[] = [
  { key: 'BACK-846', summary: 'For Product OTC - 304288 While saving the annotation in XML system is throwing a error message “ There was a problem saving your feedback. “ ', priority: 'Blocker', recommended: true },
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
