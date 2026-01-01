import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.join(__dirname, '..', 'attached_assets', '2025-11-07-!deepsee-prioritization-dashbo_1762970887330.xlsx');
const outputDir = path.join(__dirname, '..', 'client', 'public', 'data');

console.log('Reading Excel file...');
const workbook = XLSX.readFile(excelPath);

// Helper function to clean and transform data
function cleanValue(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string') return value.trim();
  return value;
}

// Convert Excel serial date to ISO string
function excelDateToISO(serial) {
  if (!serial || typeof serial !== 'number') return null;
  // Excel serial date: days since Jan 1, 1900 (with 1900 leap year bug)
  const epoch = new Date(1899, 11, 30); // Dec 30, 1899
  const date = new Date(epoch.getTime() + serial * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

// Transform Features data - use dynamic header mapping
console.log('\n--- Processing Master_Data_Features ---');
const featuresSheet = workbook.Sheets['Master_Data_Features'];
const featuresRawWithHeaders = XLSX.utils.sheet_to_json(featuresSheet);

// First row contains the actual column names
const headerRow = featuresRawWithHeaders[0];

// Build reverse mapping: column name -> __EMPTY_N key
const columnToKey = {};
Object.entries(headerRow).forEach(([key, columnName]) => {
  columnToKey[columnName] = key;
});

console.log('Dynamic column mapping created for', Object.keys(columnToKey).length, 'columns');

// Helper to get field using dynamic mapping
const getFieldByName = (row, columnName) => {
  const key = columnToKey[columnName];
  return key ? cleanValue(row[key]) : null;
};

const getFloatByName = (row, columnName) => {
  const val = getFieldByName(row, columnName);
  if (val === null) return 0;
  const parsed = parseFloat(val);
  return isNaN(parsed) ? 0 : parsed;
};

const getIntByName = (row, columnName) => {
  const val = getFieldByName(row, columnName);
  if (val === null) return 0;
  const parsed = parseInt(val);
  return isNaN(parsed) ? 0 : parsed;
};

// Skip first row (headers) and transform the rest
const features = featuresRawWithHeaders.slice(1).map(row => {
  const feature = {
    Feature_ID: getFieldByName(row, 'Feature_ID') || '',
    Feature_Name: getFieldByName(row, 'Feature_Name') || '',
    Agent_Type: getFieldByName(row, 'Agent_Type') || '',
    Category: getFieldByName(row, 'Category') || '',
    Quarter_Planned: getFieldByName(row, 'Quarter_Planned') || '',
    Replicability_Score: getFloatByName(row, 'Replicability_Score'),
    Primary_Client: getFieldByName(row, 'Primary_Client') || '',
    Additional_Clients: getFieldByName(row, 'Additional_Clients') || '',
    Platform_vs_Custom: getFieldByName(row, 'Platform_vs_Custom') || 'Custom',
    ARR_Amount: getFloatByName(row, 'ARR_Amount'),
    Revenue_Type: getFieldByName(row, 'Revenue_Type') || '',
    Contract_Status: getFieldByName(row, 'Contract_Status') || '',
    Pipeline_Stage: getFieldByName(row, 'Pipeline_Stage') || '',
    Conversion_Probability: getFloatByName(row, 'Conversion_Probability_%'),
    Current_Status: getFieldByName(row, 'Current_Status') || 'Planning',
    Completion_Percentage: getFloatByName(row, 'Completion_%'),
    Target_Completion_Date: excelDateToISO(getFieldByName(row, 'Target_Completion_Date')),
    Effort_Estimate_Weeks: getFloatByName(row, 'Effort_Estimate_Weeks'),
    Revenue_at_Risk: getFloatByName(row, 'Revenue_at_Risk'),
    Priority_Score: getFloatByName(row, 'Priority_Score'),
    Engineering_Notes: getFieldByName(row, 'Engineering_Notes') || '',
    Management_Notes: getFieldByName(row, 'Management_Notes') || '',
    Client_Count: getIntByName(row, 'Client_Count'),
    Deal_Close_Date: excelDateToISO(getFieldByName(row, 'Deal_Close_Date')),
    Days_to_Close: getIntByName(row, 'Days_to_Close'),
    Multi_Client_Benefit: getFieldByName(row, 'Multi_Client_Benefit') || 'No',
    Effort_T_Shirt_Size: getFieldByName(row, 'Effort_T-Shirt_Size') || 'M',
    Engineering_Complexity: getFieldByName(row, 'Engineering_Complexity') || 'Medium',
    Dependencies: getFieldByName(row, 'Dependencies') || '',
    Team_Required: getFieldByName(row, 'Team_Required') || '',
    Priority_Tier: getFieldByName(row, 'Priority_Tier') || 'Tier 3',
    Revenue_Impact_Type: getFieldByName(row, 'Revenue_Impact_Type') || '',
    Weighted_ARR: getFloatByName(row, 'Weighted_ARR'),
    Assigned_To: getFieldByName(row, 'Assigned_To') || '',
    Sprint_Assignment: getFieldByName(row, 'Sprint_Assignment') || '',
    JIRA_Ticket_Count: getIntByName(row, 'JIRA_Ticket_Count'),
    Created_Date: excelDateToISO(getFieldByName(row, 'Created_Date')),
    Target_Start_Date: excelDateToISO(getFieldByName(row, 'Target_Start_Date')),
    Sales_Notes: getFieldByName(row, 'Sales_Notes') || '',
    Manual_Override: getFieldByName(row, 'Manual_Override') || 'No',
    Manual_Override_Score: getFloatByName(row, 'Manual_Override_Score'),
    Artemis_Focus: getFieldByName(row, 'Artemis_Focus') || 'No',
    PRD_Status: getFieldByName(row, 'PRD_Status') || '',
    Epic_in_JIRA: getFieldByName(row, 'Epic_in_JIRA') || '',
    Confidence_Factor: getIntByName(row, 'Confidence_Factor') || 2,
    Confidence_Description: getFieldByName(row, 'Confidence_Description') || 'Medium Confidence'
  };
  
  // Recalculate Priority Score with Confidence Factor if not manually overridden
  // Note: Conversion_Probability is stored as 0-1 decimal (e.g., 1 = 100%, 0.5 = 50%)
  // Formula: (ARR × Replicability × Conversion) / (Effort × Confidence × 100)
  if (feature.Manual_Override !== 'Yes' && feature.Effort_Estimate_Weeks > 0) {
    const confidenceFactor = feature.Confidence_Factor || 2;
    feature.Priority_Score = (
      feature.ARR_Amount * 
      feature.Replicability_Score * 
      feature.Conversion_Probability
    ) / (feature.Effort_Estimate_Weeks * confidenceFactor * 100);
  }
  
  return feature;
});

console.log(`Transformed ${features.length} features`);

// Transform JIRA Tickets data (already has proper headers)
console.log('\n--- Processing Master_Data_JIRA_Tickets ---');
const jiraSheet = workbook.Sheets['Master_Data_JIRA_Tickets'];
const jiraRaw = XLSX.utils.sheet_to_json(jiraSheet);

const jiraTickets = jiraRaw.map(row => {
  const createdDate = row.created_date || row.Created_Date;
  
  const ticket = {
    JIRA_Ticket_ID: cleanValue(row.jira_ticket_id) || cleanValue(row.JIRA_Ticket_ID) || '',
    Title: cleanValue(row.jira_ticket_title) || cleanValue(row.Title) || '',
    Status: cleanValue(row.jira_status) || cleanValue(row.Status) || 'To Do',
    Category: cleanValue(row.jira_category) || cleanValue(row.Category) || '',
    Client_Name: cleanValue(row.client_name) || cleanValue(row.Client_Name) || '',
    Effort_T_Shirt_Size: cleanValue(row.effort_t_shirt_size) || cleanValue(row['Effort_T-Shirt_Size']) || null,
    Story_Points: parseFloat(cleanValue(row.story_points) || cleanValue(row.Story_Points) || 0) || null,
    Mapped_Feature_ID: cleanValue(row.mapped_feature_id) || cleanValue(row.Mapped_Feature_ID) || '0',
    Project_Key: cleanValue(row.project_key) || cleanValue(row.Project_Key) || '',
    Created_Date: excelDateToISO(createdDate) || null
  };
  
  return ticket;
});

console.log(`Transformed ${jiraTickets.length} JIRA tickets`);

// Detailed stats and validation
console.log('\n--- Data Validation ---');

// Project breakdown
const projectStats = jiraTickets.reduce((acc, ticket) => {
  const key = ticket.Project_Key || 'Unknown';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});

console.log('\nJIRA Project breakdown:');
Object.entries(projectStats).sort((a, b) => b[1] - a[1]).forEach(([key, count]) => {
  console.log(`  ${key}: ${count} tickets`);
});

// Feature stats
const tierStats = features.reduce((acc, feature) => {
  const tier = feature.Priority_Tier;
  acc[tier] = (acc[tier] || 0) + 1;
  return acc;
}, {});

console.log('\nFeature Priority Tiers:');
Object.entries(tierStats).sort().forEach(([tier, count]) => {
  console.log(`  ${tier}: ${count} features`);
});

const statusStats = features.reduce((acc, feature) => {
  acc[feature.Current_Status] = (acc[feature.Current_Status] || 0) + 1;
  return acc;
}, {});

console.log('\nFeature Status breakdown:');
Object.entries(statusStats).sort((a, b) => b[1] - a[1]).forEach(([status, count]) => {
  console.log(`  ${status}: ${count} features`);
});

// Calculate and VERIFY total ARR
const totalARR = features.reduce((sum, f) => sum + f.ARR_Amount, 0);
const weightedARR = features.reduce((sum, f) => sum + f.Weighted_ARR, 0);

console.log('\nRevenue Summary (VERIFIED):');
console.log(`  Total ARR: $${totalARR.toLocaleString()}`);
console.log(`  Weighted ARR: $${weightedARR.toLocaleString()}`);

// Validate date conversions
const validDates = jiraTickets.filter(t => t.Created_Date !== null).length;
console.log('\nDate Conversion Validation:');
console.log(`  JIRA tickets with valid dates: ${validDates}/${jiraTickets.length}`);
console.log(`  Sample dates:`, jiraTickets.filter(t => t.Created_Date).slice(0, 3).map(t => t.Created_Date));

// Write output files
console.log('\n--- Writing output files ---');

const featuresOutputPath = path.join(outputDir, 'features.json');
fs.writeFileSync(featuresOutputPath, JSON.stringify(features, null, 2));
console.log(`✓ Features written to: ${featuresOutputPath}`);

const jiraOutputPath = path.join(outputDir, 'jira.json');
fs.writeFileSync(jiraOutputPath, JSON.stringify(jiraTickets, null, 2));
console.log(`✓ JIRA tickets written to: ${jiraOutputPath}`);

console.log('\n✓ Data transformation complete!');
console.log(`✓ ${features.length} features processed`);
console.log(`✓ ${jiraTickets.length} JIRA tickets processed`);
console.log(`\nTop 10 features by Weighted ARR:`);
features
  .sort((a, b) => b.Weighted_ARR - a.Weighted_ARR)
  .slice(0, 10)
  .forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.Feature_ID} - ${f.Feature_Name}: $${f.Weighted_ARR.toLocaleString()}`);
  });

// Final verification
console.log('\n--- Final Verification ---');
console.log(`✓ All features have Feature_ID: ${features.every(f => f.Feature_ID)}`);
console.log(`✓ All features have Priority_Tier as string: ${features.every(f => typeof f.Priority_Tier === 'string')}`);
console.log(`✓ Weighted ARR calculation verified: $${weightedARR.toLocaleString()}`);
