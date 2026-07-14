"use client";

import { useEffect, useMemo, useState } from "react";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES, CategorySlug } from "@/lib/constants";
import { DocketRow } from "./DocketRow";

const PAGE_SIZE = 12;

export function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    "all"
  );
  const [page, setPage] = useState(1);

  // FILE numbers derive from the full date-sorted index (newest = highest),
  // independent of the active filter — a file keeps its number forever.
  const fileNumbers = useMemo(
    () =>
      new Map(
        posts.map((post, i) => [
          post.slug,
          String(posts.length - i).padStart(3, "0"),
        ])
      ),
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesSearch =
          search === "" ||
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          activeCategory === "all" || post.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    [posts, search, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedPosts = filteredPosts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search, activeCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-dim"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="SEARCH THE DOCKET…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-edge-dim bg-paper-doc py-2.5 pl-10 pr-4 font-mono text-xs uppercase tracking-[0.14em] text-ink placeholder:text-ink-dim focus:border-gold-500/60 focus:outline-none focus:ring-1 focus:ring-gold-500/60"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
            activeCategory === "all"
              ? "border-gold-500 bg-gold-500 text-dark-950"
              : "border-edge-dim bg-paper-doc text-ink-muted hover:border-gold-500/40 hover:text-gold-500"
          }`}
        >
          All
        </button>
        {Object.entries(CATEGORIES).map(([slug, cat]) => (
          <button
            key={slug}
            onClick={() => setActiveCategory(slug as CategorySlug)}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              activeCategory === slug
                ? "border-gold-500 bg-gold-500 text-dark-950"
                : "border-edge-dim bg-paper-doc text-ink-muted hover:border-gold-500/40 hover:text-gold-500"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className="border-t border-edge-faint">
            {pagedPosts.map((post) => (
              <DocketRow
                key={post.slug}
                post={post}
                fileNo={fileNumbers.get(post.slug) ?? "000"}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-between border-t border-edge-faint pt-6"
              aria-label="Pagination"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                Showing{" "}
                <span className="text-ink">
                  {(safePage - 1) * PAGE_SIZE + 1}
                </span>
                {"–"}
                <span className="text-ink">
                  {Math.min(safePage * PAGE_SIZE, filteredPosts.length)}
                </span>{" "}
                of <span className="text-ink">{filteredPosts.length}</span>{" "}
                files
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="border border-edge-dim bg-paper-doc px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:border-gold-500/40 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span className="px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  Page <span className="text-ink">{safePage}</span> of{" "}
                  <span className="text-ink">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="border border-edge-dim bg-paper-doc px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:border-gold-500/40 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="border border-edge-dim bg-paper-doc py-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
            No files match this query.
          </p>
        </div>
      )}
    </div>
  );
}
