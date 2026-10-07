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

/* LÄSRADENS HÖJD. Ett tunt band, inte en enda pixelrad: en rad på exakt 0 px
 * ger ingen skärning alls för IntersectionObserver, och en sektionsgräns som
 * landar mittemellan två heltalspixlar hade då kunnat hamna i ingen sektion. */
const READING_BAND = 8;

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
 * hade två observers varit igång samtidigt och skrivit över varandra. Samma sak
 * gäller de två fönsterlyssnarna nedan.
 *
 * ===== REGELN: LÄSRADEN, INTE STÖRST SYNLIG YTA =====
 * Den sektion som skär ett tunt band direkt under headern är aktuell.
 * Beslutat i ARKITEKTUR.md, "aria-current byter regel: läsraden, inte störst
 * yta".
 *
 * ~~Tidigare regel: den sektion som täckte flest pixlar av vyporten.~~ UPPHÄVD
 * 2026-10-07. Den följde sin egen logik, men logiken var fel: den fungerar bara
 * så länge sektionerna är ungefär lika höga. Uppmätt fel vid scrollY 676, med
 * projektsektionens överkant precis under headern: projects visade 351 px och
 * skills 485, så skills vann. Man klickade "Projekt" och navet lyste
 * "Kompetenser".
 *
 * Läsraden är OBEROENDE AV SEKTIONSHÖJD och svarar på det en läsare menar med
 * "var är jag" - det som står överst, inte det som råkar täcka flest pixlar.
 *
 * Att vänta ut felet avfärdades uttryckligen: det hade troligen dolts när Jelal
 * lägger in riktiga projekt och sektionen växer, och att låta innehåll dölja
 * ett logikfel är mönstret "fungerar i dag".
 *
 * HERO OBSERVERAS OCKSÅ, trots att den inte har någon navlänk. Det är inte
 * överflödigt - det är det som gör toppen av sidan rätt. Observerades bara
 * navsektionerna skulle den första navlänken markeras redan vid scrollY 0,
 * innan användaren nått sektionen. Eftersom hero inte har någon navlänk matchar
 * ingen länk när hero skär läsraden. Ingen extra logik behövs - det följer av
 * att jämförelsen är fullständig.
 * ======================================================================== */
function useCurrentSection(ids) {
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (elements.length === 0) return undefined;

    /* ===== LÄSRADENS LÄGE LÄSES UR SEKTIONERNAS EGEN scroll-margin-top =====
     * Inte ur --header-height, och det är ett UPPMÄTT fel som ligger bakom.
     *
     * Första versionen lade bandet direkt under --header-height, alltså på
     * y 64-72. Då markerades fel länk vid varje klick, systematiskt en sektion
     * efter: klick på "Projekt" gav scrollY 660 och bandet skars av HERO, klick
     * på "Kompetenser" gav bandet skuret av PROJECTS. Orsaken är att
     * global.css ger varje sektion
     * `scroll-margin-top: calc(var(--header-height) + var(--space-4))`, alltså
     * 80 px: en klickad sektion kommer till vila 16 px LÄGRE än headerns
     * underkant, och i de 16 pixlarna ligger fortfarande föregående sektion.
     * Bandet låg i glappet.
     *
     * Felet syntes bara för att länkarna KLICKADES. Med window.scrollTo till
     * sektionens överkant hade varje mätning visat rätt, eftersom den hoppar
     * över just det glapp som scroll-margin-top skapar.
     *
     * Därför läses värdet ur `scrollMarginTop` på en verklig sektion i stället
     * för att räknas ihop av tokens här. Då är bandet per definition där en
     * navigerad sektion LANDAR, och ändrar någon --space-4 eller
     * --header-height följer bandet med utan att denna fil behöver röras. Det
     * är samma skäl som att headerns höjd aldrig skrivs som ett tal.
     *
     * Reservvärdet är --header-height, för det fall en sektion saknar regeln. */
    const probe = elements.find((el) => el.matches('section[id]')) ?? elements[0];
    const bandTop =
      parseFloat(getComputedStyle(probe).scrollMarginTop) ||
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      ) ||
      0;

    /* Sparas utanför callbacken: en observer rapporterar bara de poster som
     * ÄNDRATS, inte alla. Utan ett minne hade en sektion som slutat ändras
     * försvunnit ur jämförelsen. */
    const crossing = new Map();

    let observer = null;
    let atBottom = false;

    function decide() {
      /* ===== UNDANTAGET FÖR SIDANS BOTTEN =====
       * Är sidan rullad längst ned kan en kort sista sektion aldrig nå
       * läsraden - bandet ligger då i en sektion ovanför, och den sista
       * markeras aldrig hur långt man än rullar. Då markeras den sista
       * sektionen.
       *
       * Undantaget står HÄR, i koden, och ska inte behöva upptäckas.
       * Beslutat i ARKITEKTUR.md, samma avsnitt som läsraden.
       *
       * Sista i elements, inte i ids: en post i sections.js utan renderad
       * sektion har redan filtrerats bort ovan, och då ska undantaget peka på
       * den sista som FINNS på sidan. */
      if (atBottom) {
        setCurrentId(elements[elements.length - 1].id);
        return;
      }

      /* Itererar ids i SIDANS ordning och låter den SISTA som skär bandet
       * vinna. Normalt skär bara en sektion ett 8 px-band; de få pixlar där
       * två gör det är precis vid en gräns, och då är den senare den man är på
       * väg in i. Ordningen är alltså avgörandet, inte Map-ordningen, som hade
       * berott på i vilken ordning webbläsaren råkade rapportera. */
      let best = null;

      for (const id of ids) {
        if (crossing.get(id)) best = id;
      }

      setCurrentId(best);
    }

    /* Bandet räknas i pixlar ur vyportens höjd och måste därför byggas om när
     * höjden ändras. rootMargin tar varken calc() eller en blandning av "100 %
     * minus 64 px", och en procentsats i underkanten hade gett ett band som
     * blir NEGATIVT på låga vyporter - alltså ingen skärning alls och ingen
     * markerad länk, tyst. */
    function build() {
      if (observer) observer.disconnect();
      crossing.clear();

      /* Underkanten krymps så att bara bandet återstår. Max(0, ...) är ett
       * skyddsnät för en vyport som är lägre än headern plus bandet: då blir
       * bandet i stället "allt under headern", vilket är en försämring men
       * fortfarande en fungerande markering. Aldrig ett negativt band. */
      const bottomInset = Math.max(0, window.innerHeight - bandTop - READING_BAND);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            crossing.set(entry.target.id, entry.isIntersecting);
          }

          decide();
        },
        { rootMargin: `-${bandTop}px 0px -${bottomInset}px 0px`, threshold: 0 },
      );

      for (const el of elements) observer.observe(el);
    }

    /* Botten kan nås UTAN att någon skärning ändras: är den sista sektionen
     * kort fortsätter sektionen ovanför att skära bandet hela vägen ned, och
     * observern har då ingenting att rapportera. Undantaget behöver därför en
     * egen lyssnare - det går inte att läsa ur observern. */
    function onScroll() {
      const doc = document.documentElement;

      /* -2 px tolerans: scrollHeight och den summerade höjden går isär på
       * bråkdelspixlar vid vissa zoomnivåer, och ett exakt likhetstest hade då
       * aldrig blivit sant. */
      const next = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;

      if (next !== atBottom) {
        atBottom = next;
        decide();
      }
    }

    function onResize() {
      build();
      onScroll();
    }

    build();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
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
          {/* ⚠️ TA INTE BORT DENNA SPAN. Den ser ut som död markup - texten är
              visuellt dold i alla bredder sedan Jelal bad om det 2026-10-07 -
              men den är det ENDA som ger logga-länken ett tillgängligt namn.
              Utan den annonseras sidans andra fokuserbara element som bara
              "länk", eftersom ikonen har alt="" + aria-hidden.

              Det är projektets enda enbärarsignal, och därför den enda plats
              där en borttagning som ser ofarlig ut gör en mätbar skada.

              Varför visuellt dold text och inte aria-label: aria-label
              degraderar till INGENTING om något går fel, medan dold text
              degraderar till SYNLIG text om CSS inte laddas. En namnlös länk är
              ett sämre felläge än ett namn som syns.

              Beslutat i ARKITEKTUR.md, "Namnet döljs i alla bredder". */}
          <span className="visually-hidden">Jelal Qaiumi</span>
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
