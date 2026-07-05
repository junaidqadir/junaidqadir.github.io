import Container from "@/components/Container";
import PublicationCard from "@/components/PublicationCard";
import { researchThemes } from "@/content/site";
import { getPublicationsByTheme } from "@/lib/publications";
import type { Theme } from "@/types/publication";

export default function ResearchPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Research</h1>
      <p className="mt-3 max-w-xl text-muted">
        My work is organized around six connected themes rather than a
        chronological list — each brings together publications, talks, and
        projects on that topic.
      </p>

      <div className="mt-12 space-y-16">
        {researchThemes.map((theme) => {
          const pubs = getPublicationsByTheme(
            theme.publicationTheme as Theme
          );
          return (
            <section key={theme.slug} id={theme.slug} className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-foreground">
                {theme.title}
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                {theme.blurb}
              </p>
              {pubs.length > 0 ? (
                <div className="mt-6">
                  {pubs.map((pub) => (
                    <PublicationCard key={pub.slug} pub={pub} />
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted">
                  No publications tagged yet.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </Container>
  );
}
