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
            className={`transition-colors hover:text-accent ${on ? "text-foreground underline decoration-accent decoration-2 underline-offset-[10px]" : "text-muted"}`}>
            {item.label}
          </Link>
        );
      })}
      {externalNav.href && (
        <Link href={externalNav.href} target="_blank" rel="noopener noreferrer" className="text-accent transition-opacity hover:opacity-70">
          {externalNav.label} ↗
        </Link>
      )}
    </>
  );
}
