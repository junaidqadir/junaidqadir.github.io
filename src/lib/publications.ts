import rawPublications from "../../content/publications/index.json";
import type { Publication, Theme } from "@/types/publication";

const publications = (rawPublications as Publication[]).map((p) => ({ ...p, authors: p.authors.map((a) => a.replace(/\bSenturk\b/g, "Şentürk")) }));

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

export function getAllTags(): string[] {
  const set = new Set<string>();
  publications.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}

export function getAllVenues(): string[] {
  const set = new Set<string>();
  publications.forEach((p) => {
    if (p.venue) set.add(p.venue);
  });
  return [...set].sort();
}

export function getYearRange(): [number, number] {
  const years = publications.map((p) => p.year).filter((y): y is number => y != null);
  return [Math.min(...years), Math.max(...years)];
}
