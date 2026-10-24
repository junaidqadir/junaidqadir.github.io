"use client";

import { useState } from "react";

/**
 * An <img> that retries once if it fails to load (flaky mobile networks, a stale cache) and then shows a plain
 * placeholder instead of a broken-image icon. All sources get a cache-busting version from src/lib/assets.ts.
 */
export default function RetryImg({
  src, srcSet, sizes, alt, width, height, className = "", priority = false, fallback = "",
}: { src: string; srcSet?: string; sizes?: string; alt: string; width?: number; height?: number; className?: string; priority?: boolean; fallback?: string }) {
  const [tries, setTries] = useState(0);
  const bust = (u: string) => (tries ? `${u}${u.includes("?") ? "&" : "?"}r=${tries}` : u);
  if (tries > 1) {
    return <span role="img" aria-label={alt} className={`flex items-center justify-center bg-surface text-muted ${className}`} style={{ width, height }}>{fallback}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={bust(src)}
      srcSet={srcSet ? srcSet.split(",").map((s) => bust(s.trim().split(" ")[0]) + " " + s.trim().split(" ")[1]).join(", ") : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
      onError={() => setTimeout(() => setTries((t) => t + 1), 800)}
    />
  );
}
