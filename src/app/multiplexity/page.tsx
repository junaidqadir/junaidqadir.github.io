import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { IdeasTabs, IdeasBridge } from "@/components/IdeasTabs";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import PublicationCard from "@/components/PublicationCard";
import { getPublicationsByTheme } from "@/lib/publications";
import { findCvItems } from "@/lib/cv";
import { playlistsFor, playlistUrl } from "@/content/playlists";
import { slidesFor } from "@/content/slides";

export const metadata: Metadata = {
  title: "Multiplexity — Junaid Qadir",
  description: "Multiplexity: holding the one and the many together. Papers, book chapters, talks and courses by Junaid Qadir.",
};

const H2 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-24 font-serif text-2xl text-foreground sm:text-3xl">{children}</h2>
);

const dimensions = [
  { art: "star8" as const, title: "Across — horizontal", text: "Many views, goods and tensions are kept in one frame, so that each contributes what it gets right: speed and responsibility, individual and community, technical and normative. Where they conflict, the upward dimension says which gives way." },
  { art: "star16" as const, title: "Upward — vertical", text: "Levels of reality, knowledge and purpose, each with methods adequate to it. Higher ends take precedence over lower means; on the Islamic account I work from, human dignity is a ground that efficiency may not override." },
  { art: "hex6" as const, title: "Through time — dynamic", text: "Systems change, learn and feed back on themselves, and history shapes them. A multiplex view follows that movement." },
];

const notThis = [
  ["Ensembles", "Combining many models often beats using one. Averaging ensembles do this by blending views on one plane into one score. Multiplexity also keeps the views distinct, places them at different levels, and asks which purpose ranks their outputs."],
  ["Pluralism", "Multiplexity is pluralistic. What it adds is a shared ground and a ranking among ends; without those, plurality has no way to call one view better and slides toward relativism."],
  ["Wisdom of crowds", "The classic result concerns pooling independent estimates of one quantity. Many multiplex questions are of a different kind: what is settled, what is contested, what is permitted, and what something is for."],
  ["Systems thinking", "Multiplexity aligns with systems thinking, critical complexity and cybernetics, and shares their attention to wholes and change over time. Its further emphasis, drawn from an Islamic worldview of levels of being, is a vertical dimension: higher ends over lower means."],
];

const domains = [
  { title: "One model, many distributions", text: "Trustworthy and robust machine learning: attacks, defenses and distribution shift across many conditions.", href: "/publications?tags=adversarial-ml" },
  { title: "One model, many worldviews", text: "Foundation-model safety and evaluation across perspectives, including WorldView-Bench for global cultural perspectives in LLMs.", href: "/publications?q=worldview" },
  { title: "One patient, many layers", text: "Clinical, cultural and spiritual purposes of health, each in its place under the highest: multiplex health, and generative AI with traditional Islamically integrated psychotherapy.", href: "/publications?theme=health-psychology" },
  { title: "One learner, many capacities", text: "AI-augmented learning and writing; Islamically inspired critical pedagogy; multiplex systemics for educational technology.", href: "/publications?theme=education" },
  { title: "One university, many stakeholders", text: "Responsible AI in higher education: the IEEE P3722 guide and governance work.", href: "/publications?tags=ai-governance" },
  { title: "One system, many models", text: "Multiplex digital twins: mechanistic and data-driven models at different levels, judged against explicit purposes. Currently presented in talks and master classes.", href: "/talks?topic=digital-twins" },
];

export default function MultiplexityPage() {
  const pubs = getPublicationsByTheme("multiplexity");
  const chapters = pubs.filter((p) => p.section === "book-chapter");
  const articles = pubs.filter((p) => p.section !== "book-chapter");
  const normTitle = (t: string) => ((t.match(/“([^”]+)”/) || [])[1] ?? t).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const seenTalk = new Set<string>();
  const talksList = findCvItems(/multiplex/i)
    .filter((x) => x.sectionId === "talks-selected" || x.sectionId === "professional-services")
    .filter((x) => { const k = normTitle(x.item.text); return seenTalk.has(k) ? false : (seenTalk.add(k), true); });
  const lists = playlistsFor("multiplexity");

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative grid items-center gap-10 py-16 md:grid-cols-[1fr_320px]">
          <div>
            <IdeasTabs current="multiplexity" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Research program</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-7xl">Multiplexity<span className="text-accent">.</span></h1>
            <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-foreground">The one and the many, held together.</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Multiplexity is a way of thinking about technology, education, health and the human being. It rests on Islamic ideals and on a
              worldview of levels of reality (<em>marātib</em>) in which unity and diversity belong together, and it is offered as a framework
              for everyone.
            </p>
            <IdeasBridge current="multiplexity" />
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="#papers" className="text-accent hover:opacity-70">Papers &amp; chapters ↓</a>
              <a href="#videos" className="text-accent hover:opacity-70">Videos &amp; courses ↓</a>
              <a href="#talks" className="text-accent hover:opacity-70">Talks ↓</a>
            </p>
          </div>
          <GeoArt kind="rosette12" size={320} title="A twelve-fold rosette" className="mx-auto w-full max-w-[320px] text-gold" />
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-20 py-16">
        <section>
          <H2>The idea, briefly</H2>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            <p className="leading-relaxed text-muted">
              An electrical engineer meets the one and the many when she splits one signal into many frequencies and must remember it is still one signal.
              A network engineer meets it in the Internet: one network made of thousands of autonomous ones. In AI we meet it whenever one decision is built
              from many models, data sources and human labels — and each of us meets it in ourselves, as one person who is also body, mind, feeling and conviction.
            </p>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                These are different kinds of many: parts, perspectives and levels. Some problems are <strong className="font-serif text-foreground">convergent</strong>: they have one closed
                answer, and either-or thinking is the right tool. Others are <strong className="font-serif text-foreground">divergent</strong>: open-ended, with several defensible answers, and they
                call for both-and thinking.
              </p>
              <p>
                <strong className="font-serif text-foreground">Multiplexity</strong> is the wisdom of integration. It tells the two kinds of problem apart, unifies analysis and synthesis,
                and replaces the tyranny of OR (exclusivism) and the tyranny of AND (relativism) by embracing OR with AND. Treating an open problem as if it had one closed answer is
                uniplexity; treating a problem that has a right answer as if every view were as good as any other is relativism.
              </p>
            </div>
          </div>
        </section>

        <Ornament />

        <section>
          <H2>Three dimensions</H2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dimensions.map((d) => (
              <div key={d.title} className="card-ornate p-6">
                <GeoArt kind={d.art} size={72} />
                <h3 className="mt-4 font-serif text-xl text-foreground">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2>How it relates to neighboring ideas</H2>
          <p className="mt-3 max-w-2xl text-muted">Multiplexity is related to several familiar ideas, and each contributes something. The difference lies mainly in the emphasis on ordered levels and a shared ground.</p>
          <dl className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {notThis.map(([k, v]) => (
              <div key={k} className="border-t border-border pt-3">
                <dt className="font-serif text-lg text-foreground">{k}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <H2>In my research</H2>
          <p className="mt-3 max-w-2xl text-muted">Each line of work can be read as its own one-and-many problem. Follow a card to the related papers.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {domains.map((d) => (
              <Link key={d.title} href={d.href} className="card-ornate block p-5">
                <h3 className="font-serif text-lg text-foreground">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.text}</p>
                <p className="mt-3 text-sm text-accent">{d.href.startsWith("/talks") ? "Related talks →" : "Related papers →"}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <H2 id="papers">Papers, book chapters &amp; preprints</H2>
          <p className="mt-3 max-w-2xl text-muted">
            {pubs.length} items on multiplexity and the closely related systems-thinking work. Open-access PDFs are hosted where the license allows; otherwise the title links to the publisher. This list is generated from my CV and grows with it.
          </p>
          {chapters.length > 0 && (<><h3 className="mt-8 font-serif text-xl text-foreground">Book chapters</h3><div className="mt-2">{chapters.map((p) => <PublicationCard key={p.slug} pub={p} />)}</div></>)}
          <h3 className="mt-8 font-serif text-xl text-foreground">Journal &amp; conference papers</h3>
          <div className="mt-2">{articles.map((p) => <PublicationCard key={p.slug} pub={p} />)}</div>
          <Link href="/publications?theme=multiplexity" className="mt-3 inline-block text-sm text-accent hover:opacity-70">Open these in the searchable list →</Link>
        </section>

        <section>
          <H2 id="videos">Videos &amp; courses</H2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {lists.map((l) => (
              <a key={l.id} href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="card-ornate block p-5">
                <p className="text-xs uppercase tracking-wide text-gold">YouTube playlist{l.videos ? ` · ${l.videos} videos` : ""}</p>
                <h3 className="mt-1 font-serif text-lg text-foreground">{l.title} ↗</h3>
                {l.blurb && <p className="mt-2 text-[15px] leading-relaxed text-muted">{l.blurb}</p>}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">The full IHSAN 2025 course (8 lectures and 103 slides) is on the <Link href="/courses#ihsan-2025" className="text-accent hover:opacity-70">Courses page</Link>.</p>
        </section>

        <section>
          <H2 id="talks">Talks &amp; presentations</H2>
          <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-muted">
            {talksList.map((t, i) => {
              const slides = slidesFor(t.item.text);
              return (
                <li key={i} className="border-b border-border pb-3">
                  <span dangerouslySetInnerHTML={{ __html: t.item.html }} />
                  {slides?.map((sl) => <a key={sl.href} href={sl.href} className="ml-2 whitespace-nowrap text-sm text-accent hover:opacity-70">{sl.label ?? "Slides (PDF)"} ↓</a>)}
                </li>
              );
            })}
          </ul>
          <Link href="/talks?topic=multiplexity" className="mt-4 inline-block text-sm text-accent hover:opacity-70">All talks, filterable by topic and year →</Link>
        </section>

      </Container>
    </>
  );
}
