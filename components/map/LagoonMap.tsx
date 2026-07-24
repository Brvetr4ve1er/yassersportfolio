"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import {
  CATEGORY_STYLE,
  LAGOON_PATHS,
  LAGOON_ZONES,
  ZONE_BY_ID,
  type LagoonZone,
  type ZoneShape,
} from "@/lib/data/lagoon-zones";

// ── Board constants ────────────────────────────────────────────────────────
const VIEW_W = 1000;
const VIEW_H = 700;

// ── Decorative pines scattered in the forest margin ─────────────────────────
const PINES: Array<{ x: number; y: number; s: number }> = [
  { x: 44, y: 76, s: 1 }, { x: 118, y: 46, s: 0.8 }, { x: 250, y: 50, s: 0.9 },
  { x: 372, y: 40, s: 0.75 }, { x: 636, y: 42, s: 0.85 }, { x: 760, y: 52, s: 0.8 },
  { x: 902, y: 44, s: 1 }, { x: 966, y: 104, s: 0.8 },
  { x: 34, y: 205, s: 0.9 }, { x: 40, y: 380, s: 0.85 }, { x: 36, y: 480, s: 0.9 },
  { x: 966, y: 205, s: 0.9 }, { x: 962, y: 380, s: 0.85 }, { x: 964, y: 480, s: 0.9 },
  { x: 122, y: 662, s: 0.8 }, { x: 316, y: 666, s: 0.75 },
  { x: 706, y: 662, s: 0.85 }, { x: 884, y: 660, s: 0.9 },
];

// ── Geometry helpers ────────────────────────────────────────────────────────
function shapeBBox(shape: ZoneShape): { x: number; y: number; w: number; h: number } {
  switch (shape.type) {
    case "rect":
      return { x: shape.x, y: shape.y, w: shape.w, h: shape.h };
    case "circle":
      return { x: shape.cx - shape.r, y: shape.cy - shape.r, w: shape.r * 2, h: shape.r * 2 };
    case "oval":
      return { x: shape.cx - shape.rx, y: shape.cy - shape.ry, w: shape.rx * 2, h: shape.ry * 2 };
    case "polygon": {
      const xs = shape.points.map((p) => p[0]);
      const ys = shape.points.map((p) => p[1]);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      return { x: minX, y: minY, w: Math.max(...xs) - minX, h: Math.max(...ys) - minY };
    }
  }
}

function ShapeEl({
  shape,
  fill,
  stroke,
  strokeWidth = 2.5,
  fillOpacity = 0.85,
  filter,
  className,
}: {
  shape: ZoneShape;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  fillOpacity?: number;
  filter?: string;
  className?: string;
}) {
  const common = {
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    filter,
    className,
    strokeLinejoin: "round" as const,
  };
  switch (shape.type) {
    case "rect":
      return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={shape.rx ?? 8} {...common} />;
    case "circle":
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...common} />;
    case "oval":
      return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...common} />;
    case "polygon":
      return <polygon points={shape.points.map((p) => p.join(",")).join(" ")} {...common} />;
  }
}

/** Gently bowed walkway between two points. */
function walkwayPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2 + (y2 - y1) * 0.07;
  const my = (y1 + y2) / 2 + (x1 - x2) * 0.07;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export type LagoonMapProps = {
  locale: Locale;
  activeZoneId: string | null;
  onZoneSelect: (id: string) => void;
  className?: string;
};

export function LagoonMap({ locale, activeZoneId, onZoneSelect, className }: LagoonMapProps) {
  const titleId = "lagoon-map-title";
  const descId = "lagoon-map-desc";

  const titleCartouche =
    locale === "ar" ? "جزيرة أوكسجين" : "Oxygen Island";
  const subCartouche =
    locale === "ar" ? "بوشاوي · الجزائر" : "Bouchaoui · Alger";
  const planLabel =
    locale === "ar" ? "المخطّط الجوّي" : locale === "en" ? "Aerial plan" : "Plan aérien";

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("lagoon-map h-auto w-full select-none", className)}
    >
      <title id={titleId}>
        {locale === "ar"
          ? "خريطة بحيرة جزيرة أوكسجين"
          : locale === "en"
            ? "Map of the Oxygen Island lagoon"
            : "Carte du lagon d'Oxygen Island"}
      </title>
      <desc id={descId}>
        {locale === "ar"
          ? "مخطّط توضيحي جوّي للبحيرة والكابانات والبار والمطعم ومنطقة الأطفال والمدخل والموقف."
          : locale === "en"
            ? "An illustrated aerial plan of the lagoon, cabanas, bar, restaurant, kids' lane, entrance and car park."
            : "Plan aérien illustré du lagon, des cabanas, du bar, du restaurant, du couloir enfants, de l'entrée et du parking."}
      </desc>

      {/* Scoped styling — focus ring, ripple + reduced-motion */}
      <style>{`
        .lagoon-map__zone { outline: none; }
        .lagoon-map__focus { stroke: transparent; stroke-width: 3; stroke-dasharray: 7 5; }
        .lagoon-map__zone:focus-visible .lagoon-map__focus { stroke: #f6ecd4; }
        .lagoon-map__ripple {
          animation: lagoonRipple 9s ease-in-out infinite;
          transform-box: fill-box;
        }
        @keyframes lagoonRipple {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lagoon-map__ripple { animation: none; }
        }
      `}</style>

      <defs>
        {/* Parchment grain */}
        <filter id="lg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.07  0 0 0 0 0.11  0 0 0 0 0.05  0 0 0 0.5 0"
          />
        </filter>
        {/* Water gradient */}
        <radialGradient id="lg-water" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#5fb9c6" />
          <stop offset="55%" stopColor="#1d8da0" />
          <stop offset="100%" stopColor="#0e596a" />
        </radialGradient>
        {/* Sandy clearing wash */}
        <radialGradient id="lg-sand" cx="50%" cy="45%" r="72%">
          <stop offset="0%" stopColor="#e7d3a4" />
          <stop offset="100%" stopColor="#d2b985" />
        </radialGradient>
        {/* Active-zone glow */}
        <filter id="lg-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#f4e8d0" floodOpacity="0.95" />
        </filter>
        {/* Marker drop shadow */}
        <filter id="lg-pin" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#06161a" floodOpacity="0.4" />
        </filter>
        {/* Lagoon clip for ripples */}
        <clipPath id="lg-lagoonClip">
          <ellipse cx={500} cy={305} rx={250} ry={140} />
        </clipPath>
      </defs>

      {/* ── Forest floor ─────────────────────────────────────────────── */}
      <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="#233417" />
      <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="#1a2911" opacity={0.55} />
      <rect
        x={0}
        y={0}
        width={VIEW_W}
        height={VIEW_H}
        filter="url(#lg-grain)"
        opacity={0.4}
        style={{ mixBlendMode: "overlay" }}
      />

      {/* ── Sandy clearing ───────────────────────────────────────────── */}
      <path
        d="M118,152 C58,262 58,470 162,562 C282,662 720,682 852,560 C962,470 962,238 858,150 C740,58 260,58 118,152 Z"
        fill="url(#lg-sand)"
        stroke="#b89a63"
        strokeWidth={3}
        strokeOpacity={0.5}
      />
      {/* soft inner beach ring around the water */}
      <ellipse cx={500} cy={305} rx={296} ry={182} fill="#e9d7ab" opacity={0.55} />

      {/* ── Decorative pines (forest surround) ───────────────────────── */}
      <g aria-hidden="true">
        {PINES.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
            <rect x={-3} y={22} width={6} height={12} rx={2} fill="#5a3b22" />
            <polygon points="0,-24 16,6 -16,6" fill="#2f4a1e" />
            <polygon points="0,-10 14,20 -14,20" fill="#3a5c26" />
            <polygon points="0,2 12,30 -12,30" fill="#2b471c" />
          </g>
        ))}
      </g>

      {/* ── Walkways ─────────────────────────────────────────────────── */}
      <g aria-hidden="true">
        {LAGOON_PATHS.map((path) => {
          const a = ZONE_BY_ID[path.from];
          const b = ZONE_BY_ID[path.to];
          if (!a || !b) return null;
          return (
            <path
              key={path.id}
              d={walkwayPath(a.pin.x, a.pin.y, b.pin.x, b.pin.y)}
              fill="none"
              stroke="#e7d3a4"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="2 11"
              strokeOpacity={0.85}
            />
          );
        })}
      </g>

      {/* ── Lagoon water body (drawn under the zone group) ───────────── */}
      <g aria-hidden="true">
        <ellipse
          cx={500}
          cy={305}
          rx={250}
          ry={140}
          fill="url(#lg-water)"
          stroke="#5fb9c6"
          strokeWidth={3}
        />
        <g clipPath="url(#lg-lagoonClip)">
          {[248, 292, 336, 380].map((y, i) => (
            <path
              key={y}
              className="lagoon-map__ripple"
              style={{ animationDelay: `${i * -1.8}s` }}
              d={`M250,${y} q40,-13 80,0 t80,0 t80,0 t80,0 t80,0 t80,0`}
              fill="none"
              stroke="#f4f7f2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.22}
            />
          ))}
        </g>
      </g>

      {/* ── Zones ────────────────────────────────────────────────────── */}
      <g>
        {LAGOON_ZONES.map((zone) => (
          <ZoneGroup
            key={zone.id}
            zone={zone}
            locale={locale}
            isActive={activeZoneId === zone.id}
            onSelect={onZoneSelect}
          />
        ))}
      </g>

      {/* ── Overlays: cartouche, compass, scale ──────────────────────── */}
      <TitleCartouche title={titleCartouche} sub={subCartouche} plan={planLabel} />
      <CompassRose locale={locale} />
      <ScaleBar locale={locale} />
    </svg>
  );
}

// ── One interactive zone ────────────────────────────────────────────────────
function ZoneGroup({
  zone,
  locale,
  isActive,
  onSelect,
}: {
  zone: LagoonZone;
  locale: Locale;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const style = CATEGORY_STYLE[zone.category];
  const bbox = shapeBBox(zone.shape);
  const isLagoon = zone.id === "lagoon";
  const { x, y } = zone.pin;

  // Label sits below the pin, or above it for the two southern zones.
  const labelAbove = y > 560;
  const labelY = labelAbove ? y - 28 : y + 34;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${zone.name[locale]} — ${style.label[locale]}`}
      aria-pressed={isActive}
      className="lagoon-map__zone"
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(zone.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(zone.id);
        }
      }}
    >
      {/* keyboard focus ring */}
      <rect
        className="lagoon-map__focus"
        x={bbox.x - 7}
        y={bbox.y - 7}
        width={bbox.w + 14}
        height={bbox.h + 14}
        rx={14}
        fill="none"
      />

      {/* footprint — the lagoon keeps its gradient body, others get a colour wash */}
      {!isLagoon && (
        <ShapeEl
          shape={zone.shape}
          fill={style.fill}
          stroke={style.stroke}
          fillOpacity={0.88}
          strokeWidth={isActive ? 3.5 : 2.5}
          filter={isActive ? "url(#lg-glow)" : undefined}
        />
      )}
      {isLagoon && isActive && (
        <ellipse
          cx={500}
          cy={305}
          rx={252}
          ry={142}
          fill="none"
          stroke="#f4e8d0"
          strokeWidth={4}
          filter="url(#lg-glow)"
        />
      )}

      {/* pin marker */}
      <g transform={`translate(${x} ${y})`} filter="url(#lg-pin)">
        {isActive && <circle r={26} fill={style.fill} opacity={0.28} />}
        <circle
          r={isActive ? 20 : 16.5}
          fill="#f6ecd4"
          stroke={style.fill}
          strokeWidth={isActive ? 3.2 : 2.6}
        />
        <svg x={-10} y={-10} width={20} height={20} viewBox="0 0 24 24">
          <path
            d={style.iconPath}
            fill="none"
            stroke="#0c2a30"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </g>

      {/* label — paint-order stroke so it reads over any backdrop */}
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        className="font-display"
        fontSize={isLagoon ? 22 : 16}
        fontWeight={700}
        fill="#f8efd8"
        stroke="#08211a"
        strokeWidth={isLagoon ? 5.5 : 4.5}
        strokeLinejoin="round"
        paintOrder="stroke"
        style={{ letterSpacing: "0.01em" }}
      >
        {zone.name[locale]}
      </text>
    </g>
  );
}

// ── Title cartouche (top-left) ──────────────────────────────────────────────
function TitleCartouche({ title, sub, plan }: { title: string; sub: string; plan: string }) {
  return (
    <g transform="translate(28 26)" aria-hidden="true">
      <rect
        x={0}
        y={0}
        width={252}
        height={92}
        rx={12}
        fill="#f6ecd4"
        stroke="#7a5a2e"
        strokeWidth={2}
        opacity={0.96}
      />
      <rect x={7} y={7} width={238} height={78} rx={8} fill="none" stroke="#c2a466" strokeWidth={1} />
      {/* compass star flourish */}
      <g transform="translate(38 46)">
        <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#1d8da0" />
        <circle r={3.4} fill="#f6ecd4" />
      </g>
      <text x={72} y={40} className="font-display" fontSize={22} fontWeight={700} fill="#0c2a30">
        {title}
      </text>
      <text x={72} y={60} className="font-display" fontSize={12.5} fontWeight={500} fill="#8a5a3b">
        {sub}
      </text>
      <text
        x={72}
        y={77}
        fontSize={9}
        fontWeight={600}
        fill="#147385"
        style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
      >
        {plan}
      </text>
    </g>
  );
}

// ── Compass rose (top-right) ────────────────────────────────────────────────
function CompassRose({ locale }: { locale: Locale }) {
  // Latin N/E/S/O for FR/EN; short Arabic cardinal letters for AR.
  const N = locale === "ar" ? "ش" : "N";
  const E = locale === "ar" ? "ق" : "E";
  const S = locale === "ar" ? "ج" : "S";
  const O = locale === "ar" ? "غ" : "O";
  return (
    <g transform="translate(912 96)" aria-hidden="true">
      <circle r={48} fill="#f6ecd4" stroke="#7a5a2e" strokeWidth={2} opacity={0.95} />
      <circle r={40} fill="none" stroke="#c2a466" strokeWidth={1} />
      {/* needle */}
      <polygon points="0,-34 8,0 0,10 -8,0" fill="#ec6e4f" />
      <polygon points="0,34 8,0 0,-10 -8,0" fill="#0e596a" />
      <circle r={3} fill="#f6ecd4" stroke="#7a5a2e" strokeWidth={1} />
      <text x={0} y={-33} textAnchor="middle" className="font-display" fontSize={13} fontWeight={700} fill="#0c2a30">{N}</text>
      <text x={35} y={5} textAnchor="middle" className="font-display" fontSize={13} fontWeight={700} fill="#0c2a30">{E}</text>
      <text x={0} y={44} textAnchor="middle" className="font-display" fontSize={13} fontWeight={700} fill="#0c2a30">{S}</text>
      <text x={-35} y={5} textAnchor="middle" className="font-display" fontSize={13} fontWeight={700} fill="#0c2a30">{O}</text>
    </g>
  );
}

// ── Scale bar (bottom-left) ─────────────────────────────────────────────────
function ScaleBar({ locale }: { locale: Locale }) {
  const label = locale === "ar" ? "50 م" : "50 m";
  return (
    <g transform="translate(34 648)" aria-hidden="true">
      <rect x={-8} y={-24} width={168} height={44} rx={9} fill="#f6ecd4" stroke="#7a5a2e" strokeWidth={1.5} opacity={0.94} />
      <line x1={4} y1={0} x2={124} y2={0} stroke="#0c2a30" strokeWidth={3} strokeLinecap="round" />
      <line x1={4} y1={-6} x2={4} y2={6} stroke="#0c2a30" strokeWidth={3} strokeLinecap="round" />
      <line x1={64} y1={-5} x2={64} y2={5} stroke="#0c2a30" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={124} y1={-6} x2={124} y2={6} stroke="#0c2a30" strokeWidth={3} strokeLinecap="round" />
      <text x={134} y={5} className="font-display" fontSize={13} fontWeight={700} fill="#0c2a30">{label}</text>
    </g>
  );
}
