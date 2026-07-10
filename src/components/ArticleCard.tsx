import Link from "next/link";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

/**
 * Doc card — a compact case-file reference. `fileNo` is optional and, when
 * provided, is computed at build time from the date-sorted post index.
 */
export function ArticleCard({
  post,
  fileNo,
}: {
  post: PostMeta;
  fileNo?: string;
}) {
  const category = CATEGORIES[post.category];

  return (
    <article className="group border border-edge-dim bg-paper-doc transition-colors hover:border-gold-500/40">
      <Link href={`/blog/${post.slug}`} className="block p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          {fileNo && (
            <span className="text-gold-500 tracking-[0.22em]">FILE {fileNo}</span>
          )}
          <span
            className={`inline-block h-1.5 w-1.5 ${category.color}`}
            aria-hidden="true"
          />
          <span className="text-ink-faint">{category.name}</span>
          <span className="text-ink-dim" aria-hidden="true">
            ·
          </span>
          <span className="text-ink-dim">{post.readingTime}</span>
        </div>
        <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-gold-400 line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {post.description}
        </p>
        <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
          {formatDate(post.date)}
        </div>
      </Link>
    </article>
  );
}
