import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { InstitutionSearchResult } from '@/fetchers/institutions';

const CSV_FILE_PATH = (() => {
  const basePath = process.cwd();
  const dataPath = join(basePath, 'data', 'institutions.csv');
  return dataPath;
})();

const RSPO_COLUMN_INDEX = 0;
const NAME_COLUMN_INDEX = 4;
const CITY_COLUMN_INDEX = 12;

let csvCache: InstitutionSearchResult[] | null = null;

function parseCsvValue(value: string): string {
  if (!value) return '';
  
  let cleaned = String(value).trim();
  
  if (cleaned.startsWith('="') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(2, -1);
  }
  
  if (cleaned.startsWith('"') && cleaned.endsWith('"') && cleaned.length > 1) {
    cleaned = cleaned.slice(1, -1);
  }
  
  cleaned = cleaned.replace(/""/g, '"');
  
  return cleaned;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let insideQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i += 2;
      } else {
        insideQuotes = !insideQuotes;
        i++;
      }
    } else if (char === ';' && !insideQuotes) {
      fields.push(currentField);
      currentField = '';
      i++;
    } else {
      currentField += char;
      i++;
    }
  }

  fields.push(currentField);
  return fields;
}

function loadInstitutionsFromCsv(): InstitutionSearchResult[] {
  if (csvCache) {
    return csvCache;
  }

  try {
    console.log('[CSV] Loading institutions from CSV...');
    console.log('[CSV] CSV file path:', CSV_FILE_PATH);
    
    if (!existsSync(CSV_FILE_PATH)) {
      console.error(`[CSV] CSV file not found at: ${CSV_FILE_PATH}`);
      return [];
    }
    
    const csvContent = readFileSync(CSV_FILE_PATH, 'utf-8');
    console.log(`[CSV] CSV file size: ${(csvContent.length / 1024).toFixed(2)} KB`);
    
    const lines = csvContent.split('\n').filter(line => line.trim().length > 0);
    console.log(`[CSV] Total lines in file: ${lines.length}`);
    
    const dataLines = lines.slice(1);
    console.log(`[CSV] Data lines to process: ${dataLines.length}`);

    const institutions: InstitutionSearchResult[] = [];
    let processedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < dataLines.length; i++) {
      try {
        const fields = parseCsvLine(dataLines[i]!);
        
        if (fields.length <= NAME_COLUMN_INDEX) {
          continue;
        }

        const rspo = parseCsvValue(fields[RSPO_COLUMN_INDEX] || '');
        const name = parseCsvValue(fields[NAME_COLUMN_INDEX] || '');
        const city = parseCsvValue(fields[CITY_COLUMN_INDEX] || '');

        if (!rspo || !name || name.length === 0) {
          continue;
        }

        institutions.push({
          id: rspo,
          name: name,
          numerRspo: rspo,
          city: city || undefined,
        });

        processedCount++;
      } catch (rowError) {
        errorCount++;
        if (i < 5) {
          console.warn(`[CSV] Error parsing row ${i + 2}:`, rowError);
        }
      }
    }

    console.log(`[CSV] Successfully processed ${processedCount} institutions`);
    if (errorCount > 0) {
      console.warn(`[CSV] Skipped ${errorCount} rows due to errors`);
    }
    
    csvCache = institutions;

    if (csvCache.length > 0) {
      console.log('[CSV] Sample institution:', {
        id: csvCache[0]!.id,
        name: csvCache[0]!.name.substring(0, 60),
        city: csvCache[0]!.city,
      });
    }

    return csvCache;
  } catch (error) {
    console.error('[CSV] Error loading institutions CSV:', error);
    if (error instanceof Error) {
      console.error('[CSV] Error message:', error.message);
      console.error('[CSV] Error stack:', error.stack);
      console.error('[CSV] File path:', CSV_FILE_PATH);
    }
    return [];
  }
}

export function searchInstitutionsFromCsv(
  query: string
): InstitutionSearchResult[] {
  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery.length < 3) {
    return [];
  }

  const institutions = loadInstitutionsFromCsv();
  
  if (institutions.length === 0) {
    console.warn('[CSV] No institutions loaded, cannot search');
    return [];
  }

  console.log(`[CSV] Searching for "${trimmedQuery}" in ${institutions.length} institutions`);

  const results = institutions
    .filter((institution) => {
      const nameLower = institution.name.toLowerCase();
      return nameLower.includes(trimmedQuery);
    })
    .slice(0, 50);

  console.log(`[CSV] Found ${results.length} results for "${trimmedQuery}"`);
  
  if (results.length > 0) {
    console.log('[CSV] First result:', {
      id: results[0]!.id,
      name: results[0]!.name.substring(0, 80),
    });
  } else {
    const sampleNames = institutions.slice(0, 3).map(i => i.name.substring(0, 60));
    
    console.log('[CSV] No matches. Sample names:', sampleNames);
    console.log('[CSV] Query was:', trimmedQuery);
  }

  return results;
}

export function clearInstitutionsCache(): void {
  csvCache = null;
}
