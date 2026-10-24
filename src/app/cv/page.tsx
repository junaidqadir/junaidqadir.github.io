import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import CvBlocks from "@/components/CvBlocks";
import { cvMeta, getSections, humbleHtml } from "@/lib/cv";
import { getAllPublications } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Junaid Qadir",
  description:
    "Full, regularly synced curriculum vitae: career, awards, funding, teaching, service, supervision and talks.",
};

export default function CvPage() {
  const sections = getSections();
  const pubs = getAllPublications();
  const byType = (t: string) => pubs.filter((p) => p.section === t).length;

  return (
    <Container width="max-w-5xl" className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Curriculum Vitae</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            This page is generated from the master CV and re-synced regularly
            {cvMeta.generatedAt ? ` (last sync ${cvMeta.generatedAt})` : ""}, so it is always the most
            complete record of my work.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="CV sections" className="lg:sticky lg:top-6 lg:self-start">
          <ul className="space-y-1.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted hover:text-accent">
                  {s.title}
                </a>
                {s.id === "awards-and-honors" && (
                  <ul className="ml-3 mt-1.5">
                    <li>
                      <a href="#publications" className="text-muted hover:text-accent">
                        Publications
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-14">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-8">
              <h2 className="border-b border-border pb-2 font-serif text-2xl text-foreground">{s.title}</h2>
              <CvBlocks blocks={s.blocks} transform={s.id === "awards-and-honors" ? humbleHtml : undefined} />

              {s.id === "awards-and-honors" && (
                <div id="publications" className="mt-12 scroll-mt-8">
                  <h2 className="border-b border-border pb-2 font-serif text-2xl text-foreground">Publications</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {byType("journal")} journal papers, {byType("conference")} conference and workshop papers,{" "}
                    {byType("book-chapter")} book chapters and other writing — searchable by tag, co-author,
                    venue and year, with open-access PDFs where they may legitimately be shared.
                  </p>
                  <Link href="/publications" className="mt-3 inline-block text-sm text-accent hover:opacity-70">
                    Browse all publications →
                  </Link>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
