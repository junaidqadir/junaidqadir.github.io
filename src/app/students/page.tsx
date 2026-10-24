import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Ornament from "@/components/Ornament";
import GeoArt from "@/components/GeoArt";
import { getStudents, type Student } from "@/lib/students";

export const metadata: Metadata = {
  title: "Students — Junaid Qadir",
  description: "Graduate students I have supervised, with their theses and, where they have shared them, their own pages.",
};

const linkCls = "text-accent hover:opacity-70";

function Card({ s }: { s: Student }) {
  const l = s.links;
  return (
    <li className="card-ornate p-5">
      <p className="text-xs uppercase tracking-wide text-gold">{s.degree}{s.expected ? ", in progress" : s.year ? `, ${s.year}` : ""}{s.institution ? ` · ${s.institution}` : ""}</p>
      <h3 className="mt-1 font-serif text-xl text-foreground">{s.name}</h3>
      {s.thesis && <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.thesis}</p>}
      {l?.current && <p className="mt-2 text-sm text-muted">Now: {l.current}</p>}
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {l?.website && <a href={l.website} target="_blank" rel="noopener noreferrer" className={linkCls}>Website ↗</a>}
        {l?.scholar && <a href={l.scholar} target="_blank" rel="noopener noreferrer" className={linkCls}>Google Scholar ↗</a>}
        {l?.orcid && <a href={l.orcid} target="_blank" rel="noopener noreferrer" className={linkCls}>ORCID ↗</a>}
        {l?.linkedin && <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn ↗</a>}
        {l?.github && <a href={l.github} target="_blank" rel="noopener noreferrer" className={linkCls}>GitHub ↗</a>}
        {s.papers > 0 && <Link href={`/publications?author=${encodeURIComponent(s.paperQuery)}`} className="text-muted hover:text-accent">{s.papers} paper{s.papers === 1 ? "" : "s"} together →</Link>}
      </p>
    </li>
  );
}

export default function StudentsPage() {
  const all = getStudents();
  const sorted = (xs: Student[]) => [...xs].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));
  const current = all.filter((s) => s.expected);
  const phd = sorted(all.filter((s) => s.degree === "PhD" && !s.expected));
  const ms = sorted(all.filter((s) => s.degree === "MS"));
  const sections: [string, Student[]][] = [["Current students", current], ["PhD graduates", phd], ["MS graduates", ms]];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pattern-khatam pattern-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Container width="max-w-6xl" className="relative flex flex-wrap items-center justify-between gap-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Supervision</p>
            <h1 className="mt-3 font-serif text-5xl font-light leading-[1.02] text-foreground sm:text-6xl">Students<span className="text-accent">.</span></h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {all.length} graduate students whose theses I have supervised, at Qatar University, ITU Lahore and NUST. I am proud of what they have gone on to do.
            </p>
          </div>
          <GeoArt kind="star8" size={150} className="hidden sm:block" />
        </Container>
      </section>

      <Container width="max-w-5xl" className="space-y-14 py-16">
        {sections.filter(([, xs]) => xs.length).map(([title, xs]) => (
          <section key={title}>
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{title} <span className="text-base text-muted">{xs.length}</span></h2>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">{xs.map((s) => <Card key={s.id} s={s} />)}</ul>
          </section>
        ))}
        <Ornament />
        <p className="text-sm leading-relaxed text-muted">
          This list follows my CV. Links to personal pages and profiles appear only where the student has confirmed them. If you are listed here and would like something
          corrected, added or removed, please email me.
        </p>
      </Container>
    </>
  );
}
