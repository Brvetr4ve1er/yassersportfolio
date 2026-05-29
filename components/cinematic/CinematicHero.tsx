"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { StatBlock } from "@/components/ui/stat-block";

/**
 * CinematicHero — golden-hour atmospheric stage.
 *
 * Family-warm, not noir. Word-by-word reveal on the display headline.
 * Magnetic primary CTA. Trilingual welcome strip tells every visitor —
 * French, English, Arabic speaker — that this place was built for them.
 */
export function CinematicHero({ locale }: { locale: string }) {
  return (
    <section
      id="chapter-00"
      className="relative isolate flex min-h-[94vh] flex-col overflow-hidden bg-terracotta text-cream"
    >
      {/* Backdrop — warm photo zone with slow drift */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--orchard ken-burns absolute inset-0" />
        {/* Top warm fade for header legibility */}
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, rgba(40, 22, 14, 0.7) 0%, transparent 100%)",
          }}
        />
        {/* Bottom warm fade for typography legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgba(40, 22, 14, 0.92) 0%, rgba(40, 22, 14, 0.45) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Top meta row */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <BrandMark variant="mark" tone="bronze" className="h-9 w-9" />
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-[11px] uppercase tracking-[0.22em] text-bronze">
              L'Étoile de l'Est
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-cream/55">
              Maison familiale · depuis 1989
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/65"
        >
          <MapPin className="h-3 w-3 text-bronze" />
          <span className="hidden sm:inline">36°23′N · 6°56′E</span>
          <span className="hidden text-cream/30 sm:inline">·</span>
          <span>Ain Abid</span>
        </motion.div>
      </div>

      <div className="flex-1" />

      {/* Bottom — display block */}
      <div className="relative z-10 px-6 pb-16 md:px-12 md:pb-24">
        {/* Trilingual welcome strip — appears subtly above the display title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-bronze"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-bronze/50" />
            Bienvenue
          </span>
          <span className="text-cream/40">·</span>
          <span>Welcome</span>
          <span className="text-cream/40">·</span>
          <span className="font-arabic" dir="rtl">
            أهلًا بكم
          </span>
        </motion.div>

        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-9">
            <RevealText
              as="h1"
              className="display-serif text-stage text-cream"
              stagger={0.07}
              delay={0.2}
            >
              <span className="block">Trois générations,</span>
              <span className="block italic text-bronze">
                un seul ciel.
              </span>
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-8 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg"
            >
              Vingt-cinq hectares de vergers, d'écuries et de rires d'enfants —
              à trente minutes de Constantine, ouverts toute l'année à toutes
              les familles. Une vraie maison, pas un hôtel.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            className="md:col-span-3 md:text-end"
          >
            <div className="flex flex-col items-start gap-3 md:items-end">
              <MagneticButton
                href={`/${locale}/reservation`}
                strength={0.4}
                radius={120}
                className="group inline-flex items-center gap-3 rounded-full bg-bronze px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-terracotta transition-colors hover:bg-cream"
              >
                <span>Réserver vos nuits</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </MagneticButton>
              <Link
                href={`/${locale}/hebergement`}
                className="text-[10px] uppercase tracking-[0.22em] text-cream/55 hover:text-cream"
              >
                Voir les maisons
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule with stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-bronze/25 pt-7 sm:grid-cols-4"
        >
          {[
            { v: "25", l: "Hectares", s: "Vergers · écuries · piscine" },
            { v: "106", l: "Lits", s: "Pour familles & tribus" },
            { v: "12", l: "Activités", s: "Équitation à quad" },
            { v: "37", l: "Ans", s: "Ouvert depuis 1989" },
          ].map((s) => (
            <StatBlock
              key={s.l}
              value={s.v}
              label={s.l}
              sublabel={s.s}
              tone="dark"
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/45"
        >
          <span>Découvrir</span>
          <span className="block h-8 w-px bg-cream/30" />
        </motion.div>
      </div>
    </section>
  );
}
