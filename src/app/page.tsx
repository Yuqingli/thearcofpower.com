import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES } from "@/lib/constants";
import { ArticleCard } from "@/components/ArticleCard";
import { DocketRow } from "@/components/DocketRow";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const FOCUS_AREAS: { slug: keyof typeof CATEGORIES; desc: string }[] = [
  { slug: "geopolitics", desc: "Great power competition, alliances, and the shifting global order" },
  { slug: "defense", desc: "Military strategy, force posture, and the technology of warfare" },
  { slug: "economics", desc: "Sanctions, trade wars, resource competition, and economic statecraft" },
  { slug: "diplomacy", desc: "Treaties, negotiations, institutions, and the art of statecraft" },
  { slug: "intelligence", desc: "Espionage, covert operations, and the information battlespace" },
];

/**
 * Homepage hero headline with the site's single redaction bar. The bar is
 * purely decorative (aria-hidden) — the full title text remains in the DOM.
 * This motif appears here and nowhere else.
 */
function RedactedTitle({ title }: { title: string }) {
  const words = title.split(" ");
  // Insert the bar between words so it reads as one redacted term —
  // mid-title for long headlines, before the last word for short ones.
  const idx =
    words.length < 4
      ? Math.max(1, words.length - 1)
      : Math.max(1, Math.floor(words.length * 0.55));
  return (
    <>
      {words.slice(0, idx).join(" ")}{" "}
      <span className="redaction-bar" aria-hidden="true" />{" "}
      {words.slice(idx).join(" ")}
    </>
  );
}

export default function HomePage() {
  const posts = getAllPosts();
  const total = posts.length;
  const fileNo = (index: number) => String(total - index).padStart(3, "0");

  const hero = posts[0];
  const docs = posts.slice(1, 4);
  const docket = posts.slice(4, 12);

  const heroCode = hero
    ? `${hero.slug.split("-")[0].toUpperCase()}-${hero.date.slice(0, 4)}`
    : "ARC-0000";

  return (
    <>
      {/* Hero — case file for the latest post */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {hero ? (
          <div className="case-file relative p-6 pt-14 sm:p-8 sm:pt-14 md:p-12 md:pt-12">
            <div className="intel-stamp" aria-hidden="true">
              Arc // Intel
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Case file · {heroCode} · Source confidence: High
            </p>
            <h1 className="mt-4 max-w-[24ch] font-serif text-3xl leading-[1.15] text-ink-bright md:text-5xl">
              <Link href={`/blog/${hero.slug}`} className="transition-colors hover:text-gold-400">
                <RedactedTitle title={hero.title} />
              </Link>
            </h1>
            <p className="mt-5 max-w-[56ch] font-serif text-base leading-relaxed text-ink-body md:text-lg">
              {hero.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/blog/${hero.slug}`}
                className="inline-flex items-center justify-center bg-gold-500 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-dark-950 transition-colors hover:bg-gold-400"
              >
                Open case file →
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-edge px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-gold-500/50 hover:text-gold-500"
              >
                View full docket
              </Link>
            </div>

            {/* Adjacent files */}
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {docs.map((post, i) => (
                <ArticleCard key={post.slug} post={post} fileNo={fileNo(i + 1)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="case-file p-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              No case files on record yet.
            </p>
          </div>
        )}
      </section>

      {/* Areas of Focus — the desks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="mb-8 flex items-baseline justify-between border-b border-edge-faint pb-4">
          <h2 className="font-serif text-2xl text-ink-bright md:text-3xl">
            Areas of Focus
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            05 Desks
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {FOCUS_AREAS.map((area, i) => {
            const category = CATEGORIES[area.slug];
            return (
              <div
                key={area.slug}
                className="border border-edge-dim bg-paper-doc p-5 transition-colors hover:border-gold-500/40"
              >
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim">
                  <span
                    className={`inline-block h-1.5 w-1.5 ${category.color}`}
                    aria-hidden="true"
                  />
                  Desk {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-lg font-bold text-gold-500">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Docket */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="mb-2 flex items-baseline justify-between border-b border-edge-faint pb-4">
          <h2 className="font-serif text-2xl text-ink-bright md:text-3xl">
            The Docket
          </h2>
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-gold-500"
          >
            Full docket →
          </Link>
        </div>
        {docket.length > 0 ? (
          <div>
            {docket.map((post, i) => (
              <DocketRow key={post.slug} post={post} fileNo={fileNo(i + 4)} />
            ))}
          </div>
        ) : (
          <div className="border border-edge-dim bg-paper-doc py-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              Docket entries coming soon.
            </p>
          </div>
        )}
      </section>

      {/* Briefing access */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
