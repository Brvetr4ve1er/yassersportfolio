"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Sunset Pool — atmospheric break.
 *
 * The Sunset Pool is a sub-brand inside L'Étoile. It deserves a section
 * with its OWN palette (warm sunset terracotta, ember glow), distinct
 * from the rest of the site's noir + bronze. This visually communicates
 * that walking into the pool area is walking into a different mood.
 */
export function SunsetPoolBreak({ locale }: { locale: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-noir text-cream">
      {/* Atmospheric sunset backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--sunset absolute inset-0 ken-burns" />
        <div className="absolute inset-0 bg-noir-vignette opacity-60" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-noir to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-noir to-transparent" />
      </div>

      <div className="container py-32 md:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 text-eyebrow text-ember-glow">
              <span className="h-px w-12 bg-ember-glow/60" />
              Une parenthèse
              <span className="h-px w-12 bg-ember-glow/60" />
            </div>

            <h2
              className="display-serif text-cream"
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                lineHeight: "0.9",
                letterSpacing: "-0.03em",
                fontWeight: 300,
              }}
            >
              Sunset
              <span className="block italic text-ember-glow">Pool</span>
            </h2>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
              Quand le soleil s'incline derrière les oliviers, la piscine
              devient autre chose. Un bar, une lumière qui se dépose, des
              transats orientés à l'ouest. Réservé aux résidents et aux
              soirées privées.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link
                href={`/${locale}/activites/piscine`}
                className="group inline-flex items-center gap-3 rounded-full border border-ember-glow/60 bg-ember-glow/10 px-6 py-3 text-sm uppercase tracking-widest text-ember-glow backdrop-blur transition hover:border-ember-glow hover:bg-ember-glow/20"
              >
                Découvrir le Sunset Pool
                <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">→</span>
              </Link>
            </div>

            {/* Subtle hours strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ember-glow/20 pt-6 text-cream/60">
              <div>
                <div className="text-eyebrow text-ember-glow">Saison</div>
                <div className="mt-1 font-serif text-base">Mai → Octobre</div>
              </div>
              <div>
                <div className="text-eyebrow text-ember-glow">Horaires</div>
                <div className="mt-1 font-serif text-base">10h → minuit</div>
              </div>
              <div>
                <div className="text-eyebrow text-ember-glow">Accès</div>
                <div className="mt-1 font-serif text-base">Résidents · Pass</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
