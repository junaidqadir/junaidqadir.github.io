
// Central site content. Long-form facts (career, awards, funding, teaching, talks, supervision)
// are NOT written here: they are synced from the master CV into content/cv.generated.json
// (npm run sync-cv). This file holds only what the CV does not: navigation, links and short copy.

export const nav = [
  { href: "/about", label: "About", also: ["/awards", "/cv"], button: false },
  { href: "/research", label: "Research", also: [], button: false },
  { href: "/multiplexity", label: "Multiplexity", also: [], button: false },
  { href: "/ihsan", label: "Ihsan", also: [], button: false },
  { href: "/courses", label: "Courses", also: [], button: false },
  { href: "/talks", label: "Talks", also: [], button: false },
  { href: "/videos", label: "Videos", also: [], button: false },
  { href: "/publications", label: "Publications", also: [], button: false },
  { href: "/students", label: "Students", also: [], button: false },
  { href: "/learning", label: "Learning", also: [], button: false },
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


/** Biographies in three lengths for hosts, programs and press. Each has a matching Word file (with portrait) in public/bio/. */
export const bios = [
  {
    id: "75",
    label: "75 words",
    words: 73,
    docx: "/bio/Junaid-Qadir-bio-75-words.docx",
    paragraphs: [
      "Junaid Qadir is a Professor of Computer Engineering at Qatar University in Doha, where he directs the IHSAN Research Lab. His work asks how artificial intelligence can be made safe, accountable and humane, with a focus on AI ethics and governance, health, and education. His widely cited research has won international paper awards and national honors for teaching and service. He is an ACM Distinguished Speaker and an IEEE Education Society Distinguished Lecturer.",
    ],
  },
  {
    id: "150",
    label: "150 words",
    words: 138,
    docx: "/bio/Junaid-Qadir-bio-150-words.docx",
    paragraphs: [
      "Junaid Qadir is a Professor of Computer Engineering at Qatar University in Doha, where he directs the IHSAN Research Lab. His work asks how artificial intelligence can be made safe, accountable and humane. He leads funded projects on testing the safety of AI foundation models, on AI for mental health, on generative AI governance in universities, and on AI capacity for humanitarian organizations. He also writes on Islamic ethics and on technology that serves human flourishing. His widely cited research has received the IEEE Engineering in Medicine and Biology Prize Paper Award. Qatar University has recognized his research, service and teaching, and he received the Higher Education Commission of Pakistan's Best University Teacher Award. He is an ACM Distinguished Speaker and an IEEE Education Society Distinguished Lecturer, and holds a PhD from the University of New South Wales.",
    ],
  },
  {
    id: "300",
    label: "300 words",
    words: 297,
    docx: "/bio/Junaid-Qadir-bio-300-words.docx",
    paragraphs: [
      "Junaid Qadir is a Professor of Computer Engineering at Qatar University in Doha, Qatar, where he directs the IHSAN Research Lab. His research centers on human-centered artificial intelligence, with particular interests in AI ethics and governance, the safety and robustness of AI systems, and the application of AI in education and healthcare. He also writes on Islamic ethics and on how technology can serve human flourishing. His work is widely published, with more than 250 peer-reviewed articles in leading venues such as IEEE Transactions on Pattern Analysis and Machine Intelligence, IEEE Transactions on Artificial Intelligence, the Journal of Artificial Intelligence Research, and ACM Computing Surveys, and has been cited more than 25,000 times.",
      "His awards include the IEEE Engineering in Medicine and Biology Prize Paper Award (2023), the Emerald Literati Outstanding Paper Award (2023), and the Qatar University College of Engineering Dean's Awards for Excellence in Research (2024), Service (2025), and Teaching (2026). He also received the Qatar University Outstanding Faculty Service Award (2025–2026) and Pakistan's highest national teaching honor, the Higher Education Commission's Best University Teacher Award (2012–2013). He has secured competitive research funding from the Qatar Research, Development and Innovation Council, Facebook Research, the British Embassy Doha, and the Higher Education Commission of Pakistan.",
      "He chairs the AI for Teaching and Learning subgroup of the IEEE P3722 standards working group and serves on the advisory board of the AI Center at the Islamic University of Madinah. He is an ACM Distinguished Speaker (2020–2026), an IEEE Education Society Distinguished Lecturer (2025–2026), and a Senior Member of both IEEE and ACM. Before joining Qatar University in 2021, he chaired the Department of Electrical Engineering at the Information Technology University, Lahore. He holds a PhD in Computer Science and Engineering from the University of New South Wales, Australia.",
    ],
  },
];

/** Portraits offered for download on the About page (full-size files in public/portraits/). */
export const portraits = [
  { src: "/portraits/junaid-qadir-portrait-standing.jpg", thumb: "/portraits/junaid-qadir-portrait-standing-480.jpg", alt: "Portrait of Junaid Qadir, standing with arms folded", size: "1931 × 2576" },
  { src: "/portraits/junaid-qadir-portrait-desk.jpg", thumb: "/portraits/junaid-qadir-portrait-desk-480.jpg", alt: "Portrait of Junaid Qadir, seated at a desk", size: "1126 × 1316" },
];

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
