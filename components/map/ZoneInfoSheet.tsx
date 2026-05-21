"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, X, ArrowUpRight } from "lucide-react";
import {
  CATEGORY_STYLE,
  COMPLEX_ZONES,
  type Zone,
} from "@/lib/data/complex-zones";
import type { Locale } from "@/types/domain";

const TITLES: Record<Locale, { close: string; viewDetails: string; hours: string }> = {
  fr: { close: "Fermer", viewDetails: "Voir les détails", hours: "Horaires" },
  en: { close: "Close", viewDetails: "View details", hours: "Hours" },
  ar: { close: "إغلاق", viewDetails: "عرض التفاصيل", hours: "الأوقات" },
};

/**
 * ZoneInfoSheet — bottom sheet on mobile, side panel on desktop.
 * Shows the localized name + description + hours of a zone, plus a
 * deep link to the booking page if the zone is bookable.
 */
export function ZoneInfoSheet({
  zoneId,
  locale,
  onClose,
}: {
  zoneId: string | null;
  locale: Locale;
  onClose: () => void;
}) {
  const zone: Zone | undefined = zoneId
    ? COMPLEX_ZONES.find((z) => z.id === zoneId)
    : undefined;
  const t = TITLES[locale];

  return (
    <AnimatePresence>
      {zone && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-terracotta-dark/40 backdrop-blur-sm md:hidden"
            aria-hidden
          />

          {/* Sheet — bottom on mobile, side on desktop */}
          <motion.aside
            key={zone.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-clay-500/30 bg-sunlit-noon p-6 shadow-2xl md:inset-y-0 md:end-0 md:start-auto md:max-w-md md:rounded-none md:rounded-s-2xl md:border-l md:border-t-0 md:p-8"
            role="dialog"
            aria-labelledby={`zone-${zone.id}-title`}
          >
            {/* Pull bar (mobile) */}
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-clay-500/40 md:hidden" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: CATEGORY_STYLE[zone.category].fill,
                    color: "#fdfaf2",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden
                  >
                    <path d={CATEGORY_STYLE[zone.category].iconPath} />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-clay-700">
                    {CATEGORY_STYLE[zone.category].label[locale]}
                  </p>
                  <h3
                    id={`zone-${zone.id}-title`}
                    className="font-serif text-2xl font-light text-terracotta md:text-3xl"
                  >
                    {zone.name[locale]}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.close}
                className="rounded-full p-1.5 text-clay-700 transition hover:bg-clay-500/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Description */}
            <p
              className={`mt-6 text-[15px] leading-relaxed text-terracotta/80 ${locale === "ar" ? "text-end" : ""}`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              {zone.description[locale]}
            </p>

            {/* Hours */}
            {zone.hours && (
              <div className="mt-6 flex items-center gap-3 rounded-md border border-clay-500/25 bg-clay-500/10 px-4 py-3">
                <Clock className="h-4 w-4 text-clay-700" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-clay-700">
                    {t.hours}
                  </p>
                  <p className="font-mono text-sm text-terracotta">{zone.hours}</p>
                </div>
              </div>
            )}

            {/* Action */}
            {zone.href && (
              <Link
                href={`/${locale}${zone.href}`}
                className="group mt-8 inline-flex items-center gap-2 border-b border-clay-700 pb-1 text-[11px] uppercase tracking-[0.22em] text-clay-700 transition hover:text-terracotta"
              >
                {t.viewDetails}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:scale-x-[-1]" />
              </Link>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
