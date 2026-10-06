/* Sidans sektioner och navigationen.
 *
 * "sections" betyder: DE NAVIGERBARA SEKTIONERNA, I ORDNING.
 *
 * Detta är ENDA sanningskällan för både sektionernas id och navlänkarna.
 * Ett id står alltså bara skrivet på ett ställe i hela projektet, och
 * navlänken kan därför aldrig peka på en sektion som inte finns.
 *
 * Ordningen i listan är ordningen på sidan.
 * Vill du byta rubriktext i navigationen: ändra "label" här - ingen
 * komponentfil behöver röras.
 *
 * OBS: "label" används BARA till navlänk och <h2>. Sidans <h1> skrivs i
 * Hero.jsx och får aldrig läsas härifrån.
 *
 * HERO LIGGER INTE I LISTAN. Beslutat i ARKITEKTUR.md, "Hero-posten tas bort
 * ur sections". Hero renderas alltid av App och är inget navmål - loggan i
 * headern är länken tillbaka till toppen. Posten var mätbart död data: utdata
 * med posten kvar var identisk med utdata utan den. scripts/validate-data.mjs
 * kontrollerar att HERO_ID inte smyger tillbaka in i listan.
 *
 * Det finns INGET inNav-fält. Med hero borta hade alla poster haft samma värde,
 * och ett fält med samma värde på varje post är dött - exakt samma fel som
 * "label" på hero. Tillkommer en sektion som inte ska synas i navet är det ett
 * eget beslut att införa fältet igen, med ett verkligt användningsfall bakom.
 */

/**
 * @typedef {Object} SectionDef
 * @property {string} id     Unikt, gemener, a-z. Blir <section id="..."> och href="#..."
 * @property {string} label  OBLIGATORISK på varje post, inga undantag.
 *                           Svensk text i navigationen och som h2-rubrik.
 */

/* Id:na exporteras som namngivna konstanter eftersom kod ibland behöver ett
 * enskilt id (logga-länken, Hero.jsx egen <section id>). Ett sektions-id får
 * aldrig förekomma som bokstavlig sträng i en .jsx-fil.
 *
 * HERO_ID står kvar som export trots att hero inte ligger i listan: både
 * logga-länken i headern och Hero.jsx behöver den. */
export const HERO_ID = 'hero';
export const SKILLS_ID = 'skills';
export const PROJECTS_ID = 'projects';
export const CONTACT_ID = 'contact';
export const MAIN_ID = 'main'; // <main id>, mål för skip-länken i paket 7

/** @type {SectionDef[]} */
export const sections = [
  { id: SKILLS_ID, label: 'Kompetenser' },
  { id: PROJECTS_ID, label: 'Projekt' },
  { id: CONTACT_ID, label: 'Kontakt' },
];
