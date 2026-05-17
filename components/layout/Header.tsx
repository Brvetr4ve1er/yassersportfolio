"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Star, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LangSwitcher } from "@/components/i18n/LangSwitcher";
import { useI18n } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export function Header({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t("common.nav.home") },
    { href: `/${locale}/hebergement`, label: t("common.nav.accommodations") },
    { href: `/${locale}/activites`, label: t("common.nav.activities") },
    { href: `/${locale}/packages`, label: t("common.nav.packages") },
    { href: `/${locale}/restaurant`, label: t("common.nav.restaurant") },
    { href: `/${locale}/galerie`, label: t("common.nav.gallery") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-parchment-50/90 backdrop-blur supports-[backdrop-filter]:bg-parchment-50/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-serif text-lg font-semibold text-forest"
        >
          <Star className="h-5 w-5 fill-gold text-gold" />
          <span className="hidden sm:inline">{t("common.brand.name")}</span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                isActive(item.href)
                  ? "text-forest"
                  : "text-ink-soft hover:text-forest hover:bg-forest/5",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher current={locale} />
          <Button asChild size="sm" className="hidden sm:inline-flex" variant="gold">
            <Link href={`/${locale}/reservation`}>{t("common.nav.book")}</Link>
          </Button>
          <button
            type="button"
            className="rounded-md p-2 text-ink-soft md:hidden"
            onClick={() => setOpen(true)}
            aria-label={t("common.actions.openMenu")}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest-900/70 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="ms-auto h-full w-80 max-w-[85%] bg-parchment-50 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-forest">
                {t("common.brand.name")}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("common.actions.closeMenu")}
              >
                <X className="h-5 w-5 text-ink-soft" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-base",
                    isActive(item.href)
                      ? "bg-forest/10 text-forest"
                      : "text-ink-soft hover:bg-forest/5",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/compte`}
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md px-3 py-2.5 text-base text-ink-soft"
              >
                {t("common.nav.account")}
              </Link>
              <Button asChild className="mt-4" variant="gold">
                <Link href={`/${locale}/reservation`} onClick={() => setOpen(false)}>
                  {t("common.nav.book")}
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
