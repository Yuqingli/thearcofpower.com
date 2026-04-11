export const SITE_NAME = "The Arc of Power";
export const SITE_URL = "https://thearcofpower.com";
export const SITE_DESCRIPTION =
  "Geopolitics. Power. Consequence. In-depth analysis of global power dynamics, defense strategy, economic statecraft, and diplomatic maneuvering.";
export const SITE_TAGLINE = "Geopolitics. Power. Consequence.";

export const SOCIAL_LINKS = {
  twitter: "https://x.com/thearcofpower",
  email: "editor@thearcofpower.com",
};

export const CATEGORIES = {
  geopolitics: { name: "Geopolitics", color: "bg-amber-600" },
  defense: { name: "Defense", color: "bg-red-700" },
  economics: { name: "Economics", color: "bg-emerald-600" },
  diplomacy: { name: "Diplomacy", color: "bg-sky-600" },
  intelligence: { name: "Intelligence", color: "bg-violet-600" },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export const AUTHORS = {
  "arc-editorial": {
    name: "The Arc of Power",
    bio: "The Arc of Power editorial desk delivers rigorous analysis of geopolitics, defense, economic statecraft, and intelligence — examining the forces that shape the global order.",
  },
} as const;
