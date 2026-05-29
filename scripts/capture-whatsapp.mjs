/**
 * Capture screenshots focused on the new WhatsApp booking page +
 * the updated CTA card with tilt effects.
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
const OUT = "/tmp/etoile-shots-v2";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  ...(CHROME ? { executablePath: CHROME } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shoot(label, { url, viewport, scrollTo, locale, hover }) {
  const context = await browser.newContext({
    viewport,
    locale: locale ?? "fr-FR",
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(1800);
  if (scrollTo != null) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollTo);
    await page.waitForTimeout(900);
  }
  if (hover) {
    const el = await page.$(hover.selector);
    if (el) {
      const box = await el.boundingBox();
      if (box) {
        // Move just inside top-left for the tilt to engage
        await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3);
        await page.waitForTimeout(600);
      }
    }
  }
  await page.screenshot({ path: `${OUT}/${label}.png` });
  console.log(`✓ ${label}`);
  await context.close();
}

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

console.log("Capturing WhatsApp booking page + tilt-card hover…");

// WhatsApp booking page — desktop, top
await shoot("01-whatsapp-fr-top", {
  url: `${BASE}/fr/reservation/whatsapp`,
  viewport: DESKTOP,
  scrollTo: 0,
});

// WhatsApp booking page — desktop, form fully visible
await shoot("02-whatsapp-fr-form", {
  url: `${BASE}/fr/reservation/whatsapp`,
  viewport: DESKTOP,
  scrollTo: 500,
});

// WhatsApp booking page — desktop, send section
await shoot("03-whatsapp-fr-send", {
  url: `${BASE}/fr/reservation/whatsapp`,
  viewport: DESKTOP,
  scrollTo: 1100,
});

// WhatsApp booking page — English
await shoot("04-whatsapp-en", {
  url: `${BASE}/en/reservation/whatsapp`,
  viewport: DESKTOP,
  scrollTo: 600,
  locale: "en-GB",
});

// WhatsApp booking page — Arabic RTL
await shoot("05-whatsapp-ar", {
  url: `${BASE}/ar/reservation/whatsapp`,
  viewport: DESKTOP,
  scrollTo: 600,
  locale: "ar-DZ",
});

// Mobile WhatsApp page
await shoot("06-whatsapp-mobile", {
  url: `${BASE}/fr/reservation/whatsapp`,
  viewport: MOBILE,
  scrollTo: 600,
});

// Updated reservation CTA section on homepage (dual buttons)
await shoot("07-homepage-cta-dual", {
  url: `${BASE}/fr`,
  viewport: DESKTOP,
  scrollTo: 9500,
});

// Updated booking step 1 with WhatsApp shortcut
await shoot("08-booking-step1-whatsapp", {
  url: `${BASE}/fr/reservation`,
  viewport: DESKTOP,
  scrollTo: 0,
});

// Tilt card preview — hover on the first accommodation in mobile cards
await shoot("09-terroir-tilt", {
  url: `${BASE}/fr`,
  viewport: DESKTOP,
  scrollTo: 5600,
  hover: { selector: "article a" },
});

await browser.close();
console.log("\nDone.");
