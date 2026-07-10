import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { CATEGORIES, AUTHORS, SITE_URL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Callout } from "@/components/Callout";
import { DocketRow } from "@/components/DocketRow";
import { GeoMap, HORMUZ_UAE_PINS } from "@/components/GeoMap";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PolymarketEmbed } from "@/components/PolymarketEmbed";
import { ShareButtons } from "@/components/ShareButtons";

// Wrap GeoMap so it can be invoked from MDX without needing to import the
// HORMUZ_UAE_PINS preset. MDX consumers use <HormuzMap caption="..." /> and
// the preset is bound here instead of being injected as a separate scope value
// (next-mdx-remote/rsc's `components` map only accepts component values).
const HormuzMap = ({ caption }: { caption?: string }) => (
  <GeoMap region="middle-east" pins={HORMUZ_UAE_PINS} caption={caption} />
);

const mdxComponents = {
  Callout,
  GeoMap,
  HormuzMap,
  PolymarketEmbed,
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

  // FILE numbers for related files — computed at build from the full
  // date-sorted index (newest = highest), never stored in content.
  const allPosts = getAllPosts();
  const fileNumbers = new Map(
    allPosts.map((p, i) => [
      p.slug,
      String(allPosts.length - i).padStart(3, "0"),
    ])
  );

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
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
          <Link href="/" className="hover:text-gold-500 transition-colors">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link href="/blog" className="hover:text-gold-500 transition-colors">
            Analysis
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="normal-case tracking-normal text-ink-faint">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold-500">
            Case file · {category.name} · {post.readingTime}
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl font-semibold leading-tight text-ink-bright">
            {post.title}
          </h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-muted">
            {post.description}
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {author.name} ·{" "}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.dateModified && post.dateModified !== post.date && (
              <>
                {" · "}
                <span className="text-gold-500">
                  Updated{" "}
                  <time dateTime={post.dateModified}>
                    {formatDate(post.dateModified)}
                  </time>
                </span>
              </>
            )}
          </p>
        </header>

        {/* Share Buttons */}
        <div className="mb-8 pb-8 border-b border-edge-faint">
          <ShareButtons url={canonicalUrl} title={post.title} />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none font-serif prose-a:text-gold-500 hover:prose-a:text-gold-400 prose-blockquote:border-gold-500">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Author Bio */}
        <div className="mt-12 border border-edge-dim bg-paper-doc p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-500">
            The Desk
          </p>
          <h3 className="mt-2 font-serif font-bold text-ink-bright">
            About {author.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {author.bio}
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-baseline justify-between border-b border-edge-faint pb-3">
              <h2 className="font-serif text-2xl text-ink-bright">
                Related Files
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                {category.name}
              </span>
            </div>
            <div>
              {relatedPosts.map((rp) => (
                <DocketRow
                  key={rp.slug}
                  post={rp}
                  fileNo={fileNumbers.get(rp.slug) ?? "000"}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
