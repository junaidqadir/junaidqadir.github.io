/**
 * The Ihsan word in square kufic, as a vector, traced from the author's course icon.
 * Used large and very faint at one edge of every page. Colours follow the theme.
 */
const INK = [[234, 33, 516, 12], [720, 45, 31, 28], [282, 73, 469, 23], [457, 141, 69, 13], [679, 139, 294, 22], [678, 161, 26, 29], [677, 190, 258, 15], [898, 207, 39, 11], [9, 0, 17, 240], [568, 140, 18, 101], [615, 139, 22, 103], [901, 218, 36, 25], [455, 154, 22, 91], [121, 34, 37, 212], [280, 103, 25, 143], [343, 146, 33, 100], [405, 146, 11, 100], [506, 154, 22, 92], [54, 0, 28, 250], [280, 247, 96, 32], [405, 247, 72, 34], [506, 246, 80, 36], [615, 246, 322, 36], [54, 251, 104, 35], [964, 161, 9, 144], [232, 45, 20, 262], [1014, 28, 16, 285], [1058, 28, 26, 285], [6, 240, 20, 75]];
const ACCENT = [[252, 45, 468, 28], [703, 162, 262, 28], [252, 73, 30, 206], [376, 146, 29, 134], [477, 154, 29, 128], [586, 137, 30, 145], [26, 0, 28, 286], [157, 27, 30, 259], [935, 190, 30, 96], [252, 286, 713, 19], [26, 286, 161, 25], [1030, 28, 28, 284], [900, 32, 73, 58], [791, 29, 70, 62]];

export default function IhsanBackdrop() {
  return (
    <div aria-hidden="true" className="ihsan-backdrop pointer-events-none fixed -bottom-[2vh] -right-[7vw] -z-10 hidden w-[min(64vw,980px)] md:block">
      <svg viewBox="0 0 1096 345" className="h-auto w-full" shapeRendering="geometricPrecision">
        <g fill="var(--foreground)">{INK.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
        <g fill="var(--accent)">{ACCENT.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
      </svg>
    </div>
  );
}
