import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Split a 1x3 horizontal image into 3 examiner avatar images
 * @param {string} inputPath Path to image
 * @param {string[]} ids Array of 3 examiner IDs ['smith', 'brown', 'tanaka']
 */
export async function split3Horizontal(inputPath, ids = ['smith', 'brown', 'tanaka'], outputDir = 'public/images/examiners') {
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

  const colWidth = Math.floor(width / 3);

  for (let i = 0; i < 3; i++) {
    const id = ids[i];
    const region = {
      left: i * colWidth,
      top: 0,
      width: (i === 2) ? (width - i * colWidth) : colWidth,
      height: height,
    };
    const outPath = path.join(outputDir, `${id}.png`);

    await sharp(inputPath)
      .extract(region)
      .toFormat('png')
      .toFile(outPath);

    console.log(`Saved ${outPath} (${region.width}x${region.height})`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('split_examiners.js')) {
  const args = process.argv.slice(2);
  if (args.length >= 1) {
    split3Horizontal(args[0]).catch(console.error);
  }
}

