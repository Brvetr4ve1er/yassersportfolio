import type { Locale } from "@/lib/i18n/config";

const localeMap: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ar: "ar-DZ",
};

export function formatCurrency(amount: number, locale: Locale): string {
  const n = new Intl.NumberFormat(localeMap[locale], {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${n} DA`;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeMap[locale]).format(value);
}

export function formatDate(date: Date | string, locale: Locale): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateShort(date: Date | string, locale: Locale): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(localeMap[locale], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function formatPhoneDZ(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const normalized = digits.startsWith("213")
    ? digits.slice(3)
    : digits.startsWith("0")
      ? digits.slice(1)
      : digits;
  const chunks = normalized.match(/.{1,2}/g) ?? [];
  return `+213 ${chunks.join(" ")}`;
}
