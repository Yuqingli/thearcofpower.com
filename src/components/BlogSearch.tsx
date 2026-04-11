"use client";

import { useState } from "react";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES, CategorySlug } from "@/lib/constants";
import { ArticleCard } from "./ArticleCard";

export function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    "all"
  );

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
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
