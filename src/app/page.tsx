import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/ArticleCard";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              Geopolitics Analysis
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              The Arc of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-300">
                Power
              </span>
            </h1>
            <p className="mt-4 font-serif text-xl md:text-2xl text-gold-400/80 italic">
              Geopolitics. Power. Consequence.
            </p>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl">
              In-depth analysis of global power dynamics, defense strategy, economic statecraft, and diplomatic maneuvering. Understanding the forces that shape the world order.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold transition-colors"
              >
                Read Analysis
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-600 hover:border-gold-500/50 text-gray-300 hover:text-gold-400 font-semibold transition-colors"
              >
                About the Publication
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-dark-950 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white">Areas of Focus</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Rigorous analysis across the domains that define global power.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Geopolitics", desc: "Great power competition, alliances, and the shifting global order" },
              { name: "Defense", desc: "Military strategy, force posture, and the technology of warfare" },
              { name: "Economics", desc: "Sanctions, trade wars, resource competition, and economic statecraft" },
              { name: "Diplomacy", desc: "Treaties, negotiations, institutions, and the art of statecraft" },
              { name: "Intelligence", desc: "Espionage, covert operations, and the information battlespace" },
            ].map((area) => (
              <div
                key={area.name}
                className="p-5 rounded-xl border border-dark-700/50 bg-dark-800 hover:border-gold-500/30 transition-all duration-300"
              >
                <h3 className="font-serif font-bold text-gold-400 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white">Latest Analysis</h2>
            <p className="mt-2 text-gray-500">
              Recent dispatches on global power and strategy.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-medium transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dark-700/50 rounded-xl bg-dark-800">
            <p className="text-gray-500">Analysis articles coming soon.</p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-dark-950 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-6">About The Arc of Power</h2>
            <p className="text-lg text-gray-400 mb-4">
              The Arc of Power examines the forces that shape the global order. Our analysis cuts through noise to reveal the structural dynamics of power -- who holds it, how they wield it, and what comes next.
            </p>
            <p className="text-gray-500 mb-8">
              We bring clarity to complexity. From great power competition to regional flashpoints, from economic warfare to intelligence operations, every analysis is grounded in evidence and strategic logic.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Learn more about the publication
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
