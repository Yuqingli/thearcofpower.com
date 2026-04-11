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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-white">Analysis</h1>
        <p className="mt-3 text-gray-500 max-w-2xl">
          In-depth coverage of geopolitics, defense, economic statecraft,
          diplomacy, and intelligence.
        </p>
      </div>
      <BlogSearch posts={posts} />
    </div>
  );
}
