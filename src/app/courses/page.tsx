import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import IhsanMark from "@/components/IhsanMark";
import { playlists, playlistUrl, playlistsFor } from "@/content/playlists";

export const metadata: Metadata = {
  title: "Courses — Junaid Qadir",
  description: "The IHSAN courses (2020 and 2025) with full lectures and slides, plus CS721 Network Performance & Evaluation and other open courses.",
};

const outcomes = [
  ["Develop holistic insight", "Cultivate the integration of the intellectual, ethical and spiritual dimensions of the person."],
  ["Appreciate diversity and understand polarities", "Engage meaningfully with diverse and even opposing worldviews through polarity management and both-and thinking."],
  ["Reflect on the dilemmas of AI", "Recognize and reflect critically on the moral, philosophical and societal tensions that advanced AI presents."],
  ["Hold enduring polarities together", "Identify and manage enduring polarities such as tradition and innovation and human and machine intelligence, and hold reason and revelation each in its proper place, with revelation as the guiding anchor."],
  ["Deepen the understanding of ihsan", "Reflect on ihsan as spiritual excellence, in this world and the next, and on its relevance for ethics in the digital age."],
];

const shortParts = [
  "Introduction", "Ihsan: what and why", "The importance of sincerity and intention", "Having a vision", "Character traits of the people of ihsan",
  "Doing justice and excelling in one’s work", "Mastery orientation", "Quality over quantity", "Leading an active, pioneering life",
  "Productivity: seeking barakah (blessing)", "Social work: being a giver",
];

const btn = "inline-flex items-center rounded-sm px-4 py-2.5 text-sm transition-opacity hover:opacity-85";

export default function CoursesPage() {
  const other = playlists.filter((p) => !["PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03", "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-"].includes(p.id));
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Open courses</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">The IHSAN courses<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Two courses on ihsan (spiritual excellence), taught in 2020 and 2025: full video lectures and the complete slide decks, free to watch and download.
            </p>
            <p className="mt-6 flex flex-wrap gap-3">
              <a href="#ihsan-2025" className={`${btn} bg-foreground text-background`}>IHSAN Course 2025</a>
              <a href="#ihsan-short-course" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>IHSAN Short Course (2020)</a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <IhsanMark size={120} />
            <GeoArt kind="star8" size={150} className="hidden sm:block" />
          </div>
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-16 py-16">
        {/* 2025 */}
        <section id="ihsan-2025" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">IHSAN Course 2025 · 8 lectures · 103 slides</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">Education in the AI Era: Cultivating Multiplex Intelligence and Human Wholeness</h2>
          <blockquote className="mt-5 border-l-2 border-gold pl-4 font-serif text-lg italic text-muted">
            The Prophet Muhammad (peace be upon him) said: “Verily, Allah has prescribed excellence (<em>ihsan</em>) in all things…” <span className="not-italic text-sm">(Ṣaḥīḥ Muslim 1955, narrated by Shaddād ibn Aws, may Allah be pleased with him)</span>
          </blockquote>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            This course explores how to balance the <strong className="text-foreground">intellectual, ethical and spiritual</strong> dimensions of the human being to meet the challenges of the AI era.
            It is a synthesis of pedagogy, Islamic spirituality, systems thinking, AI ethics and educational design. All lecture recordings and the complete slide deck are freely available.
          </p>
          <h3 className="mt-8 font-serif text-xl text-foreground">Desired learning outcomes</h3>
          <ol className="mt-3 space-y-3">
            {outcomes.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-serif text-accent">{i + 1}</span>
                <p className="text-[15px] leading-relaxed text-muted"><strong className="font-serif text-foreground">{t}.</strong> {d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex flex-wrap gap-3">
            <a href={playlistUrl("PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03")} target="_blank" rel="noopener noreferrer" className={`${btn} bg-foreground text-background`}>Watch the 8 lectures ↗</a>
            <a href="/courses/ihsan-course-2025-all-slides.pdf" className={`${btn} bg-accent text-background`}>Download the slides (PDF, 103 slides) ↓</a>
            <Link href="/multiplexity" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>About multiplexity →</Link>
          </p>
        </section>

        <Ornament />

        {/* 2020 */}
        <section id="ihsan-short-course" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">IHSAN Short Course · 2020 · 13 videos · 145 slides</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">Spiritual Excellence (Ihsan) for Muslim Professionals</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            A short course on ihsan as a way of professional life: what it is and why it matters, sincerity and intention, vision, character, justice and excellence in one’s work, mastery, productivity and barakah, and service to others.
          </p>
          <ol className="mt-5 grid gap-x-8 gap-y-1 text-[15px] text-muted sm:grid-cols-2">
            {shortParts.map((p, i) => (<li key={p}><span className="mr-2 font-serif text-accent">{i}</span>{p}</li>))}
          </ol>
          <p className="mt-8 flex flex-wrap gap-3">
            <a href={playlistUrl("PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-")} target="_blank" rel="noopener noreferrer" className={`${btn} bg-foreground text-background`}>Watch the lectures ↗</a>
            <a href="/courses/ihsan-short-course-2020-all-slides.pdf" className={`${btn} bg-accent text-background`}>Download the slides (PDF, 145 slides) ↓</a>
            <a href="https://www.slideshare.net/slideshow/ihsan-for-muslim-professionals-short-course/234513475" target="_blank" rel="noopener noreferrer" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>SlideShare ↗</a>
          </p>
        </section>

        <Ornament />

        <section>
          <h2 className="font-serif text-2xl text-foreground">More courses and lectures</h2>
          <p className="mt-2 max-w-2xl text-muted">Full courses and lecture series from my YouTube channel. My current teaching at Qatar University is on the <Link href="/teaching" className="text-accent hover:opacity-70">Teaching page</Link>.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {other.map((l) => (
              <a key={l.id} href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="card-ornate block p-5">
                <p className="text-xs uppercase tracking-wide text-gold">{l.videos ? `${l.videos} videos` : "Playlist"}</p>
                <h3 className="mt-1 font-serif text-lg text-foreground">{l.title} ↗</h3>
                {l.blurb && <p className="mt-2 text-[15px] leading-relaxed text-muted">{l.blurb}</p>}
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Everything is also on <a href="https://www.youtube.com/@JunaidQadir" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">my YouTube channel ↗</a>. Slides for other talks are on the <Link href="/talks" className="text-accent hover:opacity-70">Talks page</Link> as they are released.</p>
        </section>
      </Container>
    </>
  );
}
