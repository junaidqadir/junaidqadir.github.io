/**
 * Generative Islamic-geometric ornaments (star polygons {n/k} on a circle, rosettes, lattices).
 * Pure SVG, drawn with currentColor so they follow the theme. Each research theme gets its own symmetry.
 */
type Kind = "star8" | "rosette12" | "hex6" | "star10" | "star16" | "kufic" | "interlace" | "khatamLattice" | "arabesque";

const pt = (n: number, i: number, r: number, rot = -90): [number, number] => {
  const a = ((rot + (360 / n) * i) * Math.PI) / 180;
  return [Math.cos(a) * r, Math.sin(a) * r];
};
/** Closed star polygon {n/k} as an SVG path. */
function star(n: number, k: number, r: number, rot = -90) {
  const seen = new Set<number>();
  let d = "";
  for (let s = 0; s < n; s++) {
    if (seen.has(s)) continue;
    let i = s, first = true;
    while (!seen.has(i)) {
      seen.add(i);
      const [x, y] = pt(n, i, r, rot);
      d += `${first ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      first = false;
      i = (i + k) % n;
    }
    d += "Z";
  }
  return d;
}

/** The central point (nuqta): every medallion radiates from it. */
const Nuqta = ({ r = 1.8 }: { r?: number }) => <circle r={r} fill="var(--gold)" stroke="none" />;

export default function GeoArt({ kind = "star8", size = 160, className = "", title }: { kind?: Kind; size?: number; className?: string; title?: string }) {
  const R = 46;
  const common = { fill: "none", strokeWidth: 0.9, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {kind === "star8" && (
        <g>
          <path d={star(8, 3, R)} stroke="var(--accent)" {...common} strokeWidth={1.4} />
          <path d={star(8, 2, R * 0.82)} stroke="var(--gold)" {...common} />
          <path d={star(8, 3, R * 0.5, -67.5)} stroke="var(--accent-2)" {...common} />
          <circle r={R * 0.16} stroke="var(--gold)" {...common} />
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "rosette12" && (
        <g>
          <path d={star(12, 5, R)} stroke="var(--accent)" {...common} strokeWidth={1.3} />
          <path d={star(12, 3, R * 0.8)} stroke="var(--accent-2)" {...common} />
          <path d={star(12, 2, R * 0.55, -75)} stroke="var(--gold)" {...common} />
          {Array.from({ length: 12 }).map((_, i) => {
            const [x, y] = pt(12, i, R * 0.9);
            return <circle key={i} cx={x} cy={y} r={2.2} stroke="var(--gold)" {...common} />;
          })}
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "hex6" && (
        <g>
          {/* honeycomb: a hexagon with six neighbours (no hexagram) */}
          {[[0, 0], ...Array.from({ length: 6 }, (_, i) => { const [x, y] = pt(6, i, R * 0.5, -60); return [x, y]; })].map(([x, y], i) => (
            <path key={i} d={Array.from({ length: 6 }, (_, k) => { const [px, py] = pt(6, k, R * 0.29, -60); return `${k ? "L" : "M"}${(px + x).toFixed(2)} ${(py + y).toFixed(2)}`; }).join("") + "Z"} stroke={i === 0 ? "var(--accent)" : "var(--accent-2)"} {...common} strokeWidth={i === 0 ? 1.4 : 1} />
          ))}
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "star10" && (
        <g>
          <path d={star(10, 3, R)} stroke="var(--accent)" {...common} strokeWidth={1.3} />
          <path d={star(10, 2, R * 0.7)} stroke="var(--gold)" {...common} />
          <path d={star(10, 1, R * 0.4)} stroke="var(--accent-2)" {...common} />
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "star16" && (
        <g>
          <path d={star(16, 7, R)} stroke="var(--accent)" {...common} strokeWidth={1.1} />
          <path d={star(16, 5, R * 0.75)} stroke="var(--gold)" {...common} />
          <path d={star(16, 3, R * 0.5)} stroke="var(--accent-2)" {...common} />
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "interlace" && (
        <g>
          {[0, 22.5, 45].map((r, i) => (
            <rect key={r} x={-R * 0.72} y={-R * 0.72} width={R * 1.44} height={R * 1.44} transform={`rotate(${r})`} stroke={["var(--accent)", "var(--accent-2)", "var(--gold)"][i]} {...common} strokeWidth={1.3} />
          ))}
          <rect x={-R * 0.28} y={-R * 0.28} width={R * 0.56} height={R * 0.56} stroke="var(--foreground)" {...common} strokeWidth={1.6} />
          <circle r={R} stroke="var(--border)" {...common} />
          <Nuqta />
        </g>
      )}
      {kind === "khatamLattice" && (
        <g>
          {/* a patch of an eight-pointed-star tiling: the pattern repeats beyond the frame */}
          {[-1, 0, 1].flatMap((i) => [-1, 0, 1].map((j) => (
            <g key={`${i}${j}`} transform={`translate(${i * 30} ${j * 30})`}>
              <rect x="-10" y="-10" width="20" height="20" stroke={(i + j) % 2 ? "var(--accent-2)" : "var(--accent)"} {...common} />
              <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" stroke={(i + j) % 2 ? "var(--accent-2)" : "var(--accent)"} {...common} />
              <circle r="1.4" fill="var(--gold)" stroke="none" />
            </g>
          )))}
        </g>
      )}
      {kind === "arabesque" && (
        <g strokeLinecap="round">
          {/* vegetal scroll (tawrīq): a stem with mirrored spiralling tendrils and leaves — growth and stewardship */}
          <path d="M0 44 C-3 24 -3 4 0 -30" stroke="var(--accent-2)" {...common} strokeWidth={1.5} />
          {[1, -1].map((m) => (
            <g key={m} transform={`scale(${m} 1)`}>
              <path d="M-1 24 C-22 24 -34 10 -28 -4 C-24 -14 -12 -10 -14 -3 C-15 2 -21 1 -20 -3" stroke="var(--accent)" {...common} strokeWidth={1.2} />
              <path d="M-1 2 C-16 2 -24 -12 -18 -22 C-14 -28 -6 -25 -8 -20" stroke="var(--gold)" {...common} strokeWidth={1.2} />
              <path d="M-26 6 C-34 2 -38 8 -33 13 C-30 10 -28 8 -26 6Z" stroke="var(--accent-2)" {...common} />
              <path d="M-14 -20 C-22 -26 -24 -18 -18 -16" stroke="var(--accent-2)" {...common} />
            </g>
          ))}
          <path d="M0 -30 C-6 -36 -4 -44 0 -46 C4 -44 6 -36 0 -30Z" stroke="var(--accent)" {...common} strokeWidth={1.2} />
        </g>
      )}
      {kind === "kufic" && (
        <g fill="none" strokeLinecap="square">
          <path d="M44-44h-88v62" stroke="var(--accent)" strokeWidth={5} />
          <path d="M42 8v36h-60" stroke="var(--accent)" strokeWidth={5} />
          <g fill="var(--foreground)">
            <rect x="-30" y="-30" width="60" height="8" /><rect x="-30" y="-30" width="8" height="34" />
            <rect x="-10" y="-8" width="40" height="8" /><rect x="22" y="-8" width="8" height="34" />
            <rect x="-30" y="14" width="40" height="8" />
          </g>
        </g>
      )}
    </svg>
  );
}
