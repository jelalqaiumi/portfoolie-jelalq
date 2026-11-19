/* Texten i sektionen "Om mig".
 *
 * HÄR ÄNDRAR DU TEXTEN. Ingen komponentfil behöver röras.
 *
 * EN ARRAY AV STYCKEN, inte en sträng med radbrytningar. Varje post blir ett
 * eget <p> på sidan. Två skäl, beslutade i ARKITEKTUR.md ("src/data/about.js -
 * Om mig"): en sträng hade krävt att komponenten delar på radbrytningar, alltså
 * logik i något som ska vara ren presentation - och varje stycke blir en egen
 * rad att redigera i stället för ett textblock där radbrytningarna är osynliga.
 *
 * Lägg till ett stycke: skriv en ny rad i listan. Ta bort ett: radera raden.
 * Minst ett stycke måste finnas, annars fäller valideringen bygget.
 *
 * FORMEN SKA INTE VÄXA. Det finns inget fält för bild och inga rubriknivåer,
 * och det är avsiktligt: Jelal sa "en liten sektion", och det behandlas som
 * specifikation. Behövs något av det är det ett eget beslut, och då är det inte
 * längre en liten sektion.
 *
 * Rubriken "Om mig" står INTE här - den kommer ur sections.js, som för alla
 * andra sektioner.
 */

/**
 * @typedef {Object} AboutLink
 * @property {string} phrase       OBLIGATORISK när link finns. Måste förekomma EXAKT en gång i något stycke.
 * @property {string} projectSlug  OBLIGATORISK när link finns. Ett slug ur projects.js. Finns projektet inte
 *                                 renderas frasen som vanlig text - ingen länk, inget trasigt ankare.
 *
 * @typedef {Object} About
 * @property {string[]}       paragraphs  OBLIGATORISK. Ett stycke per post. Minst ett.
 * @property {AboutLink|null} link        OBLIGATORISK som fält, får vara null. null = ingen länk i texten.
 */

/* TEXTEN ÄR DIN EGEN, ordagrant som Jelal skrev den 2026-11-19. Den ersätter
 * det tidigare stycket från 2026-10-07. */

/** @type {About} */
export const about = {
  paragraphs: [
    'Systemutvecklare som bygger system som gör vardagen enklare. Jag drivs av problemlösning och nöjer mig inte förrän jag förstått grundorsaken och hittat en hållbar lösning. Jag arbetar främst med C#/.NET, React och React Native, från idé till färdig produkt.',
  ],

  /* EN LÄNK INNE I TEXTEN, utan att texten innehåller någon markering.
   *
   * phrase är den text som ska bli klickbar. Den måste förekomma exakt en gång
   * i styckena ovan, annars fäller valideringen bygget och säger varför.
   *
   * projectSlug är slug på projektet i projects.js som länken ska hoppa till.
   *
   * SÅ LÄNGE PROJEKTET INTE FINNS I projects.js renderas frasen som vanlig
   * text - ingen länk, och inget ankare som pekar på något som inte finns.
   * Lägger du in projektet med detta slug tänds länken av sig själv, och varken
   * denna fil eller någon komponent behöver ändras.
   *
   * Vill du ingen länk alls: skriv  link: null,  och frasen blir vanlig text. */
  /* Den nya texten nämner inget projekt, så ingen fras blir länk. */
  link: null,
};
