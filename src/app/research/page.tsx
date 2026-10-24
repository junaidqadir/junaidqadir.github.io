import type { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import PublicationCard from "@/components/PublicationCard";
import GeoArt from "@/components/GeoArt";
import IhsanMark from "@/components/IhsanMark";
import { researchThemes } from "@/content/site";
import { playlistsForTheme, playlistUrl } from "@/content/playlists";
import { getPublicationsByTheme } from "@/lib/publications";
import type { Theme } from "@/types/publication";

export const metadata: Metadata = { title: "Research — Junaid Qadir" };

export default function ResearchPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Research</h1>
      <p className="mt-3 max-w-xl text-muted">
        My work is organized around nine connected themes rather than a
        chronological list — each brings together publications, talks, and
        projects on that topic.
      </p>

      <div className="mt-12 space-y-16">
        {researchThemes.map((theme) => {
          const all = getPublicationsByTheme(theme.publicationTheme as Theme);
          // featured first, then newest — a short, representative list; the full set is one click away
          const pubs = [...all]
            .sort((a, b) => Number(b.featured) - Number(a.featured) || (b.year ?? 0) - (a.year ?? 0))
            .slice(0, 5);
          return (
            <section key={theme.slug} id={theme.slug} className="scroll-mt-24">
              <div className="flex items-center gap-5">
                {theme.art === "logo" ? <IhsanMark size={72} className="shrink-0" /> : <GeoArt kind={theme.art} size={72} className="shrink-0" />}
                <h2 className="font-serif text-2xl text-foreground">{theme.title}</h2>
              </div>
              <p className="mt-2 max-w-xl leading-relaxed text-muted">
                {theme.blurb}
              </p>
              {playlistsForTheme(theme.slug).length > 0 && (
                <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">Lectures</span>
                  {playlistsForTheme(theme.slug).map((l) => (
                    <a key={l.id} href={playlistUrl(l.id)} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">{l.title.replace(/\s*\(.*$/, "")} ↗</a>
                  ))}
                </p>
              )}
              {pubs.length > 0 ? (
                <div className="mt-6">
                  {pubs.map((pub) => (
                    <PublicationCard key={pub.slug} pub={pub} />
                  ))}
                  <Link href={`/publications?theme=${theme.publicationTheme}`} className="mt-2 inline-block text-sm text-accent hover:opacity-70">
                    View all {all.length} publications in this theme →
                  </Link>
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
