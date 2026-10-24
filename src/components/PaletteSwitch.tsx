"use client";

import { useSyncExternalStore } from "react";

const PALETTES = [
  { id: "lapis", label: "Lapis", color: "#1d4f9a" },
  { id: "saffron", label: "Saffron", color: "#a64a0a" },
  { id: "emerald", label: "Emerald", color: "#14664d" },
  { id: "plum", label: "Plum", color: "#862850" },
];

/** Small swatches in the footer: Lapis is the default; this lets a visitor choose another. */
const read = () => document.documentElement.getAttribute("data-palette") ?? "lapis";
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
  return () => mo.disconnect();
}

export default function PaletteSwitch() {
  const cur = useSyncExternalStore(subscribe, read, () => "lapis");
  function pick(id: string) {
    document.documentElement.setAttribute("data-palette", id);
    try { sessionStorage.setItem("jq-palette", id); } catch {}
  }
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Colour palette">
      <span className="text-xs text-muted">Palette</span>
      {PALETTES.map((p) => (
        <button key={p.id} type="button" onClick={() => pick(p.id)} aria-label={p.label} aria-pressed={cur === p.id} title={p.label}
          className={`h-4 w-4 rounded-full border transition-transform hover:scale-110 ${cur === p.id ? "border-foreground ring-1 ring-foreground" : "border-border"}`}
          style={{ backgroundColor: p.color }} />
      ))}
    </div>
  );
}
