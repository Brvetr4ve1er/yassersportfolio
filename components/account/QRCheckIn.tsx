"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { generateQrDataUrl } from "@/lib/qr/generate";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatDate } from "@/lib/i18n/format";
import type { Booking, Locale } from "@/types/domain";

export function QRCheckIn({ booking, locale }: { booking: Booking; locale: Locale }) {
  const { t } = useI18n();
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    const payload = JSON.stringify({
      ref: booking.reference,
      token: booking.qr_code_token,
      check_in: booking.check_in,
    });
    generateQrDataUrl(payload).then(setQr);
    try {
      localStorage.setItem(
        `etoile.qr.${booking.id}`,
        JSON.stringify({ reference: booking.reference, token: booking.qr_code_token }),
      );
    } catch {}
  }, [booking]);

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
      <h1 className="font-serif text-2xl font-semibold text-forest md:text-3xl">
        {t("account.qrCheckin.title")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("account.qrCheckin.subtitle")}
      </p>
      <div className="mt-6 rounded-2xl border border-gold/30 bg-card p-6 shadow-sm">
        {qr ? (
          <img src={qr} alt="QR" className="h-64 w-64" />
        ) : (
          <div className="h-64 w-64 animate-pulse rounded-lg bg-muted" />
        )}
        <div className="mt-3 font-mono text-xs text-muted-foreground">
          {booking.reference}
        </div>
        <div className="mt-1 text-sm">
          {t("account.qrCheckin.validFor", {
            date: formatDate(booking.check_in, locale),
          })}
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1 text-xs text-warning">
        <WifiOff className="h-3 w-3" />
        {t("account.qrCheckin.offlineNote")}
      </span>
    </div>
  );
}
