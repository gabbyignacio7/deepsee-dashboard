// ARTEMIS Foundation Data - Updated January 26, 2026 at 12:40 PM MT
// Source: JIRA Extract
// CRITICAL: 0% of ARTEMIS platform work started - all 27 child tickets still in To Do

export interface ArtemisEpic {
  key: string;
  summary: string;
  status: "TO DO" | "IN PROGRESS" | "DONE";
  sprint: string;
  percentComplete: number;
  assignee: string;
  pillar: string;
  jiraUrl: string;
  childrenTotal?: number;
  childrenDone?: number;
}

export const artemisFoundation: ArtemisEpic[] = [
  {
    key: "PR-1561",
    summary: "DeepSee Agentic Platform",
    status: "TO DO",
    sprint: "Backlog",
    percentComplete: 0,
    assignee: "Brandon Baguley",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1561"
  },
  {
    key: "PR-1562",
    summary: "Infrastructure & Deployment",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1562"
  },
  {
    key: "PR-1563",
    summary: "Agent Orchestration Platform",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1563"
  },
  {
    key: "PR-1564",
    summary: "Identity & Access Management",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1564"
  },
  {
    key: "PR-1565",
    summary: "Data Ingestion & Content",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "DeepGraph",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1565"
  },
  {
    key: "PR-1566",
    summary: "Observability & Governance",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Process Certainty",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1566"
  },
  {
    key: "BACK-1680",
    summary: "Platform Infrastructure - ARTEMIS Foundation",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1680",
    childrenTotal: 18,
    childrenDone: 0
  },
  {
    key: "BACK-1704",
    summary: "Microsoft Fabric Integration",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1704",
    childrenTotal: 9,
    childrenDone: 0
  },
  {
    key: "BACK-1681",
    summary: "Kafka-based message bus for agents",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1681"
  },
  {
    key: "BACK-1682",
    summary: "Agent message schema and contracts",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1682"
  },
  {
    key: "BACK-1683",
    summary: "Dead letter queue handling",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1683"
  },
  {
    key: "BACK-1684",
    summary: "Message routing and orchestration layer",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1684"
  },
  {
    key: "BACK-1685",
    summary: "Message tracing and correlation IDs",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Process Certainty",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1685"
  },
  {
    key: "BACK-1686",
    summary: "Information Graph enhanced infrastructure",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "DeepGraph",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1686"
  },
  {
    key: "BACK-1687",
    summary: "Vector Store optimization",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "DeepGraph",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1687"
  },
  {
    key: "BACK-1688",
    summary: "Document Store indexing improvements",
    status: "TO DO",
    sprint: "2026-S2",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Agentic Engine",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1688"
  }
];

export interface PillarCoverage {
  total: number;
  started: number;
}

export interface ArtemisReadiness {
  totalEpics: number;
  started: number;
  completed: number;
  readinessPct: number;
  pillarCoverage: Record<string, PillarCoverage>;
}

export const artemisReadiness: ArtemisReadiness = {
  totalEpics: 16,
  started: 0,
  completed: 0,
  readinessPct: 0,
  pillarCoverage: {
    "Platform": { total: 6, started: 0 },
    "Automation & Orchestration": { total: 3, started: 0 },
    "Process Certainty": { total: 2, started: 0 },
    "DeepGraph": { total: 3, started: 0 },
    "Agentic Engine": { total: 1, started: 0 },
    "Complex Services": { total: 0, started: 0 },
    "Blueprints": { total: 0, started: 0 },
    "Integrations": { total: 0, started: 0 }
  }
};

// ARTEMIS Alert - Critical
export const artemisAlert = {
  severity: "CRITICAL" as const,
  message: "0% of ARTEMIS platform work started despite being in sprint - all 27 child tickets still in To Do"
};

// Get epics by pillar
export function getEpicsByPillar(pillar: string): ArtemisEpic[] {
  return artemisFoundation.filter(epic => epic.pillar === pillar);
}

// Get all pillars with epics
export function getPillarsWithEpics(): string[] {
  return [...new Set(artemisFoundation.map(epic => epic.pillar))];
}

// Get epics by status
export function getEpicsByStatus(status: "TO DO" | "IN PROGRESS" | "DONE"): ArtemisEpic[] {
  return artemisFoundation.filter(epic => epic.status === status);
}

// Calculate readiness percentage
export function calculateReadiness(): number {
  const completed = artemisFoundation.filter(epic => epic.status === "DONE").length;
  return Math.round((completed / artemisFoundation.length) * 100);
}

// Get epics with children counts
export function getEpicsWithChildren(): ArtemisEpic[] {
  return artemisFoundation.filter(epic => epic.childrenTotal !== undefined);
}
