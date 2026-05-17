"use client";

import { CreditCard, Wallet, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatCurrency } from "@/lib/i18n/format";
import { LOYALTY_DISCOUNT_DZD } from "@/lib/booking/pricing";
import { cn } from "@/lib/utils";
import type { BookingDraft } from "@/lib/booking/types";
import type { Locale, PaymentMethod } from "@/types/domain";

const OPTIONS: { key: PaymentMethod; icon: typeof CreditCard }[] = [
  { key: "baridi", icon: Wallet },
  { key: "cib", icon: CreditCard },
  { key: "cash", icon: Banknote },
];

export function Step5Payment({
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
  const discount = draft.redeemLoyalty ? LOYALTY_DISCOUNT_DZD : 0;
  const total = Math.max(0, draft.totalPrice - discount);
  const deposit = Math.round(total * 0.3);

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-forest">
        {t("booking.step5.title")}
      </h2>
      <p className="text-muted-foreground">{t("booking.step5.subtitle")}</p>

      <div className="grid gap-3">
        {OPTIONS.map(({ key, icon: Icon }) => {
          const selected = draft.paymentMethod === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => update({ paymentMethod: key })}
              className={cn(
                "text-start focus:outline-none",
                selected && "ring-2 ring-gold",
              )}
            >
              <Card
                className={cn(
                  "p-4 transition",
                  selected ? "border-gold/60 bg-gold/5" : "",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gold/10 p-2 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-forest">
                      {t(`booking.step5.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`booking.step5.${key}.body`)}
                    </p>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="surface-card divide-y divide-border/60 text-sm">
        <div className="flex items-center justify-between p-4">
          <span className="text-muted-foreground">{t("booking.step5.instructions.total")}</span>
          <span className="font-serif text-lg font-semibold text-forest">
            {formatCurrency(total, locale)}
          </span>
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="text-muted-foreground">{t("booking.step5.instructions.deposit")}</span>
          <span className="font-medium">{formatCurrency(deposit, locale)}</span>
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="text-muted-foreground">{t("booking.step5.instructions.balance")}</span>
          <span className="font-medium">{formatCurrency(total - deposit, locale)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          {t("common.cta.back")}
        </Button>
        <Button onClick={next} variant="gold" disabled={!draft.paymentMethod}>
          {t("common.cta.confirm")}
        </Button>
      </div>
    </div>
  );
}
