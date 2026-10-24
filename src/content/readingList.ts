// Recommended reading on learning and study skills. Every work here is cited in the author's own slides or articles on learning.
// To add one: append an entry (the `why` line should say where it comes up).
export type Reading = { authors: string; title: string; kind: "Book" | "Paper"; detail: string; why: string };

export const readingList: Reading[] = [
  { authors: "Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel", title: "Make It Stick: The Science of Successful Learning", kind: "Book", detail: "Harvard University Press, 2014",
    why: "Testing and retrieval as a way to learn, and the evidence for effortful learning." },
  { authors: "Cal Newport", title: "Deep Work: Rules for Focused Success in a Distracted World", kind: "Book", detail: "Grand Central Publishing, 2016",
    why: "Deep work and shallow work: the case for distraction-free concentration." },
  { authors: "Paul Black and Dylan Wiliam", title: "Assessment and classroom learning", kind: "Paper", detail: "Assessment in Education: Principles, Policy & Practice, 5(1), 7–74, 1998",
    why: "The landmark review showing the power of formative assessment, assessment for learning." },
  { authors: "John Hattie", title: "Visible Learning: A Synthesis of Over 800 Meta-Analyses Relating to Achievement", kind: "Book", detail: "Routledge, 2009",
    why: "Students as their own teachers: self-assessment and self-regulation." },
  { authors: "David A. Kolb", title: "Experiential Learning: Experience as the Source of Learning and Development", kind: "Book", detail: "Prentice Hall, 1984",
    why: "Kolb’s learning cycle, from experience to reflection and back to practice." },
  { authors: "James E. Zull", title: "The Art of Changing the Brain: Enriching Teaching by Exploring the Biology of Learning", kind: "Book", detail: "Stylus Publishing, 2002",
    why: "How the learning cycle maps onto the brain, building on Kolb." },
];
