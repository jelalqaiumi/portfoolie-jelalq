import Section from './Section.jsx';
import SkillPill from './SkillPill.jsx';
import { skillGroups } from '../data/skills.js';
import { sections, SKILLS_ID } from '../data/sections.js';
import styles from './Skills.module.css';

/* ===== TEXT SOM JELAL SKA GODKÄNNA ======================================
 * Teckenförklaringen under rubriken. Texten är ett FÖRSLAG, inte ett beslut -
 * den ska godkännas eller ersättas av Jelal. Byt strängen nedan, ingen annan
 * fil behöver röras.
 *
 * Raden säger bara vad den orange färgen betyder - ingen nivå, inget filter,
 * ingen räknare.
 *
 * Den säger medvetet INGENTING om de dämpade posterna. Jelal strök meningen
 * "Övriga är ännu inte markerade" 2026-10-07. Varje påstående om hans
 * förhållande till det omarkerade är det bara han som kan göra, och han har
 * valt att inte göra något.
 *
 * Raden renderas ALLTID, aldrig villkorad på antalet ifyllda. En rad som
 * försvinner av sig själv när det sista skillet markeras är ett tyst
 * tillståndsbyte. Den fungerar som teckenförklaring i båda lägena.
 * ======================================================================== */
const LEGEND = 'De orange har jag arbetat med.';

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
   * (ARKITEKTUR.md, rättelse 3). En grupp utan id/title eller utan skills
   * renderas inte alls, och en skill utan name blir ingen pill - inte en tom
   * pill. Filtret ligger här, i den komponent som läser datan, så att
   * React-nyckeln name aldrig kan bli undefined. */
  const groups = skillGroups.filter(
    (group) =>
      hasText(group?.id) &&
      hasText(group?.title) &&
      Array.isArray(group?.skills) &&
      group.skills.some((skill) => hasText(skill?.name)),
  );

  return (
    /* DEN LJUSA YTAN LÅG HÄR fram till 2026-10-07. Jelal har flyttat den till
       projektsektionen: han flyttade upp projekten för att de ska synas, och en
       ljus yta direkt efter hero är det mest iögonfallande sidan har.
       className="surface-light" står nu i Projects.jsx.

       FÖLJDEN FÖR DENNA SEKTION, uppmätt: pillarna är tillbaka på mörk botten.
       De ifyllda låg på 2,58:1 mot den vita ytan, ett avsteg från WCAG 1.4.11
       som arkitekturen uttryckligen accepterade. Mot --color-bg är de 6,95:1
       igen, så avsteget upphör av sig självt - det behöver inte längre stå som
       ett accepterat undantag.

       Sektionen ärver nu sidans mörka ytas token utan ombindning. Sätt inte
       tillbaka klassen här utan att först läsa "Ljus yta" i ARKITEKTUR.md: den
       binder om --color-border, --color-text-muted, --color-text-dim,
       --color-error och --color-focus för hela sektionen, och alla fem gäller
       numera projekten. */
    <Section id={section?.id} title={section?.label}>
      <p className={styles.legend}>{LEGEND}</p>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div className={styles.group} key={group.id}>
            <h3 className={styles.groupTitle} id={group.id}>
              {group.title}
            </h3>

            {/* Varje grupp är en riktig lista: skärmläsaren annonserar
                antalet, vilket är den enda "räkning" sidan behöver. */}
            <ul className={styles.pills}>
              {group.skills
                .filter((skill) => hasText(skill?.name))
                .map((skill) => (
                  <SkillPill key={skill.name} name={skill.name} filled={skill.filled} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
