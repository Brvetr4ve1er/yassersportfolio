"use client";

import { Home, Sparkles, UtensilsCrossed, Smartphone } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

const ICONS = [Home, Sparkles, UtensilsCrossed, Smartphone];

export function ValueProps() {
  const { t, raw } = useI18n();
  const items = raw<Array<{ title: string; body: string }>>("home.values.items") ?? [];

  return (
    <section className="container py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-semibold text-forest md:text-4xl">
          {t("home.values.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("home.values.subtitle")}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <div key={i} className="surface-card p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-forest">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
