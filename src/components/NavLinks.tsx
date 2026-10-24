"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, externalNav } from "@/content/site";

const trim = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

/** The menu links, marking the current section (aria-current) so visitors always know where they are. */
export default function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const path = trim(usePathname() ?? "/");
  const here = (item: (typeof nav)[number]) => [item.href, ...item.also].some((h) => path === h || path.startsWith(h + "/"));
  return (
    <>
      {nav.map((item) => {
        const on = here(item);
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate} aria-current={on ? "page" : undefined}
            className={item.button
              ? `rounded-sm border px-3 py-1 transition-colors hover:border-accent hover:text-accent ${on ? "border-accent text-foreground" : "border-border text-foreground"}`
              : `transition-colors hover:text-accent ${on ? "text-foreground underline decoration-accent decoration-2 underline-offset-[10px]" : "text-muted"}`}>
            {item.label}
          </Link>
        );
      })}
      <Link href="/search" onClick={onNavigate} aria-label="Search the site" aria-current={path === "/search" ? "page" : undefined} className={`transition-colors hover:text-accent ${path === "/search" ? "text-foreground" : "text-muted"}`}>
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="inline-block align-[-2px]"><circle cx="8.5" cy="8.5" r="5.5" /><path d="M13 13l4.5 4.5" /></svg>
        <span className="ml-1.5 lg:sr-only">Search</span>
      </Link>
      {externalNav.href && (
        <Link href={externalNav.href} target="_blank" rel="noopener noreferrer" className="text-accent transition-opacity hover:opacity-70">
          {externalNav.label} ↗
        </Link>
      )}
    </>
  );
}
