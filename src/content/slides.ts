// Slide decks published as PDF (never PPT) and matched to CV talks by title. Only decks for talks listed in the CV,
// checked for confidentiality markers. To add one: copy the PDF to public/slides/ and add a line here.
export type SlideDeck = { title: string; file: string; pages: number; mb: number; date: string };

export const slideDecks: SlideDeck[] = [
  {
    "title": "Towards Ethical and Effective AI-Augmented Research Writing",
    "file": "2026-towards-ethical-and-effective-ai-augmented-research-writing.pdf",
    "pages": 98,
    "mb": 9.9,
    "date": "March 2026"
  },
  {
    "title": "Multiplex Systemics for AI Governance and Open Civilization (Usul Talk)",
    "file": "2026-multiplex-systemics-for-ai-governance-and-open-civilization.pdf",
    "pages": 31,
    "mb": 3.4,
    "date": "January 2026"
  },
  {
    "title": "Towards Ethical and Effective AI-Augmented Learning: A Multiplex Framework",
    "file": "2026-towards-ethical-and-effective-ai-augmented-learning-a-multip.pdf",
    "pages": 15,
    "mb": 2.1,
    "date": "January 2026"
  },
  {
    "title": "Toward an Ummatic Vision for Advanced AI",
    "file": "2025-toward-an-ummatic-vision-for-advanced-ai.pdf",
    "pages": 71,
    "mb": 6.5,
    "date": "December 2025"
  },
  {
    "title": "Multiplex Digital Twins: AI-Driven Twins for Smarter Health Management (Master Class)",
    "file": "2025-multiplex-digital-twins-ai-driven-twins-for-smarter-health-m.pdf",
    "pages": 27,
    "mb": 3.1,
    "date": "December 2025"
  },
  {
    "title": "Ethical Considerations in the Use of AI in Healthcare",
    "file": "2025-ethical-considerations-in-the-use-of-ai-in-healthcare.pdf",
    "pages": 12,
    "mb": 1.9,
    "date": "November 2025"
  },
  {
    "title": "Generative AI in Engineering Education: Insights from GPT Classrooms and Multi-Agent Learning Experiments",
    "file": "2025-generative-ai-in-engineering-education-insights-from-gpt-cla.pdf",
    "pages": 25,
    "mb": 3.5,
    "date": "October 2025"
  },
  {
    "title": "Generative AI in Higher Education: Lessons from GPT Classrooms and Applications in Student Projects",
    "file": "2025-generative-ai-in-higher-education-lessons-from-gpt-classroom.pdf",
    "pages": 27,
    "mb": 7.7,
    "date": "September 2025"
  },
  {
    "title": "AI for social good: a critical multiplex approach",
    "file": "2025-ai-for-social-good-a-critical-multiplex-approach.pdf",
    "pages": 7,
    "mb": 1,
    "date": "August 26, 2025"
  },
  {
    "title": "Multiplex Systemics: Toward a More Holistic Philosophy of Technology",
    "file": "2025-multiplex-systemics-toward-a-more-holistic-philosophy-of-tec.pdf",
    "pages": 27,
    "mb": 2.3,
    "date": "July 2025"
  },
  {
    "title": "AI for Learning and Teaching the Arabic Language: Analytical Perspectives",
    "file": "2025-ai-for-learning-and-teaching-the-arabic-language-analytical-.pdf",
    "pages": 17,
    "mb": 1,
    "date": "April 2025"
  },
  {
    "title": "The Ghazalian Project for the AI Era: A Multiplex Critical AI Approach",
    "file": "2024-the-ghazalian-project-for-the-ai-era-a-multiplex-critical-ai.pdf",
    "pages": 17,
    "mb": 4.5,
    "date": "March 2024"
  },
  {
    "title": "Educating for the AI Revolution: Fostering a Holistic Human-Centered Approach Based on Wisdom and Multiplexity (Plenary)",
    "file": "2023-educating-for-the-ai-revolution-fostering-a-holistic-human-c.pdf",
    "pages": 24,
    "mb": 2.8,
    "date": "June 2023"
  },
  {
    "title": "Islamic ethics and AI",
    "file": "2023-islamic-ethics-and-ai.pdf",
    "pages": 19,
    "mb": 1.6,
    "date": "January 2023"
  },
  {
    "title": "The GUIDES Framework: Enhancing Engineering Education with GenAI",
    "file": "2024-the-guides-framework-enhancing-engineering-education-with-ge.pdf",
    "pages": 39,
    "mb": 4.1,
    "date": "February 2024"
  },
  {
    "title": "Promise and Opportunities of Digital Twins: Multiplex Thinking in the Age of Complexity",
    "file": "2025-promise-and-opportunities-of-digital-twins-multiplex-thinkin.pdf",
    "pages": 34,
    "mb": 11.2,
    "date": "November 2025"
  }
];

const words = (t: string) => new Set(t.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w.length > 3));
function overlap(a: string, b: string) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size);
}

/** The deck for a CV talk entry (matched on the quoted title), as a site-relative URL, or null. */
export function slidesFor(cvText: string): string | null {
  const quoted = (cvText.match(/“([^”]+)”/) || [])[1] ?? cvText;
  const hit = slideDecks.find((d) => overlap(quoted, d.title) >= 0.8);
  return hit ? `/slides/${hit.file}` : null;
}
