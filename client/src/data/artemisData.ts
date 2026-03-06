// ARTEMIS Architecture Data - March 6, 2026
// Contains all ARTEMIS-related constants and data structures

export interface ArtemisLayer {
  id: string;
  name: string;
  color: string;
  description: string;
  count: number;
}

export interface ArtemisTicket {
  key: string;
  summary: string;
  status: string;
  layer: string;
}

export interface ArtemisEpic {
  key: string;
  summary: string;
  status: string;
  layer?: string;
  children?: number;
}

export interface AgentFamily {
  name: string;
  color: string;
  blueprints: string[];
}

// 9 ARTEMIS Architecture Layers (3 Persona Workspaces replace Complex Services + Process Certainty)
export const ARTEMIS_LAYERS: ArtemisLayer[] = [
  {
    id: 'analyst-workspace',
    name: 'Analyst Workspace',
    color: '#4CAF50',
    description: 'Analyst-facing UI, investigation tools, exception handling workflows, HITL interfaces',
    count: 5
  },
  {
    id: 'manager-workspace',
    name: 'Manager Workspace',
    color: '#E91E63',
    description: 'Supervisory dashboards, team performance metrics, escalation management, approval workflows',
    count: 2
  },
  {
    id: 'technology-workspace',
    name: 'Technology Workspace',
    color: '#F44336',
    description: 'Platform administration, infrastructure monitoring, deployment management, system configuration',
    count: 2
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    color: '#2196F3',
    description: 'Configurable instructions for agents - the 4 Agent Families',
    count: 0
  },
  {
    id: 'automation-orchestration',
    name: 'Automation & Orchestration',
    color: '#9C27B0',
    description: 'Multi-agent coordination, workflow planning',
    count: 3
  },
  {
    id: 'agentic-engine',
    name: 'Agentic Engine',
    color: '#FF9800',
    description: 'Internal skill agents, tools, models (SLM, Planning, Reasoning)',
    count: 3
  },
  {
    id: 'deepgraph',
    name: 'DeepIQ',
    color: '#00BCD4',
    description: 'Context graph, knowledge graph, insight generation',
    count: 13
  },
  {
    id: 'platform',
    name: 'Platform',
    color: '#607D8B',
    description: 'Communication protocols, data standards (formerly Service Fabric)',
    count: 4
  },
  {
    id: 'integrations',
    name: 'Integrations',
    color: '#795548',
    description: 'MCP servers, data sources, 3rd party agents',
    count: 3
  }
];

// Ticket data by category (as of March 6, 2026)
export const ARTEMIS_TICKET_DATA: Record<string, { count: number; tickets: ArtemisTicket[] }> = {
  'Agentic Engine': {
    count: 3,
    tickets: [
      { key: 'BACK-1731', summary: 'Declarative Agent Definition', status: 'TO DO', layer: 'agentic-engine' },
      { key: 'BACK-1745', summary: 'Tool Integration Framework', status: 'TO DO', layer: 'agentic-engine' },
      { key: 'BACK-1746', summary: 'Agent Memory System', status: 'TO DO', layer: 'agentic-engine' }
    ]
  },
  'Automation & Orchestration': {
    count: 3,
    tickets: [
      { key: 'BACK-1734', summary: 'Workflow Orchestration Engine', status: 'TO DO', layer: 'automation-orchestration' },
      { key: 'BACK-1737', summary: 'Multi-Agent Collaboration', status: 'TO DO', layer: 'automation-orchestration' },
      { key: 'PR-1563', summary: 'Agent Orchestration Platform', status: 'PLANNING', layer: 'automation-orchestration' }
    ]
  },
  'Analyst Workspace': {
    count: 5,
    tickets: [
      { key: 'BACK-1717', summary: 'Email Automation', status: 'IN PROGRESS', layer: 'analyst-workspace' },
      { key: 'BACK-1666', summary: 'Email Processing', status: 'IN PROGRESS', layer: 'analyst-workspace' },
      { key: 'BACK-1631', summary: 'Colony Bank - Loan Funding', status: 'IN PROGRESS', layer: 'analyst-workspace' },
      { key: 'BACK-1415', summary: 'SSI', status: 'IN PROGRESS', layer: 'analyst-workspace' },
      { key: 'BACK-1652', summary: 'HMDA', status: 'IN PROGRESS', layer: 'analyst-workspace' }
    ]
  },
  'Manager Workspace': {
    count: 2,
    tickets: [
      { key: 'BACK-1716', summary: 'Invoice Reconciliation', status: 'TO DO', layer: 'manager-workspace' },
      { key: 'BACK-1733', summary: 'Content Safety and Guardrails', status: 'TO DO', layer: 'manager-workspace' }
    ]
  },
  'Technology Workspace': {
    count: 2,
    tickets: [
      { key: 'BACK-1744', summary: 'Reinforcement Fine-Tuning Integration', status: 'TO DO', layer: 'technology-workspace' },
      { key: 'BACK-1775', summary: 'Reinforcement Fine-Tuning for Agents', status: 'TO DO', layer: 'technology-workspace' }
    ]
  },
  'DeepIQ': {
    count: 13,
    tickets: [
      { key: 'BACK-1753', summary: 'GraphRAG Knowledge Graph Integration', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1769', summary: 'GraphRAG Integration for Knowledge Graphs', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1942', summary: 'DeepIQ & DeepGraph: Context Intelligence Platform', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1943', summary: 'DeepGraph: Real-Time Agent Data Ingestion Pipeline', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1944', summary: 'DeepGraph: Triples-Based Context Graph Data Model', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1945', summary: 'DeepGraph: Graph Query Engine with Pattern Matching', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1946', summary: 'DeepIQ: Proactive Insight Engine (Alerts, Anomalies, Patterns)', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1947', summary: 'DeepIQ: Contextual Insight Display in Existing Interfaces', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1948', summary: 'DeepIQ: Self-Service Analytics Dashboard', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1949', summary: 'DeepIQ: Counterfactual "What-If" Analysis', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1950', summary: 'DeepIQ: Complete Decision Trace Logging & Audit Trail', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1951', summary: 'DeepIQ: Compliance Reporting & Regulatory Export', status: 'TO DO', layer: 'deepgraph' },
      { key: 'BACK-1952', summary: 'DeepIQ: Security, Scalability & Infrastructure Requirements', status: 'TO DO', layer: 'deepgraph' }
    ]
  },
  'Integrations': {
    count: 3,
    tickets: [
      { key: 'BACK-1697', summary: 'MCP Adapter', status: 'TO DO', layer: 'integrations' },
      { key: 'BACK-1759', summary: 'External Connections', status: 'TO DO', layer: 'integrations' },
      { key: 'BACK-1704', summary: 'Microsoft Fabric Integration', status: 'TO DO', layer: 'integrations' }
    ]
  },
  'Platform': {
    count: 4,
    tickets: [
      { key: 'BACK-1680', summary: 'Platform Infrastructure - ARTEMIS Foundation', status: 'TO DO', layer: 'platform' },
      { key: 'BACK-1681', summary: 'Kafka Message Bus', status: 'TO DO', layer: 'platform' },
      { key: 'BACK-1682', summary: 'Message Schema/Contracts', status: 'TO DO', layer: 'platform' },
      { key: 'BACK-1703', summary: 'Platform Health Dashboard', status: 'TO DO', layer: 'platform' }
    ]
  },
  'Blueprint': {
    count: 0,
    tickets: []
  }
};

// All tickets flattened
export const ALL_ARTEMIS_TICKETS: ArtemisTicket[] = Object.values(ARTEMIS_TICKET_DATA)
  .flatMap(category => category.tickets);

// Epic hierarchy
export const ARTEMIS_INITIATIVE: ArtemisEpic = {
  key: 'PR-1561',
  summary: 'DeepSee Agentic Platform',
  status: 'BACKLOG'
};

export const ARTEMIS_MILESTONES: ArtemisEpic[] = [
  // Original 5 milestones
  { key: 'PR-1562', summary: 'Infrastructure and Deployment', status: 'PLANNING', layer: 'Platform' },
  { key: 'PR-1563', summary: 'Agent Orchestration Platform', status: 'PLANNING', layer: 'Automation & Orchestration', children: 8 },
  { key: 'PR-1564', summary: 'Identity and Access Management', status: 'PLANNING', layer: 'Platform' },
  { key: 'PR-1565', summary: 'Data Ingestion and Content Understanding', status: 'PLANNING', layer: 'Agentic Engine' },
  { key: 'PR-1566', summary: 'Observability and Governance', status: 'PLANNING', layer: 'Technology Workspace' },
  // 10 new milestones (moved from BACK to PR project by Delaney)
  { key: 'PR-1567', summary: 'Firm-Specific Blueprints', status: 'PLANNING', layer: 'Blueprint' },
  { key: 'PR-1568', summary: 'Analyst Workspace', status: 'PLANNING', layer: 'Analyst Workspace' },
  { key: 'PR-1569', summary: 'Process Intelligence (DeepIQ/DeepGraph)', status: 'PLANNING', layer: 'DeepIQ' },
  { key: 'PR-1570', summary: 'DeepSee Blueprints', status: 'PLANNING', layer: 'Blueprint' },
  { key: 'PR-1571', summary: 'Integrations', status: 'PLANNING', layer: 'Integrations' },
  { key: 'PR-1572', summary: 'Agentic Engine', status: 'PLANNING', layer: 'Agentic Engine' },
  { key: 'PR-1573', summary: 'Knowledge Extraction', status: 'PLANNING', layer: 'Agentic Engine' },
  { key: 'PR-1574', summary: 'Reasoning and Planning', status: 'PLANNING', layer: 'Automation & Orchestration' },
  { key: 'PR-1575', summary: 'Manager Workspace', status: 'PLANNING', layer: 'Manager Workspace' },
  { key: 'PR-1576', summary: 'Technology Workspace', status: 'PLANNING', layer: 'Technology Workspace' }
];

export const ARTEMIS_FOUNDATION_EPICS: ArtemisEpic[] = [
  { key: 'BACK-1680', summary: 'Platform Infrastructure - ARTEMIS Foundation', status: 'TO DO', children: 23, layer: 'Platform' },
  { key: 'BACK-1704', summary: 'DeepSee Fabric Integration - Microsoft Ecosystem', status: 'TO DO', children: 8, layer: 'Integrations' }
];

// Agent Families (4 families, 29 blueprints total)
export const AGENT_FAMILIES: Record<string, AgentFamily> = {
  'Comms': {
    name: 'Comms',
    color: '#E3F2FD',
    blueprints: [
      'Email Process Automation - Outlook',
      'Email Process Automation - Gmail',
      'Case Automation - ServiceNow',
      'Case Automation - Dynamics',
      'Case Automation - Salesforce'
    ]
  },
  'Reconciliation': {
    name: 'Reconciliation',
    color: '#F3E5F5',
    blueprints: [
      'Deal Review - Confirmation',
      'Trade Affirmation',
      'Invoice Reconciliation',
      'Trade Matching and Reconciliation',
      'CSA Reconciliation'
    ]
  },
  'Settlements': {
    name: 'Settlements',
    color: '#E8F5E9',
    blueprints: [
      'Standing Settlement Instruction',
      'Payment Verification',
      'Loan Payment Verification'
    ]
  },
  'Operations': {
    name: 'Operations',
    color: '#FFF3E0',
    blueprints: [
      'Loan Boarding',
      'Loan Funding',
      'Check Processing',
      'HMDA Reporting',
      'CRA Reporting',
      'Retention Prediction - Advisor',
      'Retention Prediction - Client',
      'One View - Equity One',
      'Settlement Optimization',
      'Account Setup',
      'DeepPilot - Policies',
      'Regulatory Filing',
      'Insurance Policy Review',
      'Corporate Action Processing - Notices',
      'Watchtower',
      'Treasury Onboarding'
    ]
  }
};

// Blueprint coverage mapping (which blueprints have JIRA tickets)
export const BLUEPRINT_COVERAGE: Record<string, 'active' | 'partial' | 'gap'> = {
  // Comms
  'Email Process Automation - Outlook': 'active',
  'Email Process Automation - Gmail': 'partial',
  'Case Automation - ServiceNow': 'gap',
  'Case Automation - Dynamics': 'gap',
  'Case Automation - Salesforce': 'gap',
  // Reconciliation
  'Deal Review - Confirmation': 'partial',
  'Trade Affirmation': 'gap',
  'Invoice Reconciliation': 'active',
  'Trade Matching and Reconciliation': 'partial',
  'CSA Reconciliation': 'gap',
  // Settlements
  'Standing Settlement Instruction': 'active',
  'Payment Verification': 'partial',
  'Loan Payment Verification': 'active',
  // Operations
  'Loan Boarding': 'partial',
  'Loan Funding': 'active',
  'Check Processing': 'gap',
  'HMDA Reporting': 'active',
  'CRA Reporting': 'partial',
  'Retention Prediction - Advisor': 'gap',
  'Retention Prediction - Client': 'gap',
  'One View - Equity One': 'partial',
  'Settlement Optimization': 'gap',
  'Account Setup': 'gap',
  'DeepPilot - Policies': 'gap',
  'Regulatory Filing': 'partial',
  'Insurance Policy Review': 'gap',
  'Corporate Action Processing - Notices': 'gap',
  'Watchtower': 'gap',
  'Treasury Onboarding': 'gap'
};

// Sprint 2026-S1 Data
export const SPRINT_DATA = {
  name: '2026-S1',
  status: {
    'TO DO': 22,
    'BLOCKED': 4,
    'IN PROGRESS': 14,
    'CODE REVIEW': 4,
    'DONE': 32
  },
  total: 76,
  portfolio: {
    'Planning': 87,
    'Backlog': 242,
    'Discovery': 1,
    'In Progress': 21,
    'On Track': 8,
    'At Risk': 10,
    'New': 46
  },
  totalWorkItems: 415
};

// Helper functions
export function getLayerById(id: string): ArtemisLayer | undefined {
  return ARTEMIS_LAYERS.find(layer => layer.id === id);
}

export function getLayerByName(name: string): ArtemisLayer | undefined {
  return ARTEMIS_LAYERS.find(layer => layer.name === name);
}

export function getTicketsByLayer(layerName: string): ArtemisTicket[] {
  return ARTEMIS_TICKET_DATA[layerName]?.tickets || [];
}

export function getTotalTicketCount(): number {
  return Object.values(ARTEMIS_TICKET_DATA).reduce((sum, cat) => sum + cat.count, 0);
}

export function getLayerTicketCount(layerName: string): number {
  return ARTEMIS_TICKET_DATA[layerName]?.count || 0;
}

export function getBlueprintStatus(blueprint: string): 'active' | 'partial' | 'gap' {
  return BLUEPRINT_COVERAGE[blueprint] || 'gap';
}

export function getFamilyBlueprintCounts(familyName: string): { active: number; partial: number; gap: number } {
  const family = AGENT_FAMILIES[familyName];
  if (!family) return { active: 0, partial: 0, gap: 0 };

  return family.blueprints.reduce((acc, blueprint) => {
    const status = getBlueprintStatus(blueprint);
    acc[status]++;
    return acc;
  }, { active: 0, partial: 0, gap: 0 });
}
