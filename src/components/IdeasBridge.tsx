import Link from "next/link";

type Idea = "multiplexity" | "ihsan";

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
