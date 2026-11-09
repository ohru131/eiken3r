import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Split a 2x2 grid image into 4 card images
 * @param {string} inputPath Path to 2x2 grid image
 * @param {string[]} cardIds Array of 4 card IDs [topLeft, topRight, bottomLeft, bottomRight]
 */
export async function split2x2(inputPath, cardIds, outputDir = 'public/images/cards') {
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

  // 4 regions: [x, y, w, h]
  const regions = [
    { left: 0, top: 0, width: halfW, height: halfH },         // Top-Left
    { left: halfW, top: 0, width: width - halfW, height: halfH }, // Top-Right
    { left: 0, top: halfH, width: halfW, height: height - halfH }, // Bottom-Left
    { left: halfW, top: halfH, width: width - halfW, height: height - halfH }, // Bottom-Right
  ];

  for (let i = 0; i < 4; i++) {
    const cardId = cardIds[i];
    if (!cardId) continue;
    const region = regions[i];
    const outPath = path.join(outputDir, `${cardId}.png`);

    await sharp(inputPath)
      .extract(region)
      .toFormat('png')
      .toFile(outPath);

    console.log(`Saved ${outPath} (${region.width}x${region.height})`);
  }
}

// CLI usage: node split_grid.js <imagePath> <id1> <id2> <id3> <id4>
if (process.argv[1] && process.argv[1].endsWith('split_grid.js')) {
  const args = process.argv.slice(2);
  if (args.length >= 5) {
    const [img, id1, id2, id3, id4] = args;
    split2x2(img, [id1, id2, id3, id4]).catch(console.error);
  }
}

