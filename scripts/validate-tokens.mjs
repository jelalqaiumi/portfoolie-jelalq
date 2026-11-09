/* Grind mot kvarglömda tokenreferenser, mot tokens utan konsument och mot
 * ombindningar av tokens som inte finns. Beslut A9, M5g, M5h och M23 i
 * ARKITEKTUR.md.
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
 *   Varje custom property-namn som förekommer i src/**\/*.{css,jsx,js} eller
 *   scripts/*.mjs måste vara DEKLARERAT i :root i tokens.css (namnet följt av
 *   kolon, utanför kommentarer). Det gäller varje namn, inte bara färgerna.
 *
 * src/data/ GENOMSÖKS INTE. Det är Jelals filer, och ingen text han skriver
 * ska kunna fälla en tokengrind. Datafilerna refererar inga tokens.
 *
 * KOMMENTARER RÄKNAS SOM FÖREKOMSTER. Det är avsiktligt och det är hela
 * poängen: en kommentar som namnger ett borttaget token är precis det fel som
 * grinden finns för. Undanta därför aldrig kommentarer från sökningen.
 *
 * DETTA SKRIPT GENOMSÖKER SIG SJÄLV - scripts/ står i SCAN. Därför skrivs
 * tokennamn inte ut i löpande text här, och en kommandoradsflagga skrivs inte
 * med två bindestreck i en kommentar i scripts/: båda läses som ett token. Det
 * är inte en bugg utan samma regel som gäller alla andra filer.
 *
 * tokens.css själv: kommentarerna där är undantagna, eftersom det är där
 * förklaringarna FÅR bo. Men varje var() utanför kommentarer i tokens.css ska
 * peka på ett deklarerat namn, eftersom ett token kan bygga på andra tokens.
 *
 * Grinden fångar INTE en kommentar som räknar upp tokens ur ett annat block så
 * länge alla namnen finns. Den halvan går inte att maskinavgöra - se A9 - och
 * är en granskaruppgift.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA GRINDEN? Ingen. Ett token som används utan
 * deklaration är felet grinden finns för, och åtgärden - deklarera tokenet
 * eller rätta namnet - får den att tiga.
 *
 * ÅT ANDRA HÅLLET (M5h): varje deklaration i :root i tokens.css ska ha minst
 * en konsument, alltså ett var() med exakt det namnet, utanför kommentarer,
 * någonstans i src/**\/*.{css,jsx,js}. Ett var() i tokens.css själv räknas,
 * eftersom ett token kan bygga på andra. En kommentar räknas INTE som
 * konsument. Ett token deklareras i samma paket som dess första konsument.
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEN HALVAN? Att en konsument tas bort medan
 * tokenet står kvar. Åtgärden är att ta bort tokenet, och då tiger grinden.
 *
 * OMBINDNINGEN (M23): tokens.css binder om en del av namnen i ett block efter
 * :root. Bara :root räknas som deklarerat, och varje namn som tilldelas ett
 * värde utanför :root, utanför kommentarer, ska också finnas i :root. Annars
 * hade ett felstavat namn i ombindningen räknats som en ny deklaration och
 * gått igenom tyst, utan att binda om något.
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEN? Ingen. Ett namn som binds om utan att
 * finnas i :root är ett felstavat eller borttaget token, och åtgärden är att
 * rätta namnet.
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

/* Undantaget från SCAN: bara Jelals datamapp, se huvudkommentaren. */
const SKIP_DIR = resolve(PROJECT_ROOT, 'src', 'data');

/* Varje custom property-namn, var det än står: deklaration, var() eller
 * kommentar. Mönstret står ordagrant i ARKITEKTUR.md, M5g. */
const NAME = '(?<![\\w-])--[a-z][a-z0-9]*(?:-[a-z0-9]+)*';
const TOKEN_PATTERN = new RegExp(NAME, 'g');
const DECLARATION_PATTERN = new RegExp(`(${NAME})\\s*:`, 'g');
const VAR_PATTERN = new RegExp(`var\\(\\s*(${NAME})`, 'g');

/** Alla hittade fel, i den ordning de upptäcks. */
const errors = [];

const shownPath = (file) => relative(PROJECT_ROOT, file).replaceAll('\\', '/');

/* Radnumret för en position i en text, räknat från 1 som en editor gör. */
function lineAt(source, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (source.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

/* Blankar blockkommentarer men BEHÅLLER radbrytningarna i dem, så att ett
 * radnummer i den blankade texten är samma rad som i filen. */
function blankCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

/* En rad per par av token och fil. Samma namn två gånger i samma fil är ett
 * fel att rätta, inte två - raden pekar på den första förekomsten. */
const reported = new Set();

function report(token, shown, line) {
  const key = `${token}\u0000${shown}`;
  if (reported.has(key)) return;
  reported.add(key);
  errors.push(`validate-tokens.mjs: tokenet finns inte i tokens.css ("${token}" i ${shown}:${line})`);
}

/** Varje fil under dir med en av extensions, rekursivt. skipDir hoppas över. */
function collectFiles(dir, extensions, skipDir = SKIP_DIR) {
  const found = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    /* En mapp som står i SCAN men inte finns är ett fel, inte en tyst
     * överhoppning: en kontroll som tiger när underlaget försvinner ger falsk
     * trygghet. */
    errors.push(`validate-tokens.mjs: mappen finns inte (${shownPath(dir)})`);
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (skipDir !== null && resolve(full) === skipDir) continue;
    if (entry.isDirectory()) {
      found.push(...collectFiles(full, extensions, skipDir));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

let tokensSource = null;

try {
  tokensSource = blankCssComments(readFileSync(TOKENS_FILE, 'utf8'));
} catch (error) {
  errors.push(`tokens.css: kunde inte läsas (${error.code ?? error.message})`);
}

const declared = new Set();

/* :root-blocket i den kommentarsblankade texten: början (klammern) och slut.
 * Bara deklarationerna här räknas som deklarerade (M23). */
let rootOpen = -1;
let rootClose = -1;

if (tokensSource !== null) {
  const rootStart = tokensSource.search(/:root\s*\{/);
  if (rootStart >= 0) {
    rootOpen = tokensSource.indexOf('{', rootStart);
    const close = tokensSource.indexOf('}', rootOpen);
    rootClose = close < 0 ? tokensSource.length : close;
    for (const match of tokensSource.slice(rootOpen, rootClose).matchAll(DECLARATION_PATTERN)) {
      declared.add(match[1]);
    }
  }

  if (declared.size === 0) {
    /* Utan deklarationer skulle varje referens fällas, och ett larm på allt är
     * lika oanvändbart som inget larm. Då är det tokens.css som är trasig. */
    errors.push('validate-tokens.mjs: inga tokendeklarationer hittades i tokens.css - filen är troligen trasig eller flyttad');
  }

  /* Ombindningen: varje namn som tilldelas ett värde utanför :root ska finnas
   * i :root. En rad per namn och rad. Utan :root rapporteras det nedan, och
   * då säger den här kontrollen inget. */
  if (rootOpen >= 0) {
    for (const match of tokensSource.matchAll(DECLARATION_PATTERN)) {
      if (match.index >= rootOpen && match.index < rootClose) continue;
      if (declared.has(match[1])) continue;
      errors.push(
        `validate-tokens.mjs: ombindningen gäller ett token som inte finns i :root ("${match[1]}" i ${shownPath(TOKENS_FILE)}:${lineAt(tokensSource, match.index)})`,
      );
    }
  }

  /* tokens.css själv: varje var() utanför kommentarer ska peka på ett
   * deklarerat namn. Kommentarerna är redan bortblankade. */
  for (const match of tokensSource.matchAll(VAR_PATTERN)) {
    if (!declared.has(match[1])) {
      report(match[1], shownPath(TOKENS_FILE), lineAt(tokensSource, match.index));
    }
  }
}

let referenceCount = 0;
let fileCount = 0;

for (const { dir, extensions } of SCAN) {
  for (const file of collectFiles(dir, extensions)) {
    if (resolve(file) === resolve(TOKENS_FILE)) continue;
    if (!statSync(file).isFile()) continue;

    let source;
    try {
      source = readFileSync(file, 'utf8');
    } catch (error) {
      errors.push(`${shownPath(file)}: kunde inte läsas (${error.code ?? error.message})`);
      continue;
    }

    const shown = shownPath(file);
    fileCount += 1;

    for (const match of source.matchAll(TOKEN_PATTERN)) {
      referenceCount += 1;
      const token = match[0];
      if (declared.has(token)) continue;
      report(token, shown, lineAt(source, match.index));
    }
  }
}

/* ===== Deklarationer utan konsument (M5h) ================================
 * Blankar kommentarer i JavaScript men behåller radbrytningarna. Strängar och
 * mallsträngar läses förbi, så att ett snedstreck i en adress inte tas för en
 * kommentar. */
function blankJsComments(source) {
  let out = '';
  let i = 0;
  let quote = null;

  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    if (quote !== null) {
      out += ch;
      if (ch === '\\' && i + 1 < source.length) {
        out += next;
        i += 2;
        continue;
      }
      /* En vanlig sträng slutar senast vid radens slut. Då kan ett citattecken
       * i ett reguljärt uttryck inte svälja resten av filen. */
      if (ch === quote || (ch === '\n' && quote !== '`')) quote = null;
      i += 1;
    } else if (ch === '/' && next === '*') {
      const end = source.indexOf('*/', i + 2);
      const stop = end < 0 ? source.length : end + 2;
      out += source.slice(i, stop).replace(/[^\n]/g, ' ');
      i = stop;
    } else if (ch === '/' && next === '/') {
      const end = source.indexOf('\n', i);
      const stop = end < 0 ? source.length : end;
      out += ' '.repeat(stop - i);
      i = stop;
    } else {
      if (ch === "'" || ch === '"' || ch === '`') quote = ch;
      out += ch;
      i += 1;
    }
  }

  return out;
}

if (tokensSource !== null) {
  /* Bara deklarationerna i :root räknas. */
  if (rootOpen < 0) {
    errors.push('validate-tokens.mjs: inget :root-block hittades i tokens.css');
  } else {
    const open = rootOpen;
    const rootBlock = tokensSource.slice(rootOpen, rootClose);

    const consumed = new Set();
    for (const match of tokensSource.matchAll(VAR_PATTERN)) consumed.add(match[1]);

    /* Hela src/, även datamappen: regeln gäller varje fil i src. */
    for (const file of collectFiles(join(PROJECT_ROOT, 'src'), ['.css', '.jsx', '.js'], null)) {
      if (resolve(file) === resolve(TOKENS_FILE)) continue;
      let source;
      try {
        source = readFileSync(file, 'utf8');
      } catch {
        continue; /* redan rapporterat av genomsökningen ovan */
      }
      const blanked = file.endsWith('.css') ? blankCssComments(source) : blankJsComments(source);
      for (const match of blanked.matchAll(VAR_PATTERN)) consumed.add(match[1]);
    }

    for (const match of rootBlock.matchAll(DECLARATION_PATTERN)) {
      const token = match[1];
      if (consumed.has(token)) continue;
      const line = lineAt(tokensSource, open + match.index);
      errors.push(`validate-tokens.mjs: tokenet har ingen konsument ("${token}" deklarerat i ${shownPath(TOKENS_FILE)}:${line})`);
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
