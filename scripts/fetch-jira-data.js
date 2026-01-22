/**
 * JIRA Data Fetch Script
 * 
 * Fetches issues from JIRA Cloud REST API and generates TypeScript data files
 * for the dashboard as documented in DATA_SOURCES.md.
 * 
 * Generated files:
 *   - client/src/data/sprintData.ts - Sprint metrics and ticket details
 *   - client/src/data/blockedItemsData.ts - Blocked tickets
 *   - client/src/data/jiraMetrics.ts - JIRA metrics data
 *   - client/public/data/jira.json - Raw ticket data (for dashboard-context)
 * 
 * Environment variables required:
 *   JIRA_BASE_URL - Your Jira Cloud URL (e.g., https://deepsee.atlassian.net)
 *   JIRA_USER_EMAIL - Email of user with API access
 *   JIRA_API_TOKEN - API token from Atlassian account settings
 * 
 * Usage:
 *   node scripts/fetch-jira-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;

// Base project filter used across all queries
const PROJECT_FILTER = `project IN ("Product Roadmap", "Back End Development", "Security & Compliance", FILBERT, "Core-Infrastructure", "Front End Development", "Neuro-Symbolic Intelligence", InfraRig)`;

// JQL Queries for different data sets
const JQL_QUERIES = {
  // Current active sprint tickets
  openSprints: `${PROJECT_FILTER} AND Sprint in openSprints() ORDER BY Rank ASC`,
  
  // Future sprint tickets (planned work)
  futureSprints: `${PROJECT_FILTER} AND Sprint in futureSprints() ORDER BY Rank ASC`,
  
  // Closed/historical sprints (for sprint comparison data)
  closedSprints: `${PROJECT_FILTER} AND Sprint in closedSprints() ORDER BY updated DESC`,
  
  // Backlog items (no sprint assigned, not done)
  backlog: `${PROJECT_FILTER} AND Sprint is EMPTY AND status != Done ORDER BY priority DESC, Rank ASC`,
};

// Custom Field IDs
const CUSTOM_FIELDS = {
  sprint: 'customfield_10021',           // Sprint field (array of sprint objects)
  storyPoints: 'customfield_10023',      // Story Points (number)
  tShirtSize: 'customfield_10105',       // T-Shirt Size (if available)
  epicLink: 'customfield_10014',         // Epic Link (string - issue key)
};

// Fields to request from JIRA API
const JIRA_FIELDS = [
  'key',
  'summary',
  'status',
  'project',
  'priority',
  'assignee',
  'created',
  'updated',
  'duedate',
  'resolutiondate',
  'parent',
  'labels',
  CUSTOM_FIELDS.sprint,
  CUSTOM_FIELDS.storyPoints,
  CUSTOM_FIELDS.tShirtSize,
  CUSTOM_FIELDS.epicLink,
].filter(Boolean);

const PAGE_SIZE = 100;

// Status mappings
const STATUS_MAP = {
  'To Do': 'toDo',
  'In Progress': 'inProgress',
  'Code Review': 'codeReview',
  'Blocked': 'blocked',
  'Done': 'done',
};

// Category classification keywords
const ARTEMIS_KEYWORDS = ['artemis', 'mercury', 'parser', 'blueprint', 'platform', 'fabric', 'agent', 'feel', 'nsi'];
const INFRA_KEYWORDS = ['infrastructure', 'infra', 'ci/cd', 'devops', 'kubernetes', 'k8s', 'docker', 'security', 'ubuntu', 'base image'];
const CLIENT_KEYWORDS = ['colony', 'dtcc', 'broadridge', 'accenture', 'fis', 'bbva', 'sunwest', 'deep recon', 'deeprecon', 'deep pilot', 'client'];

// Feature mapping rules based on keywords in ticket summary
const featureMappingRules = {
  // Client-specific keywords
  'broadridge': 'F-031',
  'dtcc': 'F-026',
  'colony bank': 'F-036',
  'colony': 'F-036',
  'fis': 'F-037',
  'accenture': 'F-038',
  'jpmorgan': 'F-028',
  'goldman sachs': 'F-029',
  
  // Functionality keywords
  'reconciliation': 'F-002',
  'reconcile': 'F-002',
  'email': 'F-001',
  'trade': 'F-002',
  'extraction': 'F-001',
  'dashboard': 'F-004',
  'tenant': 'F-003',
  'infrastructure': 'F-003',
  'infra': 'F-003',
  'security': 'F-005',
  'crowdstrike': 'F-005',
  'scanning': 'F-005',
  'blockly': 'F-004',
  'custom field': 'F-004',
  'automation': 'F-001',
  'pdf': 'F-001',
  'conversion': 'F-001',
  
  // Platform keywords
  '[platform]': 'F-PLATFORM',
  'platform': 'F-PLATFORM',
  'fabric': 'F-FABRIC',
  'artemis': 'F-PLATFORM',
  'message bus': 'F-PLATFORM',
  'kafka': 'F-PLATFORM',
  'vector store': 'F-PLATFORM',
  
  // Agent keywords
  'mercury': 'F-MERCURY',
  'deep recon': 'F-DEEPRECON',
  'deeprecon': 'F-DEEPRECON',
};

// Project key to default feature mapping
const projectKeyMapping = {
  'PR': 'F-047',    // Product Roadmap Planning
  'SC': 'F-005',    // Security & Compliance
  'UI': 'F-004',    // UI/UX Enhancements (Front End Development)
  'CI': 'F-003',    // Core Infrastructure
  'BACK': 'F-003',  // Backend Development -> Infrastructure
  'FB': 'F-001',    // FILBERT -> Automation/Processing
  'NSI': 'F-PLATFORM', // Neuro-Symbolic Intelligence
  'IR': 'F-003',    // InfraRig -> Infrastructure
};

/**
 * Auto-map ticket to feature based on title keywords and project key
 */
function autoMapTicketToFeature(title, projectKey) {
  if (!title) return '0';
  
  const lowerTitle = title.toLowerCase();
  
  // Check title for keywords (order matters - more specific first)
  for (const [keyword, featureId] of Object.entries(featureMappingRules)) {
    if (lowerTitle.includes(keyword)) {
      return featureId;
    }
  }
  
  // Fallback to project key mapping
  return projectKeyMapping[projectKey] || '0';
}

// ============================================================================
// JIRA API CLIENT
// ============================================================================

class JiraClient {
  constructor(baseUrl, email, apiToken) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
  }

  async request(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`JIRA API error (${response.status}): ${errorBody}`);
    }

    return response.json();
  }

  async searchIssues(jql, fields = [], options = {}) {
    const allIssues = [];
    let nextPageToken = null;
    let isLast = false;
    let pageCount = 0;
    const maxResults = options.maxResults || 500; // Default limit to prevent excessive fetching

    console.log(`Fetching issues with JQL: ${jql.substring(0, 80)}...`);

    while (!isLast && allIssues.length < maxResults) {
      const params = new URLSearchParams({
        jql,
        maxResults: Math.min(PAGE_SIZE, maxResults - allIssues.length).toString(),
        fields: fields.join(','),
        expand: options.expand || 'names',
      });

      if (nextPageToken) {
        params.set('nextPageToken', nextPageToken);
      }

      const response = await this.request(`/rest/api/3/search/jql?${params}`);
      
      pageCount++;
      allIssues.push(...response.issues);
      
      isLast = response.isLast === true;
      nextPageToken = response.nextPageToken;

      console.log(`  Page ${pageCount}: fetched ${response.issues.length} issues (total: ${allIssues.length})`);

      if (response.issues.length === 0) break;
    }

    return allIssues;
  }
  
  /**
   * Get sprints from a board using the Agile API
   */
  async getBoardSprints(boardId, state = 'active,future') {
    try {
      const response = await this.request(`/rest/agile/1.0/board/${boardId}/sprint?state=${state}&maxResults=20`);
      return response.values || [];
    } catch (error) {
      console.warn(`  Warning: Could not fetch board sprints: ${error.message}`);
      return [];
    }
  }
  
  /**
   * Find boards for project
   */
  async findBoards(projectKey) {
    try {
      const response = await this.request(`/rest/agile/1.0/board?projectKeyOrId=${projectKey}&maxResults=5`);
      return response.values || [];
    } catch (error) {
      console.warn(`  Warning: Could not fetch boards: ${error.message}`);
      return [];
    }
  }
}

// ============================================================================
// DATA EXTRACTION HELPERS
// ============================================================================

function extractSprintInfo(sprintField) {
  if (!sprintField || !Array.isArray(sprintField) || sprintField.length === 0) {
    return null;
  }
  
  // Find active sprint, or use first one
  const sprint = sprintField.find(s => s.state === 'active') || sprintField[0];
  
  return {
    id: sprint.id,
    name: sprint.name || '',
    state: sprint.state || 'active',
    startDate: sprint.startDate ? sprint.startDate.split('T')[0] : null,
    endDate: sprint.endDate ? sprint.endDate.split('T')[0] : null,
  };
}

function classifyTicket(summary, projectKey, labels = []) {
  const lowerSummary = (summary || '').toLowerCase();
  const lowerLabels = labels.map(l => l.toLowerCase());
  const combined = lowerSummary + ' ' + lowerLabels.join(' ');
  
  // Check for ARTEMIS/Platform work
  if (ARTEMIS_KEYWORDS.some(kw => combined.includes(kw))) {
    return 'artemis';
  }
  
  // Check for Client work
  if (CLIENT_KEYWORDS.some(kw => combined.includes(kw))) {
    return 'client';
  }
  
  // Check for Infrastructure work
  if (INFRA_KEYWORDS.some(kw => combined.includes(kw)) || projectKey === 'CI' || projectKey === 'SC') {
    return 'infrastructure';
  }
  
  // Default based on project
  if (projectKey === 'UI') return 'client';
  if (projectKey === 'BACK') return 'artemis';
  
  return 'client'; // Default
}

function getDaysInStatus(createdDate, updatedDate) {
  const now = new Date();
  const updated = new Date(updatedDate || createdDate);
  return Math.floor((now - updated) / (1000 * 60 * 60 * 24));
}

/**
 * Extract accurate blocked date from changelog
 * Finds when status changed TO "Blocked"
 */
function getBlockedDateFromChangelog(changelog) {
  if (!changelog || !changelog.histories) return null;
  
  // Find the most recent status change TO Blocked
  for (const history of changelog.histories) {
    for (const item of history.items || []) {
      if (item.field === 'status' && item.toString === 'Blocked') {
        return history.created;
      }
    }
  }
  return null;
}

/**
 * Calculate days blocked using changelog data
 */
function calculateDaysBlocked(issue) {
  const blockedDate = getBlockedDateFromChangelog(issue.changelog);
  
  if (blockedDate) {
    const now = new Date();
    const blocked = new Date(blockedDate);
    return Math.floor((now - blocked) / (1000 * 60 * 60 * 24));
  }
  
  // Fallback to days since update if no changelog
  return getDaysInStatus(issue.fields?.created, issue.fields?.updated);
}

function getDaysSinceDate(dateStr) {
  if (!dateStr) return 0;
  const now = new Date();
  const date = new Date(dateStr);
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
}

function formatDateForDisplay(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString();
}

function getDisplayTimestamp() {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Denver'
  }) + ' MT';
}

// ============================================================================
// DATA PROCESSING
// ============================================================================

function processIssues(rawIssues, options = {}) {
  const tickets = [];
  const sprintMap = new Map();
  const { useChangelog = false, sprintState = 'active' } = options;
  
  for (const issue of rawIssues) {
    const fields = issue.fields || {};
    const sprintField = fields[CUSTOM_FIELDS.sprint];
    const sprintInfo = extractSprintInfo(sprintField);
    const storyPoints = fields[CUSTOM_FIELDS.storyPoints] || 0;
    const status = fields.status?.name || 'To Do';
    const statusKey = STATUS_MAP[status] || 'toDo';
    const projectKey = fields.project?.key || '';
    const summary = fields.summary || '';
    const labels = fields.labels || [];
    
    // Calculate days blocked/in status - use changelog if available
    let daysInStatus;
    if (useChangelog && statusKey === 'blocked') {
      daysInStatus = calculateDaysBlocked(issue);
    } else {
      daysInStatus = getDaysInStatus(fields.created, fields.updated);
    }
    
    // Track sprint metadata
    if (sprintInfo && sprintInfo.name) {
      if (!sprintMap.has(sprintInfo.name)) {
        sprintMap.set(sprintInfo.name, {
          ...sprintInfo,
          state: sprintState,
          tickets: [],
          totalPoints: 0,
          statusCounts: { toDo: 0, inProgress: 0, codeReview: 0, blocked: 0, done: 0 },
          pointsByStatus: { toDo: 0, inProgress: 0, codeReview: 0, blocked: 0, done: 0 },
          mix: { artemis: 0, client: 0, infrastructure: 0 },
        });
      }
      
      const sprint = sprintMap.get(sprintInfo.name);
      const category = classifyTicket(summary, projectKey, labels);
      
      sprint.tickets.push(issue);
      sprint.totalPoints += storyPoints;
      sprint.statusCounts[statusKey] = (sprint.statusCounts[statusKey] || 0) + 1;
      sprint.pointsByStatus[statusKey] = (sprint.pointsByStatus[statusKey] || 0) + storyPoints;
      sprint.mix[category] = (sprint.mix[category] || 0) + 1;
    }
    
    // Build ticket object
    tickets.push({
      key: issue.key,
      summary,
      status,
      statusKey,
      projectKey,
      projectName: fields.project?.name || '',
      assignee: fields.assignee?.displayName || 'Unassigned',
      priority: fields.priority?.name || 'Medium',
      storyPoints,
      sprintName: sprintInfo?.name || '',
      sprintInfo,
      created: fields.created,
      updated: fields.updated,
      dueDate: fields.duedate,
      resolutionDate: fields.resolutiondate,
      epicKey: fields.parent?.key || fields[CUSTOM_FIELDS.epicLink] || '',
      labels,
      category: classifyTicket(summary, projectKey, labels),
      daysInStatus,
    });
  }
  
  return { tickets, sprintMap };
}

// ============================================================================
// TYPESCRIPT FILE GENERATORS
// ============================================================================

function generateSprintDataTs(sprintMap, tickets, timestamp, extraData = {}) {
  const { backlogTickets = [], futureTickets = [] } = extraData;
  
  // Sort sprints by name to get current, next, future
  const sprints = Array.from(sprintMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  
  const currentSprint = sprints.find(s => s.state === 'active') || sprints[0];
  
  // Find next sprint - look for future state first, then any sprint after current
  let nextSprint = sprints.find(s => s.state === 'future' && s.name > (currentSprint?.name || ''));
  if (!nextSprint) {
    nextSprint = sprints.find(s => s.name > (currentSprint?.name || '')) || null;
  }
  
  if (!currentSprint) {
    console.warn('Warning: No active sprint found');
    return null;
  }
  
  // Calculate days remaining
  const today = new Date();
  const endDate = currentSprint.endDate ? new Date(currentSprint.endDate) : new Date();
  const daysRemaining = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  
  // Calculate completion rate based on story points
  const completedPoints = currentSprint.pointsByStatus.done || 0;
  const totalPoints = currentSprint.totalPoints || 1;
  const completionRate = Math.round((completedPoints / totalPoints) * 100);
  
  // Calculate mix percentages
  const totalMix = currentSprint.mix.artemis + currentSprint.mix.client + currentSprint.mix.infrastructure;
  const mixPercentages = {
    artemis: totalMix > 0 ? Math.round((currentSprint.mix.artemis / totalMix) * 100) : 33,
    client: totalMix > 0 ? Math.round((currentSprint.mix.client / totalMix) * 100) : 34,
    infrastructure: totalMix > 0 ? Math.round((currentSprint.mix.infrastructure / totalMix) * 100) : 33,
  };
  
  // Determine assessment
  let assessment = 'balanced';
  if (mixPercentages.artemis >= 50) assessment = 'artemis-focused';
  else if (mixPercentages.client >= 50) assessment = 'client-heavy';
  
  // Get blocked items for the sprint
  const blockedTickets = tickets.filter(t => t.sprintName === currentSprint.name && t.statusKey === 'blocked');
  
  // Get high-risk rollover candidates (stale items, unassigned, low completion)
  const rolloverCandidates = tickets.filter(t => 
    t.sprintName === currentSprint.name && 
    t.statusKey !== 'done' &&
    (t.daysInStatus > 7 || t.assignee === 'Unassigned')
  );
  
  // Get ARTEMIS backlog items from dedicated backlog query
  // Prioritize items with 'artemis' category from actual backlog (no sprint assigned)
  const artemisBacklog = backlogTickets
    .filter(t => t.category === 'artemis')
    .slice(0, 10);
  
  // If not enough, supplement with To Do items not in current sprint
  if (artemisBacklog.length < 10) {
    const supplemental = tickets
      .filter(t => 
        t.category === 'artemis' && 
        t.statusKey === 'toDo' &&
        t.sprintName !== currentSprint.name &&
        !artemisBacklog.find(b => b.key === t.key)
      )
      .slice(0, 10 - artemisBacklog.length);
    artemisBacklog.push(...supplemental);
  }
  
  // Get next sprint items - use futureTickets if we have them
  let nextSprintTickets = [];
  if (nextSprint) {
    // First check futureTickets from the dedicated query
    nextSprintTickets = futureTickets.filter(t => t.sprintName === nextSprint.name);
    // If empty, fall back to checking tickets array
    if (nextSprintTickets.length === 0) {
      nextSprintTickets = tickets.filter(t => t.sprintName === nextSprint.name);
    }
  }
  const nextArtemisItems = nextSprintTickets.filter(t => t.category === 'artemis').slice(0, 12);
  const nextClientItems = nextSprintTickets.filter(t => t.category === 'client').slice(0, 9);

  const content = `// Sprint Data - Auto-generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
// Source: JIRA API - Automated fetch
// DO NOT EDIT MANUALLY - This file is regenerated by scripts/fetch-jira-data.js

export const EXTRACTION_TIMESTAMP = "${timestamp}";
export const DATA_SOURCE = "JIRA API - Automated";

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

// Current Sprint Data - ${currentSprint.name} (Active)
export const CURRENT_SPRINT: Sprint = {
  id: '${currentSprint.name}',
  name: 'Sprint ${currentSprint.name}',
  startDate: '${currentSprint.startDate || ''}',
  endDate: '${currentSprint.endDate || ''}',
  status: 'active',
  totalTickets: ${currentSprint.tickets.length},
  completion: {
    toDo: ${currentSprint.statusCounts.toDo || 0},
    blocked: ${currentSprint.statusCounts.blocked || 0},
    inProgress: ${currentSprint.statusCounts.inProgress || 0},
    codeReview: ${currentSprint.statusCounts.codeReview || 0},
    done: ${currentSprint.statusCounts.done || 0}
  },
  completionRate: ${completionRate},
  daysRemaining: ${daysRemaining},
  likelyRollovers: ${rolloverCandidates.length},
  mix: {
    artemis: ${mixPercentages.artemis},
    client: ${mixPercentages.client},
    infrastructure: ${mixPercentages.infrastructure}
  },
  assessment: '${assessment}'
};

${nextSprint ? `export const NEXT_SPRINT: Sprint = {
  id: '${nextSprint.name}',
  name: 'Sprint ${nextSprint.name}',
  startDate: '${nextSprint.startDate || ''}',
  endDate: '${nextSprint.endDate || ''}',
  status: 'planned',
  totalTickets: ${nextSprint.tickets.length},
  completion: {
    toDo: ${nextSprint.statusCounts.toDo || 0},
    blocked: ${nextSprint.statusCounts.blocked || 0},
    inProgress: ${nextSprint.statusCounts.inProgress || 0},
    codeReview: ${nextSprint.statusCounts.codeReview || 0},
    done: ${nextSprint.statusCounts.done || 0}
  },
  completionRate: 0,
  daysRemaining: ${Math.ceil((new Date(nextSprint.endDate || Date.now()) - new Date()) / (1000 * 60 * 60 * 24))},
  mix: {
    artemis: 50,
    client: 30,
    infrastructure: 20
  },
  assessment: 'artemis-focused'
};` : `export const NEXT_SPRINT: Sprint = {
  id: 'TBD',
  name: 'Sprint TBD',
  startDate: '',
  endDate: '',
  status: 'planned',
  totalTickets: 0,
  completion: { toDo: 0, blocked: 0, inProgress: 0, codeReview: 0, done: 0 },
  completionRate: 0,
  daysRemaining: 14,
  mix: { artemis: 50, client: 30, infrastructure: 20 },
  assessment: 'artemis-focused'
};`}

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
${nextArtemisItems.map(t => `  { key: '${t.key}', summary: '${t.summary.replace(/'/g, "\\'")}', category: '${t.category}' }`).join(',\n')}
];

export const NEXT_SPRINT_CLIENT_ITEMS: NextSprintClientItem[] = [
${nextClientItems.map(t => `  { key: '${t.key}', summary: '${t.summary.replace(/'/g, "\\'")}', client: '${t.projectName}' }`).join(',\n')}
];

// Rollover candidates - High risk items that may not complete
export const ROLLOVER_HIGH_RISK: SprintItem[] = [
${rolloverCandidates.slice(0, 15).map(t => `  { key: '${t.key}', summary: '${t.summary.replace(/'/g, "\\'")}', category: '${t.category.toUpperCase()}', staleDays: ${t.daysInStatus}${t.assignee === 'Unassigned' ? ', unassigned: true' : ''} }`).join(',\n')}
];

// Blocked Items in current sprint
export const BLOCKED_ITEMS: SprintItem[] = [
${blockedTickets.map(t => `  { key: '${t.key}', summary: '${t.summary.replace(/'/g, "\\'")}', category: '${t.category}', blockedDays: ${t.daysInStatus}${t.assignee === 'Unassigned' ? ', unassigned: true' : ''} }`).join(',\n')}
];

// ARTEMIS Backlog Items
export const ARTEMIS_BACKLOG: SprintItem[] = [
${artemisBacklog.map(t => `  { key: '${t.key}', summary: '${t.summary.replace(/'/g, "\\'")}', priority: '${t.priority}'${t.category === 'artemis' ? ', recommended: true' : ''} }`).join(',\n')}
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
      sprint: \`\${CURRENT_SPRINT.name} (Current)\`,
      ARTEMIS: CURRENT_SPRINT.mix.artemis,
      Client: CURRENT_SPRINT.mix.client,
      Infrastructure: CURRENT_SPRINT.mix.infrastructure
    },
    {
      sprint: \`\${NEXT_SPRINT.name} (Next)\`,
      ARTEMIS: NEXT_SPRINT.mix.artemis,
      Client: NEXT_SPRINT.mix.client,
      Infrastructure: NEXT_SPRINT.mix.infrastructure
    },
    {
      sprint: \`\${FUTURE_SPRINT.name} (Future)\`,
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
`;

  return content;
}

function generateBlockedItemsDataTs(tickets, timestamp) {
  const blockedTickets = tickets.filter(t => t.statusKey === 'blocked');
  const sprintBlockedTickets = blockedTickets.filter(t => t.sprintName);
  
  // Determine priority based on days blocked
  const getPriority = (days) => {
    if (days >= 30) return 'P0';
    if (days >= 14) return 'P1';
    return 'P2';
  };
  
  const content = `// Blocked Items Data - Auto-generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
// Source: JIRA API - Automated fetch
// DO NOT EDIT MANUALLY - This file is regenerated by scripts/fetch-jira-data.js

export interface BlockedItem {
  key: string;
  summary: string;
  assignee: string;
  daysBlocked: number;
  category: string;
  priority: "P0" | "P1" | "P2";
  jiraUrl: string;
  reason?: string;
}

// Current Sprint Blocked Items (${sprintBlockedTickets.length} items requiring immediate action)
export const sprintBlockedItems: BlockedItem[] = [
${sprintBlockedTickets.map(t => `  {
    key: "${t.key}",
    summary: "${t.summary.replace(/"/g, '\\"')}",
    assignee: "${t.assignee}",
    daysBlocked: ${t.daysInStatus},
    category: "${t.category}",
    priority: "${getPriority(t.daysInStatus)}",
    jiraUrl: "${JIRA_BASE_URL}/browse/${t.key}"
  }`).join(',\n')}
];

// All blocked items including backlog
export const blockedItems: BlockedItem[] = [
${blockedTickets.map(t => `  {
    key: "${t.key}",
    summary: "${t.summary.replace(/"/g, '\\"')}",
    assignee: "${t.assignee}",
    daysBlocked: ${t.daysInStatus},
    category: "${t.category}",
    priority: "${getPriority(t.daysInStatus)}",
    jiraUrl: "${JIRA_BASE_URL}/browse/${t.key}"
  }`).join(',\n')}
];

export const blockedSummary = {
  total: ${blockedTickets.length},
  sprintBlocked: ${sprintBlockedTickets.length},
  p0Count: ${blockedTickets.filter(t => getPriority(t.daysInStatus) === 'P0').length},
  p1Count: ${blockedTickets.filter(t => getPriority(t.daysInStatus) === 'P1').length},
  p2Count: ${blockedTickets.filter(t => getPriority(t.daysInStatus) === 'P2').length},
  avgDaysBlocked: ${sprintBlockedTickets.length > 0 ? Math.round(sprintBlockedTickets.reduce((sum, t) => sum + t.daysInStatus, 0) / sprintBlockedTickets.length) : 0},
  oldestBlocked: "${blockedTickets.length > 0 ? blockedTickets.sort((a, b) => b.daysInStatus - a.daysInStatus)[0].key + ' (' + blockedTickets.sort((a, b) => b.daysInStatus - a.daysInStatus)[0].daysInStatus + ' days)' : 'None'}",
  unassignedCount: ${blockedTickets.filter(t => t.assignee === 'Unassigned').length}
};

export function getBlockedByPriority(priority: "P0" | "P1" | "P2"): BlockedItem[] {
  return blockedItems.filter(item => item.priority === priority);
}

export function getBlockedByAge(): BlockedItem[] {
  return [...blockedItems].sort((a, b) => b.daysBlocked - a.daysBlocked);
}

export function getCriticalBlocked(): BlockedItem[] {
  return blockedItems.filter(item => item.priority === "P0" || item.priority === "P1");
}

export function getBlockedByCategory(category: string): BlockedItem[] {
  return blockedItems.filter(item => item.category.includes(category));
}
`;

  return content;
}

function parseExistingSprintComparison(filePath) {
  // Read existing file to preserve historical sprint comparison data
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the sprintComparison section
    const startMatch = content.match(/export const sprintComparison\s*=\s*\{/);
    if (!startMatch) return {};
    
    const startIdx = startMatch.index + startMatch[0].length;
    
    // Find matching closing brace by counting braces
    let braceCount = 1;
    let endIdx = startIdx;
    for (let i = startIdx; i < content.length && braceCount > 0; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      endIdx = i;
    }
    
    const innerContent = content.substring(startIdx, endIdx);
    
    // Parse each entry line by line
    const entries = {};
    const lines = innerContent.split('\n');
    
    for (const line of lines) {
      // Match pattern: key: { sprint: "...", committed: N, completed: N, rate: N.N, status?: "..." }
      const match = line.match(/^\s*(\w+):\s*\{\s*sprint:\s*["']([^"']+)["'],\s*committed:\s*(\d+),\s*completed:\s*(\d+),\s*rate:\s*([\d.]+)(?:,\s*status:\s*["']([^"']+)["'])?\s*\}/);
      if (match) {
        entries[match[1]] = {
          sprint: match[2],
          committed: parseInt(match[3]),
          completed: parseInt(match[4]),
          rate: parseFloat(match[5]),
          status: match[6] || undefined
        };
      }
    }
    
    console.log(`  Preserved ${Object.keys(entries).length} historical sprint comparison entries`);
    return entries;
  } catch (error) {
    console.log(`  No existing sprint comparison data found (${error.message})`);
  }
  return {};
}

function computeEpicProgress(tickets) {
  // Group tickets by epicKey and compute progress
  const epicMap = new Map();
  
  for (const ticket of tickets) {
    if (!ticket.epicKey) continue;
    
    if (!epicMap.has(ticket.epicKey)) {
      epicMap.set(ticket.epicKey, {
        key: ticket.epicKey,
        tickets: [],
        doneCount: 0,
        totalCount: 0
      });
    }
    
    const epic = epicMap.get(ticket.epicKey);
    epic.tickets.push(ticket);
    epic.totalCount++;
    if (ticket.statusKey === 'done') {
      epic.doneCount++;
    }
  }
  
  // Convert to EpicProgress format
  const epicProgress = [];
  for (const [key, epic] of epicMap) {
    if (epic.totalCount < 2) continue; // Skip epics with very few tickets
    
    const progress = Math.round((epic.doneCount / epic.totalCount) * 100);
    let status = 'not_started';
    if (progress === 100) status = 'complete';
    else if (progress > 0 || epic.tickets.some(t => t.statusKey === 'inProgress')) status = 'in_progress';
    
    // Get description from first ticket's summary or use key
    const firstTicket = epic.tickets[0];
    const description = firstTicket ? firstTicket.summary.substring(0, 60) : key;
    
    epicProgress.push({
      key,
      description: `${key} - ${epic.totalCount} tickets`,
      progress,
      status
    });
  }
  
  // Sort by progress (in_progress first, then not_started)
  return epicProgress
    .sort((a, b) => {
      if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
      if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;
      return b.progress - a.progress;
    })
    .slice(0, 10); // Limit to top 10 epics
}

function generateJiraMetricsTs(sprintMap, tickets, timestamp, existingFilePath, extraData = {}) {
  const { closedSprintMap = new Map(), backlogTickets = [] } = extraData;
  
  const sprints = Array.from(sprintMap.values());
  const currentSprint = sprints.find(s => s.state === 'active') || sprints[0];
  
  if (!currentSprint) {
    return null;
  }
  
  const sprintTickets = tickets.filter(t => t.sprintName === currentSprint.name);
  const totalPoints = currentSprint.totalPoints || 0;
  const completedPoints = currentSprint.pointsByStatus.done || 0;
  const inProgressPoints = currentSprint.pointsByStatus.inProgress || 0;
  const notStartedPoints = totalPoints - completedPoints - inProgressPoints;
  const completionRate = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
  
  // Calculate days remaining
  const today = new Date();
  const endDate = currentSprint.endDate ? new Date(currentSprint.endDate) : new Date();
  const daysRemaining = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  
  // Engineer stats
  const engineerTickets = {};
  for (const t of sprintTickets) {
    if (t.assignee && t.assignee !== 'Unassigned') {
      engineerTickets[t.assignee] = (engineerTickets[t.assignee] || 0) + 1;
    }
  }
  const topEngineers = Object.entries(engineerTickets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, tickets: count }));
  
  // Long running tickets (blocked or stale)
  const longRunning = sprintTickets
    .filter(t => t.statusKey === 'blocked' || t.daysInStatus > 14)
    .sort((a, b) => b.daysInStatus - a.daysInStatus)
    .slice(0, 5);
  
  // Compute epic progress from ticket data
  const epicProgressData = computeEpicProgress(sprintTickets);
  
  // Preserve historical sprint comparison data from existing file
  const existingComparison = parseExistingSprintComparison(existingFilePath);
  
  // Build sprint comparison - merge historical, closed sprints from API, and current
  const sprintComparison = { ...existingComparison };
  
  // Add data from closed sprints fetched from API
  // Only include sprints matching YYYY-SN pattern (e.g., 2026-S1, 2025-S52)
  const sprintNamePattern = /^(\d{4})-S(\d+)$/i;
  
  for (const [name, closedSprint] of closedSprintMap) {
    const patternMatch = name.match(sprintNamePattern);
    
    // Skip sprints that don't match the YYYY-SN pattern
    if (!patternMatch) {
      continue;
    }
    
    const sprintKey = `s${patternMatch[2]}`; // e.g., "s1" from "2026-S1"
    
    // Only add if not already in existing data (preserve existing data)
    if (!sprintComparison[sprintKey]) {
      const closedTotal = closedSprint.totalPoints || 0;
      const closedCompleted = closedSprint.pointsByStatus?.done || 0;
      const closedRate = closedTotal > 0 ? Math.round((closedCompleted / closedTotal) * 100) : 0;
      
      sprintComparison[sprintKey] = {
        sprint: name,
        committed: closedTotal,
        completed: closedCompleted,
        rate: closedRate,
        status: 'complete'
      };
      console.log(`  Added historical sprint from API: ${name} (${closedCompleted}/${closedTotal} points, ${closedRate}%)`);
    }
  }
  
  // Update current sprint data
  const sprintNumMatch = currentSprint.name.match(/S(\d+)/i);
  const sprintKey = sprintNumMatch ? `s${sprintNumMatch[1]}` : currentSprint.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  sprintComparison[sprintKey] = {
    sprint: currentSprint.name,
    committed: totalPoints,
    completed: completedPoints,
    rate: completionRate,
    status: 'in_progress'
  };
  
  const displayTimestamp = getDisplayTimestamp();
  
  const content = `// JIRA Metrics Data - Auto-generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
// Source: JIRA API - Automated fetch
// DO NOT EDIT MANUALLY - This file is regenerated by scripts/fetch-jira-data.js

export interface JiraMetrics {
  lastUpdated: string;
  extractionSource: string;
  sprintInfo: {
    name: string;
    dates: string;
    daysRemaining: number;
    totalStoryPoints: number;
    avgVelocity: number;
    overCommitment: string;
  };
  overall: {
    totalActiveTickets: number;
    totalInProgress: number;
    totalToDo: number;
    totalCodeReview: number;
    totalBlocked: number;
    totalDone: number;
    totalWithStoryPoints: number;
  };
  storyPoints: {
    completed: number;
    inProgress: number;
    notStarted: number;
    completionRate: number;
  };
  engineerSummary: {
    activeEngineers: number;
    engineersWithNoTickets: string[];
    highestLoad: { name: string; tickets: number }[];
  };
  longRunningTickets: Array<{
    id: string;
    title: string;
    assignee: string;
    status: string;
    daysInStatus: number;
    warningLevel: 'critical' | 'warning' | 'normal';
    reason?: string;
  }>;
}

export const jiraMetrics: JiraMetrics = {
  lastUpdated: "${displayTimestamp}",
  extractionSource: "JIRA API - ${currentSprint.name}",

  sprintInfo: {
    name: "${currentSprint.name}",
    dates: "${currentSprint.startDate ? formatDateForDisplay(currentSprint.startDate) : ''} - ${currentSprint.endDate ? formatDateForDisplay(currentSprint.endDate) : ''}, 2026",
    daysRemaining: ${daysRemaining},
    totalStoryPoints: ${totalPoints},
    avgVelocity: 80,
    overCommitment: "${totalPoints > 80 ? Math.round(((totalPoints - 80) / 80) * 100) + '% over average velocity' : 'On track'}"
  },

  overall: {
    totalActiveTickets: ${sprintTickets.length},
    totalInProgress: ${currentSprint.statusCounts.inProgress || 0},
    totalToDo: ${currentSprint.statusCounts.toDo || 0},
    totalCodeReview: ${currentSprint.statusCounts.codeReview || 0},
    totalBlocked: ${currentSprint.statusCounts.blocked || 0},
    totalDone: ${currentSprint.statusCounts.done || 0},
    totalWithStoryPoints: ${sprintTickets.filter(t => t.storyPoints > 0).length}
  },

  storyPoints: {
    completed: ${completedPoints},
    inProgress: ${inProgressPoints},
    notStarted: ${Math.max(0, notStartedPoints)},
    completionRate: ${completionRate}
  },

  engineerSummary: {
    activeEngineers: ${Object.keys(engineerTickets).length},
    engineersWithNoTickets: [],
    highestLoad: [
${topEngineers.map(e => `      { name: "${e.name}", tickets: ${e.tickets} }`).join(',\n')}
    ]
  },

  longRunningTickets: [
${longRunning.map(t => `    {
      id: "${t.key}",
      title: "${t.summary.replace(/"/g, '\\"')}",
      assignee: "${t.assignee}",
      status: "${t.status}",
      daysInStatus: ${t.daysInStatus},
      warningLevel: "${t.daysInStatus >= 30 ? 'critical' : t.daysInStatus >= 14 ? 'warning' : 'normal'}"
    }`).join(',\n')}
  ]
};

export interface EpicProgress {
  key: string;
  description: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'complete';
}

export const epicProgress: EpicProgress[] = [
${epicProgressData.map(e => `  { key: "${e.key}", description: "${e.description.replace(/"/g, '\\"')}", progress: ${e.progress}, status: '${e.status}' }`).join(',\n')}
];

// Sprint Comparison Data - Historical data preserved, current sprint updated
export const sprintComparison = {
${Object.entries(sprintComparison).map(([key, data]) => `  ${key}: { sprint: "${data.sprint}", committed: ${data.committed}, completed: ${data.completed}, rate: ${data.rate}${data.status ? `, status: "${data.status}"` : ''} }`).join(',\n')}
};
`;

  return content;
}

/**
 * Load feature names from features.json for lookup
 */
function loadFeatureNames() {
  const featuresPath = path.join(__dirname, '..', 'client', 'public', 'data', 'features.json');
  
  try {
    const featuresData = JSON.parse(fs.readFileSync(featuresPath, 'utf-8'));
    const featureMap = {};
    
    for (const feature of featuresData) {
      featureMap[feature.Feature_ID] = feature.Feature_Name;
    }
    
    return featureMap;
  } catch (error) {
    console.warn(`Warning: Could not load features.json: ${error.message}`);
    return {};
  }
}

function generateJiraJson(tickets, featureNames) {
  // Transform to legacy jira.json format for dashboard-context.tsx compatibility
  return tickets.map(t => {
    // Apply feature mapping using the same logic as the original script
    const mappedFeatureId = autoMapTicketToFeature(t.summary, t.projectKey);
    const mappedFeatureName = featureNames[mappedFeatureId] || '';
    
    return {
      Ticket_ID: t.key,
      Ticket_Summary: t.summary,
      Status: t.status,
      Category: t.projectName,
      Project_Key: t.projectKey,
      Client_Name: ' ',
      T_Shirt_Size: ' ',
      Story_Points: t.storyPoints,
      Mapped_Feature_ID: mappedFeatureId,
      Mapped_Feature_Name: mappedFeatureName,
      Assigned_Engineer: t.assignee,
      Sprint: t.sprintName,
      Created_Date: t.created ? t.created.split('T')[0] : '',
      Target_Date: t.dueDate || '',
      Completed_Date: t.resolutionDate ? t.resolutionDate.split('T')[0] : '',
      Product_Proposed_To_Deprecate: 'N',
      Deprecation_Notes: '',
      Epic_Key: t.epicKey,
      Priority: t.priority,
    };
  });
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('========================================');
  console.log('   JIRA Data Fetch Script');
  console.log('========================================\n');

  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_USER_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) {
    console.error('Error: Missing required environment variables.');
    console.error('Required: JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN');
    process.exit(1);
  }

  console.log('Configuration:');
  console.log(`  Base URL: ${baseUrl}`);
  console.log(`  User: ${email}`);
  console.log(`  Token: ***${apiToken.slice(-4)}\n`);

  const client = new JiraClient(baseUrl, email, apiToken);
  const timestamp = getTimestamp();

  try {
    // --------------------------------------------------------
    // STEP 1: Fetch open sprint issues (with changelog for blocked items)
    // --------------------------------------------------------
    console.log('\n[1/5] Fetching OPEN sprint issues (with changelog)...');
    const openIssues = await client.searchIssues(
      JQL_QUERIES.openSprints, 
      JIRA_FIELDS, 
      { expand: 'names,changelog', maxResults: 500 }
    );
    console.log(`  Fetched ${openIssues.length} open sprint issues\n`);

    // --------------------------------------------------------
    // STEP 2: Fetch future sprint issues
    // --------------------------------------------------------
    console.log('[2/5] Fetching FUTURE sprint issues...');
    const futureIssues = await client.searchIssues(
      JQL_QUERIES.futureSprints, 
      JIRA_FIELDS, 
      { maxResults: 200 }
    );
    console.log(`  Fetched ${futureIssues.length} future sprint issues\n`);

    // --------------------------------------------------------
    // STEP 3: Fetch closed sprint issues (for historical comparison)
    // --------------------------------------------------------
    console.log('[3/5] Fetching CLOSED sprint issues (for historical data)...');
    const closedIssues = await client.searchIssues(
      JQL_QUERIES.closedSprints, 
      JIRA_FIELDS, 
      { maxResults: 300 }
    );
    console.log(`  Fetched ${closedIssues.length} closed sprint issues\n`);

    // --------------------------------------------------------
    // STEP 4: Fetch backlog items
    // --------------------------------------------------------
    console.log('[4/5] Fetching BACKLOG items (no sprint)...');
    const backlogIssues = await client.searchIssues(
      JQL_QUERIES.backlog, 
      JIRA_FIELDS, 
      { maxResults: 100 }
    );
    console.log(`  Fetched ${backlogIssues.length} backlog items\n`);

    // --------------------------------------------------------
    // STEP 5: Get sprint metadata from Agile API
    // --------------------------------------------------------
    console.log('[5/5] Fetching sprint metadata from Agile API...');
    const boards = await client.findBoards('BACK');
    let sprintMetadata = [];
    if (boards.length > 0) {
      const boardId = boards[0].id;
      console.log(`  Using board ID: ${boardId}`);
      sprintMetadata = await client.getBoardSprints(boardId, 'active,future,closed');
      console.log(`  Found ${sprintMetadata.length} sprints\n`);
    }

    // --------------------------------------------------------
    // Process all data
    // --------------------------------------------------------
    console.log('Processing issues...');
    
    // Process open sprints (with changelog for accurate blocked dates)
    const { tickets: openTickets, sprintMap } = processIssues(openIssues, { 
      useChangelog: true, 
      sprintState: 'active' 
    });
    
    // Process future sprints
    const { tickets: futureTickets, sprintMap: futureSprintMap } = processIssues(futureIssues, { 
      sprintState: 'future' 
    });
    
    // Process closed sprints (for historical data)
    const { tickets: closedTickets, sprintMap: closedSprintMap } = processIssues(closedIssues, { 
      sprintState: 'closed' 
    });
    
    // Process backlog (no sprint)
    const { tickets: backlogTickets } = processIssues(backlogIssues);
    
    // Merge future sprint map into main sprint map
    for (const [name, sprint] of futureSprintMap) {
      if (!sprintMap.has(name)) {
        sprint.state = 'future';
        sprintMap.set(name, sprint);
      }
    }
    
    // Add sprint metadata (dates) from Agile API
    for (const meta of sprintMetadata) {
      if (sprintMap.has(meta.name)) {
        const sprint = sprintMap.get(meta.name);
        sprint.startDate = meta.startDate ? meta.startDate.split('T')[0] : sprint.startDate;
        sprint.endDate = meta.endDate ? meta.endDate.split('T')[0] : sprint.endDate;
        sprint.state = meta.state;
      }
    }
    
    // Combine all tickets for jira.json output
    const allTickets = [...openTickets, ...futureTickets];
    
    console.log('\nSprint Summary:');
    const sortedSprints = Array.from(sprintMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [name, sprint] of sortedSprints) {
      console.log(`  ${name} (${sprint.state}): ${sprint.tickets.length} tickets, ${sprint.totalPoints} points`);
    }
    console.log(`  Backlog: ${backlogTickets.length} items`);
    console.log('');

    // --------------------------------------------------------
    // Generate output files
    // --------------------------------------------------------
    const dataDir = path.join(__dirname, '..', 'client', 'src', 'data');
    const publicDataDir = path.join(__dirname, '..', 'client', 'public', 'data');

    // Generate sprintData.ts (pass backlog and future data)
    const sprintDataContent = generateSprintDataTs(sprintMap, openTickets, timestamp, {
      backlogTickets,
      futureTickets,
      closedSprintMap,
    });
    if (sprintDataContent) {
      const sprintDataPath = path.join(dataDir, 'sprintData.ts');
      fs.writeFileSync(sprintDataPath, sprintDataContent);
      console.log(`Generated: ${sprintDataPath}`);
    }

    // Generate blockedItemsData.ts (open sprint blocked items have accurate dates)
    const blockedItemsContent = generateBlockedItemsDataTs(openTickets, timestamp);
    const blockedItemsPath = path.join(dataDir, 'blockedItemsData.ts');
    fs.writeFileSync(blockedItemsPath, blockedItemsContent);
    console.log(`Generated: ${blockedItemsPath}`);

    // Generate jiraMetrics.ts (pass closed sprint data for historical comparison)
    const jiraMetricsPath = path.join(dataDir, 'jiraMetrics.ts');
    const jiraMetricsContent = generateJiraMetricsTs(sprintMap, openTickets, timestamp, jiraMetricsPath, {
      closedSprintMap,
      backlogTickets,
    });
    if (jiraMetricsContent) {
      fs.writeFileSync(jiraMetricsPath, jiraMetricsContent);
      console.log(`Generated: ${jiraMetricsPath}`);
    }

    // Generate jira.json for dashboard-context compatibility
    const featureNames = loadFeatureNames();
    console.log(`Loaded ${Object.keys(featureNames).length} feature names for mapping`);
    const jiraJson = generateJiraJson(allTickets, featureNames);
    const jiraJsonPath = path.join(publicDataDir, 'jira.json');
    fs.writeFileSync(jiraJsonPath, JSON.stringify(jiraJson, null, 2));
    console.log(`Generated: ${jiraJsonPath}`);

    console.log(`\nTotal tickets processed: ${allTickets.length} active + ${backlogTickets.length} backlog + ${closedTickets.length} historical`);
    console.log('\nDone!');

  } catch (error) {
    console.error(`\nError: ${error.message}`);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

main();
