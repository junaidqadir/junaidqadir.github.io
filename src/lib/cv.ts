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

// Display tidy-ups applied once to every CV item (see humbleHtml): no comparative boasting, consistent names.
function tidyBlocks(blocks: CvBlock[]): CvBlock[] {
  return blocks.map((b) => ({
    ...b,
    items: b.items.map((it) => ({ ...it, html: humbleHtml(it.html), children: it.children ? tidyBlocks(it.children) : it.children })),
  }));
}
cv.sections = cv.sections.map((sec) => ({ ...sec, blocks: tidyBlocks(sec.blocks) }));

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
    .replace(/\s*\(In both these cases[^)]*\)/gi, "")
    .replace(/\s*My paper was one of the three finalists shortlisted for this award\./gi, "")
    .replace(/\bWinner of the\b/g, "Recipient of the")
    .replace(/awarded the highest national teaching award in Pakistan/gi, "received the Higher Education Commission of Pakistan’s Best University Teacher Award (2012–13)")
    .replace(/\bSenturk\b/g, "Şentürk")
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

/** Every CV item (at any depth, in any section) whose text matches `re` — used for topic pages. */
export function findCvItems(re: RegExp): { sectionId: string; item: CvItem }[] {
  const out: { sectionId: string; item: CvItem }[] = [];
  for (const s of cv.sections) for (const it of walkItems(s.blocks)) if (re.test(it.text) && !it.children?.length) out.push({ sectionId: s.id, item: it });
  return out;
}
