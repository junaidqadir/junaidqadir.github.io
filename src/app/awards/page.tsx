import type { Metadata } from "next";
import Container from "@/components/Container";
import { getAwards, humbleHtml } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Awards & Honors — Junaid Qadir",
  description: "Awards, honors and distinctions, drawn from my CV.",
};

const photos = [
  { src: "/awards/convocation-2026.jpg", alt: "Qatar University Annual Convocation Ceremony, September 2026", caption: "Qatar University Annual Convocation Ceremony, 16 September 2026 — Outstanding Faculty Service Award (2025–26)." },
  { src: "/awards/dean-teaching-2026.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Teaching, 2026", caption: "College of Engineering Dean’s Award for Excellence in Teaching, 2026." },
  { src: "/awards/dean-service-2025.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Service, 2025", caption: "College of Engineering Dean’s Award for Excellence in Service, 2025." },
  { src: "/awards/dean-research-2024.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Research, 2024", caption: "College of Engineering Dean’s Award for Excellence in Research, 2024." },
];

export default function AwardsPage() {
  const awards = getAwards();
  return (
    <Container width="max-w-4xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Awards &amp; Honors</h1>
      <p className="mt-3 max-w-xl text-muted">
        Recognition for research, teaching and service. Most of this work is shared with students and collaborators,
        and I am grateful to them and to my colleagues. The list below follows my CV.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {photos.map((p, i) => (
          <figure key={p.src} className={i === 0 ? "sm:col-span-2" : ""}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading={i === 0 ? "eager" : "lazy"} className="w-full rounded-sm object-cover" />
            <figcaption className="mt-2 text-sm text-muted">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <ul className="mt-14 space-y-4 leading-relaxed text-foreground">
        {awards.map((a, i) => (
          <li key={i} className="border-b border-border pb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: humbleHtml(a.html) }} />
        ))}
      </ul>
    </Container>
  );
}
