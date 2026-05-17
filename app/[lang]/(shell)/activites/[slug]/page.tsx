import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { formatCurrency } from "@/lib/i18n/format";
import { mockActivities } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return mockActivities.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const item = mockActivities.find((a) => a.slug === params.slug);
  if (!item) notFound();

  const dict = (await getDictionary(params.lang, ["activity", "common"])) as {
    activity: {
      details: Record<string, string>;
      minutes: string;
      days: Record<string, string>;
    };
    common: { cta: Record<string, string> };
  };
  const a = dict.activity;
  const c = dict.common;
  const name = params.lang === "ar" ? item.name_ar : item.name_fr;
  const description = params.lang === "ar" ? item.description_ar : item.description_fr;

  return (
    <article className="container max-w-5xl py-10">
      <Link
        href={`/${params.lang}/activites`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
        {c.cta.back}
      </Link>

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div
            className="aspect-video w-full rounded-2xl bg-gradient-to-br from-gold-700 to-forest"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'><rect width='640' height='360' fill='%2315391c'/><circle cx='460' cy='120' r='50' fill='%23dfc057' opacity='0.4'/><path d='M0,300 Q320,180 640,300 L640,360 L0,360 Z' fill='%232d6a36' opacity='0.6'/></svg>\")",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <aside className="space-y-6">
          <div>
            <Badge variant="gold">{formatCurrency(item.price_per_person, params.lang)} {a.details.pricePerPerson}</Badge>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-forest md:text-4xl">
              {name}
            </h1>
            <p className="mt-3 text-muted-foreground">{description}</p>
          </div>

          <div className="surface-card grid gap-3 p-5 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              <span className="text-muted-foreground">{a.details.duration}:</span>
              <span className="font-medium">{item.duration_minutes} {a.minutes}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gold" />
              <span className="text-muted-foreground">{a.details.participants}:</span>
              <span className="font-medium">
                {item.min_participants}–{item.max_participants}
              </span>
            </div>
            <Separator />
            <div>
              <div className="mb-2 text-muted-foreground">{a.details.availableDays}:</div>
              <div className="flex flex-wrap gap-1.5">
                {item.available_days.map((d) => (
                  <Badge key={d} variant="outline">
                    {a.days[d] ?? d}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button asChild size="lg" variant="gold" className="w-full">
            <Link href={`/${params.lang}/reservation?type=activity&id=${item.id}`}>
              <CalendarCheck className="h-4 w-4" />
              {a.details.bookFromHere}
            </Link>
          </Button>
        </aside>
      </div>
    </article>
  );
}
