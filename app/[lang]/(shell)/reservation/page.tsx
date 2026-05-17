import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export default function ReservationPage({ params }: { params: { lang: Locale } }) {
  return (
    <Suspense
      fallback={
        <div className="container py-20 text-center text-muted-foreground">…</div>
      }
    >
      <BookingWizard locale={params.lang} />
    </Suspense>
  );
}
