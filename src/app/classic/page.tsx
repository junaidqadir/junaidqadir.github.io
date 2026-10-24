import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import ThemeCard from "@/components/ThemeCard";
import PublicationCard from "@/components/PublicationCard";
import { hero, researchThemes, identity } from "@/content/site";
import { getFeaturedPublications } from "@/lib/publications";
import { getKeyNumbers } from "@/lib/stats";
import { getAwards, humbleHtml } from "@/lib/cv";

export const metadata: Metadata = { title: "Classic home — Junaid Qadir", robots: { index: false } };

export default function ClassicHome() {
  const featured = getFeaturedPublications().slice(0, 3);
  const keyNumbers = getKeyNumbers();
  // A modest selection of recent recognition, straight from the CV (full list on /cv#awards-and-honors)
  const recognition = getAwards()
    .filter((a) => /Outstanding Faculty Service|Dean.s Award|Best University Teacher|Distinguished (Lecturer|Speaker)/i.test(a.text))
    .slice(0, 6);

  return (
    <>
      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-20">
          <p className="text-sm uppercase tracking-widest text-muted">
            {identity.affiliation}
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {hero.statement}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {hero.subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link
              href="/publications"
              className="rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity hover:opacity-85"
            >
              View publications
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-border px-5 py-2.5 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              About me
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-14">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {keyNumbers.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-serif text-3xl text-foreground">
                  {item.value}
                </dd>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-xl text-foreground">Recognition</h2>
            <Link href="/cv#awards-and-honors" className="text-sm text-accent hover:opacity-70">
              All awards &amp; honors →
            </Link>
          </div>
          <ul className="mt-4 grid gap-x-10 gap-y-2 text-[15px] leading-relaxed text-muted sm:grid-cols-2">
            {recognition.map((a, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: humbleHtml(a.html) }} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container width="max-w-5xl" className="py-16">
          <h2 className="font-serif text-2xl text-foreground">
            Research themes
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {researchThemes.map((theme) => (
              <ThemeCard key={theme.slug} theme={theme} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container width="max-w-5xl" className="py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-foreground">
              Featured publications
            </h2>
            <Link
              href="/publications"
              className="text-sm text-accent hover:opacity-70"
            >
              All publications →
            </Link>
          </div>
          <div className="mt-6">
            {featured.map((pub) => (
              <PublicationCard key={pub.slug} pub={pub} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
