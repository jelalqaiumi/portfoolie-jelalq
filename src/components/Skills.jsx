import Section from './Section.jsx';
import SkillChip from './SkillChip.jsx';
import Reveal, { REVEAL_INDEX_MAX } from './Reveal.jsx';
import { skillGroups } from '../data/skills.js';
import { renderedSkillGroups } from '../lib/skillRules.js';
import { sections, SKILLS_ID } from '../data/sections.js';
import typeStyles from '../styles/type.module.css';
import styles from './Skills.module.css';

function Skills() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda. Finns ingen skills-post där renderar <Section> ingenting, och då
   * renderas inte heller sektionen - samma regel som gäller logga-länken:
   * ingenting som pekar på eller utger sig för att vara en sektion får finnas
   * utan att sektionen står i datan. */
  const section = sections.find((s) => s.id === SKILLS_ID);

  /* Vilka grupper och kompetenser som renderas avgörs i src/lib/skillRules.js
   * (ARKITEKTUR.md, M14b), som nyckeltalen också läser. Komponenten renderar det
   * den får: varje grupp har text i id och title, och varje kompetens har ett
   * name med text, så React-nyckeln name kan aldrig bli tom. */
  const groups = renderedSkillGroups(skillGroups);

  return (
    /* Ett kort per grupp, gruppnamnet som h3 och kompetenserna som chips i en
       riktig lista. Kortet och rutnätet är beslutade i ARKITEKTUR.md, "A6 -
       Kortet, chipset och rutnätet", och chipsen i "M15 - Kompetenschipsen".

       KORTETS RUBRIKRAD INNEHÅLLER BARA h3-texten: inget svg, inget dolt span
       och inget ::before-innehåll. En ikon i projektet bär en funktion och
       står bredvid en text som säger samma sak, och en ikon vid ett
       gruppnamn hade bara upprepat rubriken. Ikonerna är egna inline-SVG,
       inget beroende. Beslutat i ARKITEKTUR.md, "M9 - Ikonerna". */
    <Section id={section?.id} title={section?.label}>
      <div className={styles.grid}>
        {/* Varje kort tonar in med sitt stegnummer, taket ur Reveal.jsx
            (ARKITEKTUR.md, M12 "Staggern"). */}
        {groups.map((group, i) => (
          <Reveal className={styles.card} key={group.id} index={Math.min(i, REVEAL_INDEX_MAX)}>
            {/* Gruppnamnet i mono-eyebrow-stilen, typklassen först (ARKITEKTUR.md,
                M15 och M1). Elementet är fortfarande h3, så rubrikordningen
                ändras inte. */}
            <h3 className={`${typeStyles.meta} ${styles.cardTitle}`} id={group.id}>
              {group.title}
            </h3>

            {/* Varje kort är en riktig lista: skärmläsaren annonserar
                antalet, så kortet skriver inget eget antal. */}
            <ul className={styles.chips}>
              {group.skills.map((skill) => (
                <SkillChip key={skill.name} name={skill.name} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
