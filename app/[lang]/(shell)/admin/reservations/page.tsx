import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BookingTable } from "@/components/admin/BookingTable";
import { PRODUCT_ACCENT } from "@/components/admin/adminHelpers";
import { mockBookings } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";
import type { BookingProduct } from "@/types/domain";

const COPY: Record<
  Locale,
  { title: string; subtitle: (n: number) => string; legend: Record<BookingProduct, string> }
> = {
  fr: {
    title: "Réservations",
    subtitle: (n) => `${n} réservation${n > 1 ? "s" : ""} au total`,
    legend: { pass: "Pass", cabana: "Cabana", event: "Événement" },
  },
  en: {
    title: "Reservations",
    subtitle: (n) => `${n} booking${n > 1 ? "s" : ""} in total`,
    legend: { pass: "Pass", cabana: "Cabana", event: "Event" },
  },
  ar: {
    title: "الحجوزات",
    subtitle: (n) => `${n} حجز إجمالاً`,
    legend: { pass: "تذكرة", cabana: "كابانا", event: "فعالية" },
  },
};

export default function AdminReservationsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];
  // Newest visit first for an operational view.
  const bookings = [...mockBookings].sort(
    (a, b) => new Date(b.visit_date).getTime() - new Date(a.visit_date).getTime(),
  );

  return (
    <div>
      <AdminPageHeader
        title={c.title}
        subtitle={c.subtitle(bookings.length)}
        action={
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            {(Object.keys(c.legend) as BookingProduct[]).map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${PRODUCT_ACCENT[p].dot}`}
                />
                {c.legend[p]}
              </span>
            ))}
          </div>
        }
      />
      <BookingTable locale={locale} bookings={bookings} />
    </div>
  );
}
