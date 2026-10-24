import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { Suspense } from "react";
import { getTalks, listUnder } from "@/lib/cv";
import MediaTabs from "@/components/MediaTabs";
import TalksExplorer, { type TalkItem } from "@/components/TalksExplorer";
import { slidesFor } from "@/content/slides";
import { talkLabels, talkKey } from "@/content/talkLabels";

export const metadata: Metadata = { title: "Talks & Slides — Junaid Qadir" };

// Fallback keyword rules for talks not yet in talkLabels. They match the talk's own title (the quoted part), not the event or
// host name, so "Machine Learning" is not education and an organiser's name is not a topic.
const TOPIC_RULES: [string, RegExp][] = [
  ["ai-ethics", /ethic|responsib|trustworth|\bsafe\b|safety|bias|harm|accountab|authentic/i],
  ["ai-governance", /governance|regulat|polic(y|ies)|standard|P3722|compliance|\blaw\b/i],
  ["healthcare", /health ?care|medic|clinical|surg|patient|pharma|psycholog|mental health|bioethic|therap|covid/i],
  ["education", /educat|teaching|pedagog|student|classroom|curricul|academic writing|research writing|GUIDES|ChatGPT|outcome.based|skills|competenc/i],
  ["multiplexity", /multiplex|wisdom|systemics|holistic|one and the many/i],
  ["islamic", /islamic (ethic|spiritual|psycholog|vision)|ihsan|ghazal|quran|muslim|ummat|usul|maqasid/i],
  ["digital-twins", /digital twin/i],
  ["networks", /wireless|5g|\biot\b|vehicular|cognitive networks|self-driving networks|network security|internet access|adversarial|cloud|big data/i],
];
const KIND_RULES: [string, RegExp][] = [
  ["Session chair", /^session chair/i],
  ["Keynote / plenary", /keynote|plenary/i],
  ["Tutorial / workshop", /tutorial|master ?class|hands-on|instructor|full workshop/i],
  ["Panel", /panel|moderator|debate|roundtable/i],
  ["Lecture / course", /guest lectur|lecturer|short course|summer course|\bcourse\b/i],
  ["Podcast / interview", /podcast|interview/i],
];
const classify = (text: string) => {
  const title = (text.match(/“([^”]+)”/) || [])[1] ?? text;
  const known = talkLabels[talkKey(text)];
  return {
    topics: known ? known.topics : TOPIC_RULES.filter(([, re]) => re.test(title)).map(([k]) => k),
    kind: known ? known.kind : (KIND_RULES.find(([, re]) => re.test(text)) ?? ["Invited / conference talk"])[0],
    year: (() => { const m = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((x) => +x[0]).filter((y) => y <= 2030); return m.length ? m[m.length - 1] : null; })(),
  };
};

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
      <MediaTabs current="talks" />
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
