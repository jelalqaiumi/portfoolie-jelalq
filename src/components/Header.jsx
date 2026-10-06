import { sections, HERO_ID } from '../data/sections.js';
import styles from './Header.module.css';

/* HELA listan mappas - "sections" ÄR de navigerbara sektionerna, i ordning
 * (ARKITEKTUR.md, "Hero-posten tas bort ur sections"). Inget inNav-filter
 * finns kvar: fältet är borta ur datamodellen.
 *
 * Kvar står bara fullständighetskontrollen: poster utan id, eller med en label
 * som är tom eller bara blanksteg, hoppas över - en navlänk utan mål eller utan
 * tillgängligt namn renderas inte alls (ARKITEKTUR.md, rättelse 3; LARDOMAR.md
 * om label med bara blanksteg). Det är inget urval ur listan utan ett skydd mot
 * trasig handredigerad data. */
const navSections = sections.filter(
  (section) =>
    section.id && typeof section.label === 'string' && section.label.trim() !== '',
);

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Hero-sektionen renderas alltid av App, oberoende av sections.js, så
            detta ankare har alltid ett mål.

            Beslutat i ARKITEKTUR.md, "Headerns logotyp": loggan är EN länk som
            innehåller två saker - det beskurna JQ-monogrammet som ikon och
            namnet som riktig HTML-text. Lockupen logo.png visas inte längre i
            headern; dess ordbild var oläslig i 44 px.

            Ikonen är den TAJTA, icke-kvadratiska varianten (ARKITEKTUR.md,
            "Ikonens optiska storlek"). width/height är filens egna mått
            (96 x 72) så att ingen layout shift uppstår; CSS skalar den till
            36 px höjd, alltså 48 x 36 px på skärmen. Den kvadratiska varianten
            används fortfarande där kvadrat KRÄVS: favicon och apple-touch.

            Ikonen har alt="" + aria-hidden i ALLA bredder, så att länkens
            tillgängliga namn kommer helt från textnoden och "Jelal Qaiumi"
            läses upp exakt en gång. Ingen aria-label - den hade dubblerat
            textnoden. */}
        <a className={styles.logoLink} href={`#${HERO_ID}`}>
          <img
            className={styles.logo}
            src="/assets/logo-mark-tight-96.png"
            srcSet="/assets/logo-mark-tight-96.png 96w, /assets/logo-mark-tight-192.png 192w"
            /* sizes = ikonens CSS-bredd, nu 48px enligt ARKITEKTUR.md,
               "Ikonens optiska storlek": det är det som får w-beskrivningarna
               att landa rätt - 1x och 2x behöver 48 respektive 96 px och får
               96w, 3x-4x behöver 144-192 px och får 192w. Utan sizes antar
               webbläsaren 100vw och hämtar alltid den största filen. */
            sizes="48px"
            alt=""
            aria-hidden="true"
            width="96"
            height="72"
          />
          {/* Under 600 px döljs namnet visuellt men INTE semantiskt - länken
              måste ha ett tillgängligt namn även på den smalaste skärmen. */}
          <span className={`visually-hidden-until-sm ${styles.logoName}`}>
            Jelal Qaiumi
          </span>
        </a>
        <nav aria-label="Huvudnavigering">
          <ul className={styles.navList}>
            {navSections.map((section) => (
              <li key={section.id}>
                <a className={styles.navLink} href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
