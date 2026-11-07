/* Projektbilder: skärmdumpar av projektens startsidor.
 *
 * Läser varje PNG i assets-source/projects/ och skriver webp-varianter till
 * public/assets/projects/<namn>-<bredd>.webp. Körs manuellt
 * (`npm run optimize:projects`), ingår INTE i build.
 *
 * Källbilderna publiceras aldrig (LARDOMAR.md 2026-10-02). Grindarna på
 * källornas mått körs före all skrivning. Allt skrivs sedan först till en
 * temporärkatalog, kontrolleras där och flyttas i ett steg - fallerar en
 * kontroll raderas temporärkatalogen och målkatalogen är orörd
 * (LARDOMAR.md 2026-10-02).
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

/* Bildytan i kortet är 4:3. Beskärningen och skälet till den står i
 * ARKITEKTUR.md, "M4 - Projektbilden och kortet": är källan bredare än 4:3 tas
 * full höjd från vänster kant, är den högre tas full bredd från överkanten.
 * Skärmdumpar av startsidor har sin identitet uppe till vänster. */
const RATIO = 4 / 3;

const SIZE_LIMIT_KB = 150;
const WEBP_OPTIONS = { quality: 74 };

class GateError extends Error {}

function fail(message) {
  throw new GateError(message);
}

/* Fönstret som tas ur källan: alltid förankrat i övre vänstra hörnet. */
function cropWindow(width, height) {
  if (width / height > RATIO) {
    return { left: 0, top: 0, width: Math.round(height * RATIO), height };
  }
  return { left: 0, top: 0, width, height: Math.round(width / RATIO) };
}

let tmp = null;

try {
  const sources = (await readdir(SOURCE_DIR)).filter((f) => extname(f).toLowerCase() === '.png');
  if (sources.length === 0) fail('inga PNG-filer i ' + SOURCE_DIR);

  /* Grindarna på källornas mått, för ALLA källor, innan något skrivs. Ingen
   * uppskalning: den största bredden får inte överstiga den beskurna. */
  const largest = Math.max(...WIDTHS);
  const jobs = [];

  for (const file of sources) {
    const name = basename(file, extname(file));
    const input = join(SOURCE_DIR, file);
    const meta = await sharp(input).metadata();
    const crop = cropWindow(meta.width, meta.height);

    console.log(`UPPLYSNING: ${file} ${meta.width} x ${meta.height}, beskärning ${crop.width} x ${crop.height} från vänster överkant`);
    if (crop.width < largest) {
      console.log(`GRIND: ${name}: beskuren bredd ${crop.width} px är mindre än ${largest} px`);
      fail(`${name}: beskuren bredd ${crop.width} px är mindre än ${largest} px`);
    }

    jobs.push({ name, input, crop });
  }

  tmp = await mkdtemp(join(tmpdir(), 'project-images-'));
  const produced = [];

  for (const { name, input, crop } of jobs) {
    for (const width of WIDTHS) {
      const target = join(tmp, `${name}-${width}.webp`);
      await sharp(input)
        .extract(crop)
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
} catch (error) {
  console.error('FEL: ' + (error instanceof GateError ? error.message : error.stack));
  process.exitCode = 1;
} finally {
  if (tmp !== null) await rm(tmp, { recursive: true, force: true });
}
