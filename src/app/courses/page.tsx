import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { slideDecks } from "@/content/slides";
import { getCourseRows, courseSummary, institutionOrder } from "@/lib/courses";
import { statSync } from "node:fs";
import { getAllPublications } from "@/lib/publications";
import { listUnder } from "@/lib/cv";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import IhsanMark from "@/components/IhsanMark";
import IhsanCalligraphy from "@/components/IhsanCalligraphy";
import { playlists, playlistUrl } from "@/content/playlists";
import { ethicsCourse } from "@/content/ethicsCourse";

export const metadata: Metadata = {
  title: "Courses — Junaid Qadir",
  description: "Open courses with lectures and slides: the IHSAN courses (2020 and 2025), the four-day Generative AI course, AI ethics, and more; plus how to learn well, and teaching and supervision.",
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

const mb = (path: string) => { try { return `${(statSync(`public${path}`).size / 1048576).toFixed(1)} MB`; } catch { return null; } };

// Open materials for courses in the "taught" list
const MATERIALS: { match: RegExp; links: { label: string; href: string }[] }[] = [
  { match: /^Network Performance and Evaluation$/, links: [
    { label: "Full lecture series (44 videos)", href: "https://www.youtube.com/playlist?list=PL6B8E0C06A2002B1D" },
  ] },
];

const levelBlurb: Record<string, string> = { Undergraduate: "Undergraduate courses", Graduate: "Graduate courses" };

const btn = "inline-flex items-center rounded-sm px-4 py-2.5 text-sm transition-opacity hover:opacity-85";

export default function CoursesPage() {
  const rows = getCourseRows();
  const approach = listUnder("technical-summary", /^Teaching Skills/);
  const sum = courseSummary(rows);
  const ethicsPaper = getAllPublications().find((p) => p.slug === ethicsCourse.paperSlug);
  const other = playlists.filter((p) => !["PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03", "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-"].includes(p.id));
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Open courses</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">Courses<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              The courses I have taught in Pakistan and Qatar, and the ones I have opened to everyone: an ethics course, two IHSAN courses, a four-day course on generative AI and a graduate course on network performance, with lectures and slides where they exist.
            </p>
            <p className="mt-6 flex flex-wrap gap-3">
              <a href="#ethics-course" className={`${btn} bg-foreground text-background`}>Ethics course</a>
              <a href="#courses-taught" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>Courses I have taught</a>
              <a href="#ihsan-2025" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>IHSAN courses</a>
              <a href="#genai-course" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>Generative AI course</a>
              <a href="#course-slides" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>All course slides</a>
              <a href="#teaching-philosophy" className={`${btn} border border-foreground/30 text-foreground hover:border-accent hover:text-accent`}>Teaching philosophy</a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <IhsanCalligraphy className="text-[6rem] sm:text-[8rem]" />
            <IhsanMark size={84} framed className="hidden sm:block" />
          </div>
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-16 py-16">
        {/* Featured: the ethics course */}
        <section id="ethics-course" className="scroll-mt-24 rounded border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Featured course · ITU Lahore · Spring 2018, 2019 and 2021</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">{ethicsCourse.title}</h2>
          <div className="mt-4 grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-3 leading-relaxed text-muted">
              <p>An undergraduate course on ethics, values and technology that draws on Islamic values.</p>
              <p>The full slide set, the course website and a paper on the course design and my experience of teaching it are all open to everyone. Recorded lectures on AI ethics are free to watch as well.</p>
              {ethicsPaper && <p className="text-sm"><span className="text-foreground">Paper:</span> {ethicsPaper.title}, <em>{ethicsPaper.venue}</em> ({ethicsPaper.year}).</p>}
            </div>
            <ul className="space-y-3 text-[15px]">
              <li><a href={ethicsCourse.slides} target="_blank" rel="noopener noreferrer" className={`${btn} bg-foreground text-background`}>Course slides ↗</a></li>
              <li><a href={ethicsCourse.site} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Course website ↗</a></li>
              <li><a href={ethicsCourse.paperUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">The paper on course design ↗</a></li>
              <li><a href={playlistUrl("PL4AueLFeEG0Cy33n0n5N-XBhSHZaYmxFr")} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">AI Ethics short course (9 videos) ↗</a></li>
              <li><a href={playlistUrl("PL1Xmyl4aKTRhDsx82ZKw_ucVk1cM9akk5")} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">AI Ethics guest module (7 parts) ↗</a></li>
            </ul>
          </div>
        </section>

        {/* All courses taught */}
        <section id="courses-taught" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Teaching record</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">Courses I have taught</h2>
          <p className="mt-3 max-w-2xl text-muted">{sum.courses} courses at {sum.institutions.length} universities: {sum.institutions.join(", ")}. This list follows my CV, most recent first.</p>
          {(["Undergraduate", "Graduate"] as const).map((lvl) => (
            <div key={lvl} className="mt-8">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{levelBlurb[lvl]} <span className="ml-1">{rows.filter((r) => r.level === lvl).length}</span></h3>
              <ul className="mt-2 divide-y divide-border border-y border-border">
                {rows.filter((r) => r.level === lvl).map((r) => {
                  const extra = MATERIALS.find((m) => m.match.test(r.title))?.links ?? [];
                  const isEthics = /^Ethics, Values, and Technology$/.test(r.title);
                  return (
                    <li key={r.title} className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                      <div>
                        <p className="font-serif text-[17px] leading-snug text-foreground">{r.title}{r.note ? <span className="font-sans text-sm text-muted"> ({r.note})</span> : null}</p>
                        {(r.website || extra.length > 0 || isEthics) && (
                          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-sm">
                            {isEthics && <a href="#ethics-course" className="text-accent hover:opacity-70">Featured course ↑</a>}
                            {r.website && !isEthics && <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Course website ↗</a>}
                            {extra.map((l) => (<a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">{l.label} ↗</a>))}
                          </p>
                        )}
                      </div>
                      <ul className="space-y-0.5 text-sm text-muted">
                        {institutionOrder.flatMap((inst) => r.offerings.filter((o) => o.inst === inst)).map((o, i) => (
                          <li key={i}><span className="text-foreground">{o.inst}</span> · {o.terms}</li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <section id="teaching-philosophy" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Approach</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">Teaching philosophy</h2>
          <div className="mt-4 max-w-2xl space-y-3">
            {approach.map((t, i) => (
              <p key={i} className="leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: t.html.replace(/^<strong><em>[^<]*<\/em><\/strong>\s*/, "") }} />
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            A recurring theme: AI can make production easier, but education must preserve the effort through which understanding, judgment and character are formed.
            My supervised students are on the <Link href="/students" className="text-accent hover:opacity-70">Students</Link> page, with <Link href="/students#tips" className="text-accent hover:opacity-70">tips for students</Link> and the <Link href="/learning" className="text-accent hover:opacity-70">How to learn well</Link> page.
          </p>
        </section>

        <Ornament />

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Open courses</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">Courses open to everyone</h2>
          <p className="mt-3 max-w-2xl text-muted">Full video lectures and complete slide decks, free to watch and download.</p>
        </div>

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
          <p className="text-xs uppercase tracking-[0.22em] text-gold">IHSAN Short Course · 2020 · 13 videos (11 topics) · 145 slides</p>
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

        <section id="genai-course" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Course · August 2023 · four days · slides</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">Augmentation Through Generative AI and ChatGPT: A Hands-On Course for Students and Researchers</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">A four-day hands-on workshop at the Information Technology University, Lahore: from how generative AI works, through prompting and AI-augmented writing, to using it effectively and ethically.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {slideDecks.filter((d) => d.file.startsWith("2023-genai-itu-course-day-")).map((d) => (
              <li key={d.file} className="card-ornate p-4">
                <p className="font-serif text-[17px] text-foreground">{d.part}</p>
                <p className="mt-1 text-sm text-muted">{d.pages} slides · {d.mb} MB</p>
                <p className="mt-2 text-sm"><a href={`/slides/${d.file}`} className="text-accent hover:opacity-70">Slides (PDF) ↓</a></p>
              </li>
            ))}
          </ul>
        </section>

        <Ornament />

        <section id="course-slides" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Slides</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">Course slides, in one place</h2>
          <p className="mt-3 max-w-2xl text-muted">Every course deck I have shared. Slides from individual talks are on <Link href="/talks" className="text-accent hover:opacity-70">Talks &amp; Slides</Link>.</p>
          <ul className="mt-5 divide-y divide-border border-y border-border text-[15px]">
            {[
              { course: "Ethics, (Islamic) Values, and Technology (ITU)", label: "Full slide set", href: ethicsCourse.slides, ext: true, size: "Google Drive" },
              { course: "IHSAN Course 2025", label: "All slides (8 lectures, 103 slides)", href: "/courses/ihsan-course-2025-all-slides.pdf", size: mb("/courses/ihsan-course-2025-all-slides.pdf") },
              { course: "IHSAN Short Course (2020)", label: "All slides (11 parts, 145 slides)", href: "/courses/ihsan-short-course-2020-all-slides.pdf", size: mb("/courses/ihsan-short-course-2020-all-slides.pdf") },
              ...slideDecks.filter((d) => d.file.startsWith("2023-genai-itu-course-day-")).map((d) => ({ course: "Generative AI course, ITU (August 2023)", label: d.part ?? "Slides", href: `/slides/${d.file}`, size: `${d.mb} MB` })),
              { course: "Network Performance & Evaluation (CS721)", label: "Course website and lectures", href: "https://sites.google.com/site/netperfeval", ext: true, size: "website" },
            ].map((r) => (
              <li key={r.course + r.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span><span className="text-foreground">{r.course}</span> <span className="text-muted">· {r.label}</span></span>
                <a href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="whitespace-nowrap text-sm text-accent hover:opacity-70">{r.ext ? "Open ↗" : "PDF ↓"}{r.size ? <span className="ml-1.5 text-xs text-muted">{r.size}</span> : null}</a>
              </li>
            ))}
          </ul>
        </section>

        <Ornament />

        <section>
          <h2 className="font-serif text-2xl text-foreground">More courses and lectures</h2>
          <p className="mt-2 max-w-2xl text-muted">Full courses and lecture series from my YouTube channel. My current teaching at Qatar University is on the <Link href="/teaching" className="text-accent hover:opacity-70">Teaching page</Link>.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="card-ornate p-5">
              <p className="text-xs uppercase tracking-wide text-gold">Course · {ethicsCourse.code}</p>
              <h3 className="mt-1 font-serif text-lg text-foreground">{ethicsCourse.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">Full slide set and course website, with the paper describing the course design.</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href={ethicsCourse.site} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Course website ↗</a>
                <a href={ethicsCourse.slides} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Slides ↗</a>
                <a href={ethicsCourse.paperUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Paper ↗</a>
              </p>
            </div>
            {other.map((l) => (
              <div key={l.id} className="card-ornate p-5">
                <p className="text-xs uppercase tracking-wide text-gold">{l.videos ? `${l.videos} videos` : "Playlist"}</p>
                <h3 className="mt-1 font-serif text-lg text-foreground">
                  <a href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{l.title} ↗</a>
                </h3>
                {l.blurb && <p className="mt-2 text-[15px] leading-relaxed text-muted">{l.blurb}</p>}
                {l.site && <p className="mt-3 text-sm"><a href={l.site} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">Course website ↗</a></p>}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Everything is also on <a href="https://www.youtube.com/@JunaidQadir" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">my YouTube channel ↗</a>. Slides for other talks are on the <Link href="/talks" className="text-accent hover:opacity-70">Talks page</Link> as they are released.</p>
        </section>
      </Container>
    </>
  );
}
