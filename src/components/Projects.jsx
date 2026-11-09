import { useEffect, useRef, useState } from 'react';
import Section, { SURFACE_LIGHT } from './Section.jsx';
import ProjectCard from './ProjectCard.jsx';
import ProjectFilter from './ProjectFilter.jsx';
import Reveal, { REVEAL_INDEX_MAX } from './Reveal.jsx';
import {
  isComplete,
  EMPTY_FILTER,
  countByCategory,
  collectTech,
  filterProjects,
  sameSlugs,
} from '../lib/projectRules.js';
import { projects } from '../data/projects.js';
import { sections, PROJECTS_ID } from '../data/sections.js';
import typeStyles from '../styles/type.module.css';
import styles from './Projects.module.css';

/* ===== TEXT SOM JELAL SKA GODKÄNNA ======================================
 * Raden som visas när projektlistan är tom. Texten är ett FÖRSLAG, inte ett
 * beslut: orden väntar på Jelals godkännande. Byt strängen nedan, ingen annan
 * fil behöver röras.
 *
 * Avsiktligt INTE med: "kommer snart", "under uppbyggnad" och varje löfte om
 * en tidpunkt. Sidan ska inte lova något Jelal inte har sagt.
 * ======================================================================== */
const EMPTY_TEXT = 'Här lägger jag upp projekt jag har byggt. Än är listan tom.';

/* isComplete importeras ur src/lib/projectRules.js och definieras inte här:
 * samma predikat avgör i About.jsx om länkens mål kommer att renderas, och
 * valideringens OK-rad räknar med det. Filtret garanterar dessutom att
 * React-nyckeln slug aldrig kan bli undefined. */

/* Uttoningens längd läses ur tokenet, så att tiden bara står på ett ställe.
 * Går värdet inte att tolka byts listan direkt, utan fördröjning: en
 * felaktig tid får aldrig lämna rutnätet utan kort. */
function fadeOutMs() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--duration-fast')
    .trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) {
    return 0;
  }
  return raw.endsWith('ms') ? value : value * 1000;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Projects() {
  /* Rubriken och id:t hämtas ur sections.js, som är enda sanningskällan för
   * båda. Finns ingen projects-post där renderar <Section> ingenting, och då
   * renderas inte heller sektionen - ingenting som utger sig för att vara en
   * sektion får finnas utan att sektionen står i datan. */
  const section = sections.find((s) => s.id === PROJECTS_ID);
  const visible = projects.filter(isComplete);

  /* Filtret ägs här (ARKITEKTUR.md, M11). Antalen räknas på alla kompletta
   * projekt, korten och live-raden på den visade listan nedan. Inget antal
   * står skrivet i koden: allt räknas ur datan vid varje rendering. */
  const [filter, setFilter] = useState(EMPTY_FILTER);

  /* TVÅ LISTOR: den filtrerade och den visade (displayed). Beslutat i
   * ARKITEKTUR.md, M12 "In- och uttoning vid filtrering" och M12b. Vid en
   * ändring tonar rutnätet ut, och först när uttoningen är klar byts de visade
   * korten. En fas startar bara när mängden projekt ändras: en ändring som ger
   * samma projekt som det som annars visas härnäst gör ingenting med
   * rutnätet. Varje fas som startar rensar föregående timeout, så den visade
   * listan blir alltid den senaste. Med reducerad rörelse byts listan direkt.
   * Live-raden och korten läser samma lista, så siffran och korten byts i
   * samma rendering. */
  const [displayed, setDisplayed] = useState(() => filterProjects(visible, EMPTY_FILTER));
  const [fading, setFading] = useState(false);
  const timer = useRef(null);
  /* Listan som den pågående timeouten kommer att visa, eller null. */
  const pending = useRef(null);
  const allSegmentRef = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function changeFilter(next) {
    setFilter(next);
    const nextShown = filterProjects(visible, next);
    const target = pending.current ?? displayed;

    if (sameSlugs(nextShown, target)) {
      return;
    }

    clearTimeout(timer.current);
    pending.current = null;

    if (sameSlugs(nextShown, displayed)) {
      setFading(false);
      return;
    }

    const delay = prefersReducedMotion() ? 0 : fadeOutMs();

    if (delay === 0) {
      setDisplayed(nextShown);
      setFading(false);
      return;
    }

    pending.current = nextShown;
    setFading(true);
    timer.current = setTimeout(() => {
      pending.current = null;
      setDisplayed(nextShown);
      setFading(false);
    }, delay);
  }

  return (
    <Section id={section?.id} title={section?.label} surface={SURFACE_LIGHT}>
      {visible.length === 0 ? (
        /* TOMT LÄGE. En kort rad, aldrig en tom yta. Villkoret står på
         * filtrerade listan och inte på projects.length: finns bara
         * ofullständiga poster renderas inga kort, och då är tomt läge det
         * sanna läget. Ett villkor på projects.length hade gett en rubrik
         * följd av ingenting alls. */
        <p className={styles.empty}>{EMPTY_TEXT}</p>
      ) : (
        <>
          <Reveal>
            <ProjectFilter
              counts={countByCategory(visible)}
              total={visible.length}
              techOptions={collectTech(visible)}
              filter={filter}
              onChange={changeFilter}
              allRef={allSegmentRef}
            />
          </Reveal>
          {/* Live-raden står under panelen, utanför den. Versalerna kommer
            * från typklassen, så att skärmläsaren läser ord och inte
            * bokstäver. polite låter den slå ihop snabba ändringar. */}
          <p
            aria-live="polite"
            aria-atomic="true"
            className={`${typeStyles.meta} ${styles.liveRow}`}
          >
            Visar {displayed.length} av {visible.length} projekt
          </p>
          {displayed.length === 0 ? (
            /* NOLL TRÄFFAR. Gränssnittstext, inte ett påstående om Jelal
              * (ARKITEKTUR.md, M11 "Noll träffar"). Knappen återställer hela
              * filtret, även sökfältet, eftersom det är kontrollerat. Fokus
              * flyttas sedan till "Alla", som alltid finns och är aktivt, så
              * att fokus inte försvinner med knappen (ARKITEKTUR.md, M11b). */
            <div className={styles.noMatch}>
              <p className={styles.empty}>Inga projekt matchar filtret.</p>
              <button
                type="button"
                className={styles.clear}
                onClick={() => {
                  changeFilter(EMPTY_FILTER);
                  allSegmentRef.current?.focus();
                }}
              >
                Rensa filter
              </button>
            </div>
          ) : (
            <ul className={styles.grid} data-phase={fading ? 'out' : undefined}>
              {displayed.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={Math.min(i, REVEAL_INDEX_MAX)}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </Section>
  );
}

export default Projects;
