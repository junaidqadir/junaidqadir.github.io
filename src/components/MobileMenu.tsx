"use client";

import { useRef } from "react";
import NavLinks from "./NavLinks";

/** Phone menu: closes after a link is chosen or Escape is pressed (a bare <details> stays open over the new page). */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => { if (ref.current) ref.current.open = false; };
  return (
    <details ref={ref} className="relative lg:hidden" onKeyDown={(e) => { if (e.key === "Escape") { close(); (ref.current?.querySelector("summary") as HTMLElement | null)?.focus(); } }}>
      <summary className="cursor-pointer list-none rounded border border-border px-3 py-1.5 text-sm text-foreground" aria-label="Menu">Menu</summary>
      <nav aria-label="Main" className="absolute right-0 mt-2 flex w-60 flex-col gap-3.5 rounded border border-border bg-surface p-5 text-[15px] shadow-lg">
        <NavLinks onNavigate={close} />
      </nav>
    </details>
  );
}
