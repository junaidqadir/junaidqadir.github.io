"use client";

import { useState } from "react";
import type { VideoItem } from "@/lib/videos";

/** Click-to-play: the page loads only a local thumbnail; YouTube is contacted (privacy-enhanced domain) when someone presses play. */
export default function VideoCard({ v, large = false }: { v: VideoItem; large?: boolean }) {
  const [on, setOn] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0${v.start ? `&start=${v.start}` : ""}`;
  const watch = `https://www.youtube.com/watch?v=${v.id}${v.start ? `&t=${v.start}s` : ""}`;
  return (
    <article className="card-ornate overflow-hidden">
      <div className="relative aspect-video bg-foreground/10">
        {on ? (
          <iframe src={src} title={v.title} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play: ${v.title}`} className="group absolute inset-0 block w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/video-thumbs/${v.id}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-accent shadow transition-transform group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
      <div className={large ? "p-5" : "p-4"}>
        <p className="text-xs uppercase tracking-wide text-gold">{v.kind}{v.host ? ` · ${v.host}` : ""}{v.year ? ` · ${v.year}` : ""}</p>
        <h3 className={`mt-1 font-serif leading-snug text-foreground ${large ? "text-xl" : "text-base"}`}>{v.title}</h3>
        <p className="mt-2 text-xs"><a href={watch} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Open on YouTube ↗</a></p>
      </div>
    </article>
  );
}
