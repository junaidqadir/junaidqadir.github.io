import generated from "../../content/students.generated.json";
import linksFile from "../../content/students.links.json";
import { getAllPublications } from "@/lib/publications";

export type StudentLinks = {
  website?: string;
  scholar?: string;
  orcid?: string;
  linkedin?: string;
  github?: string;
  current?: string; // current position, as confirmed by the student
  hide?: boolean; // student asked not to be listed
};

export type Student = {
  id: string;
  name: string;
  degree: "PhD" | "MS";
  institution: string | null;
  thesis: string | null;
  year: number | null;
  expected: boolean;
  links: StudentLinks | null; // only present after the student has confirmed
  papers: number; // papers in the archive that list this person as an author
  paperQuery: string; // surname used for the publications filter
};

const INSTITUTIONS: Record<string, string> = {
  QU: "Qatar University",
  ITU: "Information Technology University (ITU), Lahore",
  "SEECS, NUST": "SEECS, National University of Sciences and Technology (NUST)",
};

const clean = (s: string) => s.normalize("NFKD").toLowerCase().replace(/[^a-z ]/g, "").trim();

export function getStudents(): Student[] {
  const links = linksFile as Record<string, StudentLinks>;
  const pubs = getAllPublications();
  const out: Student[] = [];
  for (const s of (generated as { students: Omit<Student, "links" | "papers" | "paperQuery">[] }).students) {
    const l = links[s.id] ?? null;
    if (l?.hide) continue;
    const parts = clean(s.name).split(/\s+/);
    const surname = parts[parts.length - 1];
    // papers often use only one of several given names (e.g. "A. Ahsan" for Muhammad Ahtazaz Ahsan), so accept any given-name initial
    const initials = new Set(parts.slice(0, -1).map((x) => x[0]));
    const papers = pubs.filter((p) =>
      p.authors.some((a) => {
        const aa = clean(a).split(/\s+/);
        return aa[aa.length - 1] === surname && initials.has(aa[0]?.[0]);
      }),
    ).length;
    out.push({ ...s, institution: s.institution ? INSTITUTIONS[s.institution] ?? s.institution : null, links: l, papers, paperQuery: surname });
  }
  return out;
}
