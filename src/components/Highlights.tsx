import Container from "./Container";
import RetryImg from "./RetryImg";
import { asset } from "@/lib/assets";
import { book, fellowship } from "@/content/highlights";

const a = "text-accent hover:opacity-70";

/** Two recent items near the top of the home page: the translation and the teaching fellowship. */
export default function Highlights() {
  return (
    <section aria-labelledby="highlights" className="border-b border-border">
      <Container width="max-w-6xl" className="py-10">
        <h2 id="highlights" className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Recent</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <article className="card-ornate flex flex-col p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{book.kicker}</p>
            <h3 className="mt-2 font-serif text-xl leading-snug text-foreground">{book.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{book.text}</p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {book.links.map((l) => (<a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={a}>{l.label} ↗</a>))}
            </p>
          </article>
          <article className="card-ornate flex gap-5 p-6">
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{fellowship.kicker}</p>
              <h3 className="mt-2 font-serif text-xl leading-snug text-foreground">{fellowship.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{fellowship.text}</p>
              <p className="mt-4 text-sm"><a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className={a}>View the certificate ↗</a></p>
            </div>
            <a href={fellowship.cert.href} target="_blank" rel="noopener noreferrer" className="hidden w-28 shrink-0 self-start sm:block" aria-label={fellowship.cert.alt}>
              <RetryImg src={asset(fellowship.cert.thumb)} alt={fellowship.cert.alt} className="w-full rounded-sm border border-border transition-opacity hover:opacity-80" />
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}
