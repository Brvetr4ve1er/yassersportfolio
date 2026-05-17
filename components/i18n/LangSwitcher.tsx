"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitcher({ current }: { current: Locale }) {
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
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-1 py-1"
      role="group"
      aria-label="Switch language"
    >
      <Languages className="ms-1.5 h-3.5 w-3.5 text-muted-foreground" />
      {locales.map((l) => (
        <Link
          key={l}
          href={buildHref(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition",
            current === l
              ? "bg-forest text-parchment"
              : "text-ink-soft hover:bg-muted",
          )}
          aria-current={current === l ? "true" : undefined}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
