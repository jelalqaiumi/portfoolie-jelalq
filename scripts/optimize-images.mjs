/**
 * Engangsskript: skalar ned och komprimerar profilbilden till webbklara varianter.
 *
 *   npm run optimize:images
 *
 * Kors manuellt. Ingar INTE i `npm run build`.
 *
 * KALLBILDERNA ligger i `assets-source/`, UTANFOR public/. De LASES bara och
 * skrivs aldrig over. Att de lag i `public/` var ett strukturfel: public/ ar
 * Vites katalog for filer som kopieras rakt ut i leveransen, sa originalen
 * publicerades anda - 4,40 MB av ett dist/ pa 4,9 MB, utan att nagon kod
 * refererade dem.
 *
 * Allt genererat hamnar i `public/assets/` och SKA publiceras.
 *
 * INGENTING SKRIVS TILL DISK INNAN SAMTLIGA GRINDAR PASSERAT. Varje artefakt
 * kodas till en buffert, alla kontroller kors pa bufferten, och forst darefter
 * skrivs filerna i ett svep langst ner. "AVBRYTER" betyder darmed att
 * ingenting andrades. Tidigare lag alla grindar EFTER toFile(): en korning som
 * avbrot lamnade kvar elva filer pa disk, och de tajta headerfilerna skrevs
 * ~110 rader fore den kritiska kontrollen av att ingen pixel med alfa > 0
 * finns nedanfor market.
 *
 * Gratonen och den gra tonplattan bakas medvetet INTE in har - de gors i CSS i
 * paket 3, sa att tonen kan justeras efter Leverans 1 utan att nagon bild
 * behover genereras om.
 *
 * OM UTSKRIFTERNA: varje rad som visar ett uppmatt varde intill ett forvantat
 * ar markt antingen `GRIND:` (foljs av ett fail() om den inte haller) eller
 * `UPPLYSNING:` (foljs ALDRIG av ett fail, och visar ingen grans som vardet
 * inte haller). Utskrift och kontroll ser annars likadana ut i detta skript,
 * och en upplysning som las som en grind skulle stoppa korningen pa KORREKT
 * utdata.
 */

import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* Kallbilderna. Utanfor public/, publiceras aldrig, skrivs aldrig over. */
const ASSETS_SOURCE_DIR = resolve(ROOT, 'assets-source');
const SOURCE = resolve(ASSETS_SOURCE_DIR, 'profile.jpg');
const LOGO_SOURCE = resolve(ASSETS_SOURCE_DIR, 'logo.png');

/** Alla kanda kallor. Varje utdatasokvag provas mot HELA listan. */
const SOURCES = [SOURCE, LOGO_SOURCE];

const OUT_DIR = resolve(ROOT, 'public/assets/profile');

/** Forvantade matt efter .rotate(). Avvikelse = avbryt, beskar aldrig blint. */
const EXPECTED_WIDTH = 4688;
const EXPECTED_HEIGHT = 5051;

/**
 * Beskarning till 4:5 staende (3520 / 4400 = 0,8 exakt).
 *
 * ARKITEKTUR.md angav `left: 584, top: 0` som UTGANGSLAGE, uttryckligen raknat
 * pa bildens matt och inte pa en matning av var motivet sitter, med instruktion
 * till byggaren att mata resultatet och justera `left`/`top` om motivet inte ar
 * centrerat eller hjassan skars av.
 *
 * MATNING (paket 2A). Nedskalad gratonad kopia av originalet, morka pixlar
 * (ljushet < 100) mot den ljusgra vaggen:
 *
 *   hjassan, forsta morka raden                        y = 630
 *   har/hjassa  y 600-950   horisontellt masscentrum   x = 2013
 *   ansikte     y 950-1650  horisontellt masscentrum   x = 2023
 *   kavaj       y 2400-3800 horisontellt masscentrum   x = 2061
 *   bildens egen mitt                                  x = 2344
 *
 * Motivet sitter alltsa ca 300 px VANSTER om bildens mitt. Rutan left: 584 ar
 * centrerad pa BILDEN, men inte pa MOTIVET. Uppmatt pa de fardiga 400x500-
 * filerna:
 *
 *   left 584 -> morkt masscentrum 42,9 % av bredden, vanster axel mot kanten
 *               (marginal 0 px) - axeln skars av
 *   left 270 -> morkt masscentrum 50,3 % av bredden, marginal 4 px pa bada
 *               sidor - hela motivet ryms
 *
 * JUSTERAT: left 584 -> 270. Det ar den justering ARKITEKTUR.md ber om.
 *
 * `top: 0` BEHALLS oforandrat. Uppmatt pa resultatet: hjassan hamnar 14,2 % ner
 * i bildrutan (ej avskuren) och ogonen pa uttagets ovre tredjedelslinje.
 */
const CROP = { left: 270, top: 0, width: 3520, height: 4400 };

/** Bredder enligt ARKITEKTUR.md. Hojd = bredd x 1,25 (4:5). */
const WIDTHS = [400, 800, 1200];

/** Maxstorlek i kB enligt ARKITEKTUR.md:s tabell over utdatafiler. */
const SIZE_LIMIT_KB = {
  'profile-400.webp': 25,
  'profile-800.webp': 70,
  'profile-1200.webp': 130,
  'profile-400.jpg': 40,
  'profile-800.jpg': 110,
  'profile-1200.jpg': 190,
};

const WEBP_OPTIONS = { quality: 72 };
const JPEG_OPTIONS = { quality: 78, mozjpeg: true, progressive: true };

function fail(message) {
  console.error('\nAVBRYTER: ' + message + '\n');
  process.exit(1);
}

const kB = (bytes) => bytes / 1024;

/**
 * SKYDDSRACKET, som EN funktion som provar varje utdatasokvag mot ALLA kanda
 * kallor. Det stod tidigare skrivet fyra ganger i tre formuleringar, varav en
 * jamforde mot bara den ena kallan.
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

const sourceStat = await readSourceStat(SOURCE);

console.log('=========================================================');
console.log(' Profilbild -> webbvarianter  (paket 2A)');
console.log('=========================================================');
console.log('kalla : ' + SOURCE);
console.log('        ' + kB(sourceStat.size).toFixed(0) + ' kB, andrad ' + sourceStat.mtime.toISOString());
console.log('utdata: ' + OUT_DIR);

// --- 1. .rotate() FORST, sedan las matten ----------------------------------
// Autorotering efter EXIF maste ske fore beskarningen. Denna bild saknar
// orienteringsflagga, sa anropet ar en no-op har - men det star kvar som
// forsvar: med flagga 6 eller 8 hade matten svangt till 5051 x 4688 och
// beskarningsrutan pekat pa fel del av bilden utan att nagot larmat.
const rotated = sharp(SOURCE).rotate();
const meta = await rotated.metadata();

console.log('');
console.log('--- INDATA ---');
console.log('  format                : ' + meta.format);
console.log('  matt efter .rotate()  : ' + meta.width + ' x ' + meta.height);
console.log('  kanaler               : ' + meta.channels);
console.log('  EXIF-orientering      : ' + (meta.orientation === undefined ? 'ingen flagga (.rotate() = no-op)' : meta.orientation));
console.log('  EXIF i kallan         : ' + (meta.exif ? 'ja (' + meta.exif.length + ' byte)' : 'nej'));

// --- 2. Kontrollera matten, beskar aldrig blint ----------------------------
if (meta.width !== EXPECTED_WIDTH || meta.height !== EXPECTED_HEIGHT) {
  fail(
    'ovantade matt efter .rotate().\n' +
      '  forvantat: ' + EXPECTED_WIDTH + ' x ' + EXPECTED_HEIGHT + '\n' +
      '  faktiskt : ' + meta.width + ' x ' + meta.height + '\n' +
      '  Beskarningskoordinaterna i detta skript ar raknade pa de forvantade\n' +
      '  matten. Mat om motivet och uppdatera CROP i stallet for att kora vidare.',
  );
}

// --- 3. Beskarningen, kontrollerad mot bildens matt ------------------------
const right = CROP.left + CROP.width;
const bottom = CROP.top + CROP.height;
const ratio = CROP.width / CROP.height;

console.log('');
console.log('--- BERAKNAD BESKARNING (4:5 staende) ---');
console.log('  extract               : left=' + CROP.left + ' top=' + CROP.top +
  ' width=' + CROP.width + ' height=' + CROP.height);
console.log('  hogerkant             : ' + CROP.left + ' + ' + CROP.width + ' = ' + right +
  '   (<= ' + meta.width + ' : ' + (right <= meta.width ? 'ryms' : 'FEL') + ')');
console.log('  underkant             : ' + CROP.top + ' + ' + CROP.height + ' = ' + bottom +
  '   (<= ' + meta.height + ' : ' + (bottom <= meta.height ? 'ryms' : 'FEL') + ')');
console.log('  forhallande b/h       : ' + ratio.toFixed(4) + '   (ska vara 0.8000)');
console.log('  bortskuret i sidled   : ' + CROP.left + ' px vanster, ' + (meta.width - right) + ' px hoger');
console.log('  bortskuret i hojdled  : ' + CROP.top + ' px upptill, ' + (meta.height - bottom) + ' px nedtill');

if (right > meta.width || bottom > meta.height) {
  fail('beskarningen hamnar utanfor bilden.');
}
if (Math.abs(ratio - 0.8) > 0.0001) {
  fail('beskarningen ar inte 4:5 (b/h = ' + ratio.toFixed(4) + ', ska vara 0.8).');
}

// Beskar en gang och aterbruka bufferten till alla sex varianterna.
const cropped = await rotated.extract(CROP).toBuffer();

// --- 4. Skala ned till varje malbredd, hojd = bredd x 1,25 -----------------
// Kodas till BUFFERT, inte till fil. Skrivningen sker langst ner, efter alla
// grindar.
console.log('');
console.log('--- UTDATAFILER (kodade till buffert, inte skrivna an) ---');
console.log('  GRIND: fil             matt          storlek         tak   utfall');

const produced = [];
let overLimit = 0;

for (const width of WIDTHS) {
  const height = Math.round(width * 1.25);

  const encoders = [
    ['webp', (pipeline) => pipeline.webp(WEBP_OPTIONS)],
    ['jpg', (pipeline) => pipeline.jpeg(JPEG_OPTIONS)],
  ];

  for (const [ext, encode] of encoders) {
    const name = 'profile-' + width + '.' + ext;
    const target = resolve(OUT_DIR, name);

    // Metadata strippas - sharps standard. Ingen withMetadata()-anropning.
    const encoded = await encode(
      sharp(cropped).resize(width, height, { fit: 'cover' }),
    ).toBuffer({ resolveWithObject: true });

    const info = encoded.info;
    queueWrite(target, encoded.data);

    const limit = SIZE_LIMIT_KB[name];
    const size = kB(info.size);
    const ok = size <= limit;
    if (!ok) overLimit++;

    produced.push({
      name,
      buffer: encoded.data,
      width: info.width,
      height: info.height,
      kb: size,
      limit,
      ok,
      expected: width,
    });

    console.log(
      '  ' + name.padEnd(22) +
      (info.width + 'x' + info.height).padEnd(13) +
      (size.toFixed(1) + ' kB').padStart(10) +
      ('<= ' + limit + ' kB').padStart(12) + '   ' +
      (ok ? 'ok' : 'OVER TAKET'),
    );
  }
}

// --- 5. Grindar, korda PA BUFFERTARNA innan nagot skrivs ------------------
console.log('');
console.log('--- KONTROLL (last ur buffertarna, inga filer skrivna an) ---');

const wrongSize = produced.filter(
  (f) => f.width !== f.expected || f.height !== Math.round(f.expected * 1.25),
);
console.log('  GRIND: alla matt enligt tabell : ' +
  (wrongSize.length === 0 ? 'ja' : 'NEJ - ' + wrongSize.map((f) => f.name).join(', ')));
console.log('  GRIND: alla under sitt tak     : ' +
  (overLimit === 0 ? 'ja' : 'NEJ - ' + overLimit + ' fil(er) over'));

let exifFound = 0;
for (const file of produced) {
  const outMeta = await sharp(file.buffer).metadata();
  if (outMeta.exif) exifFound++;
}
console.log('  GRIND: EXIF i utdata           : ' +
  (exifFound === 0 ? 'nej (strippad)' : 'JA pa ' + exifFound + ' fil(er)'));

const after = await stat(SOURCE);
const untouched = after.size === sourceStat.size && after.mtimeMs === sourceStat.mtimeMs;
console.log('  GRIND: originalet oforandrat   : ' + (untouched ? 'ja' : 'NEJ') +
  '  (' + kB(after.size).toFixed(0) + ' kB, ' + after.mtime.toISOString() + ')');

if (overLimit > 0 || wrongSize.length > 0 || exifFound > 0 || !untouched) {
  fail('en eller flera kontroller slog fel - se ovan.');
}

console.log('');
console.log('Profilbilden klar: ' + produced.length +
  ' buffertar i skrivkon (skrivs langst ner, efter ikonens grindar).');

// ===========================================================================
//  MONOGRAM-IKONEN  (paket 2B, tajta varianter tillagda i paket 3)
//
//  Harleder JQ-monogrammet ur `assets-source/logo.png` till FEM PNG-filer med
//  GENOMSKINLIG botten, direkt i `public/assets/` (det ar inget
//  profilbildsderivat och ligger darfor inte i profile/):
//
//    logo-mark-{32,96,192}.png      kvadratiska  - favicon och apple-touch
//    logo-mark-tight-{96,192}.png   tajta        - HEADERN, 48 x 36 px
//
//  De tajta harleds FORE extend()-steget, ur samma uttag.
//
//  `logo.png` LASES bara och skrivs aldrig over, precis som profile.jpg.
// ===========================================================================

const ICON_OUT_DIR = assertSafeOutput(resolve(ROOT, 'public/assets'));

/** Forvantade matt pa logo.png. Avvikelse = avbryt, beskar aldrig blint. */
const LOGO_EXPECTED_WIDTH = 1254;
const LOGO_EXPECTED_HEIGHT = 1254;

/**
 * Blockdetektering enligt ARKITEKTUR.md, "Beskarningen - blockdetektering,
 * inte en hojdtroskel": en rad raknas som orange om nagon pixel passerar
 * troskeln, rader grupperas i block, ett glapp pa MER an 4 rader bryter ett
 * block, och det HOGSTA blocket ar monogrammet.
 */
const ORANGE_ROW_GAP = 4;

/**
 * Orange-troskeln. SKARPT av arkitekten efter paket 2B (ARKITEKTUR.md,
 * "Rattad troskel"): fran `R > G && R > 120` till `R - G >= 30 && R > 120`.
 *
 * `R > G` ar inget mattnadstest - det slapper igenom vilken nastan-neutral
 * ljus pixel som helst. Uppmatt i paket 2B: 732 pixlar ur den VITA ordbilden
 * (y 836..872) passerade, t.ex. rgb(255,252,254) med R - G = 1, vilket gav
 * TRE block i stallet for tva. Verklig orange i loggan har R - G = 62..159,
 * sa 30 ligger 24 steg over den vitaste storningen och 32 steg under den
 * minst mattade orangen.
 */
const ORANGE_MIN_DELTA = 30;
const ORANGE_MIN_RED = 120;

/** @returns {boolean} true om pixeln vid byteoffset `i` ar orange. */
const isOrange = (data, i) =>
  data[i] - data[i + 1] >= ORANGE_MIN_DELTA && data[i] > ORANGE_MIN_RED;

/**
 * Uppmatt facit (BRIEF.md + ARKITEKTUR.md "Forvantat utfall"). Detekteringen
 * jamfors mot detta och skriptet AVBRYTER vid avvikelse - talen justeras
 * aldrig for hand, for da ar det detekteringen som gor nagot annat an
 * matningen gjorde.
 *
 * BADA ar harda kontroller sedan troskeln rattades (ARKITEKTUR.md, "Tva
 * oberoende kontroller, bada ska stamma"). I paket 2B lat byggaren blockantalet
 * bara bli en utskriven upplysning - rimligt sa lange troskeln var trasig, men
 * nu stoppar en avvikelse korningen. Blockantal och bbox kontrollerar samma sak
 * fran tva hall: stammer bboxen men inte blockantalet har nagot i bilden andrats
 * som vi inte forstar.
 */
const EXPECTED_BLOCKS = 2;
const EXPECTED_MARK_BBOX = { x0: 323, x1: 914, y0: 338, y1: 779 };

/**
 * BRIEF.md, "RATTELSE 2026-10-02 - ikonens beskarning far INTE vara kvadratisk
 * mot kallan": den gamla rutan left=283 top=223 672x672 spanner y 223..894 och
 * fangar den VITA ordbilden (x 403..849, y 836..872). Alfa-formeln ger vita
 * pixlar alfa ~1 och hade fargat ordet "JelalQaiumi" orange langst ner i
 * ikonen. Felet kan inte kramas bort: monogrammet ar 592 brett men 442 hogt, sa
 * varje KVADRATISK ruta som rymmer bredden maste na ner till y 854.
 *
 * Darfor: beskar TAJT till monogrammets bbox, kor alfa-steget, och gor
 * kvadraten med GENOMSKINLIG utfyllnad (extend) i stallet.
 */
const ICON_SIDE = 672;

/** Accentfargen, pixelmatt ur loggan (ARKITEKTUR.md). Satts rakt av. */
const ACCENT = { r: 252, g: 111, b: 3 };

/**
 * Loggans botten ar #020202 och market #FC6F03. Roda kanalen bar hela
 * overgangen 2 -> 252, sa alfa = (R - 2) / 250 klamrat till 0..1.
 */
const LOGO_BASE_R = 2;
const ALPHA_SPAN = 250;

/** Nedskalning sker FRAN 672-underlaget, aldrig fore alfa-steget. */
const ICON_SIZES = [192, 96, 32];

/** Maxstorlek i kB enligt ARKITEKTUR.md, "Utdatafiler for ikonen". */
const ICON_SIZE_LIMIT_KB = {
  'logo-mark-32.png': 1,
  'logo-mark-96.png': 4,
  'logo-mark-192.png': 10,
};

/**
 * TAJTA, ICKE-KVADRATISKA varianter for HEADERN (ARKITEKTUR.md, "Ikonens
 * optiska storlek - rattat efter paket 2B").
 *
 * Den kvadratiska 672-ikonen har 115 px genomskinlig luft upptill och nedtill,
 * sa i en 44-ruta blir det SYNLIGA market bara ca 39 x 29 px. Headern anvander
 * darfor ett tajt uttag, renderat med `height: 36px; width: auto` -> ca
 * 48 x 36 px. Kvadraten behalls dar kvadrat KRAVS: favicon och apple-touch.
 *
 * Samma script, samma tajta uttag - filerna skrivs bara ut FORE extend()-steget.
 * Hojden foljer av bredden och bevarad proportion (592 : 442) och jamfors mot
 * arkitekturens tabell:
 *
 *   logo-mark-tight-96.png    96 x 72
 *   logo-mark-tight-192.png   192 x 143
 *
 * ARKITEKTUR.md anger inget storlekstak for dessa tva (tabellen i "Utdatafiler
 * for ikonen" galler de kvadratiska). Storlekarna skrivs darfor ut utan gate.
 */
const TIGHT_SIZES = [
  { width: 192, height: 143 },
  { width: 96, height: 72 },
];

console.log('');
console.log('=========================================================');
console.log(' Monogram-ikon -> logo-mark-{32,96,192}.png + logo-mark-tight-{96,192}.png');
console.log('=========================================================');

const logoStat = await readSourceStat(LOGO_SOURCE);

console.log('kalla : ' + LOGO_SOURCE);
console.log('        ' + kB(logoStat.size).toFixed(0) + ' kB, andrad ' + logoStat.mtime.toISOString());
console.log('utdata: ' + ICON_OUT_DIR);

const logoMeta = await sharp(LOGO_SOURCE).metadata();
console.log('');
console.log('--- INDATA ---');
console.log('  format                : ' + logoMeta.format);
console.log('  matt                  : ' + logoMeta.width + ' x ' + logoMeta.height);

/* GRIND, inte upplysning. Alfa-formeln lanedan laser ENBART roda kanalen:
 * alfa = (R - 2) / 250. Hade kallan haft en alfakanal vore roda varder i
 * genomskinliga omraden godtyckliga, och formeln hade gett dem alfa utan att
 * nagot larmat. Raden skrevs tidigare ut utan jamforelse. */
const logoHasAlpha = logoMeta.hasAlpha === true;
console.log('  GRIND: kanaler/hasAlpha : ' + logoMeta.channels + ' / ' + logoMeta.hasAlpha +
  '   (ska vara utan alfa: ' + (logoHasAlpha ? 'NEJ' : 'ja') + ')');

if (logoHasAlpha) {
  fail(
    'kallan logo.png har en alfakanal. Alfa-formeln (R - 2) / 250 laser enbart\n' +
      '  roda kanalen och ar inte giltig da - roda varden i genomskinliga\n' +
      '  omraden ar godtyckliga. STANNA och lamna tillbaka till arkitekten.',
  );
}

if (logoMeta.width !== LOGO_EXPECTED_WIDTH || logoMeta.height !== LOGO_EXPECTED_HEIGHT) {
  fail(
    'ovantade matt pa logo.png.\n' +
      '  forvantat: ' + LOGO_EXPECTED_WIDTH + ' x ' + LOGO_EXPECTED_HEIGHT + '\n' +
      '  faktiskt : ' + logoMeta.width + ' x ' + logoMeta.height + '\n' +
      '  Den uppmatta monogram-bboxen galler just dessa matt. Mat om loggan\n' +
      '  i stallet for att kora vidare.',
  );
}

// --- 1. Blockdetektering: hitta monogrammet, gissa ingen troskel -----------
const logoRaw = await sharp(LOGO_SOURCE).raw().toBuffer({ resolveWithObject: true });
const logoChannels = logoRaw.info.channels;

const orangeRows = [];
for (let y = 0; y < logoRaw.info.height; y++) {
  const rowStart = y * logoRaw.info.width * logoChannels;
  for (let x = 0; x < logoRaw.info.width; x++) {
    const i = rowStart + x * logoChannels;
    if (isOrange(logoRaw.data, i)) {
      orangeRows.push(y);
      break;
    }
  }
}

/* Ett glapp pa MER an 4 omarkerade rader bryter ett block. Mellan tva
 * markerade rader y och yPrev ligger (y - yPrev - 1) omarkerade rader, sa
 * samma block fortsatter sa lange y - yPrev <= 5. */
const blocks = [];
for (const y of orangeRows) {
  const open = blocks[blocks.length - 1];
  if (open && y - open.y1 <= ORANGE_ROW_GAP + 1) open.y1 = y;
  else blocks.push({ y0: y, y1: y });
}

const tallest = blocks.reduce(
  (best, b) => (b.y1 - b.y0 > best.y1 - best.y0 ? b : best),
  blocks[0] ?? { y0: 0, y1: -1 },
);

/* Omslutande rektangel i x-led for ENBART det valda blocket. */
let markX0 = logoRaw.info.width;
let markX1 = -1;
for (let y = tallest.y0; y <= tallest.y1; y++) {
  const rowStart = y * logoRaw.info.width * logoChannels;
  for (let x = 0; x < logoRaw.info.width; x++) {
    const i = rowStart + x * logoChannels;
    if (isOrange(logoRaw.data, i)) {
      if (x < markX0) markX0 = x;
      if (x > markX1) markX1 = x;
    }
  }
}

const bbox = { x0: markX0, x1: markX1, y0: tallest.y0, y1: tallest.y1 };
const MARK_CROP = {
  left: bbox.x0,
  top: bbox.y0,
  width: bbox.x1 - bbox.x0 + 1,
  height: bbox.y1 - bbox.y0 + 1,
};

console.log('');
console.log('--- BLOCKDETEKTERING (orange: R - G >= ' + ORANGE_MIN_DELTA +
  ' && R > ' + ORANGE_MIN_RED + ') ---');
console.log('  GRIND: antal orange block : ' + blocks.length +
  '   (ARKITEKTUR.md anger ' + EXPECTED_BLOCKS + ')' +
  (blocks.length === EXPECTED_BLOCKS ? '  ok' : '  <- AVVIKER'));
for (const b of blocks) {
  console.log('    block y ' + b.y0 + '..' + b.y1 + '  (' + (b.y1 - b.y0 + 1) + ' rader)' +
    (b === tallest ? '  <- hogst, valt' : ''));
}
const bboxOk =
  bbox.x0 === EXPECTED_MARK_BBOX.x0 &&
  bbox.x1 === EXPECTED_MARK_BBOX.x1 &&
  bbox.y0 === EXPECTED_MARK_BBOX.y0 &&
  bbox.y1 === EXPECTED_MARK_BBOX.y1;
console.log('  GRIND: orange bbox        : x ' + bbox.x0 + '..' + bbox.x1 +
  ', y ' + bbox.y0 + '..' + bbox.y1 +
  '   (' + MARK_CROP.width + ' x ' + MARK_CROP.height + ' px)');
console.log('         uppmatt facit      : x ' + EXPECTED_MARK_BBOX.x0 + '..' + EXPECTED_MARK_BBOX.x1 +
  ', y ' + EXPECTED_MARK_BBOX.y0 + '..' + EXPECTED_MARK_BBOX.y1 +
  '   (' + (bboxOk ? 'ok' : 'AVVIKER') + ')');

/* Tva oberoende HARDA kontroller: blockantalet och bboxen. Ingen av dem far
 * bara skrivas ut (ARKITEKTUR.md, "Tva oberoende kontroller, bada ska stamma").
 * Talen justeras ALDRIG for hand - en avvikelse betyder att detekteringen gor
 * nagot annat an matningen gjorde, och da lamnas paketet tillbaka. */
if (blocks.length !== EXPECTED_BLOCKS) {
  fail(
    'antalet orange block ar ' + blocks.length + ', forvantat ' + EXPECTED_BLOCKS + '.\n' +
      '  Nagot i bilden har andrats som vi inte forstar. STANNA och lamna\n' +
      '  tillbaka till arkitekten - justera inte troskeln for hand.',
  );
}

if (!bboxOk) {
  fail(
    'detekteringen avviker fran den uppmatta monogram-bboxen.\n' +
      '  Justera INTE talen for hand. Avvikelsen betyder att detekteringen gor\n' +
      '  nagot annat an matningen gjorde - lamna tillbaka till arkitekten.',
  );
}

// --- 2. Kvadraten gors med genomskinlig utfyllnad, inte ur kallan ----------
const padX = (ICON_SIDE - MARK_CROP.width) / 2;
const padY = (ICON_SIDE - MARK_CROP.height) / 2;

console.log('');
console.log('--- BESKARNING OCH UTFYLLNAD ---');
/* Uppmatta lagen i kallan (BRIEF.md). Uttagets underkant maste ligga OVANFOR
 * bada - annars kan alfa-formeln farga den vita ordbilden orange. Dessa tva
 * rader skrevs tidigare ut som "ja/NEJ" utan att ett NEJ stoppade nagot. */
const WORDMARK_TOP_ROW = 836;
const STREAK_TOP_ROW = 915;

const cropBottomRow = MARK_CROP.top + MARK_CROP.height - 1;
const wordmarkOutside = cropBottomRow < WORDMARK_TOP_ROW;
const streakOutside = cropBottomRow < STREAK_TOP_ROW;
const padOk = Number.isInteger(padX) && Number.isInteger(padY) && padX >= 0 && padY >= 0;

console.log('  extract (tajt mot market) : left=' + MARK_CROP.left + ' top=' + MARK_CROP.top +
  ' width=' + MARK_CROP.width + ' height=' + MARK_CROP.height);
console.log('  GRIND: ordbilden (vit) y ' + WORDMARK_TOP_ROW + '..872 utanfor uttaget (' +
  MARK_CROP.top + '..' + cropBottomRow + ') : ' + (wordmarkOutside ? 'ja' : 'NEJ'));
console.log('  GRIND: korta strecket y ' + STREAK_TOP_ROW + '..920 utanfor uttaget : ' +
  (streakOutside ? 'ja' : 'NEJ'));
console.log('  GRIND: extend till ' + ICON_SIDE + ' x ' + ICON_SIDE + ' : top=' + padY +
  ' bottom=' + padY + ' left=' + padX + ' right=' + padX + '  (alfa 0, jamnt ut: ' +
  (padOk ? 'ja' : 'NEJ') + ')');

if (!wordmarkOutside || !streakOutside) {
  fail(
    'uttaget nar ned i ordbilden eller det korta strecket.\n' +
      '  uttagets underkant : rad ' + cropBottomRow + '\n' +
      '  ordbilden borjar   : rad ' + WORDMARK_TOP_ROW + '\n' +
      '  strecket borjar    : rad ' + STREAK_TOP_ROW + '\n' +
      '  Alfa-formeln hade fargat de vita pixlarna orange. STANNA och lamna\n' +
      '  tillbaka till arkitekten.',
  );
}

if (!padOk) {
  fail(
    'utfyllnaden gar inte jamnt ut mot ' + ICON_SIDE + ' px: padX=' + padX + ' padY=' + padY + '.',
  );
}

// --- 3. Alfa-steget pa det tajta uttaget -----------------------------------
const markRaw = await sharp(LOGO_SOURCE).extract(MARK_CROP).raw().toBuffer({ resolveWithObject: true });
const markChannels = markRaw.info.channels;
const markPixels = MARK_CROP.width * MARK_CROP.height;

const rgba = Buffer.allocUnsafe(markPixels * 4);
let alphaZero = 0;
let alphaFull = 0;
let alphaSoft = 0;

for (let p = 0; p < markPixels; p++) {
  const red = markRaw.data[p * markChannels];
  let alpha = (red - LOGO_BASE_R) / ALPHA_SPAN;
  if (alpha < 0) alpha = 0;
  else if (alpha > 1) alpha = 1;
  const a = Math.round(alpha * 255);

  const o = p * 4;
  rgba[o] = ACCENT.r;
  rgba[o + 1] = ACCENT.g;
  rgba[o + 2] = ACCENT.b;
  rgba[o + 3] = a;

  if (a === 0) alphaZero++;
  else if (a === 255) alphaFull++;
  else alphaSoft++;
}

console.log('');
console.log('--- ALFA-STEGET (alfa = (R - 2) / 250, RGB = #FC6F03) ---');
console.log('  UPPLYSNING: kanaler i uttaget         : ' + markChannels);
console.log('  UPPLYSNING: helt genomskinliga pixlar : ' + alphaZero);
console.log('  UPPLYSNING: helt tacka pixlar         : ' + alphaFull);

/* GRIND, inte upplysning. Raden skrevs tidigare ut med texten "0 skulle betyda
 * trappad kant" utan att 0 stoppade nagot - alltsa en grans i text men ingen i
 * kod. Kallan ar en 1254 px kantutjamnad PNG dar roda kanalen bar hela
 * overgangen 2 -> 252, sa noll mellanlagen betyder att alfa-formeln kollapsat
 * till tva niva och att market far trappad kant. */
console.log('  GRIND: mellanlagen (mjuk kant)        : ' + alphaSoft +
  '   (ska vara > 0: ' + (alphaSoft > 0 ? 'ja' : 'NEJ') + ')');

if (alphaSoft === 0) {
  fail(
    'noll mellanlagen i alfakanalen - market far trappad kant.\n' +
      '  Alfa-formeln (R - 2) / 250 har kollapsat till tva nivaer. Troligen har\n' +
      '  nedskalningen skett FORE alfa-steget.',
  );
}

/**
 * STEG 8 i ARKITEKTUR.md:s steglista: satt RGB till accentfargen IGEN efter
 * resize(), utan att rora alfakanalen.
 *
 * `resize()` interpolerar alla fyra kanalerna, sa RGB driver isar vid
 * nedskalning. Uppmatt i paket 2B: 106 / 204 / 219 distinkta RGB-varden bland
 * pixlar med alfa > 0, daribland 255,0,0 och 255,255,0, och 15 steg fel i
 * gronkanalen pa en HELT OPAK pixel. Foljden hade blivit rod- och gulstick i
 * kanterna och en heltackande orange som inte langre matchar --color-accent.
 *
 * Steget upprattholler bara den invariant dokumentet redan beskriver - "ett
 * rent orange marke". Galler BADE de kvadratiska och de tajta filerna.
 *
 * @returns {number} storsta avvikelsen per kanal fore atersattningen.
 */
function resetAccentRgb(data, pixels) {
  let drift = 0;
  for (let p = 0; p < pixels; p++) {
    const o = p * 4;
    if (data[o + 3] > 0) {
      const err = Math.max(
        Math.abs(data[o] - ACCENT.r),
        Math.abs(data[o + 1] - ACCENT.g),
        Math.abs(data[o + 2] - ACCENT.b),
      );
      if (err > drift) drift = err;
    }
    data[o] = ACCENT.r;
    data[o + 1] = ACCENT.g;
    data[o + 2] = ACCENT.b;
  }
  return drift;
}

/**
 * Verifiering av steg 8: antalet distinkta RGB-varden bland pixlar med
 * alfa > 0 ska vara EXAKT 1, och det ska vara 252, 111, 3.
 *
 * @returns {string[]} de distinkta varden som faktiskt finns i bufferten.
 */
function distinctVisibleRgb(data, pixels) {
  const seen = new Set();
  for (let p = 0; p < pixels; p++) {
    const o = p * 4;
    if (data[o + 3] > 0) seen.add(data[o] + ',' + data[o + 1] + ',' + data[o + 2]);
  }
  return [...seen];
}

const ACCENT_KEY = ACCENT.r + ',' + ACCENT.g + ',' + ACCENT.b;

// --- 3b. TAJTA filer for headern, harledda FORE extend() ------------------
console.log('');
console.log('--- TAJTA HEADER-FILER (harleds FORE extend, ingen kvadratisk luft) ---');
console.log('  GRIND: fil                matt         storlek   resize-drift');

const tightIcons = [];

for (const want of TIGHT_SIZES) {
  const name = 'logo-mark-tight-' + want.width + '.png';
  const target = resolve(ICON_OUT_DIR, name);

  /* Enbart bredden anges - sharp raknar hojden ur bevarad proportion
   * (592 : 442). Hojden JAMFORS mot arkitekturens tabell i stallet for att
   * tvingas fram, sa att en avvikelse syns i stallet for att doljas av en
   * beskarning. */
  const resized = await sharp(rgba, {
    raw: { width: MARK_CROP.width, height: MARK_CROP.height, channels: 4 },
  })
    .resize({ width: want.width })
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (resized.info.width !== want.width || resized.info.height !== want.height) {
    fail(
      'tajta varianten blev ' + resized.info.width + ' x ' + resized.info.height +
        ', ARKITEKTUR.md anger ' + want.width + ' x ' + want.height + '.',
    );
  }

  const drift = resetAccentRgb(resized.data, resized.info.width * resized.info.height);

  const encoded = await sharp(resized.data, {
    raw: { width: resized.info.width, height: resized.info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  queueWrite(target, encoded.data);

  tightIcons.push({
    name,
    buffer: encoded.data,
    width: want.width,
    height: want.height,
    kb: kB(encoded.info.size),
    drift,
  });

  console.log(
    '  ' + name.padEnd(26) +
    (encoded.info.width + 'x' + encoded.info.height).padEnd(13) +
    (kB(encoded.info.size).toFixed(2) + ' kB').padStart(9) +
    ('   ' + drift + ' steg').padEnd(12),
  );
}

console.log('');
console.log('--- KONTROLL AV DE TAJTA FILERNA (last ur buffertarna) ---');

let tightProblems = 0;

for (const icon of tightIcons) {
  const m = await sharp(icon.buffer).metadata();
  const raw = await sharp(icon.buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = raw.info.width * raw.info.height;
  const distinct = distinctVisibleRgb(raw.data, pixels);

  let softPixels = 0;
  let visible = 0;
  for (let p = 0; p < pixels; p++) {
    const a = raw.data[p * 4 + 3];
    if (a > 0) visible++;
    if (a > 0 && a < 255) softPixels++;
  }

  const dimsOk = m.width === icon.width && m.height === icon.height;
  const alphaOk = m.channels === 4 && m.hasAlpha === true;
  const rgbOk = distinct.length === 1 && distinct[0] === ACCENT_KEY;
  const softOk = softPixels > 0;
  if (!dimsOk || !alphaOk || !rgbOk || !softOk) tightProblems++;

  console.log('  ' + icon.name);
  console.log('    GRIND: matt             : ' + m.width + ' x ' + m.height +
    '   (' + (dimsOk ? 'ok' : 'FEL, forvantat ' + icon.width + ' x ' + icon.height) + ')');
  console.log('    GRIND: kanaler/hasAlpha : ' + m.channels + ' / ' + m.hasAlpha +
    '   (' + (alphaOk ? 'ok, PNG med alfa' : 'FEL, ska vara 4 / true') + ')');
  console.log('    GRIND: distinkta RGB    : ' + distinct.length + ' st  [' + distinct.join('] [') + ']' +
    '   (' + (rgbOk ? 'ok, exakt 1 och = ' + ACCENT_KEY : 'FEL, ska vara exakt 1 = ' + ACCENT_KEY) + ')');
  console.log('    GRIND: mellanlagen      : ' + softPixels +
    '   (ska vara > 0: ' + (softOk ? 'ja' : 'NEJ, trappad kant') + ')');
  console.log('    UPPLYSNING: pixlar med alfa > 0 : ' + visible);
  console.log('    UPPLYSNING: hornpixel (0,0) alfa: ' + raw.data[3] +
    '   (tajt uttag - ingen kvadratisk luft, vardet ar inte grindat)');
  console.log('    UPPLYSNING: storlek     : ' + icon.kb.toFixed(2) +
    ' kB  (ARKITEKTUR.md anger inget tak for de tajta)');
}

if (tightProblems > 0) {
  fail('en eller flera kontroller av de tajta filerna slog fel - se ovan.');
}

// --- 4. Tillbaka till sharp som raw, sedan extend till 672 ----------------
const iconBase = await sharp(rgba, {
  raw: { width: MARK_CROP.width, height: MARK_CROP.height, channels: 4 },
})
  .extend({
    top: padY,
    bottom: padY,
    left: padX,
    right: padX,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .raw()
  .toBuffer({ resolveWithObject: true });

if (iconBase.info.width !== ICON_SIDE || iconBase.info.height !== ICON_SIDE || iconBase.info.channels !== 4) {
  fail(
    'underlaget efter extend ar ' + iconBase.info.width + ' x ' + iconBase.info.height +
      ' med ' + iconBase.info.channels + ' kanaler, forvantat ' + ICON_SIDE + ' x ' + ICON_SIDE + ' x 4.',
  );
}

/* KRITISK KONTROLL (BRIEF.md): inga pixlar med alfa > 0 nedanfor market.
 * Market slutar pa rad padY + height - 1 = 556, sa rad 557 och nedat ska vara
 * helt genomskinlig. Finns alfa dar har ordbilden kommit med. */
const markBottomRow = padY + MARK_CROP.height; // 557
let belowCount = 0;
let belowMaxAlpha = 0;
for (let y = markBottomRow; y < ICON_SIDE; y++) {
  for (let x = 0; x < ICON_SIDE; x++) {
    const a = iconBase.data[(y * ICON_SIDE + x) * 4 + 3];
    if (a > 0) {
      belowCount++;
      if (a > belowMaxAlpha) belowMaxAlpha = a;
    }
  }
}

let padCount = 0;
for (let y = 0; y < ICON_SIDE; y++) {
  for (let x = 0; x < ICON_SIDE; x++) {
    const insideMark = y >= padY && y < markBottomRow && x >= padX && x < padX + MARK_CROP.width;
    if (insideMark) continue;
    if (iconBase.data[(y * ICON_SIDE + x) * 4 + 3] > 0) padCount++;
  }
}

console.log('');
console.log('--- KRITISK KONTROLL PA ' + ICON_SIDE + '-UNDERLAGET ---');
console.log('  UPPLYSNING: marketsunderkant (rad) : ' + (markBottomRow - 1) +
  '  (' + MARK_CROP.height + ' + ' + padY + ' = ' + markBottomRow + ')');
console.log('  GRIND: pixlar med alfa > 0 under   : ' + belowCount +
  '   (ska vara 0: ' + (belowCount === 0 ? 'ja (ordbilden ar inte med)' : 'NEJ, HOGSTA ALFA ' + belowMaxAlpha) + ')');
console.log('  GRIND: alfa > 0 i hela utfyllnaden : ' + padCount +
  '   (ska vara 0: ' + (padCount === 0 ? 'ja' : 'NEJ') + ')');
console.log('  GRIND: hornpixel (0,0) alfa        : ' + iconBase.data[3] +
  '   (ska vara 0: ' + (iconBase.data[3] === 0 ? 'ja' : 'NEJ') + ')');

if (belowCount > 0 || padCount > 0 || iconBase.data[3] !== 0) {
  fail(
    'utfyllnaden ar inte helt genomskinlig - ' + belowCount + ' pixlar nedanfor rad ' +
      markBottomRow + ' och ' + padCount + ' i utfyllnaden har alfa > 0.\n' +
      '  Har ordbilden kommit med ar beskarningen fel. STANNA och lamna tillbaka.',
  );
}

// --- 5. Nedskalning FRAN underlaget, sedan PNG ----------------------------
console.log('');
console.log('--- UTDATAFILER (kodade till buffert, inte skrivna an) ---');
console.log('  GRIND: fil             matt          storlek         tak   utfall');

const icons = [];
const iconRgbDrift = [];
let iconsOverLimit = 0;

for (const size of ICON_SIZES) {
  const name = 'logo-mark-' + size + '.png';
  const target = resolve(ICON_OUT_DIR, name);

  const resized = await sharp(iconBase.data, {
    raw: { width: ICON_SIDE, height: ICON_SIDE, channels: 4 },
  })
    .resize(size, size)
    .raw()
    .toBuffer({ resolveWithObject: true });

  /* Steg 8 i ARKITEKTUR.md:s steglista - samma atersattning som de tajta
   * filerna far. Se kommentaren vid resetAccentRgb(). */
  const rgbDrift = resetAccentRgb(resized.data, size * size);

  const encoded = await sharp(resized.data, {
    raw: { width: size, height: size, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  queueWrite(target, encoded.data);

  iconRgbDrift.push({ size, drift: rgbDrift });

  const limit = ICON_SIZE_LIMIT_KB[name];
  const size_kb = kB(encoded.info.size);
  const ok = size_kb <= limit;
  if (!ok) iconsOverLimit++;

  icons.push({ name, buffer: encoded.data, expected: size, kb: size_kb, limit, ok });

  console.log(
    '  ' + name.padEnd(22) +
    (encoded.info.width + 'x' + encoded.info.height).padEnd(13) +
    (size_kb.toFixed(2) + ' kB').padStart(10) +
    ('<= ' + limit + ' kB').padStart(12) + '   ' +
    (ok ? 'ok' : 'OVER TAKET'),
  );
}

// --- 6. Kontroller lasta UR BUFFERTARNA, inte ur skriptets avsikt ---------
console.log('');
console.log('--- KONTROLL (last ur buffertarna med sharp().metadata() + raw) ---');

let iconProblems = 0;

for (const icon of icons) {
  const m = await sharp(icon.buffer).metadata();
  const raw = await sharp(icon.buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const cornerAlpha = raw.data[3];

  /* Alla pixlar ska ha exakt accentfargen, aven de halvgenomskinliga. */
  let offAccent = 0;
  let softPixels = 0;
  for (let p = 0; p < raw.info.width * raw.info.height; p++) {
    const o = p * 4;
    const a = raw.data[o + 3];
    if (a > 0 && a < 255) softPixels++;
    if (
      raw.data[o] !== ACCENT.r ||
      raw.data[o + 1] !== ACCENT.g ||
      raw.data[o + 2] !== ACCENT.b
    ) {
      offAccent++;
    }
  }

  let lastRowWithAlpha = -1;
  for (let y = 0; y < raw.info.height; y++) {
    for (let x = 0; x < raw.info.width; x++) {
      if (raw.data[(y * raw.info.width + x) * 4 + 3] > 0) {
        lastRowWithAlpha = y;
        break;
      }
    }
  }
  /* REFERENSVARDE, INGEN GRANS. Market slutar pa rad markBottomRow - 1 i
   * 672-underlaget; omraknat till denna skala blir det talet nedan.
   *
   * Det UPPMATTA lastRowWithAlpha ligger normalt EN rad lagre (uppmatt: 28 mot
   * 27, 81 mot 80, 161 mot 160) och det ar korrekt utdata: nedskalningens
   * interpolation sprider alfan ett steg. Talet far darfor INTE lasas som en
   * grans - en tidigare version skrev ut paret som om det vore ett testutfall,
   * och den naturliga lasningen (gora det till en grind) hade stoppat skriptet
   * pa en helt riktig ikon.
   *
   * Den riktiga grinden for samma sak ligger pa 672-underlaget ovan
   * ("KRITISK KONTROLL"): noll pixlar med alfa > 0 nedanfor market och noll i
   * utfyllnaden. Haller den kan de nedskalade filerna bara ha alfa dar
   * underlaget hade det. Den har raden ar en upplysning om just det. */
  const scaledMarkBottom = Math.ceil((markBottomRow * icon.expected) / ICON_SIDE);

  /* Verifiering av steg 8 (ARKITEKTUR.md): exakt 1 distinkt RGB bland pixlar
   * med alfa > 0, och det ska vara 252, 111, 3. */
  const distinct = distinctVisibleRgb(raw.data, raw.info.width * raw.info.height);

  const dimsOk = m.width === icon.expected && m.height === icon.expected;
  const alphaOk = m.channels === 4 && m.hasAlpha === true;
  const cornerOk = cornerAlpha === 0;
  const accentOk = offAccent === 0;
  const distinctOk = distinct.length === 1 && distinct[0] === ACCENT_KEY;
  const softOk = softPixels > 0;
  if (!dimsOk || !alphaOk || !cornerOk || !accentOk || !distinctOk || !softOk) iconProblems++;

  const drift = iconRgbDrift.find((d) => d.size === icon.expected);

  console.log('  ' + icon.name);
  console.log('    GRIND: matt             : ' + m.width + ' x ' + m.height +
    '   (' + (dimsOk ? 'ok' : 'FEL, forvantat ' + icon.expected + ' x ' + icon.expected) + ')');
  console.log('    GRIND: kanaler/hasAlpha : ' + m.channels + ' / ' + m.hasAlpha +
    '   (' + (alphaOk ? 'ok, PNG med alfa' : 'FEL, ska vara 4 / true') + ')');
  console.log('    GRIND: hornpixel (0,0)  : alfa ' + cornerAlpha +
    '   (ska vara 0: ' + (cornerOk ? 'ja' : 'NEJ') + ')');
  console.log('    GRIND: RGB = #FC6F03    : ' + (accentOk ? 'ja, overallt' : 'NEJ, ' + offAccent + ' pixlar avviker') +
    '   (resize-drift fore atersattning: ' + (drift ? drift.drift : '?') + ' steg)');
  console.log('    GRIND: distinkta RGB    : ' + distinct.length + ' st  [' + distinct.join('] [') + ']' +
    '   (' + (distinctOk ? 'ok, exakt 1 och = ' + ACCENT_KEY : 'FEL, ska vara exakt 1 = ' + ACCENT_KEY) + ')');
  console.log('    GRIND: mellanlagen      : ' + softPixels +
    '   (ska vara > 0: ' + (softOk ? 'ja' : 'NEJ, trappad kant') + ')');
  console.log('    GRIND: storlek          : ' + icon.kb.toFixed(2) + ' kB' +
    '   (tak ' + icon.limit + ' kB: ' + (icon.ok ? 'ok' : 'OVER TAKET') + ')');
  console.log('    UPPLYSNING: nedersta rad med alfa > 0 : ' + lastRowWithAlpha);
  console.log('                marketsunderkant omraknad till denna skala: ' + scaledMarkBottom +
    ' (referens, INGEN grans - interpolationen flyttar alfan ca 1 rad ned)');
}

const logoAfter = await stat(LOGO_SOURCE);
const logoUntouched =
  logoAfter.size === logoStat.size && logoAfter.mtimeMs === logoStat.mtimeMs;
console.log('  GRIND: logo.png oforandrat : ' + (logoUntouched ? 'ja' : 'NEJ') +
  '  (' + kB(logoAfter.size).toFixed(0) + ' kB, ' + logoAfter.mtime.toISOString() + ')');

if (iconsOverLimit > 0 || iconProblems > 0 || !logoUntouched) {
  fail('en eller flera ikonkontroller slog fel - se ovan.');
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
//  kvar, och ingen skrivning alls fore den sista grinden. Elva PNG/WebP/JPEG
//  pa sammanhanget 180 kB ryms utan vidare i minnet.
// ===========================================================================
console.log('');
console.log('--- SKRIVFASEN (alla grindar passerade) ---');

await mkdir(OUT_DIR, { recursive: true });

for (const write of pendingWrites) {
  await writeFile(write.target, write.buffer);
}

console.log('  filer skrivna            : ' + pendingWrites.length);
console.log('  public/assets/profile/   : ' + (await readdir(OUT_DIR)).sort().join(', '));
console.log('  public/assets/ (ikoner)  : ' +
  (await readdir(ICON_OUT_DIR)).filter((f) => f.endsWith('.png')).sort().join(', '));

console.log('');
console.log('Klart. ' + produced.length + ' profilvarianter + ' +
  (icons.length + tightIcons.length) + ' ikonfiler (' + icons.length +
  ' kvadratiska + ' + tightIcons.length + ' tajta for headern).');
