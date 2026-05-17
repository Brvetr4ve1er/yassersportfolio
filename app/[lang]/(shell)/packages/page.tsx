import Link from "next/link";
import { Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDateShort } from "@/lib/i18n/format";
import { mockPackages } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export default function PackagesPage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container py-12">
      <header className="mb-8 max-w-2xl">
        <Badge variant="gold" className="mb-3">
          <Sparkles className="me-1 h-3 w-3" /> Forfaits
        </Badge>
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          Nos forfaits saisonniers
        </h1>
        <p className="mt-2 text-muted-foreground">
          Combinez séjour et activités à prix réduit. Réservations limitées.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPackages.map((pkg) => {
          const name = params.lang === "ar" ? pkg.name_ar : pkg.name_fr;
          const description =
            params.lang === "ar" ? pkg.description_ar : pkg.description_fr;
          const remaining = pkg.max_bookings - pkg.current_bookings;
          return (
            <Card key={pkg.id} className="flex flex-col">
              <div
                className="aspect-[16/9] bg-gradient-to-br from-forest to-gold-700"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><rect width='320' height='180' fill='%230a1f0e'/><circle cx='80' cy='90' r='30' fill='%23b08d3e' opacity='0.5'/><circle cx='220' cy='80' r='40' fill='%23dfc057' opacity='0.3'/></svg>\")",
                  backgroundSize: "cover",
                }}
              />
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <h2 className="font-serif text-xl font-semibold text-forest">
                  {name}
                </h2>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDateShort(pkg.valid_from, params.lang)} →{" "}
                    {formatDateShort(pkg.valid_until, params.lang)}
                  </div>
                  <div className="flex items-end justify-between border-t border-border/60 pt-3">
                    <div className="font-serif text-2xl font-semibold text-forest">
                      {formatCurrency(pkg.price, params.lang)}
                    </div>
                    <Badge variant={remaining < 10 ? "warning" : "outline"}>
                      {remaining} restants
                    </Badge>
                  </div>
                  <Button asChild variant="gold" className="w-full">
                    <Link
                      href={`/${params.lang}/reservation?type=package&id=${pkg.id}`}
                    >
                      Réserver ce forfait
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
