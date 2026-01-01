import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.join(__dirname, '..', 'attached_assets', '2025-11-07-!deepsee-prioritization-dashbo_1762970887330.xlsx');

console.log('Reading Excel file...');
const workbook = XLSX.readFile(excelPath);

// Check Features sheet
console.log('\n=== Master_Data_Features Headers ===');
const featuresSheet = workbook.Sheets['Master_Data_Features'];
const featuresData = XLSX.utils.sheet_to_json(featuresSheet);

if (featuresData.length > 0) {
  console.log('\nColumn headers:');
  Object.keys(featuresData[0]).forEach((header, i) => {
    console.log(`  ${i + 1}. "${header}"`);
  });
  
  console.log('\n\nFirst row sample data:');
  console.log(JSON.stringify(featuresData[0], null, 2));
}

// Check JIRA sheet
console.log('\n\n=== Master_Data_JIRA_Tickets Headers ===');
const jiraSheet = workbook.Sheets['Master_Data_JIRA_Tickets'];
const jiraData = XLSX.utils.sheet_to_json(jiraSheet);

if (jiraData.length > 0) {
  console.log('\nColumn headers:');
  Object.keys(jiraData[0]).forEach((header, i) => {
    console.log(`  ${i + 1}. "${header}"`);
  });
  
  console.log('\n\nFirst row sample data:');
  console.log(JSON.stringify(jiraData[0], null, 2));
}
