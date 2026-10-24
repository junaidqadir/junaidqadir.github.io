// Evidence for awards listed on the Awards page, matched to CV entries by their text.
// `cert` is a certificate shown as a small thumbnail that opens the full document; `links` are external reports.
export type AwardEvidence = { match: RegExp; cert?: { href: string; thumb: string; alt: string; label: string }; links?: { label: string; href: string }[] };

const C = "/awards/certificates";

export const awardEvidence: AwardEvidence[] = [
  {
    match: /Outstanding Faculty Service Award/i,
    links: [{ label: "Qatar Tribune report", href: "https://www.qatar-tribune.com/article/254893/nation/qu-organises-annual-convocation-for-the-academic-year-20262027" }],
  },
  { match: /Dean['’]s Award for Excellence in Teaching/i, cert: { href: `${C}/dean-teaching-2026.pdf`, thumb: `${C}/dean-teaching-2026.jpg`, alt: "Certificate of Excellence, Dean's Teaching and Learning Excellence Award, 2026", label: "Certificate (PDF)" } },
  { match: /Dean['’]s Award for Excellence in Service/i, cert: { href: `${C}/dean-service-2025.pdf`, thumb: `${C}/dean-service-2025.jpg`, alt: "Certificate, Dean['’]s Award for Excellence in Service, 2025", label: "Certificate (PDF)" } },
  { match: /Dean['’]s Award for Excellence in Research/i, cert: { href: `${C}/dean-research-2024.pdf`, thumb: `${C}/dean-research-2024.jpg`, alt: "Certificate, Dean['’]s Award for Excellence in Research, 2024", label: "Certificate (PDF)" } },
  { match: /EDUCON\) Most Cited Paper/i, cert: { href: `${C}/educon-2025-most-cited-paper.jpg`, thumb: `${C}/educon-2025-most-cited-paper-thumb.jpg`, alt: "IEEE EDUCON 2025 Most Cited Paper Award certificate", label: "Certificate" } },
  { match: /Best University Teacher Award by the Higher Education Commission/i, cert: { href: `${C}/hec-best-university-teacher-2012-13.pdf`, thumb: `${C}/hec-best-university-teacher-2012-13.jpg`, alt: "Higher Education Commission Best University Teacher Award certificate, 2012-2013", label: "Certificate (PDF)" } },
];

export const evidenceFor = (text: string) => awardEvidence.find((e) => e.match.test(text));
