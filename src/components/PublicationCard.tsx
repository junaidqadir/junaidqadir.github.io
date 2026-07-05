import type { Publication } from "@/types/publication";

export default function PublicationCard({ pub }: { pub: Publication }) {
  const link = pub.doi
    ? `https://doi.org/${pub.doi}`
    : pub.oa_url ?? pub.pdf ?? undefined;

  return (
    <div className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-base leading-snug text-foreground">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        {pub.status === "placeholder" && (
          <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            placeholder
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">
        {pub.authors.join(", ")} · {pub.venue}
        {pub.year ? ` · ${pub.year}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {pub.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-border/60 px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
