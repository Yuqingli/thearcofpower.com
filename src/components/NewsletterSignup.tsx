export function NewsletterSignup() {
  return (
    <div className="rounded-xl border border-gold-500/20 bg-gradient-to-br from-dark-800 to-dark-900 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">
          Newsletter
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-white mb-2">
        Get the Analysis, Delivered
      </h3>
      <p className="text-sm text-gray-400 mb-5">
        In-depth geopolitical analysis — power dynamics, defense strategy, and economic statecraft — three times a week. No noise.
      </p>
      <a
        href="https://arcofpower.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold text-sm transition-colors no-underline"
      >
        Subscribe on Substack
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
