import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import PublicationSearch from "@/components/PublicationSearch";
import { getAllPublications, getAllTags, getYearRange } from "@/lib/publications";
import { socials } from "@/content/site";

export const metadata: Metadata = { title: "Publications — Junaid Qadir" };

export default function PublicationsPage() {
  const publications = getAllPublications();
  const allTags = getAllTags();
  const yearRange = getYearRange();
  const count = (section: string) => publications.filter((p) => p.section === section).length;

  return (
    <Container width="max-w-4xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Publications</h1>
      <p className="mt-3 max-w-xl text-muted">
        {publications.length} publications (2006–present): {count("journal")} journal papers, {count("conference")} conference papers, {count("book-chapter")} book chapters and {publications.length - count("journal") - count("conference") - count("book-chapter")} other writing. Searchable by
        title, co-author, venue, tag, and year. Sourced from my CV — see{" "}
        <a
          href={socials.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:opacity-70"
        >
          Google Scholar
        </a>{" "}
        for citation metrics.
      </p>

      <p className="mt-4 max-w-xl rounded-sm border border-border bg-surface/50 px-4 py-3 text-sm text-muted">
        <span className="text-gold">New:</span> an English translation of <em>The Philosophy of Islamic Legislation</em> (Waliullahi school of thought), available{" "}
        <a href="https://ssrn.com/abstract=5615292" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">on SSRN ↗</a>.
      </p>

      <div className="mt-10">
        <Suspense fallback={null}>
          <PublicationSearch publications={publications} allTags={allTags} yearRange={yearRange} />
        </Suspense>
      </div>
    </Container>
  );
}
