"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

/**
 * 04 · Du verger à la table — the day's harvest, the night's dinner.
 *
 * The narrative spine is TIME: children cueillent at 10h, honey arrives
 * at midi, the table serves at 20h. Same product, traceable in a single
 * day. Speaks to families who want to show their kids where food comes
 * from, not just to consumers who want farm-to-table marketing.
 */

const PASSAGES = [
  {
    chapter: "i",
    time: "10h",
    title: "Les enfants cueillent",
    enTitle: "The children pick",
    body:
      "Cueillette ouverte aux enfants chaque matin du vendredi au dimanche. Pommes en automne, figues en été, grenades en octobre. Un panier par enfant, à rapporter à la cuisine.",
    photoClass: "photo-zone photo-zone--orchard",
    href: "/activites/cueillette-verger",
  },
  {
    chapter: "ii",
    time: "midi",
    title: "Le miel arrive",
    enTitle: "The honey arrives",
    body:
      "Notre apiculteur revient des ruchers vers midi avec les pots du jour. Miel d'oranger au printemps, de jujubier en été, de romarin en automne. Servi au petit-déjeuner, vendu à l'épicerie de la maison.",
    photoClass: "photo-zone",
    href: "/activites/visite-rucher",
  },
  {
    chapter: "iii",
    time: "20h",
    title: "La table sert",
    enTitle: "The table serves",
    body:
      "Couscous au mouton qui mijote depuis le matin. Tajine d'agneau aux pruneaux du verger. Rechta traditionnelle. Pain cuit dans le four à bois. Tout vient d'ici, du marché d'Ain Abid, ou de chez nos voisins.",
    photoClass: "photo-zone photo-zone--table",
    href: "/restaurant",
  },
];

export function TerroirSection({ locale }: { locale: string }) {
  return (
    <section className="relative bg-sunlit-noon py-32 text-terracotta md:py-44">
      {/* Sun glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245, 200, 130, 0.18), transparent 60%)",
        }}
      />

      <div className="container relative">
        <div className="mb-20 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-clay-700">
                04
              </span>
              <span className="h-px w-12 bg-clay-500/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-clay-700">
                Du verger à la table
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
              Une seule journée
              <span className="block italic text-clay-600">
                entre l'arbre et l'assiette.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-end">
            <p className="max-w-md text-base leading-relaxed text-terracotta/70 md:ms-auto md:text-lg">
              L'agrotourisme n'est pas un décor ici — c'est l'économie
              quotidienne de la maison. Tout ce que vos enfants mangent le soir
              a poussé à moins d'un kilomètre.
            </p>
          </div>
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
              <Link href={`/${locale}${p.href}`} className="group block">
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm ${p.photoClass}`}
                >
                  {/* Chapter numeral */}
                  <span className="absolute end-5 top-5 z-10 font-serif text-4xl font-light italic text-bronze">
                    {p.chapter}
                  </span>

                  {/* Time stamp top-left — feels like a film cue */}
                  <div className="absolute start-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-terracotta/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-bronze backdrop-blur">
                    <Clock className="h-2.5 w-2.5" />
                    {p.time}
                  </div>

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-0 h-2/3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(40, 22, 14, 0.95) 0%, rgba(40, 22, 14, 0.55) 45%, transparent 100%)",
                    }}
                  />

                  {/* Bottom label */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                    <h3 className="font-serif text-2xl font-light text-cream md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bronze/80">
                      {p.enTitle}
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-terracotta/70">
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
