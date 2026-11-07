import { PROJECT_CATEGORIES } from '../data/projects.js';
import { PROJECT_SEARCH_ID } from '../data/sections.js';
import Chip from './Chip.jsx';
import SearchIcon from './SearchIcon.jsx';
import styles from './ProjectFilter.module.css';

/* Filterpanelen. Beslutat i ARKITEKTUR.md: M11.
 *
 * Komponenten är kontrollerad: Projects.jsx äger filtret och live-raden, och
 * panelen visar bara det filter den får och meddelar ett nytt via onChange.
 *
 * Segmenten är vanliga knappar med aria-pressed i en namngiven grupp, så att
 * det valda läget går att läsa programmatiskt och inte bara syns som färg.
 * Ett segment vars antal i hela datan är noll går inte att välja: det kan
 * bara ge ett tomt resultat. Det står ändå kvar, så att raden alltid visar
 * samma kategorier. Ordningen är ordningen i PROJECT_CATEGORIES.
 *
 * Tangentmodellen är Tab: segmenten är växlingsknappar i en grupp, inte en
 * radiogrupp, och har därför inga piltangenter. Ett valt segment kan inte
 * avmarkeras. Vägen tillbaka är "Alla", som har en ref (allRef) så att
 * Projects.jsx kan flytta fokus dit efter "Rensa filter".
 *
 * Segmentens antal räknas på hela datan och hoppar därför inte när andra val
 * ändras. Det kombinerade utfallet visar live-raden.
 *
 * Teknikchipsen kommer ur datan (techOptions), så ett chip finns bara för en
 * teknik som minst ett projekt har. Varje valt chip smalnar av utfallet.
 * Finns ingen teknik alls renderas ingen chipgrupp, i stället för en tom
 * grupp (LARDOMAR.md 2026-10-02, "rendera inget element alls").
 *
 * Sökfältet har en riktig etikett, dold för ögat men inte för hjälpmedel.
 * Placeholdern är aldrig fältets enda namn. */
function ProjectFilter({ counts, total, techOptions, filter, onChange, allRef }) {
  const segments = [
    { key: 'all', category: null, label: 'Alla', count: total },
    ...PROJECT_CATEGORIES.map((category) => ({
      key: category,
      category,
      label: category,
      count: counts[category] ?? 0,
    })),
  ];

  return (
    <div className={styles.panel}>
      <div role="group" aria-label="Kategori" className={styles.segments}>
        {segments.map(({ key, category, label, count }) => (
          <button
            key={key}
            ref={category === null ? allRef : undefined}
            type="button"
            className={styles.segment}
            aria-pressed={filter.category === category}
            disabled={count === 0}
            onClick={() => onChange({ ...filter, category })}
          >
            {/* Mellanslaget mellan de två spannen är det som skiljer etikett
              * och antal åt i knappens tillgängliga namn. */}
            <span className={styles.label}>{label}</span>{' '}
            <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>
      {/* Beslutat i ARKITEKTUR.md: M11b */}
      {/* Sökfältet står mellan segmenten och chipsen i DOM, så att panelens
        * rutnät lägger det bredvid segmenten och chipsen under dem utan någon
        * egen placeringsregel. DOM-ordningen är den visuella ordningen i båda
        * lägena, och tabbordningen följer den. */}
      <div className={styles.search}>
        <label className="visually-hidden" htmlFor={PROJECT_SEARCH_ID}>
          Sök projekt
        </label>
        <SearchIcon />
        <input
          type="search"
          id={PROJECT_SEARCH_ID}
          className={styles.searchInput}
          placeholder="Sök projekt"
          value={filter.query}
          onChange={(event) => onChange({ ...filter, query: event.target.value })}
        />
      </div>
      {techOptions.length > 0 && (
        <div role="group" aria-label="Teknik" className={styles.chips}>
          {techOptions.map((tech) => {
            const pressed = filter.tech.includes(tech);
            return (
              <Chip
                key={tech}
                pressed={pressed}
                onToggle={() =>
                  onChange({
                    ...filter,
                    tech: pressed
                      ? filter.tech.filter((t) => t !== tech)
                      : [...filter.tech, tech],
                  })
                }
              >
                {tech}
              </Chip>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectFilter;
