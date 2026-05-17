"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * 06 · Étoiles fidélité — a family register, not a points casino.
 *
 * Frames the loyalty program around families who come back year after
 * year — for the same summer weeks, the same anniversaries, the same
 * cousins reunion. The reward is recognition, not discount.
 */

const TIERS = [
  {
    name: "Bronze",
    range: "0 – 999",
    body:
      "Le premier rang. Donne accès aux offres familles, aux journées portes ouvertes du printemps et aux invitations à la fête des récoltes en septembre.",
  },
  {
    name: "Argent",
    range: "1 000 – 4 999",
    body:
      "Surclassement de chalet sous disponibilité. Tarif préférentiel sur les forfaits week-end et les anniversaires d'enfants. Cours d'équitation à demi-tarif pour les enfants accompagnés.",
  },
  {
    name: "Or",
    range: "5 000 +",
    body:
      "Réservation prioritaire des week-ends d'été — 48 heures avant l'ouverture publique. Invitation pour deux personnes à la table privée de la maison, deux fois par an. Une nuit offerte chaque année à votre date anniversaire.",
  },
];

export function LoyaltyRefined({ locale }: { locale: string }) {
  return (
    <section className="relative bg-sunlit-noon py-32 text-terracotta md:py-44">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 200, 130, 0.15), transparent 60%),",
        }}
      />

      <div className="container relative">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-clay-700">
                06
              </span>
              <span className="h-px w-12 bg-clay-500/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-clay-700">
                Le registre de la maison
              </span>
            </div>
            <h2
              className="display-serif text-terracotta"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              Étoiles
              <span className="block italic text-clay-600">Fidélité.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-terracotta/75 md:text-lg">
              Pour les familles qui reviennent. Une étoile pour chaque cent
              dinars laissés à la maison. Trois rangs, trois manières d'être
              reconnu — d'année en année, d'anniversaire en anniversaire.
            </p>

            <div className="mt-10">
              <BrandMark
                variant="seal"
                tone="noir"
                className="h-32 w-32 opacity-70"
              />
            </div>

            <Link
              href={`/${locale}/compte/fidelite`}
              className="mt-10 inline-flex items-center gap-3 border-b border-clay-700 pb-1 text-[11px] uppercase tracking-[0.22em] text-clay-700 transition hover:text-terracotta"
            >
              Consulter le registre
              <span className="rtl:rotate-180">→</span>
            </Link>
          </div>

          <div className="space-y-px overflow-hidden rounded-sm border border-clay-500/25 bg-clay-500/15 md:col-span-7">
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-start gap-6 bg-sunlit-noon p-7 transition hover:bg-sunlit-dawn md:p-9"
              >
                <div className="hidden shrink-0 md:block">
                  <div className="flex h-16 w-16 items-center justify-center font-serif text-5xl font-light italic text-clay-500/70 group-hover:text-clay-700">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-serif text-2xl font-light text-terracotta md:text-3xl">
                      {tier.name}
                    </h3>
                    <span className="font-mono text-xs text-clay-700">
                      {tier.range} étoiles
                    </span>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-terracotta/75">
                    {tier.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
