"use client";

import React, { useCallback, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MapPin {
  id: string;
  label: string;
  /** Percentage position within the map container (0-100). */
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

/* ------------------------------------------------------------------ */
/*  Region → gradient backgrounds (for non-SVG regions)                */
/* ------------------------------------------------------------------ */

const REGION_BACKGROUND: Record<GeoMapProps["region"], string> = {
  "middle-east": "from-amber-950/40 via-stone-900/40 to-slate-950/60",
  europe: "from-slate-900/50 via-slate-800/40 to-slate-950/60",
  "asia-pacific": "from-emerald-950/40 via-slate-900/40 to-slate-950/60",
  world: "from-slate-900/60 via-slate-800/40 to-slate-950/70",
};

/* ------------------------------------------------------------------ */
/*  Pin variant styles                                                 */
/* ------------------------------------------------------------------ */

const VARIANT_STYLES: Record<NonNullable<MapPin["variant"]>, string> = {
  primary: "bg-gold-500 border-gold-300 text-slate-900",
  secondary: "bg-sky-500 border-sky-300 text-white",
  warning: "bg-red-500 border-red-300 text-white",
};

/* ------------------------------------------------------------------ */
/*  Simplified Europe SVG basemap                                      */
/*  Paths are coarsely simplified country outlines positioned inside   */
/*  a 1000x700 viewBox. Only countries referenced in Arc of Power      */
/*  articles are individually addressable; the rest are a single       */
/*  "other" path.                                                      */
/* ------------------------------------------------------------------ */

function EuropeBasemap({ highlightCountry }: { highlightCountry?: string }) {
  const baseStroke = "rgb(var(--edge-dim))";
  const baseFill = "rgb(var(--paper-deep) / 0.6)";
  const highlightFill = "rgb(var(--ink-faint) / 0.35)";
  const accentFill = "#d4a017"; // gold-500

  const fill = (id: string) =>
    id === highlightCountry ? accentFill : highlightFill;

  return (
    <svg
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="1000" height="700" fill={baseFill} />

      {/* Water bodies — subtle blue tint */}
      <ellipse cx="200" cy="350" rx="180" ry="280" fill="rgb(var(--paper-deep) / 0.3)" />
      <ellipse cx="800" cy="250" rx="120" ry="200" fill="rgb(var(--paper-deep) / 0.3)" />

      {/* Portugal */}
      <path
        id="PT"
        d="M200,420 L210,390 L220,360 L215,340 L205,350 L195,380 L190,410 Z"
        fill={fill("PT")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Spain */}
      <path
        id="ES"
        d="M220,360 L280,340 L320,350 L340,370 L330,410 L290,430 L240,440 L200,420 L190,410 L195,380 L205,350 L215,340 Z"
        fill={fill("ES")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* France */}
      <path
        id="FR"
        d="M320,350 L360,310 L400,280 L430,290 L450,310 L460,340 L440,370 L400,390 L360,380 L340,370 Z"
        fill={fill("FR")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* United Kingdom */}
      <path
        id="UK"
        d="M340,220 L360,200 L370,220 L380,250 L370,270 L350,280 L330,260 L325,240 Z"
        fill={fill("UK")}
        stroke={baseStroke}
        strokeWidth="1"
      />
      {/* Scotland part */}
      <path
        d="M340,190 L355,180 L360,200 L340,220 L330,210 Z"
        fill={fill("UK")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Ireland */}
      <path
        id="IE"
        d="M290,230 L310,215 L320,235 L315,260 L300,265 L285,250 Z"
        fill={fill("IE")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Belgium / Netherlands / Luxembourg (Benelux) */}
      <path
        id="BNL"
        d="M420,260 L440,245 L450,255 L455,275 L445,285 L430,290 L420,275 Z"
        fill={fill("BNL")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Germany — the main country for this article */}
      <path
        id="DE"
        d="M450,255 L480,230 L520,225 L540,240 L545,270 L535,300 L510,320 L480,315 L460,340 L450,310 L445,285 L455,275 Z"
        fill={fill("DE")}
        stroke={baseStroke}
        strokeWidth="1.5"
      />

      {/* Denmark */}
      <path
        id="DK"
        d="M470,200 L485,190 L495,205 L490,220 L480,230 L465,215 Z"
        fill={fill("DK")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Norway */}
      <path
        id="NO"
        d="M440,100 L470,80 L500,90 L510,120 L500,160 L485,190 L470,200 L465,170 L455,140 L445,115 Z"
        fill={fill("NO")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Sweden */}
      <path
        id="SE"
        d="M510,120 L530,100 L550,110 L560,150 L555,190 L540,210 L520,225 L510,200 L500,160 Z"
        fill={fill("SE")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Finland */}
      <path
        id="FI"
        d="M580,80 L610,70 L630,90 L635,140 L620,180 L600,190 L580,170 L570,130 L575,100 Z"
        fill={fill("FI")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Poland */}
      <path
        id="PL"
        d="M540,240 L580,230 L610,245 L620,275 L605,300 L570,310 L545,300 L535,300 L545,270 Z"
        fill={fill("PL")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Czech Republic */}
      <path
        id="CZ"
        d="M510,280 L535,270 L545,270 L545,300 L535,300 L520,305 L505,295 Z"
        fill={fill("CZ")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Austria */}
      <path
        id="AT"
        d="M480,315 L510,320 L535,310 L545,320 L530,340 L500,345 L475,335 L460,340 Z"
        fill={fill("AT")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Switzerland */}
      <path
        id="CH"
        d="M430,320 L455,310 L460,340 L445,345 L430,335 Z"
        fill={fill("CH")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Italy */}
      <path
        id="IT"
        d="M460,340 L475,335 L500,345 L510,370 L520,410 L530,450 L520,470 L500,460 L490,430 L470,400 L450,370 L440,370 Z"
        fill={fill("IT")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Baltics (Estonia, Latvia, Lithuania as group) */}
      <path
        id="BALT"
        d="M600,190 L630,185 L640,200 L640,235 L620,250 L600,240 L590,220 Z"
        fill={fill("BALT")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Ukraine */}
      <path
        id="UA"
        d="M620,275 L670,260 L720,270 L740,300 L730,330 L700,340 L660,335 L630,320 L605,300 Z"
        fill={fill("UA")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Romania */}
      <path
        id="RO"
        d="M600,330 L630,320 L660,335 L665,360 L640,375 L610,370 L595,355 Z"
        fill={fill("RO")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Hungary */}
      <path
        id="HU"
        d="M545,320 L580,315 L600,330 L595,355 L570,355 L550,345 L530,340 Z"
        fill={fill("HU")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Balkans (simplified: Serbia, Croatia, Bosnia, etc.) */}
      <path
        id="BALKANS"
        d="M550,345 L570,355 L595,355 L610,370 L620,400 L600,430 L570,440 L545,420 L530,400 L535,370 Z"
        fill={fill("BALKANS")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Greece */}
      <path
        id="GR"
        d="M570,440 L600,430 L620,450 L610,480 L580,490 L560,475 L555,455 Z"
        fill={fill("GR")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Turkey (European part + Anatolia hint) */}
      <path
        id="TR"
        d="M640,400 L680,380 L750,390 L800,400 L820,420 L780,440 L720,445 L670,435 L640,420 Z"
        fill={fill("TR")}
        stroke={baseStroke}
        strokeWidth="1"
      />

      {/* Russia (western portion) */}
      <path
        id="RU"
        d="M640,200 L700,170 L780,150 L850,160 L900,200 L910,280 L880,340 L820,360 L760,340 L740,300 L720,270 L670,260 L640,235 Z"
        fill={fill("RU")}
        stroke={baseStroke}
        strokeWidth="1"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  GeoMap Component                                                   */
/* ------------------------------------------------------------------ */

export function GeoMap({ region, pins, caption }: GeoMapProps) {
  const [activePin, setActivePin] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Close tooltip when tapping outside any pin */
  const handleContainerClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-pin-id]")) {
        setActivePin(null);
      }
    },
    [],
  );

  /* Toggle tooltip on tap (mobile) or show on click */
  const handlePinInteraction = useCallback(
    (pinId: string, e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      /* On touch devices, prevent the subsequent mouse event */
      if (e.type === "touchend") {
        e.preventDefault();
      }
      setActivePin((prev) => (prev === pinId ? null : pinId));
    },
    [],
  );

  const hasBasemap = region === "europe";
  const highlightCountry =
    region === "europe" ? inferHighlightCountry(pins) : undefined;

  return (
    <figure className="my-8 border border-edge-dim bg-paper-doc p-2">
      <div
        ref={containerRef}
        className={`relative w-full aspect-video border border-edge-faint overflow-hidden ${
          hasBasemap ? "" : `bg-gradient-to-br ${REGION_BACKGROUND[region]}`
        }`}
        role="img"
        aria-label={caption ?? `Geopolitical map of ${region}`}
        onClick={handleContainerClick}
        onTouchEnd={handleContainerClick}
      >
        {/* Render SVG basemap for supported regions */}
        {hasBasemap && (
          <EuropeBasemap highlightCountry={highlightCountry} />
        )}

        {/* Pin layer */}
        {pins.map((pin) => {
          const isActive = activePin === pin.id;
          return (
            <div
              key={pin.id}
              data-pin-id={pin.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onClick={(e) => handlePinInteraction(pin.id, e)}
              onTouchEnd={(e) => handlePinInteraction(pin.id, e)}
            >
              {/* Pin dot */}
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs font-bold shadow-lg cursor-pointer transition-transform ${
                  VARIANT_STYLES[pin.variant ?? "primary"]
                } ${isActive ? "scale-125" : "hover:scale-110"}`}
              >
                {"•"}
              </span>

              {/* Label — always visible */}
              <span className="absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] uppercase tracking-wider text-slate-100 whitespace-nowrap pointer-events-none">
                {pin.label}
              </span>

              {/* Detail tooltip — shown on hover (desktop) OR tap (mobile) */}
              {pin.detail && (
                <span
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-6 w-48 p-2 rounded bg-slate-950 border border-slate-700 text-xs text-slate-200 z-20 pointer-events-none ${
                    isActive
                      ? "block"
                      : "hidden group-hover:block"
                  }`}
                >
                  {pin.detail}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {caption && (
        <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          Fig. — {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Infer which country to highlight based on pin metadata. */
function inferHighlightCountry(pins: MapPin[]): string | undefined {
  const idMap: Record<string, string> = {
    berlin: "DE",
    germany: "DE",
    saxony: "DE",
    "saxony-anhalt": "DE",
    magdeburg: "DE",
    bundeswehr: "DE",
    paris: "FR",
    france: "FR",
    london: "UK",
    uk: "UK",
    warsaw: "PL",
    poland: "PL",
    kyiv: "UA",
    ukraine: "UA",
    moscow: "RU",
    russia: "RU",
    rome: "IT",
    italy: "IT",
    ankara: "TR",
    turkey: "TR",
  };

  for (const pin of pins) {
    const key = pin.id.toLowerCase();
    if (idMap[key]) return idMap[key];
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/*  Pin Presets                                                        */
/* ------------------------------------------------------------------ */

export const HORMUZ_UAE_PINS: MapPin[] = [
  {
    id: "hormuz",
    label: "Strait of Hormuz",
    x: 62,
    y: 48,
    variant: "warning",
    detail:
      "20% of global oil transits here. Iran-blockaded; Project Freedom convoy active May 2026.",
  },
  {
    id: "fujairah",
    label: "Fujairah Port",
    x: 70,
    y: 55,
    variant: "primary",
    detail:
      "Habshan-Fujairah pipeline terminus on the Gulf of Oman — bypasses Hormuz, ~1.5 mbpd capacity.",
  },
  {
    id: "habshan",
    label: "Habshan",
    x: 60,
    y: 62,
    variant: "primary",
    detail:
      "Inland UAE oil-field cluster, source for the ADCOP pipeline.",
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
    detail:
      "Iranian naval HQ controlling the strait's northern shore.",
  },
];

export const GERMANY_EUROPE_PINS: MapPin[] = [
  {
    id: "berlin",
    label: "Berlin",
    x: 51,
    y: 35,
    variant: "primary",
    detail:
      "Federal capital. Site of the Bundestag vote that amended the debt brake and created the €500B infrastructure fund.",
  },
  {
    id: "saxony-anhalt",
    label: "Saxony-Anhalt",
    x: 52,
    y: 38,
    variant: "warning",
    detail:
      "AfD won 43.8% here on Sept 6 — strongest far-right result in any German state since 1945. Capital: Magdeburg.",
  },
  {
    id: "germany",
    label: "Germany",
    x: 49,
    y: 42,
    variant: "primary",
    detail:
      "Defense budget rising from €95.1B (2025) to €161.8B (2029). Now Europe’s largest defense spender, overtaking the UK.",
  },
  {
    id: "france",
    label: "France",
    x: 38,
    y: 48,
    variant: "secondary",
    detail:
      "Nuclear cooperation discussions with Germany. Potential host of “forward deterrence” arrangements on German soil.",
  },
  {
    id: "poland",
    label: "Poland",
    x: 58,
    y: 40,
    variant: "secondary",
    detail:
      "Alternative anchor for European defense if Germany’s spending stalls. Already at 4.7% GDP defense spending.",
  },
  {
    id: "uk",
    label: "United Kingdom",
    x: 35,
    y: 36,
    variant: "secondary",
    detail:
      "Part of the nuclear-cooperation triangle with France and Germany. Germany has overtaken UK defense spending.",
  },
  {
    id: "brussels",
    label: "Brussels (EU/NATO)",
    x: 43,
    y: 40,
    variant: "primary",
    detail:
      "EU and NATO HQ. Bruegel estimates the debt-brake reform could lift EU GDP by 0.75% by 2035 — if spending continues.",
  },
];
