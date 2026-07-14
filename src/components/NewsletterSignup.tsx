export function NewsletterSignup() {
  return (
    <div className="border border-edge bg-paper-doc p-6 md:p-8">
      <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-500">
        Briefing Access
      </p>
      <h3 className="mb-2 font-serif text-xl font-bold text-ink-bright">
        Request Briefing Access
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-ink-muted">
        In-depth geopolitical analysis — power dynamics, defense strategy, and economic statecraft — three times a week. No noise.
      </p>
      <a
        href="https://arcofpower.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 bg-gold-500 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-dark-950 no-underline transition-colors hover:bg-gold-400"
      >
        Request briefing access
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
