import cvData from "../../content/cv.generated.json";

export type CvItem = { html: string; text: string; n?: number; children?: CvBlock[] };
export type CvBlock = { heading?: string; items: CvItem[] };
export type CvSection = { id: string; title: string; blocks: CvBlock[] };

type CvFile = {
  generated_at: string;
  source_sha: string;
  derived: {
    citations_scholar: string | null;
    h_index_scholar: string | null;
    i10_scholar: string | null;
    citation_stats_date: string | null;
    career_start_year: number;
  };
  sections: CvSection[];
};

const cv = cvData as unknown as CvFile;

export const cvMeta = { generatedAt: cv.generated_at, sourceSha: cv.source_sha, ...cv.derived };

export function getSections(): CvSection[] {
  return cv.sections;
}

export function getSection(id: string): CvSection | undefined {
  return cv.sections.find((s) => s.id === id);
}

function* walkItems(blocks: CvBlock[]): Generator<CvItem> {
  for (const b of blocks) {
    for (const it of b.items) {
      yield it;
      if (it.children) yield* walkItems(it.children);
    }
  }
}

/** Items of the list that follows an item whose text starts with `label` (e.g. a supervision list). */
export function listUnder(sectionId: string, label: RegExp): CvItem[] {
  const sec = getSection(sectionId);
  if (!sec) return [];
  for (const it of walkItems(sec.blocks)) {
    if (label.test(it.text) && it.children) return it.children.flatMap((b) => b.items);
  }
  return [];
}

export function supervisedCount(): number {
  const phd = listUnder("professional-services", /^PhD Students \(Main Supervisor\)/i).length;
  const ms = listUnder("professional-services", /^MS Students Graduated \(Main Supervisor\)/i).length;
  return phd + ms;
}

/**
 * Awards are shown plainly: the CV's comparative asides ("a single recipient from the
 * university's 2000-member faculty", "conferred to less than 8% of members") are left out of
 * the website rendering by design — the facts stand without the boasting. Edit here to change.
 */
export function humbleHtml(html: string): string {
  return html
    .replace(/\s*\((?:an annual award given to a single recipient[^)]*|an annual recognition of researchers[^)]*)\)/gi, "")
    .replace(/\s*\(This (?:membership grade|is the highest)[^)]*\)\.?/gi, "")
    .replace(/\s*\(<em>This is the highest national teaching award in Pakistan<\/em>\)\.?/gi, "")
    .replace(/\s*\(<em>In both these cases[^)]*\)<\/em>/gi, "")
    .replace(/\s+\./g, ".")
    .trim();
}

export function getAwards(): CvItem[] {
  return getSection("awards-and-honors")?.blocks.flatMap((b) => b.items) ?? [];
}

export function getTalks(): CvItem[] {
  return getSection("talks-selected")?.blocks.flatMap((b) => b.items) ?? [];
}

export function getCourses(): CvBlock[] {
  return getSection("courses-taught")?.blocks ?? [];
}
