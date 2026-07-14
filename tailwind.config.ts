import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#f59e0b",
          500: "#d4a017",
          600: "#b8860b",
          700: "#92700c",
          800: "#6b5210",
          900: "#4a3810",
          dim: "#8d7b3a",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#1e293b",
          800: "#111827",
          900: "#0a0a0a",
          950: "#050505",
        },
        // Semantic tokens — values come from CSS variables so they
        // respond to the .dark class on <html>.
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          raised: "rgb(var(--paper-raised) / <alpha-value>)",
          doc: "rgb(var(--paper-doc) / <alpha-value>)",
          file: "rgb(var(--paper-file) / <alpha-value>)",
          deep: "rgb(var(--paper-deep) / <alpha-value>)",
        },
        edge: {
          DEFAULT: "rgb(var(--edge) / <alpha-value>)",
          dim: "rgb(var(--edge-dim) / <alpha-value>)",
          faint: "rgb(var(--edge-faint) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          bright: "rgb(var(--ink-bright) / <alpha-value>)",
          body: "rgb(var(--ink-body) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
          dim: "rgb(var(--ink-dim) / <alpha-value>)",
          quote: "rgb(var(--ink-quote) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["ui-monospace", '"SF Mono"', "Menlo", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-headings": "rgb(var(--ink-bright))",
            "--tw-prose-body": "rgb(var(--ink-body))",
            "--tw-prose-bold": "rgb(var(--ink))",
            "--tw-prose-links": "#d4a017",
            "--tw-prose-counters": "rgb(var(--ink-faint))",
            "--tw-prose-bullets": "rgb(var(--ink-faint))",
            "--tw-prose-quotes": "rgb(var(--ink-quote))",
            "--tw-prose-quote-borders": "#d4a017",
            "--tw-prose-code": "rgb(var(--ink))",
            "--tw-prose-hr": "rgb(var(--edge-dim))",
            "--tw-prose-th-borders": "rgb(var(--edge))",
            "--tw-prose-td-borders": "rgb(var(--edge-dim))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
