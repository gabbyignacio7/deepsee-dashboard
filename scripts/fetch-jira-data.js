/**
 * JIRA Data Fetch Script
 * 
 * Fetches issues from JIRA Cloud REST API and transforms them to the dashboard schema.
 * 
 * Environment variables required:
 *   JIRA_BASE_URL - Your Jira Cloud URL (e.g., https://deepsee.atlassian.net)
 *   JIRA_USER_EMAIL - Email of user with API access
 *   JIRA_API_TOKEN - API token from Atlassian account settings
 * 
 * Usage:
 *   node scripts/fetch-jira-data.js
 * 
 * Or via npm script:
 *   npm run fetch-jira
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

// JQL Query - fetches issues from specified projects in open sprints
const JQL_QUERY = `project IN ("Product Roadmap", "Back End Development", "Security & Compliance", FILBERT, "Core-Infrastructure", "Front End Development", "Neuro-Symbolic Intelligence", InfraRig) AND Sprint in openSprints() ORDER BY Rank ASC`;

// Custom Field IDs - Discovered via explore-jira-api.sh for deepsee.atlassian.net
const CUSTOM_FIELDS = {
  sprint: 'customfield_10021',           // Sprint field (array of sprint objects)
  storyPoints: 'customfield_10023',      // Story Points (number)
  tShirtSize: 'customfield_10105',       // T-Shirt Size (if available)
  epicLink: 'customfield_10014',         // Epic Link (string - issue key)
};

// Fields to request from JIRA API (reduces response size)
const JIRA_FIELDS = [
  'key',
  'summary',
  'status',
  'project',
  'priority',
  'assignee',
  'created',
  'duedate',
  'resolutiondate',
  'parent',
  CUSTOM_FIELDS.sprint,
  CUSTOM_FIELDS.storyPoints,
  CUSTOM_FIELDS.tShirtSize,
  CUSTOM_FIELDS.epicLink,
].filter(Boolean);

// Maximum results per API request (JIRA limit is 100)
const PAGE_SIZE = 100;

// ============================================================================
// FEATURE MAPPING
// ============================================================================

// Feature mapping rules based on keywords in ticket summary
const featureMappingRules = {
  // Client-specific keywords
  'broadridge': 'F-031',
  'dtcc': 'F-026',
  'colony bank': 'F-036',
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
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`JIRA API error (${response.status}): ${errorBody}`);
    }

    return response.json();
  }

  /**
   * Search for issues using JQL with pagination
   * Uses the new /search/jql endpoint with nextPageToken pagination
   */
  async searchIssues(jql, fields = []) {
    const allIssues = [];
    let nextPageToken = null;
    let isLast = false;
    let pageCount = 0;

    console.log(`Fetching issues with JQL: ${jql.substring(0, 80)}...`);

    while (!isLast) {
      const params = new URLSearchParams({
        jql,
        maxResults: PAGE_SIZE.toString(),
        fields: fields.join(','),
        expand: 'names',
      });

      // Add nextPageToken for subsequent pages
      if (nextPageToken) {
        params.set('nextPageToken', nextPageToken);
      }

      const response = await this.request(`/rest/api/3/search/jql?${params}`);
      
      pageCount++;
      allIssues.push(...response.issues);
      
      // Update pagination state
      isLast = response.isLast === true;
      nextPageToken = response.nextPageToken;

      console.log(`  Page ${pageCount}: fetched ${response.issues.length} issues (total so far: ${allIssues.length})...`);

      // Safety check to prevent infinite loops
      if (response.issues.length === 0) break;
    }

    console.log(`Completed: ${allIssues.length} total issues fetched`);
    return allIssues;
  }
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

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

/**
 * Extract sprint name from sprint field value
 * Sprint field can be an array of sprint objects
 */
function extractSprintName(sprintField) {
  if (!sprintField) return ' ';
  
  // If it's an array, get the most recent active sprint
  if (Array.isArray(sprintField)) {
    const activeSprint = sprintField.find(s => s.state === 'active') || sprintField[0];
    return activeSprint?.name || ' ';
  }
  
  // If it's an object
  if (typeof sprintField === 'object') {
    return sprintField.name || ' ';
  }
  
  return String(sprintField);
}

/**
 * Convert JIRA date string to the format used in the dashboard
 * JIRA format: "2026-01-15T10:30:00.000-0700"
 * Dashboard uses: Excel serial date number or ISO date string
 */
function formatDate(jiraDate) {
  if (!jiraDate) return ' ';
  
  try {
    const date = new Date(jiraDate);
    // Return ISO date string (YYYY-MM-DD)
    return date.toISOString().split('T')[0];
  } catch {
    return ' ';
  }
}

/**
 * Map T-Shirt size from various formats
 */
function mapTShirtSize(value) {
  if (!value) return ' ';
  
  const sizeStr = String(value).toUpperCase().trim();
  
  // Handle common variations
  if (sizeStr.includes('XS') || sizeStr.includes('EXTRA SMALL')) return 'XS';
  if (sizeStr.includes('XL') || sizeStr.includes('EXTRA LARGE')) return 'XL';
  if (sizeStr === 'S' || sizeStr.includes('SMALL')) return 'S';
  if (sizeStr === 'M' || sizeStr.includes('MEDIUM')) return 'M';
  if (sizeStr === 'L' || sizeStr.includes('LARGE')) return 'L';
  
  return sizeStr || ' ';
}

/**
 * Transform a JIRA issue to the dashboard JiraTicket schema
 */
function transformIssue(issue, featureNames) {
  const fields = issue.fields || {};
  const projectKey = fields.project?.key || '';
  const summary = fields.summary || '';
  
  // Auto-map to feature
  const mappedFeatureId = autoMapTicketToFeature(summary, projectKey);
  const mappedFeatureName = featureNames[mappedFeatureId] || '';
  
  // Extract sprint name
  const sprintValue = fields[CUSTOM_FIELDS.sprint];
  const sprintName = extractSprintName(sprintValue);
  
  // Get story points
  const storyPointsValue = fields[CUSTOM_FIELDS.storyPoints];
  const storyPoints = typeof storyPointsValue === 'number' ? storyPointsValue : 0;
  
  // Get T-shirt size
  const tShirtValue = fields[CUSTOM_FIELDS.tShirtSize];
  const tShirtSize = mapTShirtSize(tShirtValue?.value || tShirtValue);
  
  // Get epic key (try parent first, then epic link custom field)
  const epicKey = fields.parent?.key || fields[CUSTOM_FIELDS.epicLink] || '';
  
  return {
    Ticket_ID: issue.key,
    Ticket_Summary: summary,
    Status: fields.status?.name || 'To Do',
    Category: fields.project?.name || '',
    Project_Key: projectKey,
    Client_Name: ' ', // Not available from JIRA, would need manual mapping
    T_Shirt_Size: tShirtSize,
    Story_Points: storyPoints,
    Mapped_Feature_ID: mappedFeatureId,
    Mapped_Feature_Name: mappedFeatureName,
    Assigned_Engineer: fields.assignee?.displayName || ' ',
    Sprint: sprintName,
    Created_Date: formatDate(fields.created),
    Target_Date: formatDate(fields.duedate),
    Completed_Date: formatDate(fields.resolutiondate),
    Product_Proposed_To_Deprecate: 'N',
    Deprecation_Notes: '',
    Epic_Key: epicKey,
    Priority: fields.priority?.name || 'Medium',
  };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('========================================');
  console.log('   JIRA Data Fetch Script');
  console.log('========================================\n');

  // Validate environment variables
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_USER_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) {
    console.error('Error: Missing required environment variables.');
    console.error('Required:');
    console.error('  JIRA_BASE_URL - Your Jira Cloud URL');
    console.error('  JIRA_USER_EMAIL - Email of user with API access');
    console.error('  JIRA_API_TOKEN - API token from Atlassian account settings');
    process.exit(1);
  }

  console.log('Configuration:');
  console.log(`  Base URL: ${baseUrl}`);
  console.log(`  User: ${email}`);
  console.log(`  Token: ***${apiToken.slice(-4)}`);
  console.log('');

  // Load feature names for mapping
  const featureNames = loadFeatureNames();
  console.log(`Loaded ${Object.keys(featureNames).length} feature names for mapping\n`);

  // Create JIRA client
  const client = new JiraClient(baseUrl, email, apiToken);

  try {
    // Fetch all issues
    const issues = await client.searchIssues(JQL_QUERY, JIRA_FIELDS);
    console.log(`\nFetched ${issues.length} issues from JIRA\n`);

    // Transform issues to dashboard schema
    const tickets = issues.map(issue => transformIssue(issue, featureNames));

    // Validate transformed data
    const validTickets = tickets.filter(t => t.Ticket_ID && t.Ticket_ID.match(/^[A-Z]+-\d+$/));
    const invalidCount = tickets.length - validTickets.length;

    if (invalidCount > 0) {
      console.warn(`Warning: Filtered out ${invalidCount} tickets with invalid IDs`);
    }

    // Generate statistics
    console.log('Statistics:');
    
    // Project breakdown
    const projectStats = validTickets.reduce((acc, t) => {
      acc[t.Project_Key] = (acc[t.Project_Key] || 0) + 1;
      return acc;
    }, {});
    console.log('  Projects:');
    Object.entries(projectStats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([key, count]) => console.log(`    ${key}: ${count} tickets`));

    // Status breakdown
    const statusStats = validTickets.reduce((acc, t) => {
      acc[t.Status] = (acc[t.Status] || 0) + 1;
      return acc;
    }, {});
    console.log('  Statuses:');
    Object.entries(statusStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([status, count]) => console.log(`    ${status}: ${count} tickets`));

    // Feature mapping stats
    const mappedCount = validTickets.filter(t => t.Mapped_Feature_ID !== '0').length;
    console.log(`  Feature Mapping: ${mappedCount}/${validTickets.length} (${((mappedCount / validTickets.length) * 100).toFixed(1)}%)`);

    // Story points stats
    const withPoints = validTickets.filter(t => t.Story_Points > 0).length;
    const totalPoints = validTickets.reduce((sum, t) => sum + (t.Story_Points || 0), 0);
    console.log(`  Story Points: ${withPoints} tickets have points, ${totalPoints} total points`);

    // Write output
    const outputPath = path.join(__dirname, '..', 'client', 'public', 'data', 'jira.json');
    fs.writeFileSync(outputPath, JSON.stringify(validTickets, null, 2));

    console.log(`\nOutput written to: ${outputPath}`);
    console.log(`Total tickets: ${validTickets.length}`);
    console.log('\nDone!');

  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exit(1);
  }
}

main();
