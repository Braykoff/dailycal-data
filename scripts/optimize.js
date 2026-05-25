import sharp from "sharp";
import { basename, extname, dirname, join } from "node:path";

/**
 * Optimizes an images size so that the size of this GitHub repository doesn't get out of hand.
 * @param {*} input The path to the image to format. Must be png or jpg/jpeg.
 * @param {*} targetWidth The max width of the optimized image (default 960, 1.5 times the max thumbnail size in an article in DefaultTemplate).
 * @param {*} avifQuality (Default 62).
 * @param {*} avifEffort 0-9, higher = slower but smaller (default 9).
 */
async function optimizeImage(input, targetWidth = 960, avifQuality = 62, avifEffort = 9) {
  // Check input image
  const ext = extname(input).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    console.error(`Unsupported format "${ext}". Provide a .jpg or .png file.`);
    process.exit(1);
  }

  const dir = dirname(input);
  const name = basename(input, extname(input));
  const output = join(dir, `${name}.avif`);

  const image = sharp(input, { failOn: "none" });
  const meta = await image.metadata();

  const needsResize = meta.width && meta.width > targetWidth;

  // sharp strips all metadata (EXIF, IPTC, XMP, ICC) by default — GPS, timestamps,
  // camera info, etc. are all removed. .rotate() auto-orients pixels from EXIF first.
  const pipeline = image
    .rotate()
    .resize(needsResize ? { width: targetWidth, withoutEnlargement: true } : undefined)
    .avif({
      quality: avifQuality,
      effort: avifEffort,
      chromaSubsampling: "4:2:0", // halves chroma resolution — imperceptible on photos
    });

  // Run
  const { size: outSize } = await pipeline.toFile(output);
  const inSize = meta.size ?? 0;
  const pct = inSize ? ((1 - outSize / inSize) * 100).toFixed(1) : "?";

  console.log(`  in:  ${input} (${fmt(inSize)}, ${meta.width}x${meta.height})`);
  console.log(
    `  out: ${output} (${fmt(outSize)}, ${needsResize ? targetWidth : meta.width}px wide)`,
  );
  console.log(`  saved ${pct}%`);
}

/**
 * Formats a number of bytes into a readable string.
 * @param {*} bytes The number of bytes.
 * @returns The formatted string.
 */
function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

// Run
const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run optimize <image.(jpg|png)>");
  process.exit(1);
}

await optimizeImage(input);
