import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  QrCode,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { mockBookings, mockUser } from "@/lib/data/mock";
import { formatCurrency, formatDate } from "@/lib/i18n/format";
import { bookingProductName, toDateKey } from "@/components/booking/shared";
import type { Locale } from "@/lib/i18n/config";
import type { BookingStatus } from "@/types/domain";

const COPY: Record<
  Locale,
  {
    greeting: string;
    subtitle: string;
    upcoming: string;
    noUpcoming: string;
    noUpcomingCta: string;
    guests: string;
    showQr: string;
    quickTitle: string;
    links: { book: string; reservations: string; qr: string; map: string };
    linkDesc: { book: string; reservations: string; qr: string; map: string };
    statuses: Record<BookingStatus, string>;
    adults: string;
    children: string;
  }
> = {
  fr: {
    greeting: "Bonjour",
    subtitle: "Voici un aperçu de votre compte Oxygen Island.",
    upcoming: "Votre prochaine visite",
    noUpcoming: "Aucune visite à venir pour le moment.",
    noUpcomingCta: "Réserver une journée",
    guests: "Invités",
    showQr: "Afficher mon QR d'entrée",
    quickTitle: "Accès rapide",
    links: {
      book: "Nouvelle réservation",
      reservations: "Mes réservations",
      qr: "Check-in QR",
      map: "Plan du lagon",
    },
    linkDesc: {
      book: "Pass, cabana ou événement",
      reservations: "À venir & passées",
      qr: "Votre code d'entrée",
      map: "Trouvez votre zone",
    },
    statuses: {
      pending: "En attente",
      confirmed: "Confirmée",
      cancelled: "Annulée",
      completed: "Terminée",
    },
    adults: "adultes",
    children: "enfants",
  },
  en: {
    greeting: "Hello",
    subtitle: "Here's a snapshot of your Oxygen Island account.",
    upcoming: "Your next visit",
    noUpcoming: "No upcoming visit for now.",
    noUpcomingCta: "Book a day",
    guests: "Guests",
    showQr: "Show my entry QR",
    quickTitle: "Quick access",
    links: {
      book: "New booking",
      reservations: "My bookings",
      qr: "QR check-in",
      map: "Lagoon map",
    },
    linkDesc: {
      book: "Pass, cabana or event",
      reservations: "Upcoming & past",
      qr: "Your entry code",
      map: "Find your zone",
    },
    statuses: {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    },
    adults: "adults",
    children: "children",
  },
  ar: {
    greeting: "مرحبًا",
    subtitle: "إليك نظرة سريعة على حسابك في أوكسيجن آيلاند.",
    upcoming: "زيارتك القادمة",
    noUpcoming: "لا توجد زيارة قادمة حاليًا.",
    noUpcomingCta: "احجز يومًا",
    guests: "الضيوف",
    showQr: "اعرض رمز الدخول",
    quickTitle: "وصول سريع",
    links: {
      book: "حجز جديد",
      reservations: "حجوزاتي",
      qr: "تسجيل الدخول QR",
      map: "خريطة البحيرة",
    },
    linkDesc: {
      book: "تذكرة، كابانا أو فعالية",
      reservations: "القادمة والسابقة",
      qr: "رمز دخولك",
      map: "اعثر على منطقتك",
    },
    statuses: {
      pending: "قيد الانتظار",
      confirmed: "مؤكّدة",
      cancelled: "ملغاة",
      completed: "منتهية",
    },
    adults: "بالغين",
    children: "أطفال",
  },
};

const STATUS_VARIANT: Record<BookingStatus, BadgeProps["variant"]> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "lagoon",
};

export default function AccountPage({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const c = COPY[locale];
  const todayKey = toDateKey(new Date());

  const upcoming = [...mockBookings]
    .filter((b) => b.visit_date >= todayKey && b.status === "confirmed")
    .sort((a, b) => a.visit_date.localeCompare(b.visit_date))[0];

  const links = [
    { key: "book", href: `/${locale}/reservation`, icon: Ticket },
    { key: "reservations", href: `/${locale}/compte/reservations`, icon: CalendarDays },
    { key: "qr", href: `/${locale}/compte/qr-checkin`, icon: QrCode },
    { key: "map", href: `/${locale}/carte`, icon: MapPin },
  ] as const;

  return (
    <section className="bg-background">
      <div className="container max-w-4xl py-10 md:py-16">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-lagoon-700">
            {c.quickTitle}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">
            {c.greeting}, {mockUser.full_name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
        </div>

        {/* Upcoming visit */}
        <div className="mb-8">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.upcoming}
          </div>
          {upcoming ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="photo-lagoon h-2 w-full" />
              <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xl font-semibold text-foreground">
                      {bookingProductName(upcoming, locale)}
                    </span>
                    <Badge variant={STATUS_VARIANT[upcoming.status]}>
                      {c.statuses[upcoming.status]}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-lagoon-600" />
                      {formatDate(upcoming.visit_date, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-lagoon-600" />
                      {upcoming.adults} {c.adults}
                      {upcoming.children > 0 ? ` · ${upcoming.children} ${c.children}` : ""}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Wallet className="h-4 w-4 text-lagoon-600" />
                      {formatCurrency(upcoming.total_price, locale)}
                    </span>
                    <span className="font-mono text-xs text-ink-soft">{upcoming.reference}</span>
                  </div>
                </div>
                <Link
                  href={`/${locale}/compte/qr-checkin`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-deepwater transition hover:bg-coral-light"
                >
                  <QrCode className="h-4 w-4" />
                  {c.showQr}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted-foreground">{c.noUpcoming}</p>
              <Link
                href={`/${locale}/reservation`}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-deepwater transition hover:bg-coral-light"
              >
                {c.noUpcomingCta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div>
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-lagoon-700">
            {c.quickTitle}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-lagoon-300 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lagoon-50 text-lagoon-700 transition group-hover:bg-lagoon-500 group-hover:text-sand">
                  <link.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold text-foreground">
                    {c.links[link.key]}
                  </span>
                  <span className="block text-xs text-muted-foreground">{c.linkDesc[link.key]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
