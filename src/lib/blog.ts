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
