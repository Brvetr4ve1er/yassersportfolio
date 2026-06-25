import { Cairo, DM_Sans, Inter } from "next/font/google";
import { notFound } from "next/navigation";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang as Locale;
  const dir = localeDirection[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(inter.variable, dmSans.variable, cairo.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
