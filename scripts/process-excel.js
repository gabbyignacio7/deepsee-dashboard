import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFilePath = path.join(__dirname, '../attached_assets/2025-11-07-DeepSee-prioritization-dashboard-v3 (1)_1763497474156.xlsx');
const outputDir = path.join(__dirname, '../client/public/data');

console.log('Reading Excel file:', excelFilePath);

try {
  const workbook = XLSX.readFile(excelFilePath);
  
  console.log('Available sheets:', workbook.SheetNames);
  
  // Extract Master_Data_JIRA_Tickets (header at row 1, index 0)
  if (workbook.SheetNames.includes('Master_Data_JIRA_Tickets')) {
    const sheet = workbook.Sheets['Master_Data_JIRA_Tickets'];
    const jiraData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Get headers from first row
    const headers = jiraData[0];
    console.log('\nJIRA Tickets Headers:', headers);
    console.log('Total JIRA rows (including header):', jiraData.length);
    
    // Convert to objects
    const jiraTickets = jiraData.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    console.log('JIRA Tickets processed:', jiraTickets.length);
    console.log('Sample JIRA ticket:', JSON.stringify(jiraTickets[0], null, 2));
    
    // Check for deprecation field
    const deprecationField = headers.find(h => h && h.toLowerCase().includes('deprecate'));
    console.log('Deprecation field found:', deprecationField);
    
    if (deprecationField) {
      const deprecatedCount = jiraTickets.filter(t => t[deprecationField] === 'Y').length;
      const activeCount = jiraTickets.filter(t => t[deprecationField] !== 'Y').length;
      console.log(`Tickets marked for deprecation (Y): ${deprecatedCount}`);
      console.log(`Active tickets (not Y): ${activeCount}`);
    }
    
    // Save to file
    fs.writeFileSync(
      path.join(outputDir, 'jira-raw.json'),
      JSON.stringify(jiraTickets, null, 2)
    );
    console.log('✓ Saved jira-raw.json');
  }
  
  // Extract Master_Data_Features (header at row 2, index 1)
  if (workbook.SheetNames.includes('Master_Data_Features')) {
    const sheet = workbook.Sheets['Master_Data_Features'];
    const featuresData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Get headers from second row (index 1)
    const headers = featuresData[1];
    console.log('\nFeatures Headers:', headers);
    console.log('Total Feature rows (including headers):', featuresData.length);
    
    // Convert to objects (skip first 2 rows)
    const features = featuresData.slice(2).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    console.log('Features processed:', features.length);
    console.log('Sample feature:', JSON.stringify(features[0], null, 2));
    
    // Save to file
    fs.writeFileSync(
      path.join(outputDir, 'features-raw.json'),
      JSON.stringify(features, null, 2)
    );
    console.log('✓ Saved features-raw.json');
  }
  
  // Extract Master_Data_Sales_Pipeline (header at row 2, index 1)
  if (workbook.SheetNames.includes('Master_Data_Sales_Pipeline')) {
    const sheet = workbook.Sheets['Master_Data_Sales_Pipeline'];
    const salesData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    const headers = salesData[1];
    console.log('\nSales Pipeline Headers:', headers);
    
    const sales = salesData.slice(2).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    console.log('Sales opportunities processed:', sales.length);
    
    fs.writeFileSync(
      path.join(outputDir, 'sales-raw.json'),
      JSON.stringify(sales, null, 2)
    );
    console.log('✓ Saved sales-raw.json');
  }
  
  console.log('\n✅ Excel processing complete!');
  console.log('Raw data files saved to:', outputDir);
  
} catch (error) {
  console.error('Error processing Excel file:', error);
  process.exit(1);
}
