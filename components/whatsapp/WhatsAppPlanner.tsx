"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ChatPreview } from "@/components/whatsapp/ChatPreview";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCabanas, mockEvents, mockPasses } from "@/lib/data/mock";
import { formatCurrency, formatPhoneDZ } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  getWhatsAppNumber,
  type WhatsAppBookingDraft,
} from "@/lib/whatsapp/message";
import { cn } from "@/lib/utils";

type Product = "pass" | "cabana" | "event";

/** Minimal shared shape across passes / cabanas / events. */
type CatalogItem = {
  id: string;
  name_fr: string;
  name_en: string;
  name_ar: string;
  price: number | null;
};

const CATALOG: Record<Product, CatalogItem[]> = {
  pass: mockPasses,
  cabana: mockCabanas,
  event: mockEvents,
};

const CHILD_PASS_RATE =
  mockPasses.find((p) => p.audience === "child")?.price ?? 5000;

const BRAND = "Oxygen Island DZ";

function nameFor(item: CatalogItem, locale: Locale): string {
  if (locale === "ar") return item.name_ar;
  if (locale === "en") return item.name_en;
  return item.name_fr;
}

/**
 * Live estimate — mirrors lib/booking/pricing.ts but works off the
 * WhatsApp draft shape:
 *  · pass:   selected pass rate × adults + child rate × children
 *  · cabana: flat cabana price
 *  · event:  event price × max(1, guests); null price = quote-only
 */
function computeEstimate(
  product: Product,
  item: CatalogItem | null,
  adults: number,
  children: number,
): number {
  if (product === "pass") {
    const adultRate = item?.price ?? 8500;
    return adults * adultRate + children * CHILD_PASS_RATE;
  }
  if (product === "cabana") {
    return item?.price ?? 0;
  }
  const rate = item?.price ?? 0;
  return rate * Math.max(1, adults + children);
}

function phoneIsValid(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  const normalized = digits.startsWith("213")
    ? digits.slice(3)
    : digits.startsWith("0")
      ? digits.slice(1)
      : digits;
  return normalized.length >= 9;
}

function toCount(value: string): number {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(99, n));
}

type Strings = {
  formTitle: string;
  productLabel: string;
  products: Record<Product, string>;
  optionLabel: string;
  optionPlaceholder: string;
  dateLabel: string;
  adultsLabel: string;
  childrenLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  requestLabel: string;
  requestPlaceholder: string;
  previewTitle: string;
  online: string;
  totalLabel: string;
  quoteOnly: string;
  open: string;
  copy: string;
  copied: string;
  sendsTo: string;
  hint: string;
};

const STRINGS: Record<Locale, Strings> = {
  fr: {
    formTitle: "Votre demande",
    productLabel: "Que souhaitez-vous réserver ?",
    products: { pass: "Pass journée", cabana: "Cabana", event: "Événement" },
    optionLabel: "Votre choix",
    optionPlaceholder: "Sélectionnez",
    dateLabel: "Date de visite",
    adultsLabel: "Adultes",
    childrenLabel: "Enfants",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom",
    phoneLabel: "Téléphone",
    phonePlaceholder: "0660 05 65 83",
    requestLabel: "Demande particulière",
    requestPlaceholder: "Anniversaire, allergie, heure d'arrivée…",
    previewTitle: "Aperçu en direct",
    online: "en ligne",
    totalLabel: "Total estimé",
    quoteOnly: "Sur devis",
    open: "Ouvrir WhatsApp",
    copy: "Copier le message",
    copied: "Message copié",
    sendsTo: "Envoyé au",
    hint: "Ajoutez votre nom et un numéro valide pour activer l'envoi.",
  },
  en: {
    formTitle: "Your request",
    productLabel: "What would you like to book?",
    products: { pass: "Day pass", cabana: "Cabana", event: "Event" },
    optionLabel: "Your choice",
    optionPlaceholder: "Select",
    dateLabel: "Visit date",
    adultsLabel: "Adults",
    childrenLabel: "Children",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "0660 05 65 83",
    requestLabel: "Special request",
    requestPlaceholder: "Birthday, allergy, arrival time…",
    previewTitle: "Live preview",
    online: "online",
    totalLabel: "Estimated total",
    quoteOnly: "On quote",
    open: "Open WhatsApp",
    copy: "Copy message",
    copied: "Message copied",
    sendsTo: "Sends to",
    hint: "Add your name and a valid number to enable sending.",
  },
  ar: {
    formTitle: "طلبك",
    productLabel: "ماذا تودّ أن تحجز؟",
    products: { pass: "تذكرة يوم", cabana: "كابانا", event: "فعالية" },
    optionLabel: "اختيارك",
    optionPlaceholder: "اختر",
    dateLabel: "تاريخ الزيارة",
    adultsLabel: "بالغون",
    childrenLabel: "أطفال",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "اسمك",
    phoneLabel: "الهاتف",
    phonePlaceholder: "0660 05 65 83",
    requestLabel: "طلب خاص",
    requestPlaceholder: "عيد ميلاد، حساسية، وقت الوصول…",
    previewTitle: "معاينة مباشرة",
    online: "متصل",
    totalLabel: "المجموع التقديري",
    quoteOnly: "حسب العرض",
    open: "افتح واتساب",
    copy: "نسخ الرسالة",
    copied: "تم نسخ الرسالة",
    sendsTo: "يُرسَل إلى",
    hint: "أضف اسمك ورقمًا صالحًا لتفعيل الإرسال.",
  },
};

export function WhatsAppPlanner({ locale }: { locale: Locale }) {
  const s = STRINGS[locale];

  const [product, setProduct] = useState<Product>("pass");
  const [optionId, setOptionId] = useState<string>(CATALOG.pass[0]?.id ?? "");
  const [visitDate, setVisitDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [copied, setCopied] = useState(false);

  const options = CATALOG[product];
  const selected = options.find((o) => o.id === optionId) ?? options[0] ?? null;

  const total = computeEstimate(product, selected, adults, children);
  const quoteOnly = product === "event" && (selected?.price ?? null) === null;

  const nameOk = fullName.trim().length > 0;
  const phoneOk = phoneIsValid(phone);
  const canSend = nameOk && phoneOk;

  const draft: WhatsAppBookingDraft = useMemo(
    () => ({
      product,
      subjectLabel: selected ? nameFor(selected, locale) : undefined,
      visitDate: visitDate || null,
      adults,
      children,
      fullName: fullName.trim(),
      phone: phone.trim() ? formatPhoneDZ(phone) : "",
      specialRequest: specialRequest.trim() || undefined,
      totalEstimate: !quoteOnly && total > 0 ? total : undefined,
    }),
    [
      product,
      selected,
      locale,
      visitDate,
      adults,
      children,
      fullName,
      phone,
      specialRequest,
      quoteOnly,
      total,
    ],
  );

  const message = useMemo(
    () => buildWhatsAppMessage(draft, locale),
    [draft, locale],
  );

  const bookingNumber = getWhatsAppNumber("booking");
  const link = buildWhatsAppLink(message, bookingNumber);

  function handleProductChange(next: string) {
    const p = next as Product;
    setProduct(p);
    setOptionId(CATALOG[p][0]?.id ?? "");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* ── LEFT: form ─────────────────────────────────────────── */}
      <form
        className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-display text-xl font-semibold text-ink">
          {s.formTitle}
        </h2>

        <div className="mt-6 space-y-6">
          {/* Product */}
          <div className="space-y-2">
            <Label>{s.productLabel}</Label>
            <RadioGroup
              value={product}
              onValueChange={handleProductChange}
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {(Object.keys(s.products) as Product[]).map((p) => {
                const active = product === p;
                return (
                  <label
                    key={p}
                    htmlFor={`product-${p}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition",
                      active
                        ? "border-lagoon-500 bg-lagoon-50 text-ink"
                        : "border-border bg-background text-ink-muted hover:border-lagoon-300",
                    )}
                  >
                    <RadioGroupItem value={p} id={`product-${p}`} />
                    <span className="font-medium">{s.products[p]}</span>
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          {/* Specific option */}
          <div className="space-y-2">
            <Label htmlFor="option">{s.optionLabel}</Label>
            <Select value={optionId} onValueChange={setOptionId}>
              <SelectTrigger id="option">
                <SelectValue placeholder={s.optionPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {nameFor(o, locale)}
                    {typeof o.price === "number" && o.price > 0
                      ? ` — ${formatCurrency(o.price, locale)}`
                      : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="visit-date">{s.dateLabel}</Label>
            <Input
              id="visit-date"
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
          </div>

          {/* Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">{s.adultsLabel}</Label>
              <Input
                id="adults"
                type="number"
                inputMode="numeric"
                min={0}
                value={adults}
                onChange={(e) => setAdults(toCount(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="children">{s.childrenLabel}</Label>
              <Input
                id="children"
                type="number"
                inputMode="numeric"
                min={0}
                value={children}
                onChange={(e) => setChildren(toCount(e.target.value))}
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name">{s.nameLabel}</Label>
            <Input
              id="full-name"
              type="text"
              autoComplete="name"
              placeholder={s.namePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{s.phoneLabel}</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              placeholder={s.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn(
                phone.length > 0 && !phoneOk && "border-danger focus-visible:ring-danger",
              )}
            />
          </div>

          {/* Special request */}
          <div className="space-y-2">
            <Label htmlFor="request">{s.requestLabel}</Label>
            <Textarea
              id="request"
              rows={3}
              placeholder={s.requestPlaceholder}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </div>
        </div>
      </form>

      {/* ── RIGHT: live preview + actions ──────────────────────── */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-lagoon-600">
              {s.previewTitle}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <ChatPreview
            message={message}
            locale={locale}
            brand={BRAND}
            onlineLabel={s.online}
          />

          {/* Estimated total */}
          <div className="flex items-baseline justify-between rounded-2xl border border-border bg-card px-5 py-4">
            <span className="text-sm text-ink-muted">{s.totalLabel}</span>
            <span className="font-display text-2xl font-semibold text-ink">
              {quoteOnly ? s.quoteOnly : formatCurrency(total, locale)}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {canSend ? (
              <MagneticButton
                href={link}
                ariaLabel={s.open}
                className="w-full justify-center rounded-full bg-[#25d366] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#25d366]/30 transition hover:bg-[#1fbe5b]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <WhatsAppGlyph className="h-5 w-5" />
                  {s.open}
                </span>
              </MagneticButton>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-full bg-[#25d366]/40 px-6 py-4 text-base font-semibold text-white/80"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                {s.open}
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-lagoon-300 bg-background px-6 py-3 text-sm font-medium text-lagoon-700 transition hover:bg-lagoon-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  {s.copied}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {s.copy}
                </>
              )}
            </button>

            {!canSend && (
              <p className="text-center text-xs text-ink-muted">{s.hint}</p>
            )}

            <p className="text-center text-xs text-ink-muted">
              {s.sendsTo}{" "}
              <span dir="ltr" className="font-medium text-ink">
                {formatPhoneDZ(bookingNumber)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
