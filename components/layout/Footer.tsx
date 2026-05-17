"use client";

import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Star } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/60 bg-forest text-parchment">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-serif text-xl font-semibold">
              <Star className="h-5 w-5 fill-gold text-gold" />
              {t("common.brand.name")}
            </div>
            <p className="text-sm text-parchment/70 max-w-xs">
              {t("common.brand.tagline")}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold">
              {t("common.footer.contact")}
            </h4>
            <p className="flex items-start gap-2 text-sm text-parchment/80">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              {t("common.footer.address")}
            </p>
            <p className="flex items-center gap-2 text-sm text-parchment/80">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:+213555000000" className="hover:text-parchment">
                +213 555 00 00 00
              </a>
            </p>
            <p className="text-xs text-parchment/60">{t("common.footer.openHours")}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold">
              {t("common.nav.book")}
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href={`/${locale}/hebergement`} className="text-parchment/80 hover:text-parchment">
                  {t("common.nav.accommodations")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/activites`} className="text-parchment/80 hover:text-parchment">
                  {t("common.nav.activities")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/packages`} className="text-parchment/80 hover:text-parchment">
                  {t("common.nav.packages")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/restaurant`} className="text-parchment/80 hover:text-parchment">
                  {t("common.nav.restaurant")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-gold">
              {t("common.footer.follow")}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/etoiledelest.dz"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-parchment/10 p-2 text-parchment/80 hover:bg-gold hover:text-forest"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/etoiledelest.dz"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-parchment/10 p-2 text-parchment/80 hover:bg-gold hover:text-forest"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-parchment/10 pt-6 text-xs text-parchment/60 md:flex-row md:items-center md:justify-between">
          <span>{t("common.footer.rights").replace("{{year}}", String(year))}</span>
          <div className="flex gap-4">
            <Link href={`/${locale}/legal`} className="hover:text-parchment">
              {t("common.footer.legal")}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-parchment">
              {t("common.footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
