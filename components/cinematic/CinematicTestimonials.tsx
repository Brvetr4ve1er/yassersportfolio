"use client";

import { motion } from "framer-motion";

/**
 * 07 · Les familles — testimonials as multi-generational voices.
 *
 * Three real-feeling Algerian family quotes. Not "I had a wonderful stay"
 * — but the kind of small specific things parents actually say after a
 * weekend that worked. Grandmother voice, father voice, mother voice.
 */

const FAMILIES = [
  {
    body:
      "Mes trois enfants n'ont pas voulu rentrer le dimanche soir. Le plus petit a monté un poney pour la première fois — il a quatre ans, il en parle encore. L'équipe de l'écurie est rare, vraiment rare.",
    name: "Famille Belkacem",
    detail: "Karim, père de trois enfants",
    location: "Alger",
    date: "Juin 2026",
    stay: "Chalet familial Olivier · 2 nuits",
  },
  {
    body:
      "Ma belle-mère m'a remerciée. C'est dire. Elle a passé deux jours sous l'olivier près de la piscine, sans bouger. Les enfants la rejoignaient pour le thé. Personne ne nous a regardés de travers parce qu'on était nombreux.",
    name: "Famille Mansouri",
    detail: "Lila, mère et hôte de famille élargie",
    location: "Constantine",
    date: "Mars 2026",
    stay: "Deux chalets · réunion familiale, 11 personnes",
  },
  {
    body:
      "Forfait week-end avec activités : la formule la plus honnête que j'aie trouvée en Algérie. Bravo. La table seule vaut le déplacement. Mon père, qui n'aime jamais rien, a dit que le couscous lui rappelait celui de sa mère. C'est un compliment qu'il n'a jamais fait deux fois dans sa vie.",
    name: "Famille Sahraoui",
    detail: "Yacine, organisateur du séjour familial",
    location: "Annaba",
    date: "Mai 2026",
    stay: "Forfait Famille Grande Évasion · 3 nuits",
  },
];

export function CinematicTestimonials() {
  return (
    <section className="relative bg-terracotta py-32 text-cream md:py-44">
      <div className="container">
        <div className="mb-20 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-bronze/70">
              07
            </span>
            <span className="h-px w-12 bg-bronze/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-bronze">
              Les familles
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
            Ce qu'ils ont
            <span className="block italic text-bronze">
              dit en repartant.
            </span>
          </h2>
        </div>

        <div className="divide-y divide-bronze/20">
          {FAMILIES.map((q, idx) => (
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
              className="grid gap-6 py-12 md:grid-cols-12 md:gap-x-12 md:py-16"
            >
              <div className="md:col-span-3">
                <div className="font-serif text-7xl font-light leading-none text-bronze/50">
                  &ldquo;
                </div>
                <figcaption className="mt-4 space-y-1">
                  <div className="font-serif text-lg text-cream">{q.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-bronze">
                    {q.detail}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-cream/45">
                    {q.location} · {q.date}
                  </div>
                  <div className="mt-3 max-w-[14rem] text-[10px] italic text-cream/40">
                    {q.stay}
                  </div>
                </figcaption>
              </div>
              <blockquote className="md:col-span-9">
                <p
                  className="font-serif font-light italic text-cream"
                  style={{
                    fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
                    lineHeight: "1.3",
                    letterSpacing: "-0.005em",
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
