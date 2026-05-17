"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Step1Type } from "./Step1Type";
import { Step2Dates } from "./Step2Dates";
import { Step3Unit } from "./Step3Unit";
import { Step4Guests } from "./Step4Guests";
import { Step5Payment } from "./Step5Payment";
import { Step6Confirm } from "./Step6Confirm";
import { emptyDraft, type BookingDraft } from "@/lib/booking/types";
import { mockAccommodations, mockActivities, mockPackages } from "@/lib/data/mock";
import {
  totalAccommodation,
  totalActivity,
  totalPackage,
} from "@/lib/booking/pricing";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/domain";

export function BookingWizard({ locale }: { locale: Locale }) {
  const { t, raw } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const steps = raw<string[]>("booking.steps") ?? [];

  const [draft, setDraft] = useState<BookingDraft>(() => {
    const next = { ...emptyDraft };
    const type = params.get("type");
    if (type === "accommodation" || type === "activity" || type === "package") {
      next.type = type;
      next.step = 2;
    }
    const id = params.get("id");
    if (id) {
      if (type === "accommodation") next.accommodationId = id;
      else if (type === "activity") next.activityId = id;
      else if (type === "package") next.packageId = id;
    }
    return next;
  });

  const updateDraft = useCallback(
    (patch: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...patch })),
    [],
  );

  const goTo = useCallback(
    (step: number) => setDraft((d) => ({ ...d, step })),
    [],
  );

  const total = useMemo(() => {
    if (draft.type === "accommodation" && draft.accommodationId && draft.checkIn && draft.checkOut) {
      const acc = mockAccommodations.find((a) => a.id === draft.accommodationId);
      if (acc) return totalAccommodation(acc, draft.checkIn, draft.checkOut);
    }
    if (draft.type === "activity" && draft.activityId) {
      const act = mockActivities.find((a) => a.id === draft.activityId);
      if (act) return totalActivity(act, draft.guests);
    }
    if (draft.type === "package" && draft.packageId) {
      const pkg = mockPackages.find((p) => p.id === draft.packageId);
      if (pkg) return totalPackage(pkg);
    }
    return 0;
  }, [draft]);

  useEffect(() => {
    setDraft((d) => (d.totalPrice === total ? d : { ...d, totalPrice: total }));
  }, [total]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(draft.step));
    window.history.replaceState({}, "", url.toString());
  }, [draft.step]);

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest md:text-4xl">
        {t("booking.title")}
      </h1>

      <ol className="mb-8 grid grid-cols-6 gap-1 text-[10px] uppercase tracking-wider sm:text-xs">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = n < draft.step;
          const current = n === draft.step;
          return (
            <li
              key={label}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md border px-2 py-1.5 text-center transition",
                done
                  ? "border-success/50 bg-success/10 text-success"
                  : current
                    ? "border-gold/50 bg-gold/10 text-gold-700"
                    : "border-border text-muted-foreground",
              )}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-current text-card">
                {done ? <Check className="h-3 w-3 text-card" /> : <span className="text-card text-[10px]">{n}</span>}
              </span>
              <span className="truncate">{label}</span>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={draft.step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25 }}
        >
          {draft.step === 1 && (
            <Step1Type draft={draft} update={updateDraft} next={() => goTo(2)} locale={locale} />
          )}
          {draft.step === 2 && (
            <Step2Dates
              draft={draft}
              update={updateDraft}
              next={() => goTo(3)}
              back={() => goTo(1)}
              locale={locale}
            />
          )}
          {draft.step === 3 && (
            <Step3Unit
              draft={draft}
              update={updateDraft}
              next={() => goTo(4)}
              back={() => goTo(2)}
              locale={locale}
            />
          )}
          {draft.step === 4 && (
            <Step4Guests
              draft={draft}
              update={updateDraft}
              next={() => goTo(5)}
              back={() => goTo(3)}
              locale={locale}
            />
          )}
          {draft.step === 5 && (
            <Step5Payment
              draft={draft}
              update={updateDraft}
              next={() => goTo(6)}
              back={() => goTo(4)}
              locale={locale}
            />
          )}
          {draft.step === 6 && <Step6Confirm draft={draft} locale={locale} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
