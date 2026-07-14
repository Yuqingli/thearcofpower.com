"use client";

import { useEffect, useState } from "react";

/**
 * Dark / light mode toggle. Persists the user's choice in localStorage
 * and falls back to the OS-level prefers-color-scheme media query.
 *
 * The toggle applies the `.dark` class to <html>, which flips CSS
 * variable values defined in globals.css and activates Tailwind's
 * `dark:` variant utilities.
 *
 * A companion inline script in layout.tsx sets the initial class
 * before first paint to prevent a flash of wrong theme (FOUC).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing, etc.) — degrade silently
    }
  }

  // Render a fixed-size placeholder until client-side mount to avoid
  // hydration mismatch (server doesn't know the theme).
  if (!mounted) {
    return (
      <button
        className="p-2 text-ink-muted"
        aria-label="Toggle theme"
        tabIndex={-1}
      >
        <span className="block w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="p-2 text-ink-muted hover:text-gold-500 transition-colors"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        /* Sun — shown in dark mode; clicking switches to light */
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        /* Moon — shown in light mode; clicking switches to dark */
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
}
