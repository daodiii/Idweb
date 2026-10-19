// Run after replacing the square source: node tools/create-favicons.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'tools/assets/idweb-mark-white-source.png');
const metadata = await sharp(source).metadata();
if (metadata.width !== metadata.height || metadata.width < 512) {
  throw new Error('The favicon source must be square and at least 512 pixels wide.');
}

const png = (size) => sharp(source).resize(size, size).flatten({ background: '#FFFFFF' })
  .png({ palette: true, colours: 256, effort: 10 }).toBuffer();
const outputs = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/apple-touch-icon.png', 180],
  ['public/icons/icon-192x192.png', 192],
  ['public/icons/icon-512x512.png', 512],
];

// ICO directory entries reference PNG images, supported by modern browsers.
const sizes = [16, 32, 48];
// Next.js's ICO decoder requires RGBA PNG payloads, even with an opaque background.
const images = await Promise.all(sizes.map((size) => sharp(source)
  .resize(size, size).flatten({ background: '#FFFFFF' }).ensureAlpha().png().toBuffer()));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((bytes, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(bytes.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});

const files = await Promise.all(outputs.map(async ([file, size]) => [file, await png(size)]));
files.push(['src/app/favicon.ico', Buffer.concat([header, ...images])]);
for (const [file, bytes] of files) {
  const target = path.join(root, file);
  await fs.writeFile(target + '.tmp', bytes);
  await fs.rename(target + '.tmp', target);
  console.log(file);
}
