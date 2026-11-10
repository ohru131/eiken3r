import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Split a 2x2 16:9 grid image into 4 pre2 images (5:3 aspect ratio):
 * [0]: top-left
 * [1]: top-right
 * [2]: bottom-left
 * [3]: bottom-right
 *
 * @param {string} inputPath
 * @param {string[]} ids e.g. ['pre2-03-a', 'pre2-03-b', 'pre2-04-a', 'pre2-04-b']
 * @param {string} outputDir
 */
export async function split2x2(inputPath, ids, outputDir = 'public/images/pre2') {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`File not found: ${inputPath}`);
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error('Could not read image dimensions');
  }

  const halfW = Math.floor(width / 2);
  const halfH = Math.floor(height / 2);

  const regions = [
    { left: 0, top: 0, width: halfW, height: halfH },             // Top-Left
    { left: halfW, top: 0, width: width - halfW, height: halfH }, // Top-Right
    { left: 0, top: halfH, width: halfW, height: height - halfH }, // Bottom-Left
    { left: halfW, top: halfH, width: width - halfW, height: height - halfH }, // Bottom-Right
  ];

  // Custom region overrides for grids with non-50/50 dividers
  const CUSTOM_REGIONS = {
    'pre2-19-a': { region: { left: 16, top: 13, width: 662, height: 361 }, fit: 'cover' },
    'pre2-19-b': { region: { left: 698, top: 13, width: 662, height: 361 }, fit: 'cover' },
    'pre2-20-a': { region: { left: 17, top: 396, width: 770, height: 358 }, fit: 'contain' },
    'pre2-20-b': { region: { left: 809, top: 396, width: 550, height: 358 }, fit: 'cover' },
    'pre2-23-a': { region: { left: 23, top: 20, width: 874, height: 372 }, fit: 'contain' },
    'pre2-23-b': { region: { left: 903, top: 20, width: 450, height: 372 }, fit: 'cover' },
    'pre2-24-a': { region: { left: 23, top: 399, width: 814, height: 349 }, fit: 'contain' },
    'pre2-24-b': { region: { left: 844, top: 399, width: 508, height: 349 }, fit: 'cover' },
  };

  for (let i = 0; i < 4; i++) {
    const id = ids[i];
    if (!id) continue;
    const custom = CUSTOM_REGIONS[id];
    const region = custom ? custom.region : regions[i];
    const fit = custom ? custom.fit : 'cover';
    const outPath = path.join(outputDir, `${id}.png`);

    // In a 16:9 grid, each quadrant is 16:9 (1.78 aspect ratio).
    // Target is 1200x720 (5:3 = 1.67 aspect ratio).
    // Using { fit: 'cover' } crops only a small amount from left and right edges,
    // preserving 100% of vertical height so heads and ground are completely intact!
    await sharp(inputPath)
      .extract(region)
      .resize(1200, 720, { fit, background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .toFormat('png')
      .toFile(outPath);

    console.log(`Saved ${outPath}`);
  }
}

// CLI usage: node scripts/split_pre2.mjs <imagePath> <id1> <id2> <id3> <id4>
if (process.argv[1] && process.argv[1].includes('split_pre2.mjs')) {
  const args = process.argv.slice(2);
  if (args.length >= 5) {
    const [img, id1, id2, id3, id4] = args;
    split2x2(img, [id1, id2, id3, id4]).catch(console.error);
  }
}
