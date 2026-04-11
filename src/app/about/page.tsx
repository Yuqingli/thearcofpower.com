import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Arc of Power delivers rigorous analysis of geopolitics, defense strategy, economic statecraft, and the forces that shape the global order.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-white mb-8">About The Arc of Power</h1>

      <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-a:text-gold-400 hover:prose-a:text-gold-300 prose-blockquote:border-gold-500">
        <p className="text-xl text-gray-300 leading-relaxed">
          The Arc of Power is a geopolitics analysis publication examining the forces that shape the global order. We cut through the noise to reveal the structural dynamics of power -- who holds it, how they wield it, and what comes next.
        </p>

        <h2>Our Mission</h2>
        <p>
          In an era of information overload and surface-level coverage, The Arc of Power provides depth. Our mission is to deliver rigorous, evidence-based analysis of the geopolitical forces reshaping our world -- from great power competition to economic warfare, from intelligence operations to diplomatic maneuvering.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li>
            <strong>Geopolitics</strong> -- Great power competition, alliance structures, and the shifting balance of the international system.
          </li>
          <li>
            <strong>Defense</strong> -- Military strategy, force posture, capability development, and the evolving character of warfare.
          </li>
          <li>
            <strong>Economics</strong> -- Sanctions regimes, trade conflicts, resource competition, and the weaponization of economic interdependence.
          </li>
          <li>
            <strong>Diplomacy</strong> -- Treaty architecture, institutional dynamics, negotiations, and the practice of statecraft.
          </li>
          <li>
            <strong>Intelligence</strong> -- The information battlespace, strategic deception, covert operations, and their impact on policy.
          </li>
        </ul>

        <h2>Our Approach</h2>
        <p>
          Every analysis published on The Arc of Power is grounded in strategic logic and supported by evidence. We do not chase headlines or amplify panic. Instead, we examine the structural conditions that produce events, the incentives that drive state behavior, and the consequences that follow from decisions made in corridors of power.
        </p>
        <p>
          We believe that understanding geopolitics requires looking beyond the immediate to see the arc -- the long trajectory of power as it accumulates, shifts, and disperses across the international system.
        </p>

        <h2>Our Values</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {[
            {
              title: "Rigor",
              desc: "Every claim is grounded in evidence. Every analysis follows strategic logic.",
            },
            {
              title: "Independence",
              desc: "No partisan alignment. No ideological agenda. Only clear-eyed analysis.",
            },
            {
              title: "Depth",
              desc: "We go beyond the headline to examine the structural forces at work.",
            },
            {
              title: "Clarity",
              desc: "Complex dynamics explained in accessible, precise language.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-5 rounded-lg border border-dark-700/50 bg-dark-800"
            >
              <h3 className="font-serif font-bold text-gold-400">
                {value.title}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        <h2>Contact</h2>
        <p>
          For inquiries, tips, or correspondence: <a href="mailto:editor@thearcofpower.com">editor@thearcofpower.com</a>
        </p>

        <div className="not-prose mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold transition-colors"
          >
            Read Our Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
