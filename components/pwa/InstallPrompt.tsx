"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "etoile.installPrompt.dismissedAt";

export function InstallPrompt() {
  const { t } = useI18n();
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
      const recentlyDismissed = Date.now() - dismissedAt < 1000 * 60 * 60 * 24 * 14;
      if (recentlyDismissed) return;
      setEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible || !event) return null;

  return (
    <div
      role="dialog"
      className="fixed bottom-20 inset-x-4 z-40 mx-auto max-w-md rounded-xl border border-gold/30 bg-card p-4 shadow-xl md:bottom-6 md:end-6 md:inset-x-auto"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-gold/10 p-2 text-gold">
          <Download className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif text-base font-semibold text-forest">
            {t("home.installPwa.title")}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home.installPwa.body")}
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="gold"
              onClick={async () => {
                await event.prompt();
                setVisible(false);
                setEvent(null);
              }}
            >
              {t("home.installPwa.cta")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                localStorage.setItem(DISMISS_KEY, String(Date.now()));
                setVisible(false);
              }}
            >
              {t("common.cta.cancel")}
            </Button>
          </div>
        </div>
        <button
          aria-label="close"
          className="text-muted-foreground"
          onClick={() => setVisible(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
