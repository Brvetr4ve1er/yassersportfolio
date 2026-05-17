import { UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/i18n/format";
import { restaurantMenu } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

const SECTION_LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    starters: "Entrées",
    mains: "Plats principaux",
    grills: "Grillades",
    desserts: "Desserts",
    drinks: "Boissons",
  },
  ar: {
    starters: "المقبلات",
    mains: "الأطباق الرئيسية",
    grills: "المشاوي",
    desserts: "الحلويات",
    drinks: "المشروبات",
  },
};

export default function RestaurantPage({ params }: { params: { lang: Locale } }) {
  const sections = Object.entries(restaurantMenu);

  return (
    <div className="container max-w-4xl py-12">
      <header className="mb-10 max-w-2xl">
        <Badge variant="gold" className="mb-3">
          <UtensilsCrossed className="me-1 h-3 w-3" /> Restaurant
        </Badge>
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          {params.lang === "ar" ? "مطعم نجمة الشرق" : "Restaurant L'Étoile"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {params.lang === "ar"
            ? "كل أطباقنا محضّرة من منتجات بساتيننا وأسواق الجوار."
            : "Tous nos plats sont préparés avec les produits de nos vergers et des marchés voisins."}
        </p>
      </header>

      <div className="space-y-8">
        {sections.map(([key, items]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <h2 className="mb-4 font-serif text-xl font-semibold text-forest">
                {SECTION_LABELS[params.lang][key]}
              </h2>
              <ul className="divide-y divide-border/60">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-sm font-medium">
                      {params.lang === "ar" ? item.name_ar : item.name_fr}
                    </span>
                    <span className="font-mono text-sm text-gold">
                      {formatCurrency(item.price, params.lang)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-10" />

      <section className="rounded-2xl border border-gold/30 bg-card p-6">
        <h2 className="font-serif text-2xl font-semibold text-forest">
          Catering & événements
        </h2>
        <p className="mt-2 text-muted-foreground">
          Mariages, fêtes familiales, événements d'entreprise. Demandez un devis personnalisé.
        </p>
        <p className="mt-3 text-sm">
          📞 <a href="tel:+213555000000" className="text-forest underline">+213 555 00 00 00</a>
        </p>
      </section>
    </div>
  );
}
