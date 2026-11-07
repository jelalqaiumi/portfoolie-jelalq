import { PROJECT_IMAGE_WIDTHS } from '../data/projects.js';
import { cardIds, projectHref } from '../lib/projectRules.js';
import typeStyles from '../styles/type.module.css';
import Reveal from './Reveal.jsx';
import styles from './ProjectCard.module.css';

/* Ett projektkort. Beslutat i ARKITEKTUR.md: M4 "Kortets markup".
 *
 * Vilka poster som blir ett kort avgör isComplete i src/lib/projectRules.js.
 * Projects.jsx filtrerar med den innan kortet ens anropas.
 *
 * Hela kortet är EN länk när projectHref ger ett mål, så att tangentbord och
 * skärmläsare möter ett mål per projekt. Länkens namn är titeln plus att den
 * öppnas i ny flik, och beskrivningen blir dess beskrivning - aldrig hela
 * kortets text som en länkmening. Ger projectHref inget mål blir kortet ett
 * vanligt block: en länk utan mål är värre än ingen länk.
 *
 * INGET <header> eller <footer> här inne: den globala sidmarginalregeln i
 * global.css träffar de elementselektorerna. */
function ProjectCard({ project, index }) {
  const { slug, title, category, status, description, tech, image } = project;
  const href = projectHref(project);

  /* tech får vara tom array. Är den inte en array alls renderas ingen lista -
   * valideringen fäller det i bygget, men komponenten får inte krascha på
   * handredigerad data innan dess. */
  const techList = Array.isArray(tech) ? tech.filter((t) => typeof t === 'string' && t.trim() !== '') : [];

  /* Bilden är valfri. Utan bild behåller mediadelen sitt format och sin yta,
   * och logo-brickan står kvar. */
  const hasImage = typeof image === 'string' && image.trim() !== '';
  const imageSrc = (width) => `/assets/projects/${image}-${width}.webp`;

  /* Varje id kortet sätter kommer ur cardIds, som valideringen också läser:
   * en slug som krockar med ett annat id på sidan fälls i bygget. */
  const ids = cardIds(slug);

  const content = (
    <>
      <div className={styles.media}>
        {hasImage && (
          /* alt="" med avsikt: skärmdumpen är dekorativ inuti en länk vars namn
             är titeln. En beskrivande alt hade upprepat titeln i länkens namn. */
          <img
            className={styles.image}
            src={imageSrc(PROJECT_IMAGE_WIDTHS[0])}
            srcSet={PROJECT_IMAGE_WIDTHS.map((w) => `${imageSrc(w)} ${w}w`).join(', ')}
            sizes="(min-width: 900px) 380px, (min-width: 600px) 50vw, 100vw"
            width={PROJECT_IMAGE_WIDTHS[0]}
            height={PROJECT_IMAGE_WIDTHS[0] * 3 / 4}
            alt=""
            loading="lazy"
            decoding="async"
          />
        )}
        <span className={styles.brand} aria-hidden="true">{title}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={`${typeStyles.meta} ${styles.category}`}>{category}</span>
          <span className={styles.badge}>
            <span className={styles.dot} data-status={status} aria-hidden="true"></span>
            {status}
          </span>
        </div>
        {/* h3: h1 är hero, h2 är sektionsrubriken, projekttiteln ligger en
            nivå under den. */}
        <h3 className={styles.title} id={ids.title}>{title}</h3>
        <p className={styles.description} id={ids.desc}>{description}</p>
        {techList.length > 0 && (
          <ul className={styles.tags} aria-label="Tekniker">
            {techList.map((item) => (
              /* Nyckeln är projektets slug plus tekniknamnet: två projekt får
                 använda samma teknik. */
              <li className={`${typeStyles.tag} ${styles.tag}`} key={`${slug}-${item}`}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {href !== null && (
          <span className="visually-hidden" id={ids.newTab}>(öppnas i ny flik)</span>
        )}
      </div>
    </>
  );

  /* slug ligger på <li> som id: en länk till ett projekt ska landa på det
   * enskilda projektet. <li> renderas av Reveal (ARKITEKTUR.md, M12), med
   * modulklassen och id:t kvar, så att ankarmålet och scroll-marginalen följer
   * med. id:t på detta element gör att det bara tonas i opacitet, så ett
   * ankarhopp landar rätt (ARKITEKTUR.md, M12b). index är kortets stegnummer
   * i staggern och sätts av anroparen. */
  return (
    <Reveal as="li" index={index} className={styles.item} id={ids.item}>
      {href !== null ? (
        /* Ny flik, eftersom målet ligger utanför portfolion. rel: utan den får
           målsidan en referrer och tillgång till window.opener. */
        <a
          className={styles.card}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-labelledby={`${ids.title} ${ids.newTab}`}
          aria-describedby={ids.desc}
        >
          {content}
        </a>
      ) : (
        <div className={styles.card}>{content}</div>
      )}
    </Reveal>
  );
}

export default ProjectCard;
