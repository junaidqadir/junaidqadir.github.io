/** A thin rule with an eight-pointed star (khatam) at its centre — used between sections. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-gold ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold/60" />
      <svg width="22" height="22" viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="-8" y="-8" width="16" height="16" />
        <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
        <circle r="2.2" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold/60" />
    </div>
  );
}
