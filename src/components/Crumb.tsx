import Link from "next/link";

/** A small "back to the parent" line for pages that live under About rather than in the menu. */
export default function Crumb({ href, label }: { href: string; label: string }) {
  return <p className="mb-3 text-sm"><Link href={href} className="text-muted hover:text-accent">← {label}</Link></p>;
}
