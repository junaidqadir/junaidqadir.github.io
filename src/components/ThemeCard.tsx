import Link from "next/link";
import type { ResearchTheme } from "@/content/site";

export default function ThemeCard({ theme }: { theme: ResearchTheme }) {
  return (
    <Link
      href={`/research#${theme.slug}`}
      className="group block rounded-lg border border-border p-6 transition-colors hover:border-accent"
    >
      <h3 className="font-serif text-lg text-foreground">{theme.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{theme.blurb}</p>
      <span className="mt-4 inline-block text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Explore →
      </span>
    </Link>
  );
}
