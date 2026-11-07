/* Nyckeltalen i Om mig, räknade ur datan. Beslutat i ARKITEKTUR.md, M14
 * "Nyckeltalen" och M14b.
 *
 * Ren JavaScript utan React, JSX och DOM. Inget tal står skrivet här: varje
 * värde räknas ur de listor sidan renderar, så att ett projekt eller en
 * kompetens som läggs till eller tas bort syns i talet utan att någon
 * komponent rörs. Ett tal som ingen har gett finns inte med, och ett tal som
 * är 0 tas inte med i listan. */

import { isComplete } from './projectRules.js';
import { renderedSkillGroups } from './skillRules.js';

/**
 * @param {{ projects: unknown[], skillGroups: unknown[] }} data
 * @returns {{ key: string, value: number, label: string }[]}
 */
export function keyFigures({ projects, skillGroups }) {
  const completeProjects = Array.isArray(projects) ? projects.filter(isComplete).length : 0;

  /* Invarianten: talet är antalet chips kompetenssektionen visar. Därför samma
   * funktion som sektionen läser, och en summa i stället för en mängd, eftersom
   * chipsen inte dedupliceras. */
  const renderedSkills = renderedSkillGroups(skillGroups).reduce(
    (sum, group) => sum + group.skills.length,
    0,
  );

  return [
    { key: 'projects', value: completeProjects, label: 'Projekt' },
    { key: 'skills', value: renderedSkills, label: 'Kompetenser' },
  ].filter((figure) => figure.value !== 0);
}
