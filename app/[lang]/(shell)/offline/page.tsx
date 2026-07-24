import Link from "next/link";
import { WifiOff, QrCode } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";

/**
 * PWA offline fallback. Served by the service worker (NetworkFirst on
 * documents, see next.config.mjs) when a page request cannot reach the
 * network. Renders inside the (shell) light-theme layout. The one thing a
 * guest still needs offline is their QR check-in code — already cached — so
 * we point them straight there.
 */

export const dynamic = "force-static";

type Copy = {
  eyebrow: string;
  heading: string;
  body: string;
  qrCta: string;
  hint: string;
};

const COPY: Record<Locale, Copy> = {
  fr: {
    eyebrow: "Mode hors ligne",
    heading: "Vous êtes hors ligne",
    body: "La connexion s'est interrompue. Vous pouvez toujours afficher votre QR d'entrée, enregistré sur votre appareil, pour accéder au lagon.",
    qrCta: "Voir mon QR d'entrée",
    hint: "Les autres pages se rechargeront dès le retour du réseau.",
  },
  en: {
    eyebrow: "Offline mode",
    heading: "You're offline",
    body: "The connection dropped. You can still show your check-in QR — saved on your device — to get into the lagoon.",
    qrCta: "View my check-in QR",
    hint: "Other pages will reload as soon as the network is back.",
  },
  ar: {
    eyebrow: "وضع دون اتصال",
    heading: "أنت غير متصل بالإنترنت",
    body: "انقطع الاتصال. لا يزال بإمكانك عرض رمز الدخول QR المحفوظ على جهازك للدخول إلى البحيرة.",
    qrCta: "عرض رمز الدخول QR",
    hint: "ستُحمَّل الصفحات الأخرى بمجرد عودة الشبكة.",
  },
};

export default function OfflinePage({
  params,
}: {
  params: { lang: string };
}) {
  const locale: Locale = isLocale(params.lang) ? params.lang : "fr";
  const t = COPY[locale];

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <WifiOff className="h-8 w-8" aria-hidden="true" />
      </span>

      <p className="text-eyebrow font-medium uppercase tracking-wide text-lagoon-500">
        {t.eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
        {t.heading}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {t.body}
      </p>

      <Link
        href={`/${locale}/compte/qr-checkin`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-lagoon-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-lagoon-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon-600"
      >
        <QrCode className="h-4 w-4" aria-hidden="true" />
        {t.qrCta}
      </Link>

      <p className="mt-6 text-sm text-muted-foreground">{t.hint}</p>
    </section>
  );
}
