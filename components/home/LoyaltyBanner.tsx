"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Locale } from "@/types/domain";

export function LoyaltyBanner({ locale }: { locale: Locale }) {
  const { t, raw } = useI18n();
  const tiers = raw<string[]>("home.loyalty.tiers") ?? [];

  return (
    <section className="bg-forest text-parchment">
      <div className="container grid gap-8 py-14 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="space-y-4">
          <span className="badge-soft border border-gold/30">
            <Star className="h-3 w-3 fill-current" />
            Étoiles Fidélité
          </span>
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            {t("home.loyalty.title")}
          </h2>
          <p className="max-w-xl text-parchment/80">{t("home.loyalty.subtitle")}</p>
          <Button asChild variant="gold">
            <Link href={`/${locale}/compte/fidelite`}>{t("home.loyalty.cta")}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {tiers.map((tier, i) => (
            <div
              key={tier}
              className="rounded-xl border border-parchment/20 bg-forest-700/40 p-4 text-center"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center">
                {Array.from({ length: i + 1 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-gold text-gold loyalty-star"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  />
                ))}
              </div>
              <div className="font-serif text-lg font-semibold">{tier}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
