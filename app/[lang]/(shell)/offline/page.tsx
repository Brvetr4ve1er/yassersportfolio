import Link from "next/link";
import { QrCode, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";

export default function OfflinePage({ params }: { params: { lang: Locale } }) {
  return (
    <div className="container max-w-md py-20 text-center">
      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-warning/15 text-warning">
        <WifiOff className="h-7 w-7" />
      </div>
      <h1 className="font-serif text-3xl font-semibold text-forest">
        {params.lang === "ar" ? "وضع عدم الاتصال" : "Mode hors ligne"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {params.lang === "ar"
          ? "أنت غير متّصل بالإنترنت. تستطيع مع ذلك عرض رمز QR للوصول."
          : "Vous êtes hors ligne. Vous pouvez toutefois consulter votre QR d'arrivée."}
      </p>
      <Button asChild className="mt-6" variant="gold">
        <Link href={`/${params.lang}/compte/qr-checkin`}>
          <QrCode className="h-4 w-4" />
          {params.lang === "ar" ? "اعرض رمز QR" : "Voir mon QR"}
        </Link>
      </Button>
    </div>
  );
}
