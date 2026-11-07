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
import { spawnSync } from 'node:child_process';
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
  'profile',
];

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(PROJECT_ROOT, 'src', 'data');
const PROJECT_RULES = join(PROJECT_ROOT, 'src', 'lib', 'projectRules.js');

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
    /* Beslutat i ARKITEKTUR.md: R6 */
    fail('sections.js: sections saknas eller är inte en array');
    return;
  }

  if (!hasText(HERO_ID)) {
    /* Beslutat i ARKITEKTUR.md: M19 punkt 7.
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
 * Grindarna är beslutade i ARKITEKTUR.md, "M3 - Projektdatan", ett meddelande
 * per fall. Två steg hör ihop: raden i ACTIVE och posten i CHECKS nedan.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEM? Ingen. Jelal kan lägga till, ta bort
 * och skriva om projekt fritt - grindarna fäller bara poster som renderar fel
 * eller inte alls: ett tomt fält, ett värde utanför de tillåtna, en länk utan
 * mål, en bild som inte finns eller ett fält som inget läser.
 * ======================================================================== */

/* De enda fält ett projekt får bära. Allt annat är ett skrivfel eller en rest
 * ur en äldre form, och båda renderar ingenting - alltså död data. */
const PROJECT_FIELDS = ['slug', 'title', 'category', 'status', 'description', 'tech', 'image', 'liveUrl', 'githubUrl'];

/* Slugs på de projekt som faktiskt blir ett kort på sidan. Fylls av
 * checkProjects, läses av checkAbout för dess UPPLYSNING om länkens mål.
 * Ordningen i ACTIVE garanterar att projects är kontrollerad först; står about
 * före projects blir talet 0 utan att något larmar, och därför läser ingen
 * GRIND detta - bara upplysningsraden. */
const renderedProjectSlugs = new Set();

/* Returnerar indexen för de poster som fick minst en rad, så att teckengrinden
 * inte läser en post datagrinden redan har fällt. Beslutat i ARKITEKTUR.md: M3b
 * "Dubbla larm". En fälld posts tecken mäts så snart posten är rättad. */
async function checkProjects(mod) {
  const { projects } = mod;
  const failedPosts = new Set();

  if (!Array.isArray(projects)) {
    /* Beslutat i ARKITEKTUR.md: R6 */
    fail('projects.js: projects saknas eller är inte en array');
    return failedPosts;
  }

  /* isComplete är SAMMA funktion som komponenterna filtrerar med, så att
   * OK-radens antal är antalet kort som renderas. Importen ligger här, efter
   * att projects.js redan lästs in utan fel: projectRules.js importerar själv
   * projects.js, och ett skrivfel där är redan rapporterat. */
  let isComplete;

  try {
    ({ isComplete } = await import(pathToFileURL(PROJECT_RULES).href));
  } catch (error) {
    /* Formatet är LARDOMAR.md 2026-10-05: ett svenskt meddelande, ingen stack. */
    if (error instanceof SyntaxError) {
      /* import() bär inget radnummer för ett syntaxfel, det gör node -c (syntaxkontroll). */
      const check = spawnSync(process.execPath, ['-c', PROJECT_RULES], { encoding: 'utf8' });
      const line = check.stderr.match(/projectRules\.js:(\d+)/)?.[1];
      fail(`projectRules.js: filen går inte att tolka som JavaScript (${line === undefined ? 'rad okänd' : `rad ${line}`})`);
    } else if (error?.code === 'ERR_MODULE_NOT_FOUND' && !existsSync(PROJECT_RULES)) {
      fail('projectRules.js: kunde inte läsas (filen finns inte i src/lib/)');
    } else {
      fail(`projectRules.js: kunde inte läsas (${error.message})`);
    }
    return failedPosts;
  }

  /* EN TOM LISTA ÄR GILTIG. Ingen kontroll av att det finns minst ett projekt:
   * en grind som fäller det giltiga läget hade tvingat nästa agent att plocka
   * bort den. Antalet rapporteras som UPPLYSNING i OK-raden i stället. */

  const categories = Array.isArray(mod.PROJECT_CATEGORIES) ? mod.PROJECT_CATEGORIES : [];
  const statuses = Array.isArray(mod.PROJECT_STATUSES) ? mod.PROJECT_STATUSES : [];
  const widths = Array.isArray(mod.PROJECT_IMAGE_WIDTHS) ? mod.PROJECT_IMAGE_WIDTHS : [];
  const seenSlugs = new Set();
  let rendered = 0;

  projects.forEach((project, index) => {
    const errorsBefore = errors.length;
    const post = index + 1;
    const slug = project?.slug;
    /* Posten namnges med sin slug när den har en, annars med "?". Platsen i
     * listan står alltid med, räknad från 1 som en människa gör. */
    const name = hasText(slug) ? slug : '?';

    for (const field of ['slug', 'title', 'description']) {
      if (!hasText(project?.[field])) {
        fail(`projects.js: ${field} saknas eller är tomt (post ${post}, "${name}")`);
      }
    }

    if (hasText(slug)) {
      if (!/^[a-z0-9-]+$/.test(slug)) {
        fail(`projects.js: slug "${slug}" får bara innehålla a-z, 0-9 och bindestreck`);
      }

      if (seenSlugs.has(slug)) {
        fail(`projects.js: slug "${slug}" förekommer mer än en gång`);
      } else {
        seenSlugs.add(slug);
      }
    }

    if (!categories.includes(project?.category)) {
      fail(`projects.js: category måste vara ett av ${categories.join(', ')} (post ${post}, "${name}", fick "${project?.category}")`);
    }

    if (!statuses.includes(project?.status)) {
      fail(`projects.js: status måste vara ett av ${statuses.join(', ')} (post ${post}, "${name}", fick "${project?.status}")`);
    }

    /* Tom lista är tillåten, men den MÅSTE vara en lista, och varje post i den
     * text. En sträng hade renderats som en lista av enstaka bokstäver. */
    if (!Array.isArray(project?.tech) || !project.tech.every(hasText)) {
      fail(`projects.js: tech måste vara en lista med text (post ${post}, "${name}")`);
    } else {
      /* Beslutat i ARKITEKTUR.md: R2 */
      /* Varje teknik blir en React-nyckel i kortet och ett filterchip, så samma
       * teknik två gånger är ett fel. Jämförelsen bortser från blanksteg runt
       * om och från skiftläge, eftersom det är samma teknik för en läsare. En
       * rad per teknik som upprepas, med värdet så som det står första gången. */
      const firstSeen = new Map();
      const repeated = new Set();

      for (const item of project.tech) {
        const key = item.trim().toLocaleLowerCase('sv');
        if (!firstSeen.has(key)) {
          firstSeen.set(key, item);
        } else if (!repeated.has(key)) {
          repeated.add(key);
          fail(`projects.js: tekniken "${firstSeen.get(key)}" står mer än en gång i tech (post ${post}, "${name}")`);
        }
      }
    }

    /* image är en OBLIGATORISK NYCKEL: null är ett beslut ("ingen bild"), en
     * saknad nyckel är det inte. Finns ett namn måste varje variant vara
     * genererad, annars renderar kortet en trasig bild. Den legitima åtgärden -
     * köra npm run optimize:projects - får grinden att tiga. */
    const image = project?.image;
    const imageMissingFiles = hasText(image)
      && widths.some((width) => !existsSync(join(PROJECT_ROOT, 'public', 'assets', 'projects', `${image}-${width}.webp`)));

    if (!(project !== null && typeof project === 'object' && 'image' in project)
      || (image !== null && !hasText(image))
      || imageMissingFiles) {
      fail(`projects.js: image måste vara null eller ett namn vars bilder är genererade (post ${post}, "${name}")`);
    }

    /* Länkarna är valfria: saknas fältet eller är det null finns ingen länk.
     * Finns ett värde ska det vara en https-adress - en tom sträng eller '#'
     * är det troligaste misstaget, och båda ger en länk utan mål. */
    for (const field of ['liveUrl', 'githubUrl']) {
      const value = project?.[field];
      if (value !== undefined && value !== null && !(typeof value === 'string' && value.startsWith('https://'))) {
        fail(`projects.js: ${field} måste vara null eller en https-adress (post ${post}, "${name}")`);
      }
    }

    if (project !== null && typeof project === 'object') {
      for (const field of Object.keys(project)) {
        if (!PROJECT_FIELDS.includes(field)) {
          fail(`projects.js: okänt fält på projekt ("${name}", fält "${field}")`);
        }
      }
    }

    /* OK-raden räknar bara poster som blir ett kort, och Om mig-upplysningen
     * bara mål som finns på sidan. */
    if (isComplete(project)) {
      rendered += 1;
      renderedProjectSlugs.add(slug);
    }

    if (errors.length > errorsBefore) failedPosts.add(index);
  });

  if (widths.length === 0) {
    fail('projects.js: PROJECT_IMAGE_WIDTHS saknas eller är tom');
  }

  summary.push(`${rendered} projekt`);
  return failedPosts;
}

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
    /* Beslutat i ARKITEKTUR.md: R6 */
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
 * ATT PROJEKTET FINNS GRINDAS INTE. Att projectSlug pekar på ett projekt som
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
    fail('about.js: link måste vara null eller ett objekt med phrase och projectSlug');
    return;
  }

  if (!hasText(link.phrase)) {
    fail('about.js: link.phrase saknas eller är tom');
  }

  if (typeof link.projectSlug !== 'string' || !/^[a-z0-9-]+$/.test(link.projectSlug)) {
    /* Det troligaste misstaget är att skriva frasen en gång till i stället för
     * projektets slug, därför visas värdet som faktiskt stod där. */
    fail(`about.js: link.projectSlug får bara innehålla a-z, 0-9 och bindestreck (fick "${link.projectSlug}")`);
  }

  if (hasText(link.phrase)) {
    const occurrences = paragraphs.reduce((total, paragraph) => total + countOccurrences(paragraph, link.phrase), 0);

    if (occurrences !== 1) {
      fail(`about.js: link.phrase förekommer ${occurrences} gånger i texten, ska vara exakt en (”${link.phrase}”)`);
    }
  }

  const pointsAtRendered = typeof link.projectSlug === 'string' && renderedProjectSlugs.has(link.projectSlug) ? 1 : 0;

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
    /* Beslutat i ARKITEKTUR.md: R6 */
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

      /* Beslutat i ARKITEKTUR.md: M19 punkt 7.
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

/* ===== profile.js =======================================================
 * Aktiverad i paket P5, tillsammans med datafilen. Två steg hör ihop: raden i
 * ACTIVE och posten i CHECKS nedan.
 *
 * Båda fälten är OBLIGATORISKA i typedefen och har därför var sin grind.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA DEN? Ingen. Jelal kan byta namnet och
 * rollen fritt - grinden fäller bara ett fält som saknas eller bara har
 * blanksteg, alltså en tom rollrad i hero.
 * ======================================================================== */
function checkProfile(mod) {
  const { profile } = mod;

  if (profile === null || typeof profile !== 'object' || Array.isArray(profile)) {
    /* Beslutat i ARKITEKTUR.md: R6 */
    /* Saknas exporten, eller är den inte ett objekt, finns inga fält att pröva:
     * ett enda meddelande och inga följdfel om name och role. */
    fail('profile.js: profile saknas eller är inte ett objekt');
    return;
  }

  if (!hasText(profile.name)) {
    fail('profile.js: name saknas eller är tom');
  }

  if (!hasText(profile.role)) {
    fail('profile.js: role saknas eller är tom');
  }

  summary.push('profil med namn och roll');
}

/* ===== TECKENSNITTETS TÄCKNING ==========================================
 * Varje tecken i varje sträng i src/data/ måste ha en GLYF i den familj som
 * strängen RENDERAS i. Beslutat i ARKITEKTUR.md, "M1d - Teckengrinden mäter
 * varje familj mot de fält som renderas i den".
 *
 * Varför det behöver en grind: ett tecken utan glyf renderas i
 * RESERVTYPSNITTET, inte som en ruta. Det blir en skarv mitt i ett ord - ett
 * enda tecken i en annan skärning - och det är lätt att missa med blotta ögat.
 *
 * MÄT ARTEFAKTEN, INTE DEKLARATIONEN. `unicode-range` i fonts.css är
 * webbläsarens FILTER för vilka tecken den ska försöka hämta ur skärningen,
 * inte ett löfte om att de finns. Grinden läser därför cmap ur varje fil som
 * ett @font-face pekar på.
 *
 * PER FAMILJ, inte unionen av alla filer. Ett tecken som finns i en familj men
 * saknas i en annan hade annars passerat grinden och renderats i reserven i
 * den familj som saknar det. Inom en familj och samma font-weight-deklaration
 * är täckningen UNIONEN av filerna (delmängder kompletterar varandra). Mellan
 * olika font-weight-deklarationer i samma familj är den SNITTET, eftersom ett
 * tecken måste finnas i den vikt det renderas i.
 *
 * Slår grinden till är åtgärden att lägga till en delmängd som VERKLIGEN
 * innehåller tecknet, för den familjen, ALDRIG att döpa om Jelals post.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA GRINDEN? Ingen. Ett tecken som faktiskt
 * saknas i den familj det renderas i är ett riktigt fel. Ett nytt fält utan
 * typsnittsroll är en ändring av en byggare, och åtgärden meddelandet
 * föreskriver - lägg till rollen i FONT_ROLES - får grinden att tiga.
 * ======================================================================== */
const FONT_CSS = join(PROJECT_ROOT, 'src', 'styles', 'fonts.css');

/* Familjenycklarna i FONT_ROLES och font-family-namnen i fonts.css. */
const FONT_FAMILIES = {
  heading: 'Urbanist',
  body: 'Manrope',
  mono: 'JetBrains Mono',
};

/* VILKA FÄLT SOM RENDERAS I VILKEN FAMILJ, på EN plats. Tabellen står i
 * ARKITEKTUR.md, M1d punkt 2. Nycklarna är sökvägar i datan: `[]` är ett
 * element i en lista. En tom lista betyder att fältet inte renderas som text.
 *
 * En sträng på en sökväg som saknas här fäller bygget. Det tvingar den som
 * inför ett fält att ta ställning. Talvärden är inte strängar och berörs inte.
 *
 * Varje *_ID-konstant i sections.js renderas inte som text och slås upp i
 * fontRolesFor nedan i stället för att räknas upp här. */
const FONT_ROLES = {
  'sections[].label': ['heading', 'body', 'mono'],
  'sections[].id': [],
  'skillGroups[].id': [],
  'skillGroups[].title': ['mono'],
  'skillGroups[].skills[].name': ['mono'],
  'projects[].slug': [],
  'projects[].image': [],
  'projects[].liveUrl': [],
  'projects[].githubUrl': [],
  'projects[].title': ['heading'],
  'projects[].category': ['mono'],
  'projects[].status': ['mono'],
  'projects[].description': ['body'],
  'projects[].tech[]': ['mono'],
  'PROJECT_CATEGORIES[]': ['body', 'mono'],
  'PROJECT_STATUSES[]': ['mono'],
  'about.paragraphs[]': ['body'],
  'about.link.phrase': ['body'],
  'about.link.projectSlug': [],
  'contact.email': ['body'],
  'contact.links[].label': ['body'],
  'contact.links[].url': [],
  'contact.form.endpoint': [],
  'contact.form.accessKey': [],
  'contact.form.hcaptchaSiteKey': [],
  'profile.name': ['body'],
  'profile.role': ['body', 'mono'],
};

function fontRolesFor(fileName, path) {
  if (fileName === 'sections.js' && /^[A-Z][A-Z0-9_]*_ID$/.test(path)) return [];
  return FONT_ROLES[path];
}

/* GRUNDMÄNGDEN, som varje familj ska innehålla. Den täcker de texter som står
 * som literaler i komponenterna, så att grinden inte behöver läsa .jsx.
 * ARKITEKTUR.md, M1d punkt 4. */
const BASE_CODE_POINTS = [];
for (let cp = 0x20; cp <= 0x7e; cp += 1) BASE_CODE_POINTS.push(cp);
for (const char of 'åäöÅÄÖ·') BASE_CODE_POINTS.push(char.codePointAt(0));

function codeLabel(cp) {
  return `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
}

/* Värdet på en egenskap i ett @font-face-block, utan citattecken runt. */
function readDescriptor(block, name) {
  const match = block.match(new RegExp(`${name}\\s*:\\s*([^;}]+)`, 'i'));
  if (match === null) return null;
  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

/* Täckningen per font-family: Map familjenamn -> Set av kodpunkter med glyf. */
function readFontCoverage() {
  let css;

  try {
    css = readFileSync(FONT_CSS, 'utf8');
  } catch (error) {
    fail(`fonts.css: filen kunde inte läsas (${error.code ?? error.message})`);
    return null;
  }

  /* Kommentarer bort först, så att ett utkommenterat block inte räknas. */
  const source = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const blocks = [...source.matchAll(/@font-face\s*\{[^}]*\}/gi)].map((m) => m[0]);

  if (blocks.length === 0) {
    fail('fonts.css: inget @font-face-block hittades, teckengrinden kan inte köras');
    return null;
  }

  /* familj -> font-weight-deklaration -> union av filernas kodpunkter */
  const byFamily = new Map();

  for (const block of blocks) {
    const family = readDescriptor(block, 'font-family');
    const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/i);

    if (family === null) {
      /* Utan familj går blocket inte att mäta mot någon roll. Meddelandet är
       * beslutat i ARKITEKTUR.md, M1d punkt 7. */
      fail('fonts.css: ett @font-face-block saknar font-family, teckensnittets täckning går inte att läsa');
      return null;
    }

    if (urlMatch === null) {
      fail('fonts.css: ett @font-face-block saknar url(), teckensnittets täckning går inte att läsa');
      return null;
    }

    const weight = readDescriptor(block, 'font-weight') ?? 'normal';
    const fontPath = resolve(dirname(FONT_CSS), urlMatch[1]);
    let codePoints;

    try {
      codePoints = readFontCodePoints(fontPath);
    } catch (error) {
      fail(`${urlMatch[1]}: teckensnittsfilen kunde inte läsas (${error.message})`);
      return null;
    }

    if (!byFamily.has(family)) byFamily.set(family, new Map());
    const byWeight = byFamily.get(family);
    if (!byWeight.has(weight)) byWeight.set(weight, new Set());
    const union = byWeight.get(weight);
    for (const cp of codePoints) union.add(cp);
  }

  const coverage = new Map();

  for (const [family, byWeight] of byFamily) {
    let intersection = null;

    for (const union of byWeight.values()) {
      intersection = intersection === null
        ? new Set(union)
        : new Set([...intersection].filter((cp) => union.has(cp)));
    }

    coverage.set(family, intersection);
  }

  /* Grundmängden gäller varje familj som FONT_ROLES använder. Meddelandena är
   * beslutade i ARKITEKTUR.md, M1d punkt 7.
   *
   * En familj UTAN NÅGOT @font-face-block ger EN rad, och grundmängden hoppas
   * över för den. Ett larm per tecken hade dränkt felet i mängden. Inget
   * tystnar: datafälten som renderas i familjen larmar fortfarande i
   * checkFontSubset, eftersom familjens täckning då är tom. */
  for (const family of Object.values(FONT_FAMILIES)) {
    if (!coverage.has(family)) {
      fail(`fonts.css: inget @font-face-block för ${family}, teckengrinden kan inte mäta den`);
      continue;
    }

    const covered = coverage.get(family);

    for (const cp of BASE_CODE_POINTS) {
      if (!covered.has(cp)) {
        fail(`fonts.css: tecken saknas i ${family} (tecken "${String.fromCodePoint(cp)}" ${codeLabel(cp)}, grundmängden)`);
      }
    }
  }

  return coverage;
}

/* Varje sträng i en datamodul tillsammans med sin sökväg, djupt. */
function collectStrings(value, path, out) {
  if (typeof value === 'string') {
    out.push({ path, text: value });
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, `${path}[]`, out);
  } else if (value !== null && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) collectStrings(item, `${path}.${key}`, out);
  }

  return out;
}

function checkFontSubset(fileName, mod, coverage) {
  if (coverage === null) return;

  /* Rapportera varje saknat tecken EN gång per familj, och varje sökväg utan
   * roll en gång. Ett tecken som används i 50 poster ska inte ge 50 rader. */
  const reportedChars = new Set();
  const reportedPaths = new Set();

  const strings = [];
  for (const [name, value] of Object.entries(mod)) collectStrings(value, name, strings);

  for (const { path, text } of strings) {
    const roles = fontRolesFor(fileName, path);

    if (roles === undefined) {
      if (!reportedPaths.has(path)) {
        reportedPaths.add(path);
        fail(`${fileName}: fältet ${path} saknar typsnittsroll (FONT_ROLES i scripts/validate-data.mjs)`);
      }
      continue;
    }

    for (const role of roles) {
      const family = FONT_FAMILIES[role];
      const covered = coverage.get(family) ?? new Set();

      for (const char of text) {
        const cp = char.codePointAt(0);
        const key = `${family}\u0000${cp}`;

        if (!covered.has(cp) && !reportedChars.has(key)) {
          reportedChars.add(key);
          fail(`${fileName}: tecken saknas i ${family} ("${text}", tecken "${char}" ${codeLabel(cp)}, fältet ${path})`);
        }
      }
    }
  }
}

/* ===== SIDANS ID ========================================================
 * Beslutat i ARKITEKTUR.md: R2. Ett id ur en datafil (ett projekts slug, en
 * skillgrupp) blir ett id i HELA dokumentet, inte bara i sin egen fil. Krockar
 * det med ett id som sidan själv sätter landar navlänken, CTA:n eller
 * skip-länken på fel element, och getElementById ger det första i DOM.
 *
 * Källorna läses i en fast ordning, så att den källa som nämns SIST i
 * meddelandet alltid är den fil som ska ändras:
 *   1. varje *_ID-export i sections.js (varje fast id på sidan står där),
 *   2. ett id i sections som skrivits som literal i stället för en konstant,
 *   3. varje skillgrupps id,
 *   4. varje id ett projektkort sätter, ur cardIds i src/lib/projectRules.js.
 * I 3 och 4 räknas varje värde en gång: en dubblett inom filen fälls redan av
 * filens egen grind.
 *
 * Saknas en modul, eller är dess lista inte en array, hoppas den källan över.
 * Felet är då redan rapporterat av filens egen kontroll och bygget är rött.
 *
 * VILKEN LEGITIM ÄNDRING FÅR FÄLLA GRINDEN? En ny sektion, grupp eller ett
 * nytt projekt vars id redan finns. Åtgärden är att byta id i den fil
 * meddelandet nämner sist, och då tiger grinden.
 * ======================================================================== */

/** Fäller varje id som sidan sätter mer än en gång. */
/** @param {{ sections?: object, skills?: object, projects?: object }} loaded  Modulerna som gick att importera, nycklade på namnet i ACTIVE. */
/** @returns {Promise<void>} */
async function checkPageIds(loaded) {
  /** id -> källan som satte det först */
  const owners = new Map();

  function claim(id, source) {
    if (owners.has(id)) {
      fail(`sidans id: "${id}" sätts av både ${owners.get(id)} och ${source}`);
    } else {
      owners.set(id, source);
    }
  }

  const constantIds = new Set();

  if (loaded.sections !== undefined) {
    for (const [exportName, value] of Object.entries(loaded.sections)) {
      if (/_ID$/.test(exportName) && typeof value === 'string') {
        constantIds.add(value);
        claim(value, `sections.js ${exportName}`);
      }
    }

    if (Array.isArray(loaded.sections.sections)) {
      loaded.sections.sections.forEach((section, index) => {
        const id = section?.id;
        if (hasText(id) && !constantIds.has(id)) {
          claim(id, `sections.js sections[${index + 1}]`);
        }
      });
    }
  }

  if (loaded.skills !== undefined && Array.isArray(loaded.skills.skillGroups)) {
    const groupIds = new Set();
    for (const group of loaded.skills.skillGroups) {
      if (hasText(group?.id)) groupIds.add(group.id);
    }
    for (const id of groupIds) claim(id, `skills.js grupp "${id}"`);
  }

  if (loaded.projects !== undefined && Array.isArray(loaded.projects.projects)) {
    /* Samma import som i checkProjects. Gick den inte att göra är felet redan
     * rapporterat där, och källan hoppas över. Alla poster räknas, inte bara de
     * som blir ett kort: ett ofullständigt projekt får sina id i samma stund
     * som det sista fältet fylls i, och krocken ska synas innan dess. */
    let cardIds;

    try {
      ({ cardIds } = await import(pathToFileURL(PROJECT_RULES).href));
    } catch {
      cardIds = undefined;
    }

    if (typeof cardIds === 'function') {
      const slugs = new Set();
      for (const project of loaded.projects.projects) {
        const slug = project?.slug;
        if (typeof slug === 'string' && /^[a-z0-9-]+$/.test(slug)) slugs.add(slug);
      }
      for (const slug of slugs) {
        for (const id of Object.values(cardIds(slug))) claim(id, `projects.js projekt "${slug}"`);
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
  profile: checkProfile,
};

const FONT_COVERAGE = readFontCoverage();

if (FONT_COVERAGE !== null) {
  /* UPPLYSNING, aldrig en grind: hur många teckenpunkter som har en glyf i
   * varje familj. ARKITEKTUR.md, M1d punkt 6. */
  const counts = Object.values(FONT_FAMILIES).map((family) => FONT_COVERAGE.get(family)?.size ?? 0);
  summary.push(`${counts[0]} tecken i ${FONT_FAMILIES.heading}, ${counts[1]} i ${FONT_FAMILIES.body}, ${counts[2]} i ${FONT_FAMILIES.mono}`);
}

/* Modulerna som gick att importera, nycklade på namnet i ACTIVE. Läses av
 * checkPageIds efter loopen. */
const loaded = {};

for (const name of ACTIVE) {
  const check = CHECKS[name];

  if (check === undefined) {
    /* Beslutat i ARKITEKTUR.md: M19 punkt 7.
     * Larmar här av samma skäl som en saknad fil larmar:
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

  loaded[name] = mod;
  const failedPosts = await check(mod);

  /* Teckengrinden gäller VARJE aktiv datafil, inte bara skills.js - en
   * sektionsrubrik eller en projekttitel kan bära samma tecken. För projects.js
   * läser den bara poster som datagrinden inte har fällt, och ingen post alls
   * om projects inte är en lista (ARKITEKTUR.md, M3b). Övriga exporter läses
   * som förut. */
  let fontMod = mod;

  if (name === 'projects') {
    fontMod = {
      ...mod,
      projects: Array.isArray(mod.projects) ? mod.projects.filter((_, index) => !failedPosts.has(index)) : [],
    };
  }

  checkFontSubset(`${name}.js`, fontMod, FONT_COVERAGE);
}

await checkPageIds(loaded);

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
