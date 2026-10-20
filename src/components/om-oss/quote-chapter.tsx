import type { AboutChapter } from "@/lib/content/about";

interface QuoteChapterProps {
  chapter: AboutChapter;
  index: number;
  /** Quote card on the right instead of the left, so the chapters zigzag down the page. */
  flip?: boolean;
  /** What backs the explanation up: steps, a screenshot or the agreement card. */
  children?: React.ReactNode;
}

/**
 * One chapter of «Det de sier»: a client's sentence on a tile in their own colours, and beside it what that
 * sentence means for a new customer.
 */
export function QuoteChapter({ chapter, index, flip, children }: QuoteChapterProps) {
  return (
    <article className={`om-ch${flip ? " flip" : ""}`} aria-labelledby={`om-ch-${chapter.client}`}>
      <figure className={`om-q om-q-${chapter.client}${chapter.quote.length > 90 ? " long" : ""}`}>
        <p className="om-q-n">
          {String(index + 1).padStart(2, "0")} — {chapter.theme}
        </p>
        <blockquote>«{chapter.quote}»</blockquote>
        <figcaption>{chapter.name}</figcaption>
      </figure>
      <div className="om-a">
        <h3 id={`om-ch-${chapter.client}`}>{chapter.title}</h3>
        <p>{chapter.text}</p>
        {children}
      </div>
    </article>
  );
}
