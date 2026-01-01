import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Feature mapping rules based on keywords and project keys
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
  'ui': 'F-004',
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
};

// Project key to default feature mapping
const projectKeyMapping = {
  'PR': 'F-047',  // Product Roadmap Planning
  'SC': 'F-005',  // Security & Compliance
  'UI': 'F-004',  // UI/UX Enhancements
  'CI': 'F-003',  // Core Infrastructure
  'BACK': 'F-003', // Backend Development -> Infrastructure
  'FB': 'F-001',  // FILBERT -> Automation/Processing
};

// Valid project keys to filter out corrupted data
const VALID_PROJECT_KEYS = ['PR', 'SC', 'UI', 'CI', 'BACK', 'FB'];

// Auto-map ticket to feature based on title keywords and project key
function autoMapTicketToFeature(title, projectKey) {
  if (!title) return '0';
  
  const lowerTitle = title.toLowerCase();
  
  // Check title for keywords
  for (const [keyword, featureId] of Object.entries(featureMappingRules)) {
    if (lowerTitle.includes(keyword)) {
      return featureId;
    }
  }
  
  // Fallback to project key mapping
  return projectKeyMapping[projectKey] || '0';
}

// Read CSV file
const csvPath = path.join(__dirname, '..', 'attached_assets', 'Jira_1762965235341.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

console.log('Parsing CSV with PapaParse...');

// Parse CSV with PapaParse - handles quoted fields, newlines, and commas correctly
const parseResult = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.trim()
});

if (parseResult.errors.length > 0) {
  console.warn(`PapaParse encountered ${parseResult.errors.length} errors:`);
  parseResult.errors.slice(0, 5).forEach(err => {
    console.warn(`  Row ${err.row}: ${err.message}`);
  });
}

const rawData = parseResult.data;
console.log(`Parsed ${rawData.length} rows from CSV`);

// Transform and filter data
const jiraTickets = [];
let invalidCount = 0;

for (const row of rawData) {
  try {
    const issueKey = row['Issue key']?.trim();
    const projectKey = row['Project key']?.trim();
    const summary = row['Summary']?.trim();
    const status = row['Status']?.trim();
    const projectName = row['Project name']?.trim();
    
    // Validate issue key format (PROJECT-NUMBER)
    if (!issueKey || !issueKey.match(/^[A-Z]+\-\d+$/)) {
      invalidCount++;
      continue;
    }
    
    // Filter to only valid project keys
    if (!VALID_PROJECT_KEYS.includes(projectKey)) {
      invalidCount++;
      continue;
    }
    
    // Extract story points if available
    let storyPoints = null;
    const storyPointsField = row['Story Points'] || row['story_points'] || row['Story_Points'];
    if (storyPointsField) {
      const sp = parseInt(storyPointsField);
      if (!isNaN(sp) && sp > 0) storyPoints = sp;
    }
    
    // Auto-map to feature
    const mappedFeatureId = autoMapTicketToFeature(summary, projectKey);
    
    jiraTickets.push({
      JIRA_Ticket_ID: issueKey,
      Title: summary || '',
      Status: status || 'To Do',
      Category: projectName || '',
      Client_Name: '', // Will be filled manually
      Effort_T_Shirt_Size: null,
      Story_Points: storyPoints,
      Mapped_Feature_ID: mappedFeatureId
    });
  } catch (error) {
    console.warn(`Error processing row:`, error.message);
    invalidCount++;
  }
}

console.log(`\nSuccessfully transformed ${jiraTickets.length} valid tickets`);
console.log(`Filtered out ${invalidCount} invalid/corrupted rows`);

// Validation: Check for corrupted data patterns
const invalidIds = jiraTickets.filter(t => !t.JIRA_Ticket_ID.match(/^[A-Z]+\-\d+$/));
if (invalidIds.length > 0) {
  console.error(`\nWARNING: Found ${invalidIds.length} tickets with invalid IDs!`);
  invalidIds.slice(0, 5).forEach(t => {
    console.error(`  ${t.JIRA_Ticket_ID}: ${t.Title}`);
  });
}

// Project breakdown stats
const projectStats = jiraTickets.reduce((acc, ticket) => {
  const projectKey = ticket.JIRA_Ticket_ID.split('-')[0];
  acc[projectKey] = (acc[projectKey] || 0) + 1;
  return acc;
}, {});

console.log('\nProject breakdown (valid tickets only):');
Object.entries(projectStats).sort((a, b) => b[1] - a[1]).forEach(([key, count]) => {
  console.log(`  ${key}: ${count} tickets`);
});

// Status breakdown
const statusStats = jiraTickets.reduce((acc, ticket) => {
  acc[ticket.Status] = (acc[ticket.Status] || 0) + 1;
  return acc;
}, {});

console.log('\nTop 10 statuses:');
Object.entries(statusStats).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([status, count]) => {
  console.log(`  ${status}: ${count} tickets`);
});

// Feature mapping stats
const mapped = jiraTickets.filter(t => t.Mapped_Feature_ID !== '0').length;
console.log('\nAuto-mapped to features:');
console.log(`  Mapped: ${mapped} tickets (${((mapped / jiraTickets.length) * 100).toFixed(1)}%)`);
console.log(`  Unmapped: ${jiraTickets.length - mapped} tickets`);

// Story points stats
const withStoryPoints = jiraTickets.filter(t => t.Story_Points !== null).length;
console.log('\nStory points:');
console.log(`  Tickets with story points: ${withStoryPoints}`);
console.log(`  Tickets without story points: ${jiraTickets.length - withStoryPoints}`);

// Write output
const outputPath = path.join(__dirname, '..', 'client', 'public', 'data', 'jira.json');
fs.writeFileSync(outputPath, JSON.stringify(jiraTickets, null, 2));

console.log(`\n✓ Output written to: ${outputPath}`);
console.log(`✓ Total valid tickets: ${jiraTickets.length}`);
console.log(`✓ Data quality validated`);
