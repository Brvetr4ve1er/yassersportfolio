"use client";

import { useMemo, useState } from "react";
import { Hand } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";
import {
  CATEGORY_ORDER,
  CATEGORY_STYLE,
  ZONE_BY_ID,
} from "@/lib/data/lagoon-zones";
import { LagoonMap } from "./LagoonMap";
import { ZoneInfoSheet } from "./ZoneInfoSheet";

const HINT: Record<Locale, string> = {
  fr: "Touchez un point pour le découvrir",
  en: "Tap a point to explore it",
  ar: "المس نقطة لاكتشافها",
};

const LEGEND_TITLE: Record<Locale, string> = {
  fr: "Légende",
  en: "Legend",
  ar: "المفتاح",
};

export function LagoonMapView({ locale }: { locale: Locale }) {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const activeZone = useMemo(
    () => (activeZoneId ? ZONE_BY_ID[activeZoneId] ?? null : null),
    [activeZoneId],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Legend + hint */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 text-eyebrow font-semibold uppercase tracking-[0.22em] text-lagoon-600">
            {LEGEND_TITLE[locale]}
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {CATEGORY_ORDER.map((cat) => {
              const style = CATEGORY_STYLE[cat];
              return (
                <li key={cat} className="inline-flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${style.fill}22`, border: `2px solid ${style.fill}` }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                      <path
                        d={style.iconPath}
                        fill="none"
                        stroke={style.fill}
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[13px] font-medium text-ink-soft">
                    {style.label[locale]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-lagoon-50 px-4 py-2 text-[12px] font-medium text-lagoon-700">
          <Hand className="h-3.5 w-3.5 shrink-0" />
          {HINT[locale]}
        </div>
      </div>

      {/* Map board */}
      <div className="overflow-hidden rounded-3xl border border-palm-700/30 bg-palm-800 shadow-xl ring-1 ring-black/5">
        <LagoonMap
          locale={locale}
          activeZoneId={activeZoneId}
          onZoneSelect={(id) => setActiveZoneId((cur) => (cur === id ? null : id))}
        />
      </div>

      {/* Info sheet */}
      <ZoneInfoSheet zone={activeZone} locale={locale} onClose={() => setActiveZoneId(null)} />
    </div>
  );
}
