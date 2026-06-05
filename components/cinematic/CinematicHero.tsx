"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";

/**
 * CinematicHero — full-bleed atmospheric stage, edge-to-edge typography.
 *
 * Inspired by the Amwaj "Flow with it" hero (knockout type over photography,
 * numbered pagination, minimal chrome) and the Verdant glass-card overlay,
 * adapted to L'Étoile's warm terracotta + bronze + cream palette.
 *
 * Composition:
 *  · Full-bleed photo-zone backdrop with slow Ken-Burns drift
 *  · Top chrome: wordmark left · glass pill nav center · 01/03 pagination right
 *  · Center stage: huge stacked display with background-clip:text so the warm
 *    photo bleeds through the letters (the Amwaj move)
 *  · Bottom-left: translucent cream glass card with eyebrow + lede + pill CTA
 *  · Bottom-right: trilingual welcome strip (Bienvenue · Welcome · أهلًا)
 */
export function CinematicHero({ locale }: { locale: string }) {
  return (
    <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden bg-terracotta text-cream">
      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--orchard ken-burns absolute inset-0" />
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(40,22,14,0.78) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgba(40,22,14,0.92) 0%, rgba(40,22,14,0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Top chrome ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
        {/* Wordmark + provenance */}
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

        {/* Pagination — slide indicator, the Amwaj move */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
        >
          <span className="text-cream">01</span>
          <span className="h-px w-10 bg-cream/40" />
          <span className="text-cream/50">03</span>
          <span className="hidden items-center gap-1.5 text-[10px] tracking-[0.22em] text-bronze sm:inline-flex">
            <MapPin className="h-3 w-3" />
            36°23′N · 6°56′E
          </span>
        </motion.div>
      </div>

      <div className="flex-1" />

      {/* ── Stage type — huge stacked display ─────────────────────────── */}
      <div className="relative z-10 px-6 pb-28 md:px-12 md:pb-32">
        <div className="mb-12 max-w-[1200px]">
          <RevealText
            as="h1"
            className="display-serif text-cream"
            stagger={0.08}
            delay={0.3}
          >
            <span
              dir="ltr"
              className="block leading-[0.85] tracking-[-0.04em] text-cream/95"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              Trois
            </span>
            <span
              dir="ltr"
              className="block italic leading-[0.85] tracking-[-0.04em] text-bronze"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              générations,
            </span>
            <span
              dir="ltr"
              className="block leading-[0.85] tracking-[-0.04em] text-cream"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              <span className="text-clay-stroke">un seul</span>{" "}
              <span className="italic text-bronze">ciel.</span>
            </span>
          </RevealText>
        </div>

        {/* Glass card overlay (Verdant move) + trilingual strip */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-x-10">
          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="md:col-span-7"
          >
            <div className="glass-card group relative overflow-hidden rounded-2xl p-6 md:p-8">
              <div className="mb-3 flex items-center gap-3 text-eyebrow text-bronze">
                <span className="h-px w-10 bg-bronze/60" />
                Maison ouverte · Ain Abid
              </div>
              <p className="max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
                Vingt-cinq hectares de vergers, d'écuries et de rires d'enfants
                — à trente minutes de Constantine, ouverts toute l'année à
                toutes les familles. Une vraie maison, pas un hôtel.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href={`/${locale}/reservation`}
                  strength={0.4}
                  radius={120}
                  className="group inline-flex items-center gap-3 rounded-full bg-bronze px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-terracotta-dark transition-colors hover:bg-cream"
                >
                  <span>Réserver vos nuits</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </MagneticButton>
                <Link
                  href={`/${locale}/hebergement`}
                  className="border-b border-cream/30 pb-0.5 text-[11px] uppercase tracking-[0.22em] text-cream/70 hover:border-cream hover:text-cream"
                >
                  Voir les maisons
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Trilingual welcome strip */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            className="md:col-span-5 md:text-end"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-cream/55">
              Bienvenue · Welcome ·{" "}
              <span className="font-arabic text-[11px]" dir="rtl">
                أهلًا بكم
              </span>
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-bronze">
              FR · EN · AR
            </div>
            <div className="mt-2 hidden text-[10px] text-cream/45 md:block">
              Réservation simple · paiement BaridiMob ou CIB · confirmation
              WhatsApp · QR à l'arrivée même hors-ligne
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cream/40"
        >
          <span>Découvrir</span>
          <span className="block h-8 w-px bg-cream/30" />
        </motion.div>
      </div>
    </section>
  );
}
