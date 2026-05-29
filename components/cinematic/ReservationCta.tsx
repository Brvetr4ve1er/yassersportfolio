"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";

/**
 * 08 · Réservation — the closing invitation.
 *
 * Direct, family-targeted. Not "secure your stay" corporate language. The
 * promise is concrete: three minutes, WhatsApp confirmation, QR at the
 * gate. The brand mark signs the bottom like a seal.
 */

const PROMISES = [
  "Trois minutes pour réserver",
  "Confirmation WhatsApp au numéro de la famille",
  "Paiement BaridiMob ou carte CIB — pas de frais cachés",
  "Code QR à l'arrivée, même sans réseau",
  "Annulation gratuite jusqu'à 7 jours avant",
];

export function ReservationCta({ locale }: { locale: string }) {
  return (
    <section
      id="chapter-08"
      className="relative isolate overflow-hidden text-cream"
    >
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone photo-zone--orchard absolute inset-0 ken-burns" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(40, 22, 14, 0.85) 100%)",
          }}
        />
      </div>

      <div className="container py-32 md:py-44">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-bronze">
              <span className="h-px w-12 bg-bronze/60" />
              Vingt-cinq hectares vous attendent
              <span className="h-px w-12 bg-bronze/60" />
            </div>

            <RevealText
              as="h2"
              className="display-serif text-cream"
              stagger={0.06}
            >
              <span
                style={{
                  fontSize: "clamp(3rem, 8.5vw, 7rem)",
                  lineHeight: "0.92",
                  letterSpacing: "-0.03em",
                  fontWeight: 300,
                  display: "block",
                }}
              >
                Réservez les vacances
                <span className="block italic text-bronze">
                  qu'ils raconteront.
                </span>
              </span>
            </RevealText>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
              Une vraie maison vous attend, ouverte à toutes les familles
              algériennes — qu'elles viennent de Constantine, d'Alger, de
              Paris ou de plus loin encore.
            </p>

            {/* Promises */}
            <ul className="mx-auto inline-flex max-w-xl flex-col items-start gap-3 text-start">
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-cream/80"
                >
                  <Check className="h-4 w-4 shrink-0 text-bronze" />
                  {p}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-5 pt-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <MagneticButton
                  href={`/${locale}/reservation`}
                  strength={0.45}
                  radius={140}
                  className="group relative inline-flex items-center gap-3 rounded-full border border-bronze bg-bronze px-9 py-4 text-[11px] uppercase tracking-[0.22em] text-terracotta transition-colors hover:bg-cream hover:border-cream"
                >
                  Commencer la réservation
                  <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                    →
                  </span>
                </MagneticButton>

                <MagneticButton
                  href={`/${locale}/reservation/whatsapp`}
                  strength={0.35}
                  radius={120}
                  className="group relative inline-flex items-center gap-3 rounded-full border border-[#25d366]/60 bg-[#25d366]/15 px-9 py-4 text-[11px] uppercase tracking-[0.22em] text-[#7ee0a4] transition-colors hover:bg-[#25d366] hover:text-cream hover:border-[#25d366]"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  Réserver par WhatsApp
                </MagneticButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[0.22em] text-cream/55">
                <Link
                  href={`/${locale}/restaurant`}
                  className="hover:text-cream"
                >
                  Réserver seulement la table
                </Link>
                <span className="text-cream/30">·</span>
                <a
                  href="https://wa.me/213555000000"
                  className="hover:text-cream"
                >
                  WhatsApp +213 555 00 00 00
                </a>
              </div>
            </div>

            {/* Seal as signature */}
            <div className="flex flex-col items-center gap-2 pt-12">
              <BrandMark
                variant="mark"
                tone="bronze"
                className="h-9 w-9 opacity-70"
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-bronze/60">
                Maison Sahraoui · depuis 1989
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
