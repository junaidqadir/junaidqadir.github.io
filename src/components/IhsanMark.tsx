/**
 * The Ihsan icon (square-kufic composition), cleaned and upscaled from the original course icon.
 * Source image: public/ihsan-logo.png.
 */
export default function IhsanMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ihsan-logo.png" width={size} height={size} alt="Ihsan icon" className={`rounded-[3px] ${className}`} />;
}
