"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * LangSwitcher — minimal three-way locale toggle (FR · EN · ع).
 * Uses short codes to stay compact in the header chrome.
 */
export function LangSwitcher({
  current,
  tone = "light",
}: {
  current: Locale;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();

  const buildHref = (locale: Locale) => {
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join("/") || `/${locale}`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-px overflow-hidden rounded-full border",
        tone === "dark"
          ? "border-bronze/30 bg-terracotta/40"
          : "border-border bg-card",
      )}
      role="group"
      aria-label="Switch language"
    >
      {locales.map((l) => {
        const active = current === l;
        return (
          <Link
            key={l}
            href={buildHref(l)}
            aria-current={active ? "true" : undefined}
            lang={l}
            className={cn(
              "px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition",
              l === "ar" && "font-arabic text-base leading-none tracking-normal",
              active
                ? tone === "dark"
                  ? "bg-bronze text-terracotta"
                  : "bg-forest text-parchment"
                : tone === "dark"
                  ? "text-cream/65 hover:text-cream"
                  : "text-ink-soft hover:bg-muted",
            )}
          >
            {localeShort[l]}
          </Link>
        );
      })}
    </div>
  );
}
