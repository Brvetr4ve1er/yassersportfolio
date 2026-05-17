import { BedDouble, Clock, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/StatCard";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { mockBookings } from "@/lib/data/mock";
import { formatCurrency, formatDateShort } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

export default async function AdminHome({ params }: { params: { lang: Locale } }) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: Record<string, string> };
  const a = dict.admin;

  const today = new Date().toISOString().slice(0, 10);
  const arrivalsToday = mockBookings.filter((b) => b.check_in === today);
  const totalWeek = mockBookings
    .filter((b) => b.payment_status === "paid")
    .reduce((sum, b) => sum + b.total_price, 0);
  const pending = mockBookings.filter((b) => b.payment_status === "pending").length;

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-semibold text-forest">{a.title}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={a.occupancy}
          value="62%"
          hint="66 lits / 106"
          icon={BedDouble}
        />
        <StatCard
          label={a.revenueWeek}
          value={formatCurrency(totalWeek, params.lang)}
          hint="vs 480 000 DA"
          icon={TrendingUp}
        />
        <StatCard
          label={a.guestsToday}
          value={String(arrivalsToday.length)}
          hint={`${arrivalsToday.reduce((s, b) => s + b.guests_count, 0)} pers.`}
          icon={Users}
        />
        <StatCard label={a.pendingPayments} value={String(pending)} icon={Clock} />
      </div>

      <Card>
        <CardContent className="p-5">
          <h2 className="mb-3 font-serif text-lg font-semibold text-forest">
            Arrivées aujourd'hui
          </h2>
          {arrivalsToday.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune arrivée prévue aujourd'hui.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {arrivalsToday.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">{b.reference}</div>
                    <div className="font-medium">{b.booking_type}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {b.guests_count} pers. ·{" "}
                    {b.check_out ? formatDateShort(b.check_out, params.lang) : "—"}
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
