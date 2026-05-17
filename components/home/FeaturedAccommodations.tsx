"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import { useI18n } from "@/components/i18n/I18nProvider";
import { mockAccommodations } from "@/lib/data/mock";
import type { Locale } from "@/types/domain";

export function FeaturedAccommodations({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const items = mockAccommodations.slice(0, 3);

  return (
    <section className="bg-parchment-100/60 py-16">
      <div className="container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-forest md:text-4xl">
              {t("home.featuredAccommodations.title")}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {t("home.featuredAccommodations.subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/hebergement`}
            className="hidden items-center gap-1 text-sm font-medium text-forest hover:underline sm:inline-flex"
          >
            {t("home.featuredAccommodations.cta")}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <AccommodationCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
