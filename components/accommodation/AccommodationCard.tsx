"use client";

import Link from "next/link";
import { ArrowRight, BedDouble, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatCurrency } from "@/lib/i18n/format";
import type { Accommodation, Locale } from "@/types/domain";

export function AccommodationCard({
  item,
  locale,
}: {
  item: Accommodation;
  locale: Locale;
}) {
  const { t } = useI18n();
  const name = locale === "ar" ? item.name_ar : item.name_fr;
  const description = locale === "ar" ? item.description_ar : item.description_fr;

  return (
    <Card className="group flex h-full flex-col transition hover:shadow-md">
      <Link href={`/${locale}/hebergement/${item.slug}`} className="block">
        <div
          className="aspect-[4/3] w-full bg-gradient-to-br from-forest-700 via-forest to-gold-700"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'><rect width='200' height='150' fill='%230a1f0e'/><polygon points='40,100 100,40 160,100' fill='%23b08d3e' opacity='0.5'/><rect x='80' y='80' width='40' height='20' fill='%23f5f0e8' opacity='0.3'/></svg>\")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label={name}
        />
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-5 pt-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-forest">{name}</h3>
          <Badge variant="gold">{t(`accommodation.types.${item.type}`)}</Badge>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {item.capacity}
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {item.amenities.length}
            </span>
          </div>
          <div className="text-end">
            <div className="font-serif text-lg font-semibold text-forest">
              {formatCurrency(item.price_weekday, locale)}
            </div>
            <div className="text-[10px] uppercase text-muted-foreground">
              {t("accommodation.details.perNight")}
            </div>
          </div>
        </div>
        <Link
          href={`/${locale}/hebergement/${item.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          {t("common.cta.viewDetails")}
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </CardContent>
    </Card>
  );
}
