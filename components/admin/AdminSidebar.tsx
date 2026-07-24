"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  QrCode,
  CalendarDays,
  FileText,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

type NavItem = { href: string; label: string; icon: LucideIcon };

const NAV: Record<Locale, NavItem[]> = {
  fr: [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/reservations", label: "Réservations", icon: Ticket },
    { href: "/admin/scan", label: "Scan QR", icon: QrCode },
    { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
    { href: "/admin/contenu", label: "Contenu", icon: FileText },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
  ],
  en: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/reservations", label: "Reservations", icon: Ticket },
    { href: "/admin/scan", label: "QR Scan", icon: QrCode },
    { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
    { href: "/admin/contenu", label: "Content", icon: FileText },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
  ],
  ar: [
    { href: "/admin", label: "لوحة القيادة", icon: LayoutDashboard },
    { href: "/admin/reservations", label: "الحجوزات", icon: Ticket },
    { href: "/admin/scan", label: "مسح QR", icon: QrCode },
    { href: "/admin/agenda", label: "الأجندة", icon: CalendarDays },
    { href: "/admin/contenu", label: "المحتوى", icon: FileText },
    { href: "/admin/notifications", label: "الإشعارات", icon: Bell },
  ],
};

const TITLE: Record<Locale, string> = {
  fr: "Espace staff",
  en: "Staff area",
  ar: "مساحة الطاقم",
};

export function AdminSidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nav = NAV[locale];

  return (
    <aside className="lg:w-60 lg:shrink-0">
      <div className="lg:sticky lg:top-20">
        <div className="mb-3 flex items-center justify-between gap-2 px-1">
          <span className="font-display text-sm font-semibold text-foreground">
            {TITLE[locale]}
          </span>
          <Badge variant="coral" className="uppercase tracking-wider">
            Admin
          </Badge>
        </div>
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border/60 bg-card p-2 shadow-sm lg:flex-col lg:overflow-visible">
          {nav.map((item) => {
            const href = `/${locale}${item.href}`;
            // Exact match for the dashboard root, prefix match for sub-pages.
            const active =
              item.href === "/admin"
                ? pathname === href
                : pathname.startsWith(href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition lg:shrink",
                  active
                    ? "bg-lagoon-500 text-sand"
                    : "text-ink-soft hover:bg-muted",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-sand" : "text-ink-muted",
                  )}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
