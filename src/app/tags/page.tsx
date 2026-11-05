import { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse all analysis topics on The Arc of Power — geopolitics, defense, AI infrastructure, energy politics, and more.",
};

export default function TagsIndexPage() {
  const tags = getAllTags();
  const tagCounts = tags.map((tag) => ({
    tag,
    slug: tagToSlug(tag),
    count: getPostsByTag(tag).length,
  }));

  // Sort by count descending, then alphabetically
  tagCounts.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 border-b border-edge-faint pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-500">
          Index &middot; {String(tags.length).padStart(3, "0")} Topics
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-bright">Topics</h1>
        <p className="mt-3 max-w-2xl text-ink-faint">
          Browse analysis by topic across geopolitics, defense, economics, and
          intelligence.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tagCounts.map(({ tag, slug, count }) => (
          <Link
            key={slug}
            href={`/tags/${slug}`}
            className="group border border-edge-dim bg-paper-doc px-4 py-2.5 transition-colors hover:border-gold-500/40 hover:bg-paper-file"
          >
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink group-hover:text-gold-400 transition-colors">
              {tag}
            </span>
            <span className="ml-2 font-mono text-[10px] tracking-[0.16em] text-ink-dim">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
