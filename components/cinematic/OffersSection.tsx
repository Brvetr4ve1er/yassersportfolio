"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

type Offer = {
  plate: string;
  category: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  pitch: string;
  cta: string;
  variant: "lagoon" | "forest" | "sunset";
};

const COPY: Record<Locale, { index: string; eyebrow: string; title1: string; title2: string; lede: string; offers: Offer[] }> = {
  fr: {
    index: "02",
    eyebrow: "Les offres",
    title1: "Choisissez votre",
    title2: "journée.",
    lede:
      "Pass simple à la journée, cabana privative à l'ombre, ou table pour les soirées coucher de soleil — réservez à l'avance pour garantir votre place.",
    offers: [
      {
        plate: "I",
        category: "Pass journée",
        name: "Pass Adulte",
        price: "8 500 DA",
        unit: "/ personne",
        features: ["Accès lagon 10h–19h30", "Transat fourni", "Vestiaire & douches", "Bar & restauration sur place"],
        pitch: "Pour la journée. Solo, en couple, entre amis.",
        cta: "Réserver un pass",
        variant: "lagoon",
      },
      {
        plate: "II",
        category: "Famille",
        name: "Pass Enfant",
        price: "5 000 DA",
        unit: "/ enfant",
        features: ["Couloir débutant", "Maître-nageur", "Animation vendredi", "Glaces & jus offerts (-10 ans)"],
        pitch: "Pour les familles. Animations enfants chaque vendredi.",
        cta: "Réserver enfant",
        variant: "forest",
      },
      {
        plate: "III",
        category: "Privatif",
        name: "Cabana",
        price: "25 000 DA",
        unit: "/ cabana — 4 pers.",
        features: ["Espace privé à l'ombre", "Service au transat", "Glacière + boissons", "Réservation prioritaire"],
        pitch: "Pour les groupes. Cabana réservée à l'avance, premier service.",
        cta: "Réserver cabana",
        variant: "sunset",
      },
    ],
  },
  en: {
    index: "02",
    eyebrow: "Offers",
    title1: "Pick your",
    title2: "kind of day.",
    lede:
      "A simple day pass, a private cabana in the shade, or a sunset table — book ahead to lock in your spot.",
    offers: [
      {
        plate: "I",
        category: "Day pass",
        name: "Adult pass",
        price: "8,500 DA",
        unit: "/ person",
        features: ["Lagoon access 10am–7:30pm", "Sun lounger included", "Locker & showers", "Bar & food on site"],
        pitch: "For the day. Solo, couple, or friends.",
        cta: "Book a pass",
        variant: "lagoon",
      },
      {
        plate: "II",
        category: "Family",
        name: "Child pass",
        price: "5,000 DA",
        unit: "/ child",
        features: ["Beginner lane", "Lifeguard on duty", "Friday entertainment", "Free juice & ice cream (under 10)"],
        pitch: "For families. Friday kids' entertainment included.",
        cta: "Book a child pass",
        variant: "forest",
      },
      {
        plate: "III",
        category: "Private",
        name: "Cabana",
        price: "25,000 DA",
        unit: "/ cabana — 4 pers.",
        features: ["Private shaded area", "Lounger service", "Cooler + drinks", "Priority entry"],
        pitch: "For groups. Reserved ahead, first-in service.",
        cta: "Book a cabana",
        variant: "sunset",
      },
    ],
  },
  ar: {
    index: "02",
    eyebrow: "العروض",
    title1: "اختر يومك",
    title2: "كما تريد.",
    lede:
      "تذكرة يوم بسيطة، كابانا خاصة في الظلّ، أو طاولة لسهرات الغروب — احجز مسبقًا لضمان مكانك.",
    offers: [
      {
        plate: "I",
        category: "تذكرة اليوم",
        name: "بالغ",
        price: "8 500 دج",
        unit: "/ شخص",
        features: ["دخول البحيرة 10:00–19:30", "كرسي شاطئي مشمول", "خزانة ودش", "بار ومطعم في المكان"],
        pitch: "ليوم كامل. منفردًا، ثنائيًا، أو مع الأصدقاء.",
        cta: "احجز تذكرة",
        variant: "lagoon",
      },
      {
        plate: "II",
        category: "عائلة",
        name: "طفل",
        price: "5 000 دج",
        unit: "/ طفل",
        features: ["مسار للمبتدئين", "منقذ بحري", "ترفيه يوم الجمعة", "عصير ومثلجات مجانية (-10 سنوات)"],
        pitch: "للعائلات. أنشطة أطفال كل جمعة.",
        cta: "احجز للطفل",
        variant: "forest",
      },
      {
        plate: "III",
        category: "خاص",
        name: "كابانا",
        price: "25 000 دج",
        unit: "/ كابانا — 4 أشخاص",
        features: ["مساحة خاصة مظلّلة", "خدمة على الكرسي", "ثلاجة + مشروبات", "دخول أولوية"],
        pitch: "للمجموعات. محجوزة مسبقًا، خدمة الأولوية.",
        cta: "احجز كابانا",
        variant: "sunset",
      },
    ],
  },
};

const VARIANT_CLASS = {
  lagoon: "photo-lagoon",
  forest: "photo-forest",
  sunset: "photo-sunset",
} as const;

/**
 * Deep-links from the three offer cards (ordered identically in every
 * locale) into the booking wizard, pre-selecting product + specific option.
 *   0 → Pass Adulte · 1 → Pass Enfant · 2 → Cabana Lagon
 */
const OFFER_BOOKING = [
  { type: "pass", id: "pass-adult" },
  { type: "pass", id: "pass-child" },
  { type: "cabana", id: "cabana-lagoon" },
] as const;

export function OffersSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <section
      id="pass"
      className="relative bg-deepwater py-28 text-sand md:py-40"
    >
      <div className="container relative">
        <div className="mb-16 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-lagoon-300/80">
                {c.index}
              </span>
              <span className="h-px w-12 bg-lagoon-300/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-lagoon-300">
                {c.eyebrow}
              </span>
            </div>
            <h2
              className="font-display font-semibold leading-[0.95] tracking-[-0.025em] text-sand"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
            >
              {c.title1}
              <span className="block italic text-lagoon-300">{c.title2}</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-end">
            <p className="max-w-md text-base leading-relaxed text-sand/75 md:ms-auto md:text-lg">
              {c.lede}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {c.offers.map((o, i) => (
            <motion.article
              key={o.plate}
              id={i === 2 ? "cabanas" : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col overflow-hidden rounded-2xl bg-deepwater-light"
            >
              <div className={`relative aspect-[4/3] ${VARIANT_CLASS[o.variant]}`}>
                <span className="absolute end-5 top-5 font-display text-2xl font-light italic text-sand/90">
                  {o.plate}
                </span>
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,22,26,0.92) 0%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-lagoon-300">
                    {o.category}
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-sand">
                    {o.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-medium text-sand">
                    {o.price}
                  </span>
                  <span className="text-xs text-sand/55">{o.unit}</span>
                </div>
                <p className="text-sm italic text-sand/70">{o.pitch}</p>
                <ul className="flex-1 space-y-2 text-sm text-sand/75">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-lagoon-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/reservation?type=${OFFER_BOOKING[i]?.type ?? "pass"}&id=${OFFER_BOOKING[i]?.id ?? ""}`}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-coral px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] text-deepwater transition hover:bg-coral-light"
                >
                  {o.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1]" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-sand/55">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3 w-3 text-lagoon-300" />
            10h00 – 19h30 · tous les jours
          </span>
          <span className="text-sand/30">·</span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-3 w-3 text-lagoon-300" />
            Familles bienvenues
          </span>
        </div>
      </div>
    </section>
  );
}
