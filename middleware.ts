import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((p) => p.split(";")[0]?.trim().slice(0, 2).toLowerCase())
    .find((code) => (locales as readonly string[]).includes(code));
  return (preferred as Locale) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/robots.txt" ||
    pathname === "/sw.js" ||
    pathname.includes(".")
  ) return NextResponse.next();

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (!hasLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|icons|images|.*\\..*).*)"],
};
