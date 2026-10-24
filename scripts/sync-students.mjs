#!/usr/bin/env node
// Students supervised, parsed from the CV's supervision lists (content/cv.generated.json) into content/students.generated.json.
// Public links (website, Google Scholar, ORCID, ...) are NOT guessed: they live in content/students.links.json and are added
// only after each student confirms. Run automatically by `npm run sync-cv`.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cv = JSON.parse(readFileSync(join(root, "content", "cv.generated.json"), "utf8"));
const sec = cv.sections.find((s) => s.id === "professional-services");

function* walk(blocks) {
  for (const b of blocks) for (const it of b.items) { yield { it, heading: b.heading }; if (it.children) yield* walk(it.children); }
}
function listUnder(re) {
  for (const { it } of walk(sec.blocks)) if (re.test(it.text) && it.children) return it.children.flatMap((b) => b.items);
  return [];
}

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function parse(text, degree) {
  const quoted = (text.match(/[“"]([^”"]+)[”"]/) || [])[1] ?? null;
  const [before, after = ""] = quoted ? text.split(/[“"][^”"]+[”"]/) : [text, ""];
  const parts = before.split(",").map((x) => x.trim()).filter(Boolean);
  const name = parts[0];
  const institution = parts.slice(1).join(", ").replace(/\.$/, "") || null;
  const years = [...(after + " " + (parts.slice(1).join(" "))).matchAll(/\b(19|20)\d{2}\b/g)].map((m) => +m[0]);
  const year = years.length ? years[years.length - 1] : null;
  const expected = /expected/i.test(text);
  return { id: slug(name), name, degree, institution: institution && !/^\d{4}$/.test(institution) ? institution.replace(/,?\s*\d{4}\s*$/, "") : null, thesis: quoted, year, expected };
}

const students = [
  ...listUnder(/^PhD Students \(Main Supervisor\)/i).map((i) => parse(i.text, "PhD")),
  ...listUnder(/^MS Students Graduated \(Main Supervisor\)/i).map((i) => parse(i.text, "MS")),
].filter((s) => s.name);

writeFileSync(join(root, "content", "students.generated.json"), JSON.stringify({ generated_at: cv.generated_at, students }, null, 2) + "\n");
console.log(`students.generated.json: ${students.length} students (${students.filter((s) => s.degree === "PhD").length} PhD, ${students.filter((s) => s.degree === "MS").length} MS)`);
