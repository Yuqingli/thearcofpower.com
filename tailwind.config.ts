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
        // AP-1 "The Dossier" tokens
        paper: {
          DEFAULT: "#0b0a07", // warm ground
          raised: "#0d0c08", // article / calm-core surface
          doc: "#0f0d08", // doc cards inside a file
          file: "#14110a", // file-card gradient start
          deep: "#100d07", // file-card gradient end
        },
        edge: {
          DEFAULT: "#3a3220", // paper edge (primary)
          dim: "#2e2816", // paper edge (secondary)
          faint: "#2c2618", // hairlines / nav rules
        },
        ink: {
          DEFAULT: "#e8e2d4",
          bright: "#f2ecdc",
          body: "#b9af94",
          muted: "#b3a98e",
          faint: "#8d8367",
          dim: "#7c7358",
          quote: "#e4dcc6",
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
            "--tw-prose-headings": "#f2ecdc",
            "--tw-prose-body": "#b9af94",
            "--tw-prose-bold": "#e8e2d4",
            "--tw-prose-links": "#d4a017",
            "--tw-prose-counters": "#8d8367",
            "--tw-prose-bullets": "#8d8367",
            "--tw-prose-quotes": "#e4dcc6",
            "--tw-prose-quote-borders": "#d4a017",
            "--tw-prose-code": "#e8e2d4",
            "--tw-prose-hr": "#2e2816",
            "--tw-prose-th-borders": "#3a3220",
            "--tw-prose-td-borders": "#2e2816",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
