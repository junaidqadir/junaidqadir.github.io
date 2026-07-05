export type TalkCategory = "lecture" | "interview" | "short-course" | "conference-talk";

export type Talk = {
  slug: string;
  title: string;
  category: TalkCategory;
  date: string | null;
  venue: string;
  youtubeId: string | null;
  slidesUrl: string | null;
  description: string;
};

// Seed structure only — real entries to be added once links are supplied.
// Categories are fixed so the Talks & Media page has its grouping ready
// before content exists, rather than inventing placeholder talks.
export const talkCategories: { key: TalkCategory; label: string }[] = [
  { key: "lecture", label: "Lectures" },
  { key: "interview", label: "Interviews" },
  { key: "short-course", label: "Short Courses" },
  { key: "conference-talk", label: "Conference Talks" },
];

export const talks: Talk[] = [];
