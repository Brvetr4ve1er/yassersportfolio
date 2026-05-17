import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";

const POSTS = [
  {
    slug: "guide-constantine-week-end",
    title_fr: "Week-end à Constantine : 5 escapades nature",
    title_ar: "نهاية أسبوع في قسنطينة: 5 رحلات في الطبيعة",
    excerpt_fr:
      "De la ville des ponts suspendus aux orchards d'Ain Abid, voici un itinéraire de 48h.",
    excerpt_ar:
      "من مدينة الجسور المعلّقة إلى بساتين عين عبيد، إليك مسار 48 ساعة.",
    date: "2026-04-12",
  },
  {
    slug: "agrotourisme-pourquoi-ca-marche",
    title_fr: "Pourquoi l'agrotourisme séduit les Algériens",
    title_ar: "لماذا يجذب السياحة الفلاحية الجزائريين",
    excerpt_fr:
      "Un séjour qui combine nature, terroir et déconnexion. Décryptage d'une tendance.",
    excerpt_ar: "إقامة تجمع الطبيعة، الأرض والانفصال. قراءة في توجّه جديد.",
    date: "2026-03-22",
  },
  {
    slug: "miel-ain-abid-tradition",
    title_fr: "Le miel d'Ain Abid : tradition et savoir-faire",
    title_ar: "عسل عين عبيد: تقليد ومعرفة",
    excerpt_fr:
      "Visite chez nos apiculteurs et découverte d'un produit local d'exception.",
    excerpt_ar: "زيارة لنحّالينا واكتشاف منتج محلي استثنائي.",
    date: "2026-02-08",
  },
];

export default function BlogPage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container max-w-4xl py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          {params.lang === "ar" ? "المدونة" : "Le Carnet"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {params.lang === "ar"
            ? "حكايات، أدلة وأخبار من المركّب."
            : "Récits, guides et actualités du complexe."}
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/${params.lang}/blog/${post.slug}`}
            className="block"
          >
            <Card className="h-full transition hover:shadow-md">
              <div
                className="aspect-[16/9] bg-gradient-to-br from-forest to-gold-700"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><rect width='320' height='180' fill='%2315391c'/><circle cx='80' cy='90' r='30' fill='%23b08d3e' opacity='0.5'/></svg>\")",
                  backgroundSize: "cover",
                }}
              />
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString(
                    params.lang === "ar" ? "ar-DZ" : "fr-FR",
                  )}
                </div>
                <h2 className="font-serif text-lg font-semibold text-forest">
                  {params.lang === "ar" ? post.title_ar : post.title_fr}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {params.lang === "ar" ? post.excerpt_ar : post.excerpt_fr}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
