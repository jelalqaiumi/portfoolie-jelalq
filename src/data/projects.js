/* Dina projekt.
 *
 * Är listan tom visar sidan en kort rad i stället för en tom yta. Det är
 * avsiktligt - inget är trasigt.
 *
 * SÅ LÄGGER DU TILL ETT PROJEKT:
 *   1. Kopiera hela blocket mellan de två raderna med streck nedan.
 *   2. Klistra in det inuti hakparenteserna i "projects" längst ner.
 *   3. Byt ut texterna. Spara. Kortet syns på sidan direkt.
 *
 * Ingen annan fil behöver röras - varken komponenter eller CSS.
 *
 * ------------------------------- KOPIERA HÄR -------------------------------
 *   {
 *     slug: 'min-app',
 *     title: 'Min app',
 *     category: 'Fullstack',
 *     status: 'Live',
 *     description: 'En eller två meningar om vad projektet gör och vad du byggde.',
 *     tech: ['React', 'C#', 'SQL'],
 *     image: null,
 *     liveUrl: 'https://exempel.se',
 *     githubUrl: null,
 *   },
 * --------------------------------------------------------------------------
 *
 * DE NIO FÄLTEN:
 *   slug         OBLIGATORISKT. Ett kort namn med små bokstäver, siffror och
 *                bindestreck, t.ex. 'min-app'. Måste vara unikt.
 *   title        OBLIGATORISKT. Projektets namn som det ska visas.
 *   category     OBLIGATORISKT. Exakt ett av: 'Fullstack', 'Frontend', 'Backend'.
 *   status       OBLIGATORISKT. Exakt ett av: 'Live', 'Skolprojekt', 'Arkiverad'.
 *   description  OBLIGATORISKT. En eller två meningar på svenska.
 *   tech         OBLIGATORISKT. En lista med tekniknamn inom hakparenteser.
 *                Får vara tom: skriv  tech: [],
 *   image        OBLIGATORISKT att skriva ut. Bild överst i kortet, t.ex. en
 *                skärmdump av startsidan. Lägg en PNG i
 *                assets-source/projects/, kör  npm run optimize:projects  och
 *                skriv filnamnet utan .png här, t.ex.  image: 'min-app',
 *                Bilden beskärs till 4:3 från vänster kant: full höjd, och
 *                det som inte får plats till höger skärs bort. Är bilden högre
 *                än 4:3 skärs i stället nederkanten bort.
 *                Ingen bild: skriv  image: null,
 *   liveUrl      Adressen till projektet live, börjar med https://.
 *                Har du ingen: skriv  liveUrl: null,
 *   githubUrl    Adressen till koden, börjar med https://.
 *                Har du ingen: skriv  githubUrl: null,
 *
 * OM LÄNKARNA: skriv null utan citattecken när en länk inte finns. Skriv
 * ALDRIG en tom text ('') och aldrig '#' - det blir en länk som inte går
 * någonstans.
 *
 * REGLERNA SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - slug, title och description måste finnas och innehålla text.
 *   - slug får bara innehålla a-z, 0-9 och bindestreck, och förekomma en gång.
 *   - category och status måste vara ett av de tillåtna värdena ovan.
 *   - tech måste vara en lista med text, även när den är tom.
 *   - image måste vara null eller ett namn vars bilder är genererade.
 *   - liveUrl och githubUrl måste vara null eller en adress som börjar med
 *     https://.
 *   - Inga andra fält än de nio ovan.
 * En tom lista är helt giltig - bygget klagar inte på att du saknar projekt.
 */

/**
 * @typedef {'Fullstack'|'Frontend'|'Backend'} ProjectCategory
 * @typedef {'Live'|'Skolprojekt'|'Arkiverad'} ProjectStatus
 *
 * @typedef {Object} Project
 * @property {string}          slug         OBLIGATORISK. Unik, gemener, a-z0-9-. React-key och kortets id (ankarmål för Om mig).
 * @property {string}          title        OBLIGATORISK. Projektets namn. Visas som titel och i logo-brickan.
 * @property {ProjectCategory} category     OBLIGATORISK. Ett av värdena i PROJECT_CATEGORIES.
 * @property {ProjectStatus}   status       OBLIGATORISK. Ett av värdena i PROJECT_STATUSES.
 * @property {string}          description  OBLIGATORISK. 1-2 meningar på svenska.
 * @property {string[]}        tech         OBLIGATORISK. Får vara tom []. Visas som taggar och blir filterchips.
 * @property {string|null}     image        OBLIGATORISK NYCKEL. Bildnamn utan ändelse, eller null (då platshållare).
 * @property {string|null}     [liveUrl]    Valfri. https-adress till live-sajten, eller null.
 * @property {string|null}     [githubUrl]  Valfri. https-adress till koden, eller null.
 */

/* Ordningen här är ordningen på filtrets knappar. */
export const PROJECT_CATEGORIES = ['Fullstack', 'Frontend', 'Backend'];
export const PROJECT_STATUSES = ['Live', 'Skolprojekt', 'Arkiverad'];

/** @type {Project[]} */
export const projects = [
  {
    slug: 'awle',
    title: 'Awle',
    category: 'Fullstack',
    status: 'Live',
    /* Texten är godkänd av Jelal 2026-11-07. */
    description:
      'En svensk rekryteringsplattform som matchar arbetssökande och arbetsgivare utifrån personlighet i stället för CV. Jag byggde den tillsammans med en annan utvecklare under min LIA hos Pixl Media.',
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'TanStack Query', 'Zod'],
    image: 'awle',
    liveUrl: 'https://awle.se',
    githubUrl: null,
  },
];

/* Bredderna som varje projektbild genereras i. Läses av kortet, bildskriptet
 * och valideringen - ändra bara här, och kör sedan npm run optimize:projects.
 * Skälet till bredderna står i ARKITEKTUR.md, "M4 - Projektbilden och kortet". */
export const PROJECT_IMAGE_WIDTHS = [600, 1200];
