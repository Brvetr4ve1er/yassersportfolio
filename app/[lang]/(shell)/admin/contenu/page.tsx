import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAccommodations, mockActivities, mockPackages } from "@/lib/data/mock";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

export default async function AdminContent({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: { admin: { content: { title: string; accommodations: string; activities: string; packages: string } } };
  };
  const c = dict.admin.admin.content;

  const list = <T extends { id: string; name_fr: string; name_ar: string }>(
    items: T[],
    price: (item: T) => number,
  ) => (
    <div className="space-y-2">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-serif text-base font-semibold text-forest">
                {params.lang === "ar" ? item.name_ar : item.name_fr}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(price(item), params.lang)}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Modifier
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-forest">{c.title}</h1>
      <Tabs defaultValue="accommodations">
        <TabsList>
          <TabsTrigger value="accommodations">{c.accommodations}</TabsTrigger>
          <TabsTrigger value="activities">{c.activities}</TabsTrigger>
          <TabsTrigger value="packages">{c.packages}</TabsTrigger>
        </TabsList>
        <TabsContent value="accommodations">
          {list(mockAccommodations, (a) => a.price_weekday)}
        </TabsContent>
        <TabsContent value="activities">
          {list(mockActivities, (a) => a.price_per_person)}
        </TabsContent>
        <TabsContent value="packages">
          {list(mockPackages, (p) => p.price)}
        </TabsContent>
      </Tabs>
    </section>
  );
}
