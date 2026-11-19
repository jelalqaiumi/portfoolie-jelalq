import Reveal from './Reveal.jsx';
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
        {/* Rubriken tonar in som en enhet (ARKITEKTUR.md, M12). Sektionsetiketten
            med numret ("01 / 04") är borttagen på Jelals begäran 2026-11-19. */}
        <Reveal>
          <h2 className={styles.title}>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export default Section;
