import { cvMeta, supervisedCount } from "@/lib/cv";
import { getAllPublications } from "@/lib/publications";

/** Headline numbers, derived from the CV + publications data so they never go stale. */
export function getKeyNumbers() {
  const pubs = getAllPublications();
  const papers = pubs.filter((p) => p.section === "journal" || p.section === "conference").length;
  const years = new Date().getFullYear() - cvMeta.career_start_year;
  return [
    { value: `${Math.floor(papers / 10) * 10}+`, label: "journal & conference papers" },
    { value: cvMeta.citations_scholar ?? "—", label: `citations${cvMeta.h_index_scholar ? ` (h-index ${cvMeta.h_index_scholar})` : ""}` },
    { value: `${years}+`, label: "years teaching & research" },
    { value: String(supervisedCount()), label: "PhD/MS students supervised" },
  ];
}
