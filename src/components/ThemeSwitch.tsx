"use client";

import { useSyncExternalStore } from "react";

/** Footer toggle: dark is the default; a visitor's choice of light is remembered on their device. */
const read = () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export default function ThemeSwitch() {
  const theme = useSyncExternalStore<"dark" | "light">(subscribe, read, () => "dark");
  function pick(t: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("jq-theme", t); } catch {}
  }
  const btn = (t: "dark" | "light", label: string) => (
    <button type="button" onClick={() => pick(t)} aria-pressed={theme === t} className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${theme === t ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`}>
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Colour mode">
      <span className="text-xs text-muted">Mode</span>
      {btn("dark", "Dark")}
      {btn("light", "Light")}
    </div>
  );
}
