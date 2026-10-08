import styles from './ProjectCard.module.css';

/* Obligatoriskt textfält ur src/data/: ett fält med bara blanksteg är lika
 * tomt som ett som saknas (LARDOMAR.md 2026-10-02). Samma uttryck används i
 * scripts/validate-data.mjs. */
function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/* En post måste ha id, title OCH description för att bli ett kort. Annars
 * renderas ingenting för den - hellre inget kort än ett med tom rubrik.
 *
 * PREDIKATET BOR HOS KORTET, som en namngiven export, därför att det är
 * kortets eget krav på en post. Projects.jsx filtrerar med det, och About.jsx
 * frågar med det om länkens mål faktiskt kommer att renderas. Två kopior av
 * samma villkor kan glida isär; en export kan det inte. */
export function isComplete(project) {
  return hasText(project?.id) && hasText(project?.title) && hasText(project?.description);
}

/* Ett projektkort. Tar hela project-objektet, enligt komponenttabellen i
 * ARKITEKTUR.md. Ren presentation: inget state, ingen logik utöver att
 * utesluta länkar som inte finns.
 *
 * INGET <footer> HÄR INNE, och inget <header>. Den globala sidmarginalregeln i
 * global.css använder elementselektorerna header, footer och section[id], så
 * ett <footer> inuti kortet hade fått oväntad vågrät padding. ARKITEKTUR.md
 * varnar uttryckligen för det ("Var sidmarginalen bor"). Länkraden är därför en
 * <div> med en modulklass.
 *
 * Kortet är ett <li>: listan i Projects.jsx är en <ul>, så skärmläsaren
 * annonserar antalet projekt. <article> inuti ger kortet en egen gräns i
 * dokumentstrukturen.
 */
function ProjectCard({ project }) {
  const { id, title, description, tech, url, repoUrl } = project;

  /* Länkar renderas BARA när de finns. Strikt kontroll mot en icke-tom sträng,
   * inte mot sanningsvärde: null, undefined, tom sträng och enbart blanksteg
   * ska alla ge ingen länk. Aldrig href="#", aldrig en tom <a> - en länk utan
   * mål är värre än ingen länk, både för den som klickar och för en
   * skärmläsare som annonserar den. */
  const hasUrl = typeof url === 'string' && url.trim() !== '';
  const hasRepo = typeof repoUrl === 'string' && repoUrl.trim() !== '';

  /* tech får vara tom array. Är den inte en array alls renderas ingen lista -
   * valideringen fäller det i bygget, men komponenten får inte krascha på
   * handredigerad data innan dess. */
  const techList = Array.isArray(tech) ? tech.filter((t) => typeof t === 'string' && t.trim() !== '') : [];

  /* id ligger på kortet, inte på sektionen: en länk till ett projekt ska landa
   * på det enskilda projektet. Kortets scroll-marginal räknas i modulen ur
   * samma token och samma uttryck som sektionernas i global.css, så att de två
   * inte kan driva isär. */
  return (
    <li className={styles.card} id={id}>
      <article>
        {/* h3: h1 är hero, h2 är sektionsrubriken, projekttiteln ligger en
            nivå under den (ARKITEKTUR.md, "Ankarnavigering", punkt 5). */}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {techList.length > 0 && (
          <ul className={styles.tech}>
            {techList.map((item) => (
              /* Nyckeln är projektets id plus tekniknamnet: två projekt får
                 använda samma teknik, så tekniknamnet ensamt är inte unikt
                 över hela sidan. */
              <li className={styles.techItem} key={`${id}-${item}`}>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* EJ I ARKITEKTUR: om länkarna ska öppnas i ny flik, och vad
            etiketterna ska heta.
            Ny flik valt för att länkarna pekar bort från portfolion och
            besökaren annars tappar den. rel="noreferrer" följer med
            target="_blank": utan den får målsidan en referrer och tillgång
            till window.opener. */}
        {(hasUrl || hasRepo) && (
          <div className={styles.links}>
            {hasUrl && (
              <a className={styles.link} href={url} target="_blank" rel="noreferrer">
                Till projektet
              </a>
            )}
            {hasRepo && (
              <a className={styles.link} href={repoUrl} target="_blank" rel="noreferrer">
                Kod
              </a>
            )}
          </div>
        )}
      </article>
    </li>
  );
}

export default ProjectCard;
