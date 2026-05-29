"use client";

import { motion } from "framer-motion";
import {
  COMPLEX_PATHS,
  COMPLEX_ZONES,
  CATEGORY_STYLE,
  type Zone,
} from "@/lib/data/complex-zones";
import type { Locale } from "@/types/domain";
import { cn } from "@/lib/utils";

const W = 1000;
const H = 700;

/**
 * ComplexMap — illustrated aerial view of the 25-hectare property.
 *
 * Hand-crafted SVG. Each zone is a tappable group; on click, the caller
 * receives the zone id and opens an info sheet. Categories use the
 * palette defined in CATEGORY_STYLE for consistent color-coding.
 *
 * The map is mounted offline-first: pure SVG, no external assets,
 * cached by the PWA service worker.
 */
export function ComplexMap({
  locale,
  activeZoneId,
  onZoneSelect,
  className,
}: {
  locale: Locale;
  activeZoneId: string | null;
  onZoneSelect: (id: string) => void;
  className?: string;
}) {
  const zoneById = (id: string): Zone | undefined =>
    COMPLEX_ZONES.find((z) => z.id === id);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-clay-500/30 bg-sunlit-dawn shadow-2xl shadow-terracotta-dark/30",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Carte du complexe L'Étoile de l'Est"
      >
        <defs>
          {/* Parchment texture as repeating noise */}
          <filter id="parchment-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="2"
              seed="3"
            />
            <feColorMatrix values="0 0 0 0 0.74  0 0 0 0 0.61  0 0 0 0 0.41  0 0 0 0.18 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>

          {/* Soft warm vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#f1e9d6" stopOpacity="0" />
            <stop offset="100%" stopColor="#3d2418" stopOpacity="0.18" />
          </radialGradient>

          {/* Olive grove fill — soft sage gradient */}
          <radialGradient id="orchard-fill" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#86955a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#566236" stopOpacity="0.9" />
          </radialGradient>

          {/* Water — for the pool */}
          <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7eb4d2" />
            <stop offset="100%" stopColor="#3f6b82" />
          </linearGradient>

          {/* Soft drop shadow for buildings */}
          <filter id="building-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="1" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Active zone glow */}
          <filter id="zone-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#c9a35b" floodOpacity="0.7" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Parchment background */}
        <rect width={W} height={H} fill="#f4e8d0" />
        <rect width={W} height={H} filter="url(#parchment-grain)" opacity="0.5" />
        <rect width={W} height={H} fill="url(#vignette)" />

        {/* Decorative dotted border (the map's frame) */}
        <rect
          x="20"
          y="20"
          width={W - 40}
          height={H - 40}
          fill="none"
          stroke="#c9a35b"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.55"
        />

        {/* ─── Decorative landscape elements ─────────────────── */}

        {/* Subtle ambient olive trees scattered across the property */}
        {[
          [80, 100], [150, 120], [300, 80], [400, 150], [550, 100], [600, 200],
          [780, 90], [950, 200], [320, 240], [420, 290], [550, 250], [580, 320],
          [380, 380], [600, 410], [350, 580], [490, 600], [620, 580], [780, 620],
          [890, 480], [50, 200], [70, 460], [950, 350],
        ].map(([x, y], i) => (
          <g key={`tree-${i}`} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="6" rx="3" ry="1.5" fill="#46361a" opacity="0.35" />
            <circle cx="0" cy="-2" r="6" fill="#566236" opacity="0.6" />
            <circle cx="-2" cy="-4" r="4" fill="#6b7a45" opacity="0.55" />
            <circle cx="2" cy="-3" r="3.5" fill="#86955a" opacity="0.5" />
          </g>
        ))}

        {/* ─── Paths between zones (drawn first, under everything) ─── */}
        <g>
          {COMPLEX_PATHS.map((p, i) => {
            const from = zoneById(p.from);
            const to = zoneById(p.to);
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.pin.x}
                y1={from.pin.y}
                x2={to.pin.x}
                y2={to.pin.y}
                stroke="#a78441"
                strokeWidth="1.4"
                strokeDasharray="3 4"
                opacity="0.5"
              />
            );
          })}
        </g>

        {/* ─── Zone shapes ───────────────────────────────────── */}
        {COMPLEX_ZONES.map((zone) => {
          const isActive = zone.id === activeZoneId;
          const style = CATEGORY_STYLE[zone.category];

          let fill = style.fill;
          if (zone.category === "orchard") fill = "url(#orchard-fill)";
          if (zone.category === "pool") fill = "url(#water)";

          return (
            <g
              key={zone.id}
              filter={isActive ? "url(#zone-glow)" : undefined}
              style={{ cursor: "pointer" }}
              onClick={() => onZoneSelect(zone.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onZoneSelect(zone.id);
              }}
              tabIndex={0}
              role="button"
              aria-label={zone.name[locale]}
            >
              {/* Zone shape outline */}
              {zone.shape?.type === "rect" && (
                <rect
                  x={zone.shape.x}
                  y={zone.shape.y}
                  width={zone.shape.w}
                  height={zone.shape.h}
                  rx={zone.shape.rx ?? 0}
                  fill={fill}
                  stroke={style.stroke}
                  strokeWidth="1.5"
                  opacity={isActive ? 1 : 0.85}
                  filter={
                    ["accommodation", "reception", "restaurant"].includes(
                      zone.category,
                    )
                      ? "url(#building-shadow)"
                      : undefined
                  }
                />
              )}
              {zone.shape?.type === "circle" && (
                <circle
                  cx={zone.shape.cx}
                  cy={zone.shape.cy}
                  r={zone.shape.r}
                  fill={fill}
                  stroke={style.stroke}
                  strokeWidth="1.5"
                  opacity={isActive ? 1 : 0.85}
                />
              )}
              {zone.shape?.type === "oval" && (
                <ellipse
                  cx={zone.shape.cx}
                  cy={zone.shape.cy}
                  rx={zone.shape.rx}
                  ry={zone.shape.ry}
                  fill={fill}
                  stroke={style.stroke}
                  strokeWidth="1.5"
                  opacity={isActive ? 1 : 0.85}
                  strokeDasharray="4 3"
                />
              )}
              {zone.shape?.type === "polygon" && (
                <polygon
                  points={zone.shape.points}
                  fill={fill}
                  stroke={style.stroke}
                  strokeWidth="1.2"
                  opacity={isActive ? 0.95 : 0.75}
                />
              )}

              {/* Pin marker */}
              <g transform={`translate(${zone.pin.x}, ${zone.pin.y})`}>
                <motion.circle
                  cx={0}
                  cy={0}
                  r={isActive ? 14 : 11}
                  fill="#fdfaf2"
                  stroke={style.stroke}
                  strokeWidth="2"
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  style={{ transformOrigin: "center", transformBox: "fill-box" }}
                />
                {/* Icon glyph centered in the pin */}
                <g
                  transform="translate(-7,-7) scale(0.58)"
                  fill={style.stroke}
                  pointerEvents="none"
                >
                  <path d={style.iconPath} />
                </g>
              </g>

              {/* Label below the pin */}
              <g
                transform={`translate(${zone.pin.x}, ${zone.pin.y + 28})`}
                pointerEvents="none"
              >
                <text
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="serif"
                  fontWeight={isActive ? 600 : 500}
                  fill={isActive ? "#3d2418" : "#5a3625"}
                  style={{ paintOrder: "stroke", stroke: "#f4e8d0", strokeWidth: 3 }}
                >
                  {zone.name[locale]}
                </text>
              </g>
            </g>
          );
        })}

        {/* ─── Compass rose, top-right ────────────────────────── */}
        <g transform={`translate(${W - 60}, 60)`} opacity="0.7">
          <circle cx="0" cy="0" r="22" fill="none" stroke="#7e6231" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke="#7e6231" strokeWidth="0.8" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#7e6231" strokeWidth="0.8" />
          <polygon points="0,-20 -3,-12 3,-12" fill="#c9a35b" />
          <text x="0" y="-26" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#7e6231" fontWeight="600">N</text>
          <text x="0" y="32" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#7e6231">S</text>
          <text x="-26" y="3" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#7e6231">O</text>
          <text x="26" y="3" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#7e6231">E</text>
        </g>

        {/* ─── Scale, bottom-left ──────────────────────────────── */}
        <g transform={`translate(40, ${H - 50})`} opacity="0.7">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#7e6231" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#7e6231" strokeWidth="1.5" />
          <line x1="40" y1="-3" x2="40" y2="3" stroke="#7e6231" strokeWidth="1" />
          <line x1="80" y1="-4" x2="80" y2="4" stroke="#7e6231" strokeWidth="1.5" />
          <text x="40" y="-8" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#7e6231" fontWeight="500">100 m</text>
        </g>

        {/* ─── Title cartouche, top-left ──────────────────────── */}
        <g transform="translate(40, 50)">
          <text fontSize="22" fontFamily="serif" fill="#3d2418" fontStyle="italic" fontWeight="300">
            L'Étoile de l'Est
          </text>
          <text y="20" fontSize="10" fontFamily="serif" fill="#7e6231" letterSpacing="3">
            25 HA · AIN ABID · CONSTANTINE
          </text>
        </g>
      </svg>
    </div>
  );
}
