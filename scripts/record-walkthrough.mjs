/**
 * Record a walkthrough video of the cinematic homepage.
 * Captures the actual motion vocabulary: scroll, headline reveals,
 * cursor spotlight, accommodation hover-preview cross-fades,
 * marquee animation, magnetic CTAs.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { mkdirSync, renameSync, readdirSync } from "node:fs";
import { join } from "node:path";

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

async function record(label, url, sequence) {
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
  await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  // Wait for hero animation
  await page.waitForTimeout(2000);

  await sequence(page);

  await context.close();

  // Rename the auto-generated video file to our label
  const files = readdirSync(OUT).filter((f) => f.endsWith(".webm"));
  // The most recent one is ours
  files.sort((a, b) => b.localeCompare(a));
  const newest = files[0];
  if (newest) {
    const target = `${OUT}/${label}.webm`;
    renameSync(`${OUT}/${newest}`, target);
    console.log(`✓ ${label} → ${target}`);
  }
}

async function slowScroll(page, targetY, durationMs) {
  const steps = Math.round(durationMs / 16);
  const start = await page.evaluate(() => window.scrollY);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // ease-in-out
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const y = start + (targetY - start) * e;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(16);
  }
}

console.log("Recording walkthrough…");
await record("walkthrough", `${BASE}/fr`, async (page) => {
  // 1. Linger on hero for 2.5s so animations play
  await page.waitForTimeout(2500);

  // 2. Slow scroll through marquee + manifesto
  await slowScroll(page, 1100, 2200);
  await page.waitForTimeout(1200);

  // 3. Continue into trilingual manifesto
  await slowScroll(page, 1800, 1800);
  await page.waitForTimeout(1500);

  // 4. Scroll to accommodations
  await slowScroll(page, 2700, 2000);
  await page.waitForTimeout(1000);

  // 5. Hover each accommodation row to show cross-fade preview
  const rows = await page.$$("ol > li.group\\/row");
  for (let i = 0; i < Math.min(rows.length, 4); i++) {
    await rows[i].hover();
    await page.waitForTimeout(1100);
  }

  // 6. Scroll to equestrian
  await slowScroll(page, 4000, 2000);
  // Move cursor across to trigger spotlight
  for (let i = 0; i < 12; i++) {
    await page.mouse.move(200 + i * 100, 500);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(800);

  // 7. Scroll to sunset pool
  await slowScroll(page, 4900, 2000);
  await page.waitForTimeout(1500);

  // 8. Scroll to terroir
  await slowScroll(page, 5800, 1800);
  await page.waitForTimeout(1200);

  // 9. Scroll through family day timeline
  await slowScroll(page, 6800, 2000);
  await page.waitForTimeout(1200);

  // 10. Loyalty
  await slowScroll(page, 7800, 1800);
  await page.waitForTimeout(1000);

  // 11. Testimonials
  await slowScroll(page, 8700, 1800);
  // Cursor spotlight here too
  for (let i = 0; i < 8; i++) {
    await page.mouse.move(300 + i * 120, 600);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(800);

  // 12. Reservation CTA — hover the magnetic button
  await slowScroll(page, 9700, 2000);
  await page.waitForTimeout(800);
  const cta = await page.$('a[href*="/reservation"]');
  if (cta) {
    const box = await cta.boundingBox();
    if (box) {
      // Move close but not on it — see magnetic pull
      await page.mouse.move(box.x + box.width / 2 - 60, box.y + box.height / 2);
      await page.waitForTimeout(600);
      await page.mouse.move(box.x + box.width / 2 - 30, box.y + box.height / 2);
      await page.waitForTimeout(600);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(800);
      // Pull away
      await page.mouse.move(200, 300);
      await page.waitForTimeout(800);
    }
  }

  // 13. Footer
  await slowScroll(page, 11000, 1500);
  await page.waitForTimeout(1500);

  // 14. Scroll back to top to show chapter rail
  await slowScroll(page, 0, 1800);
  await page.waitForTimeout(1500);
});

await browser.close();
console.log("\nDone.");
