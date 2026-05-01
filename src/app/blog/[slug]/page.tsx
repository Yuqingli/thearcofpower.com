import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { CATEGORIES, AUTHORS, SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { ArticleCard } from "@/components/ArticleCard";
import { Callout } from "@/components/Callout";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButtons } from "@/components/ShareButtons";

const mdxComponents = {
  Callout,
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  // Resolve OG image: per-post hero image first, fall back to site default PNG.
  // SVG defaults are not honored by most social platforms (X, LinkedIn, FB), so
  // we always emit a 1200x630 PNG with explicit dimensions and alt text.
  const ogImageUrl = post.image
    ? `${SITE_URL}${post.image}`
    : `${SITE_URL}/og-default.png`;
  const ogImageAlt = post.image
    ? post.title
    : "The Arc of Power — Geopolitics. Power. Consequence.";
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: [
        AUTHORS[post.author as keyof typeof AUTHORS]?.name ||
          "The Arc of Power",
      ],
      url: `${SITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@thearcofpower",
      site: "@thearcofpower",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const category = CATEGORIES[post.category];
  const author =
    AUTHORS[post.author as keyof typeof AUTHORS] || AUTHORS["arc-editorial"];
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const wordCount = post.content
    .replace(/[#*\[\]()>`_~\-|]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const categoryLabel =
    CATEGORIES[post.category as keyof typeof CATEGORIES]?.name ||
    post.category;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    wordCount,
    articleSection: categoryLabel,
    keywords: [categoryLabel, "geopolitics", "analysis"].join(", "),
    author: {
      "@type": "Organization",
      name: author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "The Arc of Power",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}${post.image}`,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-gold-400 transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/blog"
            className="hover:text-gold-400 transition-colors"
          >
            Analysis
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${category.color}`}
            >
              {category.name}
            </span>
            <span className="text-sm text-gray-500">
              {post.readingTime}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold text-sm font-serif">
              AP
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">{author.name}</p>
              <p className="text-xs text-gray-500">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                {post.dateModified && post.dateModified !== post.date && (
                  <>
                    {" · "}
                    <span className="text-gold-400">
                      Updated{" "}
                      <time dateTime={post.dateModified}>
                        {formatDate(post.dateModified)}
                      </time>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Share Buttons */}
        <div className="mb-8 pb-8 border-b border-dark-700/50">
          <ShareButtons url={canonicalUrl} title={post.title} />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-a:text-gold-400 hover:prose-a:text-gold-300 prose-blockquote:border-gold-500 prose-strong:text-gray-100">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 rounded-xl bg-dark-800 border border-dark-700/50">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold flex-shrink-0 font-serif">
              AP
            </div>
            <div>
              <h3 className="font-serif font-bold text-white">About {author.name}</h3>
              <p className="mt-1 text-sm text-gray-400">
                {author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Related Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <ArticleCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
