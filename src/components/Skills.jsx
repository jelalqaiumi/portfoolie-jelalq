import Section from './Section.jsx';
import SkillChip from './SkillChip.jsx';
import { skillGroups } from '../data/skills.js';
import { sections, SKILLS_ID } from '../data/sections.js';
import styles from './Skills.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function Skills() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda. Finns ingen skills-post där renderar <Section> ingenting, och då
   * renderas inte heller sektionen - samma regel som gäller logga-länken:
   * ingenting som pekar på eller utger sig för att vara en sektion får finnas
   * utan att sektionen står i datan. */
  const section = sections.find((s) => s.id === SKILLS_ID);

  /* Hoppa över ofullständiga poster i stället för att rendera tomma element
   * (ARKITEKTUR.md, rättelse 3). En grupp utan id/title eller utan kompetenser
   * renderas inte alls, och en kompetens utan name blir inget chip - inte ett
   * tomt. Filtret ligger här, i den komponent som läser datan, så att
   * React-nyckeln name aldrig kan bli undefined. */
  const groups = skillGroups.filter(
    (group) =>
      hasText(group?.id) &&
      hasText(group?.title) &&
      Array.isArray(group?.skills) &&
      group.skills.some((skill) => hasText(skill?.name)),
  );

  return (
    /* Ett kort per grupp, gruppnamnet som h3 och kompetenserna som chips i en
       riktig lista. Beslutat i ARKITEKTUR.md, "A6 - Kortet, chipset och
       rutnätet".

       KORTETS RUBRIKRAD INNEHÅLLER BARA h3-texten: inget svg, inget dolt span
       och inget ::before-innehåll. Beslutat i ARKITEKTUR.md, "A3 - Inga
       ikoner", som också stänger dörren för ett ikonberoende. */
    <Section id={section?.id} title={section?.label}>
      <div className={styles.grid}>
        {groups.map((group) => (
          <div className={styles.card} key={group.id}>
            <h3 className={styles.cardTitle} id={group.id}>
              {group.title}
            </h3>

            {/* Varje kort är en riktig lista: skärmläsaren annonserar
                antalet, vilket är den enda "räkning" sidan behöver. */}
            <ul className={styles.chips}>
              {group.skills
                .filter((skill) => hasText(skill?.name))
                .map((skill) => (
                  <SkillChip key={skill.name} name={skill.name} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
