export type FlowModel = {
  modelId: string;
  marketingTitle: string;
  sitePriceUAH: string;
  imageUrl: string;

  show?: string;
  gender?: string;
  diopterValues?: string;
  priority?: number | string | null;
};

function normalize(value: unknown): string {
  return String(value ?? '').trim();
}

function normalizeLower(value: unknown): string {
  return normalize(value).toLowerCase();
}

function normalizeDiopter(value: unknown): string {
  let s = normalize(value).replace(',', '.');

  if (!s) return '';

  if (!s.startsWith('+') && !s.startsWith('-')) {
    const num = Number(s);
    if (!Number.isNaN(num) && num > 0) s = `+${s}`;
  }

  const num = Number(s);
  if (Number.isNaN(num)) return s;

  return num >= 0 ? `+${num.toFixed(2)}` : `${num.toFixed(2)}`;
}

function parsePriority(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

function parsePrice(value: unknown): number {
  const cleaned = normalize(value).replace(/[^\d.,-]/g, '').replace(',', '.');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

function hasSelectedDiopter(selectedDiopter: string, rawValues: unknown): boolean {
  const source = normalize(rawValues);
  if (!source) return false;

  const values = source
    .split(/[\s,;|]+/)
    .map((item) => normalizeDiopter(item))
    .filter(Boolean);

  return values.includes(normalizeDiopter(selectedDiopter));
}

function hasPrice(model: FlowModel): boolean {
  return normalize(model.sitePriceUAH) !== '';
}

function groupByPrice(models: FlowModel[]) {
  const cheap: FlowModel[] = [];
  const mid: FlowModel[] = [];
  const expensive: FlowModel[] = [];

  for (const m of models) {
    const price = parsePrice(m.sitePriceUAH);

    if (price <= 300) cheap.push(m);
    else if (price <= 500) mid.push(m);
    else expensive.push(m);
  }

  return { cheap, mid, expensive };
}

function roundRobin(groups: FlowModel[][], limit: number): FlowModel[] {
  const result: FlowModel[] = [];
  let index = 0;

  while (result.length < limit) {
    let added = false;

    for (const group of groups) {
      if (group[index]) {
        result.push(group[index]);
        added = true;

        if (result.length >= limit) return result;
      }
    }

    if (!added) break;
    index++;
  }

  return result;
}

export function getFlowModels(
  allModels: FlowModel[],
  selectedDiopter: string
): FlowModel[] {
  // 1. базові фільтри
  const showAllowed = allModels.filter(
    (model) => normalizeLower(model.show) === 'так'
  );

  const femaleOnly = showAllowed.filter(
    (model) => normalizeLower(model.gender) === 'жіноча'
  );

  const withPrice = femaleOnly.filter(hasPrice);

  const byDiopter = withPrice.filter((model) =>
    hasSelectedDiopter(selectedDiopter, model.diopterValues)
  );

  if (byDiopter.length === 0) {
    return withPrice.length ? [withPrice[0]] : [];
  }

  // 2. сортування тільки по Priority (БЕЗ ціни)
  const sorted = [...byDiopter].sort(
    (a, b) => parsePriority(a.priority) - parsePriority(b.priority)
  );

  // 3. групування по ціні
  const { cheap, mid, expensive } = groupByPrice(sorted);

  // 4. round-robin порядок
  const mixed = roundRobin([cheap, mid, expensive], 15);

  return mixed;
}