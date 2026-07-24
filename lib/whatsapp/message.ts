import { publicEnv } from "@/lib/env.public";
import type { Locale } from "@/types/domain";

/** Booking + info WhatsApp numbers (from the venue's public listings). */
export function getWhatsAppNumber(context: "booking" | "info" = "booking") {
  return context === "info"
    ? publicEnv.NEXT_PUBLIC_WHATSAPP_INFO
    : publicEnv.NEXT_PUBLIC_WHATSAPP_BOOKING;
}

export type WhatsAppBookingDraft = {
  product: "pass" | "cabana" | "event";
  subjectLabel?: string;
  visitDate?: string | null;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  specialRequest?: string;
  totalEstimate?: number;
};

const H: Record<Locale, Record<string, string>> = {
  fr: {
    hello: "Bonjour Oxygen Island 👋",
    sub: "Je souhaite réserver.",
    details: "📋 *Détails*",
    me: "👤 *Mes informations*",
    request: "📝 *Demande particulière*",
    close: "Pouvez-vous me confirmer la disponibilité ? Merci.",
    product: "Type",
    subject: "Choix",
    date: "Date",
    guests: "Personnes",
    adults: "adulte",
    adultsPl: "adultes",
    children: "enfant",
    childrenPl: "enfants",
    name: "Nom",
    phone: "Téléphone",
    total: "Total estimé",
    pass: "Pass journée",
    cabana: "Cabana",
    event: "Événement",
  },
  en: {
    hello: "Hello Oxygen Island 👋",
    sub: "I'd like to book.",
    details: "📋 *Details*",
    me: "👤 *My information*",
    request: "📝 *Special request*",
    close: "Could you confirm availability? Thank you.",
    product: "Type",
    subject: "Choice",
    date: "Date",
    guests: "Guests",
    adults: "adult",
    adultsPl: "adults",
    children: "child",
    childrenPl: "children",
    name: "Name",
    phone: "Phone",
    total: "Estimated total",
    pass: "Day pass",
    cabana: "Cabana",
    event: "Event",
  },
  ar: {
    hello: "السلام عليكم Oxygen Island 👋",
    sub: "أودّ إجراء حجز.",
    details: "📋 *التفاصيل*",
    me: "👤 *معلوماتي*",
    request: "📝 *طلب خاص*",
    close: "هل يمكنكم تأكيد التوفّر؟ شكرًا.",
    product: "النوع",
    subject: "الاختيار",
    date: "التاريخ",
    guests: "الأشخاص",
    adults: "بالغ",
    adultsPl: "بالغين",
    children: "طفل",
    childrenPl: "أطفال",
    name: "الاسم",
    phone: "الهاتف",
    total: "المجموع التقديري",
    pass: "تذكرة يوم",
    cabana: "كابانا",
    event: "فعالية",
  },
};

function fmtDate(iso: string | null | undefined, locale: Locale): string {
  if (!iso) return "—";
  const map = { fr: "fr-FR", en: "en-GB", ar: "ar-DZ" } as const;
  return new Date(iso).toLocaleDateString(map[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fmtMoney(n: number, locale: Locale): string {
  const map = { fr: "fr-FR", en: "en-GB", ar: "ar-DZ" } as const;
  return (
    new Intl.NumberFormat(map[locale], { maximumFractionDigits: 0 }).format(n) +
    " DA"
  );
}

function plural(n: number, s: string, p: string): string {
  return n === 1 ? `${n} ${s}` : `${n} ${p}`;
}

export function buildWhatsAppMessage(
  draft: WhatsAppBookingDraft,
  locale: Locale = "fr",
): string {
  const h = H[locale];
  const lines: string[] = [];
  lines.push(h.hello, "", h.sub, "");
  lines.push(h.details);
  lines.push(`• ${h.product}: ${h[draft.product]}`);
  if (draft.subjectLabel) lines.push(`• ${h.subject}: ${draft.subjectLabel}`);
  if (draft.visitDate) lines.push(`• ${h.date}: ${fmtDate(draft.visitDate, locale)}`);

  const g: string[] = [];
  if (draft.adults > 0) g.push(plural(draft.adults, h.adults, h.adultsPl));
  if (draft.children > 0) g.push(plural(draft.children, h.children, h.childrenPl));
  if (g.length) lines.push(`• ${h.guests}: ${g.join(", ")}`);

  if (typeof draft.totalEstimate === "number" && draft.totalEstimate > 0) {
    lines.push(`• ${h.total}: ${fmtMoney(draft.totalEstimate, locale)}`);
  }

  lines.push("", h.me);
  if (draft.fullName) lines.push(`• ${h.name}: ${draft.fullName}`);
  if (draft.phone) lines.push(`• ${h.phone}: ${draft.phone}`);

  if (draft.specialRequest?.trim()) {
    lines.push("", h.request, draft.specialRequest.trim());
  }

  lines.push("", h.close);
  return lines.join("\n");
}

export function buildWhatsAppLink(
  message: string,
  number: string = getWhatsAppNumber("booking"),
): string {
  const cleaned = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
