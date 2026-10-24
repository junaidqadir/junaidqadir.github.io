import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import RetryImg from "@/components/RetryImg";
import { asset } from "@/lib/assets";
import { fellowship } from "@/content/highlights";
import CoursesTabs from "@/components/CoursesTabs";
import CvBlocks from "@/components/CvBlocks";
import { getCourses, listUnder, supervisedCount } from "@/lib/cv";
import { socials } from "@/content/site";

export const metadata: Metadata = { title: "Teaching — Junaid Qadir" };

const Label = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-sm font-medium uppercase tracking-widest text-muted">{children}</h2>
);
const strip = (h: string) => h.replace(/^<strong><em>[^<]*<\/em><\/strong>\s*/, "");

export default function TeachingPage() {
  const teaching = listUnder("technical-summary", /^Teaching Skills/);
  const phd = listUnder("professional-services", /^PhD Students \(Main Supervisor\)/);
  const ms = listUnder("professional-services", /^MS Students Graduated \(Main Supervisor\)/);

  return (
    <Container className="py-16">
      <CoursesTabs current="teaching" />
      <h1 className="font-serif text-3xl text-foreground">Teaching &amp; supervision</h1>

      <section className="mt-8">
        <Label>Approach</Label>
        <div className="mt-3 space-y-3">
          {teaching.map((t, i) => (
            <p key={i} className="leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: strip(t.html) }} />
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          A recurring theme: AI can make production easier, but education must preserve the effort through which
          understanding, judgment and character are formed.
        </p>
      </section>

      <section className="mt-10">
        <Label>Professional development</Label>
        <div className="mt-3 flex gap-5">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg text-foreground">{fellowship.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-gold">{fellowship.kicker}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{fellowship.text}</p>
            <p className="mt-3 text-sm"><a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">View the certificate ↗</a></p>
          </div>
          <a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className="hidden w-28 shrink-0 self-start sm:block" aria-label={fellowship.cert.alt}>
            <RetryImg src={asset(fellowship.cert.thumb)} alt={fellowship.cert.alt} className="w-full rounded-sm border border-border transition-opacity hover:opacity-80" />
          </a>
        </div>
      </section>

      <section className="mt-10">
        <Label>Open courses &amp; lectures</Label>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Recorded short courses and lecture series are collected on{" "}
          <Link href="/courses" className="text-accent hover:opacity-70">Courses</Link> (the two IHSAN courses with slides, the full
          CS721 <em>Network Performance &amp; Evaluation</em> lecture series and more), and on{" "}
          <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">YouTube</a>.
        </p>
      </section>

      <section className="mt-10">
        <Label>Courses taught</Label>
        <CvBlocks blocks={getCourses()} />
      </section>

      <section className="mt-10">
        <Label>Supervision</Label>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {supervisedCount()} research students supervised as main supervisor ({phd.length} PhD, {ms.length} MS), plus
          thesis examination and committee service. Full lists are on the{" "}
          <Link href="/cv#professional-services" className="text-accent hover:opacity-70">CV page</Link>.
        </p>
      </section>
    </Container>
  );
}
