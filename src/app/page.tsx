import Link from "next/link";
import Container from "@/components/Container";
import Ornament from "@/components/Ornament";
import StudentNote from "@/components/StudentNote";
import GeoArt from "@/components/GeoArt";
import ThemeCard from "@/components/ThemeCard";
import PublicationCard from "@/components/PublicationCard";
import { identity, researchThemes, socials, contact } from "@/content/site";
import { getFeaturedPublications, getPublicationsByTheme } from "@/lib/publications";
import { getKeyNumbers } from "@/lib/stats";
import { getAwards, humbleHtml, listUnder, getSection } from "@/lib/cv";
import type { Theme } from "@/types/publication";

const projects = [
  { kind: "Research group", title: "IHSAN Research Lab", text: "A research lab at Qatar University working on human-beneficial AI, the ethics of technology and engineering education.", href: "/publications?theme=ai-ethics", cta: "Related publications" },
  { kind: "Non-profit foundation (in formation)", title: "The Ihsan Initiative", text: "Courses, research and community programs on technology, education and ethics grounded in ihsan — excellence and sincerity in service.", href: null as string | null, cta: "Website coming soon" },
  { kind: "Open courses", title: "Ihsan: courses, papers and Quran study", text: "The two IHSAN courses with their slides, the Quran short course, and my papers on ihsan as spiritual excellence.", href: "/ihsan", cta: "Explore Ihsan" },
];

const Kicker = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
    <span className="font-serif text-gold">{n}</span> &nbsp;/&nbsp; {children}
  </p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">{children}</h2>
);

export default function Home() {
  const keyNumbers = getKeyNumbers();
  const featured = getFeaturedPublications().slice(0, 6);
  const recognition = getAwards()
    .filter((a) => /Outstanding Faculty Service|Dean.s Award|Best University Teacher|Distinguished (Lecturer|Speaker)/i.test(a.text))
    .slice(0, 5);
  const grants = (getSection("research-funding")?.blocks.flatMap((b) => b.items) ?? []).slice(0, 4);
  const roles = [
    ...listUnder("professional-services", /^Standards Leadership/i),
    ...listUnder("professional-services", /^Editorial Services/i).filter((i) => /Associate Editor.*present/i.test(i.text)),
    ...listUnder("professional-services", /^Advisory Board/i).slice(0, 1),
  ];
  const supervised = keyNumbers.find((k) => /supervis/i.test(k.label))?.value ?? "many";

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <GeoArt kind="rosette12" size={640} className="pointer-events-none absolute -right-40 -top-32 hidden text-gold opacity-[0.18] md:block" />
        <Container width="max-w-6xl" className="relative pb-16 pt-14">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {identity.role} · {identity.affiliation.split(",")[0]}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3.4rem,11vw,9rem)] font-light leading-[0.95] tracking-tight text-foreground">
            Junaid Qadir<span className="text-accent">.</span>
          </h1>
          <div className="mt-10 grid items-end gap-12 md:grid-cols-[1fr_300px]">
            <div>
              <p className="max-w-2xl font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                AI ethics and governance. AI in education and healthcare. Technology with wisdom.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                I direct the IHSAN Research Lab at Qatar University. I work on how artificial intelligence can serve people, starting with
                communities and classrooms and reaching into healthcare, governance and security. Running through all of it is multiplexity, a framework
                grounded in Islamic ideals and offered for everyone.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                <Link href="/multiplexity" className="rounded-sm bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-85">Explore multiplexity</Link>
                <Link href="/publications" className="rounded-sm border border-foreground/30 px-5 py-3 text-foreground transition-colors hover:border-accent hover:text-accent">Publications</Link>
                <Link href="/courses" className="rounded-sm border border-foreground/30 px-5 py-3 text-foreground transition-colors hover:border-accent hover:text-accent">IHSAN courses</Link>
                <a href={socials.scholar} target="_blank" rel="noopener noreferrer" className="px-2 py-3 text-accent hover:opacity-70">Google Scholar ↗</a>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-[300px]">
              <div className="overflow-hidden rounded-sm border border-gold/70 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/headshot.jpg" alt="Portrait of Junaid Qadir" width={300} height={340} className="aspect-[4/5] w-full rounded-sm object-cover object-top" />
              </div>
              <figcaption className="mt-3 text-center text-xs text-muted">Doha, Qatar</figcaption>
            </figure>
          </div>
        </Container>
        <div className="relative border-t border-border bg-surface/70">
          <Container width="max-w-6xl" className="py-8">
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {keyNumbers.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-serif text-4xl font-light text-foreground">{item.value}</dd>
                  <p className="mt-1 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ───────── 01 Research ───────── */}
      <section id="research" className="scroll-mt-20">
        <Container width="max-w-6xl" className="py-20">
          <Kicker n="01">Research</Kicker>
          <H2>Technology that serves the whole human being.</H2>
          <p className="mt-4 max-w-2xl text-muted">{researchThemes.length} connected themes. Each links to its papers.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchThemes.map((t, i) => (
              <ThemeCard key={t.slug} theme={t} index={i} count={getPublicationsByTheme(t.publicationTheme as Theme).length} />
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── 02 Multiplexity ───────── */}
      <section id="multiplexity" className="relative overflow-hidden border-y border-border bg-surface">
        <div className="pattern-khatam pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative py-20">
          <div className="grid items-center gap-12 md:grid-cols-[360px_1fr]">
            <GeoArt kind="rosette12" size={340} title="A twelve-fold rosette: many parts held in one pattern" className="mx-auto w-full max-w-[340px]" />
            <div>
              <Kicker n="02">Multiplexity</Kicker>
              <H2>The one and the many — held together.</H2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Many fields meet the problem of the one and the many: a signal is many frequencies, a network is many networks, a person is body, mind and
                conviction. Some problems have one right answer; others stay open however long we look. Multiplexity, a framework that originates with Recep Şentürk and is rooted in Islamic ideals,
                integrates the two. It asks either-or where a single closed answer is warranted and both-and where the question is open,
                and it keeps many views, levels of reality and change over time in one frame.
              </p>
              <ul className="mt-6 grid gap-3 text-[15px] text-muted sm:grid-cols-3">
                <li><strong className="font-serif text-foreground">Across.</strong> Many views and tensions kept in one frame.</li>
                <li><strong className="font-serif text-foreground">Upward.</strong> Levels of reality, with higher ends taking precedence over lower means.</li>
                <li><strong className="font-serif text-foreground">Through time.</strong> Systems that change, learn and are shaped by history.</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <Link href="/multiplexity" className="rounded-sm bg-accent px-5 py-3 text-background transition-opacity hover:opacity-85">Papers, talks &amp; courses on multiplexity →</Link>
                <Link href="/publications?theme=multiplexity" className="px-2 py-3 text-accent hover:opacity-70">Browse the papers</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── 03 Courses ───────── */}
      <section id="courses" className="scroll-mt-20 border-b border-border">
        <Container width="max-w-6xl" className="py-20">
          <Kicker n="03">Open courses</Kicker>
          <H2>Two IHSAN courses — lectures and slides, free to use.</H2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="card-ornate p-7">
              <p className="text-xs uppercase tracking-wide text-gold">IHSAN Course 2025 · 8 parts · 103 slides</p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">Education in the AI Era: Cultivating Multiplex Intelligence and Human Wholeness</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                How to balance the intellectual, ethical and spiritual dimensions of the human being to meet the dilemmas of the AI era —
                a synthesis of pedagogy, Islamic spirituality, systems thinking, AI ethics and educational design.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="text-accent hover:opacity-70" href="https://www.youtube.com/playlist?list=PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03" target="_blank" rel="noopener noreferrer">Watch the lectures ↗</a>
                <a className="text-accent hover:opacity-70" href="/courses/ihsan-course-2025-all-slides.pdf">Slides (PDF) ↓</a>
                <Link className="text-muted hover:text-accent" href="/courses#ihsan-2025">Course page</Link>
              </p>
            </article>
            <article className="card-ornate p-7">
              <p className="text-xs uppercase tracking-wide text-gold">IHSAN Short Course · 13 videos · 145 slides</p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">Spiritual Excellence (Ihsan) for Muslim Professionals</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Sincerity and intention, vision, character, doing justice and excelling in one’s work, mastery, productivity and barakah (blessing),
                and service to others — an introduction to ihsan as a way of professional life.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a className="text-accent hover:opacity-70" href="https://www.youtube.com/playlist?list=PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-" target="_blank" rel="noopener noreferrer">Watch the lectures ↗</a>
                <a className="text-accent hover:opacity-70" href="/courses/ihsan-short-course-2020-all-slides.pdf">Slides (PDF) ↓</a>
                <Link className="text-muted hover:text-accent" href="/courses#ihsan-short-course">Course page</Link>
              </p>
            </article>
          </div>
          <p className="mt-6 text-sm text-muted">Also: <Link href="/courses" className="text-accent hover:opacity-70">CS721 Network Performance &amp; Evaluation, EE362 Computer Networks, an AI-ethics short course and more →</Link></p>
        </Container>
      </section>

      {/* ───────── 04 Publications ───────── */}
      <section id="publications" className="scroll-mt-20 border-b border-border">
        <Container width="max-w-6xl" className="py-20">
          <Kicker n="04">Publications</Kicker>
          <H2>Selected publications.</H2>
          <p className="mt-4 max-w-2xl text-muted">
            A short selection. The full, searchable list — filterable by theme, topic, co-author, venue and year, with open-access PDFs and BibTeX where available — follows.
          </p>
          <div className="mt-8">{featured.map((pub) => (<PublicationCard key={pub.slug} pub={pub} />))}</div>
          <Link href="/publications" className="mt-4 inline-block text-sm text-accent hover:opacity-70">Browse all publications →</Link>
        </Container>
      </section>

      {/* ───────── 05 Projects ───────── */}
      <section id="projects" className="scroll-mt-20 border-b border-border">
        <Container width="max-w-6xl" className="py-20">
          <Kicker n="05">Projects &amp; grants</Kicker>
          <H2>Labs, initiatives and funded work.</H2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((p) => {
              const inner = (
                <>
                  <p className="text-xs uppercase tracking-wide text-gold">{p.kind}</p>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{p.title}{p.href && !p.href.startsWith("/") ? " ↗" : ""}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <p className={`mt-4 text-sm ${p.href ? "text-accent" : "text-muted"}`}>{p.cta}</p>
                </>
              );
              const cls = "card-ornate block p-6";
              if (!p.href) return <div key={p.title} className={cls}>{inner}</div>;
              return p.href.startsWith("/")
                ? <Link key={p.title} href={p.href} className={cls}>{inner}</Link>
                : <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
          <h3 className="mt-14 text-xs font-medium uppercase tracking-[0.22em] text-muted">Recent research funding</h3>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
            {grants.map((g, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: g.html }} />))}
          </ul>
          <Link href="/cv#research-funding" className="mt-4 inline-block text-sm text-accent hover:opacity-70">Full funding record →</Link>
        </Container>
      </section>

      {/* ───────── 06 Recognition + bio ───────── */}
      <section id="about" className="scroll-mt-20 border-b border-border">
        <Container width="max-w-6xl" className="py-20">
          <Kicker n="06">Biography &amp; service</Kicker>
          <H2>Research, teaching and scientific service.</H2>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-muted">
              <p>I am a Professor of Computer Engineering at Qatar University, Doha, where I direct the IHSAN Research Lab. I have supervised {supervised} graduate students and taught across networking, machine learning and engineering education.</p>
              <p>Before Qatar University I was a Professor and Department Chair at Information Technology University, Lahore, and earlier an Assistant Professor at NUST, Pakistan. I hold a PhD from the University of New South Wales, Australia.</p>
              <p><Link href="/about" className="text-accent hover:opacity-70">Full biography →</Link> &nbsp; <Link href="/cv" className="text-accent hover:opacity-70">Complete CV →</Link></p>
              <h3 className="!mt-8 text-xs font-medium uppercase tracking-[0.22em] text-muted">Recognition</h3>
              <ul className="space-y-2 text-[15px]">
                {recognition.map((a, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: humbleHtml(a.html) }} />))}
              </ul>
              <p><Link href="/awards" className="text-accent hover:opacity-70">Awards &amp; honors, with photographs →</Link></p>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Selected service</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
                {roles.map((r, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: r.html }} />))}
              </ul>
              <Link href="/cv#professional-services" className="mt-4 inline-block text-sm text-accent hover:opacity-70">All professional service →</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── 07 Contact ───────── */}
      <section id="contact" className="scroll-mt-20">
        <Container width="max-w-6xl" className="py-20">
          <Ornament className="mb-14" />
          <Kicker n="07">Contact</Kicker>
          <H2>Let&rsquo;s talk research.</H2>
          <p className="mt-4 max-w-xl text-muted">{contact.intro}</p>
          <StudentNote className="mt-5" />
          <p className="mt-6"><a href={`mailto:${socials.email}`} className="font-serif text-2xl text-accent hover:opacity-70">{socials.email} ↗</a></p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[["Google Scholar", socials.scholar], ["ORCID", socials.orcid], ["LinkedIn", socials.linkedin], ["YouTube", socials.youtube], ["ResearchGate", socials.researchgate], ["QU faculty page", "https://qufaculty.qu.edu.qa/jqadir/"]].map(([l, h]) => (
              <a key={l} className="text-accent hover:opacity-70" href={h} target="_blank" rel="noopener noreferrer">{l} ↗</a>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}
