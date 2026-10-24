/** Human-friendly labels for tag slugs (unknown slugs are title-cased automatically). */
export const tagLabels: Record<string, string> = {
  "ai-safety": "AI safety",
  "generative-ai": "Generative AI",
  "responsible-ai": "Responsible AI",
  "ai-ethics": "AI ethics",
  "adversarial-ml": "Adversarial ML",
  "machine-learning": "Machine learning",
  "reinforcement-learning": "Reinforcement learning",
  "federated-learning": "Federated learning",
  "security-privacy": "Security & privacy",
  "islamic-ethics": "Islamic ethics",
  "metaverse-xr": "Metaverse & XR",
  "speech-audio": "Speech & audio",
  "computer-vision": "Computer vision",
  "smart-cities-sustainability": "Smart cities & sustainability",
  "survey-review": "Surveys & reviews",
  ict4d: "ICT4D",
  networking: "Networking",
  healthcare: "Healthcare",
  psychology: "Psychology",
  education: "Education",
  multiplexity: "Multiplexity",
  quantum: "Quantum",
};

export const tagLabel = (t: string) =>
  tagLabels[t] ?? t.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

export const sectionLabels: Record<string, string> = {
  journal: "Journal",
  conference: "Conference & workshop",
  "book-chapter": "Book chapter",
  misc: "Other writing",
  informal: "Informal",
};
