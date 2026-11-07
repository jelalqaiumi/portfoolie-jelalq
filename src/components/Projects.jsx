import Section from './Section.jsx';
import ProjectCard from './ProjectCard.jsx';
import { isComplete } from '../lib/projectRules.js';
import { projects } from '../data/projects.js';
import { sections, PROJECTS_ID } from '../data/sections.js';
import styles from './Projects.module.css';

/* ===== TEXT SOM JELAL SKA GODKÄNNA ======================================
 * Raden som visas när projektlistan är tom. Texten är ett FÖRSLAG, inte ett
 * beslut - ARKITEKTUR.md säger bara "tomt läge på svenska" och tar inte
 * ställning till orden. Byt strängen nedan, ingen annan fil behöver röras.
 *
 * Avsiktligt INTE med: "kommer snart", "under uppbyggnad" och varje löfte om
 * en tidpunkt. Sidan ska inte lova något Jelal inte har sagt.
 * ======================================================================== */
const EMPTY_TEXT = 'Här lägger jag upp projekt jag har byggt. Än är listan tom.';

/* isComplete importeras ur src/lib/projectRules.js och definieras inte här:
 * samma predikat avgör i About.jsx om länkens mål kommer att renderas, och
 * valideringens OK-rad räknar med det. Filtret garanterar dessutom att
 * React-nyckeln slug aldrig kan bli undefined. */

function Projects() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda. Finns ingen projects-post där renderar <Section> ingenting, och då
   * renderas inte heller sektionen - ingenting som utger sig för att vara en
   * sektion får finnas utan att sektionen står i datan. */
  const section = sections.find((s) => s.id === PROJECTS_ID);
  const visible = projects.filter(isComplete);

  return (
    <Section id={section?.id} title={section?.label}>
      {visible.length === 0 ? (
        /* TOMT LÄGE. En kort rad, aldrig en tom yta. Villkoret står på
         * filtrerade listan och inte på projects.length: finns bara
         * ofullständiga poster renderas inga kort, och då är tomt läge det
         * sanna läget. Ett villkor på projects.length hade gett en rubrik
         * följd av ingenting alls. */
        <p className={styles.empty}>{EMPTY_TEXT}</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      )}
    </Section>
  );
}

export default Projects;
