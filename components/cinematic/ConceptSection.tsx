"use client";

import { motion } from "framer-motion";
import { Waves, TreePine, Sun } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    index: string;
    eyebrow: string;
    title1: string;
    title2: string;
    body: string;
    pillars: { icon: typeof Waves; title: string; body: string }[];
  }
> = {
  fr: {
    index: "01",
    eyebrow: "Le concept",
    title1: "Une mer,",
    title2: "loin de la mer.",
    body:
      "Oxygen Island, c'est l'idée simple d'avoir apporté la plage là où il n'y en a jamais eu : au pied des pins de Bouchaoui, à un quart d'heure d'Alger. Un lagon d'eau claire, du sable fin, des palmiers, un bar — et tout autour, la forêt qui filtre l'été algérois.",
    pillars: [
      {
        icon: Waves,
        title: "Lagon",
        body:
          "1200 m² de bassin imitant la mer, eau filtrée en continu, fond progressif pour les enfants.",
      },
      {
        icon: TreePine,
        title: "Forêt",
        body:
          "La pinède de Bouchaoui filtre la lumière, baisse la température de 4°C et coupe le bruit de la ville.",
      },
      {
        icon: Sun,
        title: "Toute la journée",
        body:
          "De 10h à 19h30 : petit-déjeuner, déjeuner grillades, snack, glaces, cocktails sans alcool — tout sur place.",
      },
    ],
  },
  en: {
    index: "01",
    eyebrow: "The concept",
    title1: "A sea,",
    title2: "far from the sea.",
    body:
      "Oxygen Island is a simple idea taken seriously: build a beach where there was none, at the foot of the Bouchaoui pinewoods, fifteen minutes from central Algiers. A clear-water lagoon, fine sand, palms, a bar — and all around, the forest filtering Algiers' summer.",
    pillars: [
      {
        icon: Waves,
        title: "Lagoon",
        body:
          "1,200 m² of sea-imitation pool, continuously filtered, with a gradual depth that suits children.",
      },
      {
        icon: TreePine,
        title: "Forest",
        body:
          "The Bouchaoui pinewoods filter the light, drop the temperature by 4°C and cut the city noise.",
      },
      {
        icon: Sun,
        title: "All day",
        body:
          "10 am to 7:30 pm: breakfast, grilled lunch, snacks, ice cream, mocktails — everything on site.",
      },
    ],
  },
  ar: {
    index: "01",
    eyebrow: "المفهوم",
    title1: "بحرٌ،",
    title2: "بعيدًا عن البحر.",
    body:
      "نجمة الأوكسجين فكرة بسيطة تمّ تنفيذها بجدّية: بناء شاطئ حيث لم يكن، عند أقدام صنوبر بوشاوي، على بُعد خمس عشرة دقيقة من وسط الجزائر. بحيرة بمياه صافية، رمل ناعم، نخيل، وحانة — ومن حولها كلّها، الغابة التي تُلطّف صيف العاصمة.",
    pillars: [
      {
        icon: Waves,
        title: "البحيرة",
        body:
          "1200 م² من حوض يحاكي البحر، مياه مفلترة باستمرار، عمق متدرّج مناسب للأطفال.",
      },
      {
        icon: TreePine,
        title: "الغابة",
        body:
          "صنوبر بوشاوي يُرشّح الضوء، يخفّض الحرارة بـ 4 درجات، ويعزل ضجيج المدينة.",
      },
      {
        icon: Sun,
        title: "طوال اليوم",
        body:
          "من 10:00 إلى 19:30 : إفطار، غداء مشاوي، وجبات خفيفة، مثلجات، كوكتيلات بدون كحول — كلّه في المكان.",
      },
    ],
  },
};

export function ConceptSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <section
      id="concept"
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
              {c.body}
            </p>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-lagoon-300/15 md:grid-cols-3">
          {c.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-deepwater/95 p-8 backdrop-blur md:p-10"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-lagoon-300/15 text-lagoon-300">
                <p.icon className="h-4 w-4" />
              </div>
              <h3 className="font-display text-xl font-semibold text-sand">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sand/70">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
