/**
 * The favicon mark as a vector: al-Ihsan as a square-kufic block (tall alif on the right with the hamza beneath, a horizontal nun
 * and its single dot at the centre). It keeps its own colours (cream, orange, near-black) so it matches the browser-tab icon
 * in every palette. Built for small sizes (nav); the detailed three-line icon stays on the Ihsan pages (see IhsanMark).
 */
const TILES = "M7.50 18.29h10.79v4.05h-10.79zM7.50 33.13h10.79v4.05h-10.79zM7.50 47.98h10.79v4.04h-10.79zM7.50 62.82h10.79v18.89h-10.79zM7.50 22.34h25.63v10.79h-25.63zM7.50 37.18h25.63v10.80h-25.63zM7.50 52.02h25.63v10.80h-25.63zM7.50 7.50h70.16v10.79h-70.16zM7.50 81.71h70.16v10.79h-70.16zM22.34 66.87h55.32v10.79h-55.32zM37.18 37.18h10.80v14.84h-10.80zM37.18 22.34h40.48v10.79h-40.48zM37.18 52.02h40.48v10.80h-40.48zM52.02 37.18h10.80v10.80h-10.80zM66.87 33.13h10.79v18.89h-10.79zM66.87 77.66h10.79v4.05h-10.79z";
const ALIF = "M81.71 7.50h10.79v70.16h-10.79zM81.71 81.71h10.79v3.56h-10.79zM81.71 81.71h3.56v10.79h-3.56zM81.71 88.94h10.79v3.56h-10.79z";

export default function IhsanBlock({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Ihsan icon" className={`block shrink-0 ${className}`} shapeRendering="crispEdges">
      <rect width="100" height="100" rx="20" fill="#0e0c0a" />
      <path d={TILES} fill="#eee3d0" />
      <path d={ALIF} fill="#e8710a" />
    </svg>
  );
}
