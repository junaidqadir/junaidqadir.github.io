import { getAllPublications } from "@/lib/publications";
import { getVideos } from "@/lib/videos";
import { getTalks } from "@/lib/cv";
import { researchThemes, nav } from "@/content/site";
import { venueName } from "@/lib/venues";

export const dynamic = "force-static";

type Entry = { k: "Page" | "Research" | "Publication" | "Talk" | "Video"; t: string; s?: string; h: string; x?: string };

export function GET() {
  const out: Entry[] = [];
  for (const n of nav) out.push({ k: "Page", t: n.label, h: n.href });
  out.push({ k: "Page", t: "Multiplexity", s: "The one and the many, held together", h: "/multiplexity" }, { k: "Page", t: "Ihsan", s: "Spiritual excellence", h: "/ihsan" });
  out.push({ k: "Page", t: "Curriculum vitae", h: "/cv" }, { k: "Page", t: "Awards & honors", h: "/awards" }, { k: "Page", t: "How to learn well", h: "/learning" }, { k: "Page", t: "Teaching & supervision", h: "/teaching" }, { k: "Page", t: "Videos & playlists", h: "/videos" });
  out.push({ k: "Page", t: "The Philosophy of Islamic Legislation (translation)", s: "English translation of lectures by Mufti Abdul Khaliq Azad Raipuri, on SSRN", h: "https://ssrn.com/abstract=5615292", x: "Shah Waliullah Hujjat Allah al-Balighah book" }, { k: "Page", t: "Qatar University Teaching in Higher Education Fellowship (QUTF), Harvard GSE", s: "Professional development, 2024–25", h: "/about#education", x: "Harvard Graduate School of Education HGSE CETL certificate" });
  for (const r of researchThemes) out.push({ k: "Research", t: r.title, s: r.blurb, h: `/publications?theme=${r.publicationTheme}`, x: r.keywords });
  for (const p of getAllPublications()) {
    out.push({ k: "Publication", t: p.title, s: `${p.authors.slice(0, 4).join(", ")}${p.authors.length > 4 ? " et al." : ""} · ${venueName(p.venue)}${p.year ? ` (${p.year})` : ""}`, h: `/publications#${p.slug}`, x: `${p.authors.join(" ")} ${p.tags.join(" ")}` });
  }
  for (const t of getTalks()) {
    const text = t.text.replace(/\s+/g, " ");
    const title = text.match(/“([^”]+)”/)?.[1] ?? text.slice(0, 120);
    out.push({ k: "Talk", t: title, s: text.replace(/“[^”]+”,?\s*/, "").slice(0, 150), h: `/talks?q=${encodeURIComponent(title.slice(0, 40))}`, x: text });
  }
  for (const v of getVideos()) out.push({ k: "Video", t: v.title, s: [v.host, v.year].filter(Boolean).join(" · "), h: `https://www.youtube.com/watch?v=${v.id}${v.start ? `&t=${v.start}s` : ""}` });
  return Response.json(out);
}
