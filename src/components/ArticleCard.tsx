import Link from "next/link";
import { PostMeta } from "@/lib/blog";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ post }: { post: PostMeta }) {
  const category = CATEGORIES[post.category];

  return (
    <article className="group bg-dark-800 rounded-xl border border-dark-700/50 overflow-hidden hover:border-gold-500/30 transition-all duration-300">
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${category.color}`}
          >
            {category.name}
          </span>
          <span className="text-xs text-gray-500">
            {post.readingTime}
          </span>
        </div>
        <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-3">
          {post.description}
        </p>
        <div className="mt-4 text-xs text-gray-600">
          {formatDate(post.date)}
        </div>
      </Link>
    </article>
  );
}
