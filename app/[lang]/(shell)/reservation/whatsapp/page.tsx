import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WhatsAppPlanner } from "@/components/whatsapp/WhatsAppPlanner";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import type { Locale } from "@/lib/i18n/config";

type PageStrings = {
  eyebrow: string;
  title: string;
  intro: string;
  back: string;
};

const STRINGS: Record<Locale, PageStrings> = {
  fr: {
    eyebrow: "Réservation rapide · WhatsApp",
    title: "Préparons votre message ensemble.",
    intro:
      "Pas de formulaire compliqué. Composez votre demande, vérifiez l'aperçu en direct, puis ouvrez WhatsApp pour l'envoyer à notre équipe. On vous confirme la disponibilité en quelques minutes.",
    back: "Retour à la réservation",
  },
  en: {
    eyebrow: "Quick booking · WhatsApp",
    title: "Let's prepare your message together.",
    intro:
      "No complicated form. Put your request together, check the live preview, then open WhatsApp to send it to our team. We'll confirm availability within minutes.",
    back: "Back to booking",
  },
  ar: {
    eyebrow: "حجز سريع · واتساب",
    title: "لنُحضّر رسالتك معًا.",
    intro:
      "لا استمارة معقّدة. جهّز طلبك، تحقّق من المعاينة المباشرة، ثم افتح واتساب لإرساله إلى فريقنا. سنؤكّد لك التوفّر خلال دقائق.",
    back: "العودة إلى الحجز",
  },
};

export default function WhatsAppBookingPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const s = STRINGS[locale];

  return (
    <div className="bg-background py-16 text-foreground sm:py-24">
      <div className="container">
        {/* Back link */}
        <Link
          href={`/${locale}/reservation`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-lagoon-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:scale-x-[-1] rtl:group-hover:translate-x-0.5" />
          {s.back}
        </Link>

        {/* Header block */}
        <header className="mt-8 max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-lagoon-200 bg-lagoon-50 px-4 py-1.5">
            <WhatsAppGlyph className="h-4 w-4 text-[#25d366]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-lagoon-700">
              {s.eyebrow}
            </span>
          </div>
          <h1
            className="font-display font-semibold leading-[1.02] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            {s.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {s.intro}
          </p>
        </header>

        {/* Planner */}
        <div className="mt-12 sm:mt-16">
          <WhatsAppPlanner locale={locale} />
        </div>
      </div>
    </div>
  );
}
