import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';
import type { InstitutionSearchResult } from '@/fetchers/institutions';

const CSV_FILE_PATH = (() => {
  const basePath = process.cwd();
  const dataPath = join(basePath, 'data', 'institutions.csv');
  console.log('[CSV] Looking for CSV at:', dataPath);
  return dataPath;
})();

const RSPO_COLUMN_INDEX = 0;
const NAME_COLUMN_INDEX = 4;
const CITY_COLUMN_INDEX = 12;


let csvCache: InstitutionSearchResult[] | null = null;

function parseCsvValue(value: string): string {
  if (!value) return '';
  
  let cleaned = value
    .replace(/^="?"/, '')
    .replace(/"?"$/, '')
    .replace(/^,+/, '')
    .replace(/^"/, '')
    .replace(/"$/, '')
    .replace(/""/g, '"')
    .trim();
  
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.slice(1, -1);
  }
  
  return cleaned;
}

function loadInstitutionsFromCsv(): InstitutionSearchResult[] {
  if (csvCache) {
    return csvCache;
  }

  try {
    console.log('[CSV] Loading institutions from CSV...');
    const csvContent = readFileSync(CSV_FILE_PATH, 'utf-8');
    
    const records = parse(csvContent, {
      delimiter: ';',
      skip_empty_lines: true,
      from_line: 2,
      relax_column_count: true,
      quote: '"',
      escape: '"',
    }) as string[][];

    console.log(`[CSV] Parsed ${records.length} rows from CSV`);

    csvCache = records
      .map((row, index) => {
        try {
          const rspo = parseCsvValue(row[RSPO_COLUMN_INDEX] || '');
          const name = parseCsvValue(row[NAME_COLUMN_INDEX] || '');
          const city = parseCsvValue(row[CITY_COLUMN_INDEX] || '');

          if (!rspo || !name || name.length === 0) {
            return null;
          }

          return {
            id: rspo,
            name: name,
            numerRspo: rspo,
            city: city || undefined,
          } as InstitutionSearchResult;
        } catch (rowError) {
          if (index < 5) {
            console.warn(`[CSV] Error parsing row ${index + 2}:`, rowError);
          }
          return null;
        }
      })
      .filter((item): item is InstitutionSearchResult => item !== null);

    console.log(`[CSV] Successfully loaded ${csvCache.length} institutions`);
    
    if (csvCache.length > 0) {
      console.log('[CSV] Sample institution:', csvCache[0]);
    }

    return csvCache;
  } catch (error) {
    console.error('[CSV] Error loading institutions CSV:', error);
    if (error instanceof Error) {
      console.error('[CSV] Error message:', error.message);
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
      const matches = nameLower.includes(trimmedQuery);
      return matches;
    })
    .slice(0, 50);

  console.log(`[CSV] Found ${results.length} results for "${trimmedQuery}"`);
  if (results.length > 0) {
    console.log('[CSV] Sample result:', results[0]);
  }

  return results;
}

export function clearInstitutionsCache(): void {
  csvCache = null;
}
