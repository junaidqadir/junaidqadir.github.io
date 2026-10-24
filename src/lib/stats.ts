import { cvMeta, supervisedCount } from "@/lib/cv";
import { getAllPublications } from "@/lib/publications";
import scholar from "../../content/scholar-stats.json";

const floorTo = (n: number, step: number) => Math.floor(n / step) * step;
/** Prefer the fresher Scholar snapshot over the CV text when it is newer than the CV statistics date. */
function scholarNumbers() {
  const cvDate = cvMeta.citation_stats_date ? new Date(`1 ${cvMeta.citation_stats_date}`) : new Date(0);
  if (new Date(scholar.as_of) > cvDate) {
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
  const papers = pubs.filter((p) => p.section === "journal" || p.section === "conference").length;
  const sc = scholarNumbers();
  return [
    { value: `${Math.floor(papers / 10) * 10}+`, label: "journal & conference papers" },
    { value: sc.citations ?? "—", label: `citations${sc.h ? ` (h-index ${sc.h})` : ""}` },
    { value: String(supervisedCount()), label: "PhD/MS students supervised" },
  ];
}
