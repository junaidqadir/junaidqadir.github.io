import rawPublications from "../../content/publications/index.json";
import type { Publication, Theme } from "@/types/publication";

const publications = rawPublications as Publication[];

export function getAllPublications(): Publication[] {
  return publications;
}

export function getFeaturedPublications(): Publication[] {
  return publications.filter((p) => p.featured);
}

export function getPublicationsByTheme(theme: Theme): Publication[] {
  return publications.filter((p) => p.themes.includes(theme));
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
