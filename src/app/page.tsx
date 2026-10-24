import Link from "next/link";
import Container from "@/components/Container";
import PublicationCard from "@/components/PublicationCard";
import { identity, researchThemes, socials, contact } from "@/content/site";
import { getFeaturedPublications, getPublicationsByTheme } from "@/lib/publications";
import { getKeyNumbers } from "@/lib/stats";
import { getAwards, humbleHtml, listUnder, getSection } from "@/lib/cv";
import type { Theme } from "@/types/publication";

const themeKeywords: Record<string, string> = {
  ai: "LLM safety · Responsible AI · Adversarial ML",
  education: "GenAI in education · Assessment · Academic integrity",
  multiplexity: "Systems thinking · Multiplex intelligence · Digital twins",
  "ihsan-ethics": "Ihsan · Islamic ethics · Technology & wisdom",
  "health-psychology": "Digital health · Mental health · Well-being",
  "networks-ict4d": "Networking · IoT security · ICT4D",
};

const projects = [
  {
    period: "Lab",
    kind: "Research group",
    title: "IHSAN Research Lab",
    text: "A research lab at Qatar University working on human-beneficial AI, the ethics of technology and engineering education.",
    href: "/publications?theme=ai",
    cta: "Related publications",
  },
  {
    period: "Initiative",
    kind: "Non-profit foundation (in formation)",
    title: "The Ihsan Initiative",
    text: "Courses, research and community programmes on technology, education and ethics grounded in ihsan — excellence and sincerity in service.",
    href: null as string | null, // set to the real URL when ihsaninitiative.org (or similar) is live
    cta: "Website coming soon",
  },
  {
    period: "Course",
    kind: "Open lecture series",
    title: "Multiplex Intelligence",
    text: "An eight-part public course on multiplex thinking — a pluralistic, systems-aware approach to intelligence, technology and the human being.",
    href: "https://www.youtube.com/playlist?list=PL65UDiarzsWEzx9lBPVhuBVv_YyoLclLN",
    cta: "Watch the course",
  },
];

const N = ({ n }: { n: string }) => (
  <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{n}</p>
);

export default function Home() {
  const keyNumbers = getKeyNumbers();
  const featured = getFeaturedPublications().slice(0, 6);
  const recognition = getAwards()
    .filter((a) => /[removed]|Outstanding Faculty Service|Dean.s Award|Best University Teacher|Distinguished (Lecturer|Speaker)/i.test(a.text))
    .slice(0, 6);
  const grants = (getSection("research-funding")?.blocks.flatMap((b) => b.items) ?? []).slice(0, 4);
  const roles = [
    ...listUnder("professional-services", /^Standards Leadership/i),
    ...listUnder("professional-services", /^Editorial Services/i).filter((i) => /Associate Editor.*present/i.test(i.text)),
    ...listUnder("professional-services", /^Advisory Board/i).slice(0, 1),
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-16">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_300px]">
          <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {identity.role} · {identity.affiliation.split(",")[0]}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl">
            Junaid Qadir<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-foreground sm:text-3xl">
            Human-centred AI.
            <br />
            Engineering education.
            <br />
            Technology with wisdom.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I direct the IHSAN Research Lab at Qatar University. My work spans artificial intelligence and its ethics,
            engineering education in the age of generative AI, digital health, and networked systems — approached through
            multiplexity, an Islamically inspired, systems-aware way of seeing technology and the whole human being.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="#research" className="rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity hover:opacity-85">Explore my research ↓</Link>
            <Link href="/publications" className="rounded-full border border-border px-5 py-2.5 text-foreground transition-colors hover:border-accent hover:text-accent">All publications</Link>
            <a href={socials.scholar} target="_blank" rel="noopener noreferrer" className="px-2 py-2.5 text-accent hover:opacity-70">Google Scholar ↗</a>
          </div>
          </div>
          <figure className="mx-auto w-full max-w-[300px] md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/headshot.jpg" alt="Portrait of Junaid Qadir" width={300} height={340} className="aspect-[4/4.5] w-full rounded-sm object-cover object-top" />
            <figcaption className="mt-2 text-xs text-muted">Professor of Computer Engineering · Doha, Qatar</figcaption>
          </figure>
          </div>
        </Container>
        <div className="border-t border-border">
          <Container width="max-w-5xl" className="py-10">
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {keyNumbers.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-serif text-3xl text-foreground">{item.value}</dd>
                  <p className="mt-1 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* Recognition strip */}
      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Recognition</h2>
            <Link href="/cv#awards-and-honors" className="text-sm text-accent hover:opacity-70">All awards &amp; honors →</Link>
          </div>
          <ul className="mt-4 grid gap-x-10 gap-y-2 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
            {recognition.map((a, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: humbleHtml(a.html) }} />
            ))}
          </ul>
        </Container>
      </section>

      {/* 01 Research */}
      <section id="research" className="scroll-mt-16 border-b border-border">
        <Container width="max-w-5xl" className="py-20">
          <N n="01 / Research" />
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">From networks to the whole human being.</h2>
          <p className="mt-4 max-w-2xl text-muted">Six connected themes rather than a chronological list. Each one links to its papers.</p>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {researchThemes.map((t, i) => {
              const count = getPublicationsByTheme(t.publicationTheme as Theme).length;
              return (
                <div key={t.slug} className="border-t border-border pt-5">
                  <p className="font-serif text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{t.blurb}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted">{themeKeywords[t.publicationTheme]}</p>
                  <Link href={`/publications?theme=${t.publicationTheme}`} className="mt-3 inline-block text-sm text-accent hover:opacity-70">Related papers ({count}) →</Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 02 Publications */}
      <section id="publications" className="scroll-mt-16 border-b border-border">
        <Container width="max-w-5xl" className="py-20">
          <N n="02 / Publications" />
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Selected publications.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            A short selection. The full, searchable list — filterable by theme, tag, co-author, venue and year, with open-access PDFs and BibTeX where available — is one click away.
          </p>
          <div className="mt-8">
            {featured.map((pub) => (<PublicationCard key={pub.slug} pub={pub} />))}
          </div>
          <Link href="/publications" className="mt-4 inline-block text-sm text-accent hover:opacity-70">Browse all publications →</Link>
        </Container>
      </section>

      {/* 03 Projects */}
      <section id="projects" className="scroll-mt-16 border-b border-border">
        <Container width="max-w-5xl" className="py-20">
          <N n="03 / Projects & grants" />
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Labs, courses and funded work.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((p) => {
              const inner = (
                <>
                  <p className="text-xs uppercase tracking-wide text-muted">{p.kind}</p>
                  <h3 className="mt-2 font-serif text-xl text-foreground group-hover:text-accent">{p.title}{p.href ? " ↗" : ""}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <p className={`mt-4 text-sm ${p.href ? "text-accent" : "text-muted"}`}>{p.cta}</p>
                </>
              );
              const cls = "group rounded-lg border border-border p-6 transition-colors hover:border-accent";
              if (!p.href) return <div key={p.title} className={cls}>{inner}</div>;
              return p.href.startsWith("/")
                ? <Link key={p.title} href={p.href} className={cls}>{inner}</Link>
                : <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
          <h3 className="mt-14 text-xs font-medium uppercase tracking-[0.2em] text-muted">Recent research funding</h3>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
            {grants.map((g, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: g.html }} />))}
          </ul>
          <Link href="/cv#research-funding" className="mt-4 inline-block text-sm text-accent hover:opacity-70">Full funding record →</Link>
        </Container>
      </section>

      {/* 04 Talks */}
      <section id="talks" className="scroll-mt-16 border-b border-border">
        <Container width="max-w-5xl" className="py-14">
          <N n="04 / Talks & media" />
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Lectures, courses and keynotes.</h2>
            <Link href="/talks" className="text-sm text-accent hover:opacity-70">Talks, videos &amp; slides →</Link>
          </div>
        </Container>
      </section>

      {/* 05 Bio & service */}
      <section id="about" className="scroll-mt-16 border-b border-border">
        <Container width="max-w-5xl" className="py-20">
          <N n="05 / Biography & service" />
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Research, teaching and scientific service.</h2>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-muted">
              <p>I am a Professor of Computer Engineering at Qatar University, Doha, where I direct the IHSAN Research Lab. I have supervised {getKeyNumbers().find((k) => /supervis/i.test(k.label))?.value ?? "many"} graduate students and taught across networking, machine learning and engineering education.</p>
              <p>Before Qatar University I was a Professor and Department Chair at Information Technology University, Lahore, and earlier an Assistant Professor at NUST, Pakistan. I hold a PhD from the University of New South Wales, Australia.</p>
              <p><Link href="/about" className="text-accent hover:opacity-70">Full biography →</Link> &nbsp; <Link href="/cv" className="text-accent hover:opacity-70">Complete CV →</Link></p>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Selected service</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
                {roles.map((r, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: r.html }} />))}
              </ul>
              <Link href="/cv#professional-services" className="mt-4 inline-block text-sm text-accent hover:opacity-70">All professional service →</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 Contact */}
      <section id="contact" className="scroll-mt-16">
        <Container width="max-w-5xl" className="py-20">
          <N n="06 / Contact" />
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Let&rsquo;s talk research.</h2>
          <p className="mt-4 max-w-xl text-muted">{contact.intro}</p>
          <p className="mt-6"><a href={`mailto:${socials.email}`} className="font-serif text-xl text-accent hover:opacity-70">{socials.email} ↗</a></p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a className="text-accent hover:opacity-70" href={socials.scholar} target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
            <a className="text-accent hover:opacity-70" href={socials.orcid} target="_blank" rel="noopener noreferrer">ORCID ↗</a>
            <a className="text-accent hover:opacity-70" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="text-accent hover:opacity-70" href={socials.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a className="text-accent hover:opacity-70" href={socials.researchgate} target="_blank" rel="noopener noreferrer">ResearchGate ↗</a>
            <a className="text-accent hover:opacity-70" href="https://qufaculty.qu.edu.qa/jqadir/" target="_blank" rel="noopener noreferrer">QU faculty page ↗</a>
          </p>
        </Container>
      </section>
    </>
  );
}
