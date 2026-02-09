// ARTEMIS Foundation Data - Updated February 9, 2026 at 10:14 AM MT
// Source: JIRA Extract - Sprint 2026-S3 (Day 11 of 15)
// CRITICAL ALERT: 0 of 12 foundation epics started. Only 3 ARTEMIS tickets actively worked.

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
    sprint: "2026-S3",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1680"
  },
  {
    key: "BACK-1681",
    summary: "Implement Kafka-based message bus for agent communication",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1681"
  },
  {
    key: "BACK-1682",
    summary: "Create agent message schema and contracts",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1682"
  },
  {
    key: "BACK-1683",
    summary: "Implement dead letter queue handling",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Platform",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1683"
  },
  {
    key: "BACK-1684",
    summary: "Build message routing and orchestration layer",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1684"
  },
  {
    key: "BACK-1685",
    summary: "Add message tracing and correlation IDs",
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
    summary: "Vector Store optimization for embeddings",
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
    summary: "DeepSee Fabric Integration - Microsoft Ecosystem",
    status: "TO DO",
    sprint: "Unassigned",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/BACK-1704"
  },
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
    key: "PR-1563",
    summary: "Agent Orchestration Platform",
    status: "TO DO",
    sprint: "Planning",
    percentComplete: 0,
    assignee: "Unassigned",
    pillar: "Automation & Orchestration",
    jiraUrl: "https://deepsee.atlassian.net/browse/PR-1563"
  }
];

// ARTEMIS tickets actively in progress
export const inProgressArtemis = [
  { key: "BACK-1802", summary: "Create Process Model Schema", assignee: "Darius Ouderkirk", points: 8 },
  { key: "BACK-1911", summary: "Complete artemis-platform Project Setup", assignee: "Lane Terry", points: 5 }
];

// ARTEMIS tickets done in S3
export const doneArtemis = [
  { key: "BACK-1816", summary: "Create Content Understanding client", assignee: "Kalvin Willison", points: 3 }
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

export const artemisSummary = {
  totalFoundationEpics: 12,
  startedEpics: 0,
  totalArtemisTickets: 36,
  inProgressCount: 2,
  doneCount: 1,
  status: "RED — 0 of 12 foundation epics started. Only 3 ARTEMIS tickets actively worked."
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
