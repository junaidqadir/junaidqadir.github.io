// Slide decks published as PDF (never PPT) and matched to CV talks by title + year. Only decks for talks listed in the CV,
// scanned for confidentiality markers; PowerPoint-only decks were converted from the latest version. To add one:
// copy the PDF to public/slides/ and add a line here.
export type SlideDeck = { title: string; year: number; file: string; pages: number; mb: number; date: string; aliases?: string[] };

export const slideDecks: SlideDeck[] = [
  {
    "title": "Towards Ethical and Effective AI-Augmented Research Writing",
    "aliases": ["Towards Ethical and Effective AI-Augmented Research Writing: A Conceptual Framework and Practical Guidelines"],
    "year": 2026,
    "file": "2026-towards-ethical-and-effective-ai-augmented-research-writing.pdf",
    "pages": 98,
    "mb": 9.9,
    "date": "March 2026"
  },
  {
    "title": "Multiplex Systemics for AI Governance and Open Civilization",
    "year": 2026,
    "file": "2026-multiplex-systemics-for-ai-governance-and-open-civilization.pdf",
    "pages": 31,
    "mb": 3.4,
    "date": "January 2026"
  },
  {
    "title": "Towards Ethical and Effective AI-Augmented Learning: A Multiplex Framework",
    "year": 2026,
    "file": "2026-towards-ethical-and-effective-ai-augmented-learning-a-multip.pdf",
    "pages": 15,
    "mb": 2.1,
    "date": "January 2026"
  },
  {
    "title": "Toward an Ummatic Vision for Advanced AI",
    "year": 2025,
    "file": "2025-toward-an-ummatic-vision-for-advanced-ai.pdf",
    "pages": 71,
    "mb": 6.5,
    "date": "December 2025"
  },
  {
    "title": "Multiplex Digital Twins: AI-Driven Twins for Smarter Health Management",
    "year": 2025,
    "file": "2025-multiplex-digital-twins-ai-driven-twins-for-smarter-health-m.pdf",
    "pages": 27,
    "mb": 3.1,
    "date": "December 2025"
  },
  {
    "title": "Ethical Considerations in the Use of AI in Healthcare",
    "year": 2025,
    "file": "2025-ethical-considerations-in-the-use-of-ai-in-healthcare.pdf",
    "pages": 12,
    "mb": 1.9,
    "date": "November 2025"
  },
  {
    "title": "Generative AI in Engineering Education: Insights from GPT Classrooms and Multi-Agent Learning Experiments",
    "year": 2025,
    "file": "2025-generative-ai-in-engineering-education-insights-from-gpt-cla.pdf",
    "pages": 25,
    "mb": 3.5,
    "date": "October 2025"
  },
  {
    "title": "Generative AI in Higher Education: Lessons from GPT Classrooms and Applications in Student Projects",
    "year": 2025,
    "file": "2025-generative-ai-in-higher-education-lessons-from-gpt-classroom.pdf",
    "pages": 27,
    "mb": 7.7,
    "date": "September 2025"
  },
  {
    "title": "AI for social good: a critical multiplex approach",
    "year": 2025,
    "file": "2025-ai-for-social-good-a-critical-multiplex-approach.pdf",
    "pages": 7,
    "mb": 1,
    "date": "August 26, 2025"
  },
  {
    "title": "Multiplex Systemics: Toward a More Holistic Philosophy of Technology",
    "year": 2025,
    "file": "2025-multiplex-systemics-toward-a-more-holistic-philosophy-of-tec.pdf",
    "pages": 27,
    "mb": 2.3,
    "date": "July 2025"
  },
  {
    "title": "AI for Learning and Teaching the Arabic Language: Analytical Perspectives",
    "year": 2025,
    "file": "2025-ai-for-learning-and-teaching-the-arabic-language-analytical-.pdf",
    "pages": 17,
    "mb": 1,
    "date": "April 2025"
  },
  {
    "title": "The Ghazalian Project for the AI Era: A Multiplex Critical AI Approach",
    "year": 2024,
    "file": "2024-the-ghazalian-project-for-the-ai-era-a-multiplex-critical-ai.pdf",
    "pages": 17,
    "mb": 4.5,
    "date": "March 2024"
  },
  {
    "title": "Educating for the AI Revolution: Fostering a Holistic Human-Centered Approach Based on Wisdom and Multiplexity",
    "year": 2023,
    "file": "2023-educating-for-the-ai-revolution-fostering-a-holistic-human-c.pdf",
    "pages": 24,
    "mb": 2.8,
    "date": "June 2023"
  },
  {
    "title": "Islamic ethics and AI",
    "year": 2023,
    "file": "2023-islamic-ethics-and-ai.pdf",
    "pages": 19,
    "mb": 1.6,
    "date": "January 2023"
  },
  {
    "title": "The GUIDES Framework: Enhancing Engineering Education with GenAI",
    "year": 2024,
    "file": "2024-the-guides-framework-enhancing-engineering-education-with-ge.pdf",
    "pages": 39,
    "mb": 4.1,
    "date": "February 2024"
  },
  {
    "title": "Promise and Opportunities of Digital Twins: Multiplex Thinking in the Age of Complexity",
    "year": 2025,
    "file": "2025-promise-and-opportunities-of-digital-twins-multiplex-thinkin.pdf",
    "pages": 34,
    "mb": 11.2,
    "date": "November 2025"
  },
  {
    "title": "Intelligence Amplification: A Human-Centered Approach to AI-Mediated Education and Professions",
    "year": 2024,
    "file": "2024-intelligence-amplification-a-human-centered-approach-to-ai-m.pdf",
    "pages": 15,
    "mb": 3.2,
    "date": "June 2024"
  },
  {
    "title": "Ethics of Generative & Virtual Experiences in Medicine",
    "year": 2024,
    "file": "2024-ethics-of-generative-virtual-experiences-in-medicine.pdf",
    "pages": 18,
    "mb": 3.3,
    "date": "June 2024"
  },
  {
    "title": "Educating for the AI Revolution",
    "year": 2024,
    "file": "2024-educating-for-the-ai-revolution.pdf",
    "pages": 14,
    "mb": 2.9,
    "date": "February 2024"
  },
  {
    "title": "Engineering and Computing Education for the 21st Century: A Student Primer",
    "year": 2023,
    "file": "2023-engineering-and-computing-education-for-the-21st-century-a-s.pdf",
    "pages": 8,
    "mb": 3.7,
    "date": "March 2023"
  },
  {
    "title": "Education in the Era of ChatGPT and Generative AI",
    "year": 2023,
    "file": "2023-education-in-the-era-of-chatgpt-and-generative-ai.pdf",
    "pages": 35,
    "mb": 10.5,
    "date": "March 2023"
  },
  {
    "title": "Engineering Education in the Era of ChatGPT: Promise and Pitfalls of Generative AI for Education",
    "year": 2023,
    "file": "2023-engineering-education-in-the-era-of-chatgpt-promise-and-pitf.pdf",
    "pages": 34,
    "mb": 4.1,
    "date": "Feb 2023"
  },
  {
    "title": "Engineering Education in the Age of ChatGPT and Exponential AI: A Student Primer",
    "year": 2023,
    "file": "2023-engineering-education-in-the-age-of-chatgpt-and-exponential-.pdf",
    "pages": 35,
    "mb": 11.3,
    "date": "Feb 2023"
  },
  {
    "title": "A Holistic Education for the 21st Century Engineer Based on Wisdom and Multiplexity",
    "year": 2022,
    "file": "2022-a-holistic-education-for-the-21st-century-engineer-based-on-.pdf",
    "pages": 12,
    "mb": 3.1,
    "date": "July 2022"
  },
  {
    "title": "Safe and Trustworthy Artificial Intelligence",
    "year": 2022,
    "file": "2022-safe-and-trustworthy-artificial-intelligence.pdf",
    "pages": 18,
    "mb": 7.3,
    "date": "March, 2022"
  },
  {
    "title": "AI's Governance and Ethical Dilemmas",
    "year": 2021,
    "file": "2021-ai-s-governance-and-ethical-dilemmas.pdf",
    "pages": 17,
    "mb": 5.2,
    "date": "May 2021"
  },
  {
    "title": "Safe and Trustworthy Artificial Intelligence",
    "year": 2021,
    "file": "2021-safe-and-trustworthy-artificial-intelligence.pdf",
    "pages": 12,
    "mb": 5.8,
    "date": "April, 2021"
  },
  {
    "title": "Ethics of Artificial Intelligence",
    "year": 2020,
    "file": "2020-ethics-of-artificial-intelligence.pdf",
    "pages": 23,
    "mb": 9.3,
    "date": "November, 2020"
  },
  {
    "title": "Essential Skills for Effective 21st Century Engineers and Scientists",
    "year": 2020,
    "file": "2020-essential-skills-for-effective-21st-century-engineers-and-sc.pdf",
    "pages": 23,
    "mb": 9.3,
    "date": "June 2020"
  },
  {
    "title": "How to Thrive in Post-COVID19 Outcome Based Education",
    "year": 2020,
    "file": "2020-how-to-thrive-in-post-covid19-outcome-based-education.pdf",
    "pages": 32,
    "mb": 9,
    "date": "May 2020"
  },
  {
    "title": "Developing Trustworthy Educational Metaverses using Open Source GenAI and Mixed Reality (MR) Technologies",
    "year": 2024,
    "file": "2024-developing-trustworthy-educational-metaverses-using-open-sou.pdf",
    "pages": 36,
    "mb": 13.3,
    "date": "May 2024"
  }
];

const words = (t: string) => new Set(t.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w.length > 2));
/** Symmetric word overlap (|A∩B| / max(|A|,|B|)), so a short title does not match a longer one that merely contains it. */
function overlap(a: string, b: string) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.max(A.size, B.size);
}

/** The deck for a CV talk entry (matched on the quoted title and year), as a site-relative URL, or null. */
export function slidesFor(cvText: string): string | null {
  const quoted = (cvText.match(/“([^”]+)”/) || [])[1] ?? cvText;
  const years = [...cvText.matchAll(/\b(?:19|20)\d{2}\b/g)].map((m) => +m[0]);
  for (const m of cvText.matchAll(/['’](\d{2})\b/g)) years.push(2000 + +m[1]); // e.g. EEITC'24
  const hit = slideDecks.find((d) => [d.title, ...(d.aliases ?? [])].some((t) => overlap(quoted, t) >= 0.8) && years.includes(d.year));
  return hit ? `/slides/${hit.file}` : null;
}
