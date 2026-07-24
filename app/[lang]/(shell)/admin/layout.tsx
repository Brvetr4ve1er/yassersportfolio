import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { Locale } from "@/lib/i18n/config";

/**
 * Admin shell — sits inside the light (shell) layout (header + footer already
 * provided). Adds a left sidebar nav; the sidebar flips to the right side
 * automatically in RTL because the layout is a direction-aware flex row.
 */
export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <AdminSidebar locale={params.lang} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
