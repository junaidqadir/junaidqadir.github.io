import { cvMeta, supervisedCount } from "@/lib/cv";
import { getAllPublications } from "@/lib/publications";
import scholar from "../../content/scholar-stats.json";

const floorTo = (n: number, step: number) => Math.floor(n / step) * step;
/** Prefer the fresher Scholar snapshot over the CV text when it is newer than the CV statistics date. */
function scholarNumbers() {
  // the CV label reads like "last updated November 2026": take the month and year; an unreadable label counts as oldest
  const m = (cvMeta.citation_stats_date ?? "").match(/([A-Z][a-z]+)\s+(\d{4})/);
  const cvDate = m ? new Date(`1 ${m[1]} ${m[2]}`) : new Date(0);
  if (Number.isNaN(cvDate.getTime()) || new Date(scholar.as_of) > cvDate) {
    return {
      citations: `${floorTo(scholar.citations, 500).toLocaleString("en-US")}+`,
      h: `${scholar.h_index}`,
    };
  }
  return { citations: cvMeta.citations_scholar, h: cvMeta.h_index_scholar };
}

/** Headline numbers, derived from the CV + publications data so they never go stale. */
export function getKeyNumbers() {
  const pubs = getAllPublications();
  const sc = scholarNumbers();
  return [
    { value: `${Math.floor(pubs.length / 10) * 10}+`, label: "publications: papers, book chapters and preprints" },
    { value: sc.citations ?? "—", label: `citations${sc.h ? ` (h-index ${sc.h})` : ""}` },
    { value: String(supervisedCount()), label: "PhD/MS students supervised" },
  ];
}
