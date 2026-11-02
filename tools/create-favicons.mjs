// Run after changing the logo: node tools/create-favicons.mjs
// Renders the approved Night Signal still into favicons, app icons and the structured-data logo.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const icon = await fs.readFile(path.join(root, 'tools/assets/idweb-night-signal.png'));

const render = (size) => sharp(icon).resize(size, size).ensureAlpha().png().toBuffer();
const palette = (size) => sharp(icon).resize(size, size)
  .png({ palette: true, colours: 256, effort: 10 }).toBuffer();

const outputs = [
  ['public/favicon-16x16.png', await palette(16)],
  ['public/favicon-32x32.png', await palette(32)],
  ['public/apple-touch-icon.png', await palette(180)],
  ['public/icons/icon-192x192.png', await palette(192)],
  ['public/icons/icon-512x512.png', await palette(512)],
  ['public/images/idweb-logo.png', await palette(512)],
];

// ICO directory entries reference PNG images, supported by modern browsers.
const sizes = [16, 32, 48];
// Next.js's ICO decoder requires RGBA PNG payloads.
const images = await Promise.all(sizes.map(render));
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
outputs.push(['src/app/favicon.ico', Buffer.concat([header, ...images])]);

for (const [file, bytes] of outputs) {
  const target = path.join(root, file);
  await fs.writeFile(target + '.tmp', bytes);
  await fs.rename(target + '.tmp', target);
  console.log(file);
}
