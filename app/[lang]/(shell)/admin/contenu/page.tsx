import { Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockPasses, mockCabanas, mockEvents } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    passes: string;
    cabanas: string;
    events: string;
    edit: string;
    quote: string;
    perDay: string;
  }
> = {
  fr: {
    title: "Contenu",
    subtitle: "Catalogue affiché sur le site — passes, cabanas, événements",
    passes: "Passes",
    cabanas: "Cabanas",
    events: "Événements",
    edit: "Modifier",
    quote: "Sur devis",
    perDay: "/ jour",
  },
  en: {
    title: "Content",
    subtitle: "Catalog shown on the site — passes, cabanas, events",
    passes: "Passes",
    cabanas: "Cabanas",
    events: "Events",
    edit: "Edit",
    quote: "On request",
    perDay: "/ day",
  },
  ar: {
    title: "المحتوى",
    subtitle: "الكتالوج المعروض على الموقع — تذاكر، كابانات، فعاليات",
    passes: "التذاكر",
    cabanas: "الكابانات",
    events: "الفعاليات",
    edit: "تعديل",
    quote: "عند الطلب",
    perDay: "/ يوم",
  },
};

function ContentRow({
  name,
  meta,
  price,
  editLabel,
}: {
  name: string;
  meta?: string;
  price: string;
  editLabel: string;
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5">
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{name}</p>
        {meta ? <p className="mt-0.5 text-xs text-ink-muted">{meta}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">{price}</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-border text-ink-soft hover:bg-muted"
        >
          <Pencil className="h-3.5 w-3.5" />
          {editLabel}
        </Button>
      </div>
    </li>
  );
}

export default function AdminContenuPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];
  const nameKey = `name_${locale}` as const;

  return (
    <div>
      <AdminPageHeader title={c.title} subtitle={c.subtitle} />

      <Tabs defaultValue="passes">
        <TabsList>
          <TabsTrigger value="passes">{c.passes}</TabsTrigger>
          <TabsTrigger value="cabanas">{c.cabanas}</TabsTrigger>
          <TabsTrigger value="events">{c.events}</TabsTrigger>
        </TabsList>

        <TabsContent value="passes">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border/60">
                {mockPasses.map((p) => (
                  <ContentRow
                    key={p.id}
                    name={p[nameKey]}
                    meta={p.slug}
                    price={formatCurrency(p.price, locale)}
                    editLabel={c.edit}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cabanas">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border/60">
                {mockCabanas.map((cab) => (
                  <ContentRow
                    key={cab.id}
                    name={cab[nameKey]}
                    meta={`${cab.capacity} pers. · ${cab.zone}`}
                    price={`${formatCurrency(cab.price, locale)} ${c.perDay}`}
                    editLabel={c.edit}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border/60">
                {mockEvents.map((e) => (
                  <ContentRow
                    key={e.id}
                    name={e[nameKey]}
                    meta={`${e.day}${e.time !== "—" ? ` · ${e.time}` : ""}`}
                    price={
                      e.price === null ? c.quote : formatCurrency(e.price, locale)
                    }
                    editLabel={c.edit}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
