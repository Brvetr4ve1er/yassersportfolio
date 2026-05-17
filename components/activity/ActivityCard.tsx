"use client";

import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatCurrency } from "@/lib/i18n/format";
import type { Activity, Locale } from "@/types/domain";

export function ActivityCard({ item, locale }: { item: Activity; locale: Locale }) {
  const { t } = useI18n();
  const name = locale === "ar" ? item.name_ar : item.name_fr;
  const description = locale === "ar" ? item.description_ar : item.description_fr;

  return (
    <Card className="group flex h-full flex-col transition hover:shadow-md">
      <Link href={`/${locale}/activites/${item.slug}`} className="block">
        <div
          className="aspect-[16/9] w-full bg-gradient-to-br from-gold-700 to-forest"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><rect width='320' height='180' fill='%2315391c'/><circle cx='220' cy='60' r='25' fill='%23dfc057' opacity='0.4'/><path d='M0,150 Q160,90 320,150 L320,180 L0,180 Z' fill='%232d6a36' opacity='0.6'/></svg>\")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-5 pt-5">
        <h3 className="font-serif text-lg font-semibold text-forest">{name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.duration_minutes} {t("activity.minutes")}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {item.max_participants}
            </span>
          </div>
          <div className="font-serif text-lg font-semibold text-forest">
            {formatCurrency(item.price_per_person, locale)}
          </div>
        </div>
        <Link
          href={`/${locale}/activites/${item.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          {t("common.cta.viewDetails")}
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </CardContent>
    </Card>
  );
}
