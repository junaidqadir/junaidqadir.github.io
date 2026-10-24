"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Entry = { k: string; t: string; s?: string; h: string; x?: string };
const ORDER = ["Page", "Research", "Publication", "Talk", "Video"];
const PLURAL: Record<string, string> = { Page: "Pages", Research: "Research themes", Publication: "Publications", Talk: "Talks", Video: "Videos" };

export default function SiteSearch() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [data, setData] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/search-index.json").then((r) => r.json()).then((d) => live && setData(d)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, []);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!data || !words.length) return [];
    return data
      .map((e) => {
        const title = e.t.toLowerCase(), rest = `${e.s ?? ""} ${e.x ?? ""}`.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (title.includes(w)) score += 3; else if (rest.includes(w)) score += 1; else return null;
        }
        return { e, score };
      })
      .filter((r): r is { e: Entry; score: number } => !!r)
      .sort((a, b) => b.score - a.score);
  }, [data, q]);

  const groups = ORDER.map((k) => [k, results.filter((r) => r.e.k === k).slice(0, 25)] as const).filter(([, v]) => v.length);

  return (
    <div>
      <label htmlFor="site-q" className="sr-only">Search the site</label>
      <input id="site-q" type="search" autoFocus value={q} placeholder="e.g. federated learning, ihsan, digital twins, IEEE Access"
        onChange={(e) => { setQ(e.target.value); router.replace(e.target.value ? `/search?q=${encodeURIComponent(e.target.value)}` : "/search", { scroll: false }); }}
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none focus:border-accent" />
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {failed ? "Search could not load. Please try again." : !data ? "Loading…" : q.trim().length < 2 ? `${data.length} items to search.` : `${results.length} result${results.length === 1 ? "" : "s"}`}
      </p>
      {groups.map(([k, items]) => (
        <section key={k} className="mt-8">
          <h2 className="border-b border-border pb-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">{PLURAL[k]} <span className="ml-1">{results.filter((r) => r.e.k === k).length}</span></h2>
          <ul className="mt-2">
            {items.map(({ e }, i) => (
              <li key={i} className="border-b border-border/60 py-3">
                {e.h.startsWith("http") ? (
                  <a href={e.h} target="_blank" rel="noopener noreferrer" className="font-serif text-[17px] leading-snug text-foreground hover:text-accent">{e.t} ↗</a>
                ) : (
                  <Link href={e.h} className="font-serif text-[17px] leading-snug text-foreground hover:text-accent">{e.t}</Link>
                )}
                {e.s && <p className="mt-0.5 text-sm text-muted">{e.s}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
