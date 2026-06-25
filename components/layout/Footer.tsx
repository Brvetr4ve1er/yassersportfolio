"use client";

import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    tagline: string;
    contact: string;
    follow: string;
    address: string;
    hours: string;
    open: string;
    rights: string;
    legal: string;
    privacy: string;
  }
> = {
  fr: {
    tagline:
      "1ère plage artificielle d'Alger. Bouchaoui, Chéraga — ouvert toute la saison estivale.",
    contact: "Contact",
    follow: "Réseaux",
    address: "Forêt de Bouchaoui, Chéraga, 16084 Alger, Algérie",
    hours: "Horaires",
    open: "Tous les jours · 10h00 – 19h30",
    rights: "© {{year}} Oxygen Island. Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Confidentialité",
  },
  en: {
    tagline:
      "Algiers' first artificial beach. Bouchaoui, Chéraga — open all summer season.",
    contact: "Contact",
    follow: "Socials",
    address: "Bouchaoui forest, Chéraga, 16084 Algiers, Algeria",
    hours: "Hours",
    open: "Every day · 10:00 am – 7:30 pm",
    rights: "© {{year}} Oxygen Island. All rights reserved.",
    legal: "Legal",
    privacy: "Privacy",
  },
  ar: {
    tagline:
      "أوّل شاطئ اصطناعي في الجزائر. بوشاوي، الشراقة — مفتوح طوال الموسم الصيفي.",
    contact: "اتصل بنا",
    follow: "تابعنا",
    address: "غابة بوشاوي، الشراقة، 16084 الجزائر العاصمة، الجزائر",
    hours: "الأوقات",
    open: "كل يوم · 10:00 – 19:30",
    rights: "© {{year}} نجمة الأوكسجين. جميع الحقوق محفوظة.",
    legal: "إشعارات قانونية",
    privacy: "الخصوصية",
  },
};

export function Footer({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-deepwater-dark text-sand"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-lagoon-300/40 to-transparent" />
      <div className="container py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandMark variant="wordmark" tone="sand" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/60">
              {c.tagline}
            </p>

            <div className="mt-10 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-sand/75">
                <MapPin className="mt-0.5 h-4 w-4 text-lagoon-300" />
                {c.address}
              </div>
              <a
                href="tel:+213660056583"
                className="flex items-center gap-3 text-sand/75 hover:text-sand"
              >
                <Phone className="h-4 w-4 text-lagoon-300" />
                +213 660 05 65 83
              </a>
              <a
                href="tel:+213560343422"
                className="flex items-center gap-3 text-sand/75 hover:text-sand"
              >
                <Phone className="h-4 w-4 text-lagoon-300" />
                +213 560 34 34 22
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-7">
            <div className="eyebrow mb-4">{c.hours}</div>
            <p className="font-display text-xl font-medium text-sand">
              {c.open}
            </p>
            <p className="mt-2 text-xs text-sand/55">Mai → Octobre</p>

            <div className="mt-10">
              <div className="eyebrow mb-4">{c.follow}</div>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/oxygenisland"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-lagoon-300/30 p-2.5 text-sand/70 transition hover:border-lagoon-300 hover:bg-lagoon-300/10 hover:text-lagoon-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/61575716741025"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="rounded-full border border-lagoon-300/30 p-2.5 text-sand/70 transition hover:border-lagoon-300 hover:bg-lagoon-300/10 hover:text-lagoon-300"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-lagoon-300/15 pt-8 text-xs text-sand/55 md:flex-row md:items-center md:justify-between">
          <span>{c.rights.replace("{{year}}", String(year))}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sand">
              {c.legal}
            </a>
            <a href="#" className="hover:text-sand">
              {c.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
