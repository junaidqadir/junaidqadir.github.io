import Link from "next/link";
import Container from "./Container";
import IhsanBlock from "./IhsanBlock";
import { nav, externalNav, identity } from "@/content/site";

export default function Nav() {
  const links = (
    <>
      {nav.map((item) => (
        <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-accent">
          {item.label}
        </Link>
      ))}
      {externalNav.href && (
        <Link href={externalNav.href} target="_blank" rel="noopener noreferrer" className="text-accent transition-opacity hover:opacity-70">
          {externalNav.label} ↗
        </Link>
      )}
    </>
  );
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <Container width="max-w-6xl">
        <div className="flex items-center justify-between gap-6 py-3">
          <Link href="/" className="flex items-center gap-3 font-serif text-lg tracking-tight text-foreground">
            <IhsanBlock size={32} className="rounded-[20%]" />
            <span>{identity.name}</span>
          </Link>
          {/* desktop */}
          <nav className="hidden items-center gap-x-5 text-sm xl:flex">{links}</nav>
          {/* mobile: no JS needed */}
          <details className="relative xl:hidden">
            <summary className="cursor-pointer list-none rounded border border-border px-3 py-1.5 text-sm text-foreground">Menu</summary>
            <nav className="absolute right-0 mt-2 flex w-56 flex-col gap-3 rounded border border-border bg-surface p-4 text-sm shadow-lg">{links}</nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
