// Run after replacing the approved source artwork: node tools/create-brand-assets.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/images/brand');
await fs.mkdir(output, { recursive: true });

await sharp(path.join(root, 'tools/assets/idweb-night-signal.png'))
  .resize(256, 256).webp({ lossless: true }).toFile(path.join(output, 'idweb-night-signal.webp'));

const { data, info } = await sharp(path.join(root, 'tools/assets/idweb-wordmark.png'))
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
await sharp(data, { raw: info }).webp({ lossless: true }).toFile(path.join(output, 'idweb-wordmark-dark.webp'));

const light = Buffer.from(data);
for (let i = 0; i < light.length; i += 4) {
  if (!light[i + 3]) continue;
  const [red, green, blue] = light.subarray(i, i + 3);
  const isLime = red > green * .6 && blue < green * .5;
  if (isLime) continue;
  const color = green < 110 ? [243, 255, 247] : [131, 229, 185];
  light.set(color, i);
}
await sharp(light, { raw: info }).webp({ lossless: true }).toFile(path.join(output, 'idweb-wordmark-light.webp'));
console.log('Generated the Night Signal still and both wordmark tones.');
