import { QrCode, Check, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  bookingProductName,
  PRODUCT_COPY,
  STATUS_COPY,
  PAYMENT_COPY,
  statusBadgeVariant,
  paymentBadgeVariant,
} from "@/components/admin/adminHelpers";
import { formatDateShort } from "@/lib/i18n/format";
import { formatCurrency } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/config";
import type { Booking } from "@/types/domain";

const COPY: Record<
  Locale,
  {
    reference: string;
    product: string;
    date: string;
    amount: string;
    payment: string;
    status: string;
    actions: string;
    confirm: string;
    markPaid: string;
    qr: string;
    empty: string;
  }
> = {
  fr: {
    reference: "Référence",
    product: "Produit",
    date: "Date",
    amount: "Montant",
    payment: "Paiement",
    status: "Statut",
    actions: "Actions",
    confirm: "Confirmer",
    markPaid: "Marquer payé",
    qr: "QR",
    empty: "Aucune réservation.",
  },
  en: {
    reference: "Reference",
    product: "Product",
    date: "Date",
    amount: "Amount",
    payment: "Payment",
    status: "Status",
    actions: "Actions",
    confirm: "Confirm",
    markPaid: "Mark paid",
    qr: "QR",
    empty: "No bookings.",
  },
  ar: {
    reference: "المرجع",
    product: "المنتج",
    date: "التاريخ",
    amount: "المبلغ",
    payment: "الدفع",
    status: "الحالة",
    actions: "إجراءات",
    confirm: "تأكيد",
    markPaid: "تحديد كمدفوع",
    qr: "QR",
    empty: "لا حجوزات.",
  },
};

export function BookingTable({
  locale,
  bookings,
}: {
  locale: Locale;
  bookings: Booking[];
}) {
  const c = COPY[locale];

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-8 text-center text-sm text-ink-muted">
        {c.empty}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-card shadow-sm">
      <table className="w-full min-w-[820px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/60 text-start text-[11px] uppercase tracking-wider text-ink-muted">
            <th className="p-4 text-start font-medium">{c.reference}</th>
            <th className="p-4 text-start font-medium">{c.product}</th>
            <th className="p-4 text-start font-medium">{c.date}</th>
            <th className="p-4 text-end font-medium">{c.amount}</th>
            <th className="p-4 text-start font-medium">{c.payment}</th>
            <th className="p-4 text-start font-medium">{c.status}</th>
            <th className="p-4 text-end font-medium">{c.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {bookings.map((b) => (
            <tr key={b.id} className="align-middle transition hover:bg-muted/40">
              <td className="whitespace-nowrap p-4 font-mono text-xs text-ink-soft">
                {b.reference}
              </td>
              <td className="p-4">
                <div className="font-medium text-foreground">
                  {bookingProductName(b, locale)}
                </div>
                <div className="text-xs text-ink-muted">
                  {PRODUCT_COPY[b.product][locale]}
                </div>
              </td>
              <td className="whitespace-nowrap p-4 text-ink-soft">
                {formatDateShort(b.visit_date, locale)}
              </td>
              <td className="whitespace-nowrap p-4 text-end font-medium text-foreground">
                {formatCurrency(b.total_price, locale)}
              </td>
              <td className="p-4">
                <Badge variant={paymentBadgeVariant(b.payment_status)}>
                  {PAYMENT_COPY[b.payment_status][locale]}
                </Badge>
              </td>
              <td className="p-4">
                <Badge variant={statusBadgeVariant(b.status)}>
                  {STATUS_COPY[b.status][locale]}
                </Badge>
              </td>
              <td className="p-4">
                {/* Non-functional demo actions — wire to server actions later. */}
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    disabled={b.status !== "pending"}
                  >
                    <Check className="h-3.5 w-3.5" />
                    {c.confirm}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="coral"
                    disabled={b.payment_status === "paid"}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    {c.markPaid}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-border text-ink-soft hover:bg-muted"
                    aria-label={c.qr}
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    {c.qr}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
