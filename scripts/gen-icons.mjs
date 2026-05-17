#!/usr/bin/env node
/**
 * Generate minimal placeholder PNG icons (forest background, gold star).
 * Uses pure-JS PNG encoding so no native deps are required.
 *
 * Replace with real artwork before production.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICON_DIR = resolve(__dirname, "..", "public", "icons");
mkdirSync(ICON_DIR, { recursive: true });

const FOREST = [0x0a, 0x1f, 0x0e];
const GOLD = [0xb0, 0x8d, 0x3e];
const GOLD_LIGHT = [0xdf, 0xc0, 0x57];

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

function isInStar(x, y, size, maskable = false) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * (maskable ? 0.32 : 0.42);
  const dx = x - cx;
  const dy = y - cy;
  const angle = Math.atan2(dy, dx);
  const dist = Math.sqrt(dx * dx + dy * dy);
  const points = 5;
  const inner = r * 0.45;
  const seg = (angle + Math.PI) / ((2 * Math.PI) / (points * 2));
  const segMod = seg % 1;
  const rAt =
    Math.floor(seg) % 2 === 0
      ? inner + (r - inner) * segMod
      : r - (r - inner) * segMod;
  return dist <= rAt;
}

function makePng(size, maskable = false) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(size * 3 + 1);
    row[0] = 0;
    for (let x = 0; x < size; x++) {
      const cx = size / 2;
      const cy = size / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (size / 2);
      let r, g, b;
      if (isInStar(x, y, size, maskable)) {
        const t = Math.min(1, dist);
        r = GOLD_LIGHT[0] * (1 - t) + GOLD[0] * t;
        g = GOLD_LIGHT[1] * (1 - t) + GOLD[1] * t;
        b = GOLD_LIGHT[2] * (1 - t) + GOLD[2] * t;
      } else {
        const t = Math.min(1, dist * 0.9);
        r = FOREST[0] * (1 - t * 0.3);
        g = FOREST[1] * (1 - t * 0.3) + 8 * t;
        b = FOREST[2] * (1 - t * 0.3);
      }
      row[1 + x * 3] = Math.round(r);
      row[2 + x * 3] = Math.round(g);
      row[3 + x * 3] = Math.round(b);
    }
    rows.push(row);
  }
  const raw = Buffer.concat(rows);
  const idat = deflateSync(raw, { level: 9 });
  const png = Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
  return png;
}

const sizes = [192, 256, 384, 512];
for (const s of sizes) {
  const file = resolve(ICON_DIR, `icon-${s}.png`);
  writeFileSync(file, makePng(s, false));
  console.log("wrote", file);
}
const maskable = resolve(ICON_DIR, "maskable-512.png");
writeFileSync(maskable, makePng(512, true));
console.log("wrote", maskable);
