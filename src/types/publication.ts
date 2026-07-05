export type Theme =
  | "ai"
  | "education"
  | "multiplexity"
  | "ihsan-ethics"
  | "health-psychology"
  | "networks-ict4d";

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string;
  doi: string | null;
  oa_url: string | null;
  pdf: string | null;
  bibtex: string | null;
  abstract: string;
  tags: string[];
  themes: Theme[];
  featured: boolean;
  status: "placeholder" | "final";
};
