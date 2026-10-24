import type { CvBlock } from "@/lib/cv";

type Props = {
  blocks: CvBlock[];
  /** Optional transform for the HTML of each item (e.g. the humble awards filter). */
  transform?: (html: string) => string;
  depth?: number;
};

/** Renders the generic itemize tree parsed from the CV. HTML comes from our own CV only. */
export default function CvBlocks({ blocks, transform, depth = 0 }: Props) {
  return (
    <>
      {blocks.map((b, bi) => (
        <div key={bi} className={depth > 0 ? "mt-3" : "mt-4"}>
          {b.heading && (
            <p
              className="text-sm font-medium text-foreground"
              dangerouslySetInnerHTML={{ __html: b.heading }}
            />
          )}
          {b.items.length > 0 && (
            <ul className={`mt-2 space-y-2.5 ${depth > 0 ? "ml-4 border-l border-border pl-4" : ""}`}>
              {b.items.map((it, ii) => (
                <li key={ii} className="text-[15px] leading-relaxed text-muted">
                  {it.n != null && (
                    <span className="mr-2 text-xs tabular-nums text-muted/70">{it.n}.</span>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: transform ? transform(it.html) : it.html }} />
                  {it.children && <CvBlocks blocks={it.children} transform={transform} depth={depth + 1} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}
