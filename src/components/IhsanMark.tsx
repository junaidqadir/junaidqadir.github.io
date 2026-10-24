/**
 * Square-kufic-inspired mark: an orange frame that opens at two corners around interlocking black bars.
 * Abstract geometry in the spirit of the Ihsan icon — it is not calligraphy and spells nothing.
 * Colours follow the theme, so it works in light and dark.
 */
export default function IhsanMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Ihsan mark" className={className}>
      <rect width="100" height="100" rx="8" fill="var(--surface)" stroke="var(--border)" />
      {/* orange frame, open at top-right and bottom-left */}
      <path d="M90 12H12v54" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="square" />
      <path d="M88 52v36H34" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="square" />
      {/* black kufic bars */}
      <g fill="var(--foreground)">
        <rect x="24" y="24" width="52" height="9" />
        <rect x="24" y="24" width="9" height="30" />
        <rect x="42" y="42" width="34" height="9" />
        <rect x="67" y="42" width="9" height="30" />
        <rect x="24" y="63" width="34" height="9" />
      </g>
      <rect x="40" y="76" width="7" height="7" fill="var(--gold)" />
      <rect x="52" y="76" width="7" height="7" fill="var(--gold)" />
    </svg>
  );
}
