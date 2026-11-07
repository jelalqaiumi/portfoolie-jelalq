import { useEffect, useRef } from 'react';
import CloseIcon from './CloseIcon.jsx';
import styles from './MobileMenu.module.css';

/* Fullskärmspanelen under brytpunkten. Beslutat i ARKITEKTUR.md, "M8 -
 * Mobilmenyn".
 *
 * INVARIANTEN: panelen finns i DOM bara när den är öppen, så att två
 * navlistor aldrig står i tillgänglighetsträdet samtidigt. Allt panelen gör
 * med sidan utanför sig - låst scroll, lyssnare, flyttat fokus - sätts när den
 * öppnas och tas tillbaka när den stängs eller avmonteras. */

const DESKTOP_QUERY = '(min-width: 900px)';
const FOCUSABLE = 'a[href], button:not([disabled])';

function MobileMenu({ id, open, onClose, links, currentId, cta, triggerRef }) {
  const panelRef = useRef(null);
  /* Det värde overflow hade innan panelen öppnades. Sparas i en ref så att
   * både länkklicket och städningen återställer samma värde. */
  const previousOverflow = useRef(null);

  function releaseScrollLock() {
    if (previousOverflow.current === null) return;
    document.documentElement.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  }

  /* Scroll-låset. Ingen global klass: det tidigare inline-värdet sparas och
   * återställs. */
  useEffect(() => {
    if (!open) return undefined;

    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return releaseScrollLock;
  }, [open]);

  /* Fokus in vid öppning och tillbaka till knappen vid stängning. */
  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const firstLink = panel?.querySelector('nav a[href]');
    const fallback = panel?.querySelector(FOCUSABLE);
    (firstLink ?? fallback)?.focus();

    const trigger = triggerRef.current;

    /* preventScroll: knappen ligger i den sticky naven och är redan i vy.
     * Efter ett länkklick får fokusflytten inte heller dra sidan tillbaka. */
    return () => trigger?.focus({ preventScroll: true });
  }, [open, triggerRef]);

  /* Esc stänger, och Tab/Shift+Tab cirkulerar inom panelen. Lyssnaren sitter
   * på dokumentet så att Esc fungerar oavsett var fokus råkar vara. */
  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = panel.contains(active);

      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  /* Passerar vyporten brytpunkten medan panelen är öppen stängs den: där
   * finns ingen knapp som kan stänga den. */
  useEffect(() => {
    if (!open) return undefined;

    const query = window.matchMedia(DESKTOP_QUERY);

    function onChange(event) {
      if (event.matches) onClose();
    }

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [open, onClose]);

  if (!open) return null;

  /* Låset hävs SYNKRONT här, före webbläsarens ankarhopp - med overflow:
   * hidden kvar på roten hade hoppet inte kunnat rulla sidan. Därefter
   * stängs panelen.
   *
   * Beslutat i ARKITEKTUR.md: M8b
   * Efter ett länkklick fortsätter Tab i målsektionen, aldrig i headern.
   * Städningen ovan flyttar fokus till hamburgern, men ankarhoppet som följer
   * tar över: webbläsaren lägger startpunkten för Tab i målsektionen. */
  function onLinkClick() {
    releaseScrollLock();
    onClose();
  }

  return (
    <div
      id={id}
      ref={panelRef}
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-label="Meny"
    >
      <div className={styles.bar}>
        <button type="button" className={styles.iconButton} onClick={onClose}>
          <CloseIcon />
          <span className="visually-hidden">Stäng meny</span>
        </button>
      </div>
      <nav className={styles.nav} aria-label="Huvudnavigering">
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.id}>
              {/* Samma aria-current-regel som i pillen: "true" eller ingenting. */}
              <a
                className={styles.link}
                href={`#${link.id}`}
                aria-current={link.id === currentId ? 'true' : undefined}
                onClick={onLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {cta && (
        <a className={styles.cta} href={cta.href} onClick={onLinkClick}>
          {cta.text}
        </a>
      )}
    </div>
  );
}

export default MobileMenu;
