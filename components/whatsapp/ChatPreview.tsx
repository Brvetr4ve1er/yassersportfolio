"use client";

import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const TIME_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ar: "ar-DZ",
};

type Props = {
  message: string;
  locale: Locale;
  brand: string;
  onlineLabel: string;
};

/**
 * WhatsApp-style chat bubble that mirrors the composed booking message live.
 *
 * The timestamp is the one hydration hazard here: rendering `new Date()` during
 * SSR produces markup the client can never match (the clock has moved on, and
 * the server/browser timezones differ). So we render nothing for the time on
 * the server, then fill it in from a mount-gated effect. `suppressHydrationWarning`
 * covers the intentional first-paint difference on that single node.
 */
export function ChatPreview({ message, locale, brand, onlineLabel }: Props) {
  const [time, setTime] = useState<string | null>(null);
  const isAr = locale === "ar";

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString(TIME_LOCALE[locale], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [locale]);

  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 shadow-xl shadow-lagoon-900/10">
      {/* Header bar — WhatsApp dark green */}
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366]">
          <WhatsAppGlyph className="h-6 w-6 text-white" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold leading-tight">
            {brand}
          </div>
          <div className="text-[11px] text-white/70">{onlineLabel}</div>
        </div>
      </div>

      {/* Paper background */}
      <div className="bg-[#ece5dd] px-3 py-5 sm:px-5">
        <div className="ms-auto w-fit max-w-[92%]">
          <div className="relative rounded-2xl rounded-se-sm bg-[#d9fdd3] px-3.5 py-2.5 shadow-sm">
            <pre
              dir={isAr ? "rtl" : "ltr"}
              className={cn(
                "whitespace-pre-wrap break-words font-sans text-[13px] leading-relaxed text-[#111b21]",
                isAr ? "text-end" : "text-start",
              )}
            >
              {message}
            </pre>
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
              <span suppressHydrationWarning>{time ?? ""}</span>
              <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
