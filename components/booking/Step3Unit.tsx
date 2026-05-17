"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatCurrency } from "@/lib/i18n/format";
import { mockAccommodations, mockActivities, mockPackages } from "@/lib/data/mock";
import { cn } from "@/lib/utils";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale } from "@/types/domain";

export function Step3Unit({
  draft,
  update,
  next,
  back,
  locale,
}: {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  next: () => void;
  back: () => void;
  locale: Locale;
}) {
  const { t } = useI18n();

  const items =
    draft.type === "accommodation"
      ? mockAccommodations.map((a) => ({
          id: a.id,
          title: locale === "ar" ? a.name_ar : a.name_fr,
          subtitle: t("booking.step3.capacity", { n: a.capacity }),
          price: a.price_weekday,
          field: "accommodationId" as const,
          selectedId: draft.accommodationId,
        }))
      : draft.type === "activity"
        ? mockActivities.map((a) => ({
            id: a.id,
            title: locale === "ar" ? a.name_ar : a.name_fr,
            subtitle: t("booking.step3.duration", { n: a.duration_minutes }),
            price: a.price_per_person,
            field: "activityId" as const,
            selectedId: draft.activityId,
          }))
        : mockPackages.map((p) => ({
            id: p.id,
            title: locale === "ar" ? p.name_ar : p.name_fr,
            subtitle: locale === "ar" ? p.description_ar : p.description_fr,
            price: p.price,
            field: "packageId" as const,
            selectedId: draft.packageId,
          }));

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-forest">
        {draft.type === "activity"
          ? t("booking.step3.titleActivity")
          : t("booking.step3.title")}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const selected = item.selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => update({ [item.field]: item.id } as Partial<BookingDraft>)}
              className={cn(
                "text-start transition focus:outline-none",
                selected && "ring-2 ring-gold",
              )}
            >
              <Card className={cn("h-full p-4 transition", selected && "border-gold/60 bg-gold/5")}>
                <CardContent className="p-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-forest">
                        {item.title}
                      </h3>
                      <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                    <Badge variant="gold">{formatCurrency(item.price, locale)}</Badge>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          {t("common.cta.back")}
        </Button>
        <Button
          onClick={next}
          variant="gold"
          disabled={
            (draft.type === "accommodation" && !draft.accommodationId) ||
            (draft.type === "activity" && !draft.activityId) ||
            (draft.type === "package" && !draft.packageId)
          }
        >
          {t("common.cta.next")}
        </Button>
      </div>
    </div>
  );
}
