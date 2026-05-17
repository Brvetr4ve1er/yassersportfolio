"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";
import { isHoliday, isWeekend, nightsBetween } from "@/lib/booking/pricing";
import { formatDateShort } from "@/lib/i18n/format";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale } from "@/types/domain";
import { fr } from "date-fns/locale";

const toISO = (d: Date) => d.toISOString().slice(0, 10);

export function Step2Dates({
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
  const isActivity = draft.type === "activity";

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from) {
      update({ checkIn: null, checkOut: null });
      return;
    }
    update({
      checkIn: toISO(range.from),
      checkOut: range.to ? toISO(range.to) : null,
    });
  };

  const handleActivityDay = (day: Date | undefined) => {
    if (!day) return;
    update({ checkIn: toISO(day), checkOut: null });
  };

  const canContinue = Boolean(
    draft.checkIn && (isActivity || draft.checkOut),
  );

  const nights =
    draft.checkIn && draft.checkOut
      ? nightsBetween(draft.checkIn, draft.checkOut)
      : 0;

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-forest">
        {t("booking.step2.title")}
      </h2>

      <div className="surface-card flex flex-col items-center p-4">
        {isActivity ? (
          <DayPicker
            mode="single"
            locale={locale === "ar" ? undefined : fr}
            dir={locale === "ar" ? "rtl" : "ltr"}
            selected={draft.checkIn ? new Date(draft.checkIn) : undefined}
            onSelect={handleActivityDay}
            disabled={{ before: new Date() }}
            modifiers={{
              weekend: (d) => isWeekend(toISO(d)),
              holiday: (d) => isHoliday(toISO(d)),
            }}
            modifiersStyles={{
              weekend: { color: "#b08d3e" },
              holiday: { color: "#c4391a", fontWeight: 700 },
            }}
          />
        ) : (
          <DayPicker
            mode="range"
            locale={locale === "ar" ? undefined : fr}
            dir={locale === "ar" ? "rtl" : "ltr"}
            selected={{
              from: draft.checkIn ? new Date(draft.checkIn) : undefined,
              to: draft.checkOut ? new Date(draft.checkOut) : undefined,
            }}
            onSelect={handleSelect}
            disabled={{ before: new Date() }}
            modifiers={{
              weekend: (d) => isWeekend(toISO(d)),
              holiday: (d) => isHoliday(toISO(d)),
            }}
            modifiersStyles={{
              weekend: { color: "#b08d3e" },
              holiday: { color: "#c4391a", fontWeight: 700 },
            }}
          />
        )}
      </div>

      {draft.checkIn && (
        <div className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm">
          <div>
            <span className="text-muted-foreground">{t("booking.step2.checkIn")}:</span>{" "}
            <span className="font-medium">{formatDateShort(draft.checkIn, locale)}</span>
          </div>
          {draft.checkOut && (
            <>
              <div className="mt-1">
                <span className="text-muted-foreground">{t("booking.step2.checkOut")}:</span>{" "}
                <span className="font-medium">{formatDateShort(draft.checkOut, locale)}</span>
              </div>
              <div className="mt-1 text-muted-foreground">
                {t(nights > 1 ? "booking.step2.nights_plural" : "booking.step2.nights", {
                  count: nights,
                })}
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          {t("common.cta.back")}
        </Button>
        <Button onClick={next} disabled={!canContinue} variant="gold">
          {t("common.cta.next")}
        </Button>
      </div>
    </div>
  );
}
