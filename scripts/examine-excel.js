import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelPath = path.join(__dirname, '..', 'attached_assets', '2025-11-07-!deepsee-prioritization-dashbo_1762970887330.xlsx');

console.log('Reading Excel file...');
const workbook = XLSX.readFile(excelPath);

console.log('\nWorkbook structure:');
console.log('Sheet names:', workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Sheet: ${sheetName}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Rows: ${data.length}`);
  
  if (data.length > 0) {
    console.log('\nColumn headers:');
    console.log(Object.keys(data[0]));
    
    console.log('\nFirst 3 rows:');
    console.log(JSON.stringify(data.slice(0, 3), null, 2));
  }
});
