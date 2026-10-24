// Venue names as a reader (or DBLP) would write them: one name per venue, without publisher prefixes, ordinals, years, host
// cities or trailing abbreviations, so "Elsevier Computers & Security (COSE)" and "Elsevier Computer & Security (COSE)" are one venue.

const PUBLISHER = /^(Elsevier|Springer Nature|Springer|Wiley|Nature|MDPI|Taylor & Francis|Emerald|Inderscience)\s+(?=[A-Z])/;

// Variants that cleaning alone cannot unify, keyed by a lower-case fragment of the cleaned name.
const ALIASES: [RegExp, string][] = [
  [/journal of network (and )?computer applications/i, "Journal of Network and Computer Applications"],
  [/^computers? (&|and) security/i, "Computers & Security"],
  [/communications surveys (&|and) tutorials/i, "IEEE Communications Surveys & Tutorials"],
  [/global engineering education conference/i, "IEEE Global Engineering Education Conference (EDUCON)"],
  [/symposium on networks, computers and communications/i, "International Symposium on Networks, Computers and Communications (ISNCC)"],
  [/education and new learning technologies/i, "International Conference on Education and New Learning Technologies (EDULEARN)"],
  [/emerging technologies \(icet\)/i, "International Conference on Emerging Technologies (ICET)"],
  [/frontiers of information \(fit\)/i, "ACM International Conference on Frontiers of Information Technology (FIT)"],
  [/world of wireless, mobile and multimedia networks/i, "IEEE International Symposium on A World of Wireless, Mobile and Multimedia Networks (WoWMoM)"],
  [/american society (of|for) engineering education/i, "ASEE Annual Conference"],
  [/interspeech/i, "Interspeech"],
  [/internet of things \(iot\) magazine/i, "IEEE Internet of Things Magazine"],
  [/^wireless networks/i, "Wireless Networks"],
  [/^special issue on communications and computing for sustainable/i, "MDPI Future Internet (special issue)"],
];

export function venueName(raw: string | null | undefined): string {
  let s = (raw ?? "").trim();
  if (!s) return "";
  s = s.replace(/,\s*early access$/i, "").replace(/\s*\((?:Editors?|Eds?\.?)[^)]*\)?/gi, "").replace(PUBLISHER, "");
  s = s.replace(/\s*\((?:[A-Za-z0-9&'’.\- ]{2,24})\)\s*$/, "");          // trailing (JNCA), (EDUCON 2026)
  s = s.replace(/^\d{4}\s+/, "").replace(/^the\s+/i, "").replace(/^\d+(st|nd|rd|th)\s+(annual\s+)?/i, "").replace(/^(the\s+)?proceedings of (the\s+)?/i, "");
  s = s.replace(/\s*\([^)]*\d{4}[^)]*\)\s*/g, " ");
  s = s.replace(/,\s*[A-Z][A-Za-z .]+,\s*[A-Z][A-Za-z .]+$/, "").replace(/\s+(19|20)\d{2}$/, "").replace(/\s*'\d{2}\b/g, "").replace(/\s+/g, " ").trim();
  for (const [re, name] of ALIASES) if (re.test(s)) return name;
  return s.length > 120 ? s.slice(0, 117).trimEnd() + "…" : s;
}

/** DBLP-style citation tail: "14: 137034–137089" (journal) or "pp. 12–19" (proceedings). */
export function venueDetail(p: { volume?: string | null; issue?: string | null; pages?: string | null; section?: string | null }): string {
  const vol = p.volume ? `${p.volume}${p.issue ? `(${p.issue})` : ""}` : "";
  if (p.section === "journal") return [vol, p.pages].filter(Boolean).join(": ");
  return [vol, p.pages ? `pp. ${p.pages}` : ""].filter(Boolean).join(", ");
}
