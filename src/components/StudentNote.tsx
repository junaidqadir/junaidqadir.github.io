import { contact } from "@/content/site";

/** Collapsed to a single phrase; expands on click (native <details>, no JavaScript needed). */
export default function StudentNote({ className = "" }: { className?: string }) {
  return (
    <details className={`group max-w-xl rounded border border-border bg-surface ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm text-foreground marker:content-none">
        <span>{contact.studentNote.title}</span>
        <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="border-t border-border px-4 py-3 text-[15px] leading-relaxed text-muted">{contact.studentNote.body}</p>
    </details>
  );
}
