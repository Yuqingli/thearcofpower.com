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
    <figure className="my-8">
      {title ? (
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {title}
        </p>
      ) : null}
      <div
        className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
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
        <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {caption}{" "}
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Polymarket →
          </a>
        </figcaption>
      ) : (
        <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Polymarket →
          </a>
        </figcaption>
      )}
    </figure>
  );
}
