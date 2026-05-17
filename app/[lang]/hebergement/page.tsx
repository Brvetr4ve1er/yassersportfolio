import { AccommodationCard } from "@/components/accommodation/AccommodationCard";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { mockAccommodations } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export default async function AccommodationListPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["accommodation"])) as {
    accommodation: { accommodation: { listTitle: string; listSubtitle: string } };
  };
  const t = dict.accommodation.accommodation;

  return (
    <div className="container py-12">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          {t.listTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.listSubtitle}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockAccommodations.map((item) => (
          <AccommodationCard key={item.id} item={item} locale={params.lang} />
        ))}
      </div>
    </div>
  );
}
