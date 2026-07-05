import Container from "@/components/Container";
import { socials } from "@/content/site";
import { talkCategories, talks } from "@/content/talks";

export default function TalksPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Talks & Media</h1>
      <p className="mt-3 max-w-xl text-muted">
        Lectures, interviews, short courses, and conference talks. This page
        is ready to populate — send over YouTube links and slide decks and
        they&apos;ll be organized here.
      </p>

      <div className="mt-12 space-y-14">
        {talkCategories.map((cat) => {
          const items = talks.filter((t) => t.category === cat.key);
          return (
            <section key={cat.key}>
              <h2 className="font-serif text-xl text-foreground">
                {cat.label}
              </h2>
              {items.length > 0 ? (
                <div className="mt-4 space-y-6">
                  {items.map((talk) => (
                    <div key={talk.slug} className="border-b border-border pb-6">
                      <h3 className="font-serif text-base text-foreground">
                        {talk.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {talk.venue}
                        {talk.date ? ` · ${talk.date}` : ""}
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {talk.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  No {cat.label.toLowerCase()} added yet.
                </p>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-14 border-t border-border pt-8 text-sm text-muted">
        In the meantime, see the full archive on{" "}
        <a
          href={socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:opacity-70"
        >
          YouTube
        </a>
        .
      </div>
    </Container>
  );
}
