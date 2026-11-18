import { SURFACE_LIGHT } from './Section.jsx';
import styles from './Chip.module.css';

/* Det gemensamma chipset. Beslutat i ARKITEKTUR.md: M15.
 *
 * Med onToggle är chipset en växlingsknapp, och det valda läget står i
 * aria-pressed så att det går att läsa programmatiskt och inte bara syns som
 * färg. Utan onToggle är det bara text. Ytan (surface) gäller bara chipset som
 * text: en knapp får aldrig den ljusa ytan. Beslutat i ARKITEKTUR.md: M25. */
function Chip({ children, pressed, onToggle, surface }) {
  if (onToggle) {
    return (
      <button
        type="button"
        className={styles.chip}
        aria-pressed={pressed}
        onClick={onToggle}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={styles.chip} data-surface={surface === SURFACE_LIGHT ? SURFACE_LIGHT : undefined}>
      {children}
    </span>
  );
}

export default Chip;
