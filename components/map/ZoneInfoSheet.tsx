"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { localeDirection, type Locale } from "@/lib/i18n/config";
import { CATEGORY_STYLE, type LagoonZone } from "@/lib/data/lagoon-zones";

const COPY: Record<Locale, { close: string; hours: string; discover: string; book: string }> = {
  fr: { close: "Fermer", hours: "Horaires", discover: "En savoir plus", book: "Réserver" },
  en: { close: "Close", hours: "Hours", discover: "Learn more", book: "Book now" },
  ar: { close: "إغلاق", hours: "التوقيت", discover: "اعرف المزيد", book: "احجز الآن" },
};

export function ZoneInfoSheet({
  zone,
  locale,
  onClose,
}: {
  zone: LagoonZone | null;
  locale: Locale;
  onClose: () => void;
}) {
  const dir = localeDirection[locale];
  const isRtl = dir === "rtl";
  const c = COPY[locale];

  return (
    <AnimatePresence>
      {zone && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label={c.close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-deepwater-dark/50 backdrop-blur-[2px]"
          />

          {/* Panel — bottom sheet on mobile, side panel on desktop */}
          <motion.aside
            key={zone.id}
            dir={dir}
            role="dialog"
            aria-modal="true"
            aria-label={zone.name[locale]}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className={cn(
              "fixed z-50 overflow-y-auto bg-sand-50 text-ink shadow-2xl",
              // mobile: bottom sheet
              "inset-x-0 bottom-0 max-h-[80vh] rounded-t-3xl",
              // desktop: side panel pinned to the inline-end edge
              "md:inset-y-0 md:bottom-auto md:end-0 md:start-auto md:h-full md:max-h-none md:w-[420px] md:rounded-none md:rounded-s-3xl",
            )}
          >
            <SheetBody zone={zone} locale={locale} isRtl={isRtl} onClose={onClose} c={c} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SheetBody({
  zone,
  locale,
  isRtl,
  onClose,
  c,
}: {
  zone: LagoonZone;
  locale: Locale;
  isRtl: boolean;
  onClose: () => void;
  c: { close: string; hours: string; discover: string; book: string };
}) {
  const style = CATEGORY_STYLE[zone.category];

  return (
    <div className="relative flex flex-col gap-6 p-6 md:p-8">
      {/* drag affordance on mobile */}
      <span className="mx-auto h-1.5 w-12 rounded-full bg-ink/15 md:hidden" aria-hidden="true" />

      {/* close */}
      <button
        type="button"
        onClick={onClose}
        aria-label={c.close}
        className="absolute end-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink-soft transition hover:bg-ink/10"
      >
        <X className="h-4 w-4" />
      </button>

      {/* category chip + icon */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${style.fill}22`, border: `2px solid ${style.fill}` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d={style.iconPath}
              fill="none"
              stroke={style.fill}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ backgroundColor: `${style.fill}18`, color: style.fill }}
        >
          {style.label[locale]}
        </span>
      </div>

      {/* name */}
      <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
        {zone.name[locale]}
      </h2>

      {/* description */}
      <p className="text-[15px] leading-relaxed text-ink-soft">{zone.description[locale]}</p>

      {/* hours */}
      {zone.hours && (
        <div className="flex items-center gap-2.5 border-t border-ink/10 pt-5 text-sm text-ink-soft">
          <Clock className="h-4 w-4 shrink-0 text-lagoon-600" />
          <span className="font-medium text-ink">{c.hours}</span>
          <span className="tabular-nums" dir="ltr">
            {zone.hours}
          </span>
        </div>
      )}

      {/* deep link */}
      {zone.href && (
        <Link
          href={`/${locale}${zone.href}`}
          className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-coral px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-deepwater transition hover:bg-coral-light"
        >
          {c.book}
          <ArrowRight
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1",
            )}
          />
        </Link>
      )}
    </div>
  );
}
