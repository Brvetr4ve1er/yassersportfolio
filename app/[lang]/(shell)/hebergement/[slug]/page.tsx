import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, CalendarCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { formatCurrency } from "@/lib/i18n/format";
import { mockAccommodations } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return mockAccommodations.map((a) => ({ slug: a.slug }));
}

export default async function AccommodationDetailPage({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const item = mockAccommodations.find((a) => a.slug === params.slug);
  if (!item) notFound();

  const dict = (await getDictionary(params.lang, ["accommodation", "common"])) as {
    accommodation: {
      details: Record<string, string>;
      types: Record<string, string>;
    };
    common: {
      amenities: Record<string, string>;
      cta: Record<string, string>;
    };
  };
  const a = dict.accommodation;
  const c = dict.common;
  const name = params.lang === "ar" ? item.name_ar : item.name_fr;
  const description = params.lang === "ar" ? item.description_ar : item.description_fr;

  return (
    <article className="container max-w-5xl py-10">
      <Link
        href={`/${params.lang}/hebergement`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
        {c.cta.back}
      </Link>

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div
            className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-forest-700 to-gold-700"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230a1f0e'/><polygon points='80,200 200,80 320,200' fill='%23b08d3e' opacity='0.4'/><rect x='160' y='160' width='80' height='40' fill='%23f5f0e8' opacity='0.3'/></svg>\")",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-forest-500 to-gold-700 opacity-70"
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div>
            <Badge variant="gold">{a.types[item.type]}</Badge>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-forest md:text-4xl">
              {name}
            </h1>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>

          <div className="surface-card divide-y divide-border/60">
            {[
              {
                label: a.details.priceWeekday,
                value: formatCurrency(item.price_weekday, params.lang),
              },
              {
                label: a.details.priceWeekend,
                value: formatCurrency(item.price_weekend, params.lang),
              },
              {
                label: a.details.priceHoliday,
                value: formatCurrency(item.price_holiday, params.lang),
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="font-serif text-base font-semibold text-forest">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {a.details.capacity}
              </span>
              <span className="font-serif text-base font-normal normal-case tracking-normal">
                {item.capacity}
              </span>
            </div>
          </div>

          <Button asChild size="lg" variant="gold" className="w-full">
            <Link
              href={`/${params.lang}/reservation?type=accommodation&id=${item.id}`}
            >
              <CalendarCheck className="h-4 w-4" />
              {a.details.bookFromHere}
            </Link>
          </Button>
        </aside>
      </div>

      <Separator className="my-10" />

      <section>
        <h2 className="mb-4 font-serif text-2xl font-semibold text-forest">
          {a.details.amenities}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {item.amenities.map((key) => (
            <li
              key={key}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card p-3 text-sm"
            >
              <BedDouble className="h-4 w-4 text-gold" />
              {c.amenities[key] ?? key}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
