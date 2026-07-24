"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { guestDetailsSchema } from "@/lib/booking/validation";
import type { Locale } from "@/lib/i18n/config";
import type { BookingDraft } from "@/lib/booking/types";

const COPY: Record<
  Locale,
  {
    title: string;
    lede: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneHint: string;
    requests: string;
    requestsPlaceholder: string;
    optional: string;
    errors: { fullName: string; phone: string; specialRequests: string };
  }
> = {
  fr: {
    title: "Vos coordonnées",
    lede: "Nous confirmerons votre réservation par WhatsApp sur ce numéro.",
    fullName: "Nom complet",
    fullNamePlaceholder: "Ex. Yacine Meziane",
    phone: "Téléphone",
    phonePlaceholder: "0555 12 34 56",
    phoneHint: "Numéro algérien (mobile).",
    requests: "Demandes particulières",
    requestsPlaceholder: "Anniversaire, gâteau, allergies, emplacement souhaité…",
    optional: "Optionnel",
    errors: {
      fullName: "Merci d'indiquer votre nom (2 caractères min.).",
      phone: "Numéro algérien attendu (0X XX XX XX XX).",
      specialRequests: "500 caractères maximum.",
    },
  },
  en: {
    title: "Your details",
    lede: "We'll confirm your booking on WhatsApp using this number.",
    fullName: "Full name",
    fullNamePlaceholder: "e.g. Yacine Meziane",
    phone: "Phone",
    phonePlaceholder: "0555 12 34 56",
    phoneHint: "Algerian mobile number.",
    requests: "Special requests",
    requestsPlaceholder: "Birthday, cake, allergies, preferred spot…",
    optional: "Optional",
    errors: {
      fullName: "Please enter your name (min. 2 characters).",
      phone: "Enter a valid Algerian number (0X XX XX XX XX).",
      specialRequests: "500 characters maximum.",
    },
  },
  ar: {
    title: "معلوماتك",
    lede: "سنؤكّد حجزك عبر واتساب على هذا الرقم.",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "مثال: ياسين مزيان",
    phone: "الهاتف",
    phonePlaceholder: "0555 12 34 56",
    phoneHint: "رقم هاتف جزائري (محمول).",
    requests: "طلبات خاصة",
    requestsPlaceholder: "عيد ميلاد، كعكة، حساسية، المكان المفضّل…",
    optional: "اختياري",
    errors: {
      fullName: "الرجاء إدخال اسمك (حرفان على الأقل).",
      phone: "أدخل رقمًا جزائريًا صحيحًا (0X XX XX XX XX).",
      specialRequests: "500 حرف كحد أقصى.",
    },
  },
};

type Field = "fullName" | "phone" | "specialRequests";

export function StepGuestDetails({
  locale,
  draft,
  onPatch,
}: {
  locale: Locale;
  draft: BookingDraft;
  onPatch: (patch: Partial<BookingDraft>) => void;
}) {
  const c = COPY[locale];
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    fullName: false,
    phone: false,
    specialRequests: false,
  });

  const result = guestDetailsSchema.safeParse({
    fullName: draft.fullName,
    phone: draft.phone,
    adults: draft.adults,
    children: draft.children,
    specialRequests: draft.specialRequests,
  });

  const errorFor = (field: Field): string | null => {
    if (result.success) return null;
    const hit = result.error.issues.find((i) => i.path[0] === field);
    return hit ? c.errors[field] : null;
  };

  const markTouched = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));

  const nameErr = touched.fullName ? errorFor("fullName") : null;
  const phoneErr = touched.phone ? errorFor("phone") : null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.lede}</p>

      <div className="mt-8 max-w-lg space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">{c.fullName}</Label>
          <Input
            id="fullName"
            value={draft.fullName}
            onChange={(e) => onPatch({ fullName: e.target.value })}
            onBlur={() => markTouched("fullName")}
            placeholder={c.fullNamePlaceholder}
            aria-invalid={!!nameErr}
            autoComplete="name"
          />
          {nameErr ? <p className="text-xs text-danger">{nameErr}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{c.phone}</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={draft.phone}
            onChange={(e) => onPatch({ phone: e.target.value })}
            onBlur={() => markTouched("phone")}
            placeholder={c.phonePlaceholder}
            aria-invalid={!!phoneErr}
            autoComplete="tel"
            className="text-start"
          />
          {phoneErr ? (
            <p className="text-xs text-danger">{phoneErr}</p>
          ) : (
            <p className="text-xs text-muted-foreground">{c.phoneHint}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="requests">{c.requests}</Label>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{c.optional}</span>
          </div>
          <Textarea
            id="requests"
            value={draft.specialRequests}
            onChange={(e) => onPatch({ specialRequests: e.target.value })}
            placeholder={c.requestsPlaceholder}
            maxLength={500}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
