import { QRScanner } from "@/components/admin/QRScanner";
import { getDictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function AdminScanPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = (await getDictionary(params.lang, ["admin"])) as {
    admin: { admin: { scan: { title: string; subtitle: string } } };
  };
  const s = dict.admin.admin.scan;

  return (
    <section>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-forest">{s.title}</h1>
      <p className="mb-6 text-muted-foreground">{s.subtitle}</p>
      <QRScanner />
    </section>
  );
}
