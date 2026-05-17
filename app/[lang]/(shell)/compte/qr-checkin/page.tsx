import { QRCheckIn } from "@/components/account/QRCheckIn";
import { mockBookings } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";

export default function QRCheckInPage({ params }: { params: { lang: Locale } }) {
  const today = new Date().toISOString().slice(0, 10);
  const booking =
    mockBookings.find(
      (b) => b.status === "confirmed" && b.check_in >= today,
    ) ?? mockBookings[0];

  return (
    <div className="py-6">
      <QRCheckIn booking={booking} locale={params.lang} />
    </div>
  );
}
