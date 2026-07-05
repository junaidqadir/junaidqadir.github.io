"use client";

import { useMemo, useState } from "react";
import PublicationCard from "./PublicationCard";
import type { Publication, Theme } from "@/types/publication";

const themeLabels: Record<Theme, string> = {
  ai: "AI & Responsible Tech",
  education: "Education",
  multiplexity: "Multiplexity",
  "ihsan-ethics": "Islamic Ethics & Ihsan",
  "health-psychology": "Health & Psychology",
  "networks-ict4d": "Networks & ICT4D",
};

export default function PublicationsFilter({
  publications,
}: {
  publications: Publication[];
}) {
  const [active, setActive] = useState<Theme | "all">("all");

  const themesPresent = useMemo(() => {
    const set = new Set<Theme>();
    publications.forEach((p) => p.themes.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [publications]);

  const filtered = useMemo(
    () =>
      active === "all"
        ? publications
        : publications.filter((p) => p.themes.includes(active)),
    [active, publications]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            active === "all"
              ? "border-accent bg-accent text-background"
              : "border-border text-muted hover:border-accent hover:text-accent"
          }`}
        >
          All
        </button>
        {themesPresent.map((theme) => (
          <button
            key={theme}
            onClick={() => setActive(theme)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              active === theme
                ? "border-accent bg-accent text-background"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {themeLabels[theme]}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {filtered.map((pub) => (
          <PublicationCard key={pub.slug} pub={pub} />
        ))}
      </div>
    </div>
  );
}
