import Link from "next/link";

type Idea = "multiplexity" | "ihsan";
const TABS: { id: Idea; href: string; label: string }[] = [
  { id: "multiplexity", href: "/multiplexity", label: "Multiplexity" },
  { id: "ihsan", href: "/ihsan", label: "Ihsan" },
];

/** The two pages share one menu item, "Multiplexity & Ihsan". This switches between them. */
export function IdeasTabs({ current }: { current: Idea }) {
  const tab = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm transition-colors ${on ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`;
  return (
    <div className="mb-6 flex flex-wrap gap-2" role="navigation" aria-label="Multiplexity and ihsan">
      {TABS.map((t) => (
        <Link key={t.id} href={t.href} aria-current={current === t.id ? "page" : undefined} className={tab(current === t.id)}>{t.label}</Link>
      ))}
    </div>
  );
}

/** One line on how the two relate, with a link across to the other page. */
export function IdeasBridge({ current }: { current: Idea }) {
  const other = current === "multiplexity" ? { href: "/ihsan", label: "Ihsan →" } : { href: "/multiplexity", label: "Multiplexity →" };
  return (
    <p className="mt-5 max-w-2xl border-l-2 border-gold pl-4 text-[15px] leading-relaxed text-muted">
      Multiplexity is a way of thinking in levels of reality and both-and; ihsan is the sincerity and excellence with which that thinking is lived.{" "}
      <Link href={other.href} className="whitespace-nowrap text-accent hover:opacity-70">{other.label}</Link>
    </p>
  );
}
