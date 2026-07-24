"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand/BrandMark";
import { LangSwitcher } from "@/components/i18n/LangSwitcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

const NAV: Record<Locale, { href: string; label: string }[]> = {
  fr: [
    { href: "/reservation", label: "Réserver" },
    { href: "/carte", label: "Plan du lagon" },
    { href: "/compte", label: "Mon compte" },
  ],
  en: [
    { href: "/reservation", label: "Book" },
    { href: "/carte", label: "Lagoon map" },
    { href: "/compte", label: "Account" },
  ],
  ar: [
    { href: "/reservation", label: "احجز" },
    { href: "/carte", label: "خريطة البحيرة" },
    { href: "/compte", label: "حسابي" },
  ],
};

export function ShellHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nav = NAV[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label="Oxygen Island">
          <BrandMark variant="wordmark" tone="ink" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const href = `/${locale}${item.href}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition",
                  active
                    ? "bg-lagoon-500 text-sand"
                    : "text-ink-soft hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher current={locale} />
          <Link
            href={`/${locale}/reservation`}
            className="hidden rounded-full bg-coral px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-deepwater transition hover:bg-coral-light sm:inline-flex"
          >
            {locale === "ar" ? "احجز" : locale === "en" ? "Book" : "Réserver"}
          </Link>
        </div>
      </div>
    </header>
  );
}
