import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { socials } from "@/content/site";
import { talkCategories, talks } from "@/content/talks";
import { Suspense } from "react";
import { getTalks, listUnder } from "@/lib/cv";
import TalksExplorer, { type TalkItem } from "@/components/TalksExplorer";
import { playlists, playlistUrl } from "@/content/playlists";
import { slidesFor } from "@/content/slides";

export const metadata: Metadata = { title: "Talks & Media — Junaid Qadir" };

const words = (t: string) => new Set(t.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w.length > 3));
function overlap(a: string, b: string) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size);
}
const videoUrl = (t: (typeof talks)[number]) =>
  t.youtubeId ? `https://youtube.com/watch?v=${t.youtubeId}${t.startSeconds ? `&t=${t.startSeconds}s` : ""}` : t.youtubePlaylistId ? `https://youtube.com/playlist?list=${t.youtubePlaylistId}` : (t.url ?? null);

const TOPIC_RULES: [string, RegExp][] = [
  ["ai-ethics", /ethic|responsib|trustworth|safe|bias|harm|accountab/i],
  ["ai-governance", /governance|regulat|polic(y|ies)|standard|P3722|compliance|law/i],
  ["healthcare", /health|medical|clinical|surg|patient|pharma|psycho|bioethic|therap|digital twins? for/i],
  ["education", /educat|teaching|learning|pedagog|student|classroom|curricul|writing|engineer of|GUIDES|ChatGPT/i],
  ["multiplexity", /multiplex|wisdom|systemics|holistic|one and the many/i],
  ["islamic", /islam|ihsan|ghazal|quran|muslim|ummat|usul|spiritual/i],
  ["digital-twins", /digital twin/i],
  ["networks", /network|wireless|5g|iot|adversarial|security|cyber|vehicular|cognitive|machine learning|deep learning/i],
];
const KIND_RULES: [string, RegExp][] = [
  ["Keynote / plenary", /keynote|plenary|distinguished (invited )?talk/i],
  ["Tutorial / workshop", /tutorial|workshop|master ?class|hands-on/i],
  ["Panel", /panel|moderator|session chair|debate|roundtable/i],
  ["Lecture / course", /guest lectur|lecturer|lecture|short course|course/i],
  ["Podcast / interview", /podcast|interview/i],
];
const classify = (text: string) => ({
  topics: TOPIC_RULES.filter(([, re]) => re.test(text)).map(([k]) => k),
  kind: (KIND_RULES.find(([, re]) => re.test(text)) ?? ["Invited / conference talk"])[0],
  year: (() => { const m = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((x) => +x[0]).filter((y) => y <= 2030); return m.length ? m[m.length - 1] : null; })(),
});

export default function TalksPage() {
  // Match each CV talk to a recording we already know about (by quoted title), so the full list stays CV-driven.
  const source = [
    ...getTalks(),
    ...listUnder("professional-services", /^Invited Keynote Speaker/i),
    ...listUnder("professional-services", /^Tutorials/i),
    ...listUnder("professional-services", /^Session Chair/i),
  ];
  const seen = new Set<string>();
  const items: TalkItem[] = source.filter((it) => (seen.has(it.text) ? false : (seen.add(it.text), true))).map((it) => {
    const quoted = (it.text.match(/“([^”]+)”/) || [])[1] ?? it.text;
    const hit = talks.find((t) => videoUrl(t) && overlap(quoted, t.title) >= 0.7);
    return { html: it.html, video: hit ? videoUrl(hit) : null, slides: slidesFor(it.text), ...classify(it.text) };
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return (
    <Container width="max-w-4xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Talks & Media</h1>
      <p className="mt-3 max-w-xl text-muted">
        Recordings of lectures, short courses, interviews and conference talks, followed by the complete
        list of invited talks and presentations from my CV. For a watch-first view, see the{" "}
        <Link href="/videos" className="text-accent hover:opacity-70">Videos page</Link>.
      </p>

      <div className="mt-12 space-y-14">
        {talkCategories.map((cat) => {
          const items = talks.filter((t) => t.category === cat.key);
          return (
            <section key={cat.key}>
              <h2 className="font-serif text-xl text-foreground">
                {cat.label}
              </h2>
              {items.length > 0 ? (
                <div className="mt-4 space-y-6">
                  {items.map((talk) => {
                    const link = talk.youtubeId
                      ? `https://youtube.com/watch?v=${talk.youtubeId}${talk.startSeconds ? `&t=${talk.startSeconds}s` : ""}`
                      : talk.youtubePlaylistId
                        ? `https://youtube.com/playlist?list=${talk.youtubePlaylistId}`
                        : (talk.url ?? null);
                    return (
                      <div key={talk.slug} className="border-b border-border pb-6">
                        <h3 className="font-serif text-base text-foreground">
                          {link ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent"
                            >
                              {talk.title}
                            </a>
                          ) : (
                            talk.title
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                          {talk.venue}
                          {talk.date ? ` · ${talk.date}` : ""}
                        </p>
                        <p className="mt-2 text-sm text-muted">
                          {talk.description}
                        </p>
                        {talk.slidesUrl && (
                          <a
                            href={talk.slidesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-sm text-accent hover:opacity-70"
                          >
                            Slides →
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  No {cat.label.toLowerCase()} added yet.
                </p>
              )}
            </section>
          );
        })}
      </div>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-serif text-xl text-foreground">All talks &amp; presentations</h2>
        <p className="mt-2 text-sm text-muted">Synced from my CV — filter by topic, year or type. A recording or slides are linked where they exist.</p>
        <div className="mt-6">
          <Suspense fallback={null}><TalksExplorer items={items} /></Suspense>
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-10">
        <h2 className="font-serif text-xl text-foreground">YouTube playlists</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {playlists.map((l) => (
            <li key={l.id} className="text-[15px]"><a href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">{l.title} ↗</a>{l.videos ? <span className="text-xs text-muted"> · {l.videos}</span> : null}</li>
          ))}
        </ul>
      </section>

      <div className="mt-14 border-t border-border pt-8 text-sm text-muted">
        See also the full archive on{" "}
        <a
          href={socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:opacity-70"
        >
          YouTube
        </a>
        .
      </div>
    </Container>
  );
}
