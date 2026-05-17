"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * 07 · Réservation — closing CTA.
 *
 * Restrained. No big shouty button. A confident sentence, a hairline rule,
 * a single action. The brand mark at the bottom acts as a seal/signature.
 */
export function ReservationCta({ locale }: { locale: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-noir text-cream">
      <div className="absolute inset-0 -z-10">
        <div className="photo-zone absolute inset-0" />
        <div className="absolute inset-0 bg-noir-vignette opacity-80" />
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
            <div className="eyebrow">
              <span className="me-3 h-px w-12 bg-bronze/60" />
              Vingt-cinq hectares vous attendent
              <span className="ms-3 h-px w-12 bg-bronze/60" />
            </div>

            <h2 className="display-serif text-cream" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: 300 }}>
              Choisissez
              <span className="block italic text-bronze">vos nuits.</span>
            </h2>

            <p className="mx-auto max-w-xl text-cream/70 md:text-lg">
              Réservation en moins de trois minutes. Confirmation par WhatsApp.
              Paiement par BaridiMob ou carte CIB. Code QR à l'arrivée — qui
              fonctionne, même sans réseau.
            </p>

            <div className="flex flex-col items-center gap-6 pt-4">
              <Link
                href={`/${locale}/reservation`}
                className="group relative inline-flex items-center gap-4 rounded-full border border-bronze/80 bg-bronze px-10 py-4 text-sm uppercase tracking-widest text-noir transition hover:bg-cream hover:border-cream"
              >
                Commencer la réservation
                <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">→</span>
              </Link>

              <Link
                href={`/${locale}/restaurant`}
                className="text-xs uppercase tracking-widest text-cream/50 hover:text-cream/80"
              >
                Ou réserver seulement la table
              </Link>
            </div>

            {/* Seal as signature */}
            <div className="flex justify-center pt-12">
              <BrandMark
                variant="mark"
                tone="bronze"
                className="h-8 w-8 opacity-60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
