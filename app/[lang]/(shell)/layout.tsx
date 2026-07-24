import { ShellHeader } from "@/components/layout/ShellHeader";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/lib/i18n/config";

/**
 * (shell) — light-chrome wrapper for the app pages (reservation, carte,
 * compte, admin). The cinematic homepage at /[lang]/page.tsx renders its
 * own dark chrome and bypasses this layout.
 */
export default function ShellLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      <ShellHeader locale={params.lang} />
      <main className="min-h-[70vh]">{children}</main>
      <Footer locale={params.lang} />
    </>
  );
}
