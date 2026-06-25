import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Oxygen Island DZ — Beach & Pool Club, Alger",
    template: "%s · Oxygen Island",
  },
  description:
    "Le premier lagon artificiel d'Alger, niché dans la forêt de Bouchaoui. Pass journée, cabanas, soirées DJ, animations enfants.",
  applicationName: "Oxygen Island",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Oxygen Island",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    siteName: "Oxygen Island",
    locale: "fr_DZ",
    alternateLocale: ["ar_DZ", "en_DZ"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2a30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
