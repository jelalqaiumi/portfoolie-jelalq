import Reveal from './Reveal.jsx';
import { keyFigures } from '../lib/keyFigures.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import typeStyles from '../styles/type.module.css';
import styles from './KeyFigures.module.css';

/* Nyckeltalsraden i Om mig. Beslutat i ARKITEKTUR.md, M14 "Nyckeltalen".
 *
 * En beskrivningslista: etiketten är termen och siffran är dess värde, så att
 * skärmläsaren läser dem som ett par, etiketten först. Siffran står ändå överst
 * på skärmen, och det gör CSS:en utan att ändra ordningen i DOM.
 *
 * Talen räknas ur datan i src/lib/keyFigures.js. Ingen siffra står här. Ett tal
 * som är 0 visas inte, och blir listan tom renderas ingen rad alls i stället för
 * en tom (ARKITEKTUR.md, M14b). */
function KeyFigures() {
  const figures = keyFigures({ projects, skillGroups });

  if (figures.length === 0) return null;

  return (
    /* Raden tonar in som en enhet (ARKITEKTUR.md, M12 "Var Reveal sitter"). */
    <Reveal as="dl" className={styles.list}>
      {figures.map((figure) => (
        <div className={styles.item} key={figure.key}>
          <dt className={typeStyles.meta}>{figure.label}</dt>
          <dd className={styles.value}>{figure.value}</dd>
        </div>
      ))}
    </Reveal>
  );
}

export default KeyFigures;
