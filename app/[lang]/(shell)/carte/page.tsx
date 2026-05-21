import { ComplexMapView } from "@/components/map/ComplexMapView";
import { BrandMark } from "@/components/brand/BrandMark";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  { eyebrow: string; title1: string; title2: string; intro: string; offline: string }
> = {
  fr: {
    eyebrow: "Plan du domaine · 25 hectares",
    title1: "Le complexe,",
    title2: "à vol d'oiseau.",
    intro:
      "Une carte illustrée des vingt-cinq hectares. Touchez chaque lieu pour découvrir ce qui s'y passe — horaires, descriptions, et pour les hébergements, accès direct à la réservation.",
    offline: "Cette carte fonctionne hors ligne. Présentez-la à votre arrivée.",
  },
  en: {
    eyebrow: "Estate map · 25 hectares",
    title1: "The estate,",
    title2: "from above.",
    intro:
      "An illustrated map of the twenty-five hectares. Tap any spot to discover what happens there — hours, descriptions, and for accommodations, direct access to booking.",
    offline: "This map works offline. Open it on arrival.",
  },
  ar: {
    eyebrow: "خريطة المركّب · 25 هكتار",
    title1: "المركّب،",
    title2: "من الأعلى.",
    intro:
      "خريطة مرسومة للخمسة وعشرين هكتارًا. اضغط على أي موقع لاكتشاف ما يحدث فيه — الأوقات، الوصف، وللإقامات، حجز مباشر.",
    offline: "تعمل هذه الخريطة دون اتصال. أبرزها عند الوصول.",
  },
};

export default function MapPage({ params }: { params: { lang: Locale } }) {
  const c = COPY[params.lang];

  return (
    <div className="bg-sunlit-noon text-terracotta">
      <div className="container max-w-7xl py-14 md:py-20">
        <header className="mb-12 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <BrandMark variant="mark" tone="bronze" className="h-7 w-7" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-clay-700">
                {c.eyebrow}
              </span>
            </div>
            <h1
              className="font-serif text-terracotta"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              {c.title1}
              <span className="block italic text-clay-600">{c.title2}</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:text-end">
            <p className="max-w-md text-base leading-relaxed text-terracotta/70 md:ms-auto">
              {c.intro}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-clay-700">
              ⚡ {c.offline}
            </p>
          </div>
        </header>

        <ComplexMapView locale={params.lang} />
      </div>
    </div>
  );
}
