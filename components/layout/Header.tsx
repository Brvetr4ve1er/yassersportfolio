"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { LangSwitcher } from "@/components/i18n/LangSwitcher";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

const NAV: Record<Locale, { href: string; label: string }[]> = {
  fr: [
    { href: "#concept", label: "Concept" },
    { href: "#pass", label: "Pass" },
    { href: "#cabanas", label: "Cabanas" },
    { href: "#evenements", label: "Événements" },
    { href: "#contact", label: "Contact" },
  ],
  en: [
    { href: "#concept", label: "Concept" },
    { href: "#pass", label: "Day Pass" },
    { href: "#cabanas", label: "Cabanas" },
    { href: "#evenements", label: "Events" },
    { href: "#contact", label: "Contact" },
  ],
  ar: [
    { href: "#concept", label: "المفهوم" },
    { href: "#pass", label: "تذكرة اليوم" },
    { href: "#cabanas", label: "كابانا" },
    { href: "#evenements", label: "الفعاليات" },
    { href: "#contact", label: "اتصل بنا" },
  ],
};

export function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = NAV[locale];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-sand/15 bg-deepwater/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href={`/${locale}`} aria-label="Oxygen Island">
          <BrandMark variant="wordmark" tone="sand" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-sand/15 bg-deepwater/40 px-2 py-1 backdrop-blur">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-sand/70 transition hover:bg-sand/10 hover:text-sand"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangSwitcher current={locale} tone="dark" />
          </div>
          <a
            href="#pass"
            className="hidden rounded-full bg-coral px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-deepwater transition hover:bg-coral-light sm:inline-flex"
          >
            Réserver
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 text-sand md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-deepwater/97 backdrop-blur-xl md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="container flex h-16 items-center justify-between">
            <BrandMark variant="wordmark" tone="sand" />
            <button onClick={() => setOpen(false)} className="p-2 text-sand">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container mt-12 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand/15 py-4 font-display text-2xl font-medium text-sand"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#pass"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-fit rounded-full bg-coral px-6 py-3 text-xs uppercase tracking-widest text-deepwater"
            >
              Réserver
            </a>
            <div className="mt-8">
              <LangSwitcher current={locale} tone="dark" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
