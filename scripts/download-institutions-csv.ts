import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const CSV_URL = 'https://rspo.gov.pl/api/Institution/Csv?IsDescending=false&OrderBy=';
const DATA_DIR = join(process.cwd(), 'data');
const CSV_FILE_PATH = join(DATA_DIR, 'institutions.csv');

async function downloadCsv(): Promise<void> {
  try {
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
   
      console.log(`Created directory: ${DATA_DIR}`);
    }

    console.log(`Downloading CSV from: ${CSV_URL}`);
    
    const response = await fetch(CSV_URL, {
      method: 'POST',
      headers: {
        'Accept': 'text/csv, application/csv, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
   
      console.error(`Response status: ${response.status}`);
      console.error(`Response headers:`, Object.fromEntries(response.headers.entries()));
     
      if (errorText) {
        console.error(`Error response body: ${errorText.substring(0, 500)}`);
      }
     
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

    const csvContent = await response.text();

    if (!csvContent || csvContent.trim().length === 0) {
      throw new Error('Downloaded CSV file is empty');
    }

    await writeFile(CSV_FILE_PATH, csvContent, 'utf-8');

    const fileSizeInKB = (csvContent.length / 1024).toFixed(2);
    
    console.log(`✓ CSV file downloaded successfully`);
    console.log(`  Location: ${CSV_FILE_PATH}`);
    console.log(`  Size: ${fileSizeInKB} KB`);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    
    process.exit(1);
  }
}

downloadCsv();
