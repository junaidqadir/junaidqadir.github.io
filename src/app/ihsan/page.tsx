import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import IhsanMark from "@/components/IhsanMark";
import PublicationCard from "@/components/PublicationCard";
import { getPublicationBySlug, getPublicationsByTheme } from "@/lib/publications";
import { playlistUrl } from "@/content/playlists";

export const metadata: Metadata = {
  title: "Ihsan — Junaid Qadir",
  description: "Ihsan as spiritual excellence: the IHSAN courses with slides, the Quran short course, and papers on ihsan, including a hadith-based analysis.",
};

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{children}</h2>;
const btn = "inline-flex items-center rounded-sm px-4 py-2.5 text-sm transition-opacity hover:opacity-85";

export default function IhsanPage() {
  const lead = getPublicationBySlug("2019-qadir-spiritual-excellence-ihsan-professionals");
  const rest = getPublicationsByTheme("ihsan-ethics").filter((p) => p.slug !== lead?.slug);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Spiritual excellence</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">Ihsan<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Ihsan is excellence, beauty and sincerity in action, done in God-consciousness and for the benefit of creation. It is the thread that runs through my
              courses, my writing on technology and education, and the work of the IHSAN Research Lab.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-4 font-serif italic text-muted">
              The Prophet Muhammad (peace be upon him) said: “Verily, Allah has prescribed excellence (<em>ihsan</em>) in all things…”{" "}
              <span className="not-italic text-sm">(Ṣaḥīḥ Muslim 1955, narrated by Shaddād ibn Aws, may Allah be pleased with him)</span>
            </blockquote>
          </div>
          <IhsanMark size={150} />
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-16 py-16">
        <section>
          <H2>The IHSAN courses</H2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="card-ornate p-6">
              <p className="text-xs uppercase tracking-wide text-gold">2025 · 8 lectures · 103 slides</p>
              <h3 className="mt-2 font-serif text-xl text-foreground">Education in the AI Era: Cultivating Multiplex Intelligence and Human Wholeness</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">Balancing the intellectual, ethical and spiritual dimensions of the person to meet the challenges of the AI era.</p>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="text-accent hover:opacity-70" href={playlistUrl("PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03")} target="_blank" rel="noopener noreferrer">Lectures ↗</a>
                <a className="text-accent hover:opacity-70" href="/courses/ihsan-course-2025-all-slides.pdf">Slides (PDF) ↓</a>
                <Link className="text-muted hover:text-accent" href="/courses#ihsan-2025">Details</Link>
              </p>
            </article>
            <article className="card-ornate p-6">
              <p className="text-xs uppercase tracking-wide text-gold">2020 · 13 videos · 145 slides</p>
              <h3 className="mt-2 font-serif text-xl text-foreground">Spiritual Excellence (Ihsan) for Muslim Professionals</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">Ihsan as a way of professional life: sincerity, vision, character, mastery, productivity and service.</p>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="text-accent hover:opacity-70" href={playlistUrl("PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-")} target="_blank" rel="noopener noreferrer">Lectures ↗</a>
                <a className="text-accent hover:opacity-70" href="/courses/ihsan-short-course-2020-all-slides.pdf">Slides (PDF) ↓</a>
                <Link className="text-muted hover:text-accent" href="/courses#ihsan-short-course">Details</Link>
              </p>
            </article>
          </div>
        </section>

        <Ornament />

        <section>
          <H2>Quran study</H2>
          <p className="mt-3 max-w-2xl text-muted">
            A short course on understanding the Quran, recorded between October and December 2021 and open to everyone.
          </p>
          <p className="mt-4">
            <a href={playlistUrl("PL4AueLFeEG0BhWMBqH4FKeYMgel5wUxh7")} target="_blank" rel="noopener noreferrer" className={`${btn} bg-foreground text-background`}>Understand Quran, The Easy Way ↗</a>
          </p>
        </section>

        <Ornament />

        <section>
          <H2>Papers on ihsan and Islamic ethics</H2>
          <p className="mt-3 max-w-2xl text-muted">Starting with the hadith-based analysis of ihsan, then the wider writing on Islamic ethics, development and technology.</p>
          <div className="mt-4">
            {lead && <PublicationCard pub={lead} />}
            {rest.map((p) => <PublicationCard key={p.slug} pub={p} />)}
          </div>
          <Link href="/publications?theme=ihsan-ethics" className="mt-3 inline-block text-sm text-accent hover:opacity-70">Open in the searchable list →</Link>
        </section>

        <section className="flex flex-wrap items-center gap-6 rounded border border-border bg-surface p-6">
          <GeoArt kind="kufic" size={90} />
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            The Ihsan Initiative, a non-profit foundation in formation, will carry this work further. Its website will be announced here.
          </p>
        </section>
      </Container>
    </>
  );
}
