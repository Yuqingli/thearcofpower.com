import Link from "next/link";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

/**
 * A single row in the docket/ledger. `fileNo` is computed at build time
 * from the date-sorted post index (newest = highest) — never stored in
 * content frontmatter.
 */
export function DocketRow({ post, fileNo }: { post: PostMeta; fileNo: string }) {
  const category = CATEGORIES[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[76px_1fr] sm:grid-cols-[76px_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-edge-faint px-2 py-4 transition-colors hover:bg-paper-file"
    >
      <span className="font-mono text-[10px] tracking-[0.22em] text-gold-500">
        FILE {fileNo}
      </span>
      <div className="min-w-0">
        <h3 className="font-serif text-base md:text-lg leading-snug text-ink transition-colors group-hover:text-gold-400">
          {post.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
          <span
            className={`inline-block h-1.5 w-1.5 ${category.color}`}
            aria-hidden="true"
          />
          <span>{category.name}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </p>
      </div>
      <span
        className="hidden sm:block font-mono text-xs text-ink-dim transition-colors group-hover:text-gold-500"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}
