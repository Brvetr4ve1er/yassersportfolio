"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * 03 · L'écurie — equestrian heritage as the brand's emotional spine.
 *
 * Plays directly on the logo's horse-head DNA. Full-bleed dark, very large
 * editorial type, a quiet brand seal in the corner. Equestrian is not
 * "an activity" here — it's the family heritage of the complex.
 */
export function EquestrianSection({ locale }: { locale: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-noir text-cream">
      {/* Full bleed atmospheric backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--equestrian absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/60 to-transparent" />
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
            <div className="flex items-center gap-4">
              <span className="chapter-num">03</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="eyebrow">L'écurie</span>
            </div>

            <h2 className="display-serif text-cream" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: "0.95", letterSpacing: "-0.025em", fontWeight: 300 }}>
              Le cheval — <em className="text-bronze">avant tout</em>{" "}
              le reste.
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
              L'Étoile de l'Est est née d'une écurie familiale.
              Aujourd'hui encore, c'est par les chevaux qu'on commence
              les matins. Promenades encadrées dans les vergers, initiation
              aux enfants, balades au crépuscule pour les confirmés.
            </p>

            <div className="grid max-w-2xl gap-6 border-t border-bronze/20 pt-8 sm:grid-cols-3">
              <div>
                <div className="font-serif text-3xl font-light text-bronze md:text-4xl">
                  14
                </div>
                <div className="mt-1 text-eyebrow text-cream/50">Chevaux</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-light text-bronze md:text-4xl">
                  60
                </div>
                <div className="mt-1 text-eyebrow text-cream/50">
                  Minutes par séance
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-light text-bronze md:text-4xl">
                  3
                </div>
                <div className="mt-1 text-eyebrow text-cream/50">
                  Niveaux encadrés
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                href={`/${locale}/activites/equitation`}
                className="group inline-flex items-center gap-3 border-b border-bronze pb-1 text-sm uppercase tracking-widest text-bronze transition-colors hover:text-cream"
              >
                Voir l'équitation
                <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">→</span>
              </Link>
            </div>
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
                className="h-72 w-72 opacity-90"
              />
              <div className="absolute inset-0 rounded-full bg-bronze/10 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
