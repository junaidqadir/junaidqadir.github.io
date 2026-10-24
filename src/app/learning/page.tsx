import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import PublicationCard from "@/components/PublicationCard";
import { getPublicationBySlug } from "@/lib/publications";
import { playlists, playlistUrl } from "@/content/playlists";
import { slideDecks } from "@/content/slides";
import type { Publication } from "@/types/publication";

export const metadata: Metadata = {
  title: "Learning — Junaid Qadir",
  description: "Articles, primers, slides and lectures on how to learn well, build skills and grow as a student, researcher and professional.",
};

const pick = (slugs: string[]) => slugs.map(getPublicationBySlug).filter((p): p is Publication => !!p);

const startHere = pick([
  "2024-qadir-learning-101-reloaded-revisiting",
  "2017-qadir-learning-101-untaught-basics",
  "2015-qadir-every-student-should-know",
]);
const guides = pick([
  "2020-qadir-student-primer-thrive-engineering",
  "2020-qadir-engineering-education-moving-2020s",
  "2023-gull-robotics-primer-independent-learners",
  "2026-qadir-ai-chatbots-provide-coaching",
]);
const deckFiles = ["engineering-and-computing-education", "essential-skills", "how-to-thrive", "research-writing"];
const decks = deckFiles.map((k) => slideDecks.find((d) => d.file.includes(k))).filter((d): d is NonNullable<typeof d> => !!d);
const lists = playlists.filter((l) => ["PL931370B167ED8BE7", "PL4AueLFeEG0ArS4nj1TuRqd2lUEdH1M5n", "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-", "PL4AueLFeEG0BwOZkJK7_37TPVJUm55RH_"].includes(l.id));

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{children}</h2>;

export default function LearningPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Learning &amp; growth</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">How to learn well<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Articles, primers, slides and lectures for students, researchers and professionals on learning, skills and personal development,
              including the three <em>Learning 101</em> articles from IEEE Potentials.
            </p>
          </div>
          <GeoArt kind="star16" size={170} className="hidden sm:block" />
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-16 py-16">
        <section>
          <H2>Start here: the IEEE Potentials articles</H2>
          <p className="mt-3 max-w-2xl text-muted">
            Three articles on learning itself: the impediments students face and their remedies (2015), the basics that school rarely teaches (2018), and a revisit of those
            basics for the generative-AI era (2024).
          </p>
          <div className="mt-4">{startHere.map((p) => <PublicationCard key={p.slug} pub={p} />)}</div>
        </section>

        <Ornament />

        <section>
          <H2>Primers and guides</H2>
          <p className="mt-3 max-w-2xl text-muted">Longer guides on thriving in engineering education, the competencies the 2020s ask for, and learning independently.</p>
          <div className="mt-4">{guides.map((p) => <PublicationCard key={p.slug} pub={p} />)}</div>
        </section>

        <section>
          <H2>Slides</H2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {decks.map((d) => (
              <li key={d.file}>
                <a href={`/slides/${d.file}`} className="card-ornate block p-4">
                  <p className="text-xs uppercase tracking-wide text-gold">{d.year} · {d.pages} slides · PDF</p>
                  <p className="mt-1 font-serif text-lg leading-snug text-foreground">{d.title}</p>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">More decks are linked from <Link href="/talks" className="text-accent hover:opacity-70">Talks</Link>.</p>
        </section>

        <section>
          <H2>Lectures and short courses</H2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {lists.map((l) => (
              <a key={l.id} href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="card-ornate block p-5">
                <p className="text-xs uppercase tracking-wide text-gold">YouTube playlist{l.videos ? ` · ${l.videos} videos` : ""}</p>
                <h3 className="mt-1 font-serif text-lg text-foreground">{l.title} ↗</h3>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">The two IHSAN courses, with slides, are on the <Link href="/courses" className="text-accent hover:opacity-70">Courses page</Link>.</p>
        </section>
      </Container>
    </>
  );
}
