import type { Metadata } from "next";
import Container from "@/components/Container";
import StudentNote from "@/components/StudentNote";
import { contact, socials } from "@/content/site";

export const metadata: Metadata = { title: "Contact — Junaid Qadir" };

const links = [
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

      <p className="mt-6 font-serif text-2xl text-foreground">
        <a href={`mailto:${socials.email}`} className="text-accent hover:opacity-70">{socials.email}</a>
      </p>

      <StudentNote className="mt-8" />


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
