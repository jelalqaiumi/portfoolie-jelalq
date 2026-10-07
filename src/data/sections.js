/* Sidans sektioner och navigationen.
 *
 * "sections" betyder: DE NAVIGERBARA SEKTIONERNA, I ORDNING.
 *
 * Detta är ENDA sanningskällan för både sektionernas id och navlänkarna.
 * Ett id står alltså bara skrivet på ett ställe i hela projektet, och
 * navlänken kan därför aldrig peka på en sektion som inte finns.
 *
 * ORDNINGEN I LISTAN ÄR ORDNINGEN PÅ SIDAN, och det löftet är sant igen.
 * App.jsx mappar över denna lista och slår upp komponenten i en tabell, så
 * sidans ordning kan inte längre glida ifrån navets. Tidigare renderade
 * App.jsx namngivna komponenter i en egen fast ordning, och då bodde ordningen
 * på två ställen - en omordning här hade bytt navets ordning men inte sidans,
 * utan att något larmade. Beslutat i ARKITEKTUR.md, "sections.js blir åter
 * enda källan för sidans ordning".
 *
 * Vill du byta rubriktext i navigationen: ändra "label" här - ingen
 * komponentfil behöver röras.
 * Vill du byta ordning på sektionerna: flytta en rad i listan nedan - det är
 * nu den enda redigering som behövs.
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
 * enskilt id (logga-länken, Hero.jsx egen <section id>, uppslaget i App.jsx).
 * Ett sektions-id får aldrig förekomma som bokstavlig sträng i en .jsx-fil.
 *
 * HERO_ID står kvar som export trots att hero inte ligger i listan: både
 * logga-länken i headern och Hero.jsx behöver den. */
export const HERO_ID = 'hero';
export const PROJECTS_ID = 'projects';
export const SKILLS_ID = 'skills';
export const ABOUT_ID = 'about';
export const CONTACT_ID = 'contact';
export const MAIN_ID = 'main'; // <main id>, mål för skip-länken

/* ORDNINGEN ÄR JELALS, beslutad 2026-10-07: projekt FÖRE kompetenser, och en
 * liten sektion "om mig" mellan kompetenser och kontakt. Hans eget skäl är att
 * kompetenssektionen är sidans högsta och att projekten låg bakom den.
 *
 * Sidan blir alltså: hero, projekt, kompetenser, om mig, kontakt. Hero ligger
 * utanför listan och renderas först. */
/** @type {SectionDef[]} */
export const sections = [
  { id: PROJECTS_ID, label: 'Projekt' },
  { id: SKILLS_ID, label: 'Kompetenser' },
  { id: ABOUT_ID, label: 'Om mig' },
  { id: CONTACT_ID, label: 'Kontakt' },
];
