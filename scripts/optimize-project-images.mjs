/* Projektbilder: skärmdumpar av projektens startsidor.
 *
 * Läser varje PNG i assets-source/projects/ och skriver webp-varianter till
 * public/assets/projects/<namn>-<bredd>.webp. Körs manuellt
 * (`npm run optimize:projects`), ingår INTE i build.
 *
 * Källbilderna publiceras aldrig (LARDOMAR.md 2026-10-02). Allt skrivs först
 * till en temporärkatalog, kontrolleras där och flyttas sedan i ett steg -
 * fallerar en kontroll är målkatalogen orörd (LARDOMAR.md 2026-10-02).
 */

import { mkdtemp, readdir, rename, rm, mkdir, stat, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PROJECT_IMAGE_WIDTHS as WIDTHS } from '../src/data/projects.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = resolve(ROOT, 'assets-source/projects');
const OUT_DIR = resolve(ROOT, 'public/assets/projects');

/* Bildytan i kortet är 16:10, samma format som skärmdumpen tas i (1440 x 900). */
const RATIO = 16 / 10;

const SIZE_LIMIT_KB = 150;
const WEBP_OPTIONS = { quality: 74 };

function fail(message) {
  console.error('FEL: ' + message);
  process.exit(1);
}

const sources = (await readdir(SOURCE_DIR)).filter((f) => extname(f).toLowerCase() === '.png');
if (sources.length === 0) fail('inga PNG-filer i ' + SOURCE_DIR);

const tmp = await mkdtemp(join(tmpdir(), 'project-images-'));
const produced = [];

try {
  for (const file of sources) {
    const name = basename(file, extname(file));
    const input = join(SOURCE_DIR, file);
    const meta = await sharp(input).metadata();
    const height = Math.round(meta.width / RATIO);
    if (meta.height < height) fail(`${file}: ${meta.width} x ${meta.height} är lägre än 16:10`);

    for (const width of WIDTHS) {
      const target = join(tmp, `${name}-${width}.webp`);
      await sharp(input)
        .extract({ left: 0, top: 0, width: meta.width, height })
        .resize({ width })
        .webp(WEBP_OPTIONS)
        .toFile(target);

      const kb = (await stat(target)).size / 1024;
      console.log(`GRIND: ${name}-${width}.webp ${kb.toFixed(1)} kB (gräns ${SIZE_LIMIT_KB} kB) ${kb <= SIZE_LIMIT_KB ? 'OK' : 'FÖR STOR'}`);
      if (kb > SIZE_LIMIT_KB) fail(`${name}-${width}.webp överskrider ${SIZE_LIMIT_KB} kB`);
      produced.push(target);
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  for (const file of produced) {
    const dest = join(OUT_DIR, basename(file));
    /* rename fungerar inte mellan enheter (tmp kan ligga på en annan disk). */
    await rename(file, dest).catch(() => copyFile(file, dest));
  }
  console.log(`Klart: ${produced.length} filer i ${OUT_DIR}`);
} finally {
  await rm(tmp, { recursive: true, force: true });
}
