import Container from "./Container";
import { socials, identity } from "@/content/site";

const links: { label: string; href: string }[] = [
  { label: "Google Scholar", href: socials.scholar },
  { label: "ResearchGate", href: socials.researchgate },
  { label: "YouTube", href: socials.youtube },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "ORCID", href: socials.orcid },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container width="max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${socials.email}`}
              className="transition-colors hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
