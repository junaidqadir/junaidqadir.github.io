// Central site content. Long-form facts (career, awards, funding, teaching, talks, supervision)
// are NOT written here: they are synced from the master CV into content/cv.generated.json
// (npm run sync-cv). This file holds only what the CV does not: navigation, links and short copy.

export const nav = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/talks", label: "Talks & Media" },
  { href: "/teaching", label: "Teaching" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;

// The Ihsan Initiative site: leave href empty until its real domain is live (nav link is hidden while empty).
export const externalNav = {
  href: "",
  label: "The Ihsan Initiative",
};

export const socials = {
  scholar: "https://scholar.google.com/citations?user=EdPPQToAAAAJ&hl=en",
  researchgate: "https://www.researchgate.net/profile/Junaid-Qadir-2",
  youtube: "https://www.youtube.com/@JunaidQadir",
  linkedin: "https://qa.linkedin.com/in/junaidq",
  orcid: "https://orcid.org/0000-0001-9466-2475",
  email: "jqadir@qu.edu.qa",
};

export const identity = {
  name: "Junaid Qadir",
  affiliation: "Qatar University, Doha, Qatar",
  role: "Professor of Computer Engineering",
};

export const hero = {
  statement: "Technology with wisdom. Education with ihsan.",
  subheading:
    "I work across artificial intelligence, engineering education, multiplexity, digital health, and Islamic ethics — developing wiser ways to design technologies and learning environments for the whole human being.",
};

export type ResearchTheme = {
  slug: string;
  title: string;
  blurb: string;
  publicationTheme: string;
};

export const researchThemes: ResearchTheme[] = [
  {
    slug: "ai",
    title: "AI & Responsible Technology",
    blurb:
      "Designing artificial intelligence and large language model systems that are safe, accountable, and aligned with human flourishing rather than narrow optimization.",
    publicationTheme: "ai",
  },
  {
    slug: "education",
    title: "Engineering Education in the AI Age",
    blurb:
      "Rethinking teaching, assessment, and academic integrity so that AI tools support — rather than replace — the effort through which understanding and judgment are formed.",
    publicationTheme: "education",
  },
  {
    slug: "multiplexity",
    title: "Multiplexity & Systems Thinking",
    blurb:
      "An Islamically-inspired alternative to fragmented, partial models of the human being — applied across education, psychology, healthcare, and technology design.",
    publicationTheme: "multiplexity",
  },
  {
    slug: "ihsan-ethics",
    title: "Islamic Ethics & Ihsan",
    blurb:
      "Spiritual excellence (ihsan) as a framework for professional and technological practice — doing things beautifully, sincerely, and in service of others.",
    publicationTheme: "ihsan-ethics",
  },
  {
    slug: "health-psychology",
    title: "Digital Health & Psychology",
    blurb:
      "Technology's role in mental health, well-being, and psychological care, and how it can be designed to support rather than erode human flourishing.",
    publicationTheme: "health-psychology",
  },
  {
    slug: "networks-ict4d",
    title: "Networks, Cybersecurity & ICT4D",
    blurb:
      "Foundational work in networking, IoT, cybersecurity, and using information and communication technology for human development.",
    publicationTheme: "networks-ict4d",
  },
];

export const bio = {
  short:
    "Junaid Qadir is a Professor of Computer Engineering at the Department of Computer Science and Engineering, College of Engineering, Qatar University, Doha, Qatar. He has co-authored more than 250 papers spanning artificial intelligence, computing systems, and engineering education, and is a leading voice on generative AI in engineering education, publishing in venues including the Journal of Engineering Education, IEEE Frontiers in Education, IEEE EDUCON, and the ASEE Annual Conference. His paper on engineering education in the era of ChatGPT is among the most-cited works on generative AI in engineering education. Beyond his technical work, he writes on multiplexity and Islamic ethics as a framework for humane, wisdom-oriented technology and education. His teaching and research have been recognized with Qatar University's Outstanding Faculty Service Award and consecutive College of Engineering Dean's Awards for Excellence in Research (2024), Service (2025), and Teaching (2026), alongside the Higher Education Commission of Pakistan's Best University Teacher Award (2012–2013). He is a Senior Member of both IEEE and ACM, and serves as an ACM Distinguished Speaker.",
};

export const contact = {
  intro:
    "For speaking invitations, research collaboration, or student supervision inquiries, reach out by email or connect via the links below.",
};
