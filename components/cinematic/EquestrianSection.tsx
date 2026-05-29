"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";
import { SectionIndex } from "@/components/ui/section-index";
import { StatBlock } from "@/components/ui/stat-block";

/**
 * 03 · L'écurie — the family heart.
 *
 * Reframes the equestrian center as the place where children meet their
 * first horse. Plays on the logo's horse-head DNA AND positions the
 * écurie as the central family experience, not as a luxury activity for
 * adults.
 */
export function EquestrianSection({ locale }: { locale: string }) {
  return (
    <section
      id="chapter-03"
      className="relative isolate overflow-hidden bg-terracotta text-cream"
    >
      {/* Full bleed atmospheric backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--equestrian absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(40, 22, 14, 0.92) 0%, rgba(40, 22, 14, 0.55) 50%, rgba(40, 22, 14, 0.2) 100%)",
          }}
        />
      </div>

      <div className="container py-28 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:col-span-7"
          >
            <SectionIndex index="03" label="L'écurie · The stables" tone="dark" />

            <h2 className="h-display-2 text-cream">
              Le premier galop
              <span className="block italic text-bronze">
                d'une vie.
              </span>
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
              L'Étoile de l'Est est née d'une écurie familiale, et c'est par
              les chevaux que tout commence encore aujourd'hui. Pour les
              enfants, c'est souvent leur première fois en selle — encadrée,
              douce, à dos de poney pour les plus petits. Pour les adolescents,
              une vraie initiation. Pour les confirmés, des balades crépusculaires
              dans les vergers d'oliviers.
            </p>

            <div className="grid max-w-2xl gap-6 border-t border-bronze/25 pt-8 sm:grid-cols-3">
              <StatBlock value="4" label="Moniteurs diplômés" tone="bronze" />
              <StatBlock value="4+" label="Âge des cavaliers" tone="bronze" />
              <StatBlock value="14" label="Chevaux & poneys" tone="bronze" />
            </div>

            {/* Family-specific reassurance */}
            <div className="rounded-sm border border-bronze/20 bg-terracotta-light/30 p-5 backdrop-blur">
              <div className="text-[10px] uppercase tracking-[0.22em] text-bronze">
                Pour les parents
              </div>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">
                Casques obligatoires fournis. Cercle d'initiation clos pour les
                enfants de 4 à 8 ans. Vous pouvez rester près du manège — un
                banc à l'ombre, un thé, et tout le temps de regarder.
              </p>
            </div>

            <Link
              href={`/${locale}/activites/equitation`}
              className="group inline-flex items-center gap-3 border-b border-bronze pb-1 text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-cream"
            >
              Réserver une séance
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden items-center justify-center md:col-span-5 md:flex"
          >
            <div className="relative">
              <BrandMark
                variant="seal"
                tone="bronze"
                className="h-80 w-80 opacity-90"
              />
              <div className="absolute inset-0 rounded-full bg-bronze/15 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
