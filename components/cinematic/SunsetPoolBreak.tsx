"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Sunset Pool — the sub-brand within the complex.
 *
 * Reframed for families: the pool changes character through the day.
 * Mornings and afternoons are for the children (shallow lane, lifeguard,
 * shaded loungers). Evenings are for parents (the actual "Sunset" — golden
 * hour, mocktails, music). Same pool, two atmospheres.
 *
 * Visually: warm sunset gradient, distinct from the rest of the page.
 */
export function SunsetPoolBreak({ locale }: { locale: string }) {
  return (
    <section className="relative isolate overflow-hidden text-cream">
      {/* Atmospheric sunset backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--sunset absolute inset-0 ken-burns" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(40, 22, 14, 0.55) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sunlit-noon to-transparent opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-terracotta to-transparent" />
      </div>

      <div className="container py-32 md:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ember-glow">
              <span className="h-px w-12 bg-ember-glow/60" />
              Une parenthèse · A different mood
              <span className="h-px w-12 bg-ember-glow/60" />
            </div>

            <h2
              className="display-serif text-cream"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                lineHeight: "0.88",
                letterSpacing: "-0.035em",
                fontWeight: 300,
              }}
            >
              Sunset
              <span className="block italic text-ember-glow">Pool</span>
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
              La même piscine. Deux atmosphères, deux publics. Le matin
              appartient aux enfants : couloir débutant, maître-nageur, transats
              à l'ombre des oliviers. À partir de dix-huit heures, la lumière
              s'incline et la piscine devient autre — soirées privées, musique
              douce, cocktails sans alcool.
            </p>
          </motion.div>

          {/* Day vs Evening split */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ember-glow/20 md:grid-cols-2"
          >
            <div className="bg-terracotta/85 p-8 text-start backdrop-blur md:p-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-ember-glow">
                10h → 18h
              </div>
              <h3 className="mt-3 font-serif text-2xl font-light text-cream md:text-3xl">
                Les heures des enfants
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/80">
                Maître-nageur en permanence. Couloir débutant. Petits gilets
                fournis. Bouées et frites de mousse. Transats parents à
                l'ombre. Service de jus frais et glaces du domaine.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-ember-glow/85">
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Sécurité enfants
                </span>
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Familles
                </span>
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Sans alcool
                </span>
              </div>
            </div>

            <div className="bg-terracotta-dark/85 p-8 text-start backdrop-blur md:p-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-ember-glow">
                18h → minuit
              </div>
              <h3 className="mt-3 font-serif text-2xl font-light text-cream md:text-3xl">
                L'heure des parents
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/80">
                Coucher de soleil derrière les oliviers. Musique douce. Bar à
                mocktails et thés glacés. Réservation possible pour soirées
                privées, anniversaires, fiançailles. Adultes & adolescents
                accompagnés.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-ember-glow/85">
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Coucher de soleil
                </span>
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Privatisable
                </span>
                <span className="rounded-full border border-ember-glow/40 px-3 py-1">
                  Halal
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={`/${locale}/activites/piscine`}
              className="group inline-flex items-center gap-3 rounded-full border border-ember-glow/60 bg-ember-glow/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-ember-glow backdrop-blur transition hover:border-ember-glow hover:bg-ember-glow/25"
            >
              Réserver le Sunset Pool
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                →
              </span>
            </Link>
            <span className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
              Saison · mai à octobre
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
