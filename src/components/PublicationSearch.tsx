"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PublicationCard from "./PublicationCard";
import type { Publication } from "@/types/publication";
import { sectionLabels, tagLabel } from "@/lib/tags";

const themeNames: Record<string, string> = {
  "ai-ethics": "AI ethics & governance",
  "ai-security": "AI safety, security & robustness",
  "health-psychology": "AI in healthcare & mental health",
  education: "AI & engineering education",
  multiplexity: "Multiplexity & systems thinking",
  "ihsan-ethics": "Islamic ethics & ihsan",
  ml: "Machine learning & applied AI",
  "networks-ict4d": "Networks, IoT & ICT4D",
  sustainability: "Smart cities & sustainability",
};
const csv = (p: string | null) => (p ? p.split(",").filter(Boolean) : []);

const field =
  "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";
const label = "text-xs font-medium uppercase tracking-wide text-muted";

export default function PublicationSearch({
  publications,
  allTags,
  yearRange,
}: {
  publications: Publication[];
  allTags: string[];
  yearRange: [number, number];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [minY, maxY] = yearRange;

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [author, setAuthor] = useState(sp.get("author") ?? "");
  const [venue, setVenue] = useState(sp.get("venue") ?? "");
  const [tags, setTags] = useState<string[]>(csv(sp.get("tags")));
  const [types, setTypes] = useState<string[]>(csv(sp.get("type")));
  const [from, setFrom] = useState(sp.get("from") ?? String(minY));
  const [to, setTo] = useState(sp.get("to") ?? String(maxY));
  const [pdfOnly, setPdfOnly] = useState(sp.get("pdf") === "1");
  const [theme, setTheme] = useState(sp.get("theme") ?? "");
  const [showAllTags, setShowAllTags] = useState(false);

  // keep the URL shareable: only non-default filters appear in it
  function sync(next: Partial<{ q: string; author: string; venue: string; tags: string[]; types: string[]; from: string; to: string; pdf: boolean; theme: string }>) {
    const v = { q, author, venue, tags, types, from, to, pdf: pdfOnly, theme, ...next };
    const p = new URLSearchParams();
    if (v.q) p.set("q", v.q);
    if (v.author) p.set("author", v.author);
    if (v.venue) p.set("venue", v.venue);
    if (v.tags.length) p.set("tags", v.tags.join(","));
    if (v.types.length) p.set("type", v.types.join(","));
    if (v.from !== String(minY)) p.set("from", v.from);
    if (v.to !== String(maxY)) p.set("to", v.to);
    if (v.pdf) p.set("pdf", "1");
    if (v.theme) p.set("theme", v.theme);
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }

  const toggle = (arr: string[], x: string) => (arr.includes(x) ? arr.filter((y) => y !== x) : [...arr, x]);
  const toggleTag = (t: string) => { const n = toggle(tags, t); setTags(n); sync({ tags: n }); };
  const toggleType = (t: string) => { const n = toggle(types, t); setTypes(n); sync({ types: n }); };

  function clearAll() {
    setQ(""); setAuthor(""); setVenue(""); setTags([]); setTypes([]); setFrom(String(minY)); setTo(String(maxY)); setPdfOnly(false); setTheme("");
    router.replace(pathname, { scroll: false });
  }

  type Skip = "none" | "tags" | "types" | "theme" | "pdf";
  const authorStrings = useMemo(() => {
    const c = new Map<string, number>();
    publications.forEach((p) => p.authors.forEach((a) => c.set(a, (c.get(a) ?? 0) + 1)));
    return [...c.entries()].filter(([a]) => !/^J\. Qadir$/.test(a)).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, 400);
  }, [publications]);

  // A filter that is "skipped" is left out, so each facet can show the counts you would get by choosing it (faceted counts).
  const passes = useMemo(() => {
    const qq = q.trim().toLowerCase(), aa = author.trim().toLowerCase(), vv = venue.trim().toLowerCase();
    const f = parseInt(from, 10), t = parseInt(to, 10);
    const exact = aa && authorStrings.some(([a]) => a.toLowerCase() === aa);
    const aRe = aa && !exact ? new RegExp(`(^|[^a-z])${aa.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i") : null;
    return (p: Publication, skip: Skip = "none") => {
      if (qq && !`${p.title} ${p.authors.join(" ")} ${p.venue ?? ""}`.toLowerCase().includes(qq)) return false;
      if (aa && !p.authors.some((x) => (exact ? x.toLowerCase() === aa : aRe!.test(x)))) return false;
      if (vv && !(p.venue ?? "").toLowerCase().includes(vv)) return false;
      if (skip !== "tags" && tags.length && !tags.every((x) => p.tags.includes(x))) return false;
      if (skip !== "types" && types.length && !types.includes(p.section ?? "")) return false;
      if (skip !== "pdf" && pdfOnly && !p.pdf) return false;
      if (skip !== "theme" && theme && !p.themes.includes(theme as never)) return false;
      if (p.year != null) {
        if (!Number.isNaN(f) && p.year < f) return false;
        if (!Number.isNaN(t) && p.year > t) return false;
      }
      return true;
    };
  }, [q, author, venue, tags, types, from, to, pdfOnly, theme, authorStrings]);

  const filtered = useMemo(() => publications.filter((p) => passes(p)), [publications, passes]);

  const tagCounts = useMemo(() => {
    const c: Record<string, number> = {};
    filtered.forEach((p) => p.tags.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, [filtered]);
  const baseTagCounts = useMemo(() => {
    const c: Record<string, number> = {};
    publications.forEach((p) => p.tags.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, [publications]);
  // stable order (by overall frequency); tags with no remaining papers are dimmed, never reshuffled under the cursor
  const sortedTags = useMemo(() => [...allTags].sort((a, b) => (baseTagCounts[b] || 0) - (baseTagCounts[a] || 0)), [allTags, baseTagCounts]);
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, 14);
  const themeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    publications.filter((p) => passes(p, "theme")).forEach((p) => p.themes.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, [publications, passes]);
  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    publications.filter((p) => passes(p, "types")).forEach((p) => { const k = p.section ?? ""; c[k] = (c[k] || 0) + 1; });
    return c;
  }, [publications, passes]);
  const nPdf = useMemo(() => publications.filter((p) => passes(p, "pdf") && p.pdf).length, [publications, passes]);

  const grouped = useMemo(() => {
    const m = new Map<string, Publication[]>();
    for (const p of filtered) {
      const k = p.year ? String(p.year) : "Undated";
      m.set(k, [...(m.get(k) ?? []), p]);
    }
    return [...m.entries()];
  }, [filtered]);

  const active = (q ? 1 : 0) + (author ? 1 : 0) + (venue ? 1 : 0) + tags.length + types.length + (pdfOnly ? 1 : 0) + (theme ? 1 : 0) + (from !== String(minY) ? 1 : 0) + (to !== String(maxY) ? 1 : 0);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label className={label} htmlFor="pub-q">Search</label>
          <input id="pub-q" type="search" value={q} onChange={(e) => { setQ(e.target.value); sync({ q: e.target.value }); }} placeholder="title, author or venue — e.g. federated learning" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="pub-author">Co-author</label>
          <input id="pub-author" list="pub-authors" type="text" value={author} onChange={(e) => { setAuthor(e.target.value); sync({ author: e.target.value }); }} placeholder="e.g. A. Qayyum" className={field} />
          <datalist id="pub-authors">{authorStrings.map(([a, n]) => <option key={a} value={a}>{n} papers</option>)}</datalist>
        </div>
        <div>
          <label className={label} htmlFor="pub-venue">Journal / venue</label>
          <input id="pub-venue" type="text" value={venue} onChange={(e) => { setVenue(e.target.value); sync({ venue: e.target.value }); }} placeholder="e.g. IEEE Access" className={field} />
        </div>
      </div>

      <div className="mt-4">
        <span className={label}>Research theme</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(themeNames).map(([k, v]) => (
            <button key={k} aria-pressed={theme === k} onClick={() => { const n = theme === k ? "" : k; setTheme(n); sync({ theme: n }); }}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${theme !== k && !themeCounts[k] ? "opacity-40 " : ""}${theme === k ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`}>
              {v} <span className="opacity-60">{themeCounts[k] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <span className={label}>Year</span>
          <div className="mt-1 flex items-center gap-2">
            <input aria-label="From year" type="number" value={from} onChange={(e) => { setFrom(e.target.value); sync({ from: e.target.value }); }} className="w-24 rounded-md border border-border bg-background px-2 py-2 text-sm outline-none focus:border-accent" />
            <span className="text-muted">–</span>
            <input aria-label="To year" type="number" value={to} onChange={(e) => { setTo(e.target.value); sync({ to: e.target.value }); }} className="w-24 rounded-md border border-border bg-background px-2 py-2 text-sm outline-none focus:border-accent" />
          </div>
        </div>
        <div>
          <span className={label}>Type</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {Object.entries(sectionLabels).filter(([k]) => publications.some((p) => p.section === k)).map(([k, v]) => (
              <button key={k} onClick={() => toggleType(k)} aria-pressed={types.includes(k)} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${theme !== k && !typeCounts[k] ? "opacity-40 " : ""}${types.includes(k) ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`}>
                {v} <span className="opacity-60">{typeCounts[k] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 pb-1.5 text-sm text-muted">
          <input type="checkbox" checked={pdfOnly} onChange={(e) => { setPdfOnly(e.target.checked); sync({ pdf: e.target.checked }); }} className="accent-[var(--accent)]" />
          Open PDF available <span className="text-xs">({nPdf})</span>
        </label>
      </div>

      <div className="mt-4">
        <span className={label}>Tags {tags.length > 1 && "(papers matching all selected)"}</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {visibleTags.map((t) => (
            <button key={t} onClick={() => toggleTag(t)} aria-pressed={tags.includes(t)} className={`rounded-full border px-3 py-1 text-xs transition-colors ${!tags.includes(t) && !tagCounts[t] ? "opacity-40 " : ""}${tags.includes(t) ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`}>
              {tagLabel(t)} <span className="opacity-60">{tagCounts[t] ?? 0}</span>
            </button>
          ))}
          {sortedTags.length > 14 && (
            <button onClick={() => setShowAllTags(!showAllTags)} className="px-2 text-xs text-accent hover:opacity-70">
              {showAllTags ? "fewer tags" : `all ${sortedTags.length} tags`}
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm text-muted" aria-live="polite">
        <span>{filtered.length} of {publications.length} publications</span>
        {active > 0 && <button onClick={clearAll} className="text-accent hover:opacity-70">Clear all filters</button>}
      </div>

      <div className="mt-4">
        {grouped.length === 0 && <p className="py-8 text-center text-sm text-muted">No publications match these filters.</p>}
        {grouped.map(([year, items]) => (
          <section key={year} className="mt-8 first:mt-2">
            <h2 className="mb-3 border-b border-border pb-1 font-serif text-lg text-foreground">
              {year} <span className="ml-1 text-sm text-muted">{items.length}</span>
            </h2>
            {items.map((pub) => (
              <PublicationCard key={pub.slug} pub={pub} onTagClick={(t) => !tags.includes(t) && toggleTag(t)} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
