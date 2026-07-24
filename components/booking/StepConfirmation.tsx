"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarPlus, Check, Loader2, MessageCircle, PartyPopper } from "lucide-react";
import { computeTotal } from "@/lib/booking/pricing";
import { generateBookingReference } from "@/lib/utils";
import { generateQrDataUrl } from "@/lib/qr/generate";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";
import type { PaymentMethod } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { BookingSummary } from "./BookingSummary";
import { draftProductName, isQuoteOnly } from "./shared";

const COPY: Record<
  Locale,
  {
    badge: string;
    title: string;
    lede: string;
    reference: string;
    scan: string;
    payment: string;
    payLabels: Record<PaymentMethod, string>;
    addCalendar: string;
    whatsapp: string;
    note: string;
    quoteNote: string;
    calTitle: string;
    calLocation: string;
    restart: string;
    restartHint: string;
  }
> = {
  fr: {
    badge: "Réservation enregistrée",
    title: "À très vite au lagon !",
    lede: "Conservez votre référence et présentez le QR code à l'entrée. Une confirmation WhatsApp vous sera envoyée.",
    reference: "Référence",
    scan: "Présentez ce code à l'entrée",
    payment: "Paiement",
    payLabels: { baridi: "BaridiMob", cib: "Carte CIB / Edahabia", cash: "Sur place" },
    addCalendar: "Ajouter au calendrier",
    whatsapp: "Confirmer par WhatsApp",
    note: "Votre place est tenue. Nous vous confirmons les détails par WhatsApp dans les meilleurs délais.",
    quoteNote: "Notre équipe vous recontacte par WhatsApp pour finaliser le devis de votre privatisation.",
    calTitle: "Oxygen Island DZ",
    calLocation: "Oxygen Island DZ, Forêt de Bouchaoui, Alger",
    restart: "Commencer une réservation",
    restartHint: "Aucune réservation en cours.",
  },
  en: {
    badge: "Booking saved",
    title: "See you at the lagoon!",
    lede: "Keep your reference and show the QR code at the entrance. A WhatsApp confirmation will follow.",
    reference: "Reference",
    scan: "Show this code at the entrance",
    payment: "Payment",
    payLabels: { baridi: "BaridiMob", cib: "CIB / Edahabia card", cash: "On site" },
    addCalendar: "Add to calendar",
    whatsapp: "Confirm on WhatsApp",
    note: "Your spot is held. We'll confirm the details on WhatsApp shortly.",
    quoteNote: "Our team will reach out on WhatsApp to finalize your privatization quote.",
    calTitle: "Oxygen Island DZ",
    calLocation: "Oxygen Island DZ, Bouchaoui forest, Algiers",
    restart: "Start a booking",
    restartHint: "No booking in progress.",
  },
  ar: {
    badge: "تم حفظ الحجز",
    title: "نراكم قريبًا في البحيرة!",
    lede: "احتفظ برقم حجزك واعرض رمز QR عند المدخل. سيصلك تأكيد عبر واتساب.",
    reference: "المرجع",
    scan: "اعرض هذا الرمز عند المدخل",
    payment: "الدفع",
    payLabels: { baridi: "بريدي موب", cib: "بطاقة CIB / الذهبية", cash: "في المكان" },
    addCalendar: "أضف إلى التقويم",
    whatsapp: "التأكيد عبر واتساب",
    note: "مكانك محجوز. سنؤكّد التفاصيل عبر واتساب في أقرب وقت.",
    quoteNote: "سيتواصل فريقنا عبر واتساب لإتمام عرض الحجز الخاص بك.",
    calTitle: "أوكسيجن آيلاند",
    calLocation: "أوكسيجن آيلاند، غابة بوشاوي، الجزائر",
    restart: "ابدأ حجزًا",
    restartHint: "لا يوجد حجز جارٍ.",
  },
};

function buildIcs(opts: {
  ref: string;
  title: string;
  date: string;
  description: string;
  location: string;
}): string {
  const day = opts.date.replace(/-/g, "");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Oxygen Island DZ//Booking//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${opts.ref}@oxygenisland.dz`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T100000`,
    `DTEND:${day}T193000`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description}`,
    `LOCATION:${opts.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function StepConfirmation({ locale, draft }: { locale: Locale; draft: BookingDraft }) {
  const c = COPY[locale];
  const [reference] = useState(() => generateBookingReference());
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const posted = useRef(false);

  const total = computeTotal(draft);
  const quote = isQuoteOnly(draft);
  const productName = draftProductName(draft, locale);
  const qrToken = `qr-${reference}`;

  // Build QR image from a compact check-in payload.
  useEffect(() => {
    if (!draft.product) return;
    const payload = JSON.stringify({
      ref: reference,
      name: draft.fullName,
      date: draft.visitDate,
      product: draft.product,
    });
    let alive = true;
    generateQrDataUrl(payload)
      .then((url) => {
        if (alive) setQrUrl(url);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [reference, draft.product, draft.fullName, draft.visitDate]);

  // Persist the booking once. The /api/bookings endpoint is owned by another
  // agent — we fire-and-forget and never block confirmation on it.
  useEffect(() => {
    if (posted.current || !draft.product) return;
    posted.current = true;
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        product: draft.product,
        pass_id: draft.passId,
        cabana_id: draft.cabanaId,
        event_id: draft.eventId,
        visit_date: draft.visitDate,
        adults: draft.adults,
        children: draft.children,
        total_price: total,
        payment_method: draft.paymentMethod,
        full_name: draft.fullName,
        phone: draft.phone,
        special_requests: draft.specialRequests || null,
        qr_code_token: qrToken,
        lang: locale,
      }),
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadIcs = () => {
    if (!draft.visitDate) return;
    const ics = buildIcs({
      ref: reference,
      title: `${c.calTitle} — ${productName}`,
      date: draft.visitDate,
      description: `${c.reference}: ${reference}`,
      location: c.calLocation,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oxygen-island-${reference}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!draft.product) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-sm text-muted-foreground">{c.restartHint}</p>
        <Button variant="coral" className="mt-4" asChild>
          <Link href={`/${locale}/reservation?step=1`}>{c.restart}</Link>
        </Button>
      </div>
    );
  }

  const whatsappHref = `/${locale}/reservation/whatsapp?ref=${encodeURIComponent(reference)}`;

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <PartyPopper className="h-7 w-7" />
        </span>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-success">
          <Check className="h-3.5 w-3.5" />
          {c.badge}
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.lede}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* QR + reference */}
        <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.reference}
          </div>
          <div className="mt-1 font-display text-2xl font-semibold tracking-wider text-foreground">
            {reference}
          </div>
          <div className="mt-5 flex h-52 w-52 items-center justify-center rounded-xl bg-sand-50 p-3">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrUrl} alt={reference} className="h-full w-full object-contain" />
            ) : (
              <Loader2 className="h-6 w-6 animate-spin text-lagoon-500" />
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{c.scan}</p>
        </div>

        {/* Summary + payment */}
        <div className="space-y-4">
          <BookingSummary draft={draft} locale={locale} />
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
            <span className="text-sm text-muted-foreground">{c.payment}</span>
            <span className="text-sm font-medium text-foreground">
              {draft.paymentMethod ? c.payLabels[draft.paymentMethod] : "—"}
              {!quote ? ` · ${formatCurrency(total, locale)}` : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="default" onClick={downloadIcs} className="gap-2">
          <CalendarPlus className="h-4 w-4" />
          {c.addCalendar}
        </Button>
        <Button variant="outline" asChild className="gap-2 border-palm-400/50 text-palm-600 hover:bg-palm-50">
          <Link href={whatsappHref}>
            <MessageCircle className="h-4 w-4" />
            {c.whatsapp}
          </Link>
        </Button>
      </div>

      <p className="mx-auto mt-6 max-w-lg rounded-xl border border-lagoon-300/40 bg-lagoon-50/60 px-4 py-3 text-center text-xs text-lagoon-800">
        {quote ? c.quoteNote : c.note}
      </p>
    </div>
  );
}
