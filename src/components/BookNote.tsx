import { book } from "@/content/highlights";

/** The translation, shown inside the Publications section of the home page and on the Ihsan page. */
export default function BookNote({ className = "" }: { className?: string }) {
  return (
    <aside className={`card-ornate p-5 ${className}`} aria-label="Book-length translation">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">{book.kicker}</p>
      <h3 className="mt-1.5 font-serif text-lg leading-snug text-foreground">{book.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{book.text}</p>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {book.links.map((l) => (<a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-70">{l.label} ↗</a>))}
      </p>
    </aside>
  );
}
