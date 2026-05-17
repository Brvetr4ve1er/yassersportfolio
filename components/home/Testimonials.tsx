"use client";

import { Quote } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Testimonials() {
  const { t, raw } = useI18n();
  const items =
    raw<Array<{ name: string; city: string; quote: string }>>("home.testimonials.items") ?? [];

  return (
    <section className="container py-16">
      <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-forest md:text-4xl">
        {t("home.testimonials.title")}
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <figure
            key={i}
            className="surface-card relative p-6"
          >
            <Quote className="absolute end-4 top-4 h-6 w-6 text-gold/30" />
            <blockquote className="text-balance text-base text-ink-soft">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-4 border-t border-border/60 pt-3 text-sm">
              <div className="font-semibold text-forest">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.city}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
