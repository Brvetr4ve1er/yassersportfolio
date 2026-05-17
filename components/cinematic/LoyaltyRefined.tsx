"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * 05 · Étoiles Fidélité — loyalty positioned as a maison's register,
 * not a casino-style points system. Three tiers as carved cards
 * with restrained typography. No exploding stars. No animated counters.
 */

const TIERS = [
  {
    name: "Bronze",
    range: "0 – 999",
    body:
      "Le premier seuil. Donne accès aux offres résidents, aux invitations aux journées portes ouvertes.",
  },
  {
    name: "Argent",
    range: "1 000 – 4 999",
    body:
      "Surclassement chambre sous disponibilité. Tarif préférentiel sur les forfaits week-end.",
  },
  {
    name: "Or",
    range: "5 000 +",
    body:
      "Accès prioritaire aux week-ends d'été — 48 heures avant l'ouverture publique. Hôtes invités à la table privée du domaine, deux fois par an.",
  },
];

export function LoyaltyRefined({ locale }: { locale: string }) {
  return (
    <section className="relative bg-noir py-32 text-cream md:py-44">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <span className="chapter-num">05</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="eyebrow">La maison</span>
            </div>
            <h2 className="display-serif text-cinema text-cream">
              Étoiles
              <span className="block italic text-bronze">Fidélité.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70 md:text-lg">
              Une étoile pour chaque cent dinars laissés à la maison.
              Trois rangs. Trois manières d'être reconnu, d'année en année.
            </p>
            <Link
              href={`/${locale}/compte/fidelite`}
              className="mt-8 inline-flex items-center gap-3 border-b border-bronze pb-1 text-sm uppercase tracking-widest text-bronze transition hover:text-cream"
            >
              Consulter le registre
              <span className="rtl:rotate-180">→</span>
            </Link>
          </div>

          <div className="space-y-px overflow-hidden rounded-sm border border-bronze/20 md:col-span-7">
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
                className="group flex items-start gap-6 bg-noir-100 p-6 transition hover:bg-noir-50 md:p-8"
              >
                <div className="hidden shrink-0 md:block">
                  <div className="flex items-center justify-center font-serif text-5xl font-light italic text-bronze/40 group-hover:text-bronze/70">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-serif text-2xl font-light text-cream">
                      {tier.name}
                    </h3>
                    <span className="font-mono text-xs text-bronze">
                      {tier.range} étoiles
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-cream/65">
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
