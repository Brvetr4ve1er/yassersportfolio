import type { Locale } from "@/types/domain";

/**
 * Two WhatsApp numbers from the Étoile de l'Est Instagram bios.
 * REPLACE these with the real numbers from @etoiledelest.dz +
 * the Sunset Pool bio before going live. Format: digits only (no +).
 */
const FALLBACK_NUMBER_ETOILE =
  process.env.NEXT_PUBLIC_WHATSAPP_BOOKING ?? "213555000000";
const FALLBACK_NUMBER_POOL =
  process.env.NEXT_PUBLIC_WHATSAPP_POOL ?? FALLBACK_NUMBER_ETOILE;

export type WhatsAppContext = "booking" | "pool";

export function getWhatsAppNumber(context: WhatsAppContext = "booking") {
  return context === "pool" ? FALLBACK_NUMBER_POOL : FALLBACK_NUMBER_ETOILE;
}

export type WhatsAppBookingDraft = {
  type: "accommodation" | "activity" | "package";
  // Display labels, already localized
  subjectLabel?: string;
  checkIn?: string | null;
  checkOut?: string | null;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  specialRequest?: string;
  totalEstimate?: number;
};

const HEADERS: Record<Locale, { hello: string; sub: string; details: string; me: string; request: string; close: string }> = {
  fr: {
    hello: "Bonjour L'Étoile de l'Est 👋",
    sub: "Je souhaite réserver chez vous.",
    details: "📋 *Détails*",
    me: "👤 *Mes informations*",
    request: "📝 *Demande particulière*",
    close: "Pouvez-vous me confirmer la disponibilité ? Merci.",
  },
  en: {
    hello: "Hello L'Étoile de l'Est 👋",
    sub: "I'd like to book with you.",
    details: "📋 *Details*",
    me: "👤 *My information*",
    request: "📝 *Special request*",
    close: "Could you confirm availability? Thank you.",
  },
  ar: {
    hello: "السلام عليكم نجمة الشرق 👋",
    sub: "أودّ إجراء حجز عندكم.",
    details: "📋 *تفاصيل الحجز*",
    me: "👤 *معلوماتي*",
    request: "📝 *طلب خاص*",
    close: "هل يمكنكم تأكيد التوفّر؟ شكرًا.",
  },
};

const TYPE_LABEL: Record<Locale, Record<WhatsAppBookingDraft["type"], string>> = {
  fr: { accommodation: "Séjour", activity: "Activité", package: "Forfait" },
  en: { accommodation: "Stay", activity: "Activity", package: "Package" },
  ar: { accommodation: "إقامة", activity: "نشاط", package: "عرض" },
};

const FIELD: Record<Locale, Record<string, string>> = {
  fr: {
    type: "Type",
    subject: "Choix",
    checkIn: "Arrivée",
    checkOut: "Départ",
    guests: "Personnes",
    adults: "adulte",
    adultsPl: "adultes",
    children: "enfant",
    childrenPl: "enfants",
    name: "Nom",
    phone: "Téléphone",
    total: "Total estimé",
  },
  en: {
    type: "Type",
    subject: "Choice",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    adults: "adult",
    adultsPl: "adults",
    children: "child",
    childrenPl: "children",
    name: "Name",
    phone: "Phone",
    total: "Estimated total",
  },
  ar: {
    type: "النوع",
    subject: "الاختيار",
    checkIn: "الوصول",
    checkOut: "المغادرة",
    guests: "الأشخاص",
    adults: "بالغ",
    adultsPl: "بالغين",
    children: "طفل",
    childrenPl: "أطفال",
    name: "الاسم",
    phone: "الهاتف",
    total: "المجموع التقديري",
  },
};

function fmtDate(iso: string | null | undefined, locale: Locale): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(
    locale === "ar" ? "ar-DZ" : locale === "en" ? "en-GB" : "fr-FR",
    { day: "2-digit", month: "long", year: "numeric" },
  );
}

function fmtMoney(n: number, locale: Locale): string {
  return new Intl.NumberFormat(
    locale === "ar" ? "ar-DZ" : locale === "en" ? "en-GB" : "fr-FR",
    { maximumFractionDigits: 0 },
  ).format(n) + " DA";
}

function pluralize(n: number, singular: string, plural: string): string {
  return n === 1 ? `${n} ${singular}` : `${n} ${plural}`;
}

/**
 * Build the structured WhatsApp message text for a booking draft.
 * Uses WhatsApp's lightweight markdown: *bold*, _italic_.
 */
export function buildWhatsAppMessage(
  draft: WhatsAppBookingDraft,
  locale: Locale = "fr",
): string {
  const h = HEADERS[locale];
  const f = FIELD[locale];
  const types = TYPE_LABEL[locale];

  const lines: string[] = [];

  lines.push(h.hello);
  lines.push("");
  lines.push(h.sub);
  lines.push("");

  // Booking details
  lines.push(h.details);
  lines.push(`• ${f.type}: ${types[draft.type]}`);
  if (draft.subjectLabel) {
    lines.push(`• ${f.subject}: ${draft.subjectLabel}`);
  }
  if (draft.checkIn) {
    lines.push(`• ${f.checkIn}: ${fmtDate(draft.checkIn, locale)}`);
  }
  if (draft.checkOut) {
    lines.push(`• ${f.checkOut}: ${fmtDate(draft.checkOut, locale)}`);
  }

  const guestParts: string[] = [];
  if (draft.adults > 0) {
    guestParts.push(
      pluralize(draft.adults, f.adults, f.adultsPl),
    );
  }
  if (draft.children > 0) {
    guestParts.push(
      pluralize(draft.children, f.children, f.childrenPl),
    );
  }
  if (guestParts.length) {
    lines.push(`• ${f.guests}: ${guestParts.join(", ")}`);
  }

  if (typeof draft.totalEstimate === "number" && draft.totalEstimate > 0) {
    lines.push(`• ${f.total}: ${fmtMoney(draft.totalEstimate, locale)}`);
  }

  lines.push("");

  // Personal info
  lines.push(h.me);
  if (draft.fullName) lines.push(`• ${f.name}: ${draft.fullName}`);
  if (draft.phone) lines.push(`• ${f.phone}: ${draft.phone}`);

  // Special request
  if (draft.specialRequest && draft.specialRequest.trim()) {
    lines.push("");
    lines.push(h.request);
    lines.push(draft.specialRequest.trim());
  }

  lines.push("");
  lines.push(h.close);

  return lines.join("\n");
}

/**
 * Compose the wa.me link the user clicks. Uses api.whatsapp.com on desktop
 * (opens WhatsApp Web) and wa.me on mobile (deep-links into the app).
 */
export function buildWhatsAppLink(
  message: string,
  number: string = getWhatsAppNumber("booking"),
): string {
  const cleaned = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
