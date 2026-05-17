import { ActivityCard } from "@/components/activity/ActivityCard";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { mockActivities } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export default async function ActivityListPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["activity"])) as {
    activity: { activity: { listTitle: string; listSubtitle: string } };
  };
  const t = dict.activity.activity;

  return (
    <div className="container py-12">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-forest md:text-5xl">
          {t.listTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.listSubtitle}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockActivities.map((item) => (
          <ActivityCard key={item.id} item={item} locale={params.lang} />
        ))}
      </div>
    </div>
  );
}
