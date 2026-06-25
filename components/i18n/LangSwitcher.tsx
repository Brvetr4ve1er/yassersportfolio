"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LangSwitcher({
  current,
  tone = "light",
}: {
  current: Locale;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const buildHref = (l: Locale) => {
    const segs = pathname.split("/");
    if (segs[1] && (locales as readonly string[]).includes(segs[1])) {
      segs[1] = l;
    } else {
      segs.splice(1, 0, l);
    }
    return segs.join("/") || `/${l}`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-px overflow-hidden rounded-full border",
        tone === "dark"
          ? "border-sand/25 bg-deepwater/40"
          : "border-border bg-card",
      )}
    >
      {locales.map((l) => {
        const active = current === l;
        return (
          <Link
            key={l}
            href={buildHref(l)}
            lang={l}
            className={cn(
              "px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition",
              l === "ar" && "font-arabic text-base tracking-normal leading-none",
              active
                ? tone === "dark"
                  ? "bg-lagoon-500 text-sand"
                  : "bg-deepwater text-sand"
                : tone === "dark"
                  ? "text-sand/65 hover:text-sand"
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
