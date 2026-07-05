import Container from "@/components/Container";
import PublicationsFilter from "@/components/PublicationsFilter";
import { getAllPublications } from "@/lib/publications";
import { socials } from "@/content/site";

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Publications</h1>
      <p className="mt-3 max-w-xl text-muted">
        A curated selection of flagship work. For the complete record of
        250+ publications, see{" "}
        <a
          href={socials.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:opacity-70"
        >
          Google Scholar
        </a>{" "}
        or{" "}
        <a
          href={socials.researchgate}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:opacity-70"
        >
          ResearchGate
        </a>
        .
      </p>

      <div className="mt-10">
        <PublicationsFilter publications={publications} />
      </div>
    </Container>
  );
}
