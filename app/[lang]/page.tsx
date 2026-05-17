import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedAccommodations } from "@/components/home/FeaturedAccommodations";
import { FeaturedActivities } from "@/components/home/FeaturedActivities";
import { LoyaltyBanner } from "@/components/home/LoyaltyBanner";
import { Testimonials } from "@/components/home/Testimonials";
import type { Locale } from "@/lib/i18n/config";

export default function HomePage({ params }: { params: { lang: Locale } }) {
  return (
    <>
      <Hero locale={params.lang} />
      <ValueProps />
      <FeaturedAccommodations locale={params.lang} />
      <FeaturedActivities locale={params.lang} />
      <LoyaltyBanner locale={params.lang} />
      <Testimonials />
    </>
  );
}
