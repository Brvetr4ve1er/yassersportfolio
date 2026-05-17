"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { mockAccommodations } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/types/domain";

/**
 * 02 · Demeures — accommodations as editorial passages, not commerce cards.
 *
 * Each accommodation occupies a large staged tile with its own photographic
 * zone, plate-numbered (I, II, III, IV) like museum labels. The price is
 * present but quiet — a small mono caption, not a shout.
 */

const VARIANTS = {
  chalet: "photo-zone",
  tent: "photo-zone photo-zone--orchard",
  glamping: "photo-zone photo-zone--equestrian",
} as const;

const PLATE = ["I", "II", "III", "IV"];

export function AccommodationsEditorial({ locale }: { locale: Locale }) {
  const items = mockAccommodations;

  return (
    <section className="relative bg-noir py-28 text-cream md:py-36">
      <div className="container">
        <div className="mb-16 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="chapter-num">02</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="eyebrow">Les demeures</span>
            </div>
            <h2 className="display-serif text-cinema text-cream">
              Quatre manières d'habiter <em className="text-bronze">la nuit</em>.
            </h2>
          </div>
          <div className="text-cream/60 md:col-span-5 md:text-end">
            <p className="max-w-md md:ms-auto">
              Du chalet familial à la tente berbère, du dôme en verre au
              cottage en bois clair — chaque hébergement répond à une saison,
              une tribu, une intention.
            </p>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, idx) => {
            const name = locale === "ar" ? item.name_ar : item.name_fr;
            const description =
              locale === "ar" ? item.description_ar : item.description_fr;
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
                className={idx % 2 === 1 ? "md:mt-16" : ""}
              >
                <Link
                  href={`/${locale}/hebergement/${item.slug}`}
                  className="group block"
                >
                  <div
                    className={`relative aspect-[4/5] overflow-hidden rounded-sm ${variantClass}`}
                  >
                    {/* Plate number */}
                    <span className="absolute end-4 top-4 z-10 font-serif text-2xl font-light italic text-bronze">
                      {PLATE[idx]}
                    </span>
                    {/* Bottom gradient for label legibility */}
                    <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-noir via-noir/70 to-transparent" />

                    {/* Bottom label */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-eyebrow text-bronze/80">
                            {item.type === "chalet"
                              ? "Chalet"
                              : item.type === "tent"
                                ? "Tente berbère"
                                : "Glamping"}
                          </div>
                          <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-cream md:text-3xl">
                            {name}
                          </h3>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-bronze opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 rtl:scale-x-[-1]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-6">
                    <p className="max-w-md text-sm leading-relaxed text-cream/65">
                      {description}
                    </p>
                    <div className="shrink-0 text-end">
                      <div className="text-eyebrow text-cream/40">À partir de</div>
                      <div className="mt-1 font-mono text-sm text-bronze">
                        {formatCurrency(item.price_weekday, locale)}
                        <span className="text-cream/40"> / nuit</span>
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-cream/40">
                        {item.capacity} personnes
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href={`/${locale}/hebergement`}
            className="group inline-flex items-center gap-3 border-b border-bronze/60 pb-1 text-sm uppercase tracking-widest text-bronze transition-colors hover:text-cream"
          >
            <span>Voir tous les hébergements</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
