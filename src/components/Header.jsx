import { useEffect, useState } from 'react';
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

/* ===== PROJEKTETS FÖRSTA useEffect ======================================
 * Medvetet, och bara här. ARKITEKTUR.md: aria-current kräver en
 * IntersectionObserver och blir därmed projektets första useEffect - "det ska
 * vara ett medvetet val och inte smyga in tidigare".
 *
 * Jag prövade om det gick utan. Det gör det inte: vilken sektion som är i vy
 * är ett tillstånd som bara webbläsaren känner, och det finns ingen
 * CSS-mekanism som kan sätta ett ARIA-attribut.
 *
 * STÄDNINGEN ÄR POÄNGEN. En observer som överlever en avmontering är en läcka,
 * och i StrictMode körs effekten två gånger i utvecklingsläge - utan disconnect
 * hade två observers varit igång samtidigt och skrivit över varandra.
 *
 * VARFÖR intersectionRect.height OCH INTE intersectionRatio: skills-sektionen
 * är drygt 2400 px hög, så dess ratio når aldrig över ca 0,35 på en vanlig
 * skärm. En kort sektion som råkar synas helt (ratio 1,0) hade då vunnit över
 * en lång som fyller hela skärmen. Måttet som svarar på frågan "vad ser
 * användaren mest av" är hur många PIXLAR av vyporten sektionen täcker.
 *
 * HERO OBSERVERAS OCKSÅ, trots att den inte har någon navlänk. Det är inte
 * överflödigt - det är det som gör toppen av sidan rätt. Första versionen
 * observerade bara navsektionerna, och då vann skills vid scrollY 0 med sina
 * 160 synliga pixlar medan hero täckte 676: "Kompetenser" markerades som
 * aktuell innan användaren ens hade nått sektionen. Uppmätt.
 *
 * Nu jämförs alla sektioner på samma villkor, och eftersom hero inte har någon
 * navlänk matchar ingen länk när hero vinner. Ingen extra logik behövs - det
 * följer av att jämförelsen är fullständig.
 * ======================================================================== */
function useCurrentSection(ids) {
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (elements.length === 0) return undefined;

    /* Headerns höjd läses ur TOKENET, inte som ett tal här. Den klibbande
     * headern täcker vyportens översta rad, så en sektion ska inte räknas som
     * "i vy" för de pixlar som ligger under headern. */
    const headerHeight = getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height')
      .trim();

    /* Sparas utanför callbacken: en observer rapporterar bara de poster som
     * ÄNDRATS, inte alla. Utan ett minne hade en sektion som slutat ändras
     * försvunnit ur jämförelsen. */
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRect.height : 0);
        }

        let best = null;
        let bestHeight = 0;

        /* Itererar ids i DATANS ordning, inte Map-ordning, så att ett
         * oavgjort läge alltid faller på den sektion som kommer först på
         * sidan. Annars hade utfallet berott på i vilken ordning
         * webbläpparen råkade rapportera. */
        for (const id of ids) {
          const height = visible.get(id) ?? 0;
          if (height > bestHeight) {
            bestHeight = height;
            best = id;
          }
        }

        setCurrentId(best);
      },
      { rootMargin: `-${headerHeight} 0px 0px 0px`, threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [ids]);

  return currentId;
}

/* Stabila referenser: en ny array varje rendering hade gjort useEffect:ens
 * beroende olikt varje gång och kopplat upp observern om och om igen.
 *
 * HERO_ID står FÖRST, i sidans ordning. Ordningen är inte kosmetisk: den
 * avgör vilken sektion som vinner ett oavgjort läge, och då ska det bli den
 * som kommer först på sidan. */
const observedIds = [HERO_ID, ...navSections.map((section) => section.id)];

function Header() {
  const currentId = useCurrentSection(observedIds);

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
                {/* aria-current="true", inte "page": "page" betyder att länken
                    pekar på den sida man står på, och detta är avsnitt på EN
                    sida. Beslutat i ARKITEKTUR.md.

                    undefined när länken inte är aktuell, aldrig "false": ett
                    utskrivet aria-current="false" annonseras av vissa
                    skärmläsare som ett tillstånd, och då hade varje länk burit
                    ett påstående om sig själv i stället för bara den aktuella. */}
                <a
                  className={styles.navLink}
                  href={`#${section.id}`}
                  aria-current={section.id === currentId ? 'true' : undefined}
                >
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
