"use client";

import Link from "next/link";
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
  locale,
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

      {/* WhatsApp shortcut — for users who prefer to chat */}
      <Link
        href={`/${locale}/reservation/whatsapp`}
        className="group mt-6 flex items-center justify-between gap-4 rounded-lg border border-[#25d366]/40 bg-[#25d366]/10 px-4 py-3 text-sm transition hover:border-[#25d366] hover:bg-[#25d366]/15"
      >
        <span className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#25d366]" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="text-foreground">
            Préférez-vous discuter sur WhatsApp ?{" "}
            <span className="font-medium text-[#25d366]">
              Réservation rapide en 1 minute
            </span>
          </span>
        </span>
        <span className="text-[#25d366] transition-transform group-hover:translate-x-1 rtl:rotate-180">
          →
        </span>
      </Link>

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
