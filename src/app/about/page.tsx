import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Distinctions from "@/components/Distinctions";
import { bio, identity, socials } from "@/content/site";
import { listUnder, cvMeta, getSection } from "@/lib/cv";
import RetryImg from "@/components/RetryImg";
import { asset } from "@/lib/assets";
import { fellowship } from "@/content/highlights";

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

  const degrees = getSection("education")?.blocks.flatMap((b) => b.items) ?? [];

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

      <section className="mt-10" aria-labelledby="education">
        <h2 id="education" className="text-sm font-medium uppercase tracking-widest text-muted">Education</h2>
        <ul className="mt-3 space-y-2 leading-relaxed text-foreground">
          {degrees.map((d, i) => (<li key={i} dangerouslySetInnerHTML={{ __html: d.html }} />))}
        </ul>
        <div className="mt-5 flex gap-5">
          <div className="min-w-0 flex-1">
            <p className="leading-relaxed text-foreground"><strong className="font-medium">{fellowship.title}</strong>, 2024–25</p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{fellowship.text}</p>
            <p className="mt-2 text-sm"><a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">View the certificate ↗</a></p>
          </div>
          <a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className="hidden w-24 shrink-0 self-start sm:block" aria-label={fellowship.cert.alt}>
            <RetryImg src={asset(fellowship.cert.thumb)} alt={fellowship.cert.alt} className="w-full rounded-sm border border-border transition-opacity hover:opacity-80" />
          </a>
        </div>
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
