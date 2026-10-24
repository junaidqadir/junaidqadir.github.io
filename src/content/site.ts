import { getAllPublications } from "@/lib/publications";

// Central site content. Long-form facts (career, awards, funding, teaching, talks, supervision)
// are NOT written here: they are synced from the master CV into content/cv.generated.json
// (npm run sync-cv). This file holds only what the CV does not: navigation, links and short copy.

export const nav = [
  { href: "/about", label: "About", also: ["/awards", "/cv"], button: false },
  { href: "/research", label: "Research", also: [], button: false },
  { href: "/multiplexity", label: "Multiplexity", also: [], button: false },
  { href: "/ihsan", label: "Ihsan", also: [], button: false },
  { href: "/courses", label: "Courses", also: ["/learning"], button: false },
  { href: "/talks", label: "Talks", also: [], button: false },
  { href: "/videos", label: "Videos", also: [], button: false },
  { href: "/publications", label: "Publications", also: [], button: false },
  { href: "/students", label: "Students", also: [], button: false },
  { href: "/contact", label: "Contact", also: [], button: true },
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
  /** "logo" = the Ihsan icon itself (three words in square kufic); the others are GeoArt figures. */
  art: "star8" | "rosette12" | "hex6" | "star10" | "star16" | "interlace" | "khatamLattice" | "arabesque" | "logo";
  keywords: string;
};

// Ordered by prominence on the site. publicationTheme keys match the theme tags in the publications archive.
export const researchThemes: ResearchTheme[] = [
  {
    slug: "ai-ethics-governance",
    title: "AI Ethics & Governance",
    blurb:
      "Making artificial intelligence accountable to the people it affects: responsible and human-centered AI, ethical frameworks, and governance and standards for AI in universities and health systems.",
    publicationTheme: "ai-ethics",
    art: "star8",
    keywords: "Responsible AI · Governance & standards · Ethics frameworks",
  },
  {
    slug: "ai-safety-security",
    title: "AI Safety, Security & Robustness",
    blurb:
      "Attacks on and defenses for machine-learning systems — adversarial examples, robustness and distribution shift, privacy-preserving and federated learning, LLM safety evaluation, and cybersecurity for networks, IoT and connected vehicles. A long-standing line of work, published across security, networking and AI venues.",
    publicationTheme: "ai-security",
    art: "interlace",
    keywords: "Adversarial ML · LLM safety · Cybersecurity · Privacy",
  },
  {
    slug: "ai-healthcare",
    title: "AI in Healthcare & Mental Health",
    blurb:
      "Secure, trustworthy and ethical machine learning for clinical care: surgical video, referrals, digital twins, and generative AI for mental-health support, evaluated by whether patients are cared for as well as by accuracy.",
    publicationTheme: "health-psychology",
    art: "star10",
    keywords: "Clinical AI · Digital twins · Mental health",
  },
  {
    slug: "ai-education",
    title: "AI in Education & Engineering Education",
    blurb:
      "Rethinking teaching, assessment and academic integrity so that AI tools support the effort through which students form understanding and judgment.",
    publicationTheme: "education",
    art: "star16",
    keywords: "GenAI in the classroom · Assessment · Curriculum",
  },
  {
    slug: "multiplexity",
    title: "Multiplexity & Systems Thinking",
    blurb:
      "A framework for integrating the one and the many in technology, education, health and the human being, with ordered levels of reality and attention to change over time.",
    publicationTheme: "multiplexity",
    art: "rosette12",
    keywords: "Multiplex systemics · Integration · Wisdom",
  },
  {
    slug: "ihsan-ethics",
    title: "Islamic Ethics & Ihsan",
    blurb:
      "Spiritual excellence (ihsan) as a framework for professional and technological practice — doing things beautifully, sincerely and in service of others.",
    publicationTheme: "ihsan-ethics",
    art: "logo",
    keywords: "Ihsan · Islamic ethics · Technology & wisdom",
  },
  {
    slug: "machine-learning",
    title: "Machine Learning & Applied AI",
    blurb:
      "The technical core: deep, reinforcement and federated learning, computer vision, speech and audio, and AI-enabled cognitive networks — the methods behind the applications above.",
    publicationTheme: "ml",
    art: "khatamLattice",
    keywords: "Deep learning · Reinforcement learning · Vision & speech",
  },
  {
    slug: "networks-ict4d",
    title: "Networks, IoT & ICT4D",
    blurb:
      "Foundational work in wireless and computer networking, mesh and software-defined networks, IoT, and information and communication technology for human development.",
    publicationTheme: "networks-ict4d",
    art: "hex6",
    keywords: "Wireless & mesh networks · IoT · ICT4D",
  },
  {
    slug: "smart-cities-sustainability",
    title: "Smart Cities & Sustainability",
    blurb:
      "Data-driven and AI-enabled systems for cities, energy, mobility and the Sustainable Development Goals.",
    publicationTheme: "sustainability",
    art: "arabesque",
    keywords: "Smart cities · Energy · SDGs",
  },
];

// The publication count is taken from the archive so the biography never goes stale.
const nPublications = Math.floor(getAllPublications().length / 10) * 10;

export const bio = {
  short:
    `Junaid Qadir is a Professor of Computer Engineering at the Department of Computer Science and Engineering, College of Engineering, Qatar University, Doha, Qatar. He has co-authored more than ${nPublications} publications spanning artificial intelligence, computing systems, and engineering education, and has published on generative AI in engineering education in venues including the Journal of Engineering Education, IEEE Frontiers in Education, IEEE EDUCON, and the ASEE Annual Conference. Beyond his technical work, he writes on multiplexity and Islamic ethics as a framework for humane, wisdom-oriented technology and education. His teaching and research have been recognized with Qatar University's Outstanding Faculty Service Award and consecutive College of Engineering Dean's Awards for Excellence in Research (2024), Service (2025), and Teaching (2026), alongside the Higher Education Commission of Pakistan's Best University Teacher Award (2012–2013). He is a Senior Member of both IEEE and ACM, and serves as an ACM Distinguished Speaker.`,
};

export const contact = {
  intro: "The best way to reach me, for speaking invitations, research collaboration or student enquiries, is by email.",
  studentNotes: [
    {
      title: "Note to prospective graduate students",
      body: "Thank you for your interest in working with me. I receive more emails than I can answer, and I am sorry that I cannot reply individually or advise on funding. Graduate admissions at Qatar University are handled centrally, not through a faculty advisor’s recommendation, so please apply directly and follow the published deadlines and procedures. Please do not read a lack of reply as a judgment of your potential. I wish you every success.",
      linkHref: "/learning",
      linkLabel: "While you prepare, these learning resources may help →",
    },
    {
      title: "Note to prospective research assistants",
      body: "When funded PhD or research-assistant positions open in my group, I advertise them formally on this website and on LinkedIn, and they are filled by open competition. Please watch those announcements and apply through them; unsolicited emails cannot be answered individually, and I am sorry for that. A lack of reply is not a judgment of your potential.",
    },
  ],
};
