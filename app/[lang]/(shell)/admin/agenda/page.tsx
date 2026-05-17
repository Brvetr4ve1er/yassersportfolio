import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBookings } from "@/lib/data/mock";
import { formatDateShort } from "@/lib/i18n/format";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const COLORS: Record<string, string> = {
  accommodation: "bg-forest text-parchment",
  activity: "bg-gold text-forest-900",
  package: "bg-success text-parchment",
};

export default async function AdminAgenda({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: { agenda: { title: string } };

  };
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">
        {dict.admin.agenda.title}
      </h1>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2 text-xs">
            {days.map((day) => {
              const bookings = mockBookings.filter((b) => {
                const start = b.check_in;
                const end = b.check_out ?? b.check_in;
                return day >= start && day <= end;
              });
              return (
                <div
                  key={day}
                  className="min-h-[110px] rounded-lg border border-border/60 p-2"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {formatDateShort(day, params.lang)}
                  </div>
                  <div className="mt-1 space-y-1">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className={`truncate rounded px-1.5 py-0.5 text-[10px] ${COLORS[b.booking_type] ?? "bg-muted"}`}
                        title={b.reference}
                      >
                        {b.booking_type[0].toUpperCase()} · {b.guests_count}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Badge variant="default">Séjour</Badge>
            <Badge variant="gold">Activité</Badge>
            <Badge variant="success">Forfait</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
