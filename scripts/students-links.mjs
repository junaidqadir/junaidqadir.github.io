#!/usr/bin/env node
// Finds links each student has published themselves. A candidate counts ONLY if OpenAlex shows co-authored works with
// J. Qadir (so namesakes are excluded); we then read that person's public ORCID record (personal website, Google Scholar,
// LinkedIn, GitHub if they listed them, and their latest employment). Output: archive-local/students/found_links.json for review.
// Nothing is published until you copy confirmed entries into content/students.links.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "..", "archive-local", "students");
mkdirSync(out, { recursive: true });
const { students } = JSON.parse(readFileSync(join(root, "content", "students.generated.json"), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const J = async (url, headers = {}) => { const r = await fetch(url, { headers, signal: AbortSignal.timeout(25000) }); if (!r.ok) throw new Error(r.status); return r.json(); };
const clean = (s) => s.normalize("NFKD").toLowerCase().replace(/[^a-z ]/g, "").trim();

// J. Qadir's OpenAlex author records (the ORCID-linked profile has several fragments)
const qadir = "A5037574053|A5114709545";
const found = {};
for (const s of students) {
  const want = clean(s.name).split(" ");
  try {
    const { results = [] } = await J(`https://api.openalex.org/authors?search=${encodeURIComponent(s.name)}&per-page=8`);
    await sleep(300);
    let best = null;
    for (const a of results) {
      const got = clean(a.display_name).split(" ");
      if (got.at(-1) !== want.at(-1) || got[0][0] !== want[0][0]) continue;
      const id = a.id.replace("https://openalex.org/", "");
      const w = await J(`https://api.openalex.org/works?filter=author.id:${id},author.id:${qadir}&per-page=1`);
      await sleep(300);
      if (w.meta.count > 0 && (!best || w.meta.count > best.shared)) best = { a, shared: w.meta.count };
    }
    if (!best) { found[s.id] = { name: s.name, status: "no verified co-author match" }; continue; }
    const rec = { name: s.name, status: "verified co-author", shared_works: best.shared, openalex: best.a.id, orcid: best.a.orcid || null };
    if (best.a.orcid) {
      const oid = best.a.orcid.replace("https://orcid.org/", "");
      try {
        const urls = await J(`https://pub.orcid.org/v3.0/${oid}/researcher-urls`, { Accept: "application/json" });
        rec.urls = (urls["researcher-url"] || []).map((u) => ({ name: u["url-name"], url: u.url?.value }));
        const emp = await J(`https://pub.orcid.org/v3.0/${oid}/employments`, { Accept: "application/json" });
        const items = (emp["affiliation-group"] || []).flatMap((g) => g.summaries || []).map((x) => x["employment-summary"]).filter(Boolean);
        items.sort((p, q) => (q["start-date"]?.year?.value || 0) - (p["start-date"]?.year?.value || 0));
        const cur = items.find((x) => !x["end-date"]) || items[0];
        if (cur) rec.employment = [cur["role-title"], cur.organization?.name, cur.organization?.address?.country].filter(Boolean).join(", ") + (cur["end-date"] ? " (ended)" : "");
        await sleep(300);
      } catch (e) { rec.orcid_note = "ORCID record not readable: " + e.message; }
    }
    found[s.id] = rec;
  } catch (e) { found[s.id] = { name: s.name, status: "lookup failed: " + e.message }; }
}
writeFileSync(join(out, "found_links.json"), JSON.stringify(found, null, 2));
const v = Object.values(found);
console.log(`${v.filter((x) => x.status === "verified co-author").length} verified of ${v.length}; with ORCID: ${v.filter((x) => x.orcid).length}; with urls: ${v.filter((x) => x.urls?.length).length}`);
