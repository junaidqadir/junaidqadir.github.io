import Link from "next/link";
import { contact } from "@/content/site";

/** Each note is collapsed to a single phrase and expands on click (native <details>, no JavaScript needed). */
export default function StudentNote({ className = "" }: { className?: string }) {
  return (
    <div className={`max-w-xl space-y-2 ${className}`}>
      {contact.studentNotes.map((n) => (
        <details key={n.title} className="group rounded border border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-foreground marker:content-none">
            <span>{n.title}</span>
            <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="border-t border-border px-4 py-3 text-[15px] leading-relaxed text-muted">
            <p>{n.body}</p>
            {"linkHref" in n && n.linkHref && (
              <p className="mt-2 text-sm"><Link href={n.linkHref} className="text-accent hover:opacity-70">{n.linkLabel}</Link></p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
