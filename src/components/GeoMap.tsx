import React from "react";

interface MapPin {
  id: string;
  label: string;
  x: number;
  y: number;
  detail?: string;
  variant?: "primary" | "secondary" | "warning";
}

interface GeoMapProps {
  region: "middle-east" | "europe" | "asia-pacific" | "world";
  pins: MapPin[];
  caption?: string;
}

const REGION_BACKGROUND: Record<GeoMapProps["region"], string> = {
  "middle-east": "from-amber-950/40 via-stone-900/40 to-slate-950/60",
  europe: "from-slate-900/50 via-slate-800/40 to-slate-950/60",
  "asia-pacific": "from-emerald-950/40 via-slate-900/40 to-slate-950/60",
  world: "from-slate-900/60 via-slate-800/40 to-slate-950/70",
};

const VARIANT_STYLES: Record<NonNullable<MapPin["variant"]>, string> = {
  primary: "bg-gold-500 border-gold-300 text-slate-900",
  secondary: "bg-sky-500 border-sky-300 text-white",
  warning: "bg-red-500 border-red-300 text-white",
};

export function GeoMap({ region, pins, caption }: GeoMapProps) {
  return (
    <figure className="my-8 border border-edge-dim bg-paper-doc p-2">
      <div
        className={`relative w-full aspect-video border border-edge-faint bg-gradient-to-br ${REGION_BACKGROUND[region]}`}
        role="img"
        aria-label={caption ?? `Geopolitical map of ${region}`}
      >
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs font-bold shadow-lg ${
                VARIANT_STYLES[pin.variant ?? "primary"]
              }`}
            >
              •
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] uppercase tracking-wider text-slate-100 whitespace-nowrap">
              {pin.label}
            </span>
            {pin.detail && (
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-6 hidden group-hover:block w-48 p-2 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 z-10">
                {pin.detail}
              </span>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          Fig. — {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const HORMUZ_UAE_PINS: MapPin[] = [
  {
    id: "hormuz",
    label: "Strait of Hormuz",
    x: 62,
    y: 48,
    variant: "warning",
    detail: "20% of global oil transits here. Iran-blockaded; Project Freedom convoy active May 2026.",
  },
  {
    id: "fujairah",
    label: "Fujairah Port",
    x: 70,
    y: 55,
    variant: "primary",
    detail: "Habshan-Fujairah pipeline terminus on the Gulf of Oman — bypasses Hormuz, ~1.5 mbpd capacity.",
  },
  {
    id: "habshan",
    label: "Habshan",
    x: 60,
    y: 62,
    variant: "primary",
    detail: "Inland UAE oil-field cluster, source for the ADCOP pipeline.",
  },
  {
    id: "ras-tanura",
    label: "Ras Tanura (KSA)",
    x: 50,
    y: 60,
    variant: "secondary",
    detail: "Saudi Aramco main export terminal — Hormuz-dependent.",
  },
  {
    id: "bandar-abbas",
    label: "Bandar Abbas (Iran)",
    x: 64,
    y: 38,
    variant: "warning",
    detail: "Iranian naval HQ controlling the strait's northern shore.",
  },
];
