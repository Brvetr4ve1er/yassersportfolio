export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
};

export const namespaces = [
  "common",
  "home",
  "booking",
  "accommodation",
  "activity",
  "account",
  "admin",
] as const;
export type Namespace = (typeof namespaces)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
