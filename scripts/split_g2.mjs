import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Automatically detects border lines of a 2x2 grid (4:3 aspect ratio)
 * and crops the 3 panels (top-left, top-right, bottom-left) to 1200x900 PNGs.
 */
export async function detectGrid(imagePath) {
  const img = sharp(imagePath);
  const meta = await img.metadata();
  const { width: w, height: h } = meta;
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });

  // Outer left border (scan x: 0..120)
  let leftBorder = 0;
  for (let x = 0; x < 120; x++) {
    let dark = 0;
    for (let y = 100; y < h - 100; y++) {
      const idx = (y * w + x) * 3;
      if (data[idx] < 40 && data[idx+1] < 40 && data[idx+2] < 40) dark++;
    }
    if (dark > (h - 200) * 0.75) { leftBorder = x; break; }
  }

  // Outer right border (scan x: w-1..w-120)
  let rightBorder = w - 1;
  for (let x = w - 1; x > w - 120; x--) {
    let dark = 0;
    for (let y = 100; y < h - 100; y++) {
      const idx = (y * w + x) * 3;
      if (data[idx] < 40 && data[idx+1] < 40 && data[idx+2] < 40) dark++;
    }
    if (dark > (h - 200) * 0.75) { rightBorder = x; break; }
  }

  // Outer top border (scan y: 0..120)
  let topBorder = 0;
  for (let y = 0; y < 120; y++) {
    let dark = 0;
    for (let x = 100; x < w - 100; x++) {
      const idx = (y * w + x) * 3;
      if (data[idx] < 40 && data[idx+1] < 40 && data[idx+2] < 40) dark++;
    }
    if (dark > (w - 200) * 0.75) { topBorder = y; break; }
  }

  // Outer bottom border (scan y: h-1..h-120)
  let bottomBorder = h - 1;
  for (let y = h - 1; y > h - 120; y--) {
    let dark = 0;
    for (let x = 100; x < w - 100; x++) {
      const idx = (y * w + x) * 3;
      if (data[idx] < 40 && data[idx+1] < 40 && data[idx+2] < 40) dark++;
    }
    if (dark > (w - 200) * 0.75) { bottomBorder = y; break; }
  }

  // Center vertical divider (scan x: 0.42*w .. 0.58*w)
  let midX = Math.round(w / 2);
  let minColSum = Infinity;
  for (let x = Math.round(w * 0.42); x <= Math.round(w * 0.58); x++) {
    let sum = 0;
    for (let y = topBorder + 20; y < bottomBorder - 20; y++) {
      const idx = (y * w + x) * 3;
      sum += data[idx] + data[idx+1] + data[idx+2];
    }
    if (sum < minColSum) { minColSum = sum; midX = x; }
  }

  // Center horizontal divider (scan y: 0.42*h .. 0.58*h)
  let midY = Math.round(h / 2);
  let minRowSum = Infinity;
  for (let y = Math.round(h * 0.42); y <= Math.round(h * 0.58); y++) {
    let sum = 0;
    for (let x = leftBorder + 20; x < rightBorder - 20; x++) {
      const idx = (y * w + x) * 3;
      sum += data[idx] + data[idx+1] + data[idx+2];
    }
    if (sum < minRowSum) { minRowSum = sum; midY = y; }
  }

  return { leftBorder, rightBorder, topBorder, bottomBorder, midX, midY, width: w, height: h };
}

export async function splitCard2x2(imagePath, cardId, outputDir = 'public/images/g2') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const { leftBorder, rightBorder, topBorder, bottomBorder, midX, midY } = await detectGrid(imagePath);
  console.log(`Grid detection for ${cardId}:`, { leftBorder, rightBorder, topBorder, bottomBorder, midX, midY });

  // Safety fallbacks if borders weren't found
  const l = leftBorder > 0 ? leftBorder : 50;
  const r = rightBorder < 1200 ? rightBorder : 1150;
  const t = topBorder > 0 ? topBorder : 45;
  const b = bottomBorder < 900 ? bottomBorder : 850;
  const mx = midX > l && midX < r ? midX : Math.round((l + r) / 2);
  const my = midY > t && midY < b ? midY : Math.round((t + b) / 2);

  // Panel 1: Top-Left
  await sharp(imagePath)
    .extract({ left: l, top: t, width: mx - l, height: my - t })
    .resize(1200, 900, { fit: 'cover' })
    .toFile(path.join(outputDir, `${cardId}-1.png`));

  // Panel 2: Top-Right
  await sharp(imagePath)
    .extract({ left: mx, top: t, width: r - mx, height: my - t })
    .resize(1200, 900, { fit: 'cover' })
    .toFile(path.join(outputDir, `${cardId}-2.png`));

  // Panel 3: Bottom-Left
  await sharp(imagePath)
    .extract({ left: l, top: my, width: mx - l, height: b - my })
    .resize(1200, 900, { fit: 'cover' })
    .toFile(path.join(outputDir, `${cardId}-3.png`));

  console.log(`Saved 3 panels for ${cardId}`);
}

// CLI usage: node scripts/split_g2.mjs <imagePath> <cardId>
if (process.argv[1] && process.argv[1].includes('split_g2.mjs')) {
  const [imagePath, cardId] = process.argv.slice(2);
  if (imagePath && cardId) {
    splitCard2x2(imagePath, cardId).catch(console.error);
  }
}

