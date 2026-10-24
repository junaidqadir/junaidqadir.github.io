import type { Metadata } from "next";
import Container from "@/components/Container";
import { socials } from "@/content/site";
import { talkCategories, talks } from "@/content/talks";
import { getTalks } from "@/lib/cv";

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
  t.youtubeId ? `https://youtube.com/watch?v=${t.youtubeId}` : t.youtubePlaylistId ? `https://youtube.com/playlist?list=${t.youtubePlaylistId}` : (t.url ?? null);

export default function TalksPage() {
  // Match each CV talk to a recording we already know about (by quoted title), so the full list stays CV-driven.
  const cvTalks = getTalks().map((it) => {
    const quoted = (it.text.match(/“([^”]+)”/) || [])[1] ?? it.text;
    const hit = talks.find((t) => videoUrl(t) && overlap(quoted, t.title) >= 0.7);
    return { html: it.html, video: hit ? videoUrl(hit) : null };
  });
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Talks & Media</h1>
      <p className="mt-3 max-w-xl text-muted">
        Recordings of lectures, short courses, interviews and conference talks, followed by the complete
        list of invited talks and presentations from my CV.
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
                      ? `https://youtube.com/watch?v=${talk.youtubeId}`
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

      <section className="mt-16 border-t border-border pt-10" id="all-talks">
        <h2 className="font-serif text-xl text-foreground">All talks &amp; presentations</h2>
        <p className="mt-2 text-sm text-muted">Synced from my CV. A recording is linked where one exists.</p>
        <ul className="mt-5 space-y-3">
          {cvTalks.map((t, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-muted">
              <span dangerouslySetInnerHTML={{ __html: t.html }} />
              {t.video && (
                <a href={t.video} target="_blank" rel="noopener noreferrer" className="ml-2 whitespace-nowrap text-sm text-accent hover:opacity-70">
                  ▶ watch
                </a>
              )}
            </li>
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
