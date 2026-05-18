import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WhatsAppBookingForm } from "@/components/whatsapp/WhatsAppBookingForm";
import { BrandMark } from "@/components/brand/BrandMark";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<Locale, { eyebrow: string; title1: string; title2: string; intro: string; back: string }> = {
  fr: {
    eyebrow: "Réservation rapide · WhatsApp",
    title1: "Préparons votre message",
    title2: "ensemble.",
    intro:
      "Remplissez ces quelques champs. À l'étape suivante, votre message s'ouvrira dans WhatsApp — déjà formaté, déjà adressé au bon numéro. Vous gardez la main jusqu'à l'envoi.",
    back: "Retour à la réservation classique",
  },
  en: {
    eyebrow: "Quick booking · WhatsApp",
    title1: "Let's draft your message",
    title2: "together.",
    intro:
      "Fill in these few fields. On the next step, your message will open in WhatsApp — already formatted, already addressed to the right number. You're in control until you hit send.",
    back: "Back to the full booking flow",
  },
  ar: {
    eyebrow: "حجز سريع · واتساب",
    title1: "لنحضّر رسالتك",
    title2: "معًا.",
    intro:
      "املأ هذه الحقول القليلة. في الخطوة التالية ستُفتح رسالتك في واتساب — جاهزة الصياغة، موجّهة إلى الرقم الصحيح. القرار الأخير قبل الإرسال يبقى لك.",
    back: "العودة إلى الحجز الكامل",
  },
};

export default function WhatsAppReservationPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const c = COPY[params.lang];

  return (
    <div className="bg-sunlit-noon text-terracotta">
      <div className="container max-w-6xl py-14 md:py-20">
        <Link
          href={`/${params.lang}/reservation`}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-clay-700 hover:text-terracotta"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {c.back}
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-9">
            <div className="mb-5 flex items-center gap-3">
              <BrandMark variant="mark" tone="bronze" className="h-7 w-7" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-clay-700">
                {c.eyebrow}
              </span>
            </div>
            <h1
              className="font-serif text-terracotta"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.025em",
                fontWeight: 300,
              }}
            >
              {c.title1}
              <span className="block italic text-clay-600">{c.title2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-terracotta/70 md:text-lg">
              {c.intro}
            </p>
          </div>
        </header>

        <div className="mt-14 md:mt-20">
          <WhatsAppBookingForm locale={params.lang} />
        </div>
      </div>
    </div>
  );
}
