import sources from "../../content/videos.sources.json";
import generated from "../../content/videos.generated.json";
import { talks } from "@/content/talks";
import { playlists, playlistUrl, type Playlist } from "@/content/playlists";
import { researchThemes } from "@/content/site";

export type VideoKind = "Talk" | "Lecture" | "Interview" | "Research presentation" | "Seminar" | "Course lecture";
export type VideoItem = { id: string; start?: number; title: string; kind: VideoKind; host?: string; year?: number; topics: string[]; featured?: boolean };

const gen = generated as { videos: Record<string, { title: string; author: string }>; playlists: Record<string, { title: string; author: string; first: string; shown: number }> };
const tidy = (t: string) => t.replace(/^Dr\.? ?Junaid Qadir\s*[—–-]\s*/i, "").replace(/\s+\|\s*The Ehmad Zubair Show.*$/i, "").replace(/^Guest Lecture [“"](.*?)[”"] by .*$/i, "$1");

const TOPIC_RULES: [string, RegExp][] = [
  ["ai-ethics", /ethic|responsib|trustworth|safe|bias|harm/i],
  ["ai-governance", /governance|regulat|polic|standard/i],
  ["healthcare", /health|medical|clinical|surg|patient/i],
  ["education", /educat|teaching|learning|pedagog|student|classroom|writing/i],
  ["multiplexity", /multiplex|wisdom|systemics|holistic/i],
  ["islamic", /islam|ihsan|ghazal|quran|muslim|ummat|usul/i],
  ["networks", /network|wireless|security|adversarial|robust|machine learning/i],
];
const kindOf = (c: string): VideoKind => (c === "interview" ? "Interview" : c === "lecture" ? "Lecture" : c === "short-course" ? "Course lecture" : "Talk");

export function getVideos(): VideoItem[] {
  const out = new Map<string, VideoItem>();
  for (const v of sources.videos as { id: string; start?: number; kind: VideoKind; host?: string; year?: number; topics: string[]; featured?: boolean }[]) {
    out.set(v.id, { ...v, title: tidy(gen.videos[v.id]?.title || v.id) });
  }
  for (const t of talks) {
    if (!t.youtubeId || out.has(t.youtubeId)) continue;
    // single lectures of a series live in the playlist cards below; the gallery is for standalone talks
    if (t.category === "short-course" || /\bPart \d\b/i.test(t.title)) continue;
    const text = `${t.title} ${t.venue} ${t.description}`;
    const year = (t.date?.match(/(19|20)\d{2}/) || [])[0];
    out.set(t.youtubeId, { id: t.youtubeId, start: t.startSeconds, title: t.title, kind: kindOf(t.category), host: t.venue, year: year ? +year : undefined, topics: TOPIC_RULES.filter(([, re]) => re.test(text)).map(([k]) => k) });
  }
  return [...out.values()].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || (b.year ?? 0) - (a.year ?? 0));
}

export type PlaylistCard = Playlist & { url: string; thumb: string | null; art: string; count: number };
export function getPlaylistCards(): PlaylistCard[] {
  const artFor = (p: Playlist) => researchThemes.find((t) => t.slug === p.themes?.[0])?.art ?? "star8";
  return playlists.map((p) => {
    const g = gen.playlists[p.id];
    return { ...p, url: playlistUrl(p.id), thumb: g?.first ? `/video-thumbs/${g.first}.jpg` : null, art: artFor(p), count: p.videos ?? g?.shown ?? 0 };
  });
}
