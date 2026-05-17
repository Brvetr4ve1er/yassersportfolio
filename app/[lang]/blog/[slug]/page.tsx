import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

export default function BlogArticlePage({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  return (
    <article className="container max-w-2xl py-12">
      <Link
        href={`/${params.lang}/blog`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
        {params.lang === "ar" ? "المدونة" : "Le Carnet"}
      </Link>
      <h1 className="font-serif text-3xl font-semibold text-forest md:text-4xl">
        {params.slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-4 text-muted-foreground">
        {params.lang === "ar"
          ? "هذا المقال هو نموذج. سيُملأ المحتوى الحقيقي من خلال لوحة الإدارة لاحقًا."
          : "Cet article est un gabarit. Le contenu réel sera publié via le tableau d'administration plus tard."}
      </p>
    </article>
  );
}
