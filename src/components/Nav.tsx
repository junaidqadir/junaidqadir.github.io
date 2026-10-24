import Link from "next/link";
import Container from "./Container";
import { nav, externalNav, identity } from "@/content/site";

export default function Nav() {
  return (
    <header className="border-b border-border">
      <Container width="max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-foreground"
          >
            {identity.name}
          </Link>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            {externalNav.href && (<Link
              href={externalNav.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-opacity hover:opacity-70"
            >
              {externalNav.label} ↗
            </Link>)}
          </nav>
        </div>
      </Container>
    </header>
  );
}
