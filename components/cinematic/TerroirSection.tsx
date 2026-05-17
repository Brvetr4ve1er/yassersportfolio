"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * 04 · Le terroir — orchard, beehive, restaurant.
 *
 * Three columns, each with a small photo zone and editorial copy.
 * Communicates that the food and produce are LOCAL — a luxury signal,
 * not an "amenity."
 */

const PASSAGES = [
  {
    chapter: "i",
    title: "Le verger",
    body:
      "Pommes, poires, figues, grenades — onze hectares plantés et entretenus depuis trois générations. Cueillette ouverte aux résidents le vendredi.",
    photoClass: "photo-zone photo-zone--orchard",
    href: "/activites/cueillette-verger",
  },
  {
    chapter: "ii",
    title: "Les ruches",
    body:
      "Quarante ruches. Un apiculteur qui parle aux abeilles. Le miel d'oranger sert au petit-déjeuner et se vend à l'épicerie de la maison.",
    photoClass: "photo-zone",
    href: "/activites/visite-rucher",
  },
  {
    chapter: "iii",
    title: "La table",
    body:
      "Couscous au mouton, chorba frik, tajines aux fruits du verger. Tout ce qui est servi vient d'ici, du marché d'Ain Abid, ou de chez nos voisins.",
    photoClass: "photo-zone",
    href: "/restaurant",
  },
];

export function TerroirSection({ locale }: { locale: string }) {
  return (
    <section className="relative bg-noir py-32 text-cream md:py-44">
      <div className="container">
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="chapter-num">04</span>
            <span className="h-px w-12 bg-bronze/40" />
            <span className="eyebrow">Le terroir</span>
          </div>
          <h2 className="display-serif text-cinema text-cream">
            La terre, <em className="text-bronze">d'abord</em>.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            Cuisine du domaine, miel des ruchers, fruits cueillis le matin
            même. L'agrotourisme n'est pas un thème ici — c'est l'économie
            quotidienne de la maison.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {PASSAGES.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/${locale}${p.href}`}
                className="group block"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm ${p.photoClass}`}
                >
                  <span className="absolute end-4 top-4 z-10 font-serif text-3xl font-light italic text-bronze/80">
                    {p.chapter}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-noir to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <h3 className="font-serif text-2xl font-light text-cream md:text-3xl">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/65">
                  {p.body}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
