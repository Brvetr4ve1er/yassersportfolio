import "server-only";
import { defaultLocale, type Locale, type Namespace } from "./config";

type Dictionary = Record<string, unknown>;

const cache = new Map<string, Dictionary>();

async function loadNamespaceFile(
  locale: Locale,
  ns: Namespace,
): Promise<Dictionary | null> {
  try {
    const data = (await import(`@/locales/${locale}/${ns}.json`)) as {
      default: Dictionary;
    };
    return data.default;
  } catch {
    return null;
  }
}

async function loadNamespace(
  locale: Locale,
  ns: Namespace,
): Promise<Dictionary> {
  const key = `${locale}:${ns}`;
  if (cache.has(key)) return cache.get(key)!;

  let data = await loadNamespaceFile(locale, ns);

  // Graceful fallback: if a translation file is missing for a non-default
  // locale, fall back to the default locale. This lets us add new locales
  // incrementally without breaking pages.
  if (!data && locale !== defaultLocale) {
    data = await loadNamespaceFile(defaultLocale, ns);
  }

  if (!data) {
    data = {};
  }

  cache.set(key, data);
  return data;
}

export async function getDictionary(
  locale: Locale,
  ns: Namespace | Namespace[] = ["common"],
): Promise<Dictionary> {
  const list = Array.isArray(ns) ? ns : [ns];
  const parts = await Promise.all(list.map((n) => loadNamespace(locale, n)));
  return Object.fromEntries(
    list.map((n, i) => [n, parts[i]]),
  ) as Dictionary;
}

export async function getCommonDictionary(locale: Locale) {
  const dict = (await getDictionary(locale, "common")) as {
    common: Dictionary;
  };
  return dict.common;
}
