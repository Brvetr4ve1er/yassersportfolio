"use client";

import { useState } from "react";
import { ComplexMap } from "./ComplexMap";
import { ZoneInfoSheet } from "./ZoneInfoSheet";
import { CATEGORY_STYLE, COMPLEX_ZONES } from "@/lib/data/complex-zones";
import type { ZoneCategory } from "@/lib/data/complex-zones";
import type { Locale } from "@/types/domain";
import { cn } from "@/lib/utils";

/**
 * ComplexMapView — client wrapper that owns the active-zone state.
 * Renders the map + info sheet + a category legend that doubles as a
 * filter (clicking a legend chip filters which pins glow).
 */
export function ComplexMapView({ locale }: { locale: Locale }) {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);

  // Build a unique list of categories present in the zones array,
  // preserving the source order for stable rendering.
  const categories = Array.from(
    new Set(COMPLEX_ZONES.map((z) => z.category)),
  ) as ZoneCategory[];

  return (
    <div>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-clay-700">
        {categories.map((cat) => (
          <span key={cat} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: CATEGORY_STYLE[cat].fill }}
            />
            {CATEGORY_STYLE[cat].label[locale]}
          </span>
        ))}
      </div>

      {/* Map */}
      <ComplexMap
        locale={locale}
        activeZoneId={activeZoneId}
        onZoneSelect={setActiveZoneId}
        className="md:me-0"
      />

      {/* Hint */}
      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-terracotta/50">
        {locale === "ar"
          ? "اضغط على أي موقع لاكتشافه"
          : locale === "en"
            ? "Tap any spot to discover it"
            : "Touchez n'importe quel point pour le découvrir"}
      </p>

      <ZoneInfoSheet
        zoneId={activeZoneId}
        locale={locale}
        onClose={() => setActiveZoneId(null)}
      />
    </div>
  );
}
