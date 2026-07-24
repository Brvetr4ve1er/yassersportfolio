"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    l1: string;
    l2: string;
    l3a: string;
    l3b: string;
    lede: string;
    cta1: string;
    cta2: string;
    welcomeStrip: string;
    bottomNote: string;
  }
> = {
  fr: {
    eyebrow: "1ère plage artificielle d'Alger · Forêt de Bouchaoui",
    l1: "Un lagon",
    l2: "caché",
    l3a: "dans la",
    l3b: "forêt.",
    lede:
      "À quinze minutes du centre d'Alger, niché dans la pinède de Bouchaoui — une plage artificielle, un lagon d'eau claire, des cabanas à l'ombre des palmiers. Ouvert tous les jours, de 10h à 19h30.",
    cta1: "Réserver un pass",
    cta2: "Voir les cabanas",
    welcomeStrip: "Bienvenue · Welcome · أهلًا",
    bottomNote: "Pass journée · cabanas privatives · soirées DJ · animations enfants",
  },
  en: {
    eyebrow: "Algiers' first artificial beach · Bouchaoui forest",
    l1: "A lagoon",
    l2: "hidden",
    l3a: "in the",
    l3b: "forest.",
    lede:
      "Fifteen minutes from central Algiers, tucked into the Bouchaoui pinewoods — an artificial beach, a clear-water lagoon, cabanas in palm shade. Open daily, 10 am to 7:30 pm.",
    cta1: "Book a day pass",
    cta2: "See the cabanas",
    welcomeStrip: "Welcome · Bienvenue · أهلًا",
    bottomNote: "Day passes · private cabanas · DJ nights · kids' Fridays",
  },
  ar: {
    eyebrow: "أوّل شاطئ اصطناعي في الجزائر · غابة بوشاوي",
    l1: "بحيرة",
    l2: "مخفية",
    l3a: "في قلب",
    l3b: "الغابة.",
    lede:
      "على بُعد خمس عشرة دقيقة من وسط الجزائر، في صنوبر بوشاوي — شاطئ اصطناعي، بحيرة بمياه صافية، كابانات في ظلّ النخيل. مفتوح يوميًا من 10:00 إلى 19:30.",
    cta1: "احجز تذكرة اليوم",
    cta2: "اعرض الكابانات",
    welcomeStrip: "أهلًا · Bienvenue · Welcome",
    bottomNote: "تذاكر يومية · كابانات خاصة · سهرات دي جاي · أنشطة للأطفال",
  },
};

export function CinematicHero({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden bg-deepwater text-sand">
      {/* ── Backdrop — lagoon water with palm-canopy frame ───────── */}
      <div className="absolute inset-0 -z-10">
        <div className="photo-lagoon ken-burns water-caustics absolute inset-0" />
        {/* Palm-canopy fade — top dark / bottom dark for legibility */}
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,22,26,0.85), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgba(6,22,26,0.92) 0%, rgba(6,22,26,0.4) 50%, transparent)",
          }}
        />
      </div>

      {/* ── Top chrome ─────────────────────────────────────────── */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden md:block"
        >
          <BrandMark variant="stamp" tone="sand" className="h-20 w-20 opacity-90" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
        >
          <span className="text-sand">01</span>
          <span className="h-px w-10 bg-sand/40" />
          <span className="text-sand/50">03</span>
          <span className="hidden items-center gap-1.5 text-[10px] text-lagoon-300 sm:inline-flex">
            <MapPin className="h-3 w-3" />
            36°45′N · 2°57′E
          </span>
        </motion.div>
      </div>

      <div className="flex-1" />

      {/* ── Stage type — huge stacked display ──────────────────── */}
      <div className="relative z-10 px-6 pb-28 md:px-12 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-lagoon-300"
        >
          <span className="h-px w-12 bg-lagoon-300/60" />
          {c.eyebrow}
        </motion.div>

        <div className="mb-12 max-w-[1200px]">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="block font-display font-semibold leading-[0.85] tracking-[-0.04em] text-sand"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              {c.l1}
            </span>
            <span
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="block font-display italic font-medium leading-[0.85] tracking-[-0.04em] text-lagoon-300"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              {c.l2}
            </span>
            <span
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="block font-display font-semibold leading-[0.85] tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
            >
              <span className="text-sand-stroke">{c.l3a}</span>{" "}
              <span className="italic text-lagoon-300">{c.l3b}</span>
            </span>
          </motion.h1>
        </div>

        {/* Glass-card overlay + welcome strip */}
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-x-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="md:col-span-7"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <p className="max-w-xl text-base leading-relaxed text-sand/85 md:text-lg">
                {c.lede}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/reservation?type=pass&id=pass-adult`}
                  className="group inline-flex items-center gap-3 rounded-full bg-coral px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-deepwater transition hover:bg-coral-light"
                >
                  <span>{c.cta1}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
                <Link
                  href={`/${locale}/reservation?type=cabana&id=cabana-lagoon`}
                  className="border-b border-sand/30 pb-0.5 text-[11px] uppercase tracking-[0.22em] text-sand/70 hover:border-sand hover:text-sand"
                >
                  {c.cta2}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="md:col-span-5 md:text-end"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-sand/55">
              {c.welcomeStrip}
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-lagoon-300">
              FR · EN · AR
            </div>
            <div className="mt-2 hidden text-[10px] text-sand/45 md:block">
              {c.bottomNote}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-sand/40"
        >
          <span>{locale === "ar" ? "اكتشف" : locale === "en" ? "Discover" : "Découvrir"}</span>
          <span className="block h-8 w-px bg-sand/30" />
        </motion.div>
      </div>
    </section>
  );
}
