"use client";

import { BedDouble, Sparkles, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale } from "@/types/domain";

const OPTIONS = [
  { key: "accommodation" as const, icon: BedDouble },
  { key: "activity" as const, icon: Sparkles },
  { key: "package" as const, icon: Star },
];

export function Step1Type({
  draft,
  update,
  next,
}: {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  next: () => void;
  locale: Locale;
}) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-forest">
        {t("booking.step1.title")}
      </h2>
      <p className="mt-2 text-muted-foreground">{t("booking.step1.subtitle")}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {OPTIONS.map(({ key, icon: Icon }) => {
          const selected = draft.type === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                update({ type: key });
                setTimeout(next, 200);
              }}
              className={cn(
                "text-start transition focus:outline-none",
                selected && "ring-2 ring-gold",
              )}
            >
              <Card
                className={cn(
                  "h-full p-5 transition hover:shadow-md",
                  selected ? "border-gold/60 bg-gold/5" : "",
                )}
              >
                <Icon className="mb-3 h-7 w-7 text-gold" />
                <h3 className="font-serif text-lg font-semibold text-forest">
                  {t(`booking.step1.options.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`booking.step1.options.${key}.body`)}
                </p>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
