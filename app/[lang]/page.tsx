import { CinematicHeader } from "@/components/layout/CinematicHeader";
import { CinematicFooter } from "@/components/layout/CinematicFooter";
import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { TrilingualManifesto } from "@/components/cinematic/TrilingualManifesto";
import { AccommodationsHoverPreview } from "@/components/cinematic/AccommodationsHoverPreview";
import { EquestrianSection } from "@/components/cinematic/EquestrianSection";
import { SunsetPoolBreak } from "@/components/cinematic/SunsetPoolBreak";
import { TerroirSection } from "@/components/cinematic/TerroirSection";
import { PhilosophySection } from "@/components/cinematic/PhilosophySection";
import { LoyaltyRefined } from "@/components/cinematic/LoyaltyRefined";
import { CinematicTestimonials } from "@/components/cinematic/CinematicTestimonials";
import { ReservationCta } from "@/components/cinematic/ReservationCta";
import { MobileNav } from "@/components/layout/MobileNav";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ChapterProgressRail } from "@/components/motion/ChapterProgressRail";
import { Marquee } from "@/components/motion/Marquee";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import type { Locale } from "@/lib/i18n/config";

const CHAPTERS = [
  { id: "chapter-00", num: "00", label: "Accueil" },
  { id: "chapter-01", num: "01", label: "Bienvenue" },
  { id: "chapter-02", num: "02", label: "Les maisons" },
  { id: "chapter-03", num: "03", label: "L'écurie" },
  { id: "chapter-pool", num: "·", label: "Sunset Pool" },
  { id: "chapter-04", num: "04", label: "Le terroir" },
  { id: "chapter-05", num: "05", label: "Une journée" },
  { id: "chapter-06", num: "06", label: "Fidélité" },
  { id: "chapter-07", num: "07", label: "Les familles" },
  { id: "chapter-08", num: "08", label: "Réserver" },
];

const MARQUEE_KEYWORDS = [
  "Hébergement",
  "Équitation",
  "Vergers",
  "La table",
  "Étoiles fidélité",
  "Ruches d'abeilles",
  "Sunset Pool",
  "Quad",
  "Camping",
  "Familles bienvenues",
];

/**
 * The cinematic homepage — Tier 1 motion upgrade.
 *
 *  · Lenis momentum scroll throughout
 *  · Fixed chapter progress rail on the right edge
 *  · Word-by-word headline reveals on every chapter
 *  · Magnetic CTAs (hero + reservation)
 *  · Cursor spotlight on dark terracotta passages
 *  · Marquee strip between hero and manifesto
 *  · Hover-driven accommodation preview (replaces static grid)
 */
export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <SmoothScrollProvider>
      <div className="theme-cinematic bg-terracotta text-cream">
        <CinematicHeader locale={params.lang} />
        <ChapterProgressRail chapters={CHAPTERS} />
        <main>
          <CinematicHero locale={params.lang} />

          {/* Kinetic strip — bridges hero into the manifesto */}
          <div className="relative bg-terracotta-dark border-y border-bronze/20">
            <Marquee
              items={MARQUEE_KEYWORDS}
              duration={50}
              separator="✦"
              tone="bronze"
            />
          </div>

          <TrilingualManifesto />
          <AccommodationsHoverPreview locale={params.lang} />

          <CursorSpotlight color="rgba(201, 163, 91, 0.32)" size={520}>
            <EquestrianSection locale={params.lang} />
          </CursorSpotlight>

          <SunsetPoolBreak locale={params.lang} />
          <TerroirSection locale={params.lang} />

          <CursorSpotlight color="rgba(201, 163, 91, 0.28)" size={480}>
            <PhilosophySection />
          </CursorSpotlight>

          <LoyaltyRefined locale={params.lang} />

          <CursorSpotlight color="rgba(201, 163, 91, 0.28)" size={500}>
            <CinematicTestimonials />
          </CursorSpotlight>

          <CursorSpotlight color="rgba(245, 162, 109, 0.30)" size={600}>
            <ReservationCta locale={params.lang} />
          </CursorSpotlight>
        </main>
        <CinematicFooter locale={params.lang} />
        <MobileNav locale={params.lang} />
      </div>
    </SmoothScrollProvider>
  );
}
