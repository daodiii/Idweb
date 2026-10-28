// Run after changing the logo: node tools/create-favicons.mjs
// Renders the approved «Halvmåne» logo (tools/assets/*.svg) into the favicons, the app icons and the logo that
// structured data points to. Small sizes use the heavier favicon cut; app icons are full-bleed squares (iOS and Android
// round them themselves).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFile(path.join(root, 'tools/assets', file), 'utf8');
const [icon, favicon] = await Promise.all([read('idweb-icon.svg'), read('idweb-favicon.svg')]);
const square = (svg) => svg.replace(/(<rect width="100" height="100") rx="\d+"/, '$1');

// density is high enough that every size is rendered from vectors, not scaled up from a small bitmap
const render = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();
const palette = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size)
  .png({ palette: true, colours: 256, effort: 10 }).toBuffer();

const outputs = [
  ['public/favicon-16x16.png', await palette(favicon, 16)],
  ['public/favicon-32x32.png', await palette(favicon, 32)],
  ['public/apple-touch-icon.png', await palette(square(icon), 180)],
  ['public/icons/icon-192x192.png', await palette(square(icon), 192)],
  ['public/icons/icon-512x512.png', await palette(square(icon), 512)],
  ['public/images/idweb-logo.png', await palette(square(icon), 512)],
];

// ICO directory entries reference PNG images, supported by modern browsers.
const sizes = [16, 32, 48];
// Next.js's ICO decoder requires RGBA PNG payloads.
const images = await Promise.all(sizes.map((size) => render(favicon, size)));
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
