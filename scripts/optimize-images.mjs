/**
 * Engangsskript: genererar heros svartvita bild, loggan och ikonerna.
 *
 *   npm run optimize:images
 *
 * Kors manuellt. Ingar INTE i `npm run build`.
 *
 * KALLBILDERNA ligger i `assets-source/`, UTANFOR public/. De LASES bara och
 * skrivs aldrig over. public/ ar Vites katalog for filer som kopieras rakt ut
 * i leveransen, sa en kallbild dar hade publicerats utan att nagon kod
 * refererade den.
 *
 * Allt genererat hamnar i `public/assets/` och SKA publiceras.
 *
 * INGENTING SKRIVS TILL DISK INNAN SAMTLIGA GRINDAR PASSERAT. Varje artefakt
 * kodas till en buffert, alla kontroller kors pa bufferten, och forst darefter
 * skrivs filerna i ett svep langst ner. "AVBRYTER" betyder darmed att
 * ingenting andrades.
 *
 * GRATONEN BAKAS IN i heros filer med sharp grayscale(). Ingen CSS-filter
 * behovs, och grinden nedan bevisar att varje pixel ar neutral. Skalet star i
 * ARKITEKTUR.md, M10c.
 *
 * OM UTSKRIFTERNA: varje rad som visar ett uppmatt varde intill ett forvantat
 * ar markt antingen `GRIND:` (foljs av ett fail() om den inte haller) eller
 * `UPPLYSNING:` (foljs ALDRIG av ett fail, och visar ingen grans som vardet
 * inte haller). Utskrift och kontroll ser annars likadana ut i detta skript,
 * och en upplysning som las som en grind skulle stoppa korningen pa KORREKT
 * utdata.
 */

import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_IMAGE_WIDTHS } from '../src/data/profile.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* Kallbilderna. Utanfor public/, publiceras aldrig, skrivs aldrig over. */
const ASSETS_SOURCE_DIR = resolve(ROOT, 'assets-source');
const HERO_SOURCE = resolve(ASSETS_SOURCE_DIR, 'hero-portrait.jpg');
const LOGO_SOURCE = resolve(ASSETS_SOURCE_DIR, 'jq-logo-light.png');

/** Alla kanda kallor. Varje utdatasokvag provas mot HELA listan. */
const SOURCES = [HERO_SOURCE, LOGO_SOURCE];

const OUT_DIR = resolve(ROOT, 'public/assets/hero');

/** Forvantade matt efter .rotate(). Avvikelse = avbryt. */
const EXPECTED_WIDTH = 1672;
const EXPECTED_HEIGHT = 941;

/** Maxstorlek i kB per bredd, enligt ARKITEKTUR.md, M10c. */
const HERO_SIZE_LIMIT_KB = { 960: 60, 1440: 110, 1672: 140 };

/**
 * Gransen for "neutral pixel" i avkodad RGB: storsta skillnaden mellan tva
 * kanaler. Den ar inte noll eftersom webp lagrar fargen i YUV, och
 * avrundningen tillbaka till RGB kan flytta en kanal nagot steg.
 */
const GREY_MAX_CHANNEL_DELTA = 2;

const WEBP_OPTIONS = { quality: 72 };

function fail(message) {
  console.error('\nAVBRYTER: ' + message + '\n');
  process.exit(1);
}

const kB = (bytes) => bytes / 1024;

/**
 * SKYDDSRACKET, som EN funktion som provar varje utdatasokvag mot ALLA kanda
 * kallor.
 *
 * Tva saker provas:
 *   1. Sokvagen far inte vara nagon av kallorna (originalet skrivs aldrig over).
 *   2. Sokvagen far inte ligga UNDER assets-source/. Katalogen ar kallornas och
 *      publiceras aldrig; en artefakt dar hade varit osynlig for leveransen och
 *      hade dessutom kunnat kollidera med en framtida kallbild.
 *
 * Galler bade filer och kataloger.
 */
function assertSafeOutput(target) {
  const abs = resolve(target);

  for (const source of SOURCES) {
    if (abs === resolve(source)) {
      fail('utdatasokvagen ar samma som ett original: ' + abs);
    }
  }

  if (abs === ASSETS_SOURCE_DIR || abs.startsWith(ASSETS_SOURCE_DIR + sep)) {
    fail(
      'utdatasokvagen hamnar under assets-source/ - dar bor kallbilderna och\n' +
        '  ingenting publiceras.\n' +
        '  utdata     : ' + abs + '\n' +
        '  kallkatalog: ' + ASSETS_SOURCE_DIR,
    );
  }

  return abs;
}

assertSafeOutput(OUT_DIR);

/**
 * Kon av artefakter som ska skrivas. Fylls under korningen, toms forst langst
 * ner - efter att SAMTLIGA grindar passerat. Sa lange nagon grind kan fallera
 * ligger ingenting pa disk.
 */
const pendingWrites = [];

/** Lagger en buffert i skrivkon. Skyddsracket provas har, inte vid skrivningen. */
function queueWrite(target, buffer) {
  pendingWrites.push({ target: assertSafeOutput(target), buffer });
}

/**
 * Laser en kallbilds stat och avbryter om den inte finns. EN funktion, inte ett
 * meddelande skrivet en gang per kalla - samma skal som assertSafeOutput().
 */
async function readSourceStat(path) {
  const info = await stat(path).catch(() => null);
  if (!info) {
    fail(
      'hittar inte kallbilden: ' + path + '\n' +
        '  Kallbilderna bor i assets-source/, utanfor public/. Ligger de kvar i\n' +
        '  public/assets/ ska de flyttas, inte kopieras tillbaka.',
    );
  }
  return info;
}

/**
 * Kontrollerar att en kalla ar orord: samma storlek och mtime som fore
 * korningen. EN funktion for bada kallorna. Skriver ut sin GRIND-rad och
 * returnerar utfallet; den som anropar faller korningen med sitt eget
 * samlade meddelande, sa att varje fail()-meddelande star en gang.
 */
async function sourceUntouched(path, before, label) {
  const after = await stat(path);
  const untouched = after.size === before.size && after.mtimeMs === before.mtimeMs;
  console.log('  GRIND: ' + label + ' oforandrat : ' + (untouched ? 'ja' : 'NEJ') +
    '  (' + kB(after.size).toFixed(0) + ' kB, ' + after.mtime.toISOString() + ')');
  return untouched;
}

// ===========================================================================
//  HEROS BILD  (M10c, P5 omgang 4)
//
//  `assets-source/hero-portrait.jpg` -> `public/assets/hero/hero-<bredd>.webp`,
//  en fil per bredd i HERO_IMAGE_WIDTHS, svartvit och hel (ingen beskarning).
// ===========================================================================

const heroStat = await readSourceStat(HERO_SOURCE);

console.log('=========================================================');
console.log(' Heros bild -> svartvita webp  (M10c)');
console.log('=========================================================');
console.log('kalla : ' + HERO_SOURCE);
console.log('        ' + kB(heroStat.size).toFixed(0) + ' kB, andrad ' + heroStat.mtime.toISOString());
console.log('utdata: ' + OUT_DIR);

// --- 1. Matten efter .rotate() ---------------------------------------------
// Autorotering efter EXIF sker i kedjan nedan. metadata() rapporterar matten
// FORE rotationen, sa en orientering 5-8 byter bredd och hojd har - annars
// hade grinden jamfort fel axel.
const heroMeta = await sharp(HERO_SOURCE).metadata();
const heroOrientation = heroMeta.orientation ?? 1;
const heroSwapped = heroOrientation >= 5;
const heroWidth = heroSwapped ? heroMeta.height : heroMeta.width;
const heroHeight = heroSwapped ? heroMeta.width : heroMeta.height;
const heroDimsOk = heroWidth === EXPECTED_WIDTH && heroHeight === EXPECTED_HEIGHT;

console.log('');
console.log('--- INDATA ---');
console.log('  format                : ' + heroMeta.format);
console.log('  EXIF-orientering      : ' + heroOrientation);
console.log('  GRIND: matt efter .rotate() : ' + heroWidth + ' x ' + heroHeight +
  '   (ska vara ' + EXPECTED_WIDTH + ' x ' + EXPECTED_HEIGHT + ': ' + (heroDimsOk ? 'ja' : 'NEJ') + ')');

if (!heroDimsOk) {
  fail(
    'ovantade matt pa heros kalla efter .rotate().\n' +
      '  forvantat: ' + EXPECTED_WIDTH + ' x ' + EXPECTED_HEIGHT + '\n' +
      '  faktiskt : ' + heroWidth + ' x ' + heroHeight + '\n' +
      '  Bildformatet star ocksa som width/height i Hero.jsx. Ar kallan bytt ska\n' +
      '  besluten i ARKITEKTUR.md, M10c, ses over forst.',
  );
}

// --- 2. Bredderna ----------------------------------------------------------
const widthsAreIntegers = HERO_IMAGE_WIDTHS.every((w) => Number.isInteger(w) && w > 0);
const widthsAscending = HERO_IMAGE_WIDTHS.every((w, i) => i === 0 || w > HERO_IMAGE_WIDTHS[i - 1]);
const widthsWithinSource = Math.max(...HERO_IMAGE_WIDTHS) <= EXPECTED_WIDTH;
const widthsOk =
  HERO_IMAGE_WIDTHS.length > 0 && widthsAreIntegers && widthsAscending && widthsWithinSource;
console.log('  GRIND: HERO_IMAGE_WIDTHS    : [' + HERO_IMAGE_WIDTHS.join(', ') + ']' +
  '   (heltal, stigande utan dubbletter, storsta <= ' + EXPECTED_WIDTH + ': ' +
  (widthsOk ? 'ja' : 'NEJ') + ')');

if (!widthsOk) {
  fail(
    'HERO_IMAGE_WIDTHS i src/data/profile.js ar inte giltig.\n' +
      '  Bredderna ska vara positiva heltal i stigande ordning utan dubbletter,\n' +
      '  och den storsta far inte overstiga kallans bredd ' + EXPECTED_WIDTH +
      ' (ingen uppskalning).',
  );
}

// --- 3. Koda varje bredd till buffert, och grinda pa bufferten -------------
console.log('');
console.log('--- UTDATAFILER (kodade till buffert, inte skrivna an) ---');
console.log('  GRIND: fil          matt      (hojd ber.)  storlek        tak   max kanalskillnad  utfall');

let heroProblems = 0;
const heroFiles = [];

for (const width of HERO_IMAGE_WIDTHS) {
  const name = 'hero-' + width + '.webp';
  const target = resolve(OUT_DIR, name);

  // Metadata strippas - sharps standard. Ingen withMetadata()-anropning.
  const encoded = await sharp(HERO_SOURCE)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .grayscale()
    .webp(WEBP_OPTIONS)
    .toBuffer({ resolveWithObject: true });

  const info = encoded.info;
  queueWrite(target, encoded.data);

  const expectedHeight = (width * EXPECTED_HEIGHT) / EXPECTED_WIDTH;
  const dimsOk = info.width === width && Math.abs(info.height - expectedHeight) < 1;

  const size = kB(info.size);
  const limit = HERO_SIZE_LIMIT_KB[width];
  const limitOk = limit !== undefined && size <= limit;

  // Avkoda till ra RGB och mat storsta kanalskillnaden over ALLA pixlar.
  const decoded = await sharp(encoded.data)
    .removeAlpha()
    .toColourspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
  const channels = decoded.info.channels;
  let maxDelta = 0;
  for (let i = 0; i < decoded.data.length; i += channels) {
    const r = decoded.data[i];
    const g = channels >= 3 ? decoded.data[i + 1] : r;
    const b = channels >= 3 ? decoded.data[i + 2] : r;
    const d = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    if (d > maxDelta) maxDelta = d;
  }
  const greyOk = maxDelta <= GREY_MAX_CHANNEL_DELTA;

  const ok = dimsOk && limitOk && greyOk;
  if (!ok) heroProblems++;

  heroFiles.push({ name, kb: size });

  console.log(
    '  ' + name.padEnd(17) +
      (info.width + 'x' + info.height).padEnd(10) +
      ('(' + expectedHeight.toFixed(1) + ')').padEnd(10) +
      (size.toFixed(1) + ' kB').padStart(10) +
      ('<= ' + limit + ' kB').padStart(11) + '   ' +
      (maxDelta + ' (<= ' + GREY_MAX_CHANNEL_DELTA + ')').padEnd(19) +
      (ok
        ? 'ok'
        : 'FEL:' + (dimsOk ? '' : ' matt') + (limitOk ? '' : ' storlek') + (greyOk ? '' : ' farg')),
  );
}

console.log('');
console.log('--- KONTROLL ---');
const heroUntouched = await sourceUntouched(HERO_SOURCE, heroStat, 'hero-portrait.jpg');

if (heroProblems > 0 || !heroUntouched) {
  fail('en eller flera kontroller av heros bild slog fel - se ovan.');
}

console.log('');
console.log('Heros bild klar: ' + heroFiles.length +
  ' buffertar i skrivkon (skrivs langst ner, efter ikonens grindar).');

// ===========================================================================
//  LOGGAN OCH IKONERNA  (M20, P14c)
//
//  `assets-source/jq-logo-light.png` -> direkt i `public/assets/`:
//
//    jq-logo-{34,68,102}.png   hela loggan, PNG med alfa, 1x/2x/3x for naven
//                              och footern. Rutan ar opak, ordmarket ar --ink
//                              pa genomskinlig botten.
//    jq-icon-{32,96,192}.png   JQ-rutan ensam, opak och utan luft: favicon och
//                              apple-touch-icon.
//
//  Fargerna lases ur tokens.css och star aldrig skrivna har. Kallan LASES bara
//  och skrivs aldrig over, precis som heros kalla.
//
//  GRINDARNA SAMLAS: S2-S6, L1-L8 och I1-I5 skriver var sin GRIND-rad och
//  laggs i `failedGates` om de inte haller. Korningen fallerar EN gang, fore
//  skrivfasen, med listan over fallna grindar. Da syns varje grind som en
//  injicerad avvikelse faller, inte bara den forsta. S1 fallerar direkt: alla
//  koordinater nedan forutsatter kallans matt.
// ===========================================================================

const LOGO_OUT_DIR = assertSafeOutput(resolve(ROOT, 'public/assets'));

const TOKENS_FILE = resolve(ROOT, 'src/styles/tokens.css');

/** Forvantade matt pa kallan. Avvikelse = avbryt, beskar aldrig blint. */
const LOGO_EXPECTED_WIDTH = 2000;
const LOGO_EXPECTED_HEIGHT = 774;

/** Kallans botten och ordmarkets farg, uppmatta i kallan (M20). */
const LOGO_BG_RGB = { r: 246, g: 244, b: 240 };
const LOGO_TEXT_RGB = { r: 20, g: 20, b: 20 };

/** Raderna dar kallan ar opak, inklusive. Raderna utanfor lases aldrig. */
const LOGO_OPAQUE_ROWS = { top: 1, bottom: 772 };

/**
 * JQ-rutans rena yta i kallans koordinater. Kantringen ar 1 px utanfor den och
 * raknas ut nedan, ingen egen konstant.
 */
const LOGO_SQUARE = { left: 219, top: 220, width: 335, height: 334 };

/** Forsta kolumnen efter mellanrummet mellan ruta och ordmarke. */
const LOGO_GAP_END = 648;

/** Uttaget for loggan: rutans rena yta och hela ordmarket. */
const LOGO_CROP = { left: 219, top: 220, width: 1565, height: 334 };

/** Uttaget for ikonerna: kvadraten inom rutans rena yta. */
const ICON_CROP = { left: 220, top: 220, width: 334, height: 334 };

/** Hur langt sharps standardkarna lanczos3 nar, i utdatapixlar. */
const LANCZOS_REACH = 3;

const LOGO_HEIGHTS = [34, 68, 102];
const LOGO_EXPECTED_WIDTHS = { 34: 159, 68: 319, 102: 478 };
const ICON_SIZES = [32, 96, 192];

/** Tak i kB, nycklade pa hojd respektive sida (M20). */
const LOGO_SIZE_LIMIT_KB = { 34: 6, 68: 14, 102: 24 };
const ICON_SIZE_LIMIT_KB = { 32: 2, 96: 6, 192: 14 };

/** Tolerans per kanal for fargjamforelserna. */
const COLOR_TOLERANCE = 2;

/**
 * Laser `--<name>: #rrggbb;` ur tokens.css. Fargerna har EN kalla: andras
 * --accent ska loggans grindar falla, for da matchar loggan inte sidan.
 *
 * @returns {{ r: number, g: number, b: number }}
 */
function readTokenHex(name) {
  let css;
  try {
    css = readFileSync(TOKENS_FILE, 'utf8');
  } catch (error) {
    fail('tokens.css: kunde inte läsas (' + error.message + ')');
  }
  const match = css.match(new RegExp('--' + name + ':\\s*#([0-9a-fA-F]{6})\\s*;'));
  if (!match) {
    fail('tokens.css: --' + name + ' saknas eller är inte #rrggbb');
  }
  const hex = match[1];
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

/** Luminans pa 8-bitarsvarden, ingen linjarisering. */
function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** true om varje kanal ligger inom tol. */
function nearRgb(actual, expected, tol) {
  return (
    Math.abs(actual.r - expected.r) <= tol &&
    Math.abs(actual.g - expected.g) <= tol &&
    Math.abs(actual.b - expected.b) <= tol
  );
}

/** "r,g,b" for GRIND-raderna. */
function rgbText({ r, g, b }) {
  return r + ',' + g + ',' + b;
}

/** Pixeln (x, y) i en raw-buffert med sharps info. a = 255 nar channels === 3. */
function pixelAt(raw, { width, channels }, x, y) {
  const o = (y * width + x) * channels;
  return {
    r: raw[o],
    g: raw[o + 1],
    b: raw[o + 2],
    a: channels === 4 ? raw[o + 3] : 255,
  };
}

/** Vanligaste RGB bland pixlar i rektangeln med alfa === 255. raw har 3 eller 4 kanaler. */
function modeRgb(raw, { x0, y0, x1, y1 }) {
  const counts = new Map();
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const p = pixelAt(raw.data, raw.info, x, y);
      if (p.a !== 255) continue;
      const key = rgbText(p);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  let best = null;
  let bestCount = 0;
  for (const [key, count] of counts) {
    if (count > bestCount) {
      best = key;
      bestCount = count;
    }
  }
  if (best === null) return null;
  const [r, g, b] = best.split(',').map(Number);
  return { r, g, b };
}

/** Distinkta RGB bland pixlar med alfa > 0 i rektangeln. */
function distinctVisibleRgb(raw, { x0, y0, x1, y1 }) {
  const seen = new Map();
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const p = pixelAt(raw.data, raw.info, x, y);
      if (p.a === 0) continue;
      const key = rgbText(p);
      if (!seen.has(key)) seen.set(key, { r: p.r, g: p.g, b: p.b });
    }
  }
  return [...seen.values()];
}

/** Mått, kanaler, hasAlpha och storlek för en kodad buffert. Skriver GRIND-raderna, returnerar antal fel. */
async function checkPng(name, buffer, { width, height, hasAlpha, limitKb }) {
  const m = await sharp(buffer).metadata();
  const channels = hasAlpha ? 4 : 3;
  const size = kB(buffer.length);

  const dimsOk = m.width === width && m.height === height;
  const alphaOk = m.channels === channels && m.hasAlpha === hasAlpha;
  const sizeOk = size <= limitKb;

  console.log('    GRIND: matt             : ' + m.width + ' x ' + m.height +
    '   (ska vara ' + width + ' x ' + height + ': ' + (dimsOk ? 'ja' : 'NEJ') + ')');
  console.log('    GRIND: kanaler/hasAlpha : ' + m.channels + ' / ' + m.hasAlpha +
    '   (ska vara ' + channels + ' / ' + hasAlpha + ': ' + (alphaOk ? 'ja' : 'NEJ') + ')');
  console.log('    GRIND: storlek          : ' + size.toFixed(2) + ' kB' +
    '   (tak ' + limitKb + ' kB: ' + (sizeOk ? 'ja' : 'NEJ') + ')');

  return (dimsOk ? 0 : 1) + (alphaOk ? 0 : 1) + (sizeOk ? 0 : 1);
}

/** Grindar som inte holl. Korningen fallerar pa listan, fore skrivfasen. */
const failedGates = [];

/** Text for en grinds forsta avvikande pixel. */
const firstText = (first) =>
  first ? ', forsta (' + first.x + ', ' + first.y + ') = ' + rgbText(first.p) : '';

const ACCENT_RGB = readTokenHex('accent');
const INK_RGB = readTokenHex('ink');

console.log('');
console.log('=========================================================');
console.log(' Loggan -> jq-logo-{34,68,102}.png, ikonen -> jq-icon-{32,96,192}.png  (M20)');
console.log('=========================================================');

const logoStat = await readSourceStat(LOGO_SOURCE);

console.log('kalla : ' + LOGO_SOURCE);
console.log('        ' + kB(logoStat.size).toFixed(0) + ' kB, andrad ' + logoStat.mtime.toISOString());
console.log('utdata: ' + LOGO_OUT_DIR);
console.log('UPPLYSNING: --accent ' + rgbText(ACCENT_RGB) + ', --ink ' + rgbText(INK_RGB) + ' (ur tokens.css)');

// --- 1. Kallgrindarna S1-S6, bara i LOGO_OPAQUE_ROWS ----------------------
const logoMeta = await sharp(LOGO_SOURCE).metadata();
const sourceRaw = await sharp(LOGO_SOURCE).raw().toBuffer({ resolveWithObject: true });
const src = sourceRaw.data;
const srcInfo = sourceRaw.info;

console.log('');
console.log('--- KALLGRINDAR ---');
console.log('  UPPLYSNING: format, kanaler, hasAlpha : ' + logoMeta.format + ', ' +
  logoMeta.channels + ', ' + logoMeta.hasAlpha);

/* S1. Allt nedan ar matt i just dessa koordinater. */
const s1Ok = logoMeta.width === LOGO_EXPECTED_WIDTH && logoMeta.height === LOGO_EXPECTED_HEIGHT;
console.log('  GRIND: S1 matt : ' + logoMeta.width + ' x ' + logoMeta.height +
  '   (ska vara ' + LOGO_EXPECTED_WIDTH + ' x ' + LOGO_EXPECTED_HEIGHT + ': ' + (s1Ok ? 'ja' : 'NEJ') + ')');
if (!s1Ok) {
  fail(
    'S1: ovantade matt pa jq-logo-light.png.\n' +
      '  forvantat: ' + LOGO_EXPECTED_WIDTH + ' x ' + LOGO_EXPECTED_HEIGHT + '\n' +
      '  faktiskt : ' + logoMeta.width + ' x ' + logoMeta.height + '\n' +
      '  Ar loggan bytt ska ARKITEKTUR.md, M20, ses over forst.',
  );
}

/* Rutans rena yta och kantringen 1 px utanfor den, inklusive andpunkter. */
const sqX0 = LOGO_SQUARE.left;
const sqY0 = LOGO_SQUARE.top;
const sqX1 = LOGO_SQUARE.left + LOGO_SQUARE.width - 1;
const sqY1 = LOGO_SQUARE.top + LOGO_SQUARE.height - 1;
const ringX0 = sqX0 - 1;
const ringY0 = sqY0 - 1;
const ringX1 = sqX1 + 1;
const ringY1 = sqY1 + 1;
const inSquare = (x, y) => x >= sqX0 && x <= sqX1 && y >= sqY0 && y <= sqY1;
const inRing = (x, y) =>
  x >= ringX0 && x <= ringX1 && y >= ringY0 && y <= ringY1 && !inSquare(x, y);

const cropX1 = LOGO_CROP.left + LOGO_CROP.width - 1;
const cropY1 = LOGO_CROP.top + LOGO_CROP.height - 1;
const inCrop = (x, y) => x >= LOGO_CROP.left && x <= cropX1 && y >= LOGO_CROP.top && y <= cropY1;

/* S2. Uttagen och kantringen ligger i de opaka raderna, och de raderna ar
 * opaka. Transparensformeln forutsatter en opak botten. */
const rowsInside = (top, bottom) =>
  top >= LOGO_OPAQUE_ROWS.top && bottom <= LOGO_OPAQUE_ROWS.bottom;
const s2Rects =
  rowsInside(LOGO_CROP.top, cropY1) &&
  rowsInside(ICON_CROP.top, ICON_CROP.top + ICON_CROP.height - 1) &&
  rowsInside(ringY0, ringY1);
let s2Transparent = 0;
if (srcInfo.channels === 4) {
  for (let y = LOGO_OPAQUE_ROWS.top; y <= LOGO_OPAQUE_ROWS.bottom; y++) {
    for (let x = 0; x < srcInfo.width; x++) {
      if (pixelAt(src, srcInfo, x, y).a !== 255) s2Transparent++;
    }
  }
}
const s2Ok = s2Rects && s2Transparent === 0;
console.log('  GRIND: S2 uttag och kantring inom rad ' + LOGO_OPAQUE_ROWS.top + '-' +
  LOGO_OPAQUE_ROWS.bottom + ' : ' + (s2Rects ? 'ja' : 'NEJ') +
  ', pixlar med alfa < 255 i raderna : ' + s2Transparent +
  '   (ska vara ja och 0: ' + (s2Ok ? 'ja' : 'NEJ') + ')');
if (!s2Ok) failedGates.push('S2');

/* S3. Allt utanfor uttaget och kantringen ar botten: uttaget klipper inte
 * ordmarket. */
let s3Off = 0;
let s3First = null;
for (let y = LOGO_OPAQUE_ROWS.top; y <= LOGO_OPAQUE_ROWS.bottom; y++) {
  for (let x = 0; x < srcInfo.width; x++) {
    if (inCrop(x, y) || inRing(x, y)) continue;
    const p = pixelAt(src, srcInfo, x, y);
    if (!nearRgb(p, LOGO_BG_RGB, COLOR_TOLERANCE)) {
      s3Off++;
      if (!s3First) s3First = { x, y, p };
    }
  }
}
const s3Ok = s3Off === 0;
console.log('  GRIND: S3 pixlar utanfor uttaget och kantringen som inte ar botten : ' + s3Off +
  '   (ska vara 0: ' + (s3Ok ? 'ja' : 'NEJ' + firstText(s3First)) + ')');
if (!s3Ok) failedGates.push('S3');

/* S4. Den rena ytans fyra yttre linjer ar --accent: rutans lage pa pixeln. */
let s4Off = 0;
let s4First = null;
for (let y = sqY0; y <= sqY1; y++) {
  for (let x = sqX0; x <= sqX1; x++) {
    if (y !== sqY0 && y !== sqY1 && x !== sqX0 && x !== sqX1) continue;
    const p = pixelAt(src, srcInfo, x, y);
    if (!nearRgb(p, ACCENT_RGB, COLOR_TOLERANCE)) {
      s4Off++;
      if (!s4First) s4First = { x, y, p };
    }
  }
}
const s4Ok = s4Off === 0;
console.log('  GRIND: S4 pixlar pa rena ytans yttre linjer (x ' + sqX0 + '-' + sqX1 + ', y ' +
  sqY0 + '-' + sqY1 + ') som inte ar --accent : ' + s4Off +
  '   (ska vara 0: ' + (s4Ok ? 'ja' : 'NEJ' + firstText(s4First)) + ')');
if (!s4Ok) failedGates.push('S4');

/* S5. Varje pixel i kantringen ligger pa linjen botten-accent. Med S3 och S4
 * ar kanten da hogst 1 px bred. */
let s5Off = 0;
let s5First = null;
for (let y = ringY0; y <= ringY1; y++) {
  for (let x = ringX0; x <= ringX1; x++) {
    if (!inRing(x, y)) continue;
    const p = pixelAt(src, srcInfo, x, y);
    let c = (LOGO_BG_RGB.b - p.b) / (LOGO_BG_RGB.b - ACCENT_RGB.b);
    if (c < 0) c = 0;
    else if (c > 1) c = 1;
    const mix = {
      r: Math.round(LOGO_BG_RGB.r + c * (ACCENT_RGB.r - LOGO_BG_RGB.r)),
      g: Math.round(LOGO_BG_RGB.g + c * (ACCENT_RGB.g - LOGO_BG_RGB.g)),
      b: Math.round(LOGO_BG_RGB.b + c * (ACCENT_RGB.b - LOGO_BG_RGB.b)),
    };
    if (!nearRgb(p, mix, COLOR_TOLERANCE)) {
      s5Off++;
      if (!s5First) s5First = { x, y, p };
    }
  }
}
const s5Ok = s5Off === 0;
console.log('  GRIND: S5 pixlar i kantringen (x ' + ringX0 + '-' + ringX1 + ', y ' + ringY0 + '-' +
  ringY1 + ') som inte ar en blandning botten-accent : ' + s5Off +
  '   (ska vara 0: ' + (s5Ok ? 'ja' : 'NEJ' + firstText(s5First)) + ')');
if (!s5Ok) failedGates.push('S5');

/* S6. Mellanrummet ar botten: ruta och ordmarke ar atskilda, sa delningen
 * i steg 3 och 5 ar giltig. */
let s6Off = 0;
let s6First = null;
for (let y = sqY0; y <= sqY1; y++) {
  for (let x = ringX1 + 1; x < LOGO_GAP_END; x++) {
    const p = pixelAt(src, srcInfo, x, y);
    if (!nearRgb(p, LOGO_BG_RGB, COLOR_TOLERANCE)) {
      s6Off++;
      if (!s6First) s6First = { x, y, p };
    }
  }
}
const s6Ok = s6Off === 0;
console.log('  GRIND: S6 pixlar i mellanrummet x ' + (ringX1 + 1) + '-' + (LOGO_GAP_END - 1) +
  ', y ' + sqY0 + '-' + sqY1 + ' som inte ar botten : ' + s6Off +
  '   (ska vara 0: ' + (s6Ok ? 'ja' : 'NEJ' + firstText(s6First)) + ')');
if (!s6Ok) failedGates.push('S6');

// --- 2-3. Uttaget och transparensen ---------------------------------------
const LUM_BG = lum(LOGO_BG_RGB.r, LOGO_BG_RGB.g, LOGO_BG_RGB.b);
const LUM_TEXT = lum(LOGO_TEXT_RGB.r, LOGO_TEXT_RGB.g, LOGO_TEXT_RGB.b);

const cropRaw = await sharp(LOGO_SOURCE)
  .extract(LOGO_CROP)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const cropPixels = LOGO_CROP.width * LOGO_CROP.height;
const rgba = Buffer.allocUnsafe(cropPixels * 4);

for (let p = 0; p < cropPixels; p++) {
  const o = p * 4;
  const x = p % LOGO_CROP.width;
  const r = cropRaw.data[o];
  const g = cropRaw.data[o + 1];
  const b = cropRaw.data[o + 2];

  if (x < LOGO_SQUARE.width) {
    /* Rutan: egna RGB, opak. */
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = 255;
  } else {
    /* Ordmarket och rutans hogra kantkolumn: --ink, alfa ur luminansen mellan
     * botten och text. */
    let alpha = (LUM_BG - lum(r, g, b)) / (LUM_BG - LUM_TEXT);
    if (alpha < 0) alpha = 0;
    else if (alpha > 1) alpha = 1;
    rgba[o] = INK_RGB.r;
    rgba[o + 1] = INK_RGB.g;
    rgba[o + 2] = INK_RGB.b;
    rgba[o + 3] = Math.round(alpha * 255);
  }
}

console.log('');
console.log('--- TRANSPARENS ---');
console.log('  UPPLYSNING: LUM_BG ' + LUM_BG.toFixed(2) + ', LUM_TEXT ' + LUM_TEXT.toFixed(2));

// --- 4-6. Loggan per hojd -------------------------------------------------
console.log('');
console.log('--- LOGGAN (kodad till buffert, inte skriven an) ---');

const logoFiles = [];

for (const h of LOGO_HEIGHTS) {
  const w = LOGO_EXPECTED_WIDTHS[h];
  const name = 'jq-logo-' + h + '.png';
  const squareEnd = Math.ceil((LOGO_SQUARE.width * w) / LOGO_CROP.width);
  /* Rutans inre slutar LANCZOS_REACH utdatapixlar fore dess hogra kant:
   * karnans negativa lob vid kanten mot den genomskinliga luckan ar inte ett
   * hal i rutan. */
  const innerEnd = Math.floor((LOGO_SQUARE.width * w) / LOGO_CROP.width - LANCZOS_REACH - 0.5);

  const resized = await sharp(rgba, {
    raw: { width: LOGO_CROP.width, height: LOGO_CROP.height, channels: 4 },
  })
    .resize({ width: w, height: h, fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  /* Steg 5: resize() interpolerar RGB, sa ordmarkets farg aterstalls. Alfa
   * rors inte, rutans pixlar rors inte. */
  for (let y = 0; y < resized.info.height; y++) {
    for (let x = squareEnd; x < resized.info.width; x++) {
      const o = (y * resized.info.width + x) * 4;
      resized.data[o] = INK_RGB.r;
      resized.data[o + 1] = INK_RGB.g;
      resized.data[o + 2] = INK_RGB.b;
    }
  }

  const encoded = await sharp(resized.data, {
    raw: { width: resized.info.width, height: resized.info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  queueWrite(resolve(LOGO_OUT_DIR, name), encoded);
  logoFiles.push({ name, kb: kB(encoded.length) });

  console.log('  ' + name);

  /* L1. Bredden ur proportionen ska vara tabellens bredd. */
  const formulaWidth = Math.round((h * LOGO_CROP.width) / LOGO_CROP.height);
  const l1Ok = formulaWidth === w;
  console.log('    GRIND: L1 bredd ur proportionen : ' + formulaWidth +
    '   (ska vara ' + w + ': ' + (l1Ok ? 'ja' : 'NEJ') + ')');
  if (!l1Ok) failedGates.push('L1 ' + name);

  /* L1 matt, L2 och L3. */
  if (
    (await checkPng(name, encoded, {
      width: w,
      height: h,
      hasAlpha: true,
      limitKb: LOGO_SIZE_LIMIT_KB[h],
    })) > 0
  ) {
    failedGates.push('L1-L3 ' + name);
  }

  const out = await sharp(encoded).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const inner = { x0: 1, y0: 1, x1: innerEnd, y1: h - 2 };
  const word = { x0: squareEnd, y0: 0, x1: w - 1, y1: h - 1 };

  /* L4. */
  const innerMode = modeRgb(out, inner);
  const l4Ok = innerMode !== null && nearRgb(innerMode, ACCENT_RGB, COLOR_TOLERANCE);
  console.log('    GRIND: L4 rutans vanligaste RGB (x 1-' + innerEnd + ', y 1-' + (h - 2) + ') : ' +
    (innerMode ? rgbText(innerMode) : 'ingen') +
    '   (ska vara --accent ' + rgbText(ACCENT_RGB) + ' +-' + COLOR_TOLERANCE + ': ' +
    (l4Ok ? 'ja' : 'NEJ') + ')');
  if (!l4Ok) failedGates.push('L4 ' + name);

  /* L5. */
  let innerNotOpaque = 0;
  for (let y = inner.y0; y <= inner.y1; y++) {
    for (let x = inner.x0; x <= inner.x1; x++) {
      if (pixelAt(out.data, out.info, x, y).a !== 255) innerNotOpaque++;
    }
  }
  const l5Ok = innerNotOpaque === 0;
  console.log('    GRIND: L5 rutans pixlar med alfa < 255 (samma rektangel) : ' + innerNotOpaque +
    '   (ska vara 0: ' + (l5Ok ? 'ja' : 'NEJ') + ')');
  if (!l5Ok) failedGates.push('L5 ' + name);

  /* L6. */
  const wordColours = distinctVisibleRgb(out, word);
  const l6Ok = wordColours.length === 1 && nearRgb(wordColours[0], INK_RGB, 0);
  console.log('    GRIND: L6 ordmarkets distinkta RGB (x >= ' + squareEnd + ') : ' +
    wordColours.length + ' st [' + wordColours.slice(0, 4).map(rgbText).join('] [') + ']' +
    '   (ska vara exakt 1 = --ink ' + rgbText(INK_RGB) + ': ' + (l6Ok ? 'ja' : 'NEJ') + ')');
  if (!l6Ok) failedGates.push('L6 ' + name);

  /* L7. Botten ar genomskinlig, och mellanrummet har minst en tom kolumn. */
  const cornerTop = pixelAt(out.data, out.info, w - 1, 0).a;
  const cornerBottom = pixelAt(out.data, out.info, w - 1, h - 1).a;
  const gapLast = Math.floor(((LOGO_GAP_END - LOGO_CROP.left) * w) / LOGO_CROP.width);
  let emptyColumns = 0;
  for (let x = squareEnd; x <= gapLast; x++) {
    let empty = true;
    for (let y = 0; y < h; y++) {
      if (pixelAt(out.data, out.info, x, y).a !== 0) {
        empty = false;
        break;
      }
    }
    if (empty) emptyColumns++;
  }
  const l7Ok = cornerTop === 0 && cornerBottom === 0 && emptyColumns >= 1;
  console.log('    GRIND: L7 alfa i (' + (w - 1) + ', 0) och (' + (w - 1) + ', ' + (h - 1) + ') : ' +
    cornerTop + ' och ' + cornerBottom + ', tomma kolumner x ' + squareEnd + '-' + gapLast + ' : ' +
    emptyColumns + '   (ska vara 0, 0 och minst 1: ' + (l7Ok ? 'ja' : 'NEJ') + ')');
  if (!l7Ok) failedGates.push('L7 ' + name);

  /* L8. Mjuk kant, inte trappad. */
  let soft = 0;
  for (let y = word.y0; y <= word.y1; y++) {
    for (let x = word.x0; x <= word.x1; x++) {
      const a = pixelAt(out.data, out.info, x, y).a;
      if (a > 0 && a < 255) soft++;
    }
  }
  const l8Ok = soft > 0;
  console.log('    GRIND: L8 ordmarkets mellanlagen : ' + soft +
    '   (ska vara > 0: ' + (l8Ok ? 'ja' : 'NEJ') + ')');
  if (!l8Ok) failedGates.push('L8 ' + name);
}

// --- Ikonerna: JQ-rutan rakt ur kallan, opak, ingen utfyllnad -------------
console.log('');
console.log('--- IKONERNA (kodade till buffert, inte skrivna an) ---');

const iconFiles = [];

for (const n of ICON_SIZES) {
  const name = 'jq-icon-' + n + '.png';

  const encoded = await sharp(LOGO_SOURCE)
    .extract(ICON_CROP)
    .removeAlpha()
    .resize(n, n)
    .png({ compressionLevel: 9 })
    .toBuffer();

  queueWrite(resolve(LOGO_OUT_DIR, name), encoded);
  iconFiles.push({ name, kb: kB(encoded.length) });

  console.log('  ' + name);

  /* I1, I2, I3. */
  if (
    (await checkPng(name, encoded, {
      width: n,
      height: n,
      hasAlpha: false,
      limitKb: ICON_SIZE_LIMIT_KB[n],
    })) > 0
  ) {
    failedGates.push('I1-I3 ' + name);
  }

  const out = await sharp(encoded).raw().toBuffer({ resolveWithObject: true });

  /* I4. Rutan gar ut i alla fyra kanterna: ingen luft och ingen blek kant. */
  const corners = [[0, 0], [n - 1, 0], [0, n - 1], [n - 1, n - 1]].map(([x, y]) => ({
    x,
    y,
    p: pixelAt(out.data, out.info, x, y),
  }));
  const i4Ok = corners.every((c) => nearRgb(c.p, ACCENT_RGB, COLOR_TOLERANCE));
  console.log('    GRIND: I4 hornen : ' +
    corners.map((c) => '(' + c.x + ', ' + c.y + ') ' + rgbText(c.p)).join(', ') +
    '   (ska vara --accent ' + rgbText(ACCENT_RGB) + ' +-' + COLOR_TOLERANCE + ': ' +
    (i4Ok ? 'ja' : 'NEJ') + ')');
  if (!i4Ok) failedGates.push('I4 ' + name);

  /* I5. */
  const mode = modeRgb(out, { x0: 0, y0: 0, x1: n - 1, y1: n - 1 });
  const i5Ok = mode !== null && nearRgb(mode, ACCENT_RGB, COLOR_TOLERANCE);
  console.log('    GRIND: I5 vanligaste RGB : ' + (mode ? rgbText(mode) : 'ingen') +
    '   (ska vara --accent ' + rgbText(ACCENT_RGB) + ' +-' + COLOR_TOLERANCE + ': ' +
    (i5Ok ? 'ja' : 'NEJ') + ')');
  if (!i5Ok) failedGates.push('I5 ' + name);
}

if (failedGates.length > 0) {
  fail('foljande grindar for loggan eller ikonerna slog fel - se ovan:\n  ' +
    failedGates.join('\n  '));
}

// --- Kallorna orda, sist fore skrivfasen ----------------------------------
console.log('');
console.log('--- KALLORNA ---');
const heroStillUntouched = await sourceUntouched(HERO_SOURCE, heroStat, 'hero-portrait.jpg');
const logoUntouched = await sourceUntouched(LOGO_SOURCE, logoStat, 'jq-logo-light.png');

if (!heroStillUntouched || !logoUntouched) {
  fail('en kallbild andrades under korningen - se ovan.');
}

// ===========================================================================
//  SKRIVFASEN. Forst HAR tar nagot pa disk.
//
//  Varje grind ovan har passerat. Fallerar nagon av dem har process.exit(1)
//  redan skett och malkatalogen ar ororad - det ar vad "AVBRYTER" ska betyda.
//
//  AVVIKELSE FRAN EN BINDANDE REGEL, redovisad enligt LARDOMAR.md:
//  LARDOMAR.md foreskriver "skriv till en temporarkatalog, kontrollera dar,
//  flytta sedan". Har halls artefakterna i stallet i MINNET fram till denna
//  punkt. Invarianten regeln skyddar - "fallerar en kontroll ar malkatalogen
//  ororad" - uppfylls starkare: det finns ingen temporarkatalog som kan bli
//  kvar, och ingen skrivning alls fore den sista grinden. Artefakterna ar
//  sma nog att rymmas i minnet utan vidare.
// ===========================================================================
console.log('');
console.log('--- SKRIVFASEN (alla grindar passerade) ---');

await mkdir(OUT_DIR, { recursive: true });

for (const write of pendingWrites) {
  await writeFile(write.target, write.buffer);
}

console.log('  filer skrivna            : ' + pendingWrites.length);
console.log('  public/assets/hero/      : ' + (await readdir(OUT_DIR)).sort().join(', '));
console.log('  public/assets/ (PNG)     : ' +
  (await readdir(LOGO_OUT_DIR)).filter((f) => f.endsWith('.png')).sort().join(', '));

console.log('');
console.log('Klart. ' + heroFiles.length + ' hero-filer + ' + logoFiles.length +
  ' logofiler + ' + iconFiles.length + ' ikonfiler.');
