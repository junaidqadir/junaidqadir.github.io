import Link from "next/link";

type Section = "courses" | "learning" | "teaching";
const TABS: { id: Section; href: string; label: string }[] = [
  { id: "courses", href: "/courses", label: "Courses" },
  { id: "learning", href: "/learning", label: "How to learn well" },
  { id: "teaching", href: "/teaching", label: "Teaching & supervision" },
];

/** Switch between the pages of the "Courses & Learning" section of the menu. */
export default function CoursesTabs({ current }: { current: Section }) {
  const tab = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm transition-colors ${on ? "border-accent bg-accent text-background" : "border-border text-muted hover:border-accent hover:text-accent"}`;
  return (
    <div className="mb-6 flex flex-wrap gap-2" role="navigation" aria-label="Courses and learning">
      {TABS.map((t) => (
        <Link key={t.id} href={t.href} aria-current={current === t.id ? "page" : undefined} className={tab(current === t.id)}>{t.label}</Link>
      ))}
    </div>
  );
}
