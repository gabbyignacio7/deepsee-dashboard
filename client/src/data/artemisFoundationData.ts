// ARTEMIS Foundation Data - Updated January 18, 2026
// Source: JIRA Extract

export interface ArtemisEpic {
  key: string;
  summary: string;
  status: "TO DO" | "IN PROGRESS" | "DONE";
  sprint: string;
  percentComplete: number;
  assignee: string;
  pillar: string;
  jiraUrl: string;
}

export const artemisFoundation: ArtemisEpic[] = [
  {
    key: "BACK-1680",
    summary: "Platform Infrastructure - ARTEMIS Foundation",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1680"
  },
  {
    key: "BACK-1681",
    summary: "Kafka-based message bus for agents",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1681"
  },
  {
    key: "BACK-1682",
    summary: "Agent message schema and contracts",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1682"
  },
  {
    key: "BACK-1683",
    summary: "Dead letter queue handling",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1683"
  },
  {
    key: "BACK-1684",
    summary: "Message routing and orchestration layer",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1684"
  },
  {
    key: "BACK-1685",
    summary: "Message tracing and correlation IDs",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Process Certainty",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1685"
  },
  {
    key: "BACK-1686",
    summary: "Information Graph enhanced infrastructure",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "DeepGraph",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1686"
  },
  {
    key: "BACK-1687",
    summary: "Vector Store optimization",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "DeepGraph",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1687"
  },
  {
    key: "BACK-1688",
    summary: "Document Store indexing improvements",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Agentic Engine",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1688"
  },
  {
    key: "BACK-1704",
    summary: "ARTEMIS Agent Orchestration (Fabric Integration)",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1704"
  },
  {
    key: "PR-1561",
    summary: "DeepSee Platform Initiative",
    status: "TO DO",
    sprint: "Backlog",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1561"
  },
  {
    key: "PR-1563",
    summary: "Agent Orchestration",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1563"
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
  totalEpics: 12,
  started: 0,
  completed: 0,
  readinessPct: 0,
  pillarCoverage: {
    "Platform": { total: 4, started: 0 },
    "Automation & Orchestration": { total: 3, started: 0 },
    "Process Certainty": { total: 1, started: 0 },
    "DeepGraph": { total: 2, started: 0 },
    "Agentic Engine": { total: 1, started: 0 },
    "Complex Services": { total: 0, started: 0 },
    "Blueprints": { total: 0, started: 0 },
    "Integrations": { total: 0, started: 0 }
  }
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
