/** The word Ihsan (إحسان, with its vowel marks) as real Arabic text in a calligraphic face. Sits in the page flow; not a background. */
export default function IhsanCalligraphy({ className = "text-[8rem] sm:text-[11rem]" }: { className?: string }) {
  return (
    <span lang="ar" dir="rtl" role="img" aria-label="Ihsan (إحسان)" className={`calli select-none ${className}`}>
      إِحْسَان
    </span>
  );
}
