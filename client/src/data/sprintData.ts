// Sprint Data - Updated January 13, 2026
// Source: DeepSee JIRA

export interface SprintStatus {
  done: number;
  codeReview: number;
  inProgress: number;
  blocked: number;
  toDo: number;
}

export interface SprintMix {
  artemis: number;
  client: number;
  infrastructure: number;
}

export interface Sprint {
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'future';
  totalTickets: number;
  completion?: SprintStatus;
  completionRate?: number;
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

// Current Sprint Data
export const CURRENT_SPRINT: Sprint = {
  name: '2026-S1',
  startDate: '2026-01-02',
  endDate: '2026-01-16',
  status: 'active',
  totalTickets: 82,
  completion: {
    done: 42,
    codeReview: 6,
    inProgress: 9,
    blocked: 5,
    toDo: 20
  },
  completionRate: 51,
  likelyRollovers: 25,
  mix: {
    artemis: 40,
    client: 45,
    infrastructure: 15
  },
  assessment: 'client-heavy'
};

export const NEXT_SPRINT: Sprint = {
  name: '2026-S2',
  startDate: '2026-01-16',
  endDate: '2026-01-30',
  status: 'planned',
  totalTickets: 33,
  mix: {
    artemis: 36,
    client: 42,
    infrastructure: 21
  },
  assessment: 'client-heavy'
};

export const FUTURE_SPRINT: Sprint = {
  name: '2026-S3',
  startDate: '2026-01-30',
  endDate: '2026-02-13',
  status: 'future',
  totalTickets: 14,
  mix: {
    artemis: 86,
    client: 14,
    infrastructure: 0
  },
  assessment: 'artemis-focused'
};

// Export all sprints
export const SPRINTS = [CURRENT_SPRINT, NEXT_SPRINT, FUTURE_SPRINT];

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

// Future Sprint Planned Items
export const FUTURE_SPRINT_ARTEMIS_ITEMS: NextSprintArtemisItem[] = [
  { key: 'BACK-1714', summary: 'Fabric audit logging integration', category: 'Microsoft Fabric' },
  { key: 'BACK-1712', summary: 'OneLake data sync for Information Graph', category: 'Microsoft Fabric' },
  { key: 'BACK-1711', summary: 'Fabric Real-Time Analytics integration', category: 'Microsoft Fabric' },
  { key: 'BACK-1710', summary: 'Power BI embedded dashboards', category: 'Microsoft Fabric' },
  { key: 'BACK-1703', summary: 'Create platform health dashboard', category: 'Platform' },
  { key: 'BACK-1702', summary: 'Self-healing agent restart logic', category: 'Platform' },
  { key: 'BACK-1700', summary: 'API Gateway rate limiting implementation', category: 'Platform' },
  { key: 'BACK-1699', summary: 'Webhook delivery and retry mechanism', category: 'Platform' },
  { key: 'BACK-1697', summary: 'MCP (Model Context Protocol) adapter', category: 'Integrations' },
  { key: 'BACK-1694', summary: 'Create compute cost monitoring dashboard', category: 'Infrastructure' },
  { key: 'BACK-1693', summary: 'GPU resource allocation for LLM inference', category: 'Infrastructure' },
  { key: 'BACK-1690', summary: 'Create data lifecycle management policies', category: 'Infrastructure' }
];

export const FUTURE_SPRINT_CLIENT_ITEMS: NextSprintClientItem[] = [
  { key: 'BACK-1654', summary: '[MERCURY] BBVA - Term type extraction for reconciliation', client: 'BBVA' },
  { key: 'BACK-1382', summary: 'Export for Vantage Commercial Lending Work Items', client: 'Vantage' }
];

// Rollover candidates
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
  { key: 'BACK-1653', summary: '[MERCURY] Sunwest Bank - Extraction model fine-tuning', category: 'ARTEMIS', staleDays: 13 },
  { key: 'BACK-1651', summary: '[MERCURY] Core extraction engine performance optimization', category: 'ARTEMIS', staleDays: 14 },
  { key: 'BACK-1655', summary: '[MERCURY] API documentation and developer guide', category: 'ARTEMIS', staleDays: 14 },
  { key: 'BACK-1658', summary: '[PARSER] HTML structured file parsing for SEC filings', category: 'ARTEMIS', staleDays: 14 },
  { key: 'BACK-1657', summary: '[PARSER] PDF extraction for multi-page documents', category: 'ARTEMIS', staleDays: 14 },
  { key: 'BACK-1661', summary: '[PARSER] Integration between Document Parser and Mercury', category: 'ARTEMIS', staleDays: 14 },
  { key: 'BACK-1659', summary: '[PARSER] Automatic document type classification', category: 'ARTEMIS', staleDays: 13 },
  { key: 'BACK-1663', summary: '[BLUEPRINT] Define data model and storage infrastructure', category: 'ARTEMIS', unassigned: true },
  { key: 'UI-732', summary: 'UI Agentic Rules: Definitions and Adoption', category: 'ARTEMIS', unassigned: true },
  { key: 'UI-698', summary: 'Create "Recategorized By HITL"', category: 'Client', client: 'Broadridge', staleDays: 56 },
  { key: 'UI-715', summary: 'Update Status page to pull correct data', category: 'Client', client: 'Broadridge', staleDays: 34 },
  { key: 'UI-716', summary: 'Update Overview > Breakout chart calculations', category: 'Client', client: 'Broadridge', staleDays: 34 }
];

export const BLOCKED_ITEMS: SprintItem[] = [
  { key: 'BACK-1721', summary: 'Trained terms not extracted from Confirmation (JPM)', category: 'Client', blockedDays: 1 },
  { key: 'BACK-1603', summary: 'Deep Recon - DTCC Sync to DeepSee', category: 'Client', client: 'DTCC', blockedDays: 2 },
  { key: 'UI-718', summary: 'DeepRecon - Display Mailbox ID', category: 'Client', client: 'Accenture', blockedDays: 14 },
  { key: 'UI-719', summary: 'DeepRecon - Add To column to Actionable Data', category: 'Client', client: 'Accenture', blockedDays: 14 },
  { key: 'BACK-1489', summary: 'Update classification-api Base Image to Ubuntu 24.04', category: 'Infrastructure', blockedDays: 34 }
];

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
export const SPRINT_DATA_UPDATED = '2026-01-13T16:00:00-07:00';

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
