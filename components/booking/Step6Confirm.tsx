"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";
import { generateQrDataUrl } from "@/lib/qr/generate";
import { generateBookingReference } from "@/lib/utils";
import { formatCurrency } from "@/lib/i18n/format";
import { LOYALTY_DISCOUNT_DZD } from "@/lib/booking/pricing";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale } from "@/types/domain";

export function Step6Confirm({
  draft,
  locale,
}: {
  draft: BookingDraft;
  locale: Locale;
}) {
  const { t } = useI18n();
  const [reference] = useState(() => generateBookingReference());
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const discount = draft.redeemLoyalty ? LOYALTY_DISCOUNT_DZD : 0;
  const total = Math.max(0, draft.totalPrice - discount);
  const earnedPoints = Math.floor(total / 100);

  useEffect(() => {
    const payload = JSON.stringify({
      ref: reference,
      name: draft.fullName,
      phone: draft.phone,
      type: draft.type,
      check_in: draft.checkIn,
      check_out: draft.checkOut,
      total,
    });
    generateQrDataUrl(payload).then(setQrDataUrl);
  }, [draft, reference, total]);

  useEffect(() => {
    if (submitted) return;
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, draft }),
    })
      .catch(() => {})
      .finally(() => setSubmitted(true));
  }, [submitted, reference, draft]);

  const downloadIcs = () => {
    const dt = draft.checkIn?.replace(/-/g, "") ?? "";
    const dtEnd = (draft.checkOut ?? draft.checkIn)?.replace(/-/g, "") ?? "";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Etoile de l'Est//FR",
      "BEGIN:VEVENT",
      `UID:${reference}@etoiledelest.dz`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART;VALUE=DATE:${dt}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:Séjour L'Étoile de l'Est`,
      `DESCRIPTION:Référence ${reference}`,
      "LOCATION:Ain Abid, Constantine, Algérie",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${reference}.ics`;
    a.click();
  };

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="font-serif text-3xl font-semibold text-forest">
        {t("booking.step6.title")}
      </h2>
      <p className="mt-2 text-muted-foreground">{t("booking.step6.subtitle")}</p>

      <div className="mt-8 inline-block rounded-2xl border border-gold/30 bg-card p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("booking.step6.reference")}
        </div>
        <div className="mt-1 font-mono text-xl font-semibold text-forest">
          {reference}
        </div>
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="QR"
            className="mx-auto mt-4 h-56 w-56 rounded-lg border border-border/60"
          />
        ) : (
          <div className="mx-auto mt-4 h-56 w-56 rounded-lg bg-muted" />
        )}
        <p className="mx-auto mt-3 max-w-xs text-xs text-muted-foreground">
          {t("booking.step6.qrInstructions")}
        </p>
      </div>

      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
        {qrDataUrl && (
          <Button asChild variant="outline">
            <a href={qrDataUrl} download={`${reference}.png`}>
              <Download className="h-4 w-4" />
              {t("booking.step6.downloadQr")}
            </a>
          </Button>
        )}
        <Button variant="outline" onClick={downloadIcs}>
          <CalendarPlus className="h-4 w-4" />
          {t("booking.step6.addCalendar")}
        </Button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {t("booking.step6.whatsapp", { phone: draft.phone })}
      </p>
      <p className="mt-2 text-sm text-gold">
        {t("booking.step6.loyaltyEarned", { points: earnedPoints })}
      </p>

      <div className="mt-2 text-sm text-muted-foreground">
        Total: <span className="font-medium text-forest">{formatCurrency(total, locale)}</span>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button asChild variant="gold">
          <Link href={`/${locale}/compte/reservations`}>Voir mes réservations</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={`/${locale}/reservation`}>{t("booking.step6.newBooking")}</Link>
        </Button>
      </div>
    </div>
  );
}
