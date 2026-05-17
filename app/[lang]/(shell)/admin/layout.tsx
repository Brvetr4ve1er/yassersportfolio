import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Pencil,
  ScanLine,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: { admin: { tabs: Record<string, string> } };
  };
  const tabs = dict.admin.admin.tabs;

  const links = [
    { href: `/${params.lang}/admin`, icon: LayoutDashboard, label: "Dashboard" },
    { href: `/${params.lang}/admin/reservations`, icon: ClipboardList, label: tabs.bookings },
    { href: `/${params.lang}/admin/scan`, icon: ScanLine, label: tabs.scan },
    { href: `/${params.lang}/admin/agenda`, icon: CalendarDays, label: tabs.agenda },
    { href: `/${params.lang}/admin/contenu`, icon: Pencil, label: tabs.content },
    { href: `/${params.lang}/admin/notifications`, icon: Megaphone, label: tabs.notifications },
  ];

  return (
    <div className="container py-8">
      <div className="mb-2 inline-block rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs uppercase tracking-wider text-warning">
        Admin
      </div>
      <div className="mt-3 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft transition hover:bg-muted hover:text-forest"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
