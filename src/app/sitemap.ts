export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://junaidqadir.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/research", "/multiplexity", "/publications", "/courses", "/learning", "/ihsan", "/talks", "/teaching", "/awards", "/cv", "/contact"];
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
