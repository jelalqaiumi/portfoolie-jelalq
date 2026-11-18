/* Delningsbilden: kortet som visas när sidan delas i andra tjänster.
 *
 * Läser porträttet i assets-source/ och skriver en JPEG till den sökväg under
 * public/ som SHARE_IMAGE i scripts/seo.mjs anger. Körs manuellt
 * (`npm run optimize:share-image`), ingår INTE i build. Bilden checkas in.
 * Beslutat i ARKITEKTUR.md: M24 punkt 4.
 *
 * Källbilden publiceras aldrig (LARDOMAR.md 2026-10-02). Bilden skrivs först
 * till en temporärkatalog, kontrolleras där och flyttas sist - fallerar en
 * kontroll raderas temporärkatalogen och målet är orört (LARDOMAR.md
 * 2026-10-02).
 *
 * Beskärningen behåller hela bredden och tar bort det som blir över nederst,
 * så att ansiktet överst står kvar. Svartvit, som heros bild på sidan.
 */

import { mkdtemp, rename, rm, mkdir, stat, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { SHARE_IMAGE } from './seo.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = resolve(ROOT, 'assets-source');
const SOURCE = resolve(SOURCE_DIR, 'hero-portrait.jpg');
const PUBLIC_ASSETS = resolve(ROOT, 'public/assets');
const TARGET = resolve(ROOT, 'public', SHARE_IMAGE.path);

/* Källans förväntade mått efter rotate(). Beskärningen i M24 punkt 4 är
 * beräknad för just dessa; en ny källa ska ge ett nytt beslut, inte en tyst
 * annan beskärning. */
const SOURCE_SIZE = { width: 1672, height: 941 };

const SIZE_LIMIT_KB = 150;
const JPEG_OPTIONS = { quality: 82, mozjpeg: true };

class GateError extends Error {}

function fail(message) {
  throw new GateError(message);
}

/* Sant om path ligger i katalogen dir eller under den. */
function isInside(path, dir) {
  const rel = relative(dir, path);
  return rel === '' || (!rel.startsWith('..') && !rel.startsWith(sep) && !/^[A-Za-z]:/.test(rel));
}

/* Skyddsräcket mot att skriva över en källa: EN funktion som prövar
 * utdatasökvägen mot alla källor (LARDOMAR.md 2026-10-02). */
function assertSafeOutput(target) {
  if (target === SOURCE) fail(`målet ${target} är källbilden`);
  if (isInside(target, SOURCE_DIR)) fail(`målet ${target} ligger under assets-source/`);
  if (!isInside(target, PUBLIC_ASSETS) || target === PUBLIC_ASSETS) fail(`målet ${target} ligger inte under public/assets/`);
}

let tmp = null;

try {
  /* Steg 1. */
  assertSafeOutput(TARGET);

  /* Steg 2. */
  const before = await stat(SOURCE);
  const { info: sourceInfo } = await sharp(SOURCE).rotate().toBuffer({ resolveWithObject: true });
  const sourceOk = sourceInfo.width === SOURCE_SIZE.width && sourceInfo.height === SOURCE_SIZE.height;
  console.log(
    `GRIND: källan ${sourceInfo.width} x ${sourceInfo.height} (väntat ${SOURCE_SIZE.width} x ${SOURCE_SIZE.height}) ${sourceOk ? 'OK' : 'FEL MÅTT'}`,
  );
  if (!sourceOk) {
    fail(`källan är ${sourceInfo.width} x ${sourceInfo.height}, väntat ${SOURCE_SIZE.width} x ${SOURCE_SIZE.height}`);
  }

  /* Steg 3. */
  tmp = await mkdtemp(join(tmpdir(), 'share-image-'));
  const staged = join(tmp, 'share.jpg');
  await sharp(SOURCE)
    .rotate()
    .resize(SHARE_IMAGE.width, SHARE_IMAGE.height, { fit: 'cover', position: 'top' })
    .grayscale()
    .toColourspace('srgb')
    .jpeg(JPEG_OPTIONS)
    .toFile(staged);

  /* Steg 4: grindarna mot filen i temporärkatalogen. */
  const meta = await sharp(staged).metadata();
  const metaOk =
    meta.width === SHARE_IMAGE.width && meta.height === SHARE_IMAGE.height && meta.format === 'jpeg' && meta.channels === 3;
  console.log(
    `GRIND: utdata ${meta.width} x ${meta.height}, ${meta.format}, ${meta.channels} kanaler (väntat ${SHARE_IMAGE.width} x ${SHARE_IMAGE.height}, jpeg, 3 kanaler) ${metaOk ? 'OK' : 'FEL'}`,
  );
  if (!metaOk) {
    fail(`utdata är ${meta.width} x ${meta.height}, ${meta.format}, ${meta.channels} kanaler`);
  }

  const kb = (await stat(staged)).size / 1024;
  console.log(`UPPLYSNING: delningsbilden är ${kb.toFixed(1)} kB`);
  console.log(`GRIND: storlek högst ${SIZE_LIMIT_KB} kB ${kb <= SIZE_LIMIT_KB ? 'OK' : 'FÖR STOR'}`);
  if (kb > SIZE_LIMIT_KB) fail(`delningsbilden överskrider ${SIZE_LIMIT_KB} kB`);

  const after = await stat(SOURCE);
  const sourceUntouched = after.size === before.size && after.mtimeMs === before.mtimeMs;
  console.log(`GRIND: källan orörd (samma storlek och ändringstid) ${sourceUntouched ? 'OK' : 'ÄNDRAD'}`);
  if (!sourceUntouched) fail('källbilden har ändrats under körningen');

  /* Steg 5: först nu rörs målet. rename fungerar inte mellan enheter (tmp kan
   * ligga på en annan disk). */
  await mkdir(dirname(TARGET), { recursive: true });
  await rename(staged, TARGET).catch(() => copyFile(staged, TARGET));
  console.log(`Klart: ${TARGET}`);
} catch (error) {
  console.error('FEL: ' + (error instanceof GateError ? error.message : error.stack));
  process.exitCode = 1;
} finally {
  if (tmp !== null) await rm(tmp, { recursive: true, force: true });
}
