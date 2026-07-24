"use client";

import { Check, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AMENITY_LABELS, mockCabanas, mockEvents, mockPasses } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";
import { Counter } from "./Counter";
import { localizedField } from "./shared";

const COPY: Record<
  Locale,
  {
    passTitle: string;
    passLede: string;
    cabanaTitle: string;
    cabanaLede: string;
    eventTitle: string;
    eventLede: string;
    quantities: string;
    adults: string;
    children: string;
    childHint: string;
    capacity: (n: number) => string;
    perDay: string;
    quote: string;
    free: string;
    perPerson: string;
    onRequest: string;
    dayNames: Record<string, string>;
  }
> = {
  fr: {
    passTitle: "Choisissez votre pass",
    passLede: "Le tarif adulte suit le pass sélectionné ; les enfants gardent le tarif enfant.",
    cabanaTitle: "Choisissez votre cabana",
    cabanaLede: "Un forfait par cabana, la capacité couvre tout le groupe.",
    eventTitle: "Choisissez votre événement",
    eventLede: "Réservez votre place pour nos rendez-vous.",
    quantities: "Nombre de personnes",
    adults: "Adultes",
    children: "Enfants",
    childHint: "Tarif enfant — moins de 12 ans",
    capacity: (n) => `Jusqu'à ${n} personnes`,
    perDay: "/ jour",
    quote: "Sur devis",
    free: "Inclus",
    perPerson: "/ personne",
    onRequest: "Sur demande",
    dayNames: { friday: "Vendredi", saturday: "Samedi", "on-request": "Sur demande" },
  },
  en: {
    passTitle: "Choose your pass",
    passLede: "The adult rate follows the selected pass; children keep the child rate.",
    cabanaTitle: "Choose your cabana",
    cabanaLede: "One flat rate per cabana — capacity covers the whole group.",
    eventTitle: "Choose your event",
    eventLede: "Reserve your spot for our happenings.",
    quantities: "Number of people",
    adults: "Adults",
    children: "Children",
    childHint: "Child rate — under 12",
    capacity: (n) => `Up to ${n} people`,
    perDay: "/ day",
    quote: "On request",
    free: "Included",
    perPerson: "/ person",
    onRequest: "On request",
    dayNames: { friday: "Friday", saturday: "Saturday", "on-request": "On request" },
  },
  ar: {
    passTitle: "اختر تذكرتك",
    passLede: "سعر البالغ يتبع التذكرة المختارة؛ يحتفظ الأطفال بسعر الطفل.",
    cabanaTitle: "اختر الكابانا",
    cabanaLede: "سعر ثابت لكل كابانا — السعة تشمل المجموعة كاملة.",
    eventTitle: "اختر الفعالية",
    eventLede: "احجز مكانك في مواعيدنا.",
    quantities: "عدد الأشخاص",
    adults: "بالغون",
    children: "أطفال",
    childHint: "سعر الطفل — أقل من 12 سنة",
    capacity: (n) => `حتى ${n} أشخاص`,
    perDay: "/ اليوم",
    quote: "حسب الطلب",
    free: "مشمول",
    perPerson: "/ شخص",
    onRequest: "عند الطلب",
    dayNames: { friday: "الجمعة", saturday: "السبت", "on-request": "عند الطلب" },
  },
};

type OptionRowProps = {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  price: string;
  meta?: React.ReactNode;
};

function OptionRow({ selected, onClick, title, desc, price, meta }: OptionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-4 rounded-2xl border p-5 text-start transition",
        selected
          ? "border-lagoon-500 bg-lagoon-50/70 ring-2 ring-lagoon-500/40"
          : "border-border bg-card hover:border-lagoon-300 hover:shadow-sm",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
          selected ? "border-lagoon-500 bg-lagoon-500 text-sand" : "border-border",
        )}
      >
        {selected ? <Check className="h-3 w-3" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="font-display text-lg font-semibold text-foreground">{title}</span>
          <span className="text-sm font-medium text-coral-dark">{price}</span>
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{desc}</span>
        {meta ? <span className="mt-2 block">{meta}</span> : null}
      </span>
    </button>
  );
}

export function StepOption({
  locale,
  draft,
  onPatch,
}: {
  locale: Locale;
  draft: BookingDraft;
  onPatch: (patch: Partial<BookingDraft>) => void;
}) {
  const c = COPY[locale];

  if (draft.product === "pass") {
    return (
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.passTitle}</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.passLede}</p>

        <div className="mt-6 space-y-3">
          {mockPasses.map((p) => (
            <OptionRow
              key={p.id}
              selected={draft.passId === p.id}
              onClick={() => onPatch({ passId: p.id })}
              title={localizedField(p, "name", locale)}
              desc={localizedField(p, "description", locale)}
              price={`${formatCurrency(p.price, locale)} ${c.perPerson}`}
            />
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.quantities}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Counter
              label={c.adults}
              value={draft.adults}
              min={1}
              max={30}
              onChange={(v) => onPatch({ adults: v })}
            />
            <Counter
              label={c.children}
              hint={c.childHint}
              value={draft.children}
              min={0}
              max={30}
              onChange={(v) => onPatch({ children: v })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (draft.product === "cabana") {
    return (
      <div>
        <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.cabanaTitle}</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.cabanaLede}</p>

        <div className="mt-6 space-y-3">
          {mockCabanas.map((cab) => (
            <OptionRow
              key={cab.id}
              selected={draft.cabanaId === cab.id}
              onClick={() => onPatch({ cabanaId: cab.id })}
              title={localizedField(cab, "name", locale)}
              desc={localizedField(cab, "description", locale)}
              price={`${formatCurrency(cab.price, locale)} ${c.perDay}`}
              meta={
                <span className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-lagoon-50 px-2.5 py-1 text-[11px] font-medium text-lagoon-700">
                    <Users className="h-3 w-3" />
                    {c.capacity(cab.capacity)}
                  </span>
                  {cab.amenities.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-ink-soft"
                    >
                      {AMENITY_LABELS[locale]?.[a] ?? a}
                    </span>
                  ))}
                </span>
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // event
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.eventTitle}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.eventLede}</p>

      <div className="mt-6 space-y-3">
        {mockEvents.map((ev) => {
          const price =
            ev.price === null ? c.quote : ev.price === 0 ? c.free : `${formatCurrency(ev.price, locale)} ${c.perPerson}`;
          return (
            <OptionRow
              key={ev.id}
              selected={draft.eventId === ev.id}
              onClick={() => onPatch({ eventId: ev.id })}
              title={localizedField(ev, "name", locale)}
              desc={localizedField(ev, "description", locale)}
              price={price}
              meta={
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] text-ink-soft">
                  <Clock className="h-3 w-3 text-lagoon-600" />
                  {c.dayNames[ev.day] ?? ev.day}
                  {ev.time && ev.time !== "—" ? ` · ${ev.time}` : ""}
                </span>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
