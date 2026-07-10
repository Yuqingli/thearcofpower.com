import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly welcome AI crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      // Block unwanted crawlers
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
