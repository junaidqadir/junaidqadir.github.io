#!/usr/bin/env node
// Turn the master CV (QadirCV.tex) into content/cv.generated.json.
//
//   CV_TEX=/path/to/QadirCV.tex npm run sync-cv      (or: node scripts/sync-cv.mjs /path/to/QadirCV.tex)
//
// The CV stays canonical. Publications are handled separately (publications repo);
// every other section (career, awards, funding, teaching, service, supervision,
// talks, ...) is parsed generically from its itemize/enumerate structure so new
// items you add to the CV appear on the website after one re-sync.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cvPath = process.argv[2] || process.env.CV_TEX;
if (!cvPath) {
  console.error("usage: node scripts/sync-cv.mjs /path/to/QadirCV.tex");
  process.exit(1);
}
const raw = readFileSync(cvPath, "utf8");

// ---------- LaTeX -> safe HTML (own CV only; everything else is escaped) ----------
const ACCENTS = {
  "\\'a": "á", "\\'e": "é", "\\'i": "í", "\\'o": "ó", "\\'u": "ú", "\\`a": "à", '\\"a': "ä", '\\"o': "ö", '\\"u': "ü",
  "\\'{a}": "á", "\\'{e}": "é", "\\'{i}": "í", "\\'{o}": "ó", "\\'{u}": "ú", "\\c{c}": "ç", "\\v{s}": "š",
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const safeUrl = (u) => (/^(https?:\/\/|mailto:)/i.test(u) ? u.replace(/"/g, "%22") : "#");

function texToHtml(src) {
  let s = src;
  for (const [k, v] of Object.entries(ACCENTS)) s = s.split(k).join(v);
  // protect links before escaping
  const links = [];
  s = s.replace(/\\footnote\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/g, ""); // footnotes: drop (their URLs are not part of the sentence)
  s = s.replace(/\\href\{([^{}]*)\}\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, u, t) => `\u0001L${links.push([u, t]) - 1}\u0002`);
  s = s.replace(/\\url\{([^{}]*)\}/g, (_, u) => `\u0001L${links.push([u, u]) - 1}\u0002`);
  s = esc(s);
  // bold/italic wrappers, innermost first
  let prev;
  do {
    prev = s;
    s = s
      .replace(/\\textbf\{([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\\(?:textit|emph)\{([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\\textsuperscript\{([^{}]*)\}/g, "<sup>$1</sup>")
      .replace(/\{\\(?:bf|bfseries)\s+([^{}]*)\}/g, "<strong>$1</strong>")
      .replace(/\{\\(?:it|itshape|em)\s+([^{}]*)\}/g, "<em>$1</em>")
      .replace(/\{\\small\s*([^{}]*)\}/g, "$1")
      .replace(/\\(?:small|footnotesize|large|Large|normalsize|medskip|bigskip|smallskip|noindent|centering|hfill|newline|pagebreak|newpage|raggedright)\b\s*/g, " ");
  } while (s !== prev);
  s = s
    .replace(/\\&amp;/g, "&amp;").replace(/\\%/g, "%").replace(/\\_/g, "_").replace(/\\\$/g, "$").replace(/\\#/g, "#")
    .replace(/\\\\(\[[^\]]*\])?/g, " ").replace(/~/g, " ")
    .replace(/---/g, "—").replace(/--/g, "–").replace(/``/g, "“").replace(/''/g, "”")
    .replace(/\\[a-zA-Z]+\*?(\[[^\]]*\])?/g, "") // drop leftover macros
    .replace(/[{}]/g, "");
  s = s.replace(/\u0001L(\d+)\u0002/g, (_, i) => {
    const [u, t] = links[+i];
    const inner = u === t ? esc(t) : texToHtml(t).replace(/<\/?a[^>]*>/g, "");
    return `<a href="${safeUrl(u)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  });
  return s.replace(/\s+/g, " ").trim();
}
const toText = (html) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/ /g, " ").trim();

// ---------- structural parse of itemize/enumerate trees ----------
const LIST_BEGIN = /\\begin\{(itemize|enumerate|etaremune|cvenum)\}(\{\w+\})?(\[[^\]]*\])?/;

function findMatchingEnd(src, from) {
  // src[from..] starts right after a \begin{list}; return index of its matching \end
  const re = /\\(begin|end)\{(itemize|enumerate|etaremune|cvenum)\}/g;
  re.lastIndex = from;
  let depth = 1, m;
  while ((m = re.exec(src))) {
    depth += m[1] === "begin" ? 1 : -1;
    if (depth === 0) return m.index;
  }
  return src.length;
}

function splitItems(listBody) {
  // split at top-level \item (nested lists skipped)
  const items = [];
  let depth = 0, last = -1;
  const re = /\\(begin|end)\{(itemize|enumerate|etaremune|cvenum)\}|\\item\b/g;
  let m;
  while ((m = re.exec(listBody))) {
    if (m[1] === "begin") depth++;
    else if (m[1] === "end") depth--;
    else if (depth === 0) {
      if (last >= 0) items.push(listBody.slice(last, m.index));
      last = m.index + m[0].length;
    }
  }
  if (last >= 0) items.push(listBody.slice(last));
  return items.map((s) => s.trim()).filter(Boolean);
}

function parseBlocks(src) {
  const blocks = [];
  let rest = src;
  for (;;) {
    const m = rest.match(LIST_BEGIN);
    const head = (m ? rest.slice(0, m.index) : rest).trim();
    if (head && !/^\\(vspace|hspace|pagebreak|newpage|medskip)/.test(head)) {
      const html = texToHtml(head);
      if (toText(html)) blocks.push({ heading: html, items: [] });
    }
    if (!m) break;
    const bodyStart = m.index + m[0].length;
    const end = findMatchingEnd(rest, bodyStart);
    const body = rest.slice(bodyStart, end);
    const ordered = m[1] !== "itemize";
    const items = splitItems(body);
    const parsed = items.map((it, idx) => {
      const nested = it.match(LIST_BEGIN);
      const lead = nested ? it.slice(0, nested.index) : it;
      const html = texToHtml(lead);
      const item = { html, text: toText(html) };
      if (ordered) item.n = m[1] === "etaremune" || m[1] === "cvenum" ? items.length - idx : idx + 1;
      if (nested) item.children = parseBlocks(it.slice(nested.index));
      return item;
    }).filter((it) => it.text || it.children);
    // attach to a preceding heading-only block if there is one, else new block
    const last = blocks[blocks.length - 1];
    if (last && last.heading && last.items.length === 0) last.items = parsed;
    else blocks.push({ items: parsed });
    rest = rest.slice(end).replace(/^\\end\{(itemize|enumerate|etaremune|cvenum)\}/, "");
  }
  return blocks;
}

// ---------- sections ----------
const body = raw.split("\n").map((l) => (/^\s*%/.test(l) ? "" : l.replace(/(?<!\\)%.*$/, ""))).join("\n");
const doc = body.slice(body.indexOf("\\begin{document}"));
const parts = doc.split(/\\parag\{([^{}]*)\}/);
const sections = [];
for (let i = 1; i < parts.length; i += 2) {
  const title = parts[i].trim();
  const content = parts[i + 1].replace(/\\end\{document\}[\s\S]*$/, "");
  if (/^(Publications|References)$/i.test(title)) continue; // publications live in their own repo
  sections.push({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title: title.replace(/\s*\/\s*/g, " / "),
    blocks: parseBlocks(content),
  });
}

// ---------- embargo: keep not-yet-announced items off the public site ----------
import { existsSync } from "node:fs";
const embargoFile = join(root, "embargo.json");
const embargoes = existsSync(embargoFile)
  ? JSON.parse(readFileSync(embargoFile, "utf8")).items.filter((e) => new Date(e.until) > new Date()).map((e) => new RegExp(e.pattern, "i"))
  : [];
function dropEmbargoed(blocks) {
  return blocks.map((b) => ({
    ...b,
    items: b.items
      .filter((it) => !embargoes.some((re) => re.test(it.text)))
      .map((it) => (it.children ? { ...it, children: dropEmbargoed(it.children) } : it)),
  }));
}
if (embargoes.length) for (const s of sections) s.blocks = dropEmbargoed(s.blocks);

// ---------- derived headline numbers (so the homepage never goes stale) ----------
const text = toText(texToHtml(body));
const num = (re) => (text.match(re) || [])[1] || null;
const derived = {
  citations_scholar: num(/Google Scholar:?\s*Citations\s*([\d,]+\+?)/i),
  h_index_scholar: num(/Google Scholar:?\s*Citations[^;]*;\s*h-index\s*(\d+\+?)/i),
  i10_scholar: num(/i10-index\s*(\d+\+?)/i),
  citation_stats_date: num(/Citation statistics \(([^)]+)\)/i),
  phd_main_supervisor: sections.flatMap((s) => s.blocks).flatMap((b) => [b, ...b.items.flatMap((i) => i.children || [])])
    .find((b) => /PhD Students \(Main Supervisor\)/i.test(b.heading || ""))?.items.length ?? null,
  career_start_year: 2008,
};

const sha = createHash("sha256").update(raw).digest("hex").slice(0, 12);
mkdirSync(join(root, "content"), { recursive: true });
writeFileSync(
  join(root, "content", "cv.generated.json"),
  JSON.stringify({ generated_at: new Date().toISOString().slice(0, 10), source_sha: sha, derived, sections }, null, 2) + "\n"
);
const count = (bs) => bs.reduce((n, b) => n + b.items.length + b.items.reduce((m, i) => m + (i.children ? count(i.children) : 0), 0), 0);
console.log(`cv.generated.json written (source ${sha}) — ${sections.length} sections:`);
for (const s of sections) console.log(`  ${s.id.padEnd(36)} ${String(count(s.blocks)).padStart(4)} items`);
console.log("derived:", derived);
