"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    index: string;
    eyebrow: string;
    title1: string;
    title2: string;
    lede: string;
    panels: { kicker: string; title: string; body: string; chips: string[] }[];
    cta: string;
    season: string;
  }
> = {
  fr: {
    index: "03",
    eyebrow: "Événements · Sunset & soirées",
    title1: "Quand le soleil",
    title2: "se couche.",
    lede:
      "À partir de 18h, l'eau prend la couleur du ciel. Vendredi animation famille, samedi soirée DJ, semaine privatisation possible pour anniversaires et événements d'entreprise.",
    panels: [
      {
        kicker: "Vendredi · jour",
        title: "Animation enfants",
        body:
          "Spectacle famille, mascottes, atelier glaces. Inclus dans le pass enfant.",
        chips: ["Familles", "Vendredi 15h", "Inclus"],
      },
      {
        kicker: "Samedi · soir",
        title: "Sunset DJ",
        body:
          "Coucher de soleil derrière la pinède, set DJ live, bar à mocktails. Réservation de table conseillée.",
        chips: ["18h–minuit", "Adultes & ados", "Sans alcool"],
      },
      {
        kicker: "Sur demande",
        title: "Privatisation",
        body:
          "Anniversaires, fiançailles, événements d'entreprise. Capacité 50–300 personnes selon configuration.",
        chips: ["Privé", "Devis sur mesure", "50–300 pers."],
      },
    ],
    cta: "Demander un devis",
    season: "Saison · mai à octobre",
  },
  en: {
    index: "03",
    eyebrow: "Events · Sunset sessions",
    title1: "When the sun",
    title2: "starts to dip.",
    lede:
      "From 6 pm the water turns the color of the sky. Friday family entertainment, Saturday DJ nights, weekday privatization for birthdays and corporate events.",
    panels: [
      {
        kicker: "Friday · daytime",
        title: "Kids' entertainment",
        body:
          "Family show, mascots, ice-cream workshop. Included in the child pass.",
        chips: ["Families", "Friday 3pm", "Included"],
      },
      {
        kicker: "Saturday · evening",
        title: "Sunset DJ",
        body:
          "Sun setting behind the pinewoods, live DJ set, mocktail bar. Table reservation recommended.",
        chips: ["6pm–midnight", "Adults & teens", "Alcohol-free"],
      },
      {
        kicker: "On request",
        title: "Privatization",
        body:
          "Birthdays, engagements, corporate events. Capacity 50–300 depending on configuration.",
        chips: ["Private", "Custom quote", "50–300 pax"],
      },
    ],
    cta: "Request a quote",
    season: "Season · May to October",
  },
  ar: {
    index: "03",
    eyebrow: "الفعاليات · غروب وسهرات",
    title1: "حين تميل",
    title2: "الشمس.",
    lede:
      "من السادسة مساءً، يتلوّن الماء بلون السماء. الجمعة أنشطة عائلية، السبت سهرة دي جاي، خلال الأسبوع إمكانية الحجز الخاص لأعياد الميلاد والفعاليات.",
    panels: [
      {
        kicker: "الجمعة · نهارًا",
        title: "أنشطة الأطفال",
        body: "عرض عائلي، شخصيات، ورشة المثلجات. مشمولة في تذكرة الطفل.",
        chips: ["العائلات", "الجمعة 15:00", "مشمول"],
      },
      {
        kicker: "السبت · مساءً",
        title: "Sunset DJ",
        body:
          "غروب الشمس خلف الصنوبر، عرض دي جاي مباشر، بار كوكتيلات بدون كحول. يُنصح بحجز طاولة.",
        chips: ["18:00 – منتصف الليل", "بالغون ومراهقون", "بدون كحول"],
      },
      {
        kicker: "حسب الطلب",
        title: "الحجز الخاص",
        body:
          "أعياد الميلاد، الخطوبة، فعاليات الشركات. سعة 50–300 شخص حسب التنظيم.",
        chips: ["خاص", "عرض مخصّص", "50–300 شخص"],
      },
    ],
    cta: "اطلب عرض سعر",
    season: "الموسم · من مايو إلى أكتوبر",
  },
};

export function SunsetSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <section
      id="evenements"
      className="relative isolate overflow-hidden text-sand"
    >
      <div className="absolute inset-0 -z-10">
        <div className="photo-sunset ken-burns absolute inset-0" />
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: "linear-gradient(to bottom, #0c2a30, transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to top, #0c2a30, transparent)",
          }}
        />
      </div>

      <div className="container py-32 md:py-44">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-coral-light">
            <span className="h-px w-10 bg-coral-light/60" />
            {c.eyebrow}
            <span className="h-px w-10 bg-coral-light/60" />
          </div>
          <h2
            className="font-display font-semibold leading-[0.92] tracking-[-0.03em] text-sand"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
          >
            {c.title1}
            <span className="block italic text-coral-light">{c.title2}</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand/85 md:text-lg">
            {c.lede}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-coral/20 md:grid-cols-3">
          {c.panels.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-deepwater/85 p-8 backdrop-blur md:p-10"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-coral-light">
                {p.kicker}
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-sand md:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-sand/80">
                {p.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-coral-light/85">
                {p.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-coral-light/40 px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-coral-light/60 bg-coral/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-coral-light backdrop-blur transition hover:border-coral-light hover:bg-coral hover:text-deepwater"
          >
            {c.cta}
            <span className="rtl:rotate-180">→</span>
          </Link>
          <span className="text-[10px] uppercase tracking-[0.22em] text-sand/55">
            {c.season}
          </span>
        </div>
      </div>
    </section>
  );
}
