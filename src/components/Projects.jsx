import Section from './Section.jsx';
import ProjectCard from './ProjectCard.jsx';
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

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* En post måste ha id, title OCH description för att bli ett kort. Annars
 * renderas ingenting för den - hellre inget kort än ett med tom rubrik
 * (ARKITEKTUR.md, rättelse 3). Filtret ligger här, i komponenten som läser
 * datan, så att React-nyckeln id aldrig kan bli undefined. */
function isComplete(project) {
  return hasText(project?.id) && hasText(project?.title) && hasText(project?.description);
}

function Projects() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda. Finns ingen projects-post där renderar <Section> ingenting, och då
   * renderas inte heller sektionen - ingenting som utger sig för att vara en
   * sektion får finnas utan att sektionen står i datan. */
  const section = sections.find((s) => s.id === PROJECTS_ID);
  const visible = projects.filter(isComplete);

  return (
    /* "surface-light" är en GLOBAL klass i tokens.css, inte en modulklass.
       Den binder om färgtokenen för hela sektionen så att den får vit bakgrund.
       Samma mönster som "visually-hidden" i global.css: en sanktionerad global
       klass, därför en bokstavlig sträng och inte styles.x.

       YTAN FLYTTADES HIT FRÅN KOMPETENSER av Jelal 2026-10-07, i samma omgång
       som projekten flyttades upp före kompetenserna. Skälet är hans eget: han
       vill att projekten ska synas.

       ⚠️ KLASSEN BÄR MER ÄN EN BAKGRUND. Den binder om --color-border,
       --color-text-muted, --color-text-dim, --color-error och --color-focus för
       allt inuti sektionen - alltså även sektionsavgränsarens ton, kortens ram
       och fokusringen på kortens länkar. Flyttas den vidare till en annan
       sektion följer alla fem med. Läs "Ljus yta" i ARKITEKTUR.md innan den
       rörs; en flytt är inte en bakgrundsändring. */
    <Section id={section?.id} title={section?.label} className="surface-light">
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </Section>
  );
}

export default Projects;
