import { getAwards } from "@/lib/cv";
import { distinctions, type Distinction } from "@/content/distinctions";

/** Badge row built from the CV (see content/distinctions.ts). */
export default function Distinctions({ className = "", heading = true }: { className?: string; heading?: boolean }) {
  const items = getAwards();
  const flagged: { d: Pick<Distinction, "key" | "lead" | "note">; label: string }[] = items
    .filter((a) => a.badge)
    .map((a) => ({ d: { key: `badge-${a.badge!.label}`, lead: !!a.badge!.lead, note: a.badge!.note }, label: a.badge!.label }));
  const found: { d: Pick<Distinction, "key" | "lead" | "note">; label: string }[] = distinctions
    .map((d) => {
      const it = items.find((a) => d.match.test(a.text));
      return it ? { d, label: d.label(it.text) } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  found.unshift(...flagged.filter((f) => !found.some((x) => x.label === f.label)));
  if (!found.length) return null;
  return (
    <div className={className}>
      {heading && <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Professional distinctions</h2>}
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {found.map(({ d, label }) => (
          <li key={d.key} title={d.note}
            className={`inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-sm ${d.lead ? "border-accent bg-accent text-background" : "border-gold/60 bg-surface text-foreground"}`}>
            <svg width="12" height="12" viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={d.lead ? "" : "text-gold"}>
              <rect x="-8" y="-8" width="16" height="16" /><rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
            </svg>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
