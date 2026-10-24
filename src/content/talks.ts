export type TalkCategory = "lecture" | "interview" | "short-course" | "conference-talk";

export type Talk = {
  slug: string;
  title: string;
  category: TalkCategory;
  date: string | null;
  venue: string;
  youtubeId: string | null;
  /** Playlist ID, for a multi-video series without one single representative video. */
  youtubePlaylistId?: string | null;
  /** Non-YouTube link (e.g. a talk hosted on the venue's own site). */
  url?: string | null;
  slidesUrl: string | null;
  description: string;
};

export const talkCategories: { key: TalkCategory; label: string }[] = [
  { key: "lecture", label: "Lectures" },
  { key: "interview", label: "Interviews" },
  { key: "short-course", label: "Short Courses" },
  { key: "conference-talk", label: "Conference Talks" },
];

// Seeded from links already documented in the CV's own "Talks (Selected)"
// section — verified, not guessed. YouTube's channel page doesn't expose its
// video listing to simple fetching, so a broader import needs Junaid to paste
// more links directly rather than have titles/IDs invented here.
export const talks: Talk[] = [
  {
    slug: "essential-skills-21st-century-engineers-2020",
    title: "Essential Skills for Effective 21st Century Engineers and Scientists",
    category: "lecture",
    date: "2020-06",
    venue: "NUST Webinar Series",
    youtubeId: "u5uhFyuksz8",
    slidesUrl: null,
    description:
      "Webinar on the skills and mindset engineering and science graduates need beyond technical training.",
  },
  {
    slug: "thrive-post-covid19-obe-2020",
    title: "How to Thrive in Post-COVID19 Outcome Based Education",
    category: "lecture",
    date: "2020-05",
    venue: "Information Technology University (ITU)",
    youtubeId: "1N9MS7m8tyk",
    slidesUrl: null,
    description:
      "On adapting outcome-based education practices to remote and post-pandemic teaching.",
  },
  {
    slug: "ghazalian-project-ai-era-2024",
    title: "The Ghazalian Project for the AI Era: A Multiplex Critical AI Approach",
    category: "conference-talk",
    date: "2024-03",
    venue: "First Symposium on Comparative Education, Ghazali on Education (HBKU)",
    youtubeId: "Xz9sk3mj19I",
    slidesUrl: null,
    description:
      "A multiplex critical-AI framework for guiding AI development, drawing on Imam Abū Ḥāmid al-Ghazālī’s philosophy of education.",
  },
  {
    slug: "multiplex-intelligence-part-1",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 1)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "uIcCItv1HZc",
    youtubePlaylistId: "PL4AueLFeEG0AP-Qr9ZBReJRnGuMiHQd03",
    slidesUrl: null,
    description:
      "First installment of an 8-part course on cultivating multiplex intelligence in the AI era.",
  },
  {
    slug: "multiplex-intelligence-part-2",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 2)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "4W9eadGulC8",
    slidesUrl: null,
    description: "Part 2 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-3",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 3)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "xnk4jMrNG_I",
    slidesUrl: null,
    description: "Part 3 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-4",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 4)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "SQWkiBgZjUw",
    slidesUrl: null,
    description: "Part 4 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-5",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 5)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "ZncYSnxvIlI",
    slidesUrl: null,
    description: "Part 5 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-6",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 6)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "dPgtt3JLKZY",
    slidesUrl: null,
    description: "Part 6 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-7",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 7)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "AvLZ4C0JTv4",
    slidesUrl: null,
    description: "Part 7 of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "multiplex-intelligence-part-8",
    title: "Education in the AI Era: Cultivating Multiplex Intelligence (Part 8)",
    category: "short-course",
    date: null,
    venue: "Multiplex Intelligence course series",
    youtubeId: "fQ2PS1NnEOY",
    slidesUrl: null,
    description: "Final installment of the 8-part Multiplex Intelligence course.",
  },
  {
    slug: "ai-intro-brief-history",
    title: "Artificial Intelligence: Intro, Brief History, Benefits and Ethical Dilemmas",
    category: "conference-talk",
    date: "2021",
    venue: "International Conference on Islamic Ethics and AI (IEAI) 2021",
    youtubeId: "wIPchnaGczk",
    youtubePlaylistId: "PL4AueLFeEG0DNu6Y3xjDtRivNtWn_pI_9",
    slidesUrl: null,
    description: "Introductory talk on AI, its history, and its ethical dilemmas.",
  },
  {
    slug: "ai-ethics-guest-module-part-1",
    title: "AI Guest Module: AI Ethics (Part 1)",
    category: "lecture",
    date: null,
    venue: "Guest lecture",
    youtubeId: "67XX0LpxXbQ",
    slidesUrl: null,
    description: "Guest lecture module on AI ethics.",
  },
  {
    slug: "islamic-ai-ethics-synergy",
    title:
      "Islamic AI Ethics and Required Synergy between Technical and Non-Technical Fields",
    category: "conference-talk",
    date: "2021",
    venue: "International Conference on Islamic Ethics and AI (IEAI) 2021",
    youtubeId: "Nc_OpkiLPvo",
    youtubePlaylistId: "PL4AueLFeEG0DNu6Y3xjDtRivNtWn_pI_9",
    slidesUrl: null,
    description:
      "On Islamic perspectives on AI ethics and the need for collaboration between technical and non-technical disciplines.",
  },
  {
    slug: "guides-framework-genai-education",
    title: "The GUIDES Framework: Enhancing Engineering Education with GenAI",
    category: "conference-talk",
    date: "2024-07",
    venue: "EDULEARN24",
    youtubeId: "T4R7xVk41Jk",
    slidesUrl: null,
    description:
      "Presents the GUIDES framework for integrating generative AI into engineering education.",
  },
  {
    slug: "who-infodemiology-conference-2020",
    title: "On the 1st WHO Global Infodemiology Conference",
    category: "interview",
    date: "2020",
    venue: "World Health Organization (WHO)",
    youtubeId: "T512C-eADbM",
    slidesUrl: null,
    description:
      "Reflections as an invited scientific expert for the WHO's first Infodemiology Conference.",
  },
  {
    slug: "ummatic-vision-advanced-ai-2025",
    title: "Toward an Ummatic Vision for Advanced AI",
    category: "lecture",
    date: "2025-12",
    venue: "Ummatics Institute",
    youtubeId: null,
    url: "https://ummatics.org/ummatic-ai-vision/",
    slidesUrl: null,
    description:
      "On developing AI grounded in Islamic ethical and intellectual principles, in service of a unified Muslim civilizational vision.",
  },
  {
    slug: "genai-education-critical-multiplex-approach",
    title: "Generative AI for Education: A Critical Multiplex Approach",
    category: "lecture",
    date: "2026-03",
    venue: "Guest lecture",
    youtubeId: "yAJ-gubuFPg",
    slidesUrl: null,
    description:
      "A multiplex-informed critical perspective on generative AI's role in education.",
  },
  {
    slug: "ihsan-for-professionals-short-course",
    title: "IHSAN for Professionals: A Short Course",
    category: "short-course",
    date: null,
    venue: "Full playlist",
    youtubeId: null,
    youtubePlaylistId: "PL4AueLFeEG0DAqrRgnZKQR163mvpOOkz-",
    slidesUrl: "https://www.slideshare.net/junaidq/ihsan-for-muslim-professionals-short-course",
    description:
      "A short course on Ihsan — spiritual excellence, sincerity, vision, and mastery-oriented, service-driven professional life.",
  },
  {
    slug: "understand-quran-easy-way-short-course",
    title: "Understand Quran, the Easy Way — A Short Course",
    category: "short-course",
    date: "2021",
    venue: "Full playlist (17 videos)",
    youtubeId: "aGsOjnZmMLo",
    youtubePlaylistId: "PL4AueLFeEG0BhWMBqH4FKeYMgel5wUxh7",
    slidesUrl: null,
    description: "A short course on understanding the Qur'an, recorded October-December 2021.",
  },
  {
    slug: "security-robustness-ml-tutorial-part-1",
    title: "Introduction to Adversarial ML (Tutorial on Security and Robustness of ML, Part 1)",
    category: "short-course",
    date: null,
    venue: "Security and Robustness of ML tutorial series",
    youtubeId: "XfsnSfkf1WM",
    youtubePlaylistId: "PL4AueLFeEG0ANEE0ESVN-f1cNiEr_X95m",
    slidesUrl: null,
    description: "Part 1 of a 3-part tutorial on adversarial machine learning.",
  },
  {
    slug: "security-robustness-ml-tutorial-part-2",
    title: "Taxonomy of Adversarial ML Attacks (Tutorial on Security and Robustness of ML, Part 2)",
    category: "short-course",
    date: null,
    venue: "Security and Robustness of ML tutorial series",
    youtubeId: "sgqYo2iYxYo",
    slidesUrl: null,
    description: "Part 2 of the tutorial: a taxonomy of adversarial ML attacks.",
  },
  {
    slug: "security-robustness-ml-tutorial-part-3",
    title: "Adversarially Robust ML Solutions (Tutorial on Security and Robustness of ML, Part 3)",
    category: "short-course",
    date: null,
    venue: "Security and Robustness of ML tutorial series",
    youtubeId: "7rnapVwg4_w",
    slidesUrl: null,
    description: "Part 3 of the tutorial: solutions for adversarially robust ML.",
  },
  {
    slug: "computing-seminar-secure-robust-ml",
    title: "Computing Seminar Talk: Secure and Robust Machine Learning",
    category: "lecture",
    date: null,
    venue: "Computing Seminar",
    youtubeId: "psRdgGazfr4",
    slidesUrl: null,
    description:
      "A related seminar talk on secure and robust machine learning, from the same playlist as the Security and Robustness of ML tutorial.",
  },
];
