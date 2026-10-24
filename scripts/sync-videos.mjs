#!/usr/bin/env node
// Fetches titles (YouTube oEmbed), playlist info (YouTube RSS) and saves thumbnails locally so the site makes no
// third-party requests until a visitor clicks play. Reads content/videos.sources.json, src/content/talks.ts and src/content/playlists.ts.
//   node scripts/sync-videos.mjs            only fetch what is missing
//   node scripts/sync-videos.mjs --refresh  refetch everything
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const refresh = process.argv.includes("--refresh");
const outFile = join(root, "content", "videos.generated.json");
const prev = existsSync(outFile) && !refresh ? JSON.parse(readFileSync(outFile, "utf8")) : { videos: {}, playlists: {} };
const sources = JSON.parse(readFileSync(join(root, "content", "videos.sources.json"), "utf8"));
const read = (p) => readFileSync(join(root, p), "utf8");
const ids = new Set([...sources.videos.map((v) => v.id), ...[...read("src/content/talks.ts").matchAll(/youtubeId:\s*"([\w-]{11})"/g)].map((m) => m[1])]);
const plIds = new Set([...read("src/content/playlists.ts").matchAll(/id:\s*"((?:PL|UU|OL)[\w-]+)"/g)].map((m) => m[1]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const J = async (u) => { const r = await fetch(u, { signal: AbortSignal.timeout(25000) }); if (!r.ok) throw new Error(r.status); return r; };
mkdirSync(join(root, "public", "video-thumbs"), { recursive: true });

async function thumb(id) {
  const f = join(root, "public", "video-thumbs", `${id}.jpg`);
  if (existsSync(f) && !refresh) return;
  for (const q of ["hqdefault", "mqdefault"]) {
    try { const r = await J(`https://i.ytimg.com/vi/${id}/${q}.jpg`); writeFileSync(f, Buffer.from(await r.arrayBuffer())); return; } catch {}
  }
}
for (const id of ids) {
  if (!prev.videos[id]) {
    try {
      const j = await (await J(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)).json();
      prev.videos[id] = { title: j.title, author: j.author_name };
    } catch (e) { console.log("no oEmbed for", id, e.message); prev.videos[id] = prev.videos[id] ?? { title: "", author: "" }; }
    await sleep(250);
  }
  await thumb(id);
}
for (const id of plIds) {
  if (prev.playlists[id] && !refresh) { await thumb(prev.playlists[id].first); continue; }
  try {
    const x = await (await J(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`)).text();
    const first = (x.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
    prev.playlists[id] = { title: (x.match(/<title>(.*?)<\/title>/) || [])[1] ?? "", author: (x.match(/<name>(.*?)<\/name>/) || [])[1] ?? "", first, shown: (x.match(/<yt:videoId>/g) || []).length };
    if (first) await thumb(first);
  } catch (e) { console.log("no feed for", id, e.message); }
  await sleep(250);
}
writeFileSync(outFile, JSON.stringify(prev, null, 2) + "\n");
console.log(`videos: ${Object.keys(prev.videos).length}, playlists: ${Object.keys(prev.playlists).length}`);
