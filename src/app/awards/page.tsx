import type { Metadata } from "next";
import Container from "@/components/Container";
import Crumb from "@/components/Crumb";
import { getAwards, humbleHtml } from "@/lib/cv";
import Distinctions from "@/components/Distinctions";
import RetryImg from "@/components/RetryImg";
import { asset } from "@/lib/assets";
import { evidenceFor } from "@/content/awardLinks";

export const metadata: Metadata = {
  title: "Awards & Honors — Junaid Qadir",
  description: "Awards, honors and distinctions, drawn from my CV.",
};

const photos = [
  { src: "/awards/convocation-official-2026.jpg", alt: "Award recipients at the Qatar University Annual Convocation Ceremony, 16 September 2026", caption: "Qatar University Annual Convocation Ceremony, 16 September 2026, where the Outstanding Faculty Service Award (2025–26) was presented." },
  { src: "/awards/dean-teaching-2026.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Teaching, 2026", caption: "College of Engineering Dean’s Award for Excellence in Teaching, 2026." },
  { src: "/awards/dean-service-2025.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Service, 2025", caption: "College of Engineering Dean’s Award for Excellence in Service, 2025." },
  { src: "/awards/dean-research-2024.jpg", alt: "Receiving the College of Engineering Dean's Award for Excellence in Research, 2024", caption: "College of Engineering Dean’s Award for Excellence in Research, 2024." },
  { src: "/awards/educon-2025-stage.jpg", alt: "Receiving the IEEE EDUCON 2025 Most Cited Paper Award in London", caption: "IEEE EDUCON 2025, London: Most Cited Paper Award." },
  { src: "/awards/convocation-closeup-2026.jpg", alt: "With fellow award recipients at the Qatar University convocation, September 2026", caption: "With fellow recipients at the convocation ceremony." },
];

export default function AwardsPage() {
  const awards = getAwards();
  return (
    <Container width="max-w-4xl" className="py-16">
      <Crumb href="/about" label="About" />
      <h1 className="font-serif text-3xl text-foreground">Awards &amp; Honors</h1>
      <p className="mt-3 max-w-xl text-muted">
        Recognition for research, teaching and service. Most of this work is shared with students and collaborators,
        and I am grateful to them and to my colleagues. The list below follows my CV.
      </p>

      <Distinctions className="mt-8" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {photos.map((p, i) => (
          <figure key={p.src} className={i === 0 ? "sm:col-span-2" : ""}>
            <RetryImg src={asset(p.src.replace(".jpg", "-800.jpg"))} srcSet={`${asset(p.src.replace(".jpg", "-800.jpg"))} 800w, ${asset(p.src)} 1600w`} sizes={i === 0 ? "(max-width: 900px) 94vw, 880px" : "(max-width: 640px) 94vw, 430px"} alt={p.alt} priority={i === 0} className="w-full rounded-sm object-cover" />
            <figcaption className="mt-2 text-sm text-muted">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <ul className="mt-14 space-y-4 leading-relaxed text-foreground">
        {awards.map((a, i) => {
          const ev = evidenceFor(a.text);
          return (
            <li key={i} className="flex gap-4 border-b border-border pb-4 text-[15px]">
              <div className="min-w-0 flex-1">
                <span dangerouslySetInnerHTML={{ __html: humbleHtml(a.html) }} />
                {ev?.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ml-2 whitespace-nowrap text-sm text-accent hover:opacity-70">{l.label} ↗</a>
                ))}
                {a.children?.some((b) => b.items.length) && (
                  <ul className="mt-2 space-y-1.5 border-l border-border pl-4 text-muted">
                    {a.children.flatMap((b) => b.items).map((c, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: humbleHtml(c.html) }} />
                    ))}
                  </ul>
                )}
              </div>
              {ev?.cert && (
                <a href={ev.cert.href} target="_blank" rel="noopener noreferrer" className="group block w-24 shrink-0 sm:w-32" aria-label={ev.cert.alt}>
                  <RetryImg src={asset(ev.cert.thumb)} alt={ev.cert.alt} className="w-full rounded-sm border border-border object-cover transition-opacity group-hover:opacity-80" />
                  <span className="mt-1 block text-xs text-accent">{ev.cert.label} ↗</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
