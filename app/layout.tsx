import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "L'Étoile de l'Est — Complexe Agrotouristique",
    template: "%s · L'Étoile de l'Est",
  },
  description:
    "Réservez vos séjours, activités et événements au complexe agrotouristique L'Étoile de l'Est, à Ain Abid, Constantine.",
  applicationName: "L'Étoile de l'Est",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "L'Étoile de l'Est",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192" },
      { url: "/icons/icon-512.png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    type: "website",
    siteName: "L'Étoile de l'Est",
    locale: "fr_DZ",
    alternateLocale: ["ar_DZ"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1f0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
