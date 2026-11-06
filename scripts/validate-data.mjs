/* Validering av datafilerna i src/data/.
 *
 * Körs både manuellt (`npm run validate:data`) och som första steg i
 * `npm run build`. Trasig data kan därmed aldrig nå en leverans.
 *
 * Varför den finns: filerna i src/data/ handredigeras, och både en dubblett
 * och ett saknat fält renderas TYST utan den här kontrollen. Att någon tittar
 * räcker inte när listan är lång nog att skrollas.
 *
 * Alla fel samlas och skrivs ut tillsammans - skriptet stannar inte på det
 * första, eftersom den som redigerat en datafil vill se alla sina misstag i en
 * körning. Avslutskoden är nollskild så fort ett fel hittats.
 *
 * Inga beroenden. Ren Node.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFontCodePoints } from './font-coverage.mjs';

/* ===== AKTIVA KONTROLLER =================================================
 * Lägg till en rad här i det paket där datafilen skapas.
 * Skriptet kontrollerar BARA det som står i listan, och avbryter med fel om
 * en fil som står här saknas. Tyst överhoppning är förbjuden: en validering
 * som tiger när underlaget försvinner ger falsk trygghet.
 * ======================================================================== */
const ACTIVE = [
  'sections',
  'skills',
  'projects',
  'about',
  'contact',
];

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(PROJECT_ROOT, 'src', 'data');

/** Alla hittade fel, i den ordning de upptäcks. */
const errors = [];

/** Rader till OK-utskriften, en per aktiv kontroll. */
const summary = [];

function fail(message) {
  errors.push(message);
}

/* Obligatoriskt textfält: ett fält med bara blanksteg är lika tomt som ett som
 * saknas (LARDOMAR.md 2026-10-02). Exakt samma uttryck används i
 * komponenternas filter. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* ===== sections.js ====================================================== */
function checkSections(mod) {
  const { sections, HERO_ID } = mod;

  if (!Array.isArray(sections)) {
    /* EJ I ARKITEKTUR: vad meddelandet ska lyda när själva exporten är borta
     * eller har fel typ. Formatet <fil>: <fel> är behållet. */
    fail('sections.js: sections saknas eller är inte en array');
    return;
  }

  if (!hasText(HERO_ID)) {
    /* EJ I ARKITEKTUR: vad meddelandet ska lyda när HERO_ID saknas.
     * Konstanten behövs för kontrollen nedan att hero inte ligger i listan -
     * utan den går kontrollen inte att göra alls. */
    fail('sections.js: HERO_ID saknas eller är inte en sträng');
    return;
  }

  const seenIds = new Set();

  sections.forEach((section, index) => {
    const id = section?.id;

    if (!hasText(id)) {
      /* FÄLLER, hoppar inte över. Datamodellen kräver id på varje post, och en
       * post utan id renderas aldrig - den räknas bara med i summan och ser
       * därför ut att finnas. "   " fångas av samma kontroll: utan trim() hade
       * den passerat och gett <section id="   "> plus en navlänk till "#   ".
       *
       * Posten kan inte namnges med sitt id, så den får sin plats i listan,
       * räknad från 1 som en människa gör. */
      fail(`sections.js: sektion saknar obligatoriskt fält (post ${index + 1}, fält "id")`);
      return;
    }

    if (seenIds.has(id)) {
      fail(`sections.js: id förekommer mer än en gång ("${id}")`);
    } else {
      seenIds.add(id);
    }

    /* HERO_ID får INTE förekomma i listan. Beslutat i ARKITEKTUR.md,
     * "Hero-posten tas bort ur sections": hero renderas alltid av App och är
     * inget navmål, så en post här hade varit död data. Både Header och App
     * mappar hela listan, så en återinförd hero-post hade dessutom gett en
     * navlänk och en tom <Section> till en sektion som redan renderas. */
    if (id === HERO_ID) {
      fail(`sections.js: hero får inte ligga i sections (id "${id}")`);
    }

    /* label är obligatorisk på ALLA poster. Inga undantag - undantaget fanns
     * bara för hero, som inte längre ligger i listan. */
    if (!hasText(section?.label)) {
      fail(`sections.js: label saknas (id "${id}")`);
    }
  });

  summary.push(`${sections.length} sektioner`);
}

/* ===== skills.js ========================================================
 * Grinden är STRUKTURELL. Den jämför inte listan med något innehåll - varken
 * med en annan lista eller med ett antal - eftersom listan är Jelals att
 * ändra. Det som kontrolleras är invarianter som ingen legitim redigering
 * bryter: att varje post har sina obligatoriska fält, att nycklarna är unika,
 * att ett grupp-id går att använda som ankare, och att ingen post bär ett fält
 * som inget renderar läser.
 *
 * Att innehållet stämmer med Jelals uppdrag är i stället verifierat EN gång,
 * när listan skrevs in. En engångsverifiering får vara exakt mot ett innehåll;
 * en permanent grind får aldrig vara det.
 * ======================================================================== */

/* De enda fält en post får bära. Allt annat är antingen ett skrivfel eller en
 * rest ur en äldre form, och båda renderar ingenting - alltså död data. */
const SKILL_FIELDS = ['name'];
const GROUP_FIELDS = ['id', 'title', 'skills'];

function checkSkills(mod) {
  const { skillGroups } = mod;

  if (!Array.isArray(skillGroups)) {
    fail('skills.js: skillGroups saknas eller är inte en array');
    return;
  }

  const seenGroupIds = new Set();
  const seenNames = new Set();
  let total = 0;

  skillGroups.forEach((group, groupIndex) => {
    const id = group?.id;

    if (!hasText(id)) {
      /* FÄLLER och hoppar över resten av gruppen, samma mönster som
       * checkSections: varje följande meddelande namnger gruppen med sitt id,
       * och utan id finns inget att namnge den med. Posten får sin plats i
       * listan, räknad från 1 som en människa gör. "   " fångas av hasText -
       * ett id med bara blanksteg ger ett ankare som inte går att länka till. */
      fail(`skills.js: grupp saknar obligatoriskt fält (post ${groupIndex + 1}, fält "id")`);
      return;
    }

    /* Id:t blir ett rubrik-id, alltså ett ankare. Blanksteg och versaler ger
     * ett ankare som inte går att länka till, och åtgärden meddelandet
     * föreskriver - skriv om id:t med små bokstäver och bindestreck - får
     * grinden att tiga. */
    if (!/^[a-z0-9-]+$/.test(id)) {
      fail(`skills.js: grupp-id får bara innehålla a-z, 0-9 och bindestreck (id "${id}")`);
    }

    if (seenGroupIds.has(id)) {
      fail(`skills.js: grupp-id förekommer mer än en gång ("${id}")`);
    } else {
      seenGroupIds.add(id);
    }

    for (const field of Object.keys(group)) {
      if (!GROUP_FIELDS.includes(field)) {
        fail(`skills.js: okänt fält på grupp (id "${id}", fält "${field}") - tillåtna fält är ${GROUP_FIELDS.join(', ')}`);
      }
    }

    if (!hasText(group.title)) {
      fail(`skills.js: grupp saknar title (id "${id}")`);
    }

    if (!Array.isArray(group.skills) || group.skills.length === 0) {
      fail(`skills.js: grupp saknar skills eller är tom (id "${id}")`);
      return;
    }

    group.skills.forEach((skill, index) => {
      if (!hasText(skill?.name)) {
        /* Posten kan inte namnges - därför gruppens id plus postens plats i
         * gruppen, räknat från 1 som en människa gör. Den räknas inte med i
         * upplysningen nedan: en fälld post renderas inte. */
        fail(`skills.js: skill saknar name (grupp "${id}", post ${index + 1})`);
        return;
      }

      total += 1;

      if (seenNames.has(skill.name)) {
        fail(`skills.js: skill-namnet förekommer mer än en gång ("${skill.name}")`);
      } else {
        seenNames.add(skill.name);
      }

      /* En rad som släpat med ur en äldre form av filen bär ett fält som inget
       * renderar läser. Utan denna grind passerar den tyst, och då ser raden
       * ut att göra något den inte gör. */
      for (const field of Object.keys(skill)) {
        if (!SKILL_FIELDS.includes(field)) {
          fail(`skills.js: okänt fält på skill ("${skill.name}", fält "${field}") - tillåtet fält är endast ${SKILL_FIELDS.join(', ')}`);
        }
      }
    });
  });

  /* UPPLYSNING, aldrig grindar: båda talen ändras så fort Jelal redigerar sin
   * egen lista, och ett tal som måste rättas i ett skript av den anledningen är
   * ingen kontroll. Avviker ett tal rapporteras det, det justeras inte bort. */
  summary.push(`${skillGroups.length} grupper`);
  summary.push(`${total} kompetenser`);
}

/* ===== projects.js ======================================================
 * Aktiverad i paket 5, tillsammans med datafilen. Två steg hör ihop: raden i
 * ACTIVE och posten i CHECKS nedan. Avkommenteras bara raden larmar skriptet
 * att kontrollen saknas - avsiktligt, men det betyder att de aldrig får skiljas.
 * ======================================================================== */
function checkProjects(mod) {
  const { projects } = mod;

  if (!Array.isArray(projects)) {
    /* EJ I ARKITEKTUR: vad meddelandet ska lyda när exporten är borta - samma
     * öppna fråga som i checkSections. */
    fail('projects.js: projects saknas eller är inte en array');
    return;
  }

  /* EN TOM LISTA ÄR GILTIG. Ingen kontroll av att det finns minst ett projekt:
   * tom array är det läge sidan faktiskt är i när paket 5 levereras, och en
   * grind som fäller det giltiga läget hade tvingat nästa agent att plocka bort
   * den - och då är den borta även den dag den behövs. Antalet rapporteras som
   * UPPLYSNING i OK-raden i stället. */

  const seenIds = new Set();

  projects.forEach((project, index) => {
    const id = project?.id;

    if (!hasText(id)) {
      /* Posten kan inte namnges i ett felmeddelande, så den får sin plats i
       * listan, räknad från 1 som en människa gör. */
      fail(`projects.js: projekt saknar obligatoriskt fält (post ${index + 1}, fält "id")`);
      return;
    }

    if (seenIds.has(id)) {
      fail(`projects.js: id förekommer mer än en gång ("${id}")`);
    } else {
      seenIds.add(id);
    }

    let complete = true;

    for (const field of ['title', 'description']) {
      if (!hasText(project?.[field])) {
        fail(`projects.js: projekt saknar obligatoriskt fält (id "${id}", fält "${field}")`);
        complete = false;
      }
    }

    /* Samma tre fält som isComplete i ProjectCard.jsx kräver. En post som
     * saknar något av dem renderas inte, och är alltså inget mål att länka
     * till. */
    if (complete) {
      renderedProjectIds.add(id);
    }

    if (!Array.isArray(project?.tech)) {
      /* Tom array är tillåten, men den MÅSTE vara en array. En sträng hade
       * renderats som en lista av enstaka bokstäver. */
      fail(`projects.js: tech måste vara en array (id "${id}")`);
    }

    /* EJ I ARKITEKTUR: om url och repoUrl ska grindas, och med vilket
     * meddelande. Kontrollen finns här därför att en tom sträng eller '#' är
     * det troligaste misstaget när en icke-utvecklare fyller i en länk, och
     * båda renderar som en länk utan mål - exakt det felläge komponenten är
     * byggd för att undvika. */
    for (const field of ['url', 'repoUrl']) {
      const value = project?.[field];
      if (value !== null && value !== undefined && !hasText(value)) {
        fail(`projects.js: ${field} måste vara en URL eller null (id "${id}", fick "${value}")`);
      }
      if (typeof value === 'string' && value.trim() === '#') {
        fail(`projects.js: ${field} får inte vara "#" - skriv null när länken saknas (id "${id}")`);
      }
    }

    /* image är valfri. Finns den måste varje variant vara genererad, annars
     * renderar kortet en trasig bild. Den legitima åtgärden - köra skriptet -
     * får grinden att tiga. */
    const image = project?.image;
    if (image !== null && image !== undefined) {
      if (!hasText(image)) {
        fail(`projects.js: image måste vara ett bildnamn eller null (id "${id}")`);
      } else {
        for (const width of mod.PROJECT_IMAGE_WIDTHS ?? []) {
          const file = join(PROJECT_ROOT, 'public', 'assets', 'projects', `${image}-${width}.webp`);
          if (!existsSync(file)) {
            fail(`projects.js: bilden ${image}-${width}.webp saknas - lägg ${image}.png i assets-source/projects/ och kör npm run optimize:projects (id "${id}")`);
          }
        }
      }
    }
  });

  if (!Array.isArray(mod.PROJECT_IMAGE_WIDTHS) || mod.PROJECT_IMAGE_WIDTHS.length === 0) {
    fail('projects.js: PROJECT_IMAGE_WIDTHS saknas eller är tom');
  }

  summary.push(`${projects.length} projekt`);
}

/* Id:na på de projekt som faktiskt blir ett kort på sidan. Fylls av
 * checkProjects, läses av checkAbout för dess UPPLYSNING om länkens mål.
 * Ordningen i ACTIVE garanterar att projects är kontrollerad först; står about
 * före projects blir talet 0 utan att något larmar, och därför läser ingen
 * GRIND detta - bara upplysningsraden. */
const renderedProjectIds = new Set();

/* ===== about.js =========================================================
 * Aktiverad 2026-10-07, tillsammans med datafilen. Tre steg hör ihop: raden i
 * ACTIVE, denna funktion och posten i CHECKS nedan.
 *
 * Datamodellen har ETT obligatoriskt fält, och det ska därför ha en egen grind
 * oavsett att kontrolltabellen är kort (LARDOMAR.md 2026-10-05: ett fält som en
 * typedef märker OBLIGATORISK får inte sakna grind).
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEN? Ingen. Jelal ska kunna skriva om
 * texten, lägga till ett stycke och ta bort ett - allt det tiger grinden om.
 * Den fäller bara tomma stycken och en tom lista, alltså sådant som renderar
 * ett osynligt radavstånd eller en rubrik utan innehåll. Det är kravet på en
 * grind enligt LARDOMAR.md 2026-10-05.
 * ======================================================================== */
function checkAbout(mod) {
  const { about } = mod;

  if (about === null || typeof about !== 'object') {
    /* EJ I ARKITEKTUR: vad meddelandet ska lyda när exporten är borta - samma
     * öppna fråga som i checkSections och checkContact. */
    fail('about.js: about saknas eller är inte ett objekt');
    return;
  }

  /* En sträng i stället för en array är det troligaste misstaget här, eftersom
   * texten ÄR en text: den som skriver `paragraphs: 'Jag arbetar...'` får utan
   * denna kontroll varje BOKSTAV renderad som ett eget stycke. Meddelandet
   * säger därför vad formen ska vara, inte bara att den är fel. */
  if (!Array.isArray(about.paragraphs)) {
    fail('about.js: paragraphs måste vara en array av stycken, ett stycke per post');
    return;
  }

  /* Minst ett stycke. En tom lista ger en rubrik utan innehåll, alltså en
   * sektion som ser ut som ett fel men inte är ett - samma skäl som att
   * <Section> vägrar rendera en sektion utan rubrik. */
  if (about.paragraphs.length === 0) {
    fail('about.js: paragraphs är tom - sektionen behöver minst ett stycke');
    return;
  }

  about.paragraphs.forEach((paragraph, index) => {
    if (!hasText(paragraph)) {
      /* Posten kan inte namnges med sitt innehåll, så den får sin plats i
       * listan, räknad från 1 som en människa gör. Både '' och '   ' fångas
       * av hasText: ett stycke med bara blanksteg renderar ett tomt <p> som
       * ser ut som ett layoutfel. */
      fail(`about.js: stycke ${index + 1} är tomt eller innehåller bara blanksteg`);
    }
  });

  checkAboutLink(about);
}

/* ===== about.link =======================================================
 * De fyra grindarna på länkfrasen.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEM? Att skriva om texten så att frasen
 * försvinner medan link står kvar. Meddelandet säger då vad läget är, och
 * båda åtgärderna - sätt link: null, eller skriv tillbaka frasen - får
 * grinden att tiga. Det är kravet i LARDOMAR.md 2026-10-05.
 *
 * ATT PROJEKTET FINNS GRINDAS INTE. Att projectId pekar på ett projekt som
 * ännu inte är inlagt är det normala, korrekta läget: frasen renderas då som
 * vanlig text utan href, och en grind på det hade fällt bygget på korrekt
 * data. Talet skrivs som UPPLYSNING i OK-raden i stället.
 * ======================================================================== */
function checkAboutLink(about) {
  const { link } = about;
  const paragraphs = Array.isArray(about.paragraphs) ? about.paragraphs.filter(hasText) : [];

  if (link === null || link === undefined) {
    /* Fältet får vara null - då finns ingen länk i texten. Det är ett giltigt
     * läge och inget att rapportera som en länkfras. */
    summary.push(`Om mig: ${styckeOrd(paragraphs.length)}, 0 länkfraser`);
    return;
  }

  if (typeof link !== 'object' || Array.isArray(link)) {
    fail('about.js: link måste vara null eller ett objekt med phrase och projectId');
    return;
  }

  if (!hasText(link.phrase)) {
    fail('about.js: link.phrase saknas eller är tom');
  }

  if (typeof link.projectId !== 'string' || !/^[a-z0-9-]+$/.test(link.projectId)) {
    /* Det troligaste misstaget är att skriva frasen en gång till i stället för
     * projektets id, därför visas värdet som faktiskt stod där. */
    fail(`about.js: link.projectId får bara innehålla a-z, 0-9 och bindestreck (fick "${link.projectId}")`);
  }

  if (hasText(link.phrase)) {
    const occurrences = paragraphs.reduce((total, paragraph) => total + countOccurrences(paragraph, link.phrase), 0);

    if (occurrences !== 1) {
      fail(`about.js: link.phrase förekommer ${occurrences} gånger i texten, ska vara exakt en (”${link.phrase}”)`);
    }
  }

  const pointsAtRendered = typeof link.projectId === 'string' && renderedProjectIds.has(link.projectId) ? 1 : 0;

  summary.push(`Om mig: ${styckeOrd(paragraphs.length)}, 1 länkfras (${pointsAtRendered} pekar på ett projekt som finns)`);
}

/* "1 stycke" men "2 stycken". Ett tal följt av fel ordform läser som ett fel i
 * utskriften, och OK-raden är det enda stället där valideringen syns när allt
 * är rätt. */
function styckeOrd(count) {
  return count === 1 ? '1 stycke' : `${count} stycken`;
}

/* Räknar förekomster utan överlappning. String.prototype.split hade varit
 * kortare men bygger en array av hela texten för att returnera ett tal. */
function countOccurrences(haystack, needle) {
  let count = 0;
  let from = 0;

  for (;;) {
    const at = haystack.indexOf(needle, from);
    if (at < 0) return count;
    count += 1;
    from = at + needle.length;
  }
}

/* ===== contact.js =======================================================
 * Aktiverad i paket 6, tillsammans med datafilen. Två steg hör ihop: raden i
 * ACTIVE och posten i CHECKS nedan.
 * ======================================================================== */
function checkContact(mod) {
  const { contact } = mod;

  if (contact === null || typeof contact !== 'object') {
    /* EJ I ARKITEKTUR: vad meddelandet ska lyda när exporten är borta - samma
     * öppna fråga som i checkSections. */
    fail('contact.js: contact saknas eller är inte ett objekt');
    return;
  }

  if (!hasText(contact.email)) {
    fail('contact.js: email saknas');
  }

  /* links får vara en tom lista, men måste vara en lista. En sträng hade
   * itererats som enstaka bokstäver. */
  if (!Array.isArray(contact.links)) {
    fail('contact.js: links måste vara en array');
  } else {
    contact.links.forEach((link, index) => {
      if (!hasText(link?.label)) {
        /* Posten kan inte namnges utan label, så den får sin plats i listan,
         * räknad från 1 som en människa gör. */
        fail(`contact.js: länk saknar label (post ${index + 1})`);
      }

      /* EJ I ARKITEKTUR: om url ska grindas och med vilket meddelande.
       * null är det beslutade sättet att säga "länken finns inte". En tom
       * sträng eller '#' är det troligaste misstaget när någon tömmer fältet i
       * stället för att skriva null, och båda skulle rendera en länk utan mål -
       * exakt det felläge komponenten filtrerar bort. Grinden säger till i
       * stället för att låta länken tyst försvinna. */
      const { url } = link ?? {};

      if (url !== null && url !== undefined && !hasText(url)) {
        fail(`contact.js: url måste vara en adress eller null (label "${link?.label}", fick "${url}")`);
      }

      if (typeof url === 'string' && url.trim() === '#') {
        fail(`contact.js: url får inte vara "#" - skriv null när länken saknas (label "${link?.label}")`);
      }
    });
  }

  if (contact.form === null || typeof contact.form !== 'object') {
    fail('contact.js: form saknas eller är inte ett objekt');
    return;
  }

  if (!hasText(contact.form.accessKey)) {
    fail('contact.js: form.accessKey saknas eller är tom');
  }

  if (!hasText(contact.form.endpoint)) {
    fail('contact.js: form.endpoint saknas eller är tom');
  }

  /* Platsnyckeln till captchan. Saknas den renderas ingen captcha-widget alls,
   * och eftersom Web3Forms avvisar inskick utan token skulle formuläret se
   * korrekt ut men aldrig leverera - samma tysta felläge som en avstängd
   * hCaptcha i instrumentpanelen. Grinden gör den halvan synlig. */
  if (!hasText(contact.form.hcaptchaSiteKey)) {
    fail('contact.js: form.hcaptchaSiteKey saknas eller är tom');
  }

  summary.push(`${Array.isArray(contact.links) ? contact.links.length : 0} kontaktlänkar`);
}

/* ===== TECKENSNITTETS TÄCKNING ==========================================
 * Varje tecken i varje sträng i src/data/ måste ha en GLYF i den
 * teckensnittsfil som @font-face pekar på.
 *
 * Varför det behöver en grind: ett tecken utan glyf renderas i
 * RESERVTYPSNITTET, inte som en ruta. Det blir en skarv mitt i ett ord - ett
 * enda tecken i en annan skärning - och det är lätt att missa med blotta ögat
 * i en lista på drygt 300 poster.
 *
 * ⚠️ GRINDEN MÄTTE TIDIGARE FEL SAK. Den läste `unicode-range` i fonts.css,
 * alltså DEKLARATIONEN. Granskningen packade upp fontens cmap: filen innehåller
 * 225 teckenpunkter medan intervallet deklarerar 387. 166 deklarerade tecken
 * finns inte i filen och godkändes ändå - bland annat U+2011 hårt bindestreck
 * och U+2012. `unicode-range` är webbläsarens FILTER för vilka tecken den ska
 * försöka hämta ur skärningen, inte ett löfte om att de finns.
 *
 * Nu läses fontfilens faktiska cmap. Samtidigt löser det den gamla buggen att
 * bara FÖRSTA `unicode-range` lästes: varje @font-face-block hittas, och varje
 * fil det pekar på läses, så att ett tillagt latin-ext fungerar av sig självt.
 *
 * Slår grinden till är åtgärden att lägga till en delmängd som VERKLIGEN
 * innehåller tecknet, ALDRIG att döpa om Jelals post.
 * ======================================================================== */
const FONT_CSS = join(PROJECT_ROOT, 'src', 'styles', 'fonts.css');

/* Unionen av alla teckenpunkter som har en glyf i någon av de skärningar
 * fonts.css deklarerar, plus deklarationernas storlek som upplysning. */
function readFontCoverage() {
  let css;

  try {
    css = readFileSync(FONT_CSS, 'utf8');
  } catch (error) {
    fail(`fonts.css: filen kunde inte läsas (${error.code ?? error.message})`);
    return null;
  }

  const blocks = css.match(/@font-face\s*\{[^}]*\}/gi) ?? [];

  if (blocks.length === 0) {
    fail('fonts.css: inget @font-face-block hittades, teckengrinden kan inte köras');
    return null;
  }

  const covered = new Set();
  let declaredCount = 0;

  for (const block of blocks) {
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/i);

    if (urlMatch === null) {
      fail('fonts.css: ett @font-face-block saknar url(), teckensnittets täckning går inte att läsa');
      return null;
    }

    const fontPath = resolve(dirname(FONT_CSS), urlMatch[1]);

    try {
      for (const cp of readFontCodePoints(fontPath)) covered.add(cp);
    } catch (error) {
      fail(`${urlMatch[1]}: teckensnittsfilen kunde inte läsas (${error.message})`);
      return null;
    }

    /* UPPLYSNING, ingen grind: hur många teckenpunkter deklarationen omfattar.
     * Att den är vidare än filen är normalt - så levererar Google sina
     * delmängder - och är ofarligt för tecken vi inte använder. Talet finns med
     * för att det ska synas att de två inte är samma sak. */
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/i);

    if (rangeMatch !== null) {
      for (const token of rangeMatch[1].split(',')) {
        const t = token.trim();
        const span = t.match(/^U\+([0-9A-F]+)-([0-9A-F]+)$/i);
        const single = t.match(/^U\+([0-9A-F]+)$/i);
        const wildcard = t.match(/^U\+([0-9A-F]*)(\?+)$/i);

        if (span) declaredCount += parseInt(span[2], 16) - parseInt(span[1], 16) + 1;
        else if (single) declaredCount += 1;
        else if (wildcard) declaredCount += 16 ** wildcard[2].length;
      }
    }
  }

  return { covered, declaredCount };
}

/* Alla strängar i en datamodul, djupt, med posten de kom ur. */
function collectStrings(value, out) {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value !== null && typeof value === 'object') {
    for (const item of Object.values(value)) collectStrings(item, out);
  }

  return out;
}

function checkFontSubset(fileName, mod, coverage) {
  if (coverage === null) return;

  /* Rapportera varje saknat TECKEN en gång, inte en gång per förekomst. Ett
   * tecken som används i 50 poster ska inte ge 50 rader - det var nära att
   * hända när delmängden krympte i ett test och gav 47 felrader. */
  const reported = new Set();

  for (const text of collectStrings(Object.values(mod), [])) {
    for (const char of text) {
      const cp = char.codePointAt(0);

      if (!coverage.covered.has(cp) && !reported.has(cp)) {
        reported.add(cp);
        const code = `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
        fail(`${fileName}: tecken utanför teckensnittets delmängd ("${text}", tecken "${char}" ${code})`);
      }
    }
  }
}

/* Varje datafil i ACTIVE har en kontroll här. Står ett namn i ACTIVE utan att
 * ha en kontroll blir det ett FEL, inte en tyst överhoppning. */
const CHECKS = {
  sections: checkSections,
  skills: checkSkills,
  projects: checkProjects,
  about: checkAbout,
  contact: checkContact,
};

const FONT_COVERAGE = readFontCoverage();

if (FONT_COVERAGE !== null) {
  /* UPPLYSNING, aldrig en grind: de två talen är olika saker, och den dagen
   * någon tror att deklarationen är ett löfte om täckning ska skillnaden synas
   * i utdata. */
  summary.push(`${FONT_COVERAGE.covered.size} tecken i teckensnittet (${FONT_COVERAGE.declaredCount} deklarerade)`);
}

for (const name of ACTIVE) {
  const check = CHECKS[name];

  if (check === undefined) {
    /* EJ I ARKITEKTUR: vad som ska hända om ett namn aktiveras i ACTIVE innan
     * dess kontroll finns. Larmar här av samma skäl som en saknad fil larmar:
     * en validering som tiger när underlaget försvinner ger falsk trygghet. */
    fail(`${name}.js: står i ACTIVE men har ingen kontroll i scripts/validate-data.mjs`);
    continue;
  }

  const file = join(DATA_DIR, `${name}.js`);

  if (!existsSync(file)) {
    fail(`${name}.js: står i ACTIVE men filen finns inte ("src/data/${name}.js")`);
    continue;
  }

  /* SYNTAXFEL ÄR DET TROLIGASTE FELET när Jelal redigerar en datafil för hand -
   * en glömd komma, klammer eller citattecken. Utan denna try/catch kastar
   * import() en SyntaxError med Node-stack, och den som får den ser varken
   * vilken fil som är trasig eller att felet är hans eget skrivfel. */
  let mod;

  try {
    mod = await import(pathToFileURL(file).href);
  } catch (error) {
    if (error instanceof SyntaxError) {
      fail(`${name}.js: filen går inte att läsa, troligen ett skrivfel - kontrollera kommatecken, klamrar och citattecken (${error.message})`);
    } else {
      fail(`${name}.js: filen kunde inte läsas in (${error.message})`);
    }
    continue;
  }

  check(mod);

  /* Teckengrinden gäller VARJE aktiv datafil, inte bara skills.js - en
   * sektionsrubrik eller en projekttitel kan bära samma tecken. */
  checkFontSubset(`${name}.js`, mod, FONT_COVERAGE);
}

if (errors.length > 0) {
  for (const message of errors) {
    console.error(message);
  }
  console.error('');
  console.error(`Valideringen hittade ${errors.length} fel. Bygget avbryts.`);
  process.exit(1);
}

/* Raden är inte kosmetisk: en validering som är tyst när allt är bra går inte
 * att skilja från en som inte kördes alls. */
console.log(`Validering OK: ${summary.join(', ')}.`);
