import Container from "./Container";
import Ornament from "./Ornament";
import PaletteSwitch from "./PaletteSwitch";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { socials, identity, nav } from "@/content/site";

const links: { label: string; href: string }[] = [
  { label: "Google Scholar", href: socials.scholar },
  { label: "ResearchGate", href: socials.researchgate },
  { label: "YouTube", href: socials.youtube },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "ORCID", href: socials.orcid },
  { label: "QU faculty page", href: "https://qufaculty.qu.edu.qa/jqadir/" },
];

export default function Footer() {
  return (
    <footer className="relative mt-8">
      <div className="pattern-khatam pattern-fade-t pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Container width="max-w-6xl" className="relative">
        <Ornament className="pt-6" />
        <nav aria-label="Site map" className="flex flex-wrap gap-x-5 gap-y-2 pb-2 pt-6 text-sm text-muted">
          {[...nav.map((n) => ({ href: n.href, label: n.label })), { href: "/cv", label: "CV" }, { href: "/awards", label: "Awards" }, { href: "/videos", label: "Videos" }, { href: "/courses", label: "Courses" }].map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-accent">{l.label}</Link>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <ThemeSwitch />
            <PaletteSwitch />
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {link.label}
              </a>
            ))}
            <a href={`mailto:${socials.email}`} className="transition-colors hover:text-accent">Email</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
