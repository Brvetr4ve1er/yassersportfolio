import { CinematicHeader } from "@/components/layout/CinematicHeader";
import { CinematicFooter } from "@/components/layout/CinematicFooter";
import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { PhilosophySection } from "@/components/cinematic/PhilosophySection";
import { AccommodationsEditorial } from "@/components/cinematic/AccommodationsEditorial";
import { EquestrianSection } from "@/components/cinematic/EquestrianSection";
import { SunsetPoolBreak } from "@/components/cinematic/SunsetPoolBreak";
import { TerroirSection } from "@/components/cinematic/TerroirSection";
import { LoyaltyRefined } from "@/components/cinematic/LoyaltyRefined";
import { CinematicTestimonials } from "@/components/cinematic/CinematicTestimonials";
import { ReservationCta } from "@/components/cinematic/ReservationCta";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Locale } from "@/lib/i18n/config";

/**
 * The cinematic homepage.
 *
 * Eight chapters, paced like a film. Lives outside the (shell) route group
 * so it bypasses the standard light chrome and renders its own dark
 * cinematic header + footer.
 *
 * Reading order:
 *  00 — Hero (full bleed)
 *  01 — Origin (the philosophy)
 *  02 — Les demeures (accommodations as editorial plates)
 *  03 — L'écurie (equestrian heritage, the brand's emotional spine)
 *   ·  — Sunset Pool atmospheric break (different palette)
 *  04 — Le terroir (orchard, ruches, table)
 *  05 — Étoiles fidélité (loyalty register)
 *  06 — Les hôtes (testimonials as pull-quotes)
 *  07 — Réservation (closing CTA)
 */
export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="theme-cinematic bg-noir text-cream">
      <CinematicHeader locale={params.lang} />
      <main>
        <CinematicHero locale={params.lang} />
        <PhilosophySection />
        <AccommodationsEditorial locale={params.lang} />
        <EquestrianSection locale={params.lang} />
        <SunsetPoolBreak locale={params.lang} />
        <TerroirSection locale={params.lang} />
        <LoyaltyRefined locale={params.lang} />
        <CinematicTestimonials />
        <ReservationCta locale={params.lang} />
      </main>
      <CinematicFooter locale={params.lang} />
      <MobileNav locale={params.lang} />
    </div>
  );
}
