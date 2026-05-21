"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WordMark } from "@/components/brand/WordMark";
import { LangSwitcher } from "@/components/i18n/LangSwitcher";
import { useI18n } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/**
 * CinematicHeader — used only on the cinematic homepage. Starts transparent
 * over the dark hero, becomes a slim noir bar on scroll. All nav text in
 * cream over noir. This is *not* the same chrome as the booking/account/
 * admin pages — those use the lighter parchment Header.tsx.
 */
export function CinematicHeader({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: `/${locale}/hebergement`, label: t("common.nav.accommodations") },
    { href: `/${locale}/activites`, label: t("common.nav.activities") },
    { href: `/${locale}/packages`, label: t("common.nav.packages") },
    { href: `/${locale}/restaurant`, label: t("common.nav.restaurant") },
    { href: `/${locale}/carte`, label: locale === "ar" ? "الخريطة" : locale === "en" ? "Map" : "Carte" },
    { href: `/${locale}/galerie`, label: t("common.nav.gallery") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-bronze/15 bg-terracotta/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href={`/${locale}`} aria-label="L'Étoile de l'Est — accueil">
          <WordMark tone="cream" size="default" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[11px] uppercase tracking-widest transition",
                pathname.startsWith(item.href)
                  ? "text-bronze"
                  : "text-cream/70 hover:text-cream",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangSwitcher current={locale} tone="dark" />
          </div>
          <Link
            href={`/${locale}/reservation`}
            className="hidden rounded-full border border-bronze/60 px-5 py-2 text-[11px] uppercase tracking-widest text-bronze transition hover:border-bronze hover:bg-bronze hover:text-terracotta sm:inline-flex"
          >
            Réserver
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-cream md:hidden"
            aria-label={t("common.actions.openMenu")}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-terracotta/97 backdrop-blur-xl md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="container flex h-16 items-center justify-between">
            <WordMark tone="cream" size="default" />
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-cream"
              aria-label={t("common.actions.closeMenu")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container mt-12 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-bronze/15 py-4 font-serif text-2xl font-light text-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/compte`}
              onClick={() => setOpen(false)}
              className="mt-6 text-xs uppercase tracking-widest text-cream/60"
            >
              {t("common.nav.account")}
            </Link>
            <Link
              href={`/${locale}/reservation`}
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-bronze bg-bronze px-6 py-3 text-xs uppercase tracking-widest text-terracotta"
            >
              Réserver
            </Link>
            <div className="mt-8">
              <LangSwitcher current={locale} tone="dark" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
