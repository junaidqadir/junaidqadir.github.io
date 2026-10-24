// YouTube playlists on https://www.youtube.com/@JunaidQadir (plus the Multiplex Intelligence course).
// `areas` decides where a playlist is surfaced (multiplexity page, teaching page, talks page).
export type Playlist = {
  id: string;
  title: string;
  videos?: number;
  blurb?: string;
  /** Companion course website, if any. */
  site?: string;
  areas: ("multiplexity" | "ai-ethics" | "education" | "teaching" | "ihsan" | "quran" | "ml-security")[];
};

export const playlistUrl = (id: string) => `https://www.youtube.com/playlist?list=${id}`;

export const playlists: Playlist[] = [
  { id: "PL4AueLFeEG0DJQVEKiE8KCg9Kkk6xQUum", title: "Multiplex AI", videos: 2, areas: ["multiplexity", "ai-ethics"] },
  { id: "PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03", title: "IHSAN Course 2025: Education in the AI Era, Cultivating Multiplex Intelligence and Human Wholeness", videos: 8, blurb: "The eight lectures of the 2025 IHSAN course.", areas: ["multiplexity", "education", "ihsan"] },
  { id: "PL4AueLFeEG0DNu6Y3xjDtRivNtWn_pI_9", title: "International Conference on Islamic Ethics and AI, Lahore, December 2021", videos: 17, areas: ["ai-ethics", "ihsan"] },
  { id: "PL4AueLFeEG0Cy33n0n5N-XBhSHZaYmxFr", title: "AI Ethics — Short Course", videos: 9, areas: ["ai-ethics", "teaching"] },
  { id: "PL4AueLFeEG0BfhyJeE_owDofuRDykjzer", title: "HBKU CILE Guest Lecture on AI Ethics", videos: 3, areas: ["ai-ethics"] },
  { id: "PL4AueLFeEG0BwOZkJK7_37TPVJUm55RH_", title: "Engineering Education", videos: 3, areas: ["education"] },
  { id: "PL4AueLFeEG0ArS4nj1TuRqd2lUEdH1M5n", title: "Writing Course — June 2020", videos: 4, areas: ["teaching"] },
  { id: "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-", title: "IHSAN for Professionals — A Short Course", videos: 13, areas: ["ihsan", "teaching"] },
  { id: "PL4AueLFeEG0BhWMBqH4FKeYMgel5wUxh7", title: "Understand Quran, The Easy Way (Quranic Arabic Short Course, 2021)", videos: 17, blurb: "A short course on understanding the Quran, recorded October to December 2021.", areas: ["ihsan", "quran", "teaching"] },
  { id: "PL4AueLFeEG0ANEE0ESVN-f1cNiEr_X95m", title: "Security and Robustness of Machine Learning (tutorial)", videos: 4, areas: ["ml-security"] },
  { id: "PL931370B167ED8BE7", title: "Teaching and Learning", videos: 11, areas: ["teaching", "education"] },
  { id: "PL6B8E0C06A2002B1D", title: "CS721 — Network Performance and Evaluation (full course)", videos: 44, blurb: "A complete graduate course on the performance evaluation of computer networks: queueing, simulation and measurement.", site: "https://sites.google.com/site/netperfeval", areas: ["teaching"] },
  { id: "PL54B0E89BA5BBCB3B", title: "EE362 — Computer and Communication Networks (SEECS, NUST)", videos: 14, areas: ["teaching"] },
];

export const playlistsFor = (area: Playlist["areas"][number]) => playlists.filter((p) => p.areas.includes(area));
