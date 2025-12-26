import type { ExtraWorkOption, ServiceSection, ServiceRow } from "./types";

type InsertSpec = {
  rows: ServiceRow[];
  afterRowId?: string;
  beforeRowId?: string;
  index?: number;
};

function legacyRows(opt: ExtraWorkOption): ServiceRow[] {
  if (Array.isArray(opt.rows) && opt.rows.length > 0) return opt.rows;
  if (opt.row) return [opt.row];
  return [];
}

function insertRows(baseRows: ServiceRow[], spec: InsertSpec): ServiceRow[] {
  const rows = [...baseRows];

  let idx = rows.length;

  if (typeof spec.index === "number") {
    idx = Math.max(0, Math.min(rows.length, spec.index));
  } else if (spec.beforeRowId) {
    const i = rows.findIndex((r) => r.id === spec.beforeRowId);
    idx = i >= 0 ? i : rows.length;
  } else if (spec.afterRowId) {
    const i = rows.findIndex((r) => r.id === spec.afterRowId);
    idx = i >= 0 ? i + 1 : rows.length;
  }

  rows.splice(idx, 0, ...spec.rows);
  return rows;
}

export function buildEffectiveSections(
  base: ServiceSection[],
  extraWorks: ExtraWorkOption[] | undefined,
  selectedIds: string[]
): ServiceSection[] {
  if (!extraWorks?.length || selectedIds.length === 0) return base;

  const selected = new Set(selectedIds);

  const insertsBySection = new Map<string, InsertSpec[]>();

  for (const opt of extraWorks) {
    if (!selected.has(opt.id)) continue;

    if (Array.isArray(opt.add) && opt.add.length > 0) {
      for (const a of opt.add) {
        if (!a.sectionId) continue;
        const list = insertsBySection.get(a.sectionId) ?? [];
        list.push({
          rows: a.rows ?? [],
          afterRowId: a.afterRowId,
          beforeRowId: a.beforeRowId,
          index: a.index,
        });
        insertsBySection.set(a.sectionId, list);
      }
      continue;
    }

    if (opt.sectionId) {
      const rowsToAdd = legacyRows(opt);
      if (!rowsToAdd.length) continue;

      const list = insertsBySection.get(opt.sectionId) ?? [];
      list.push({ rows: rowsToAdd });
      insertsBySection.set(opt.sectionId, list);
    }
  }

  return base.map((sec) => {
    const specs = insertsBySection.get(sec.id);
    if (!specs?.length) return sec;

    let merged = [...sec.rows];
    for (const spec of specs) {
      if (!spec.rows?.length) continue;
      merged = insertRows(merged, spec);
    }

    const seen = new Set<string>();
    merged = merged.filter((r) =>
      seen.has(r.id) ? false : (seen.add(r.id), true)
    );

    return { ...sec, rows: merged };
  });
}

export function allowedRowIds(sections: ServiceSection[]): Set<string> {
  return new Set(sections.flatMap((s) => s.rows.map((r) => r.id)));
}
