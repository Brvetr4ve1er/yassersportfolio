import type { Metadata } from "next";
import { LagoonMapView } from "@/components/map/LagoonMapView";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  { eyebrow: string; title: string; intro: string; offline: string }
> = {
  fr: {
    eyebrow: "Plan du lagon · Bouchaoui",
    title: "Le lagon, vu du ciel.",
    intro:
      "Toutes les zones d'Oxygen Island réunies sur un plan illustré, dessiné à la main. Touchez un point pour en découvrir l'ambiance, les horaires et la réservation.",
    offline: "Fonctionne hors-ligne",
  },
  en: {
    eyebrow: "Lagoon map · Bouchaoui",
    title: "The lagoon, from above.",
    intro:
      "Every corner of Oxygen Island gathered on one hand-drawn illustrated plan. Tap a point to reveal its vibe, its hours and how to book.",
    offline: "Works offline",
  },
  ar: {
    eyebrow: "خريطة البحيرة · بوشاوي",
    title: "البحيرة، من الأعلى.",
    intro:
      "كل أركان جزيرة أوكسجين مجتمعة في مخطّط توضيحي مرسوم باليد. المس أيّ نقطة لاكتشاف أجوائها وتوقيتها وكيفية الحجز.",
    offline: "يعمل دون اتصال",
  },
};

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const c = COPY[params.lang] ?? COPY.fr;
  return {
    title: `${c.title} · Oxygen Island DZ`,
    description: c.intro,
  };
}

export default function CartePage({ params }: { params: { lang: Locale } }) {
  const c = COPY[params.lang] ?? COPY.fr;

  return (
    <div className="bg-gradient-to-b from-sand-50 via-background to-background">
      <div className="container py-14 md:py-20">
        {/* Editorial header */}
        <header className="max-w-3xl">
          <div className="eyebrow mb-5">
            <span className="h-px w-8 bg-lagoon-300/70" />
            {c.eyebrow}
          </div>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
          >
            {c.title}
          </h1>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start">
            <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {c.intro}
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-lagoon-300/40 bg-lagoon-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-lagoon-700">
              <span aria-hidden="true">⚡</span>
              {c.offline}
            </span>
          </div>
        </header>

        {/* The illustrated aerial map */}
        <div className="mt-10 md:mt-14">
          <LagoonMapView locale={params.lang} />
        </div>
      </div>
    </div>
  );
}
