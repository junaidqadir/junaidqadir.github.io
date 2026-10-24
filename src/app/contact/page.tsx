import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import StudentNote from "@/components/StudentNote";
import { contact, socials } from "@/content/site";

export const metadata: Metadata = { title: "Contact — Junaid Qadir" };

const links = [
  { label: "Email", href: `mailto:${socials.email}` },
  { label: "Google Scholar", href: socials.scholar },
  { label: "ResearchGate", href: socials.researchgate },
  { label: "YouTube", href: socials.youtube },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "ORCID", href: socials.orcid },
];

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Contact</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">
        {contact.intro}
      </p>

      <StudentNote className="mt-8" />

      <section className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2" aria-label="Other ways to get in touch">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Talks, workshops and media</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            I speak on AI ethics and governance, AI in education and healthcare, and multiplexity (see <Link href="/talks" className="text-accent hover:opacity-70">Talks &amp; Videos</Link>).
            A short note with the audience, date, format and place helps me reply properly.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Collaboration and funding</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            I welcome conversations about joint work, especially on AI in education and health and on the ethics of technology (see <Link href="/research" className="text-accent hover:opacity-70">Research</Link>).
            Please say what the problem is, who the partners are, and what you have in mind.
          </p>
        </div>
      </section>

      <ul className="mt-8 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-accent hover:opacity-70"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
