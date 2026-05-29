"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { mockUser } from "@/lib/data/mock";
import { LOYALTY_DISCOUNT_DZD, LOYALTY_DISCOUNT_POINTS } from "@/lib/booking/pricing";
import { guestDetailsSchema } from "@/lib/booking/validation";
import { cn } from "@/lib/utils";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale } from "@/types/domain";

export function Step4Guests({
  draft,
  update,
  next,
  back,
}: {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  next: () => void;
  back: () => void;
  locale: Locale;
}) {
  const { t } = useI18n();
  const canRedeem = mockUser.loyalty_points >= LOYALTY_DISCOUNT_POINTS;

  // Validate against the shared Zod schema so the phone format is actually
  // enforced (Algerian +213 / 0X numbers) rather than just "non-empty".
  const validation = guestDetailsSchema.safeParse({
    fullName: draft.fullName,
    phone: draft.phone,
    guests: draft.guests,
    adults: draft.adults,
    children: draft.children,
    specialRequests: draft.specialRequests,
  });
  const phoneError =
    !validation.success && draft.phone.length > 0
      ? validation.error.issues.find((i) => i.path[0] === "phone")?.message
      : undefined;

  const counter = (label: string, value: number, onChange: (n: number) => void, min = 0) => (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-3">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="rounded-full bg-muted p-1.5 hover:bg-muted/70"
          aria-label="-"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="rounded-full bg-muted p-1.5 hover:bg-muted/70"
          aria-label="+"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-forest">
        {t("booking.step4.title")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">{t("booking.step4.fullName")}</Label>
          <Input
            id="fullName"
            value={draft.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Karim Belkacem"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t("booking.step4.phone")}</Label>
          <Input
            id="phone"
            value={draft.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="0555 12 34 56"
            inputMode="tel"
            aria-invalid={phoneError ? "true" : undefined}
            className={cn(phoneError && "border-danger focus-visible:ring-danger")}
          />
          <p
            className={cn(
              "text-xs",
              phoneError ? "text-danger" : "text-muted-foreground",
            )}
          >
            {phoneError ?? t("booking.step4.phoneHint")}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {counter(
          t("booking.step4.adults"),
          draft.adults,
          (n) => update({ adults: n, guests: n + draft.children }),
          1,
        )}
        {counter(
          t("booking.step4.children"),
          draft.children,
          (n) => update({ children: n, guests: draft.adults + n }),
          0,
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="requests">{t("booking.step4.specialRequests")}</Label>
        <Textarea
          id="requests"
          rows={3}
          placeholder={t("booking.step4.specialRequestsPlaceholder")}
          value={draft.specialRequests}
          onChange={(e) => update({ specialRequests: e.target.value })}
        />
      </div>

      {canRedeem && (
        <label
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm transition",
            draft.redeemLoyalty
              ? "border-gold/60 bg-gold/10"
              : "border-border/60 bg-card",
          )}
        >
          <span>
            {t("booking.step4.redeemLoyalty", {
              points: LOYALTY_DISCOUNT_POINTS,
              discount: LOYALTY_DISCOUNT_DZD,
            })}
          </span>
          <input
            type="checkbox"
            checked={draft.redeemLoyalty}
            onChange={(e) => update({ redeemLoyalty: e.target.checked })}
            className="h-4 w-4 accent-gold"
          />
        </label>
      )}

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          {t("common.cta.back")}
        </Button>
        <Button variant="gold" onClick={next} disabled={!validation.success}>
          {t("common.cta.next")}
        </Button>
      </div>
    </div>
  );
}
