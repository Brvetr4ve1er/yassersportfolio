import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  bookingProductName,
  PRODUCT_ACCENT,
  PRODUCT_COPY,
  isSameDay,
} from "@/components/admin/adminHelpers";
import { mockBookings } from "@/lib/data/mock";
import { formatDateShort } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { BookingProduct } from "@/types/domain";

const DAYS = 28;

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: (from: string, to: string) => string;
    weekdays: string[]; // Monday-first
    legend: Record<BookingProduct, string>;
    today: string;
  }
> = {
  fr: {
    title: "Agenda",
    subtitle: (from, to) => `Réservations du ${from} au ${to}`,
    weekdays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    legend: { pass: "Pass", cabana: "Cabana", event: "Événement" },
    today: "Auj.",
  },
  en: {
    title: "Agenda",
    subtitle: (from, to) => `Bookings from ${from} to ${to}`,
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    legend: { pass: "Pass", cabana: "Cabana", event: "Event" },
    today: "Today",
  },
  ar: {
    title: "الأجندة",
    subtitle: (from, to) => `الحجوزات من ${from} إلى ${to}`,
    weekdays: ["إثن", "ثلا", "أرب", "خمي", "جمع", "سبت", "أحد"],
    legend: { pass: "تذكرة", cabana: "كابانا", event: "فعالية" },
    today: "اليوم",
  },
};

export default function AdminAgendaPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 28 upcoming days starting today.
  const days: Date[] = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // Pad the start so the first day sits under its weekday column (Monday-first).
  const leadingPad = (today.getDay() + 6) % 7;

  const firstDay = days[0];
  const lastDay = days[days.length - 1];

  return (
    <div>
      <AdminPageHeader
        title={c.title}
        subtitle={c.subtitle(
          formatDateShort(firstDay, locale),
          formatDateShort(lastDay, locale),
        )}
        action={
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            {(Object.keys(c.legend) as BookingProduct[]).map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5">
                <span
                  className={cn("h-2.5 w-2.5 rounded-full", PRODUCT_ACCENT[p].dot)}
                />
                {c.legend[p]}
              </span>
            ))}
          </div>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-border/60 bg-card p-3 shadow-sm sm:p-4">
        <div className="min-w-[640px]">
          {/* Weekday header */}
          <div className="mb-2 grid grid-cols-7 gap-2">
            {c.weekdays.map((w) => (
              <div
                key={w}
                className="text-center text-[11px] font-medium uppercase tracking-wider text-ink-muted"
              >
                {w}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: leadingPad }, (_, i) => (
              <div key={`pad-${i}`} className="min-h-[92px] rounded-lg" />
            ))}

            {days.map((d) => {
              const dayBookings = mockBookings.filter((b) =>
                isSameDay(b.visit_date, d),
              );
              const isToday = isSameDay(d.toISOString(), today);
              const isFirstOfMonth = d.getDate() === 1;

              return (
                <div
                  key={d.toISOString()}
                  className={cn(
                    "flex min-h-[92px] flex-col gap-1 rounded-lg border p-2 transition",
                    isToday
                      ? "border-lagoon-400 bg-lagoon-500/5 ring-1 ring-lagoon-400/40"
                      : "border-border/60 bg-background/40 hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isToday ? "text-lagoon-700" : "text-foreground",
                      )}
                    >
                      {d.getDate()}
                    </span>
                    {isToday ? (
                      <span className="rounded-full bg-lagoon-500 px-1.5 py-0.5 text-[9px] font-medium uppercase text-sand">
                        {c.today}
                      </span>
                    ) : isFirstOfMonth ? (
                      <span className="text-[10px] uppercase text-ink-muted">
                        {new Intl.DateTimeFormat(locale, { month: "short" }).format(d)}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-1">
                    {dayBookings.map((b) => (
                      <span
                        key={b.id}
                        title={`${PRODUCT_COPY[b.product][locale]} · ${bookingProductName(b, locale)}`}
                        className={cn(
                          "truncate rounded border px-1.5 py-0.5 text-[10px] font-medium leading-tight",
                          PRODUCT_ACCENT[b.product].pill,
                        )}
                      >
                        {bookingProductName(b, locale)}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
