import type { Config } from "tailwindcss";

const config: Config = {
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
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-headings": "#f5f5f5",
            "--tw-prose-body": "#d1d5db",
            "--tw-prose-bold": "#f5f5f5",
            "--tw-prose-links": "#f59e0b",
            "--tw-prose-counters": "#9ca3af",
            "--tw-prose-bullets": "#9ca3af",
            "--tw-prose-quotes": "#d1d5db",
            "--tw-prose-quote-borders": "#d4a017",
            "--tw-prose-code": "#f5f5f5",
            "--tw-prose-hr": "#374151",
            "--tw-prose-th-borders": "#374151",
            "--tw-prose-td-borders": "#1f2937",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
