"use client";

import { motion } from "framer-motion";
import { Sun, Coffee, Trees, Utensils, Moon } from "lucide-react";

/**
 * The Family Day — chronological walk through what a stay actually feels
 * like. Repurposed from "philosophy" because families want to picture the
 * schedule, not read about silence. Replaces literary copy with a vivid
 * timeline: dawn coffee, morning ride, afternoon swim, evening dinner,
 * night sky.
 */

const MOMENTS = [
  {
    time: "6h30",
    icon: Coffee,
    title: "Le petit-déjeuner sur la terrasse",
    body:
      "Pains chauds, miel des ruches, fromage frais du voisinage. Les grands-parents arrivent les premiers — ils ne dorment plus aussi tard qu'avant.",
  },
  {
    time: "10h00",
    icon: Trees,
    title: "Cueillette ou première leçon d'équitation",
    body:
      "Les enfants choisissent : panier dans le verger, ou casque et poney au manège. Les ados optent souvent pour les deux.",
  },
  {
    time: "14h00",
    icon: Sun,
    title: "Sieste, piscine ou quad",
    body:
      "La piscine ouvre son couloir débutant pour les petits. Les parents s'installent à l'ombre. Les ados partent en quad sur les sentiers balisés.",
  },
  {
    time: "20h00",
    icon: Utensils,
    title: "Le couscous arrive",
    body:
      "Une seule grande table par famille — pas de buffet, pas de service rapide. Le couscous mijote depuis le matin. Le tajine attend depuis dix heures.",
  },
  {
    time: "22h30",
    icon: Moon,
    title: "Le ciel, simplement",
    body:
      "Pas de pollution lumineuse. Les enfants comptent les étoiles depuis la terrasse du chalet. C'est souvent leur souvenir le plus précis.",
  },
];

export function PhilosophySection() {
  return (
    <section className="relative bg-terracotta py-32 text-cream md:py-44">
      <div className="container">
        <div className="mb-20 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-bronze/70">
                {"··"}
              </span>
              <span className="h-px w-12 bg-bronze/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-bronze">
                Une journée chez nous
              </span>
            </div>
            <h2
              className="display-serif text-cream"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              Du lever du soleil
              <span className="block italic text-bronze">
                au comptage d'étoiles.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-end">
            <p className="max-w-md text-base leading-relaxed text-cream/80 md:ms-auto md:text-lg">
              Une journée type à L'Étoile — du petit-déjeuner sous les oliviers
              au dîner autour du même couscous, en passant par la première
              leçon d'équitation des enfants.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute start-5 top-2 bottom-2 hidden w-px bg-bronze/25 md:start-7 md:block" />

          <div className="space-y-12 md:space-y-16">
            {MOMENTS.map((m, idx) => (
              <motion.div
                key={m.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative grid items-start gap-6 md:grid-cols-12 md:gap-10"
              >
                {/* Time + icon */}
                <div className="flex items-start gap-4 md:col-span-3">
                  <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bronze/40 bg-terracotta-dark text-bronze md:h-14 md:w-14">
                    <m.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="pt-2">
                    <div className="font-mono text-xs text-bronze md:text-sm">
                      {m.time}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl font-light leading-tight text-cream md:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-cream/75">
                    {m.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 border-t border-bronze/25 pt-8 text-center"
        >
          <p className="mx-auto max-w-2xl text-base italic leading-relaxed text-cream/70 md:text-lg">
            « Le programme, c'est qu'il n'y a pas vraiment de programme. Tout
            le monde fait son rythme — et c'est pour ça que les familles
            reviennent. »
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-bronze">
            — Faouzi Sahraoui, hôte
          </p>
        </motion.div>
      </div>
    </section>
  );
}
