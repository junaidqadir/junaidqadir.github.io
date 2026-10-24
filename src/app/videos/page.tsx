import type { Metadata } from "next";
import Container from "@/components/Container";
import MediaTabs from "@/components/MediaTabs";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import IhsanMark from "@/components/IhsanMark";
import VideosExplorer from "@/components/VideosExplorer";
import { getVideos, getPlaylistCards } from "@/lib/videos";
import { socials } from "@/content/site";
import RetryImg from "@/components/RetryImg";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Videos — Junaid Qadir",
  description: "Talks, interviews, research presentations, lectures and full courses by Junaid Qadir on YouTube, organized by topic.",
};

type Art = Parameters<typeof GeoArt>[0]["kind"];

export default function VideosPage() {
  const videos = getVideos();
  const lists = getPlaylistCards();
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <MediaTabs current="videos" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Watch</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">Videos<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Talks, interviews, research presentations and full courses, gathered in one place and sorted by topic. Press play to watch here, or open any video on YouTube.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="#playlists" className="text-accent hover:opacity-70">Courses &amp; playlists ↓</a>
              <a href={`${socials.youtube}/playlists`} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">YouTube channel ↗</a>
            </p>
          </div>
          <GeoArt kind="star16" size={160} className="hidden sm:block" />
        </Container>
      </section>

      <Container width="max-w-6xl" className="space-y-16 py-14">
        <section>
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Talks, interviews &amp; presentations</h2>
          <div className="mt-6"><VideosExplorer videos={videos} /></div>
        </section>

        <Ornament />

        <section id="playlists" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Courses &amp; playlists</h2>
          <p className="mt-3 max-w-2xl text-muted">Full lecture series and short courses, each as a YouTube playlist.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map((l) => (
              <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="card-ornate group block overflow-hidden">
                <div className="relative aspect-video bg-foreground/10">
                  {l.thumb && <RetryImg src={asset(l.thumb)} alt="" className="h-full w-full object-cover" />}
                  <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">▶ {l.count} videos</span>
                  <span className="absolute left-2 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-background/90">
                    {l.themes?.[0] === "ihsan-ethics" ? <IhsanMark size={40} round /> : <GeoArt kind={l.art as Art} size={38} />}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base leading-snug text-foreground group-hover:text-accent">{l.title} ↗</h3>
                  {l.blurb && <p className="mt-1 text-sm leading-relaxed text-muted">{l.blurb}</p>}
                </div>
              </a>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
