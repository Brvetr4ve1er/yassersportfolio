"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { computeTotal } from "@/lib/booking/pricing";
import { guestDetailsSchema } from "@/lib/booking/validation";
import { emptyDraft, type BookingDraft } from "@/lib/booking/types";
import { mockCabanas } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { BookingProduct } from "@/types/domain";
import { StepProduct } from "./StepProduct";
import { StepOption } from "./StepOption";
import { StepDateGuests } from "./StepDateGuests";
import { StepGuestDetails } from "./StepGuestDetails";
import { StepPayment } from "./StepPayment";
import { StepConfirmation } from "./StepConfirmation";
import { isQuoteOnly } from "./shared";

const TOTAL_STEPS = 6;

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    steps: string[];
    stepOf: (n: number) => string;
    back: string;
    next: string;
    confirm: string;
    total: string;
    quote: string;
  }
> = {
  fr: {
    eyebrow: "Réservation",
    title: "Réservez votre journée",
    steps: ["Offre", "Option", "Date & invités", "Coordonnées", "Paiement", "Confirmation"],
    stepOf: (n) => `Étape ${n} sur ${TOTAL_STEPS}`,
    back: "Retour",
    next: "Continuer",
    confirm: "Confirmer & payer",
    total: "Total",
    quote: "Sur devis",
  },
  en: {
    eyebrow: "Booking",
    title: "Book your day",
    steps: ["Offer", "Option", "Date & guests", "Details", "Payment", "Confirmation"],
    stepOf: (n) => `Step ${n} of ${TOTAL_STEPS}`,
    back: "Back",
    next: "Continue",
    confirm: "Confirm & pay",
    total: "Total",
    quote: "On request",
  },
  ar: {
    eyebrow: "الحجز",
    title: "احجز يومك",
    steps: ["العرض", "الخيار", "التاريخ والضيوف", "المعلومات", "الدفع", "التأكيد"],
    stepOf: (n) => `الخطوة ${n} من ${TOTAL_STEPS}`,
    back: "رجوع",
    next: "متابعة",
    confirm: "تأكيد ودفع",
    total: "الإجمالي",
    quote: "حسب الطلب",
  },
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function initDraft(searchParams: URLSearchParams): BookingDraft {
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const d: BookingDraft = { ...emptyDraft };
  if (type === "pass" || type === "cabana" || type === "event") d.product = type;
  if (id) {
    if (d.product === "pass") d.passId = id;
    else if (d.product === "cabana") d.cabanaId = id;
    else if (d.product === "event") d.eventId = id;
  }
  return d;
}

function canProceed(step: number, draft: BookingDraft): boolean {
  switch (step) {
    case 1:
      return draft.product != null;
    case 2:
      if (draft.product === "pass") return !!draft.passId && draft.adults + draft.children >= 1;
      if (draft.product === "cabana") return !!draft.cabanaId;
      if (draft.product === "event") return !!draft.eventId;
      return false;
    case 3: {
      if (!draft.visitDate || draft.adults + draft.children < 1) return false;
      if (draft.product === "cabana") {
        const cap = mockCabanas.find((c) => c.id === draft.cabanaId)?.capacity ?? Infinity;
        if (draft.adults + draft.children > cap) return false;
      }
      return true;
    }
    case 4:
      return guestDetailsSchema.safeParse({
        fullName: draft.fullName,
        phone: draft.phone,
        adults: draft.adults,
        children: draft.children,
        specialRequests: draft.specialRequests,
      }).success;
    case 5:
      return draft.paymentMethod != null;
    default:
      return true;
  }
}

export function BookingWizard({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState<BookingDraft>(() => initDraft(new URLSearchParams(searchParams.toString())));

  const rawStep = clamp(Number(searchParams.get("step")) || 1, 1, TOTAL_STEPS);
  // Guard against landing on a later step with no product chosen.
  const step = draft.product ? rawStep : Math.min(rawStep, 1);

  const patch = (p: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...p }));

  const goToStep = (n: number) => {
    const next = clamp(n, 1, TOTAL_STEPS);
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(next));
    if (draft.product) params.set("type", draft.product);
    else params.delete("type");
    const id =
      draft.product === "pass"
        ? draft.passId
        : draft.product === "cabana"
          ? draft.cabanaId
          : draft.product === "event"
            ? draft.eventId
            : null;
    if (id) params.set("id", id);
    else params.delete("id");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const proceed = canProceed(step, draft);
  const total = computeTotal(draft);
  const quote = isQuoteOnly(draft);
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <section className="bg-background">
      <div className="container max-w-4xl py-10 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-lagoon-700">{c.eyebrow}</span>
            <span className="h-px w-10 bg-lagoon-300/50" />
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(step).padStart(2, "0")} — {String(TOTAL_STEPS).padStart(2, "0")}
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">{c.title}</h1>
        </div>

        {/* Stepper (md+) */}
        <ol className="mb-8 hidden items-center gap-2 md:flex">
          {c.steps.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <li key={label} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => (n < step ? goToStep(n) : undefined)}
                  disabled={n >= step}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-1 py-1 text-start transition",
                    n < step ? "cursor-pointer" : "cursor-default",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition",
                      active
                        ? "bg-lagoon-500 text-sand"
                        : done
                          ? "bg-lagoon-100 text-lagoon-700"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : n}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-xs",
                      active ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </button>
                {n < TOTAL_STEPS ? <span className="h-px flex-1 bg-border" /> : null}
              </li>
            );
          })}
        </ol>

        {/* Progress (mobile) */}
        <div className="mb-8 md:hidden">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{c.steps[step - 1]}</span>
            <span>{c.stepOf(step)}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-lagoon-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 ? (
              <StepProduct
                locale={locale}
                value={draft.product}
                onSelect={(product: BookingProduct) => patch({ product })}
              />
            ) : null}
            {step === 2 ? <StepOption locale={locale} draft={draft} onPatch={patch} /> : null}
            {step === 3 ? <StepDateGuests locale={locale} draft={draft} onPatch={patch} /> : null}
            {step === 4 ? <StepGuestDetails locale={locale} draft={draft} onPatch={patch} /> : null}
            {step === 5 ? <StepPayment locale={locale} draft={draft} onPatch={patch} /> : null}
            {step === 6 ? <StepConfirmation locale={locale} draft={draft} /> : null}
          </motion.div>
        </AnimatePresence>

        {/* Footer nav */}
        {step < TOTAL_STEPS ? (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => goToStep(step - 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                  {c.back}
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              {step >= 2 ? (
                <div className="hidden text-end sm:block">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.total}</div>
                  <div className="font-display text-lg font-semibold text-foreground">
                    {quote ? c.quote : formatCurrency(total, locale)}
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                disabled={!proceed}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                  proceed
                    ? "bg-coral text-deepwater hover:bg-coral-light"
                    : "cursor-not-allowed bg-secondary text-muted-foreground",
                )}
              >
                {step === TOTAL_STEPS - 1 ? c.confirm : c.next}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
