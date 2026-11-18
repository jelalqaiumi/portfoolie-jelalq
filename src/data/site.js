/* Sidans adress och profiler för sökmotorer.
 *
 * SÅ ÄNDRAR DU NÅGOT:
 *   Domänen - byt texten i "url" nedan och kör npm run build. Adressen står
 *             också i public/robots.txt och public/sitemap.xml. Bygget stannar
 *             och skriver ut exakt vad som ska stå i de två filerna. Skriv in
 *             det, med LF-radslut, och bygg igen.
 *   En profil som bara ska stå i sökmotorernas data och inte visas på sidan
 *           - lägg adressen i listan "sameAsExtra". Profiler som ska synas på
 *             sidan skrivs i stället i src/data/contact.js.
 *
 * VAR DE SYNS:
 *   Inte på sidan. Bara i sidans <head> (canonical, delningskortet och den
 *   strukturerade datan för sökmotorer) och i robots.txt och sitemap.xml.
 *
 * REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - url måste vara en https-adress till startsidan, med gemener och ett
 *     snedstreck sist, utan sökväg (till exempel https://exempel.se/).
 *   - sameAsExtra måste vara en lista (skriv [] om den är tom), och varje
 *     adress i den en https-adress.
 *   - public/robots.txt och public/sitemap.xml måste stämma med url.
 *
 * Beslutat i ARKITEKTUR.md: M24.
 */

/** @typedef {Object} Site
 *  @property {string}   url          OBLIGATORISK. Sidans adress: https, gemener, ett snedstreck sist, ingen sökväg.
 *  @property {string[]} sameAsExtra  OBLIGATORISK, får vara tom. Profiladresser som står i JSON-LD:s sameAs men INTE visas på sidan. */
export const site = { url: 'https://jelalqaiumi.se/', sameAsExtra: ['https://github.com/Jelalqaiumi'] };
