"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";

type Dictionary = Record<string, unknown>;

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (path: string, vars?: Record<string, string | number>) => string;
  raw: <T = unknown>(path: string) => T | undefined;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function resolve(dict: Dictionary, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined),
      dict,
    );
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = vars[key];
    return v == null ? `{{${key}}}` : String(v);
  });
}

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = resolve(dictionary, path);
      if (typeof value === "string") return interpolate(value, vars);
      if (value == null) return path;
      return String(value);
    },
    [dictionary],
  );

  const raw = useCallback(
    <T,>(path: string) => resolve(dictionary, path) as T | undefined,
    [dictionary],
  );

  const value = useMemo(
    () => ({ locale, dir, t, raw }),
    [locale, dir, t, raw],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
