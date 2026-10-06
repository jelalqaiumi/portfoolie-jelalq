import styles from './Section.module.css';

function Section({ id, title, children, className }) {
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
   * Hero.module.css, som bär heros gråa bakgrund på samma sätt. */
  return (
    <section id={id} className={className}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default Section;
