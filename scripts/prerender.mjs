/* Förrendering vid bygget. Beslutat i ARKITEKTUR.md: M21 punkt 5 och M24.
 *
 * Körs som sista steg i `npm run build`, efter `vite build`. Skriptet
 * renderar <App /> till en sträng med Vites SSR-bygge av src/prerender.jsx och
 * lägger strängen i den tomma roten i dist/index.html. Sidan syns då innan
 * bundlen har körts, och main.jsx hydrerar den i stället för att rita om.
 *
 * I samma körning skrivs canonical, delningskortet och JSON-LD in i <head>,
 * härledda ur src/data/ med scripts/seo.mjs. De står aldrig i index.html, och
 * bygget stannar om någon skriver dem där (M24 punkt 3).
 *
 * Inga exporter. Varje fel skrivs som "prerender: <vad som är fel>" och ger
 * avslutskod 1. Fallerar något steg är dist/index.html orörd: den nya filen
 * skrivs först i en temporärkatalog och flyttas på plats sist, när varje
 * grind har gått igenom (LARDOMAR.md 2026-10-02).
 *
 * Sökvägarna är relativa till arbetskatalogen, precis som Vites egna, och
 * skriptet körs från projektroten av npm. */

import { existsSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { SHARE_IMAGE, headTags } from './seo.mjs';

/* Snedstreck framåt även på Windows: sökvägarna står i felmeddelandena. */
const DIST_HTML = 'dist/index.html';
const DIST_ASSETS = 'dist/assets';
const SSR_OUT_DIR = 'node_modules/.cache/prerender';
const SSR_ENTRY = 'src/prerender.jsx';
const SECTIONS_FILE = 'src/data/sections.js';
const SITE_FILE = 'src/data/site.js';
const PROFILE_FILE = 'src/data/profile.js';
const CONTACT_FILE = 'src/data/contact.js';

/* Mönster som visar att en tagg som skriptet skriver redan står för hand i
 * index.html (grind P2). De matchar attributets namn och värde oberoende av
 * citattecken, blanksteg och skiftläge, eftersom en handskriven tagg kan ha
 * vilken skrivform som helst. Beslutat i ARKITEKTUR.md: M24 punkt 3. */
const HAND_TAG_ATTR = /\b(?:rel|property|name)\s*=\s*["']?\s*(?:canonical|og:|twitter:)/gi;
const HAND_TAG_LDJSON = /\btype\s*=\s*["']?\s*application\/ld\+json/gi;

/* Högst så många klassnamn räknas upp när G3 fäller, så att ett helt
 * omhashat bygge inte ger en sida felutskrift. */
const MAX_LISTED_CLASSES = 10;

class PrerenderError extends Error {}

function fail(message) {
  throw new PrerenderError(`prerender: ${message}`);
}

/* Felets orsak i en mening, utan stack. */
function reason(error) {
  return error instanceof Error ? error.message.split('\n')[0] : String(error);
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** @param {string} file  Sökväg till en datafil, relativ till projektroten. */
async function importData(file) /* : Promise<object> */ {
  try {
    return await import(pathToFileURL(resolve(file)).href);
  } catch (error) {
    return fail(`${file}: filen går inte att tolka som JavaScript (${reason(error)})`);
  }
}

/* Läser id-konstanterna ur sections.js, som är enda källan för dem. */
async function readIds() {
  const mod = await importData(SECTIONS_FILE);
  for (const name of ['ROOT_ID', 'HERO_ID']) {
    if (typeof mod[name] !== 'string' || mod[name].trim() === '') {
      fail(`${SECTIONS_FILE}: exporten ${name} saknas eller är tom`);
    }
  }
  return { ROOT_ID: mod.ROOT_ID, HERO_ID: mod.HERO_ID };
}

/* Steg 3 och 4: SSR-bygget och anropet av render(). */
async function renderApp() {
  let build;
  try {
    ({ build } = await import('vite'));
  } catch (error) {
    fail(`vite kunde inte laddas (${reason(error)})`);
  }

  try {
    await build({
      logLevel: 'warn',
      build: {
        ssr: SSR_ENTRY,
        outDir: SSR_OUT_DIR,
        emptyOutDir: true,
        copyPublicDir: false,
        minify: false,
      },
    });
  } catch (error) {
    fail(`SSR-bygget av ${SSR_ENTRY} misslyckades (${reason(error)})`);
  }

  let entries;
  try {
    entries = readdirSync(SSR_OUT_DIR, { withFileTypes: true });
  } catch (error) {
    fail(`${SSR_OUT_DIR} kunde inte läsas (${reason(error)})`);
  }
  const scripts = entries
    .filter((entry) => entry.isFile() && /\.(m?js)$/.test(entry.name))
    .map((entry) => entry.name);
  if (scripts.length !== 1) {
    fail(
      `${SSR_OUT_DIR}: SSR-bygget gav ${scripts.length} .js- eller .mjs-filer i roten, ska ge 1` +
        (scripts.length > 0 ? ` (${scripts.join(', ')})` : ''),
    );
  }

  let mod;
  try {
    mod = await import(pathToFileURL(resolve(SSR_OUT_DIR, scripts[0])).href);
  } catch (error) {
    fail(`${SSR_OUT_DIR}/${scripts[0]}: filen går inte att importera (${reason(error)})`);
  }
  if (typeof mod.render !== 'function') {
    fail(`${SSR_ENTRY}: exporten render saknas`);
  }

  let html;
  try {
    html = mod.render();
  } catch (error) {
    fail(`render() kastade ett fel (${reason(error)})`);
  }
  if (typeof html !== 'string') {
    fail(`render() returnerade ${typeof html}, ska returnera en sträng`);
  }
  return html;
}

/* Den sammanlagda texten av klientbyggets CSS, som G3 letar selektorer i. */
function readBuiltCss() {
  let names;
  try {
    names = readdirSync(DIST_ASSETS).filter((name) => name.endsWith('.css'));
  } catch (error) {
    fail(`${DIST_ASSETS} kunde inte läsas (${reason(error)})`);
  }
  if (names.length === 0) {
    fail(`${DIST_ASSETS}: ingen .css-fil, klientbygget saknar stilmall`);
  }
  return names
    .map((name) => {
      try {
        return readFileSync(`${DIST_ASSETS}/${name}`, 'utf8');
      } catch (error) {
        return fail(`${DIST_ASSETS}/${name}: kunde inte läsas (${reason(error)})`);
      }
    })
    .join('\n');
}

/* Kastar alla samlade grindfel tillsammans, om det finns några. */
function throwCollected(errors) {
  if (errors.length > 0) {
    throw new PrerenderError(errors.join('\n'));
  }
}

/* Steg 5: grindarna mot den renderade strängen. Alla fällda grindar samlas
 * och skrivs ut tillsammans. */
function checkGates(html, css, ids) {
  const errors = [];

  /* G1: sidan har exakt en huvudrubrik. */
  const h1Count = count(html, '<h1');
  if (h1Count !== 1) {
    errors.push(`prerender: den renderade sidan har ${h1Count} <h1, ska ha 1`);
  }

  /* G2: hero finns, och bara en gång. */
  const heroAttr = `id="${ids.HERO_ID}"`;
  const heroCount = count(html, heroAttr);
  if (heroCount !== 1) {
    errors.push(`prerender: ${heroAttr} förekommer ${heroCount} gånger i den renderade sidan, ska förekomma 1`);
  }

  /* G3: varje klass i markupen har en regel i klientbyggets CSS. Fäller
   * grinden på en klass som finns i källan betyder det att SSR-bygget och
   * klientbygget hashar CSS Modules olika, och då stämmer ingen förrenderad
   * klass med stilmallen. Det enda andra legitima skälet är en klass utan
   * regel, och den är ett dött klassnamn som ska bort. */
  const classNames = new Set();
  for (const match of html.matchAll(/\sclass="([^"]*)"/g)) {
    for (const name of match[1].split(/\s+/)) {
      if (name !== '') classNames.add(name);
    }
  }
  const missing = [...classNames].filter(
    (name) => !new RegExp(`\\.${escapeRegExp(name)}(?![\\w\\-\\\\]|[^\\x00-\\x7F])`).test(css),
  );
  for (const name of missing.slice(0, MAX_LISTED_CLASSES)) {
    errors.push(`prerender: klassen ${name} finns inte i bygget CSS (SSR- och klientbygget har olika klassnamn)`);
  }
  if (missing.length > MAX_LISTED_CLASSES) {
    errors.push(`prerender: ytterligare ${missing.length - MAX_LISTED_CLASSES} klasser saknas i bygget CSS`);
  }

  /* G4: captchan laddas först när den behövs (M21 punkt 1), och får därför
   * aldrig finnas i den förrenderade sidan. */
  if (/hcaptcha/i.test(html)) {
    errors.push('prerender: den renderade sidan innehåller hcaptcha, captchan får inte förrenderas');
  }

  throwCollected(errors);
}

/* Steg 2b: grindarna P1-P4 mot delen före roten och mot dist/. Alla fällda
 * grindar samlas och skrivs ut tillsammans. Returnerar beskrivningen ur
 * <meta name="description">, som den står i filen. */
function checkHeadGates(head) {
  const errors = [];

  /* P1: taggarna skrivs in före </head>, som måste vara entydig. */
  const headEnds = count(head, '</head>');
  if (headEnds !== 1) {
    errors.push(`prerender: ${DIST_HTML}: </head> finns ${headEnds} gånger före roten, ska finnas 1`);
  }

  /* P2: en handskriven tagg vore en andra källa till samma värde. */
  for (const pattern of [HAND_TAG_ATTR, HAND_TAG_LDJSON]) {
    for (const match of head.matchAll(pattern)) {
      errors.push(
        `prerender: ${DIST_HTML}: ${match[0]} står redan i index.html. Taggen skrivs av prerender.mjs ur src/data/ (ARKITEKTUR.md M24), ta bort den ur index.html.`,
      );
    }
  }

  /* P3: delningskortets beskrivning är sidbeskrivningen. */
  const descriptions = [...head.matchAll(/<meta name="description" content="([^"]*)"/g)];
  let description = null;
  if (descriptions.length !== 1) {
    errors.push(`prerender: ${DIST_HTML}: <meta name="description"> finns ${descriptions.length} gånger, ska finnas 1`);
  } else if (descriptions[0][1].trim() === '') {
    errors.push(`prerender: ${DIST_HTML}: <meta name="description"> är tom`);
  } else {
    description = descriptions[0][1];
  }

  /* P4: og:image pekar på en fil som måste finnas i leveransen. */
  if (!existsSync(`dist/${SHARE_IMAGE.path}`)) {
    errors.push(`prerender: dist/${SHARE_IMAGE.path} saknas (kör npm run optimize:share-image och checka in bilden)`);
  }

  throwCollected(errors);
  return description;
}

/* Steg 2d, P5: JSON-LD-blocken går att tolka, innehåller inget "<" och kan
 * därför inte avsluta sitt eget skriptblock. */
function checkJsonLd(tags) {
  const errors = [];

  const opening = tags.reduce((sum, tag) => sum + count(tag, '<script'), 0);
  const closing = tags.reduce((sum, tag) => sum + count(tag, '</script>'), 0);
  if (opening !== 2 || closing !== 2) {
    errors.push(`prerender: taggarna i <head> har ${opening} <script och ${closing} </script>, ska ha 2 av vardera`);
  }

  const blocks = tags
    .map((tag) => tag.match(/^<script type="application\/ld\+json">([\s\S]*)<\/script>$/))
    .filter((match) => match !== null)
    .map((match) => match[1]);
  blocks.forEach((json, index) => {
    let cause = null;
    if (json.includes('<')) {
      cause = 'innehåller "<"';
    } else {
      try {
        JSON.parse(json);
      } catch (error) {
        cause = reason(error);
      }
    }
    if (cause !== null) {
      errors.push(`prerender: JSON-LD-block ${index + 1} går inte att tolka eller innehåller "<" (${cause})`);
    }
  });

  throwCollected(errors);
}

async function main() {
  /* Steg 1. */
  if (!existsSync(DIST_HTML)) {
    fail(`${DIST_HTML} saknas (kör vite build först)`);
  }
  let page;
  try {
    page = readFileSync(DIST_HTML, 'utf8');
  } catch (error) {
    fail(`${DIST_HTML}: kunde inte läsas (${reason(error)})`);
  }

  /* Steg 2. Markören är den tomma roten. split och inte replace: med replace
   * hade ett dollartecken i sidans text tolkats som ersättningsmönster. */
  const ids = await readIds();
  const marker = `<div id="${ids.ROOT_ID}"></div>`;
  const parts = page.split(marker);
  if (parts.length !== 2) {
    fail(`${DIST_HTML}: markören ${marker} finns ${parts.length - 1} gånger, ska finnas 1`);
  }

  /* Steg 2a. Innehållet är redan grindat av validate-data.mjs, som körs
   * först i build. */
  const { site } = await importData(SITE_FILE);
  const { profile } = await importData(PROFILE_FILE);
  const { contact } = await importData(CONTACT_FILE);

  /* Steg 2b. */
  const description = checkHeadGates(parts[0]);

  /* Steg 2c och 2d. */
  const tags = headTags({ site, profile, contact, description });
  checkJsonLd(tags);

  /* Steg 2e. split och inte replace, av samma skäl som vid roten. */
  const head = parts[0].split('</head>');
  parts[0] = head[0].trimEnd() + '\n' + tags.map((tag) => '    ' + tag + '\n').join('') + '  </head>' + head[1];

  /* Steg 3-5. */
  const html = await renderApp();
  const css = readBuiltCss();
  checkGates(html, css, ids);

  /* Steg 6 och 7. */
  const output = parts[0] + '<div id="' + ids.ROOT_ID + '">' + html + '</div>' + parts[1];
  const staged = `${SSR_OUT_DIR}/index.html`;
  try {
    writeFileSync(staged, output, 'utf8');
  } catch (error) {
    fail(`${staged}: kunde inte skrivas (${reason(error)})`);
  }
  try {
    renameSync(staged, DIST_HTML);
  } catch (error) {
    fail(`${DIST_HTML}: kunde inte ersättas (${reason(error)})`);
  }

  console.log(`prerender: UPPLYSNING: ${html.length} tecken förrenderade i #${ids.ROOT_ID}`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof PrerenderError ? error.message : `prerender: oväntat fel (${reason(error)})`);
  process.exitCode = 1;
} finally {
  /* Steg 8: temporärkatalogen tas bort, både efter en lyckad och en fallerad
   * körning. */
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });
}
