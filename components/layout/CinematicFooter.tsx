"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { WordMark } from "@/components/brand/WordMark";
import { BrandMark } from "@/components/brand/BrandMark";
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
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
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
