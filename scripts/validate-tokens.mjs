/* Grind mot kvarglömda tokenreferenser. Beslut A9 i ARKITEKTUR.md.
 *
 * Körs både manuellt (`npm run validate:tokens`) och i `build`, efter
 * validate-data.mjs.
 *
 * Varför den finns: tre gånger har ett färgtoken tagits bort eller bundits om
 * på ETT ställe medan andra filer fortsatte tala om det. Varken bygget eller
 * lintet läser kommentarer, så den enda mekanism som hittade avvikelsen var
 * att någon råkade läsa båda filerna i samma arbetspass. Se LARDOMAR.md
 * 2026-10-08, märkt ÅTERKOMMANDE (3+).
 *
 * REGELN, och den har inget tröskeltal och ingen tolkning:
 *   Varje --color-*-namn som förekommer i src/**\/*.{css,jsx,js} eller
 *   scripts/*.mjs måste vara DEKLARERAT i tokens.css (i :root eller i
 *   .surface-light).
 *
 * KOMMENTARER RÄKNAS SOM FÖREKOMSTER. Det är avsiktligt och det är hela
 * poängen: en kommentar som namnger ett borttaget token är precis det fel som
 * grinden finns för. Undanta därför aldrig kommentarer från sökningen.
 *
 * DETTA SKRIPT GENOMSÖKER SIG SJÄLV - scripts/ står i SCAN. Därför skrivs
 * tokennamn inte ut i löpande text här; står ett namn i en kommentar nedan
 * fäller grinden sin egen fil, och det är inte en bugg utan samma regel som
 * gäller alla andra filer.
 *
 * tokens.css själv är undantagen, eftersom det är där uppräkningen FÅR bo -
 * lärdomens egen regel. Det är enda undantaget, och det är inte en
 * undantagslista som får växa.
 *
 * Grinden fångar INTE en kommentar som räknar upp tokens ur ett annat block så
 * länge alla namnen finns. Den halvan går inte att maskinavgöra - se A9 - och
 * är en granskaruppgift.
 *
 * Inga beroenden. Ren Node.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_FILE = join(PROJECT_ROOT, 'src', 'styles', 'tokens.css');

/* Mappar som genomsöks, och de filändelser som räknas i var och en. */
const SCAN = [
  { dir: join(PROJECT_ROOT, 'src'), extensions: ['.css', '.jsx', '.js'] },
  { dir: join(PROJECT_ROOT, 'scripts'), extensions: ['.mjs'] },
];

/** Varje färgtokennamn, var det än står: deklaration, var() eller kommentar. */
const TOKEN_PATTERN = /--color-[a-z0-9]+(?:-[a-z0-9]+)*/g;

/** Alla hittade fel, i den ordning de upptäcks. */
const errors = [];

/** Tar bort blockkommentarer, så att bara riktiga deklarationer blir kvar. */
function stripCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ');
}

/** Varje färgtoken som verkligen deklareras i tokens.css. */
function readDeclaredTokens() {
  const source = stripCssComments(readFileSync(TOKENS_FILE, 'utf8'));
  const declared = new Set();
  for (const match of source.matchAll(/(--color-[a-z0-9-]+)\s*:/g)) {
    declared.add(match[1]);
  }
  return declared;
}

/** Varje fil under dir med en av extensions, rekursivt. */
function collectFiles(dir, extensions) {
  const found = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    /* En mapp som står i SCAN men inte finns är ett fel, inte en tyst
     * överhoppning: en kontroll som tiger när underlaget försvinner ger falsk
     * trygghet. */
    errors.push(`validate-tokens.mjs: mappen finns inte (${relative(PROJECT_ROOT, dir).replaceAll('\\', '/')})`);
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectFiles(full, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

const declared = readDeclaredTokens();

if (declared.size === 0) {
  /* Utan deklarationer skulle varje referens fällas, och ett larm på allt är
   * lika oanvändbart som inget larm. Då är det tokens.css som är trasig. */
  errors.push('validate-tokens.mjs: inga färgtokendeklarationer hittades i tokens.css - filen är troligen trasig eller flyttad');
}

let referenceCount = 0;
let fileCount = 0;
/* En rad per par av token och fil. Samma namn två gånger i samma fil är ett
 * fel att rätta, inte två. */
const reported = new Set();

for (const { dir, extensions } of SCAN) {
  for (const file of collectFiles(dir, extensions)) {
    if (resolve(file) === resolve(TOKENS_FILE)) continue;
    if (!statSync(file).isFile()) continue;

    const source = readFileSync(file, 'utf8');
    const shown = relative(PROJECT_ROOT, file).replaceAll('\\', '/');
    fileCount += 1;

    for (const match of source.matchAll(TOKEN_PATTERN)) {
      referenceCount += 1;
      const token = match[0];
      if (declared.has(token)) continue;
      const key = `${token}\u0000${shown}`;
      if (reported.has(key)) continue;
      reported.add(key);
      errors.push(`validate-tokens.mjs: tokenet finns inte i tokens.css ("${token}" i ${shown})`);
    }
  }
}

if (errors.length > 0) {
  for (const message of errors) {
    console.error(message);
  }
  console.error('');
  console.error(`Tokenvalideringen hittade ${errors.length} fel. Bygget avbryts.`);
  process.exit(1);
}

/* Raden är inte kosmetisk: en validering som är tyst när allt är bra går inte
 * att skilja från en som inte kördes alls. */
console.log(
  `Tokenvalidering OK: ${declared.size} deklarerade namn i tokens.css, ${referenceCount} referenser i ${fileCount} filer.`,
);
