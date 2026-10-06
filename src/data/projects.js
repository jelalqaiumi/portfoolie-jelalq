/* Dina projekt.
 *
 * Listan är TOM just nu, och sidan visar då en kort rad i stället för en tom
 * yta. Det är avsiktligt - inget är trasigt.
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
 *   },
 * --------------------------------------------------------------------------
 *
 * DE SEX FÄLTEN:
 *   id           OBLIGATORISKT. Ett kort namn med små bokstäver och bindestreck,
 *                t.ex. 'min-app'. Används internt och måste vara unikt.
 *   title        OBLIGATORISKT. Projektets namn som det ska visas.
 *   description  OBLIGATORISKT. En till tre meningar på svenska.
 *   tech         OBLIGATORISKT. En lista med tekniknamn inom hakparenteser.
 *                Får vara tom: skriv  tech: [],
 *   url          Länk till projektet live. Har du ingen: skriv  url: null,
 *   repoUrl      Länk till koden. Har du ingen: skriv  repoUrl: null,
 *
 * OM LÄNKARNA: skriv null utan citattecken när en länk inte finns. Då visas
 * ingen knapp alls. Skriv ALDRIG en tom text ('') och aldrig '#' - det blir en
 * länk som inte går någonstans.
 *
 * FYRA REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - id, title och description måste finnas och innehålla text.
 *   - Varje id får bara förekomma en gång.
 *   - tech måste vara en lista med hakparenteser, även när den är tom.
 *   - url och repoUrl måste vara en text eller null.
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
 */

/* Inga fält utöver dessa sex. Ingen bild, inget årtal, ingen kategori och
 * ingen "featured"-flagga - de är medvetet uteslutna i ARKITEKTUR.md och kan
 * läggas till den dag de behövs. */

/** @type {Project[]} */
export const projects = [];
