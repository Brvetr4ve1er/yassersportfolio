import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import type { Locale } from "@/lib/i18n/config";

export default function ReservationPage({ params }: { params: { lang: Locale } }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <BookingWizard locale={params.lang} />
    </Suspense>
  );
}
