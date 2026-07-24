"use client";

import { useState } from "react";
import {
  Camera,
  ScanLine,
  Loader2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Users,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  bookingProductName,
  PRODUCT_COPY,
  STATUS_COPY,
  PAYMENT_COPY,
  statusBadgeVariant,
  paymentBadgeVariant,
  guestCount,
} from "@/components/admin/adminHelpers";
import { mockBookings } from "@/lib/data/mock";
import { formatDate } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Booking } from "@/types/domain";

/*
 * MOCK SCANNER — @zxing/browser is NOT a dependency of this project, so we
 * do not import it (an unresolved import would break the build for everyone).
 *
 * To wire a real camera scanner later:
 *   1. `npm i @zxing/browser`
 *   2. import { BrowserMultiFormatReader } from "@zxing/browser";
 *   3. On "start": const reader = new BrowserMultiFormatReader();
 *      reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
 *        if (result) resolveToken(result.getText());
 *      });
 *   4. Replace `pickDemoToken()` below with the real decoded token and match
 *      it against `mockBookings` (or a Supabase lookup) by `qr_code_token`.
 */

type ScanState = "idle" | "scanning" | "matched" | "notFound";

const COPY: Record<
  Locale,
  {
    lede: string;
    cameraOff: string;
    scanning: string;
    scan: string;
    scanUnknown: string;
    reset: string;
    matched: string;
    matchedSub: string;
    notFound: string;
    notFoundSub: string;
    guests: (n: number) => string;
    ref: string;
    demoNote: string;
  }
> = {
  fr: {
    lede: "Scannez le QR code du billet à l'entrée pour vérifier la réservation.",
    cameraOff: "Caméra en veille",
    scanning: "Lecture du code…",
    scan: "Scanner un billet",
    scanUnknown: "Simuler code inconnu",
    reset: "Nouveau scan",
    matched: "Billet valide",
    matchedSub: "Réservation trouvée et vérifiée.",
    notFound: "Billet introuvable",
    notFoundSub: "Aucune réservation ne correspond à ce code.",
    guests: (n) => `${n} personne${n > 1 ? "s" : ""}`,
    ref: "Référence",
    demoNote: "Démo — le scan simule la lecture d'un QR code.",
  },
  en: {
    lede: "Scan the ticket QR code at the entrance to verify the booking.",
    cameraOff: "Camera on standby",
    scanning: "Reading code…",
    scan: "Scan a ticket",
    scanUnknown: "Simulate unknown code",
    reset: "New scan",
    matched: "Valid ticket",
    matchedSub: "Booking found and verified.",
    notFound: "Ticket not found",
    notFoundSub: "No booking matches this code.",
    guests: (n) => `${n} guest${n > 1 ? "s" : ""}`,
    ref: "Reference",
    demoNote: "Demo — the scan simulates reading a QR code.",
  },
  ar: {
    lede: "امسح رمز QR للتذكرة عند المدخل للتحقق من الحجز.",
    cameraOff: "الكاميرا في وضع الاستعداد",
    scanning: "جارٍ قراءة الرمز…",
    scan: "مسح تذكرة",
    scanUnknown: "محاكاة رمز غير معروف",
    reset: "مسح جديد",
    matched: "تذكرة صالحة",
    matchedSub: "تم العثور على الحجز والتحقق منه.",
    notFound: "التذكرة غير موجودة",
    notFoundSub: "لا يوجد حجز يطابق هذا الرمز.",
    guests: (n) => `${n} أشخاص`,
    ref: "المرجع",
    demoNote: "عرض توضيحي — يحاكي المسح قراءة رمز QR.",
  },
};

export function QRScanner({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const [state, setState] = useState<ScanState>("idle");
  const [match, setMatch] = useState<Booking | null>(null);

  function resolveToken(token: string) {
    const found = mockBookings.find((b) => b.qr_code_token === token) ?? null;
    setMatch(found);
    setState(found ? "matched" : "notFound");
  }

  function runScan(known: boolean) {
    setState("scanning");
    setMatch(null);
    // Simulate the brief moment a real reader takes to lock onto a code.
    window.setTimeout(() => {
      if (known) {
        // A real scanner would hand us the decoded string here.
        resolveToken(mockBookings[0].qr_code_token);
      } else {
        resolveToken("qr-unknown-000");
      }
    }, 1100);
  }

  function reset() {
    setState("idle");
    setMatch(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Camera viewport */}
      <Card>
        <CardContent className="p-5">
          <p className="mb-4 text-sm text-ink-muted">{c.lede}</p>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-deepwater">
            {/* Placeholder "video" surface */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sand/70">
              {state === "scanning" ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-lagoon-300" />
                  <span className="text-xs uppercase tracking-[0.2em]">
                    {c.scanning}
                  </span>
                </>
              ) : (
                <>
                  <Camera className="h-8 w-8 text-sand/40" />
                  <span className="text-xs uppercase tracking-[0.2em]">
                    {c.cameraOff}
                  </span>
                </>
              )}
            </div>

            {/* Reticle */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <span className="absolute left-0 top-0 h-6 w-6 rounded-tl-md border-l-2 border-t-2 border-lagoon-300" />
                <span className="absolute right-0 top-0 h-6 w-6 rounded-tr-md border-r-2 border-t-2 border-lagoon-300" />
                <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-md border-b-2 border-l-2 border-lagoon-300" />
                <span className="absolute bottom-0 right-0 h-6 w-6 rounded-br-md border-b-2 border-r-2 border-lagoon-300" />
                {state === "scanning" ? (
                  <ScanLine className="absolute inset-x-0 top-1/2 mx-auto h-6 w-6 -translate-y-1/2 animate-pulse text-lagoon-300" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {state === "matched" || state === "notFound" ? (
              <Button type="button" variant="default" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                {c.reset}
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => runScan(true)}
                  disabled={state === "scanning"}
                >
                  <ScanLine className="h-4 w-4" />
                  {c.scan}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-ink-soft hover:bg-muted"
                  onClick={() => runScan(false)}
                  disabled={state === "scanning"}
                >
                  {c.scanUnknown}
                </Button>
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-ink-muted">{c.demoNote}</p>
        </CardContent>
      </Card>

      {/* Result panel */}
      <Card>
        <CardContent className="p-5">
          {state === "matched" && match ? (
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success/12 text-success">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {c.matched}
                  </p>
                  <p className="text-sm text-ink-muted">{c.matchedSub}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-foreground">
                    {bookingProductName(match, locale)}
                  </span>
                  <Badge variant="lagoon">
                    {PRODUCT_COPY[match.product][locale]}
                  </Badge>
                </div>
                <p className="font-mono text-xs text-ink-muted">
                  {c.ref} · {match.reference}
                </p>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <CalendarDays className="h-4 w-4 text-ink-muted" />
                  {formatDate(match.visit_date, locale)}
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Users className="h-4 w-4 text-ink-muted" />
                  {c.guests(guestCount(match))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant={statusBadgeVariant(match.status)}>
                    {STATUS_COPY[match.status][locale]}
                  </Badge>
                  <Badge variant={paymentBadgeVariant(match.payment_status)}>
                    {PAYMENT_COPY[match.payment_status][locale]}
                  </Badge>
                </div>
              </div>
            </div>
          ) : state === "notFound" ? (
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-danger/12 text-danger">
                <XCircle className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {c.notFound}
                </p>
                <p className="text-sm text-ink-muted">{c.notFoundSub}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center text-ink-muted">
              <ScanLine className="h-7 w-7 text-ink-muted/60" />
              <p className="text-sm">{c.lede}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
