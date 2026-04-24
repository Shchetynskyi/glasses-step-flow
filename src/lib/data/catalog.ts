import Papa from 'papaparse';

export type RawCatalogRow = {
  modelId: string;
  MarketingTitle: string;
  SitePriceUAH: string;
  ImageUrl: string;
  Show: string;
  Gender: string;
  DiopterValues: string;
  Priority: number | null;
};

type CsvRow = Record<string, string>;

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRY7VLZvFgVUk1AslbRRmEtmhIVHFPK5jApKT4GjpQuLN-eJ45_fs3r2v8UXisxYdVsXYXl_wsEwoo9/pub?gid=51481216&single=true&output=csv';

function toStringSafe(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}

function toBoolean(value: unknown): boolean {
  const s = toStringSafe(value).trim().toLowerCase();
  return s === 'true' || s === 'так' || s === '1' || s === 'yes';
}

function toNumberOrNull(value: unknown): number | null {
  const s = toStringSafe(value).trim();
  if (!s) return null;

  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function extractDriveFileId(url: string): string | null {
  const m1 = url.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)\//i);
  if (m1?.[1]) return m1[1];

  const m2 = url.match(/https?:\/\/drive\.google\.com\/open\?id=([^&]+)/i);
  if (m2?.[1]) return m2[1];

  const m3 = url.match(/https?:\/\/drive\.google\.com\/uc\?.*?\bid=([^&]+)/i);
  if (m3?.[1]) return m3[1];

  const m4 = url.match(/\bid=([^&]+)/i);
  if (m4?.[1] && /drive\.google\.com/i.test(url)) return m4[1];

  return null;
}

function normalizeImageUrl(raw: unknown): string {
  const url = toStringSafe(raw).trim();
  if (!url) return '';

  if (/^https?:\/\/drive\.google\.com\/thumbnail\?/i.test(url)) return url;
  if (/^https?:\/\/lh3\.googleusercontent\.com\//i.test(url)) return url;

  const id = extractDriveFileId(url);
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

  return url;
}

function normalizePrice(value: unknown): string {
  const price = toStringSafe(value).trim();
  if (!price) return '';

  return price.toLowerCase().includes('грн') ? price : `${price} грн`;
}

export async function loadCatalog(): Promise<RawCatalogRow[]> {
  const res = await fetch(CSV_URL);
  const text = await res.text();

  const parsed = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    dynamicTyping: false,
    transformHeader: (h) => h.trim()
  });

  const rows = (parsed.data ?? [])
    .filter((row): row is Record<string, unknown> => !!row && typeof row === 'object')
    .map((row) => {
      const out: CsvRow = {};
      for (const [key, value] of Object.entries(row)) {
        out[key] = toStringSafe(value);
      }
      return out;
    });

  return rows
    .filter((row) => toBoolean(row['Показувати']))
    .map((row) => {
      const modelId = row['ModelID']?.trim() ?? '';

      return {
        modelId,
        MarketingTitle:
          (row['Маркетингова назва'] ?? '').trim() ||
          (row['Артикул'] ?? '').trim() ||
          modelId,
        Gender: (row['Стать'] ?? '').trim(),
        Show: (row['Показувати'] ?? '').trim(),
        Priority: toNumberOrNull(row['Пріоритет']),
        ImageUrl: normalizeImageUrl(row['Фото (URL)']),
        DiopterValues: (row['DiopterValues'] ?? '').trim(),
        SitePriceUAH: normalizePrice(row['SitePriceUAH'])
      };
    })
    .filter((row) => row.modelId);
}