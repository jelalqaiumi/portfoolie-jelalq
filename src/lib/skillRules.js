/* Beslutat i ARKITEKTUR.md: M14b
 *
 * Urvalet av kompetenser som blir chips, på ETT ställe. Ren JavaScript utan
 * React, JSX och DOM. Kompetenssektionen och nyckeltalen frågar samma funktion,
 * så att talet och chipsen inte kan glida isär. */

/* Obligatoriskt textfält: ett fält med bara blanksteg är lika tomt som ett som
 * saknas (LARDOMAR.md 2026-10-02). */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/** Grupperna som kompetenssektionen renderar, i datans ordning, var och en med
 *  bara de kompetenser som blir chips. En grupp renderas om id och title har
 *  text och minst en kompetens har ett name med text. Ej array in ger []. */
/** @param {unknown} skillGroups  @returns {{ id: string, title: string, skills: { name: string }[] }[]} */
export function renderedSkillGroups(skillGroups) {
  if (!Array.isArray(skillGroups)) return [];

  const groups = [];
  for (const group of skillGroups) {
    if (!hasText(group?.id) || !hasText(group?.title) || !Array.isArray(group?.skills)) continue;

    const skills = group.skills.filter((skill) => hasText(skill?.name));
    if (skills.length === 0) continue;

    /* En ny grupp med den filtrerade listan. Indata ändras inte. */
    groups.push({ ...group, skills });
  }
  return groups;
}
