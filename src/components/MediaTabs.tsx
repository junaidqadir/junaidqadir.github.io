import Link from "next/link";

/** Switch between the two media pages, which are one section in the menu ("Talks & Videos"). */
export default function MediaTabs({ current }: { current: "talks" | "videos" }) {
  const tab = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm transition-colors ${on ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`;
  return (
    <div className="mb-6 flex flex-wrap gap-2" role="navigation" aria-label="Talks and videos">
      <Link href="/talks" aria-current={current === "talks" ? "page" : undefined} className={tab(current === "talks")}>Talks &amp; slides</Link>
      <Link href="/videos" aria-current={current === "videos" ? "page" : undefined} className={tab(current === "videos")}>Videos &amp; playlists</Link>
    </div>
  );
}
