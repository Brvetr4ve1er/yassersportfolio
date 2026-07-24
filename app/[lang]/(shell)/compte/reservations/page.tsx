"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Users, Wallet } from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from "@/lib/data/mock";
import { formatCurrency, formatDate } from "@/lib/i18n/format";
import { bookingProductName, toDateKey } from "@/components/booking/shared";
import type { Locale } from "@/lib/i18n/config";
import type { Booking, BookingStatus } from "@/types/domain";

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    upcoming: string;
    past: string;
    emptyUpcoming: string;
    emptyPast: string;
    book: string;
    adults: string;
    children: string;
    statuses: Record<BookingStatus, string>;
  }
> = {
  fr: {
    eyebrow: "Mon compte",
    title: "Mes réservations",
    upcoming: "À venir",
    past: "Passées",
    emptyUpcoming: "Aucune réservation à venir.",
    emptyPast: "Aucune réservation passée.",
    book: "Réserver une journée",
    adults: "adultes",
    children: "enfants",
    statuses: { pending: "En attente", confirmed: "Confirmée", cancelled: "Annulée", completed: "Terminée" },
  },
  en: {
    eyebrow: "My account",
    title: "My bookings",
    upcoming: "Upcoming",
    past: "Past",
    emptyUpcoming: "No upcoming bookings.",
    emptyPast: "No past bookings.",
    book: "Book a day",
    adults: "adults",
    children: "children",
    statuses: { pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled", completed: "Completed" },
  },
  ar: {
    eyebrow: "حسابي",
    title: "حجوزاتي",
    upcoming: "القادمة",
    past: "السابقة",
    emptyUpcoming: "لا توجد حجوزات قادمة.",
    emptyPast: "لا توجد حجوزات سابقة.",
    book: "احجز يومًا",
    adults: "بالغين",
    children: "أطفال",
    statuses: { pending: "قيد الانتظار", confirmed: "مؤكّدة", cancelled: "ملغاة", completed: "منتهية" },
  },
};

const STATUS_VARIANT: Record<BookingStatus, BadgeProps["variant"]> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "lagoon",
};

function BookingCard({ booking, locale }: { booking: Booking; locale: Locale }) {
  const c = COPY[locale];
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg font-semibold text-foreground">
            {bookingProductName(booking, locale)}
          </div>
          <div className="mt-0.5 font-mono text-xs text-muted-foreground">{booking.reference}</div>
        </div>
        <Badge variant={STATUS_VARIANT[booking.status]}>{c.statuses[booking.status]}</Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-lagoon-600" />
          {formatDate(booking.visit_date, locale)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-lagoon-600" />
          {booking.adults} {c.adults}
          {booking.children > 0 ? ` · ${booking.children} ${c.children}` : ""}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
          <Wallet className="h-4 w-4 text-lagoon-600" />
          {formatCurrency(booking.total_price, locale)}
        </span>
      </div>
      {booking.special_requests ? (
        <p className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-ink-soft">
          {booking.special_requests}
        </p>
      ) : null}
    </div>
  );
}

function EmptyState({ label, cta, href }: { label: string; cta?: string; href?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      {cta && href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-deepwater transition hover:bg-coral-light"
        >
          {cta}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      ) : null}
    </div>
  );
}

export default function ReservationsPage({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const c = COPY[locale];

  const { upcoming, past } = useMemo(() => {
    const todayKey = toDateKey(new Date());
    const sorted = [...mockBookings].sort((a, b) => b.visit_date.localeCompare(a.visit_date));
    return {
      upcoming: sorted
        .filter((b) => b.visit_date >= todayKey && b.status !== "cancelled")
        .sort((a, b) => a.visit_date.localeCompare(b.visit_date)),
      past: sorted.filter((b) => b.visit_date < todayKey || b.status === "cancelled"),
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="container max-w-3xl py-10 md:py-16">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-lagoon-700">{c.eyebrow}</span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-foreground md:text-4xl">{c.title}</h1>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              {c.upcoming}
              {upcoming.length ? (
                <span className="ms-2 rounded-full bg-lagoon-100 px-1.5 text-[11px] text-lagoon-700">
                  {upcoming.length}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="past">{c.past}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length ? (
              upcoming.map((b) => <BookingCard key={b.id} booking={b} locale={locale} />)
            ) : (
              <EmptyState label={c.emptyUpcoming} cta={c.book} href={`/${locale}/reservation`} />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {past.length ? (
              past.map((b) => <BookingCard key={b.id} booking={b} locale={locale} />)
            ) : (
              <EmptyState label={c.emptyPast} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
