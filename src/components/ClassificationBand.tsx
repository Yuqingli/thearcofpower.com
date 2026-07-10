import { getAllPosts } from "@/lib/blog";

/**
 * Gold classification band — sits above the header on every page.
 * BRIEFING № is the post count; DECLASSIFIED is the latest post date.
 * Both are computed at build time from the date-sorted post index.
 */
export function ClassificationBand() {
  const posts = getAllPosts();
  const count = String(posts.length).padStart(3, "0");
  const latestDate = (posts[0]?.date ?? "").slice(0, 10);

  return (
    <div className="flex items-center justify-between gap-4 bg-gold-500 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-[#171204] sm:px-6">
      <span>Briefing № {count}</span>
      <span className="hidden sm:inline">Analysis · Defense · Economics</span>
      <span>Declassified {latestDate}</span>
    </div>
  );
}
