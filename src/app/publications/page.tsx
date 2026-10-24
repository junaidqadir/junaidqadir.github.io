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

  return (
    <Container width="max-w-4xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Publications</h1>
      <p className="mt-3 max-w-xl text-muted">
        {publications.length} publications (2006–present), searchable by
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

      <div className="mt-10">
        <Suspense fallback={null}>
          <PublicationSearch publications={publications} allTags={allTags} yearRange={yearRange} />
        </Suspense>
      </div>
    </Container>
  );
}
