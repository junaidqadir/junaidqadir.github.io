import { getCourses } from "@/lib/cv";

export type Offering = { terms: string; inst: string };
export type CourseRow = { title: string; note?: string; level: "Undergraduate" | "Graduate"; offerings: Offering[]; website?: string; latest: number };

/** Short, readable institution names in the order they appear in the career (most recent first). */
const INST: Record<string, string> = { "Qatar University": "Qatar University", ITU: "ITU Lahore", NUST: "NUST Islamabad", "Virtual University of Pakistan": "Virtual University of Pakistan" };
export const institutionOrder = ["Qatar University", "ITU Lahore", "NUST Islamabad", "Virtual University of Pakistan"];

const tidyTerms = (t: string) => t.replace(/\s*\/\s*/g, ", ").replace(/;\s*/g, ", ").replace(/,?\s+in\s+(?=(Spring|Summer|Fall|Winter)\b)/gi, ", ").replace(/\s+/g, " ").trim();

/** The CV's "Courses taught" lists, parsed into one row per course with its offerings (term + institution). */
export function getCourseRows(): CourseRow[] {
  const blocks = getCourses();
  const rows: CourseRow[] = [];
  blocks.forEach((b, bi) => {
    for (const it of b.items) {
      let text = it.text.replace(/[;.]\s*$/, "").trim();
      const site = text.match(/,?\s*course website:\s*(https?:\/\/\S+)/i)?.[1];
      text = text.replace(/,?\s*course website:\s*https?:\/\/\S+/i, "").trim();
      const offerings: Offering[] = [...text.matchAll(/\(([^)]*)\)\s*\[([^\]]+)\]/g)].map((m) => ({ terms: tidyTerms(m[1]), inst: INST[m[2].trim()] ?? m[2].trim() }));
      if (!offerings.length) continue;
      const cut = text.search(/\s[([]/);
      const title = (cut > 0 ? text.slice(0, cut) : text).trim();
      const note = text.match(/^[^([]*\[([^\]]+)\]\s*\(/)?.[1];
      const years = offerings.flatMap((o) => [...o.terms.matchAll(/\b(20\d\d)\b/g)].map((x) => +x[1]));
      // later undergraduate list comes first in the CV, graduate second
      rows.push({ title, note, level: bi === 0 ? "Undergraduate" : "Graduate", offerings, website: site, latest: Math.max(0, ...years) });
    }
  });
  // the same title offered as different topics (e.g. Advanced Topics in Networking) becomes one row
  const merged = new Map<string, CourseRow>();
  for (const r of rows) {
    const k = `${r.level}|${r.title}`;
    const m = merged.get(k);
    if (m) { m.offerings.push(...r.offerings); m.latest = Math.max(m.latest, r.latest); m.website ??= r.website; } else merged.set(k, { ...r });
  }
  return [...merged.values()].sort((a, b) => b.latest - a.latest || a.title.localeCompare(b.title));
}

export function courseSummary(rows: CourseRow[]) {
  const insts = new Set(rows.flatMap((r) => r.offerings.map((o) => o.inst)));
  return { courses: rows.length, institutions: institutionOrder.filter((i) => insts.has(i)) };
}
