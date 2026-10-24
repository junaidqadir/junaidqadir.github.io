#!/usr/bin/env node
// Builds a confirmation pack for the students (private, local): a CSV of what the site would show, suggested ORCID / OpenAlex
// matches for each student (a SUGGESTION only: names collide, so each student must confirm), and a draft email.
// Nothing here is published. Confirmed links go into content/students.links.json by hand.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2] || join(root, "..", "archive-local", "students");
mkdirSync(out, { recursive: true });
const { students } = JSON.parse(readFileSync(join(root, "content", "students.generated.json"), "utf8"));
const pubs = JSON.parse(readFileSync(join(root, "content", "publications", "index.json"), "utf8"));
const clean = (s) => s.normalize("NFKD").toLowerCase().replace(/[^a-z ]/g, "").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const INST = { QU: /qatar univ/i, ITU: /information technology univ|itu/i, "SEECS, NUST": /national univ.*sciences|nust/i };

async function suggest(name, inst) {
  try {
    const r = await fetch(`https://api.openalex.org/authors?search=${encodeURIComponent(name)}&per-page=5`, { signal: AbortSignal.timeout(20000) });
    const j = await r.json();
    const want = clean(name);
    const cands = (j.results || []).filter((a) => clean(a.display_name) === want || clean(a.display_name).split(" ").slice(-1)[0] === want.split(" ").slice(-1)[0]);
    const hit = cands.find((a) => (a.last_known_institutions || []).some((i) => INST[inst]?.test(i.display_name))) || null;
    const a = hit || cands[0];
    if (!a) return { orcid: "", openalex: "", note: "no candidate" };
    return { orcid: a.orcid || "", openalex: a.id, note: hit ? "name + institution match" : "name match only: check" };
  } catch (e) { return { orcid: "", openalex: "", note: "lookup failed" }; }
}

const rows = [];
for (const s of students) {
  const parts = clean(s.name).split(/\s+/);
  const papers = pubs.filter((p) => p.authors.some((a) => { const aa = clean(a).split(/\s+/); return aa.at(-1) === parts.at(-1) && aa[0]?.[0] === parts[0][0]; })).length;
  const sug = await suggest(s.name, s.institution);
  rows.push({ ...s, papers, ...sug });
  await sleep(400);
}
const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const cols = ["name", "degree", "institution", "year", "thesis", "papers", "orcid", "openalex", "note"];
writeFileSync(join(out, "students_confirmation.csv"), [cols.join(","), ...rows.map((r) => cols.map((c) => q(r[c])).join(","))].join("\n") + "\n");
writeFileSync(join(out, "students.links.template.json"), JSON.stringify(Object.fromEntries(rows.map((r) => [r.id, { website: "", scholar: "", orcid: r.orcid ? `${r.orcid}` : "", linkedin: "", current: "" }])), null, 2));
writeFileSync(join(out, "draft_email.md"), `Subject: Your entry on my website — please confirm

Dear <first name>,

I am adding a Students page to my website (https://junaidqadir.github.io/students/) listing the graduate students whose theses I have supervised.
Right now, taken from my CV, your entry reads:

  <Name> — <degree>, <institution>, <year>
  Thesis: "<title>"

Please reply to let me know:
  1. Whether this is correct, and whether you are happy to be listed (you can ask me to remove it at any time).
  2. Optionally, links you would like shown: personal website, Google Scholar profile, ORCID, LinkedIn or GitHub.
  3. Optionally, your current position, in one line.

I will only add links that you send me. Thank you, and I hope you are doing well.

Junaid
`);
console.log(`wrote ${rows.length} rows to ${out}`);
console.log(rows.filter((r) => r.note.startsWith("name + institution")).length, "name+institution matches;", rows.filter((r) => r.note === "name match only: check").length, "name-only;", rows.filter((r) => /no cand|failed/.test(r.note)).length, "none/failed");
