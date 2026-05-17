import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import type { Locale } from "@/lib/i18n/config";

export default function GalleryPage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container py-12">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          {params.lang === "ar" ? "المعرض" : "Galerie"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {params.lang === "ar"
            ? "نظرة على المركّب، الإقامات، الأنشطة والمناظر."
            : "Un aperçu du complexe, des hébergements, des activités et des paysages."}
        </p>
      </header>
      <MasonryGallery locale={params.lang} />
    </div>
  );
}
