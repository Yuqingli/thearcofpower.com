import { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tagPages = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: `${SITE_URL}`, priority: 1.0 },
    { url: `${SITE_URL}/blog`, priority: 0.9 },
    { url: `${SITE_URL}/tags`, priority: 0.7 },
    { url: `${SITE_URL}/about`, priority: 0.7 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...posts, ...tagPages];
}
