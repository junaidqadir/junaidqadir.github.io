"use client";

import { useState } from "react";
import type { Publication } from "@/types/publication";
import { tagLabel } from "@/lib/tags";

const REPO = process.env.NEXT_PUBLIC_PUBLICATIONS_REPO_URL ?? "https://github.com/junaidqadir/publications";

const versionLabel = (v?: string | null) =>
  v === "preprint" ? "preprint" : v === "publishedVersion" ? "published version (open licence)" : v === "acceptedVersion" ? "accepted manuscript" : "open copy";

function Authors({ authors }: { authors: string[] }) {
  const LIMIT = 8;
  const [open, setOpen] = useState(false);
  const shown = open ? authors : authors.slice(0, LIMIT);
  return (
    <>
      {shown.map((a, i) => (
        <span key={i}>
          {/qadir/i.test(a) ? <strong className="font-medium text-foreground">{a}</strong> : a}
          {i < shown.length - 1 ? ", " : ""}
        </span>
      ))}
      {authors.length > LIMIT && (
        <button onClick={() => setOpen(!open)} className="ml-1 text-accent hover:opacity-70">
          {open ? "show fewer" : `… +${authors.length - LIMIT} more`}
        </button>
      )}
    </>
  );
}

export default function PublicationCard({
  pub,
  onTagClick,
}: {
  pub: Publication;
  onTagClick?: (tag: string) => void;
}) {
  const [showBib, setShowBib] = useState(false);
  const [copied, setCopied] = useState(false);
  const doiUrl = pub.doi ? `https://doi.org/${pub.doi}` : null;
  const pdfUrl = pub.pdf ? `${REPO}/blob/main/${pub.pdf}` : null;
  const titleLink = doiUrl ?? pub.oa_url ?? pdfUrl ?? undefined;

  const detail = [
    pub.venue,
    pub.volume ? `vol. ${pub.volume}` : null,
    pub.issue ? `no. ${pub.issue}` : null,
    pub.pages ? `pp. ${pub.pages}` : null,
    pub.year ? String(pub.year) : null,
  ].filter(Boolean);

  const pill =
    "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent";

  return (
    <article className="border-b border-border py-6 first:pt-0 last:border-b-0" id={pub.slug}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-base leading-snug text-foreground">
          {titleLink ? (
            <a href={titleLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {(pub.best_paper_award || (pub.awards && pub.awards.length > 0)) && (
            <span className="rounded-full border border-accent px-2 py-0.5 text-xs text-accent" title={(pub.awards || []).join("; ")}>
              award
            </span>
          )}
          {pub.status !== "final" && (
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">{pub.status}</span>
          )}
        </div>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        <Authors authors={pub.authors} />
      </p>
      <p className="mt-0.5 text-sm text-muted">
        <em>{detail.join(", ")}</em>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={`${pillAccent}`} title={`${versionLabel(pub.pdf_version)}${pub.pdf_license ? ` · ${pub.pdf_license}` : ""}`}>
            PDF
            <span className="ml-1 text-[10px] opacity-70">{pub.pdf_version === "preprint" ? "preprint" : "open"}</span>
          </a>
        )}
        {!pdfUrl && pub.oa_url && pub.oa_status !== "unchecked" && (
          <a href={pub.oa_url} target="_blank" rel="noopener noreferrer" className={pill}>
            free to read
          </a>
        )}
        {pub.preprint_url && (
          <a href={pub.preprint_url} target="_blank" rel="noopener noreferrer" className={pillAccent} title="Author-posted preprint">
            {pub.preprint_host ?? "preprint"}
            <span className="ml-1 text-[10px] opacity-70">preprint</span>
          </a>
        )}
        {doiUrl && (
          <a href={doiUrl} target="_blank" rel="noopener noreferrer" className={pill}>
            DOI
          </a>
        )}
        {pub.bibtex && (
          <button onClick={() => setShowBib(!showBib)} className={pill} aria-expanded={showBib}>
            BibTeX
          </button>
        )}
        <span className="mx-1 hidden h-3 w-px bg-border sm:inline-block" />
        {pub.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="rounded-full bg-border/50 px-2 py-0.5 text-xs text-muted transition-colors hover:bg-accent hover:text-background"
            title={`Filter by “${tagLabel(tag)}”`}
          >
            {tagLabel(tag)}
          </button>
        ))}
      </div>

      {pub.access_note && !pdfUrl && (
        <p className="mt-2 text-xs italic leading-relaxed text-muted">
          {pub.access_note.replace("jqadir@qu.edu.qa", "")}
          <a href="mailto:jqadir@qu.edu.qa" className="not-italic text-accent hover:opacity-70">jqadir@qu.edu.qa</a>
        </p>
      )}

      {showBib && pub.bibtex && (
        <div className="mt-3 rounded-md border border-border bg-foreground/[0.03] p-3">
          <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground">{pub.bibtex}</pre>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(pub.bibtex!);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch {}
            }}
            className="mt-2 text-xs text-accent hover:opacity-70"
          >
            {copied ? "Copied ✓" : "Copy BibTeX"}
          </button>
        </div>
      )}
    </article>
  );
}

const pillAccent =
  "inline-flex items-center rounded-full border border-accent px-2.5 py-0.5 text-xs text-accent transition-opacity hover:opacity-70";
