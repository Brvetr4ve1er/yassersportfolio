import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockBookings } from "@/lib/data/mock";
import { formatCurrency, formatDateShort } from "@/lib/i18n/format";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function AdminReservations({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: {
      admin: {
        bookings: {
          title: string;
          columns: Record<string, string>;
          actions: Record<string, string>;
        };
      };
    };
  };
  const b = dict.admin.admin.bookings;

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">{b.title}</h1>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">{b.columns.ref}</th>
                <th className="px-4 py-3">{b.columns.type}</th>
                <th className="px-4 py-3">{b.columns.dates}</th>
                <th className="px-4 py-3">{b.columns.amount}</th>
                <th className="px-4 py-3">{b.columns.payment}</th>
                <th className="px-4 py-3">{b.columns.status}</th>
                <th className="px-4 py-3 text-end">{b.columns.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {mockBookings.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 font-mono text-xs">{row.reference}</td>
                  <td className="px-4 py-3 capitalize">{row.booking_type}</td>
                  <td className="px-4 py-3">
                    {formatDateShort(row.check_in, params.lang)}
                    {row.check_out ? ` → ${formatDateShort(row.check_out, params.lang)}` : ""}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(row.total_price, params.lang)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={row.payment_status === "paid" ? "success" : "warning"}
                    >
                      {row.payment_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        row.status === "confirmed"
                          ? "success"
                          : row.status === "completed"
                            ? "outline"
                            : "warning"
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="inline-flex gap-1">
                      <Button size="sm" variant="ghost">
                        {b.actions.confirm}
                      </Button>
                      <Button size="sm" variant="ghost">
                        {b.actions.markPaid}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
