"use client";

import { motion } from "framer-motion";

/**
 * 06 · Hôtes — testimonials as editorial pull-quotes, not "cards with stars."
 * Each quote occupies its own row, named, dated, located.
 */

const QUOTES = [
  {
    body:
      "Mes enfants n'ont pas voulu rentrer le dimanche soir. La gentillesse de l'équipe écurie est rare. Nous reviendrons à l'automne.",
    name: "Karim B.",
    location: "Alger",
    date: "Juin 2026",
  },
  {
    body:
      "On nous a accueillis comme dans une vieille maison de famille — sans cérémonie, mais avec attention. Le chalet sentait le bois et la cire.",
    name: "Lila M.",
    location: "Constantine",
    date: "Mars 2026",
  },
  {
    body:
      "Forfait week-end : la formule la plus honnête que j'aie trouvée en Algérie. Bravo. La table seule vaut le voyage.",
    name: "Yacine S.",
    location: "Annaba",
    date: "Mai 2026",
  },
];

export function CinematicTestimonials() {
  return (
    <section className="relative bg-noir py-32 text-cream md:py-44">
      <div className="container">
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="chapter-num">06</span>
            <span className="h-px w-12 bg-bronze/40" />
            <span className="eyebrow">Les hôtes</span>
          </div>
          <h2 className="display-serif text-cinema text-cream">
            Ils ont <em className="text-bronze">passé</em> la nuit ici.
          </h2>
        </div>

        <div className="divide-y divide-bronze/20">
          {QUOTES.map((q, idx) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid gap-6 py-10 md:grid-cols-12 md:gap-x-12 md:py-14"
            >
              <div className="md:col-span-3">
                <div className="font-serif text-7xl font-light leading-none text-bronze/50">
                  &ldquo;
                </div>
                <figcaption className="mt-4">
                  <div className="font-serif text-lg text-cream">{q.name}</div>
                  <div className="mt-1 text-eyebrow text-cream/40">
                    {q.location} · {q.date}
                  </div>
                </figcaption>
              </div>
              <blockquote className="md:col-span-9">
                <p
                  className="font-serif font-light italic text-cream"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                    lineHeight: "1.25",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {q.body}
                </p>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
