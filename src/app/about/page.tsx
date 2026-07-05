import Container from "@/components/Container";
import { bio, identity, socials } from "@/content/site";

export default function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">About</h1>
      <p className="mt-2 text-sm text-muted">{identity.affiliation}</p>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Short bio
        </h2>
        <p className="mt-3 leading-relaxed text-foreground">{bio.short}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Full bio
        </h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground">
          {bio.long}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Working with me
        </h2>
        <p className="mt-3 leading-relaxed text-foreground">
          [PLACEHOLDER — supervision interests, collaboration themes, and
          guidance for prospective students.]
        </p>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        {bio.cvUrl ? (
          <a
            href={bio.cvUrl}
            className="text-sm text-accent hover:opacity-70"
          >
            Download full CV (PDF) →
          </a>
        ) : (
          <p className="text-sm text-muted">
            [PLACEHOLDER — CV download link once a PDF is added to /public.]
          </p>
        )}
        <p className="mt-2 text-sm text-muted">
          Or reach out directly:{" "}
          <a
            href={`mailto:${socials.email}`}
            className="text-accent hover:opacity-70"
          >
            {socials.email}
          </a>
        </p>
      </section>
    </Container>
  );
}
