// YouTube playlists on https://www.youtube.com/@JunaidQadir (plus the Multiplex Intelligence course).
// `areas` decides where a playlist is surfaced (multiplexity page, teaching page, talks page).
export type Playlist = {
  id: string;
  title: string;
  videos?: number;
  blurb?: string;
  /** Research themes (slugs in site.ts) where this playlist is surfaced. */
  themes?: string[];
  /** Companion course website, if any. */
  site?: string;
  areas: ("multiplexity" | "ai-ethics" | "education" | "teaching" | "ihsan" | "quran" | "ml-security")[];
};

export const playlistUrl = (id: string) => `https://www.youtube.com/playlist?list=${id}`;

export const playlists: Playlist[] = [
  { id: "PL4AueLFeEG0DJQVEKiE8KCg9Kkk6xQUum", themes: ["multiplexity", "ai-ethics-governance"], title: "Multiplex AI", videos: 2, areas: ["multiplexity", "ai-ethics"] },
  { id: "PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03", themes: ["ihsan-ethics", "multiplexity", "ai-education"], title: "IHSAN Course 2025: Education in the AI Era, Cultivating Multiplex Intelligence and Human Wholeness", videos: 8, blurb: "The eight lectures of the 2025 IHSAN course.", areas: ["multiplexity", "education", "ihsan"] },
  { id: "PL4AueLFeEG0DNu6Y3xjDtRivNtWn_pI_9", themes: ["ai-ethics-governance", "ihsan-ethics"], title: "International Conference on Islamic Ethics and AI, Lahore, December 2021", videos: 17, areas: ["ai-ethics", "ihsan"] },
  { id: "PL4AueLFeEG0Cy33n0n5N-XBhSHZaYmxFr", themes: ["ai-ethics-governance"], title: "AI Ethics — Short Course", videos: 9, areas: ["ai-ethics", "teaching"] },
  { id: "PL4AueLFeEG0BfhyJeE_owDofuRDykjzer", themes: ["ai-ethics-governance"], title: "HBKU CILE Guest Lecture on AI Ethics", videos: 3, areas: ["ai-ethics"] },
  { id: "PL4AueLFeEG0BwOZkJK7_37TPVJUm55RH_", themes: ["ai-education"], title: "Engineering Education", videos: 3, areas: ["education"] },
  { id: "PL4AueLFeEG0ArS4nj1TuRqd2lUEdH1M5n", themes: ["ai-education"], title: "Writing Course — June 2020", videos: 4, areas: ["teaching"] },
  { id: "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-", themes: ["ihsan-ethics"], title: "IHSAN for Professionals — A Short Course", videos: 13, areas: ["ihsan", "teaching"] },
  { id: "PL4AueLFeEG0BhWMBqH4FKeYMgel5wUxh7", themes: ["ihsan-ethics"], title: "Understand Quran, The Easy Way (Quranic Arabic Short Course, 2021)", videos: 17, blurb: "A short course on understanding the Quran, recorded October to December 2021.", areas: ["ihsan", "quran", "teaching"] },
  { id: "PL4AueLFeEG0ANEE0ESVN-f1cNiEr_X95m", themes: ["ai-safety-security"], title: "Security and Robustness of Machine Learning (tutorial)", videos: 4, areas: ["ml-security"] },
  { id: "PL931370B167ED8BE7", themes: ["ai-education"], title: "Teaching and Learning", videos: 11, areas: ["teaching", "education"] },
  { id: "PL6B8E0C06A2002B1D", themes: ["networks-ict4d"], title: "CS721 — Network Performance and Evaluation (full course)", videos: 44, blurb: "A complete graduate course on the performance evaluation of computer networks: queueing, simulation and measurement.", site: "https://sites.google.com/site/netperfeval", areas: ["teaching"] },
  { id: "PL54B0E89BA5BBCB3B", themes: ["networks-ict4d"], title: "EE362 — Computer and Communication Networks (SEECS, NUST)", videos: 14, areas: ["teaching"] },
];

export const playlistsFor = (area: Playlist["areas"][number]) => playlists.filter((p) => p.areas.includes(area));

export const playlistsForTheme = (slug: string) => playlists.filter((p) => p.themes?.includes(slug));
