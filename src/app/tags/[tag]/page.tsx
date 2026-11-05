import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllTags,
  getPostsByTag,
  tagToSlug,
  tagFromSlug,
} from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { DocketRow } from "@/components/DocketRow";
import { getAllPosts } from "@/lib/blog";

/** Tag-specific SEO descriptions for key topic silos. */
const TAG_DESCRIPTIONS: Record<string, string> = {
  "AI Infrastructure Politics":
    "Where AI capex meets voter backlash. Tracking data-center bans, grid politics, permitting revolts, and the political cost of the compute buildout.",
};

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tagName = tagFromSlug(tagSlug);
  if (!tagName) return {};

  const description =
    TAG_DESCRIPTIONS[tagName] ||
    `Analysis tagged "${tagName}" on ${SITE_NAME}.`;

  return {
    title: tagName,
    description,
    openGraph: {
      title: `${tagName} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/tags/${tagSlug}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tagName} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/tags/${tagSlug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: tagSlug } = await params;
  const tagName = tagFromSlug(tagSlug);
  if (!tagName) notFound();

  const posts = getPostsByTag(tagName);
  const allPosts = getAllPosts();

  // Build the same FILE numbering as the main blog page (newest = highest)
  const fileNumbers = new Map(
    allPosts.map((post, i) => [
      post.slug,
      String(allPosts.length - i).padStart(3, "0"),
    ])
  );

  const description =
    TAG_DESCRIPTIONS[tagName] ||
    `Analysis tagged "${tagName}" on ${SITE_NAME}.`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 border-b border-edge-faint pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-500">
          Topic Silo &middot; {String(posts.length).padStart(3, "0")} Files
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink-bright">{tagName}</h1>
        <p className="mt-3 max-w-2xl text-ink-faint">{description}</p>
        <Link
          href="/blog"
          className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-gold-500 hover:text-gold-400 transition-colors"
        >
          &larr; All Analysis
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="border-t border-edge-faint">
          {posts.map((post) => (
            <DocketRow
              key={post.slug}
              post={post}
              fileNo={fileNumbers.get(post.slug) ?? "000"}
            />
          ))}
        </div>
      ) : (
        <div className="border border-edge-dim bg-paper-doc py-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
            No files carry this tag.
          </p>
        </div>
      )}
    </div>
  );
}
