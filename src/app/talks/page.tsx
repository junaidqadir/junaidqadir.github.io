import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { Suspense } from "react";
import { getTalks, listUnder } from "@/lib/cv";
import TalksExplorer, { type TalkItem } from "@/components/TalksExplorer";
import { slidesFor } from "@/content/slides";

export const metadata: Metadata = { title: "Talks & Slides — Junaid Qadir" };

const TOPIC_RULES: [string, RegExp][] = [
  ["ai-ethics", /ethic|responsib|trustworth|safe|bias|harm|accountab/i],
  ["ai-governance", /governance|regulat|polic(y|ies)|standard|P3722|compliance|law/i],
  ["healthcare", /health|medical|clinical|surg|patient|pharma|psycho|bioethic|therap|digital twins? for/i],
  ["education", /educat|teaching|learning|pedagog|student|classroom|curricul|writing|engineer of|GUIDES|ChatGPT/i],
  ["multiplexity", /multiplex|wisdom|systemics|holistic|one and the many/i],
  ["islamic", /islam|ihsan|ghazal|quran|muslim|ummat|usul|spiritual/i],
  ["digital-twins", /digital twin/i],
  ["networks", /network|wireless|5g|iot|adversarial|security|cyber|vehicular|cognitive|machine learning|deep learning/i],
];
const KIND_RULES: [string, RegExp][] = [
  ["Keynote / plenary", /keynote|plenary|distinguished (invited )?talk/i],
  ["Tutorial / workshop", /tutorial|workshop|master ?class|hands-on/i],
  ["Panel", /panel|moderator|session chair|debate|roundtable/i],
  ["Lecture / course", /guest lectur|lecturer|lecture|short course|course/i],
  ["Podcast / interview", /podcast|interview/i],
];
const classify = (text: string) => ({
  topics: TOPIC_RULES.filter(([, re]) => re.test(text)).map(([k]) => k),
  kind: (KIND_RULES.find(([, re]) => re.test(text)) ?? ["Invited / conference talk"])[0],
  year: (() => { const m = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((x) => +x[0]).filter((y) => y <= 2030); return m.length ? m[m.length - 1] : null; })(),
});

export default function TalksPage() {
  // The full list stays CV-driven; slide decks are matched by title and year (recordings live on the Videos page).
  const source = [
    ...getTalks(),
    ...listUnder("professional-services", /^Invited Keynote Speaker/i),
    ...listUnder("professional-services", /^Tutorials/i),
    ...listUnder("professional-services", /^Session Chair/i),
  ];
  const seen = new Set<string>();
  const items: TalkItem[] = source.filter((it) => (seen.has(it.text) ? false : (seen.add(it.text), true))).map((it) => {
    return { html: it.html, slides: slidesFor(it.text), ...classify(it.text) };
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return (
    <Container width="max-w-4xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Talks &amp; Slides</h1>
      <p className="mt-3 max-w-xl text-muted">
        Invited talks, keynotes, tutorials and presentations from my CV, with slides to read or download where I have them.
        For recordings of lectures, courses and interviews, see the{" "}
        <Link href="/videos" className="text-accent hover:opacity-70">Videos page</Link>.
      </p>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-foreground">All talks &amp; presentations</h2>
        <p className="mt-2 text-sm text-muted">Synced from my CV. Filter by topic, year or type; slides are shown as thumbnails where they exist.</p>
        <div className="mt-6">
          <Suspense fallback={null}><TalksExplorer items={items} /></Suspense>
        </div>
      </section>
    </Container>
  );
}
