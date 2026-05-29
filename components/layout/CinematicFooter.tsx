"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { WordMark } from "@/components/brand/WordMark";
import { BrandMark } from "@/components/brand/BrandMark";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/config";

export function CinematicFooter({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-terracotta-dark text-cream">
      {/* Top thin gold rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />

      <div className="container py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <WordMark tone="cream" size="lg" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              Complexe agrotouristique L'Étoile de l'Est — Ain Abid,
              Constantine. Vingt-cinq hectares de vergers, d'écuries, de
              ruchers et d'hospitalité algérienne.
            </p>

            <div className="mt-10 space-y-3 text-sm">
              <a
                href="https://maps.app.goo.gl/b7wrNRY1jZ1uARaXA"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 text-cream/70 hover:text-cream"
              >
                <MapPin className="mt-0.5 h-4 w-4 text-bronze" />
                <span>
                  Route nationale, Ain Abid <br /> Wilaya de Constantine, Algérie
                </span>
              </a>
              <a
                href="tel:+213555000000"
                className="flex items-center gap-3 text-cream/70 hover:text-cream"
              >
                <Phone className="h-4 w-4 text-bronze" />
                +213 555 00 00 00
              </a>
              <a
                href="mailto:contact@etoiledelest-dz.com"
                className="flex items-center gap-3 text-cream/70 hover:text-cream"
              >
                <Mail className="h-4 w-4 text-bronze" />
                contact@etoiledelest-dz.com
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-4 md:col-start-7">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="eyebrow mb-4">La maison</div>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href={`/${locale}/hebergement`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Hébergement
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/activites`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Activités
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/restaurant`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Restaurant
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/carte`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Plan du domaine
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/galerie`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Galerie
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="eyebrow mb-4">Réserver</div>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      href={`/${locale}/reservation`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Séjours
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/packages`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Forfaits
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/reservation/whatsapp`}
                      className="inline-flex items-center gap-1.5 text-[#7ee0a4] hover:text-[#25d366]"
                    >
                      <WhatsAppGlyph className="h-3 w-3" />
                      Réserver par WhatsApp
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/compte/fidelite`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Étoiles fidélité
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/blog`}
                      className="text-cream/70 hover:text-cream"
                    >
                      Carnet
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <div className="eyebrow mb-4">Réseaux</div>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/etoiledelest.dz"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="rounded-full border border-bronze/30 p-2.5 text-cream/70 transition hover:border-bronze hover:bg-bronze/10 hover:text-bronze"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/etoiledelest.dz"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-bronze/30 p-2.5 text-cream/70 transition hover:border-bronze hover:bg-bronze/10 hover:text-bronze"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-start gap-6 border-t border-bronze/15 pt-8 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark variant="minimal" tone="bronze" className="h-3 w-3" />
            <span>© {year} L'Étoile de l'Est · Tous droits réservés</span>
          </div>
          <div className="flex gap-6">
            <Link href={`/${locale}/legal`} className="hover:text-cream">
              Mentions légales
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-cream">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
