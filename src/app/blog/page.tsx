import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogSearch } from "@/components/BlogSearch";

export const metadata: Metadata = {
  title: "Analysis",
  description:
    "In-depth analysis of geopolitics, defense strategy, economic statecraft, diplomacy, and intelligence operations.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 border-b border-edge-faint pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-500">
          The Docket · {String(posts.length).padStart(3, "0")} Files
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-bright">Analysis</h1>
        <p className="mt-3 max-w-2xl text-ink-faint">
          In-depth coverage of geopolitics, defense, economic statecraft,
          diplomacy, and intelligence.
        </p>
      </div>
      <BlogSearch posts={posts} />
    </div>
  );
}
