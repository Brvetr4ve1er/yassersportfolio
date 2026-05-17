import "server-only";
import type { Locale, Namespace } from "./config";

type Dictionary = Record<string, unknown>;

const cache = new Map<string, Dictionary>();

async function loadNamespace(
  locale: Locale,
  ns: Namespace,
): Promise<Dictionary> {
  const key = `${locale}:${ns}`;
  if (cache.has(key)) return cache.get(key)!;
  const data = (await import(`@/locales/${locale}/${ns}.json`)) as {
    default: Dictionary;
  };
  cache.set(key, data.default);
  return data.default;
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
