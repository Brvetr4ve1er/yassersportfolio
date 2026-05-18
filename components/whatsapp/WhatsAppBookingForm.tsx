"use client";

import { useMemo, useState } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Phone, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { MagneticButton } from "@/components/motion/MagneticButton";
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  getWhatsAppNumber,
  type WhatsAppBookingDraft,
} from "@/lib/whatsapp/message";
import {
  mockAccommodations,
  mockActivities,
  mockPackages,
} from "@/lib/data/mock";
import {
  totalAccommodation,
  totalActivity,
  totalPackage,
} from "@/lib/booking/pricing";
import { formatPhoneDZ } from "@/lib/i18n/format";
import type { Locale } from "@/types/domain";

const TODAY_ISO = () => new Date().toISOString().slice(0, 10);
const TOMORROW_ISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

type Type = WhatsAppBookingDraft["type"];

const TYPE_LABELS: Record<Locale, Record<Type, string>> = {
  fr: {
    accommodation: "Séjour",
    activity: "Activité",
    package: "Forfait",
  },
  en: {
    accommodation: "Stay",
    activity: "Activity",
    package: "Package",
  },
  ar: {
    accommodation: "إقامة",
    activity: "نشاط",
    package: "عرض",
  },
};

const STRINGS: Record<Locale, Record<string, string>> = {
  fr: {
    title1: "Préparons votre message",
    title2: "ensemble.",
    intro:
      "Remplissez ces quelques champs. À l'étape suivante, votre message s'ouvrira dans WhatsApp, formaté et adressé directement à L'Étoile.",
    formTitle: "Votre demande",
    subjectAccommodation: "Hébergement",
    subjectActivity: "Activité",
    subjectPackage: "Forfait",
    checkIn: "Date d'arrivée",
    checkOut: "Date de départ",
    activityDate: "Date souhaitée",
    adults: "Adultes",
    children: "Enfants (-12 ans)",
    fullName: "Nom complet",
    phone: "Numéro de téléphone",
    phoneHint: "Format : 0X XX XX XX XX",
    special: "Demande particulière (optionnel)",
    specialPlaceholder:
      "Arrivée tardive, allergies, célébration, animal de compagnie…",
    previewTitle: "Aperçu du message",
    previewSubtitle:
      "Voici ce qui sera ouvert dans WhatsApp. Vous pouvez encore modifier le texte avant d'envoyer.",
    openWhatsApp: "Ouvrir WhatsApp",
    sendingTo: "Envoyé au",
    copyMessage: "Copier le message",
    copied: "Copié !",
    estimatedTotal: "Total estimé",
    nightSingular: "nuit",
    nightPlural: "nuits",
  },
  en: {
    title1: "Let's draft your message",
    title2: "together.",
    intro:
      "Fill in these few fields. On the next step, your message will open in WhatsApp, formatted and addressed directly to L'Étoile.",
    formTitle: "Your request",
    subjectAccommodation: "Accommodation",
    subjectActivity: "Activity",
    subjectPackage: "Package",
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    activityDate: "Preferred date",
    adults: "Adults",
    children: "Children (under 12)",
    fullName: "Full name",
    phone: "Phone number",
    phoneHint: "Format: 0X XX XX XX XX",
    special: "Special request (optional)",
    specialPlaceholder:
      "Late arrival, allergies, celebration, pet…",
    previewTitle: "Message preview",
    previewSubtitle:
      "Here's what will open in WhatsApp. You can still edit the text before sending.",
    openWhatsApp: "Open WhatsApp",
    sendingTo: "Sent to",
    copyMessage: "Copy message",
    copied: "Copied!",
    estimatedTotal: "Estimated total",
    nightSingular: "night",
    nightPlural: "nights",
  },
  ar: {
    title1: "لنحضّر رسالتك",
    title2: "معًا.",
    intro:
      "املأ هذه الحقول القليلة. في الخطوة التالية، ستُفتح رسالتك في واتساب، مصاغة وموجّهة مباشرة إلى نجمة الشرق.",
    formTitle: "طلبك",
    subjectAccommodation: "الإقامة",
    subjectActivity: "النشاط",
    subjectPackage: "العرض",
    checkIn: "تاريخ الوصول",
    checkOut: "تاريخ المغادرة",
    activityDate: "التاريخ المطلوب",
    adults: "بالغون",
    children: "أطفال (أقل من 12)",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    phoneHint: "الصيغة: 0X XX XX XX XX",
    special: "طلب خاص (اختياري)",
    specialPlaceholder: "وصول متأخر، حساسية، احتفال، حيوان أليف…",
    previewTitle: "معاينة الرسالة",
    previewSubtitle: "هذا ما سيُفتح في واتساب. يمكنك تعديل النص قبل الإرسال.",
    openWhatsApp: "فتح واتساب",
    sendingTo: "إلى",
    copyMessage: "نسخ الرسالة",
    copied: "تم النسخ!",
    estimatedTotal: "المجموع التقديري",
    nightSingular: "ليلة",
    nightPlural: "ليلة",
  },
};

export function WhatsAppBookingForm({ locale }: { locale: Locale }) {
  const s = STRINGS[locale];
  const lenis = useLenis();

  const [type, setType] = useState<Type>("accommodation");
  const [subjectId, setSubjectId] = useState<string>(mockAccommodations[0].id);
  const [checkIn, setCheckIn] = useState<string>(TODAY_ISO());
  const [checkOut, setCheckOut] = useState<string>(TOMORROW_ISO());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [copied, setCopied] = useState(false);

  // Reset subject when type changes
  const handleTypeChange = (next: Type) => {
    setType(next);
    if (next === "accommodation") setSubjectId(mockAccommodations[0].id);
    else if (next === "activity") setSubjectId(mockActivities[0].id);
    else setSubjectId(mockPackages[0].id);
  };

  // Compute subject label + price estimate from current selection
  const { subjectLabel, totalEstimate } = useMemo(() => {
    if (type === "accommodation") {
      const acc = mockAccommodations.find((a) => a.id === subjectId);
      if (!acc) return { subjectLabel: "", totalEstimate: 0 };
      const label = locale === "ar" ? acc.name_ar : acc.name_fr;
      const total =
        checkIn && checkOut && checkOut > checkIn
          ? totalAccommodation(acc, checkIn, checkOut)
          : 0;
      return { subjectLabel: label, totalEstimate: total };
    }
    if (type === "activity") {
      const act = mockActivities.find((a) => a.id === subjectId);
      if (!act) return { subjectLabel: "", totalEstimate: 0 };
      const label = locale === "ar" ? act.name_ar : act.name_fr;
      return {
        subjectLabel: label,
        totalEstimate: totalActivity(act, adults + children),
      };
    }
    const pkg = mockPackages.find((p) => p.id === subjectId);
    if (!pkg) return { subjectLabel: "", totalEstimate: 0 };
    const label = locale === "ar" ? pkg.name_ar : pkg.name_fr;
    return { subjectLabel: label, totalEstimate: totalPackage(pkg) };
  }, [type, subjectId, checkIn, checkOut, adults, children, locale]);

  // Build the draft, then the message + link
  const draft: WhatsAppBookingDraft = {
    type,
    subjectLabel,
    checkIn: type === "package" ? null : checkIn,
    checkOut: type === "accommodation" ? checkOut : null,
    adults,
    children,
    fullName: fullName.trim(),
    phone: phone.trim(),
    specialRequest: specialRequest.trim() || undefined,
    totalEstimate,
  };
  const message = buildWhatsAppMessage(draft, locale);
  const number = getWhatsAppNumber(type === "activity" && subjectId === "act-3" ? "pool" : "booking");
  const link = buildWhatsAppLink(message, number);
  const numberDisplay = formatPhoneDZ(number);

  const subjectOptions =
    type === "accommodation"
      ? mockAccommodations.map((a) => ({
          id: a.id,
          label: locale === "ar" ? a.name_ar : a.name_fr,
        }))
      : type === "activity"
        ? mockActivities.map((a) => ({
            id: a.id,
            label: locale === "ar" ? a.name_ar : a.name_fr,
          }))
        : mockPackages.map((p) => ({
            id: p.id,
            label: locale === "ar" ? p.name_ar : p.name_fr,
          }));

  const canSubmit = fullName.trim().length >= 2 && phone.trim().length >= 9;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
      {/* FORM */}
      <div>
        <h2 className="font-serif text-lg font-medium uppercase tracking-[0.22em] text-clay-700">
          {s.formTitle}
        </h2>
        <div className="mt-6 space-y-6">
          {/* Type radio */}
          <div className="space-y-3">
            <Label>{TYPE_LABELS[locale][type]}</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => handleTypeChange(v as Type)}
              className="grid grid-cols-3 gap-2"
            >
              {(["accommodation", "activity", "package"] as Type[]).map((t) => (
                <label
                  key={t}
                  className={`cursor-pointer rounded-md border px-3 py-2.5 text-center text-sm transition ${
                    type === t
                      ? "border-clay-600 bg-clay-500/10 text-clay-700"
                      : "border-border bg-card text-muted-foreground hover:border-clay-500/40"
                  }`}
                >
                  <RadioGroupItem value={t} className="sr-only" />
                  {TYPE_LABELS[locale][t]}
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Subject select */}
          <div className="space-y-1.5">
            <Label htmlFor="subject">
              {type === "accommodation"
                ? s.subjectAccommodation
                : type === "activity"
                  ? s.subjectActivity
                  : s.subjectPackage}
            </Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger id="subject">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="checkin" className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-clay-600" />
                {type === "activity" ? s.activityDate : s.checkIn}
              </Label>
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                min={TODAY_ISO()}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            {type === "accommodation" && (
              <div className="space-y-1.5">
                <Label htmlFor="checkout" className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-clay-600" />
                  {s.checkOut}
                </Label>
                <Input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="adults" className="flex items-center gap-1.5">
                <Users className="h-3 w-3 text-clay-600" />
                {s.adults}
              </Label>
              <Input
                id="adults"
                type="number"
                min={1}
                max={20}
                value={adults}
                onChange={(e) =>
                  setAdults(Math.max(1, parseInt(e.target.value || "1", 10)))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="children">{s.children}</Label>
              <Input
                id="children"
                type="number"
                min={0}
                max={20}
                value={children}
                onChange={(e) =>
                  setChildren(Math.max(0, parseInt(e.target.value || "0", 10)))
                }
              />
            </div>
          </div>

          {/* Name + phone */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                <User className="h-3 w-3 text-clay-600" />
                {s.fullName}
              </Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Karim Belkacem"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-clay-600" />
                {s.phone}
              </Label>
              <Input
                id="phone"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0555 12 34 56"
              />
            </div>
          </div>

          {/* Special request */}
          <div className="space-y-1.5">
            <Label htmlFor="special">{s.special}</Label>
            <Textarea
              id="special"
              rows={3}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder={s.specialPlaceholder}
            />
          </div>
        </div>
      </div>

      {/* PREVIEW + SEND */}
      <div className="md:sticky md:top-28 md:self-start">
        <h2 className="font-serif text-lg font-medium uppercase tracking-[0.22em] text-clay-700">
          {s.previewTitle}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{s.previewSubtitle}</p>

        {/* Phone-shaped chat preview */}
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          className="mt-6 rounded-2xl border border-clay-500/30 bg-gradient-to-b from-[#0c5f4b] to-[#075e54] p-4 shadow-2xl shadow-terracotta-dark/20"
        >
          <div className="rounded-xl bg-[#ece5dd] p-4">
            <motion.div
              key={message}
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-full rounded-lg rounded-br-sm bg-[#d9fdd3] px-4 py-3 text-[13.5px] leading-relaxed text-[#111b21] shadow-sm"
              style={{ fontFamily: 'ui-sans-serif, system-ui, "Apple Color Emoji", "Segoe UI"' }}
            >
              <pre
                className={`whitespace-pre-wrap break-words font-sans ${locale === "ar" ? "text-end" : ""}`}
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                {message}
              </pre>
              <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-[#667781]">
                {new Date().toLocaleTimeString(
                  locale === "ar" ? "ar-DZ" : locale === "en" ? "en-GB" : "fr-FR",
                  { hour: "2-digit", minute: "2-digit" },
                )}
                <span aria-hidden>✓✓</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Total estimate */}
        {totalEstimate > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-md border border-clay-500/30 bg-clay-500/10 px-4 py-3">
            <span className="text-xs uppercase tracking-[0.22em] text-clay-700">
              {s.estimatedTotal}
            </span>
            <span className="font-mono text-base font-semibold text-terracotta">
              {new Intl.NumberFormat(
                locale === "ar" ? "ar-DZ" : locale === "en" ? "en-GB" : "fr-FR",
                { maximumFractionDigits: 0 },
              ).format(totalEstimate)}{" "}
              DA
            </span>
          </div>
        )}

        {/* Send actions */}
        <div className="mt-6 flex flex-col gap-3">
          <MagneticButton
            href={canSubmit ? link : "#"}
            strength={0.35}
            radius={120}
            className={`group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition ${
              canSubmit
                ? "bg-[#25d366] text-white hover:bg-[#1ebe5d]"
                : "pointer-events-none bg-muted text-muted-foreground"
            }`}
          >
            {/* WhatsApp glyph */}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            {s.openWhatsApp}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </MagneticButton>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-ink-soft transition hover:border-clay-500/40 hover:text-clay-700 disabled:opacity-50"
          >
            {copied ? s.copied : s.copyMessage}
          </button>

          <p className="mt-1 text-center text-[11px] text-muted-foreground">
            <span className="text-clay-700">{s.sendingTo}</span>{" "}
            <span className="font-mono text-foreground">{numberDisplay}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
