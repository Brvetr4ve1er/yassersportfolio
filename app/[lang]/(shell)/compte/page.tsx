import Link from "next/link";
import { ArrowRight, QrCode, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TierBadge } from "@/components/loyalty/TierBadge";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { mockBookings, mockUser } from "@/lib/data/mock";
import { formatDateShort } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

export default async function AccountDashboardPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["account"])) as {
    account: { dashboard: { title: string; subtitle: string; upcoming: string; loyalty: string } };
  };
  const d = dict.account.dashboard;
  const upcoming = mockBookings.find(
    (b) => b.status === "confirmed" && b.check_in >= new Date().toISOString().slice(0, 10),
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-forest md:text-4xl">
          {d.title.replace("{{name}}", mockUser.full_name)}
        </h1>
        <p className="mt-1 text-muted-foreground">{d.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-forest">
                {d.upcoming}
              </h3>
              {upcoming ? (
                <Link
                  href={`/${params.lang}/compte/qr-checkin`}
                  className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
                >
                  <QrCode className="h-4 w-4" /> QR
                </Link>
              ) : null}
            </div>
            {upcoming ? (
              <div className="text-sm">
                <div className="font-mono text-xs text-muted-foreground">
                  {upcoming.reference}
                </div>
                <div className="mt-1">
                  {formatDateShort(upcoming.check_in, params.lang)} →{" "}
                  {upcoming.check_out
                    ? formatDateShort(upcoming.check_out, params.lang)
                    : "—"}
                </div>
                <div className="mt-1 text-muted-foreground">
                  {upcoming.guests_count} pers.
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune réservation à venir.</p>
            )}
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-forest">
                {d.loyalty}
              </h3>
              <TierBadge tier={mockUser.tier} />
            </div>
            <div className="flex items-center gap-2 font-serif text-3xl font-semibold text-forest">
              <Star className="h-6 w-6 fill-gold text-gold" />
              {mockUser.loyalty_points}
            </div>
            <Link
              href={`/${params.lang}/compte/fidelite`}
              className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
            >
              Voir mes récompenses
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
