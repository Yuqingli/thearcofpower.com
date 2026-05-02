"use client";

import { useEffect, useMemo, useState } from "react";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES, CategorySlug } from "@/lib/constants";
import { ArticleCard } from "./ArticleCard";

const PAGE_SIZE = 12;

export function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    "all"
  );
  const [page, setPage] = useState(1);

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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
            placeholder="Search analysis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-dark-700 bg-dark-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-gold-500 text-dark-900"
              : "bg-dark-800 text-gray-400 hover:bg-dark-700 border border-dark-700"
          }`}
        >
          All
        </button>
        {Object.entries(CATEGORIES).map(([slug, cat]) => (
          <button
            key={slug}
            onClick={() => setActiveCategory(slug as CategorySlug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === slug
                ? "bg-gold-500 text-dark-900"
                : "bg-dark-800 text-gray-400 hover:bg-dark-700 border border-dark-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagedPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-between border-t border-dark-700 pt-6"
              aria-label="Pagination"
            >
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="text-white font-medium">
                  {(safePage - 1) * PAGE_SIZE + 1}
                </span>
                {"–"}
                <span className="text-white font-medium">
                  {Math.min(safePage * PAGE_SIZE, filteredPosts.length)}
                </span>{" "}
                of{" "}
                <span className="text-white font-medium">
                  {filteredPosts.length}
                </span>{" "}
                articles
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-3 py-1.5 rounded-md text-sm font-medium border border-dark-700 bg-dark-800 text-gray-300 hover:bg-dark-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-400 px-2">
                  Page{" "}
                  <span className="text-white font-medium">{safePage}</span> of{" "}
                  <span className="text-white font-medium">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-3 py-1.5 rounded-md text-sm font-medium border border-dark-700 bg-dark-800 text-gray-300 hover:bg-dark-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No articles found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
