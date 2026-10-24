export type Theme =
  | "ai"
  | "education"
  | "multiplexity"
  | "ihsan-ethics"
  | "health-psychology"
  | "networks-ict4d";

export type Section = "journal" | "conference" | "book-chapter" | "misc" | "informal";

export type Publication = {
  slug: string;
  cv_label?: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
  doi: string | null;
  section?: Section;
  status: "final" | "accepted" | "forthcoming" | "placeholder";
  awards?: string[];
  best_paper_award?: boolean;
  tags: string[];
  themes: Theme[];
  featured: boolean;
  links?: string[];
  /** Repo-relative path of a hosted open-access / author copy, if one may be shared. */
  pdf?: string | null;
  pdf_version?: string | null;
  pdf_license?: string | null;
  /** Landing page of a free-to-read copy that is linked rather than hosted. */
  oa_url?: string | null;
  oa_status?: string;
  bibtex?: string;
};
