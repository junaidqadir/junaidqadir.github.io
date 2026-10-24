// Professional distinctions shown as badges (home, About, Awards). Each is matched against the CV's "Awards and Honors" text,
// so a badge appears only when the CV says so, and disappears when the CV item does (for example, an expired term).
// The embargoed item is hidden by embargo.json until its date; after that, run /sync-website and it appears first, automatically.
export type Distinction = { key: string; match: RegExp; label: (text: string) => string; note?: string; lead?: boolean };

const yearOrRange = (t: string) => (t.match(/\b(19|20)\d{2}(?:[–-](?:19|20)?\d{2})?\b/) || [""])[0];

export const distinctions: Distinction[] = [
  { key: "hcr", match: /[removed]?/i, lead: true, label: (t) => `[removed] ${(t.match(/Researchers? (\d{4})/i) || [])[1] ?? yearOrRange(t)}`.trim(), note: "Top 1% by citations in the field, Web of Science" },
  { key: "ieee-dl", match: /IEEE Education Society Distinguished Lecturer/i, label: (t) => `IEEE Education Society Distinguished Lecturer ${yearOrRange(t)}`.trim() },
  { key: "acm-ds", match: /ACM.s Distinguished Speaker|ACM Distinguished Speaker/i, label: (t) => `ACM Distinguished Speaker ${yearOrRange(t)}`.trim() },
  { key: "ieee-sm", match: /IEEE Senior Member/i, label: () => "IEEE Senior Member" },
  { key: "acm-sm", match: /ACM Senior Member/i, label: () => "ACM Senior Member" },
];
