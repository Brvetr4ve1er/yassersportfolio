"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { useI18n } from "@/components/i18n/I18nProvider";
import { mockActivities } from "@/lib/data/mock";
import type { Locale } from "@/types/domain";

export function FeaturedActivities({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const items = mockActivities.slice(0, 3);

  return (
    <section className="container py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-forest md:text-4xl">
            {t("home.featuredActivities.title")}
          </h2>
          <p className="mt-1 text-muted-foreground">
            {t("home.featuredActivities.subtitle")}
          </p>
        </div>
        <Link
          href={`/${locale}/activites`}
          className="hidden items-center gap-1 text-sm font-medium text-forest hover:underline sm:inline-flex"
        >
          {t("home.featuredActivities.cta")}
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <ActivityCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}
