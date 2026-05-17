import { Cairo, Cormorant_Garamond, DM_Mono, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { Toaster } from "@/components/ui/toaster";
import { getDictionary } from "@/lib/i18n/getDictionary";
import {
  isLocale,
  localeDirection,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang as Locale;
  const dir = localeDirection[locale];
  const dictionary = await getDictionary(locale, [
    "common",
    "home",
    "booking",
    "accommodation",
    "activity",
    "account",
    "admin",
  ]);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        inter.variable,
        cormorant.variable,
        cairo.variable,
        dmMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground">
        <I18nProvider locale={locale} dictionary={dictionary}>
          <OfflineIndicator />
          {children}
          <InstallPrompt />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
