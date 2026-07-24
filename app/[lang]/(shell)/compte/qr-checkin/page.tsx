"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Loader2, WifiOff } from "lucide-react";
import { mockBookings } from "@/lib/data/mock";
import { generateQrDataUrl } from "@/lib/qr/generate";
import { formatDate } from "@/lib/i18n/format";
import { bookingProductName, toDateKey } from "@/components/booking/shared";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    instruction: string;
    reference: string;
    offline: string;
    empty: string;
    emptyCta: string;
  }
> = {
  fr: {
    eyebrow: "Check-in",
    title: "Votre QR d'entrée",
    instruction: "Présentez ce code à l'accueil pour accéder au lagon.",
    reference: "Référence",
    offline: "Fonctionne hors ligne — une fois affiché, aucune connexion n'est nécessaire à l'entrée.",
    empty: "Aucune réservation active à présenter.",
    emptyCta: "Réserver une journée",
  },
  en: {
    eyebrow: "Check-in",
    title: "Your entry QR",
    instruction: "Show this code at reception to access the lagoon.",
    reference: "Reference",
    offline: "Works offline — once displayed, no connection is needed at the entrance.",
    empty: "No active booking to display.",
    emptyCta: "Book a day",
  },
  ar: {
    eyebrow: "تسجيل الدخول",
    title: "رمز الدخول الخاص بك",
    instruction: "اعرض هذا الرمز عند الاستقبال للدخول إلى البحيرة.",
    reference: "المرجع",
    offline: "يعمل دون اتصال — بمجرد ظهوره لا حاجة لأي اتصال عند المدخل.",
    empty: "لا يوجد حجز نشط لعرضه.",
    emptyCta: "احجز يومًا",
  },
};

export default function QrCheckinPage({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const c = COPY[locale];
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const active = useMemo(() => {
    const todayKey = toDateKey(new Date());
    return [...mockBookings]
      .filter((b) => b.visit_date >= todayKey && b.status === "confirmed")
      .sort((a, b) => a.visit_date.localeCompare(b.visit_date))[0];
  }, []);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    const payload = JSON.stringify({
      token: active.qr_code_token,
      ref: active.reference,
      date: active.visit_date,
    });
    generateQrDataUrl(payload)
      .then((url) => {
        if (alive) setQrUrl(url);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [active]);

  if (!active) {
    return (
      <section className="bg-background">
        <div className="container flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-5 py-16 text-center">
          <p className="text-sm text-muted-foreground">{c.empty}</p>
          <Link
            href={`/${locale}/reservation`}
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-deepwater transition hover:bg-coral-light"
          >
            {c.emptyCta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <div className="container flex min-h-[calc(100vh-8rem)] max-w-md flex-col items-center justify-center py-10 text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-lagoon-700">{c.eyebrow}</span>
        <h1 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{c.instruction}</p>

        <div className="mt-8 w-full rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mx-auto flex aspect-square w-full max-w-[20rem] items-center justify-center rounded-2xl bg-sand-50 p-4">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrUrl} alt={active.reference} className="h-full w-full object-contain" />
            ) : (
              <Loader2 className="h-8 w-8 animate-spin text-lagoon-500" />
            )}
          </div>

          <div className="mt-6">
            <div className="font-display text-xl font-semibold tracking-wider text-foreground">
              {active.reference}
            </div>
            <div className="mt-1 font-medium text-foreground">{bookingProductName(active, locale)}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-lagoon-600" />
              {formatDate(active.visit_date, locale)}
            </div>
          </div>
        </div>

        <p className="mt-6 inline-flex max-w-xs items-center gap-2 rounded-xl bg-secondary/60 px-4 py-3 text-start text-xs text-ink-soft">
          <WifiOff className="h-4 w-4 shrink-0 text-lagoon-600" />
          {c.offline}
        </p>
      </div>
    </section>
  );
}
