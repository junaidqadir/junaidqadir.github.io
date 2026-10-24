/**
 * The Ihsan icon (three words in square kufic), cleaned and upscaled from the original course icon.
 * Large sizes use the framed version (cream margin, ink and gold border) so its lines are not cut at the edges;
 * small sizes (nav) use the unframed icon, where a border would eat the letters.
 */
export default function IhsanMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  const framed = size >= 56;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={framed ? "/ihsan-logo-framed.png" : "/ihsan-logo.png"} width={size} height={size} alt="Ihsan icon" className={`${framed ? "" : "rounded-[3px]"} ${className}`} />;
}
