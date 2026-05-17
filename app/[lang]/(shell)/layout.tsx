import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Locale } from "@/lib/i18n/config";

/**
 * (shell) layout — wraps the standard light-chrome pages
 * (booking, account, admin, listing pages).
 *
 * The cinematic homepage at /[lang]/page.tsx bypasses this layout
 * and renders its own dark cinematic chrome.
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
      <Header locale={params.lang} />
      <main className="min-h-[60vh] pb-20 md:pb-0">{children}</main>
      <Footer locale={params.lang} />
      <MobileNav locale={params.lang} />
    </>
  );
}
