// Central site content. Anything marked [PLACEHOLDER] is a stand-in copy —
// confirmed facts only come from what Junaid gave directly; everything else
// waits for real material rather than being invented.

export const nav = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/talks", label: "Talks & Media" },
  { href: "/teaching", label: "Teaching" },
  { href: "/contact", label: "Contact" },
] as const;

export const externalNav = {
  href: "https://ihsaninitiative.org", // placeholder domain — swap once purchased
  label: "The Ihsan Initiative",
};

export const socials = {
  scholar: "https://scholar.google.com/citations?user=EdPPQToAAAAJ&hl=en",
  researchgate: "https://www.researchgate.net/profile/Junaid-Qadir-2",
  youtube: "https://www.youtube.com/@JunaidQadir",
  linkedin: "https://www.linkedin.com/in/junaidq/",
  orcid: "https://orcid.org/0000-0001-9466-2475",
  email: "junaid.qadir@itu.edu.pk",
};

export const identity = {
  name: "Junaid Qadir",
  affiliation: "Information Technology University (ITU), Lahore", // confirmed via itu.edu.pk email
  role: "[PLACEHOLDER — confirm exact title, e.g. Professor of Computer Science]",
};

export const hero = {
  statement: "Technology with wisdom. Education with ihsan.",
  subheading:
    "I work across artificial intelligence, engineering education, multiplexity, digital health, and Islamic ethics — developing wiser ways to design technologies and learning environments for the whole human being.",
};

export const keyNumbers = [
  { value: "250+", label: "publications" },
  { value: "[PLACEHOLDER]", label: "citations (h-index)" },
  { value: "[PLACEHOLDER]", label: "years teaching & research" },
  { value: "[PLACEHOLDER]", label: "PhD/MS students supervised" },
];

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
    "Junaid Qadir is an academic at the Information Technology University (ITU), Lahore, working across artificial intelligence, engineering education, multiplexity, and Islamic ethics. [PLACEHOLDER — replace with your own short bio, 100-150 words.]",
  long: "[PLACEHOLDER — long narrative bio, 600-800 words, explaining the intellectual thread connecting your technical and spiritual/ethical work. Send me the text or a rough draft and I'll help shape it.]",
  cvUrl: null as string | null, // set once a CV PDF is placed in /public
};

export const teaching = {
  philosophy:
    "[PLACEHOLDER — your teaching philosophy. One idea already agreed as a throughline: AI can make production easier, but education must preserve the effort through which understanding, judgment, and character are formed.]",
  courses: [
    {
      title: "[PLACEHOLDER — course title]",
      institution: "[PLACEHOLDER]",
      year: "[PLACEHOLDER]",
      description: "[PLACEHOLDER — short description]",
    },
  ],
};

export const contact = {
  intro:
    "For speaking invitations, research collaboration, or student supervision inquiries, reach out by email or connect via the links below.",
};
