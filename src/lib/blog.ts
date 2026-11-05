import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { CategorySlug } from "./constants";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  category: CategorySlug;
  author: string;
  image?: string;
  featured?: boolean;
  readingTime: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        dateModified: data.dateModified || undefined,
        category: data.category as CategorySlug,
        author: data.author || "arc-editorial",
        image: data.image,
        featured: data.featured || false,
        readingTime: stats.text,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    dateModified: data.dateModified || undefined,
    category: data.category as CategorySlug,
    author: data.author || "arc-editorial",
    image: data.image,
    featured: data.featured || false,
    readingTime: stats.text,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

export function getRelatedPosts(
  currentSlug: string,
  category: CategorySlug,
  limit = 3
): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.category === category)
    .slice(0, limit);
}

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** Normalize a tag string to a URL-safe slug. */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Return all unique tags used across every post, sorted alphabetically. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

/** Return posts that carry a given tag (case-insensitive match). */
export function getPostsByTag(tag: string): PostMeta[] {
  const lower = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === lower)
  );
}

/** Look up the original-case tag name from a slug. Returns undefined if no match. */
export function tagFromSlug(slug: string): string | undefined {
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      if (tagToSlug(tag) === slug) return tag;
    }
  }
  return undefined;
}
