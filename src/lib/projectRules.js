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

/* Beslutat i ARKITEKTUR.md: M11 */
/* Filtret. Varje funktion får redan kompletta projekt (projects.filter(isComplete)),
 * så att kort, räknare och live-rad räknar samma mängd. Kategorin null betyder
 * "Alla". */

/** @typedef {{ category: string|null, tech: string[], query: string }} ProjectFilterState */

/** Filtret utan något villkor. */
/** @type {ProjectFilterState} */
export const EMPTY_FILTER = { category: null, tech: [], query: '' };

/** Antal projekt per kategori i hela datan, oberoende av övriga val. */
/** @param {import('../data/projects.js').Project[]} projects  @returns {Record<string, number>} en nyckel per värde i PROJECT_CATEGORIES */
export function countByCategory(projects) {
  const counts = Object.fromEntries(PROJECT_CATEGORIES.map((category) => [category, 0]));
  for (const project of projects) {
    if (Object.hasOwn(counts, project.category)) counts[project.category] += 1;
  }
  return counts;
}

/** Varje teknik i datan en gång, flest projekt först, sedan i svensk bokstavsordning. */
/** @param {import('../data/projects.js').Project[]} projects  @returns {string[]} unika, flest projekt först, sedan localeCompare(…, 'sv') */
export function collectTech(projects) {
  const counts = new Map();
  for (const project of projects) {
    /* En teknik räknas en gång per projekt, även om den skulle stå två gånger
     * i samma lista. */
    for (const tech of new Set(project.tech)) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  return [...counts.keys()].sort(
    (a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b, 'sv'),
  );
}

/** Texten så som sökningen jämför den. Ingen diakritvikning: å, ä och ö är sig själva. */
/** @param {string} text  @returns {string} toLocaleLowerCase('sv-SE') och trim() */
export function normalizeText(text) {
  return text.toLocaleLowerCase('sv-SE').trim();
}

/** Projekten som uppfyller filtret, i datans ordning. Varje villkor smalnar av:
 * kategori OCH varje vald teknik OCH sökordet. */
/** @param {import('../data/projects.js').Project[]} projects  @param {ProjectFilterState} filter  @returns {import('../data/projects.js').Project[]} */
export function filterProjects(projects, filter) {
  const query = normalizeText(filter.query);
  return projects.filter((project) => {
    if (filter.category !== null && project.category !== filter.category) return false;
    if (!filter.tech.every((tech) => project.tech.includes(tech))) return false;
    if (query === '') return true;
    const haystack = normalizeText(
      `${project.title} ${project.description} ${project.category} ${project.tech.join(' ')}`,
    );
    return haystack.includes(query);
  });
}

/* Beslutat i ARKITEKTUR.md: M12b */
/** Samma projekt i samma ordning, jämfört på slug. filterProjects behåller datans
 *  ordning, så lika mängder slugs ger alltid lika ordning. */
/** @param {import('../data/projects.js').Project[]} a  @param {import('../data/projects.js').Project[]} b  @returns {boolean} */
export function sameSlugs(a, b) {
  return a.length === b.length && a.every((project, i) => project.slug === b[i].slug);
}
