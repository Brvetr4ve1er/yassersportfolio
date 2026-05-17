import { CinematicHeader } from "@/components/layout/CinematicHeader";
import { CinematicFooter } from "@/components/layout/CinematicFooter";
import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { TrilingualManifesto } from "@/components/cinematic/TrilingualManifesto";
import { AccommodationsEditorial } from "@/components/cinematic/AccommodationsEditorial";
import { EquestrianSection } from "@/components/cinematic/EquestrianSection";
import { SunsetPoolBreak } from "@/components/cinematic/SunsetPoolBreak";
import { TerroirSection } from "@/components/cinematic/TerroirSection";
import { PhilosophySection } from "@/components/cinematic/PhilosophySection";
import { LoyaltyRefined } from "@/components/cinematic/LoyaltyRefined";
import { CinematicTestimonials } from "@/components/cinematic/CinematicTestimonials";
import { ReservationCta } from "@/components/cinematic/ReservationCta";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Locale } from "@/lib/i18n/config";

/**
 * The cinematic homepage — family-warm, multi-generational, trilingual.
 *
 * Eight chapters, paced like a film about a family weekend. Lives outside
 * the (shell) route group so it bypasses the standard light chrome and
 * renders its own warm cinematic chrome.
 *
 * Pacing alternates warm sunlit cream chapters with darker terracotta
 * passages, so the experience feels like a slideshow of golden-hour
 * memories rather than a uniform mood piece.
 *
 *  00 — Hero (warm golden-hour stage, trilingual welcome strip)
 *  01 — Trilingual manifesto (FR / EN / AR side by side — the centerpiece)
 *  02 — Les maisons (accommodations as family rooms for tribes)
 *  03 — L'écurie (children's first horse rides)
 *   ·  — Sunset Pool (kids by day, parents by evening)
 *  04 — Le terroir (verger → midi → table, traceable in one day)
 *  05 — Une journée chez nous (timeline of a family day, dawn to stars)
 *  06 — Étoiles fidélité (the maison's register, refined)
 *  07 — Les familles (multi-generational testimonials)
 *  08 — Réservation (closing invitation, concrete promises)
 */
export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="theme-cinematic bg-terracotta text-cream">
      <CinematicHeader locale={params.lang} />
      <main>
        <CinematicHero locale={params.lang} />
        <TrilingualManifesto />
        <AccommodationsEditorial locale={params.lang} />
        <EquestrianSection locale={params.lang} />
        <SunsetPoolBreak locale={params.lang} />
        <TerroirSection locale={params.lang} />
        <PhilosophySection />
        <LoyaltyRefined locale={params.lang} />
        <CinematicTestimonials />
        <ReservationCta locale={params.lang} />
      </main>
      <CinematicFooter locale={params.lang} />
      <MobileNav locale={params.lang} />
    </div>
  );
}
