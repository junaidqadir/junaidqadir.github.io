import RetryImg from "./RetryImg";
import { asset } from "@/lib/assets";

/**
 * The Ihsan icon (three words in square kufic), cleaned and upscaled from the original course icon.
 * Large sizes use the framed version (cream margin, ink and gold border) so its lines are not cut at the edges;
 * small sizes (nav) use the unframed icon, where a border would eat the letters. Phone-sized files are served via srcSet.
 */
export default function IhsanMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  const framed = size >= 56;
  const small = framed ? "/ihsan-logo-framed-360.png" : "/ihsan-logo-96.png";
  const full = framed ? "/ihsan-logo-framed.png" : "/ihsan-logo.png";
  return (
    <RetryImg
      src={asset(small)}
      srcSet={`${asset(small)} ${framed ? 360 : 96}w, ${asset(full)} ${framed ? 900 : 1136}w`}
      sizes={`${size}px`}
      alt="Ihsan icon"
      width={size}
      height={size}
      priority
      fallback="إحسان"
      className={`${framed ? "" : "rounded-[3px]"} ${className}`}
    />
  );
}
