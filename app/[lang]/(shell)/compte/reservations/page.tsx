import Link from "next/link";
import { QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings } from "@/lib/data/mock";
import { formatCurrency, formatDateShort } from "@/lib/i18n/format";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function ReservationsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["account"])) as {
    account: { reservations: { title: string; upcoming: string; past: string; cancelled: string; empty: string } };
  };
  const t = dict.account.reservations;
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = mockBookings.filter(
    (b) => b.status !== "cancelled" && b.status !== "completed" && b.check_in >= today,
  );
  const past = mockBookings.filter(
    (b) => b.status === "completed" || b.check_in < today,
  );
  const cancelled = mockBookings.filter((b) => b.status === "cancelled");

  const renderList = (list: typeof mockBookings) => {
    if (list.length === 0) {
      return <p className="py-10 text-center text-muted-foreground">{t.empty}</p>;
    }
    return (
      <div className="space-y-3">
        {list.map((b) => (
          <Card key={b.id}>
            <CardContent className="flex flex-wrap items-start justify-between gap-3 p-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{b.reference}</div>
                <div className="font-serif text-base font-semibold text-forest">
                  {b.booking_type}
                </div>
                <div className="mt-1 text-sm">
                  {formatDateShort(b.check_in, params.lang)}
                  {b.check_out ? ` → ${formatDateShort(b.check_out, params.lang)}` : ""}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={b.status === "confirmed" ? "success" : b.status === "completed" ? "outline" : "warning"}>
                  {b.status}
                </Badge>
                <div className="font-medium">{formatCurrency(b.total_price, params.lang)}</div>
                {b.status === "confirmed" && (
                  <Link
                    href={`/${params.lang}/compte/qr-checkin`}
                    className="inline-flex items-center gap-1 text-xs text-gold hover:underline"
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    QR
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">{t.title}</h1>
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">{t.upcoming}</TabsTrigger>
          <TabsTrigger value="past">{t.past}</TabsTrigger>
          <TabsTrigger value="cancelled">{t.cancelled}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">{renderList(upcoming)}</TabsContent>
        <TabsContent value="past">{renderList(past)}</TabsContent>
        <TabsContent value="cancelled">{renderList(cancelled)}</TabsContent>
      </Tabs>
    </section>
  );
}
