import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { ConceptSection } from "@/components/cinematic/ConceptSection";
import { OffersSection } from "@/components/cinematic/OffersSection";
import { SunsetSection } from "@/components/cinematic/SunsetSection";
import type { Locale } from "@/lib/i18n/config";

export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="theme-cinematic bg-deepwater text-sand">
      <Header locale={params.lang} />
      <main>
        <CinematicHero locale={params.lang} />
        <ConceptSection locale={params.lang} />
        <OffersSection locale={params.lang} />
        <SunsetSection locale={params.lang} />
      </main>
      <Footer locale={params.lang} />
    </div>
  );
}
