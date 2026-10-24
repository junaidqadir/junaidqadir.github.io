"use client";

import { useMemo, useState } from "react";
import VideoCard from "./VideoCard";
import { topicLabels } from "./TalksExplorer";
import type { VideoItem } from "@/lib/videos";

const chip = (on: boolean) => `rounded-full border px-3 py-1 text-xs transition-colors ${on ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`;

export default function VideosExplorer({ videos }: { videos: VideoItem[] }) {
  const [kind, setKind] = useState("");
  const [topic, setTopic] = useState("");
  const kinds = useMemo(() => [...new Set(videos.map((v) => v.kind))], [videos]);
  const shown = videos.filter((v) => (!kind || v.kind === kind) && (!topic || v.topics.includes(topic)));
  const kindCount = (k: string) => videos.filter((v) => v.kind === k && (!topic || v.topics.includes(topic))).length;
  const topicCount = (t: string) => videos.filter((v) => v.topics.includes(t) && (!kind || v.kind === kind)).length;
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        <button className={chip(!kind)} aria-pressed={!kind} onClick={() => setKind("")}>All {videos.length}</button>
        {kinds.map((k) => (<button key={k} className={chip(kind === k)} aria-pressed={kind === k} onClick={() => setKind(kind === k ? "" : k)}>{k} <span className="opacity-60">{kindCount(k)}</span></button>))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {Object.entries(topicLabels).filter(([k]) => videos.some((v) => v.topics.includes(k))).map(([k, label]) => (
          <button key={k} className={`${chip(topic === k)} ${topic !== k && !topicCount(k) ? "opacity-40" : ""}`} aria-pressed={topic === k} onClick={() => setTopic(topic === k ? "" : k)}>{label} <span className="opacity-60">{topicCount(k)}</span></button>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">{shown.length} of {videos.length} videos</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (<VideoCard key={v.id} v={v} />))}
      </div>
      {shown.length === 0 && <p className="py-10 text-center text-sm text-muted">No videos match these filters.</p>}
    </div>
  );
}
