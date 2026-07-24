import { Users, Banknote, Umbrella, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/StatCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  bookingProductName,
  PRODUCT_COPY,
  paymentBadgeVariant,
  PAYMENT_COPY,
  guestCount,
  weekRange,
  parseLocalDate,
} from "@/components/admin/adminHelpers";
import { mockBookings } from "@/lib/data/mock";
import { formatCurrency, formatDate } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: (d: string) => string;
    entries: string;
    entriesHint: (n: number) => string;
    revenue: string;
    revenueHint: (n: number) => string;
    cabanas: string;
    cabanasHint: string;
    pending: string;
    pendingHint: string;
    arrivals: string;
    arrivalsSub: string;
    guests: (n: number) => string;
    empty: string;
  }
> = {
  fr: {
    title: "Tableau de bord",
    subtitle: (d) => `Aperçu de la journée — ${d}`,
    entries: "Entrées aujourd'hui",
    entriesHint: () => "62 % d'occupation",
    revenue: "Revenus (semaine)",
    revenueHint: (n) => `${n} réservation${n > 1 ? "s" : ""} payée${n > 1 ? "s" : ""}`,
    cabanas: "Cabanas réservées",
    cabanasHint: "Confirmées",
    pending: "Paiements en attente",
    pendingHint: "À relancer",
    arrivals: "Arrivées aujourd'hui",
    arrivalsSub: "Réservations confirmées à accueillir",
    guests: (n) => `${n} pers.`,
    empty: "Aucune arrivée pour le moment.",
  },
  en: {
    title: "Dashboard",
    subtitle: (d) => `Today at a glance — ${d}`,
    entries: "Entries today",
    entriesHint: () => "62% occupancy",
    revenue: "Revenue (week)",
    revenueHint: (n) => `${n} paid booking${n > 1 ? "s" : ""}`,
    cabanas: "Cabanas booked",
    cabanasHint: "Confirmed",
    pending: "Pending payments",
    pendingHint: "To follow up",
    arrivals: "Arrivals today",
    arrivalsSub: "Confirmed bookings to welcome",
    guests: (n) => `${n} guests`,
    empty: "No arrivals yet.",
  },
  ar: {
    title: "لوحة القيادة",
    subtitle: (d) => `لمحة عن اليوم — ${d}`,
    entries: "الدخول اليوم",
    entriesHint: () => "نسبة الإشغال 62٪",
    revenue: "الإيرادات (الأسبوع)",
    revenueHint: (n) => `${n} حجز مدفوع`,
    cabanas: "كابانات محجوزة",
    cabanasHint: "مؤكَّدة",
    pending: "مدفوعات معلّقة",
    pendingHint: "بحاجة إلى متابعة",
    arrivals: "الوافدون اليوم",
    arrivalsSub: "حجوزات مؤكَّدة للاستقبال",
    guests: (n) => `${n} أشخاص`,
    empty: "لا وافدين حتى الآن.",
  },
};

export default function AdminDashboardPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];
  const today = new Date();

  // For the demo we treat every confirmed booking as "today's" arrivals.
  const confirmed = mockBookings.filter((b) => b.status === "confirmed");
  const guestsToday = confirmed.reduce((sum, b) => sum + guestCount(b), 0);

  const [wStart, wEnd] = weekRange(today);
  const paidThisWeek = mockBookings.filter((b) => {
    const d = parseLocalDate(b.visit_date);
    return b.payment_status === "paid" && d >= wStart && d <= wEnd;
  });
  const weekRevenue = paidThisWeek.reduce((sum, b) => sum + b.total_price, 0);

  const cabanasBooked = confirmed.filter((b) => b.product === "cabana").length;
  const pendingPayments = mockBookings.filter(
    (b) => b.payment_status === "pending",
  ).length;

  return (
    <div>
      <AdminPageHeader title={c.title} subtitle={c.subtitle(formatDate(today, locale))} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={c.entries}
          value={String(guestsToday)}
          hint={c.entriesHint(guestsToday)}
          icon={Users}
          tone="lagoon"
        />
        <StatCard
          label={c.revenue}
          value={formatCurrency(weekRevenue, locale)}
          hint={c.revenueHint(paidThisWeek.length)}
          icon={Banknote}
          tone="palm"
        />
        <StatCard
          label={c.cabanas}
          value={String(cabanasBooked)}
          hint={c.cabanasHint}
          icon={Umbrella}
          tone="coral"
        />
        <StatCard
          label={c.pending}
          value={String(pendingPayments)}
          hint={c.pendingHint}
          icon={Clock}
          tone="neutral"
        />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 p-5">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {c.arrivals}
              </h2>
              <p className="text-sm text-ink-muted">{c.arrivalsSub}</p>
            </div>
            <Badge variant="lagoon">{confirmed.length}</Badge>
          </div>

          {confirmed.length === 0 ? (
            <p className="p-5 text-sm text-ink-muted">{c.empty}</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {confirmed.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {bookingProductName(b, locale)}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      <span className="font-mono">{b.reference}</span>
                      {" · "}
                      {PRODUCT_COPY[b.product][locale]}
                      {" · "}
                      {c.guests(guestCount(b))}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-ink-soft">
                      {formatCurrency(b.total_price, locale)}
                    </span>
                    <Badge variant={paymentBadgeVariant(b.payment_status)}>
                      {PAYMENT_COPY[b.payment_status][locale]}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
