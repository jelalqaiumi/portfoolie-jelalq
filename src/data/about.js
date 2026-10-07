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
 * FORMEN SKA INTE VÄXA. Det finns inga fält för bild, rubriker eller länkar,
 * och det är avsiktligt: Jelal sa "en liten sektion", och det behandlas som
 * specifikation. Behövs något av det är det ett eget beslut, och då är det inte
 * längre en liten sektion.
 *
 * Rubriken "Om mig" står INTE här - den kommer ur sections.js, som för alla
 * andra sektioner.
 */

/**
 * @typedef {Object} About
 * @property {string[]} paragraphs  OBLIGATORISK. Ett stycke per post. Minst ett.
 *                                  Varje post måste innehålla text.
 */

/* ===== UTKAST - TEXT SOM JELAL SKA GODKÄNNA ELLER ERSÄTTA =================
 *
 * ARKITEKTUR.md säger att innehållet är en öppen punkt och att Jelal ska säga
 * vad som ska stå. Han har inte skrivit någon text än, så detta är byggarens
 * utkast, härlett ur BRIEF.md (systemutvecklare, React/Vite-stacken, "ren CSS,
 * inget UI-ramverk") och ur hans egna kompetenslistor: grupperna "API och
 * backend", "Testning och kvalitetssäkring", "Kodkvalitet och arkitektur",
 * "Säker webbutveckling" och "Autentisering och kryptering".
 *
 * MEDVETET INTE MED, samma hållning som hero-introt:
 *   - superlativ och värdeord om egen förmåga
 *   - varje påstående om antal år, antal projekt eller omfattning av
 *     erfarenhet - det finns inget underlag för sådana i materialet
 *   - allt om arbetsgivare, utbildning eller ort, som inte står någonstans
 *
 * BYT UT STRÄNGARNA NEDAN. Hela texten är tre rader i denna fil.
 * ========================================================================= */

/** @type {About} */
export const about = {
  paragraphs: [
    'Jag arbetar med hela kedjan i en applikation: gränssnittet i webbläsaren, API:et mellan klient och server, och databasen under det. På serversidan är det C#, .NET och ASP.NET Core. I klienten React för webb och React Native för mobil.',
    'Det jag lägger vikt vid är att koden går att läsa och ändra av någon annan än den som skrev den. Enhetstester, tydlig ansvarsfördelning och granskade ändringar hör till arbetet, inte till efterarbetet. Samma sak gäller säkerhet: autentisering, hantering av nycklar och de brister OWASP listar är sådant jag tar höjd för medan jag bygger.',
    'Den här sidan är byggd i React och Vite med egen CSS, utan UI-ramverk.',
  ],
};
