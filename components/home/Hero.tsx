"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Hero({ locale }: { locale: string }) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-orchard-gradient text-parchment">
      <div className="absolute inset-0 bg-sunlight-fade" aria-hidden />
      <div className="container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest-700/40 px-3 py-1 text-xs uppercase tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            {t("home.hero.eyebrow")}
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t("home.hero.title")}
          </h1>
          <p className="max-w-xl text-pretty text-base text-parchment/80 md:text-lg">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold">
              <Link href={`/${locale}/reservation`}>
                {t("home.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-parchment/30 text-parchment hover:bg-parchment/10"
            >
              <Link href={`/${locale}/activites`}>{t("home.hero.ctaSecondary")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-parchment/10 pt-6">
            {(["stat1", "stat2", "stat3"] as const).map((key) => (
              <div key={key}>
                <div className="font-serif text-2xl font-semibold text-gold md:text-3xl">
                  {t(`home.hero.${key}.value`)}
                </div>
                <div className="text-xs text-parchment/70">
                  {t(`home.hero.${key}.label`)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative hidden md:block"
        >
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-gold/30 to-forest-700 p-6 shadow-2xl">
            <div
              className="h-full w-full rounded-2xl bg-gradient-to-tr from-forest-900 via-forest-700 to-gold-700"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle cx='50' cy='50' r='40' fill='%23b08d3e' opacity='0.25'/><circle cx='150' cy='130' r='60' fill='%23dfc057' opacity='0.18'/></svg>\")",
                backgroundSize: "cover",
              }}
            />
          </div>
          <div className="absolute -bottom-4 start-6 rounded-2xl border border-gold/30 bg-card/95 p-4 text-ink shadow-xl backdrop-blur">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Ain Abid · Constantine
            </div>
            <div className="font-serif text-lg font-semibold text-forest">
              30 min de Constantine
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
