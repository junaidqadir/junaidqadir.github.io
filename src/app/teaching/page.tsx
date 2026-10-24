import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import CoursesTabs from "@/components/CoursesTabs";
import { listUnder, supervisedCount } from "@/lib/cv";
import { socials } from "@/content/site";

export const metadata: Metadata = { title: "Teaching & supervision — Junaid Qadir" };

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
        <Label>Courses</Label>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Every course I have taught, from NUST and the Virtual University of Pakistan to ITU and Qatar University, is listed on{" "}
          <Link href="/courses#courses-taught" className="text-accent hover:opacity-70">Courses &amp; Learning</Link>, together with the open courses, lectures and slides.
          Recorded lectures are also on{" "}
          <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">YouTube</a>.
        </p>
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
