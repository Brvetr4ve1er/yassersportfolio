"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { CheckCircle2, Loader2, ScanLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";
import { mockBookings } from "@/lib/data/mock";
import type { Booking } from "@/types/domain";

type ScanState =
  | { status: "idle" }
  | { status: "scanning" }
  | { status: "matched"; booking: Booking }
  | { status: "notFound"; raw: string }
  | { status: "error"; message: string };

export function QRScanner() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [state, setState] = useState<ScanState>({ status: "idle" });

  useEffect(() => {
    return () => {
      readerRef.current = null;
    };
  }, []);

  const start = async () => {
    setState({ status: "scanning" });
    try {
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;
      await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result) => {
          if (!result) return;
          const raw = result.getText();
          try {
            const parsed = JSON.parse(raw);
            const match = mockBookings.find(
              (b) => b.reference === parsed.ref || b.qr_code_token === parsed.token,
            );
            if (match) {
              setState({ status: "matched", booking: match });
            } else {
              setState({ status: "notFound", raw });
            }
          } catch {
            const match = mockBookings.find((b) => b.qr_code_token === raw);
            if (match) setState({ status: "matched", booking: match });
            else setState({ status: "notFound", raw });
          }
        },
      );
    } catch (e) {
      setState({
        status: "error",
        message: e instanceof Error ? e.message : "Camera error",
      });
    }
  };

  const reset = () => setState({ status: "idle" });

  return (
    <div className="space-y-4">
      <div className="surface-card overflow-hidden">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-forest-900 object-cover"
          muted
          playsInline
        />
      </div>

      {state.status === "idle" && (
        <Button onClick={start} variant="gold" size="lg" className="w-full">
          <ScanLine className="h-4 w-4" />
          {t("admin.scan.title")}
        </Button>
      )}

      {state.status === "scanning" && (
        <div className="flex items-center justify-center gap-2 rounded-lg bg-card p-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("admin.scan.subtitle")}
        </div>
      )}

      {state.status === "matched" && (
        <div className="rounded-lg border border-success/40 bg-success/10 p-4">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{t("admin.scan.matched")}</span>
          </div>
          <div className="mt-3 text-sm">
            <div className="font-mono text-xs">{state.booking.reference}</div>
            <div className="mt-1">Type: {state.booking.booking_type}</div>
            <div>Arrivée: {state.booking.check_in}</div>
            <div>Pers.: {state.booking.guests_count}</div>
          </div>
          <Button className="mt-3" variant="gold">
            Valider l'arrivée
          </Button>
          <Button className="mt-3 ms-2" variant="ghost" onClick={reset}>
            Scanner un autre
          </Button>
        </div>
      )}

      {state.status === "notFound" && (
        <div className="rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          <div className="flex items-center justify-between gap-2">
            <span>{t("admin.scan.notFound")}</span>
            <button onClick={reset}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap text-xs opacity-70">
            {state.raw}
          </pre>
        </div>
      )}

      {state.status === "error" && (
        <div className="rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
          {t("admin.scan.permission")} ({state.message})
        </div>
      )}
    </div>
  );
}
