/**
 * Short video showing the new features: WhatsApp booking page interaction
 * (typing fills the live message preview), the tilt-card hover on terroir
 * plates, and the dual-button CTA on the homepage.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { mkdirSync, readdirSync, renameSync } from "node:fs";

// Portable Chromium resolution:
//  1. PLAYWRIGHT_CHROME_PATH env var, if set
//  2. the sandbox bundled Chromium, if present
//  3. undefined → Playwright resolves its own (run `npx playwright install chromium`)
const SANDBOX_CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const CHROME =
  process.env.PLAYWRIGHT_CHROME_PATH ||
  (existsSync(SANDBOX_CHROME) ? SANDBOX_CHROME : undefined);
const BASE = "http://localhost:3000";
const OUT = "/tmp/etoile-video";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  ...(CHROME ? { executablePath: CHROME } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: "fr-FR",
  recordVideo: {
    dir: OUT,
    size: { width: 1440, height: 900 },
  },
});
const page = await context.newPage();

// 1. Land on homepage, scroll to CTA showing dual buttons
console.log("→ Homepage CTA");
await page.goto(`${BASE}/fr`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2000);

// Scroll smoothly to reservation CTA
const scrollTo = async (y, duration = 1800) => {
  const steps = Math.round(duration / 16);
  const start = await page.evaluate(() => window.scrollY);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), start + (y - start) * e);
    await page.waitForTimeout(16);
  }
};

// 2. Show terroir tilt
await scrollTo(5600, 3000);
await page.waitForTimeout(800);
// Hover the first terroir card to trigger tilt
const terroirCards = await page.$$("article a");
if (terroirCards[0]) {
  const box = await terroirCards[0].boundingBox();
  if (box) {
    // Move cursor in a small arc to show the tilt responding
    for (let i = 0; i < 30; i++) {
      const t = i / 30;
      const ang = t * Math.PI * 1.5;
      const px = box.x + box.width * (0.5 + 0.35 * Math.cos(ang));
      const py = box.y + box.height * (0.5 + 0.25 * Math.sin(ang));
      await page.mouse.move(px, py);
      await page.waitForTimeout(40);
    }
    // Move out
    await page.mouse.move(box.x - 100, box.y - 100);
    await page.waitForTimeout(500);
  }
}

// 3. Scroll to dual-button CTA
await scrollTo(9500, 2200);
await page.waitForTimeout(1000);

// 4. Hover the WhatsApp button to show magnetic pull
const waBtn = await page.$('a[href*="/reservation/whatsapp"]');
if (waBtn) {
  const box = await waBtn.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2 - 80, box.y + box.height / 2);
    await page.waitForTimeout(400);
    await page.mouse.move(box.x + box.width / 2 - 30, box.y + box.height / 2);
    await page.waitForTimeout(400);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(700);
  }
}

// 5. Click WhatsApp button → navigate to booking page
if (waBtn) {
  await waBtn.click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(2000);
}

// 6. Type in the form so the live preview updates
console.log("→ WhatsApp form interaction");
// Type the name
const nameInput = await page.$('input#name');
if (nameInput) {
  await nameInput.focus();
  await page.keyboard.type("Karim Belkacem", { delay: 60 });
  await page.waitForTimeout(500);
}

// Type the phone
const phoneInput = await page.$('input#phone');
if (phoneInput) {
  await phoneInput.focus();
  await page.keyboard.type("0555 12 34 56", { delay: 50 });
  await page.waitForTimeout(500);
}

// Type special request
const specialInput = await page.$('textarea#special');
if (specialInput) {
  await specialInput.focus();
  await page.keyboard.type("Arrivée tardive vers 22h, anniversaire de mariage 🎉", { delay: 35 });
  await page.waitForTimeout(800);
}

// Scroll down to show the WhatsApp send button
await scrollTo(1100, 1500);
await page.waitForTimeout(800);

// Hover the WhatsApp send button to show magnetic + style
const sendBtn = await page.$('a[href*="wa.me"]');
if (sendBtn) {
  const box = await sendBtn.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2 - 60, box.y + box.height / 2);
    await page.waitForTimeout(500);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1200);
  }
}

// Scroll back to top to show the page header
await scrollTo(0, 1500);
await page.waitForTimeout(1500);

await context.close();

// Rename
const files = readdirSync(OUT).filter((f) => f.endsWith(".webm"));
files.sort((a, b) => b.localeCompare(a));
if (files[0]) {
  renameSync(`${OUT}/${files[0]}`, `${OUT}/whatsapp-walkthrough.webm`);
  console.log(`\n✓ /tmp/etoile-video/whatsapp-walkthrough.webm`);
}

await browser.close();
