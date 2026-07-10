"use client";

interface PolymarketEmbedProps {
  /**
   * Polymarket event slug, taken from the URL after /event/.
   * For "https://polymarket.com/event/ai-data-center-moratorium-passed-before-2027",
   * pass slug="ai-data-center-moratorium-passed-before-2027".
   */
  slug: string;
  /** Optional title to render above the embed if Polymarket's iframe is unavailable. */
  title?: string;
  /** Optional caption shown beneath the widget. */
  caption?: string;
  /** Height of the iframe in px. Default 480. */
  height?: number;
}

/**
 * Renders a live Polymarket market widget by event slug. Falls back to a
 * link card when iframes are blocked. Used inline in MDX as
 * <PolymarketEmbed slug="ai-data-center-moratorium-passed-before-2027" />.
 */
export function PolymarketEmbed({
  slug,
  title,
  caption,
  height = 480,
}: PolymarketEmbedProps) {
  const eventUrl = `https://polymarket.com/event/${slug}`;
  const embedUrl = `https://embed.polymarket.com/event.html?id=${encodeURIComponent(slug)}&theme=dark`;

  return (
    <figure className="my-8 border border-edge-dim bg-paper-doc p-2">
      {title ? (
        <p className="mb-2 px-2 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-500">
          {title}
        </p>
      ) : null}
      <div
        className="overflow-hidden border border-edge-faint bg-paper-deep"
        style={{ height }}
      >
        <iframe
          src={embedUrl}
          title={title || `Polymarket — ${slug}`}
          loading="lazy"
          className="w-full h-full"
          allow="clipboard-write"
        />
      </div>
      {caption ? (
        <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          {caption}{" "}
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gold-500 transition-colors"
          >
            View on Polymarket →
          </a>
        </figcaption>
      ) : (
        <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gold-500 transition-colors"
          >
            View on Polymarket →
          </a>
        </figcaption>
      )}
    </figure>
  );
}
