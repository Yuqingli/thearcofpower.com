import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

const footerLinks = {
  Publication: [
    { href: "/blog", label: "Analysis" },
    { href: "/about", label: "About" },
  ],
  Categories: [
    { href: "/blog", label: "Geopolitics" },
    { href: "/blog", label: "Defense" },
    { href: "/blog", label: "Economics" },
    { href: "/blog", label: "Diplomacy" },
    { href: "/blog", label: "Intelligence" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-serif text-xl font-bold text-white"
            >
              The Arc of Power
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-md">
              In-depth analysis of global power dynamics, defense strategy, economic statecraft, and diplomatic maneuvering. Understanding the forces that shape the world order.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gold-400 transition-colors"
                aria-label="Follow us on X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-gray-500 hover:text-gold-400 transition-colors"
                aria-label="Email us"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
                {heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-dark-700/50">
          <p className="text-xs text-gray-600 text-center">
            &copy; {new Date().getFullYear()} The Arc of Power. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
