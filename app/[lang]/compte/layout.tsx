import Link from "next/link";
import { Calendar, LogOut, QrCode, Star, User } from "lucide-react";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["account", "common"])) as {
    account: { account: { dashboard: { quickActions: Record<string, string> } } };
    common: { common: { nav: Record<string, string> } };
  };
  const labels = dict.account.account.dashboard.quickActions;
  const c = dict.common.common;

  const links = [
    { href: `/${params.lang}/compte`, icon: User, label: c.nav.account },
    { href: `/${params.lang}/compte/reservations`, icon: Calendar, label: labels.reservations },
    { href: `/${params.lang}/compte/qr-checkin`, icon: QrCode, label: labels.qr },
    { href: `/${params.lang}/compte/fidelite`, icon: Star, label: labels.fidelity },
    { href: `/${params.lang}/compte/profil`, icon: User, label: labels.profile },
  ];

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
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
          <button className="mt-4 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-danger">
            <LogOut className="h-4 w-4" />
            {c.nav.logout}
          </button>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
