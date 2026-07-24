import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QRScanner } from "@/components/admin/QRScanner";
import type { Locale } from "@/lib/i18n/config";

const COPY: Record<Locale, { title: string; subtitle: string }> = {
  fr: {
    title: "Scan QR",
    subtitle: "Vérification des billets à l'entrée",
  },
  en: {
    title: "QR Scan",
    subtitle: "Ticket verification at the entrance",
  },
  ar: {
    title: "مسح QR",
    subtitle: "التحقق من التذاكر عند المدخل",
  },
};

export default function AdminScanPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const locale = params.lang;
  const c = COPY[locale];

  return (
    <div>
      <AdminPageHeader title={c.title} subtitle={c.subtitle} />
      <QRScanner locale={locale} />
    </div>
  );
}
