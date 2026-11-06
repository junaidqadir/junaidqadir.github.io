"use client";

import { useState } from "react";

type Bio = { id: string; label: string; docx: string; paragraphs: string[] };

/** The three biography lengths as tabs, each with a copy button and a Word download (bio plus portrait). */
export default function BioTabs({ bios }: { bios: Bio[] }) {
  const [active, setActive] = useState(bios[0]?.id);
  const [copied, setCopied] = useState<string | null>(null);
  const bio = bios.find((b) => b.id === active) ?? bios[0];
  if (!bio) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bio.paragraphs.join("\n\n"));
      setCopied(bio.id);
      setTimeout(() => setCopied(null), 1800);
    } catch { /* clipboard unavailable: the text can still be selected by hand */ }
  };

  return (
    <div>
      <div role="tablist" aria-label="Biography length" className="flex flex-wrap gap-2">
        {bios.map((b) => (
          <button
            key={b.id}
            role="tab"
            id={`bio-tab-${b.id}`}
            aria-selected={b.id === bio.id}
            aria-controls={`bio-panel-${b.id}`}
            onClick={() => setActive(b.id)}
            className={`rounded-sm border px-3 py-1 text-sm transition-colors ${b.id === bio.id ? "border-accent text-accent" : "border-border text-muted hover:text-foreground"}`}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`bio-panel-${bio.id}`} aria-labelledby={`bio-tab-${bio.id}`} className="mt-4 space-y-3 leading-relaxed text-foreground">
        {bio.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <a href={bio.docx} download className="text-accent hover:opacity-70">Download Word file with photo ↓</a>
        <button type="button" onClick={copy} className="text-accent hover:opacity-70">{copied === bio.id ? "Copied" : "Copy text"}</button>
      </p>
    </div>
  );
}
