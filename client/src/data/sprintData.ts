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
  cancelled?: number;
  backlog?: number;
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
  daysElapsed?: number;
  totalPoints?: number;
  completedPoints?: number;
  scopeCreep?: number;
  likelyRollovers?: number;
  mix: SprintMix;
  assessment: 'artemis-focused' | 'balanced' | 'client-heavy';
  healthStatus?: 'GREEN' | 'YELLOW' | 'RED';
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
  totalPoints: 200,
  completedPoints: 90,
  daysElapsed: 10,
  daysRemaining: 4,
  scopeCreep: 82, // % increase from original 110 pts
  completion: {
    toDo: 32,
    blocked: 4,
    inProgress: 14,
    codeReview: 3,
    done: 40,
    cancelled: 2,
    backlog: 1
  },
  completionRate: 42, // 90 points completed / ~200 total points
  likelyRollovers: 25, // Recommended to descope 25-30 points
  mix: {
    artemis: 0, // CRITICAL: 0% ARTEMIS work started
    client: 45,
    infrastructure: 55
  },
  assessment: 'client-heavy',
  healthStatus: 'RED'
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
  id: '2026-S4',
  name: 'Sprint 2026-S4',
  startDate: '2026-02-13',
  endDate: '2026-02-27',
  status: 'future',
  totalTickets: 0,
  completion: {
    toDo: 0,
    blocked: 0,
    inProgress: 0,
    codeReview: 0,
    done: 0
  },
  completionRate: 0,
  daysRemaining: 32,
  mix: {
    artemis: 60,
    client: 25,
    infrastructure: 15
  },
  assessment: 'artemis-focused'
};

// Export all sprints
export const SPRINTS = [CURRENT_SPRINT, NEXT_SPRINT, FUTURE_SPRINT];
export const sprints = SPRINTS; // Alias for compatibility
export const currentSprint = CURRENT_SPRINT;

// Next Sprint Planned Items
export const NEXT_SPRINT_ARTEMIS_ITEMS: NextSprintArtemisItem[] = [
  { key: 'BACK-1713', summary: 'Fabric row-level security for multi-tenancy', category: 'Microsoft Fabric' },
  { key: 'BACK-1709', summary: 'Fabric Data Pipeline for ETL workflows', category: 'Microsoft Fabric' },
  { key: 'BACK-1707', summary: 'Fabric Lakehouse integration for document storage', category: 'Microsoft Fabric' },
  { key: 'BACK-1706', summary: 'Microsoft Fabric workspace setup', category: 'Microsoft Fabric' },
  { key: 'BACK-1701', summary: 'Implement circuit breaker pattern for external calls', category: 'Platform' },
  { key: 'BACK-1698', summary: 'OAuth 2.0 client credential flow for APIs', category: 'Platform' },
  { key: 'BACK-1696', summary: 'Connector Framework base implementation', category: 'Platform' },
  { key: 'BACK-1695', summary: 'API Gateway rate limiting implementation', category: 'Platform' },
  { key: 'BACK-1692', summary: 'Implement agent container health monitoring', category: 'Infrastructure' },
  { key: 'BACK-1691', summary: 'Kubernetes workload autoscaling configuration', category: 'Infrastructure' },
  { key: 'BACK-1689', summary: 'Implement data partitioning strategy', category: 'Infrastructure' },
  { key: 'BACK-1781', summary: 'FEEL Refactor work', category: 'Platform' }
];

export const NEXT_SPRINT_CLIENT_ITEMS: NextSprintClientItem[] = [
  { key: 'BACK-1778', summary: 'Colony - Review SSN sync timing', client: 'Colony Bank' },
  { key: 'BACK-1724', summary: 'Colony - Review title document annotation', client: 'Colony Bank' },
  { key: 'BACK-1779', summary: 'Deep Pilot - Implement post-processing', client: 'Deep Pilot' },
  { key: 'BACK-1722', summary: 'Deep Pilot - Improve Recalculation Performance', client: 'Deep Pilot' },
  { key: 'UI-742', summary: 'Deep Recon UI enhancement', client: 'Accenture' },
  { key: 'UI-741', summary: 'Deep Recon UI enhancement', client: 'Accenture' },
  { key: 'UI-740', summary: 'Deep Recon UI enhancement', client: 'Accenture' },
  { key: 'UI-739', summary: 'Deep Recon UI enhancement', client: 'Accenture' },
  { key: 'UI-738', summary: 'Deep Recon UI enhancement', client: 'Accenture' }
];

// Rollover candidates - High risk items that may not complete
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1653', summary: '[MERCURY] Sunwest Bank - Extraction model fine-tuning', category: 'ARTEMIS', staleDays: 19 },
  { key: 'BACK-1651', summary: '[MERCURY] Core extraction engine performance optimization', category: 'ARTEMIS', staleDays: 20 },
  { key: 'BACK-1655', summary: '[MERCURY] API documentation and developer guide', category: 'ARTEMIS', staleDays: 20 },
  { key: 'BACK-1658', summary: '[PARSER] HTML structured file parsing for SEC filings', category: 'ARTEMIS', staleDays: 20 },
  { key: 'BACK-1657', summary: '[PARSER] PDF extraction for multi-page documents', category: 'ARTEMIS', staleDays: 20 },
  { key: 'BACK-1661', summary: '[PARSER] Integration between Document Parser and Mercury', category: 'ARTEMIS', staleDays: 20 },
  { key: 'BACK-1659', summary: '[PARSER] Automatic document type classification', category: 'ARTEMIS', staleDays: 19 },
  { key: 'BACK-1663', summary: '[BLUEPRINT] Define data model and storage infrastructure', category: 'ARTEMIS', unassigned: true },
  { key: 'UI-732', summary: 'UI Agentic Rules: Definitions and Adoption', category: 'ARTEMIS', unassigned: true },
  { key: 'UI-698', summary: 'Create "Recategorized By HITL"', category: 'Client', client: 'Broadridge', staleDays: 62 },
  { key: 'UI-715', summary: 'Update Status page to pull correct data', category: 'Client', client: 'Broadridge', staleDays: 40 },
  { key: 'UI-716', summary: 'Update Overview > Breakout chart calculations', category: 'Client', client: 'Broadridge', staleDays: 40 }
];

// Blocked Items in current sprint - Updated January 26, 2026
export const BLOCKED_ITEMS: SprintItem[] = [
  { key: 'BACK-1603', summary: 'Deep Recon - DTCC Sync to DeepSee - extend data from additional fields', category: 'Client', client: 'DTCC', blockedDays: 42 },
  { key: 'BACK-1489', summary: 'Update classification-api Base Image to Ubuntu 24.04 LTS', category: 'Infrastructure', blockedDays: 75, unassigned: true },
  { key: 'UI-719', summary: 'DeepRecon - Add To column to Actionable Data Pages (Accenture)', category: 'Client', client: 'Accenture', blockedDays: 46, unassigned: true },
  { key: 'BACK-1796', summary: 'Automatically refresh the Allegro password before expiry', category: 'Infrastructure', blockedDays: 6 }
];

// ARTEMIS Backlog Items
export const ARTEMIS_BACKLOG: SprintItem[] = [
  { key: 'BACK-1680', summary: 'Platform Infrastructure - ARTEMIS Foundation', priority: 'Major', recommended: true },
  { key: 'BACK-1681', summary: 'Implement Kafka-based message bus for agents', priority: 'Major', recommended: true },
  { key: 'BACK-1682', summary: 'Create agent message schema and contracts', priority: 'Major', recommended: true },
  { key: 'BACK-1683', summary: 'Implement dead letter queue handling', priority: 'Major' },
  { key: 'BACK-1684', summary: 'Build message routing and orchestration layer', priority: 'Major' },
  { key: 'BACK-1685', summary: 'Add message tracing and correlation IDs', priority: 'Major' },
  { key: 'BACK-1686', summary: 'Information Graph enhanced infrastructure', priority: 'Major' },
  { key: 'BACK-1687', summary: 'Vector Store optimization for embeddings', priority: 'Major' },
  { key: 'BACK-1688', summary: 'Document Store indexing improvements', priority: 'Major' },
  { key: 'UI-734', summary: '[BLUEPRINT] ARTEMIS UI for BluePrint viewing', priority: 'Major', recommended: true }
];

// Last updated timestamp
export const SPRINT_DATA_UPDATED = EXTRACTION_TIMESTAMP;

// Helper function to get sprint by status
export function getSprintByStatus(status: 'active' | 'planned' | 'future'): Sprint | undefined {
  return SPRINTS.find(s => s.status === status);
}

// Helper to format date for display
export function formatSprintDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Get sprint mix data for chart
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

// Format timestamp for display - always show MT timezone
export function formatDataTimestamp(isoString: string = EXTRACTION_TIMESTAMP): string {
  // Parse the ISO string and format with MT timezone
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
