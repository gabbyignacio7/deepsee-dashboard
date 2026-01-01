import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDataDir = path.join(__dirname, '../client/public/data');

console.log('Mapping raw Excel data to dashboard format...\n');

// Load raw JIRA tickets
const jiraRaw = JSON.parse(fs.readFileSync(path.join(rawDataDir, 'jira-raw.json'), 'utf8'));
console.log(`Loaded ${jiraRaw.length} raw JIRA tickets`);

// Map to dashboard format (matching current jira.json structure)
const jiraMapped = jiraRaw.map(ticket => ({
  Ticket_ID: ticket.jira_ticket_id || '',
  Ticket_Summary: ticket.jira_ticket_title || '',
  Status: ticket.jira_status || '',
  Category: ticket.jira_category || '',
  Project_Key: ticket.project_key || '',
  Client_Name: ticket.client_name || '',
  T_Shirt_Size: ticket.effort_tshirt_size || '',
  Story_Points: ticket.story_points || 0,
  Mapped_Feature_ID: ticket.mapped_feature_id || '',
  Mapped_Feature_Name: ticket.mapped_feature_name || '',
  Assigned_Engineer: ticket.assigned_engineer || '',
  Sprint: ticket.sprint || '',
  Created_Date: ticket.created_date || '',
  Target_Date: ticket.target_date || '',
  Completed_Date: ticket.completed_date || '',
  Product_Proposed_To_Deprecate: ticket['Product Proposed to Deprecate'] || 'N',
  Deprecation_Notes: ticket['Additional Notes on Reason to Deprecate'] || ''
}));

// Count deprecation status
const deprecated = jiraMapped.filter(t => t.Product_Proposed_To_Deprecate === 'Y').length;
const active = jiraMapped.filter(t => t.Product_Proposed_To_Deprecate !== 'Y').length;

console.log(`✓ Mapped ${jiraMapped.length} JIRA tickets`);
console.log(`  - Deprecated (Y): ${deprecated}`);
console.log(`  - Active (not Y): ${active}`);

// Save mapped JIRA tickets
fs.writeFileSync(
  path.join(rawDataDir, 'jira.json'),
  JSON.stringify(jiraMapped, null, 2)
);
console.log('✓ Saved jira.json\n');

console.log('✅ Data mapping complete!');
console.log('Dashboard will now use updated JIRA data with deprecation field');
