import Link from "next/link";
import type { ResearchTheme } from "@/content/site";
import GeoArt from "./GeoArt";
import IhsanMark from "./IhsanMark";

export default function ThemeCard({ theme, count, index, compact = false }: { theme: ResearchTheme; count?: number; index?: number; compact?: boolean }) {
  return (
    <div className="card-ornate p-6">
      <div className="flex items-start gap-5">
        {theme.art === "logo" ? <IhsanMark size={84} round /> : <GeoArt kind={theme.art} size={84} className="shrink-0" />}
        <div>
          {index != null && <p className="font-serif text-sm text-accent">{String(index + 1).padStart(2, "0")}</p>}
          <h3 className="font-serif text-xl leading-snug text-foreground">{theme.title}</h3>
        </div>
      </div>
      {!compact && <p className="mt-4 text-[15px] leading-relaxed text-muted">{theme.blurb}</p>}
      {!compact && <p className="mt-3 text-xs uppercase tracking-wide text-gold">{theme.keywords}</p>}
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <Link href={`/publications?theme=${theme.publicationTheme}`} className="text-accent hover:opacity-70">
          Papers{count != null ? ` (${count})` : ""} →
        </Link>
        <Link href={`/research#${theme.slug}`} className="text-muted hover:text-accent">{compact ? "Read more ↓" : "About this theme"}</Link>
      </p>
    </div>
  );
}
