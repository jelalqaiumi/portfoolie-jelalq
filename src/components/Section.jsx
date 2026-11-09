import Reveal from './Reveal.jsx';
import { sections } from '../data/sections.js';
import { sectionIndexLabel } from '../lib/sectionLabel.js';
import typeStyles from '../styles/type.module.css';
import styles from './Section.module.css';

/* Det enda värdet utöver standardytan. Beslutat i ARKITEKTUR.md: M23. */
export const SURFACE_LIGHT = 'light';

function Section({ id, title, children, className, surface }) {
  /* Ofullständig datapost: rendera inget element alls i stället för en sektion
   * med ett tomt <h2></h2>. En label med bara blanksteg är lika tom som en
   * som saknas - därför trim(), inte bara en truthy-kontroll. */
  if (!id || typeof title !== 'string' || title.trim() === '') {
    return null;
  }

  /* Etikettens nummer räknas ur sections.js, så att en omordning eller en ny
   * post följer med utan att någon komponent rörs. Finns id:t inte i listan
   * finns inget nummer, och då renderas ingen etikett alls i stället för en
   * halv. Beslutat i ARKITEKTUR.md, M13. */
  const indexLabel = sectionIndexLabel(sections, id);

  /* Modulen har ingen egen klass på sektionsroten, så "className" skickas
   * vidare ensam. Sidomarginalen ligger på section[id] i global.css, och
   * linjen mellan sektioner ligger också där, som syskonselektorn
   * section[id] + section[id]. Behöver roten egen stil läggs klassen tillbaka
   * i Section.module.css och sätts före className här - jämför .hero i
   * Hero.module.css, som bär heros bakgrund på samma sätt. Ytan sätts som
   * attribut på roten, inte som klass, och tokens.css binder om färgerna för
   * den (ARKITEKTUR.md, M23). */
  return (
    <section
      id={id}
      className={className}
      data-surface={surface === SURFACE_LIGHT ? SURFACE_LIGHT : undefined}
    >
      <div className={styles.inner}>
        {/* Rubriken tonar in som en enhet (ARKITEKTUR.md, M12). Omslaget är
            till för hela rubrikblocket, så att etiketten ovanför h2 följer
            med utan en ny Reveal. */}
        <Reveal>
          {/* Etiketten är dold för skärmläsare: den upprepar rubriken med ett
              nummer, och numret säger inget som rubriknavigeringen inte redan
              ger. Versalerna kommer från typklassen, inte från texten. */}
          {indexLabel !== null && (
            <p className={`${typeStyles.meta} ${styles.label}`} aria-hidden="true">
              {indexLabel} · {title}
            </p>
          )}
          <h2 className={styles.title}>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export default Section;
