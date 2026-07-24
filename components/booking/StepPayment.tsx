"use client";

import { Banknote, Check, CreditCard, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";
import type { PaymentMethod } from "@/types/domain";
import { BookingSummary } from "./BookingSummary";
import { isQuoteOnly } from "./shared";

type Method = { key: PaymentMethod; name: string; desc: string };

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    methods: Method[];
    baridiTitle: string;
    baridiSteps: string[];
    quoteNote: string;
  }
> = {
  fr: {
    title: "Mode de paiement",
    lede: "Choisissez comment régler. Aucun prélèvement automatique — votre place est tenue après confirmation.",
    methods: [
      { key: "baridi", name: "BaridiMob", desc: "Virement via l'application, confirmation manuelle." },
      { key: "cib", name: "Carte CIB / Edahabia", desc: "Paiement par carte bancaire en ligne." },
      { key: "cash", name: "Payer sur place", desc: "Réglez à l'entrée le jour de votre visite." },
    ],
    baridiTitle: "Instructions BaridiMob",
    baridiSteps: [
      "Ouvrez l'application BaridiMob et choisissez « Virement ».",
      "RIP : 007 99999 0011223344 55 — Oxygen Island DZ.",
      "Indiquez votre référence de réservation en motif.",
      "Envoyez la capture du reçu via WhatsApp pour confirmation.",
    ],
    quoteNote: "Privatisation : le montant final vous sera communiqué après devis. Aucun paiement en ligne à cette étape.",
  },
  en: {
    title: "Payment method",
    lede: "Choose how to pay. No automatic charge — your spot is held once confirmed.",
    methods: [
      { key: "baridi", name: "BaridiMob", desc: "Transfer via the app, manual confirmation." },
      { key: "cib", name: "CIB / Edahabia card", desc: "Pay online with your bank card." },
      { key: "cash", name: "Pay on site", desc: "Settle at the entrance on your visit day." },
    ],
    baridiTitle: "BaridiMob instructions",
    baridiSteps: [
      "Open the BaridiMob app and choose “Transfer”.",
      "RIP: 007 99999 0011223344 55 — Oxygen Island DZ.",
      "Add your booking reference as the payment note.",
      "Send the receipt screenshot on WhatsApp to confirm.",
    ],
    quoteNote: "Privatization: the final amount is shared after a quote. No online payment at this step.",
  },
  ar: {
    title: "طريقة الدفع",
    lede: "اختر طريقة الدفع. لا خصم تلقائي — يُحجز مكانك بعد التأكيد.",
    methods: [
      { key: "baridi", name: "بريدي موب", desc: "تحويل عبر التطبيق، تأكيد يدوي." },
      { key: "cib", name: "بطاقة CIB / الذهبية", desc: "ادفع عبر الإنترنت ببطاقتك البنكية." },
      { key: "cash", name: "الدفع في المكان", desc: "ادفع عند المدخل يوم زيارتك." },
    ],
    baridiTitle: "تعليمات بريدي موب",
    baridiSteps: [
      "افتح تطبيق بريدي موب واختر « تحويل ».",
      "RIP : 007 99999 0011223344 55 — أوكسيجن آيلاند.",
      "اذكر رقم حجزك في خانة السبب.",
      "أرسل لقطة الإيصال عبر واتساب للتأكيد.",
    ],
    quoteNote: "الحجز الخاص: يُبلَّغ المبلغ النهائي بعد العرض. لا دفع إلكتروني في هذه الخطوة.",
  },
};

const ICONS = { baridi: Smartphone, cib: CreditCard, cash: Banknote } as const;

export function StepPayment({
  locale,
  draft,
  onPatch,
}: {
  locale: Locale;
  draft: BookingDraft;
  onPatch: (patch: Partial<BookingDraft>) => void;
}) {
  const c = COPY[locale];
  const quote = isQuoteOnly(draft);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.lede}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_minmax(0,20rem)]">
        <div className="space-y-3">
          {c.methods.map((m) => {
            const Icon = ICONS[m.key];
            const selected = draft.paymentMethod === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => onPatch({ paymentMethod: m.key })}
                aria-pressed={selected}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border p-5 text-start transition",
                  selected
                    ? "border-lagoon-500 bg-lagoon-50/70 ring-2 ring-lagoon-500/40"
                    : "border-border bg-card hover:border-lagoon-300 hover:shadow-sm",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    selected ? "bg-lagoon-500 text-sand" : "bg-secondary text-lagoon-700",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold text-foreground">{m.name}</span>
                  <span className="block text-sm text-muted-foreground">{m.desc}</span>
                </span>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    selected ? "border-lagoon-500 bg-lagoon-500 text-sand" : "border-border",
                  )}
                >
                  {selected ? <Check className="h-3 w-3" /> : null}
                </span>
              </button>
            );
          })}

          {draft.paymentMethod === "baridi" ? (
            <div className="rounded-2xl border border-lagoon-300/50 bg-lagoon-50/60 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-lagoon-800">
                <Smartphone className="h-4 w-4" />
                {c.baridiTitle}
              </div>
              <ol className="space-y-2">
                {c.baridiSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lagoon-500 text-[11px] font-semibold text-sand">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {quote ? (
            <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-dark">
              {c.quoteNote}
            </p>
          ) : null}
        </div>

        <BookingSummary draft={draft} locale={locale} />
      </div>
    </div>
  );
}
