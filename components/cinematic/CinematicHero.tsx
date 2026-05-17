"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * CinematicHero — full-bleed atmospheric hero.
 *
 * Layout:
 *  - Full-viewport-height stage (clamped on tall screens)
 *  - Photographic photo-zone backdrop with Ken-Burns drift
 *  - Top-left wordmark/seal, top-right meta (location, season)
 *  - Bottom-left: eyebrow + display headline + minimal action row
 *  - Bottom-right: vertical "scroll" hint
 *
 * Designed so the only attention-grabbing element is the typography over
 * the photograph — no cards, no widgets, no decorative noise.
 */
export function CinematicHero({ locale }: { locale: string }) {
  const { t } = useI18n();

  return (
    <section className="relative isolate flex min-h-[92vh] flex-col overflow-hidden bg-noir text-cream">
      {/* Backdrop — photo zone with slow zoom */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone ken-burns absolute inset-0" />
        {/* Top fade so the header is legible */}
        <div className="absolute inset-0 bg-noir-fade-top" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-noir-vignette" />
      </div>

      {/* Top meta row */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-6 md:px-12 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <BrandMark variant="mark" tone="bronze" className="h-8 w-8" />
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-xs uppercase tracking-widest text-bronze">
              L'Étoile de l'Est
            </span>
            <span className="text-[10px] uppercase tracking-widest text-cream/50">
              Maison agrotouristique · est. 2019
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cream/60"
        >
          <MapPin className="h-3 w-3 text-bronze" />
          36°23′N · 6°56′E
          <span className="hidden text-cream/30 md:inline">·</span>
          <span className="hidden md:inline">Ain Abid</span>
        </motion.div>
      </div>

      {/* Center spacer */}
      <div className="flex-1" />

      {/* Bottom — display block */}
      <div className="relative z-10 px-6 pb-14 md:px-12 md:pb-20">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="md:col-span-9"
          >
            <div className="mb-6 flex items-center gap-3 text-eyebrow text-bronze">
              <span className="h-px w-12 bg-bronze/60" />
              {t("home.hero.eyebrow")}
            </div>

            <h1 className="display-serif text-stage text-cream">
              <span className="block">Vingt-cinq hectares</span>
              <span className="block italic text-cream/90">
                de silence&nbsp;choisi.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
              Une maison agrotouristique au pied des hauteurs de Constantine —
              chalets, écurie, vergers et rucheries, ouverte toute l'année.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="md:col-span-3 md:text-end"
          >
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href={`/${locale}/reservation`}
                className="group inline-flex items-center gap-3 border-b border-bronze/60 pb-1 text-sm uppercase tracking-widest text-bronze transition-colors hover:text-cream"
              >
                <span>Réserver vos nuits</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                href={`/${locale}/hebergement`}
                className="text-xs uppercase tracking-widest text-cream/50 hover:text-cream/80"
              >
                Voir les hébergements
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule with stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-bronze/20 pt-6 text-cream/80 md:grid-cols-4"
        >
          {[
            { v: "25", l: "Hectares" },
            { v: "106", l: "Lits" },
            { v: "12", l: "Activités" },
            { v: "365", l: "Jours d'ouverture" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-3xl font-light text-cream md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-cream/50">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-cream/40"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px bg-cream/30" />
        </motion.div>
      </div>
    </section>
  );
}
