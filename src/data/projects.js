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
 *     id: 'min-app',
 *     title: 'Min app',
 *     description: 'En eller ett par meningar om vad projektet gör och vad du byggde.',
 *     tech: ['React', 'C#', 'SQL'],
 *     url: 'https://exempel.se',
 *     repoUrl: 'https://github.com/användarnamn/min-app',
 *     image: null,
 *   },
 * --------------------------------------------------------------------------
 *
 * DE SJU FÄLTEN:
 *   id           OBLIGATORISKT. Ett kort namn med små bokstäver och bindestreck,
 *                t.ex. 'min-app'. Används internt och måste vara unikt.
 *   title        OBLIGATORISKT. Projektets namn som det ska visas.
 *   description  OBLIGATORISKT. En till tre meningar på svenska.
 *   tech         OBLIGATORISKT. En lista med tekniknamn inom hakparenteser.
 *                Får vara tom: skriv  tech: [],
 *   url          Länk till projektet live. Har du ingen: skriv  url: null,
 *   repoUrl      Länk till koden. Har du ingen: skriv  repoUrl: null,
 *   image        Bild överst i kortet, t.ex. en skärmdump av startsidan.
 *                Lägg en PNG i 16:10 (t.ex. 1440 x 900) i
 *                assets-source/projects/, kör  npm run optimize:projects  och
 *                skriv filnamnet utan .png här, t.ex.  image: 'min-app',
 *                Ingen bild: skriv  image: null,
 *
 * OM LÄNKARNA: skriv null utan citattecken när en länk inte finns. Då visas
 * ingen knapp alls. Skriv ALDRIG en tom text ('') och aldrig '#' - det blir en
 * länk som inte går någonstans.
 *
 * FEM REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - id, title och description måste finnas och innehålla text.
 *   - Varje id får bara förekomma en gång.
 *   - tech måste vara en lista med hakparenteser, även när den är tom.
 *   - url och repoUrl måste vara en text eller null.
 *   - image måste vara null eller ett namn vars bilder är genererade.
 * En tom lista är helt giltig - bygget klagar inte på att du saknar projekt.
 */

/**
 * @typedef {Object} Project
 * @property {string}      id           OBLIGATORISK. Unik slug, gemener, a-z0-9-. React-key.
 * @property {string}      title        OBLIGATORISK. Projektets namn.
 * @property {string}      description  OBLIGATORISK. 1-3 meningar på svenska.
 * @property {string[]}    tech         OBLIGATORISK. Får vara tom array []. Visas som små etiketter.
 * @property {string|null} url          Valfri. Länk till live/demo, annars null.
 * @property {string|null} repoUrl      Valfri. Länk till repo, annars null.
 * @property {string|null} image        Valfri. Bildnamn i public/assets/projects/, annars null.
 */

/* Inga fält utöver dessa sju. Bildfältet lades till 2026-11-06 på Jelals
 * begäran (korten ska visa projektets startsida). Inget årtal, ingen kategori
 * och ingen "featured"-flagga - de kan läggas till den dag de behövs. */

/** @type {Project[]} */
export const projects = [
  {
    id: 'awle',
    title: 'Awle',
    description:
      'En svensk rekryteringsplattform som matchar arbetssökande och arbetsgivare utifrån personlighet i stället för CV. Kandidater skapar en anonym profil, och arbetsgivare filtrerar på yrke, län och erfarenhet. Ett samarbetsprojekt där jag och en annan utvecklare byggde plattformen tillsammans.',
    tech: ['Next.js', 'React', 'Supabase'],
    url: 'https://awle.se',
    repoUrl: null,
    image: 'awle',
  },
];

/* Bredderna som varje projektbild genereras i. Kortets tak är ca 605 px, så
 * 640 täcker vanlig skärm och 1280 täcker skärmar med dubbel täthet. Läses av
 * kortet, bildskriptet och valideringen - ändra bara här, och kör sedan
 * npm run optimize:projects. */
export const PROJECT_IMAGE_WIDTHS = [640, 1280];
