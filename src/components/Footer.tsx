import Container from "./Container";
import Ornament from "./Ornament";
import { socials, identity } from "@/content/site";

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
        <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} {identity.name} · <span lang="ar" className="font-arabic text-base">إحسان</span>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
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
