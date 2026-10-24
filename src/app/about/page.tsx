import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Distinctions from "@/components/Distinctions";
import { bio, identity, socials } from "@/content/site";
import { listUnder, cvMeta } from "@/lib/cv";

export const metadata: Metadata = { title: "About — Junaid Qadir" };

const Label = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-sm font-medium uppercase tracking-widest text-muted">{children}</h2>
);

export default function AboutPage() {
  // Research & teaching statements are written in the CV (Technical Summary); reuse them verbatim.
  const research = listUnder("technical-summary", /^Research Skills/);
  const teaching = listUnder("technical-summary", /^Teaching Skills/);
  const interests = research.find((i) => /research experience and interest/i.test(i.text));
  const funding = research.find((i) => /funding and leadership/i.test(i.text));
  const teachingStatement = teaching.find((i) => /Recognized for quality teaching/i.test(i.text));

  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">About</h1>
      <p className="mt-2 text-sm text-muted">
        {identity.role}, {identity.affiliation}
      </p>

      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <Link href="/cv" className="text-accent hover:opacity-70">Curriculum vitae →</Link>
        <Link href="/awards" className="text-accent hover:opacity-70">Awards &amp; honors →</Link>
        <Link href="/students" className="text-accent hover:opacity-70">Students →</Link>
        <Link href="/contact" className="text-accent hover:opacity-70">Contact →</Link>
      </p>

      <Distinctions className="mt-8" heading={false} />

      <section className="mt-10">
        <Label>Short bio</Label>
        <p className="mt-3 leading-relaxed text-foreground">{bio.short}</p>
      </section>

      {interests && (
        <section className="mt-10">
          <Label>Research</Label>
          <p className="mt-3 leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: interests.html.replace(/^<strong><em>[^<]*<\/em><\/strong>\s*/, "") }} />
          <p className="mt-3 text-sm">
            <Link href="/research" className="text-accent hover:opacity-70">Research themes →</Link>
            <span className="mx-2 text-muted">·</span>
            <Link href="/publications" className="text-accent hover:opacity-70">All publications →</Link>
          </p>
        </section>
      )}

      {teachingStatement && (
        <section className="mt-10">
          <Label>Teaching</Label>
          <p className="mt-3 leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: teachingStatement.html.replace(/^<strong><em>[^<]*<\/em><\/strong>\s*/, "") }} />
          <p className="mt-3 text-sm">
            <Link href="/teaching" className="text-accent hover:opacity-70">Courses, supervision and open materials →</Link>
          </p>
        </section>
      )}

      {funding && (
        <section className="mt-10">
          <Label>Funding &amp; service</Label>
          <p className="mt-3 leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: funding.html.replace(/^<strong><em>[^<]*<\/em><\/strong>\s*/, "") }} />
        </section>
      )}

      <section className="mt-10" aria-labelledby="context">
        <h2 id="context" className="text-sm font-medium uppercase tracking-widest text-muted">Research in context</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          A few figures from a public, Scopus-based database (the Stanford–Elsevier lists), for readers who want a sense of scale. They are a rough guide, they differ across fields,
          and most of this work was done with students and collaborators, to whom the credit belongs.
        </p>
        <table className="mt-4 w-full max-w-2xl text-sm">
          <caption className="sr-only">Citation indicators from the Stanford–Elsevier database, 2026 edition</caption>
          <tbody className="divide-y divide-border">
            {[
              ["Listing", "Included in the career and 2025 lists; main subfield Networking & Telecommunications"],
              ["Papers and citations", "265 papers; 12,584 citations (1996–2025); h-index 58"],
              ["Self-citation", "6.6% over the career; 2.8% of 2025 citations (8.1% across all listed researchers)"],
              ["Authorship", "First or last author on 46% of papers; middle author on 51%, reflecting team work"],
            ].map(([k, v]) => (
              <tr key={k}><th scope="row" className="w-40 py-2.5 pr-4 text-left align-top font-normal text-muted">{k}</th><td className="py-2.5 text-foreground">{v}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
          Source: Ioannidis et al., <em>Updated science-wide author databases of standardized citation indicators</em> (Elsevier, 2026 edition; Scopus data to the end of 2025).
          Citation counts are imperfect measures of the value of research, and are better read as context than as a verdict.
        </p>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <p className="text-sm text-muted">
          The complete record — career, awards, funding, teaching, service, supervision and talks — is on the{" "}
          <Link href="/cv" className="text-accent hover:opacity-70">CV page</Link>
          {cvMeta.generatedAt ? ` (synced ${cvMeta.generatedAt})` : ""}.
        </p>
        <p className="mt-2 text-sm text-muted">
          Contact:{" "}
          <a href={`mailto:${socials.email}`} className="text-accent hover:opacity-70">{socials.email}</a>
        </p>
      </section>
    </Container>
  );
}
