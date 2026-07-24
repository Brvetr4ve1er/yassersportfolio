"use client";

import { Check, Sparkles, Ticket, Umbrella } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { BookingProduct } from "@/types/domain";

type Card = { key: BookingProduct; category: string; name: string; desc: string; price: string };

const COPY: Record<Locale, { title: string; lede: string; cards: Card[] }> = {
  fr: {
    title: "Que souhaitez-vous réserver ?",
    lede: "Choisissez le type de journée. Vous pourrez ajuster les détails à l'étape suivante.",
    cards: [
      { key: "pass", category: "Pass journée", name: "Pass à la journée", desc: "Accès au lagon, transat, vestiaire. Adulte, enfant ou sunset.", price: "dès 5 000 DA" },
      { key: "cabana", category: "Privatif", name: "Cabana privative", desc: "Espace à l'ombre réservé à votre groupe, service au transat.", price: "dès 25 000 DA" },
      { key: "event", category: "Événement", name: "Événement & soirée", desc: "Animation enfants, Sunset DJ ou privatisation sur mesure.", price: "sur réservation" },
    ],
  },
  en: {
    title: "What would you like to book?",
    lede: "Pick the kind of day. You'll fine-tune the details on the next step.",
    cards: [
      { key: "pass", category: "Day pass", name: "Day pass", desc: "Lagoon access, sun lounger, locker. Adult, child or sunset.", price: "from 5,000 DA" },
      { key: "cabana", category: "Private", name: "Private cabana", desc: "A shaded space reserved for your group, lounger service.", price: "from 25,000 DA" },
      { key: "event", category: "Event", name: "Event & night", desc: "Kids' show, Sunset DJ or a custom privatization.", price: "on booking" },
    ],
  },
  ar: {
    title: "ماذا تريد أن تحجز؟",
    lede: "اختر نوع اليوم. يمكنك ضبط التفاصيل في الخطوة التالية.",
    cards: [
      { key: "pass", category: "تذكرة اليوم", name: "تذكرة يومية", desc: "دخول البحيرة، كرسي شاطئي، خزانة. بالغ، طفل أو غروب.", price: "ابتداءً من 5 000 دج" },
      { key: "cabana", category: "خاص", name: "كابانا خاصة", desc: "مساحة مظلّلة محجوزة لمجموعتك، خدمة على الكرسي.", price: "ابتداءً من 25 000 دج" },
      { key: "event", category: "فعالية", name: "فعالية وسهرة", desc: "أنشطة الأطفال، دي جاي الغروب أو حجز خاص مخصّص.", price: "عند الحجز" },
    ],
  },
};

const ICONS = { pass: Ticket, cabana: Umbrella, event: Sparkles } as const;
const VARIANT = { pass: "photo-lagoon", cabana: "photo-sunset", event: "photo-forest" } as const;

export function StepProduct({
  locale,
  value,
  onSelect,
}: {
  locale: Locale;
  value: BookingProduct | null;
  onSelect: (product: BookingProduct) => void;
}) {
  const c = COPY[locale];

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{c.title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.lede}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {c.cards.map((card) => {
          const Icon = ICONS[card.key];
          const selected = value === card.key;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => onSelect(card.key)}
              aria-pressed={selected}
              className={cn(
                "group relative flex flex-col gap-4 rounded-2xl border p-6 text-start transition",
                selected
                  ? "border-lagoon-500 bg-lagoon-50/70 ring-2 ring-lagoon-500/40"
                  : "border-border bg-card hover:border-lagoon-300 hover:shadow-md",
              )}
            >
              {selected ? (
                <span className="absolute end-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-lagoon-500 text-sand">
                  <Check className="h-3.5 w-3.5" />
                </span>
              ) : null}
              <span className={cn("flex h-14 w-14 items-center justify-center rounded-xl", VARIANT[card.key])}>
                <Icon className="h-6 w-6 text-sand" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-lagoon-700">
                  {card.category}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold text-foreground">
                  {card.name}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{card.desc}</span>
              </span>
              <span className="mt-auto text-sm font-medium text-coral-dark">{card.price}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
