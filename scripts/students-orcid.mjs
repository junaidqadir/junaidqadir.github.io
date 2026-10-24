#!/usr/bin/env node
// Second pass for students OpenAlex could not match: search ORCID by name and VERIFY a candidate only if at least one of the
// works on their ORCID record has the same title as a paper in our publications archive (i.e. a paper with J. Qadir).
// Merges into archive-local/students/found_links.json for review. Nothing is published automatically.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "..", "archive-local", "students", "found_links.json");
const found = JSON.parse(readFileSync(file, "utf8"));
const { students } = JSON.parse(readFileSync(join(root, "content", "students.generated.json"), "utf8"));
const pubs = JSON.parse(readFileSync(join(root, "content", "publications", "index.json"), "utf8"));
const norm = (t) => (t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const titles = new Set(pubs.map((p) => norm(p.title)));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const J = async (url) => { const r = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(25000) }); if (!r.ok) throw new Error(r.status); return r.json(); };

for (const s of students) {
  if (found[s.id]?.status === "verified co-author" && found[s.id].orcid) continue;
  const parts = s.name.split(/\s+/); const family = parts.at(-1), given = parts[0];
  try {
    const q = encodeURIComponent(`family-name:${family} AND given-names:${given}`);
    const res = await J(`https://pub.orcid.org/v3.0/expanded-search/?q=${q}&rows=8`);
    await sleep(250);
    let hit = null;
    for (const c of res["expanded-result"] || []) {
      const oid = c["orcid-id"];
      const works = await J(`https://pub.orcid.org/v3.0/${oid}/works`);
      await sleep(250);
      const ws = (works.group || []).map((g) => g["work-summary"]?.[0]?.title?.title?.value).filter(Boolean);
      const shared = ws.filter((t) => titles.has(norm(t)));
      if (shared.length && (!hit || shared.length > hit.shared.length)) hit = { oid, shared, c };
    }
    if (!hit) { if (!found[s.id] || found[s.id].status.startsWith("lookup failed")) found[s.id] = { name: s.name, status: "no verified match (ORCID)" }; continue; }
    const rec = { name: s.name, status: "verified co-author", via: "ORCID works match", shared_works: hit.shared.length, orcid: `https://orcid.org/${hit.oid}`, example: hit.shared[0] };
    const urls = await J(`https://pub.orcid.org/v3.0/${hit.oid}/researcher-urls`);
    rec.urls = (urls["researcher-url"] || []).map((u) => ({ name: u["url-name"], url: u.url?.value }));
    const emp = await J(`https://pub.orcid.org/v3.0/${hit.oid}/employments`);
    const items = (emp["affiliation-group"] || []).flatMap((g) => g.summaries || []).map((x) => x["employment-summary"]).filter(Boolean);
    items.sort((p, q) => (q["start-date"]?.year?.value || 0) - (p["start-date"]?.year?.value || 0));
    const cur = items.find((x) => !x["end-date"]) || items[0];
    if (cur) rec.employment = [cur["role-title"], cur.organization?.name, cur.organization?.address?.country].filter(Boolean).join(", ") + (cur["end-date"] ? " (ended)" : "");
    found[s.id] = rec;
  } catch (e) { if (!found[s.id]?.orcid) found[s.id] = { ...(found[s.id] || { name: s.name }), status: "ORCID lookup failed: " + e.message }; }
}
writeFileSync(file, JSON.stringify(found, null, 2));
const v = Object.values(found);
console.log(`${v.filter((x) => x.status === "verified co-author").length} verified of ${v.length}`);
