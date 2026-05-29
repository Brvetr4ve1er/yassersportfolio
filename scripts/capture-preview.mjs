/**
 * Capture preview screenshots of the cinematic homepage at multiple viewports
 * and key scroll positions. Run after `npm run start` has booted the server.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { mkdirSync } from "node:fs";

// Portable Chromium resolution:
//  1. PLAYWRIGHT_CHROME_PATH env var, if set
//  2. the sandbox bundled Chromium, if present
//  3. undefined → Playwright resolves its own (run `npx playwright install chromium`)
const SANDBOX_CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const CHROME =
  process.env.PLAYWRIGHT_CHROME_PATH ||
  (existsSync(SANDBOX_CHROME) ? SANDBOX_CHROME : undefined);
const BASE = "http://localhost:3000";
const OUT = "/tmp/etoile-shots";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  ...(CHROME ? { executablePath: CHROME } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shoot(label, opts) {
  const { url, viewport, scrollTo, fullPage, locale } = opts;
  const context = await browser.newContext({
    viewport,
    locale: locale ?? "fr-FR",
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

  // Wait for fonts + initial reveal animations
  await page.waitForTimeout(1500);

  if (scrollTo != null) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollTo);
    await page.waitForTimeout(900);
  }

  const path = `${OUT}/${label}.png`;
  await page.screenshot({ path, fullPage: fullPage ?? false });
  console.log(`✓ ${label}  →  ${path}`);
  await context.close();
}

// Desktop viewport — the cinematic experience
const DESKTOP = { width: 1440, height: 900 };

// Mobile viewport
const MOBILE = { width: 390, height: 844 };

console.log("Capturing desktop frames…");
await shoot("01-hero", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 0 });
await shoot("02-marquee-manifesto", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 920 });
await shoot("03-manifesto-trilingual", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 1500 });
await shoot("04-accommodations-hover", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 2400 });
await shoot("05-equestrian", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 3500 });
await shoot("06-sunset-pool", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 4500 });
await shoot("07-terroir", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 5400 });
await shoot("08-family-day", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 6400 });
await shoot("09-loyalty", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 7400 });
await shoot("10-testimonials", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 8400 });
await shoot("11-reservation-cta", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 9400 });
await shoot("12-footer", { url: `${BASE}/fr`, viewport: DESKTOP, scrollTo: 10400 });

console.log("Capturing arabic version (RTL)…");
await shoot("13-hero-arabic-rtl", { url: `${BASE}/ar`, viewport: DESKTOP, scrollTo: 0, locale: "ar-DZ" });
await shoot("14-manifesto-arabic", { url: `${BASE}/ar`, viewport: DESKTOP, scrollTo: 1500, locale: "ar-DZ" });

console.log("Capturing english version…");
await shoot("15-hero-english", { url: `${BASE}/en`, viewport: DESKTOP, scrollTo: 0, locale: "en-GB" });

console.log("Capturing mobile…");
await shoot("16-mobile-hero", { url: `${BASE}/fr`, viewport: MOBILE, scrollTo: 0 });
await shoot("17-mobile-manifesto", { url: `${BASE}/fr`, viewport: MOBILE, scrollTo: 1100 });
await shoot("18-mobile-accommodations", { url: `${BASE}/fr`, viewport: MOBILE, scrollTo: 2200 });

await browser.close();
console.log("\nAll captures complete.");
