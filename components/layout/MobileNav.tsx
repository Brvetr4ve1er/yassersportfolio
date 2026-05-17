"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarPlus, Home, Sparkles, User } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

export function MobileNav({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const pathname = usePathname();

  const items = [
    { href: `/${locale}`, icon: Home, label: t("common.nav.home") },
    { href: `/${locale}/activites`, icon: Sparkles, label: t("common.nav.activities") },
    { href: `/${locale}/reservation`, icon: CalendarPlus, label: t("common.nav.book") },
    { href: `/${locale}/compte`, icon: User, label: t("common.nav.account") },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-card md:hidden">
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-xs",
                isActive(item.href)
                  ? "text-forest"
                  : "text-muted-foreground hover:text-forest",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
