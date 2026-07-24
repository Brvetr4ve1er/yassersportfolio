"use client";

import type { CSSProperties } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { arDZ, enGB, fr } from "date-fns/locale";
import { Info } from "lucide-react";
import { OPENING_HOURS } from "@/lib/booking/pricing";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";
import { Counter } from "./Counter";
import { guestCap, toDateKey } from "./shared";

const DF_LOCALE = { fr, en: enGB, ar: arDZ } as const;

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    dateLabel: string;
    guestsLabel: string;
    adults: string;
    children: string;
    hours: string;
    capNote: (n: number) => string;
    capExceeded: (n: number) => string;
  }
> = {
  fr: {
    title: "Quand venez-vous ?",
    lede: "Sélectionnez votre date de visite et le nombre d'invités.",
    dateLabel: "Date de visite",
    guestsLabel: "Invités",
    adults: "Adultes",
    children: "Enfants",
    hours: `Ouvert tous les jours · ${OPENING_HOURS}`,
    capNote: (n) => `Cette cabana accueille jusqu'à ${n} personnes.`,
    capExceeded: (n) => `Capacité dépassée : maximum ${n} personnes pour cette cabana.`,
  },
  en: {
    title: "When are you coming?",
    lede: "Pick your visit date and the number of guests.",
    dateLabel: "Visit date",
    guestsLabel: "Guests",
    adults: "Adults",
    children: "Children",
    hours: `Open daily · ${OPENING_HOURS}`,
    capNote: (n) => `This cabana seats up to ${n} people.`,
    capExceeded: (n) => `Over capacity: maximum ${n} people for this cabana.`,
  },
  ar: {
    title: "متى ستأتي؟",
    lede: "اختر تاريخ زيارتك وعدد الضيوف.",
    dateLabel: "تاريخ الزيارة",
    guestsLabel: "الضيوف",
    adults: "بالغون",
    children: "أطفال",
    hours: `مفتوح يوميًا · ${OPENING_HOURS}`,
    capNote: (n) => `تتّسع هذه الكابانا حتى ${n} أشخاص.`,
    capExceeded: (n) => `تجاوزت السعة: الحد الأقصى ${n} أشخاص لهذه الكابانا.`,
  },
};

export function StepDateGuests({
  locale,
  draft,
  onPatch,
}: {
  locale: Locale;
  draft: BookingDraft;
  onPatch: (patch: Partial<BookingDraft>) => void;
}) {
  const c = COPY[locale];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = draft.visitDate ? new Date(`${draft.visitDate}T00:00:00`) : undefined;
  const cap = guestCap(draft);
  const isCabana = draft.product === "cabana";
  const totalGuests = draft.adults + draft.children;
  const overCap = isCabana && totalGuests > cap;

  const rdpStyle = {
    "--rdp-accent-color": "#1d8da0",
    "--rdp-background-color": "#e9f7f9",
  } as CSSProperties;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.lede}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.dateLabel}
          </div>
          <div className="inline-block rounded-2xl border border-border bg-card p-3" style={rdpStyle}>
            <DayPicker
              mode="single"
              locale={DF_LOCALE[locale]}
              dir={locale === "ar" ? "rtl" : "ltr"}
              selected={selected}
              onSelect={(date) => onPatch({ visitDate: date ? toDateKey(date) : null })}
              disabled={{ before: today }}
              fromDate={today}
              showOutsideDays
            />
          </div>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-lagoon-600" />
            {c.hours}
          </p>
        </div>

        <div>
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.guestsLabel}
          </div>
          <div className="space-y-3">
            <Counter
              label={c.adults}
              value={draft.adults}
              min={1}
              max={isCabana ? Math.max(1, cap - draft.children) : 30}
              onChange={(v) => onPatch({ adults: v })}
            />
            <Counter
              label={c.children}
              value={draft.children}
              min={0}
              max={isCabana ? Math.max(0, cap - draft.adults) : 30}
              onChange={(v) => onPatch({ children: v })}
            />
          </div>

          {isCabana ? (
            <p
              className={
                overCap
                  ? "mt-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger"
                  : "mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground"
              }
            >
              {!overCap ? <Info className="h-3.5 w-3.5 text-lagoon-600" /> : null}
              {overCap ? c.capExceeded(cap) : c.capNote(cap)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
