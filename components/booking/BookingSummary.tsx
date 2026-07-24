"use client";

import { CalendarDays, Tag, Users, Wallet } from "lucide-react";
import { computeTotal } from "@/lib/booking/pricing";
import { formatCurrency, formatDate } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";
import { draftProductName, isQuoteOnly } from "./shared";

const COPY: Record<
  Locale,
  { heading: string; offer: string; date: string; guests: string; total: string; quote: string; adults: string; children: string; noDate: string }
> = {
  fr: {
    heading: "Récapitulatif",
    offer: "Offre",
    date: "Date",
    guests: "Invités",
    total: "Total",
    quote: "Sur devis",
    adults: "adultes",
    children: "enfants",
    noDate: "À choisir",
  },
  en: {
    heading: "Summary",
    offer: "Offer",
    date: "Date",
    guests: "Guests",
    total: "Total",
    quote: "On request",
    adults: "adults",
    children: "children",
    noDate: "To pick",
  },
  ar: {
    heading: "الملخّص",
    offer: "العرض",
    date: "التاريخ",
    guests: "الضيوف",
    total: "الإجمالي",
    quote: "حسب الطلب",
    adults: "بالغين",
    children: "أطفال",
    noDate: "للاختيار",
  },
};

export function BookingSummary({ draft, locale }: { draft: BookingDraft; locale: Locale }) {
  const c = COPY[locale];
  const total = computeTotal(draft);
  const quote = isQuoteOnly(draft);
  const name = draftProductName(draft, locale) || "—";

  const guestBits = [
    `${draft.adults} ${c.adults}`,
    draft.children > 0 ? `${draft.children} ${c.children}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const rows = [
    { icon: Tag, label: c.offer, value: name },
    {
      icon: CalendarDays,
      label: c.date,
      value: draft.visitDate ? formatDate(draft.visitDate, locale) : c.noDate,
    },
    { icon: Users, label: c.guests, value: guestBits },
  ];

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
        {c.heading}
      </div>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <row.icon className="h-4 w-4 text-lagoon-600" />
              {row.label}
            </dt>
            <dd className="text-end text-sm font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Wallet className="h-4 w-4 text-coral" />
            {c.total}
          </dt>
          <dd className="font-display text-xl font-semibold text-foreground">
            {quote ? c.quote : formatCurrency(total, locale)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
