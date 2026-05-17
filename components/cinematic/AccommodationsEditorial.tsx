"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import { mockAccommodations } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/types/domain";

/**
 * 02 · Quatre maisons — accommodations as family rooms, not luxury suites.
 *
 * Each unit is framed by who it's FOR — the grandparents' chalet, the
 * tribe's tent, the honeymoon dome — rather than by its features. The
 * copy speaks to multi-generational tribes: anniversary parties, family
 * reunions, school holidays.
 */

const VARIANTS = {
  chalet: "photo-zone photo-zone--orchard",
  tent: "photo-zone",
  glamping: "photo-zone photo-zone--equestrian",
} as const;

const PLATE = ["I", "II", "III", "IV"];

const FAMILY_FRAMING_FR = [
  "Pour les familles qui veulent leur cuisine.",
  "Pour les grands anniversaires, les retrouvailles, les noces.",
  "Pour les groupes d'amis qui ne dorment jamais à la même heure.",
  "Pour les week-ends à deux quand les enfants restent chez grand-mère.",
];

const FAMILY_CAPACITY_FR = [
  "Jusqu'à 4 personnes · 2 chambres",
  "Jusqu'à 6 personnes · 2 chambres + mezzanine",
  "Jusqu'à 4 personnes · couchage berbère",
  "2 personnes · suite romantique",
];

export function AccommodationsEditorial({ locale }: { locale: Locale }) {
  const items = mockAccommodations;

  return (
    <section className="relative bg-sunlit-noon py-28 text-terracotta md:py-40">
      {/* Subtle sun glow at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 180, 100, 0.15), transparent 60%)",
        }}
      />

      <div className="container relative">
        <div className="mb-20 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-clay-700">
                02
              </span>
              <span className="h-px w-12 bg-clay-500/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-clay-700">
                Les maisons
              </span>
            </div>
            <h2
              className="display-serif text-terracotta"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              Quatre maisons
              <span className="block italic text-clay-600">
                pour vos tribus.
              </span>
            </h2>
          </div>
          <div className="text-terracotta/70 md:col-span-5 md:text-end">
            <p className="max-w-md md:ms-auto">
              Du chalet familial à la tente berbère, du dôme sous les étoiles
              au cottage à deux — chaque hébergement a été pensé pour une
              tribu, une saison, une occasion. Aucun ne se ressemble.
            </p>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, idx) => {
            const name = locale === "ar" ? item.name_ar : item.name_fr;
            const variantClass = VARIANTS[item.type];

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={idx % 2 === 1 ? "md:mt-20" : ""}
              >
                <Link
                  href={`/${locale}/hebergement/${item.slug}`}
                  className="group block"
                >
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-sm ${variantClass}`}
                  >
                    {/* Plate number */}
                    <span className="absolute end-5 top-5 z-10 font-serif text-3xl font-light italic text-bronze">
                      {PLATE[idx]}
                    </span>

                    {/* Bottom gradient for label legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-0 h-2/3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(40, 22, 14, 0.95) 0%, rgba(40, 22, 14, 0.6) 40%, transparent 100%)",
                      }}
                    />

                    {/* Bottom label */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-bronze">
                        {item.type === "chalet"
                          ? "Chalet"
                          : item.type === "tent"
                            ? "Tente berbère"
                            : "Glamping"}
                      </div>
                      <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-cream md:text-3xl">
                        {name}
                      </h3>
                      <p className="mt-3 max-w-xs italic text-cream/85">
                        {FAMILY_FRAMING_FR[idx]}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/60">
                        <Users className="h-3 w-3 text-bronze" />
                        {FAMILY_CAPACITY_FR[idx]}
                      </div>

                      <ArrowUpRight className="absolute end-5 bottom-5 h-5 w-5 text-bronze opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 rtl:scale-x-[-1]" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-6">
                    <p className="max-w-md text-sm leading-relaxed text-terracotta/70">
                      {locale === "ar" ? item.description_ar : item.description_fr}
                    </p>
                    <div className="shrink-0 text-end">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-clay-600/70">
                        À partir de
                      </div>
                      <div className="mt-1 font-mono text-sm text-clay-700">
                        {formatCurrency(item.price_weekday, locale)}
                        <span className="text-terracotta/45"> / nuit</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col items-center gap-4">
          <Link
            href={`/${locale}/hebergement`}
            className="group inline-flex items-center gap-3 border-b border-clay-600 pb-1 text-[11px] uppercase tracking-[0.22em] text-clay-700 transition-colors hover:text-terracotta"
          >
            <span>Voir toutes les maisons</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-180" />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta/50">
            106 lits · Familles de 2 à 12 personnes
          </p>
        </div>
      </div>
    </section>
  );
}
