/* Läser vilka teckenpunkter en woff2-fil FAKTISKT innehåller.
 *
 * Varför filen finns: teckengrinden i validate-data.mjs mätte tidigare
 * `unicode-range` i fonts.css, alltså DEKLARATIONEN. Granskningen packade upp
 * teckensnittets cmap och fann att filen innehåller 225 teckenpunkter medan
 * intervallet deklarerar 387. 166 deklarerade tecken finns alltså inte i filen
 * och skulle tyst renderas i reservtypsnittet trots att grinden godkände dem.
 *
 * `unicode-range` är webbläsarens FILTER för vilka tecken den ska försöka
 * hämta ur den här skärningen - inte ett löfte om att de finns. Den enda
 * uppgift som svarar på frågan "har detta tecken en glyf" är fontens cmap.
 *
 * Inga beroenden. brotli ligger i node:zlib.
 */
import { brotliDecompressSync } from 'node:zlib';
import { readFileSync } from 'node:fs';

/* Tabelltaggarna i woff2:ans korta form, i spec-ordning. Index 63 (0x3F)
 * betyder att taggen står utskriven som fyra byte i stället. */
const KNOWN_TAGS = [
  'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm',
  'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern',
  'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC',
  'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar',
  'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty',
  'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat',
  'Gloc', 'Feat', 'Sill',
];

/* UIntBase128: 7 bitar per byte, högsta biten = "fler följer". */
function readBase128(buf, pos) {
  let value = 0;

  for (let i = 0; i < 5; i += 1) {
    const byte = buf[pos + i];
    if (i === 0 && byte === 0x80) throw new Error('UIntBase128 med inledande nolla');
    if (value > 0x01ffffff) throw new Error('UIntBase128 överskrider 32 bitar');
    value = (value << 7) | (byte & 0x7f);
    if ((byte & 0x80) === 0) return { value, next: pos + i + 1 };
  }

  throw new Error('UIntBase128 längre än fem byte');
}

/* Packar upp woff2 och returnerar en Map tabelltagg -> Buffer. */
function readWoff2Tables(buf) {
  if (buf.readUInt32BE(0) !== 0x774f4632) throw new Error('filen är inte en woff2 (saknar wOF2)');

  const numTables = buf.readUInt16BE(12);
  const totalCompressedSize = buf.readUInt32BE(20);

  let pos = 48;
  const entries = [];

  for (let i = 0; i < numTables; i += 1) {
    const flags = buf[pos];
    pos += 1;
    const tagIndex = flags & 0x3f;
    let tag;

    if (tagIndex === 0x3f) {
      tag = buf.toString('latin1', pos, pos + 4);
      pos += 4;
    } else {
      tag = KNOWN_TAGS[tagIndex];
      if (tag === undefined) throw new Error(`okänt taggindex ${tagIndex}`);
    }

    const orig = readBase128(buf, pos);
    pos = orig.next;
    let length = orig.value;

    /* glyf och loca är transformerade när transformVersion = 0. För alla andra
     * tabeller betyder 0 "ingen transform". Bara de transformerade har ett
     * extra längdfält, och det är den längden som gäller i strömmen. */
    const transformVersion = (flags >> 6) & 0x03;
    const isTransformed = (tag === 'glyf' || tag === 'loca')
      ? transformVersion === 0
      : transformVersion !== 0;

    if (isTransformed) {
      const transformed = readBase128(buf, pos);
      pos = transformed.next;
      length = transformed.value;
    }

    entries.push({ tag, length });
  }

  const compressed = buf.subarray(pos, pos + totalCompressedSize);
  const data = brotliDecompressSync(compressed);

  const tables = new Map();
  let offset = 0;

  for (const entry of entries) {
    tables.set(entry.tag, data.subarray(offset, offset + entry.length));
    offset += entry.length;
  }

  return tables;
}

/* cmap-format 4: segmenterad avbildning för BMP. */
function readFormat4(t, base, out) {
  const segCount = t.readUInt16BE(base + 6) / 2;
  const endBase = base + 14;
  const startBase = endBase + segCount * 2 + 2;
  const deltaBase = startBase + segCount * 2;
  const rangeBase = deltaBase + segCount * 2;

  for (let i = 0; i < segCount; i += 1) {
    const end = t.readUInt16BE(endBase + i * 2);
    const start = t.readUInt16BE(startBase + i * 2);
    const delta = t.readInt16BE(deltaBase + i * 2);
    const rangeOffset = t.readUInt16BE(rangeBase + i * 2);

    if (start === 0xffff) continue;

    for (let c = start; c <= end && c !== 0x10000; c += 1) {
      let glyph;

      if (rangeOffset === 0) {
        glyph = (c + delta) & 0xffff;
      } else {
        const at = rangeBase + i * 2 + rangeOffset + (c - start) * 2;
        if (at + 1 >= t.length) continue;
        glyph = t.readUInt16BE(at);
        if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
      }

      if (glyph !== 0) out.add(c);
    }
  }
}

/* cmap-format 12: grupperad avbildning, hela Unicode. */
function readFormat12(t, base, out) {
  const nGroups = t.readUInt32BE(base + 12);

  for (let i = 0; i < nGroups; i += 1) {
    const at = base + 16 + i * 12;
    const start = t.readUInt32BE(at);
    const end = t.readUInt32BE(at + 4);
    const startGlyph = t.readUInt32BE(at + 8);

    if (startGlyph === 0) continue;
    for (let c = start; c <= end; c += 1) out.add(c);
  }
}

/**
 * Teckenpunkterna som faktiskt har en glyf i teckensnittsfilen.
 *
 * @param {string} filePath Absolut sökväg till en woff2-fil.
 * @returns {Set<number>} Kodpunkter med glyf.
 */
export function readFontCodePoints(filePath) {
  const tables = readWoff2Tables(readFileSync(filePath));
  const cmap = tables.get('cmap');

  if (cmap === undefined) throw new Error('teckensnittet saknar cmap-tabell');

  const numSubtables = cmap.readUInt16BE(2);
  const out = new Set();
  let read = 0;

  for (let i = 0; i < numSubtables; i += 1) {
    const rec = 4 + i * 8;
    const platformId = cmap.readUInt16BE(rec);
    const encodingId = cmap.readUInt16BE(rec + 2);
    const base = cmap.readUInt32BE(rec + 4);

    /* Unicode-undertabeller: plattform 0 (Unicode) eller 3 med kodning 1
     * (BMP) eller 10 (hela Unicode). Macintosh-tabeller hoppas över - de är
     * inte Unicode och hade gett fel kodpunkter. */
    const isUnicode = platformId === 0 || (platformId === 3 && (encodingId === 1 || encodingId === 10));
    if (!isUnicode) continue;

    const format = cmap.readUInt16BE(base);
    if (format === 4) { readFormat4(cmap, base, out); read += 1; } else if (format === 12) { readFormat12(cmap, base, out); read += 1; }
  }

  if (read === 0) throw new Error('teckensnittet har ingen Unicode-cmap i format 4 eller 12');

  return out;
}
