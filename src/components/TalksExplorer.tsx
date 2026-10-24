"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type TalkItem = { html: string; year: number | null; kind: string; topics: string[]; video: string | null; slides: string | null };

export const topicLabels: Record<string, string> = {
  "ai-ethics": "AI ethics & safety",
  "ai-governance": "AI governance & policy",
  healthcare: "AI in healthcare",
  education: "AI & engineering education",
  multiplexity: "Multiplexity",
  islamic: "Islamic ethics & ihsan",
  "digital-twins": "Digital twins",
  networks: "Networks, security & ML",
};

const csv = (p: string | null) => (p ? p.split(",").filter(Boolean) : []);
const chip = (on: boolean) =>
  `rounded-full border px-3 py-1 text-xs transition-colors ${on ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`;
const label = "text-xs font-medium uppercase tracking-wide text-muted";
const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

export default function TalksExplorer({ items }: { items: TalkItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const years = useMemo(() => [...new Set(items.map((i) => i.year).filter((y): y is number => !!y))].sort((a, b) => b - a), [items]);
  const kinds = useMemo(() => [...new Set(items.map((i) => i.kind))], [items]);

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [topics, setTopics] = useState<string[]>(csv(sp.get("topic")));
  const [kind, setKind] = useState<string[]>(csv(sp.get("kind")));
  const [year, setYear] = useState(sp.get("year") ?? "");
  const [media, setMedia] = useState(sp.get("media") === "1");

  function sync(n: Partial<{ q: string; topics: string[]; kind: string[]; year: string; media: boolean }>) {
    const v = { q, topics, kind, year, media, ...n };
    const p = new URLSearchParams();
    if (v.q) p.set("q", v.q);
    if (v.topics.length) p.set("topic", v.topics.join(","));
    if (v.kind.length) p.set("kind", v.kind.join(","));
    if (v.year) p.set("year", v.year);
    if (v.media) p.set("media", "1");
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}#all-talks` : pathname + "#all-talks", { scroll: false });
  }
  const toggle = (a: string[], x: string) => (a.includes(x) ? a.filter((y) => y !== x) : [...a, x]);

  const topicCounts = useMemo(() => {
    const c: Record<string, number> = {};
    items.forEach((i) => i.topics.forEach((t) => (c[t] = (c[t] || 0) + 1)));
    return c;
  }, [items]);

  const shown = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items.filter((i) => {
      if (qq && !i.html.replace(/<[^>]+>/g, " ").toLowerCase().includes(qq)) return false;
      if (topics.length && !topics.every((t) => i.topics.includes(t))) return false;
      if (kind.length && !kind.includes(i.kind)) return false;
      if (year && String(i.year) !== year) return false;
      if (media && !(i.video || i.slides)) return false;
      return true;
    });
  }, [items, q, topics, kind, year, media]);

  const active = (q ? 1 : 0) + topics.length + kind.length + (year ? 1 : 0) + (media ? 1 : 0);
  const nMedia = items.filter((i) => i.video || i.slides).length;

  return (
    <div id="all-talks" className="scroll-mt-24">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="talk-q">Search</label>
          <input id="talk-q" type="search" value={q} onChange={(e) => { setQ(e.target.value); sync({ q: e.target.value }); }} placeholder="title, event, place — e.g. keynote, Doha" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="talk-year">Year</label>
          <select id="talk-year" value={year} onChange={(e) => { setYear(e.target.value); sync({ year: e.target.value }); }} className={field}>
            <option value="">All years</option>
            {years.map((y) => (<option key={y} value={y}>{y}</option>))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <span className={label}>Topic</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(topicLabels).filter(([k]) => topicCounts[k]).map(([k, v]) => (
            <button key={k} aria-pressed={topics.includes(k)} onClick={() => { const n = toggle(topics, k); setTopics(n); sync({ topics: n }); }} className={chip(topics.includes(k))}>
              {v} <span className="opacity-60">{topicCounts[k]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3">
        <div>
          <span className={label}>Type</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button key={k} aria-pressed={kind.includes(k)} onClick={() => { const n = toggle(kind, k); setKind(n); sync({ kind: n }); }} className={chip(kind.includes(k))}>{k}</button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 pb-1 text-sm text-muted">
          <input type="checkbox" checked={media} onChange={(e) => { setMedia(e.target.checked); sync({ media: e.target.checked }); }} className="accent-[var(--accent)]" />
          Recording or slides available <span className="text-xs">({nMedia})</span>
        </label>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm text-muted" aria-live="polite">
        <span>{shown.length} of {items.length} talks</span>
        {active > 0 && <button onClick={() => { setQ(""); setTopics([]); setKind([]); setYear(""); setMedia(false); router.replace(pathname + "#all-talks", { scroll: false }); }} className="text-accent hover:opacity-70">Clear all filters</button>}
      </div>
      <ul className="mt-2">
        {shown.length === 0 && <li className="py-8 text-center text-sm text-muted">No talks match these filters.</li>}
        {shown.map((t, i) => (
          <li key={i} className="border-b border-border py-4 text-[15px] leading-relaxed text-muted">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              {t.year && <span className="font-serif text-sm text-accent">{t.year}</span>}
              <span className="uppercase tracking-wide text-gold">{t.kind}</span>
              {t.topics.map((x) => (<span key={x} className="text-muted/80">· {topicLabels[x]}</span>))}
            </div>
            <p className="mt-1" dangerouslySetInnerHTML={{ __html: t.html }} />
            {(t.video || t.slides) && (
              <p className="mt-1 flex gap-4 text-sm">
                {t.video && <a href={t.video} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">▶ Watch</a>}
                {t.slides && <a href={t.slides} className="text-accent hover:opacity-70">Slides (PDF) ↓</a>}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
