/* Reglerna för ett projekt, på ETT ställe. Beslutat i ARKITEKTUR.md, "M3 -
 * Projektdatan".
 *
 * Ren JavaScript utan React, JSX och DOM, så att både komponenterna och
 * scripts/validate-data.mjs kan importera filen. Då kan kortet, Om mig och
 * valideringens OK-rad inte glida isär: alla frågar samma funktion.
 */

import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '../data/projects.js';

/* Obligatoriskt textfält: ett fält med bara blanksteg är lika tomt som ett som
 * saknas (LARDOMAR.md 2026-10-02). */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* En adress räknas bara om den är en https-adress. Samma krav som grinden på
 * liveUrl och githubUrl i valideringen. */
function isHttpsUrl(value) {
  return typeof value === 'string' && value.startsWith('https://');
}

/** Kortets länkmål: liveUrl, annars githubUrl, annars inget. */
/** @param {import('../data/projects.js').Project} project  @returns {string|null} */
export function projectHref(project) {
  if (isHttpsUrl(project?.liveUrl)) return project.liveUrl;
  if (isHttpsUrl(project?.githubUrl)) return project.githubUrl;
  return null;
}

/* Beslutat i ARKITEKTUR.md: M3b */
/* isComplete prövar de krav som går att avgöra ur posten själv och som kortet
 * behöver för att renderas. Krav som kräver mer än en post (att bildfilerna
 * finns, att slug är unik) prövas bara av valideringen. Fält som kortet redan
 * tål i fel form prövas inte heller här: valideringen fäller dem i bygget. */

/** Samma krav som valideringen. Kort, filter, räknare, Om mig och OK-raden läser detta. */
/** @param {unknown} project  @returns {boolean} */
export function isComplete(project) {
  return (
    hasText(project?.slug)
    && /^[a-z0-9-]+$/.test(project.slug)
    && hasText(project?.title)
    && hasText(project?.description)
    && PROJECT_CATEGORIES.includes(project?.category)
    && PROJECT_STATUSES.includes(project?.status)
    && Array.isArray(project?.tech)
    && project.tech.every(hasText)
  );
}

/* Beslutat i ARKITEKTUR.md: R2 */
/* ProjectCard och valideringen läser samma funktion, så att suffixen bara står
 * på ett ställe. Valideringen prövar varje värde här mot alla andra id som
 * sidan sätter. */

/** Varje id ett projektkort sätter i DOM. */
/** @param {string} slug  @returns {{ item: string, title: string, desc: string, newTab: string }} */
export function cardIds(slug) {
  return {
    item: slug,
    title: `${slug}-title`,
    desc: `${slug}-desc`,
    newTab: `${slug}-newtab`,
  };
}
