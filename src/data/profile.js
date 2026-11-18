/* Ditt namn och din roll.
 *
 * SÅ ÄNDRAR DU NÅGOT:
 *   Namnet  - byt texten i "name" nedan.
 *   Rollen  - byt texten i "role" nedan.
 *   Både namnet och rollen står också i <title> i index.html, som inte kan
 *   läsa härifrån. Skiljer de sig stannar bygget och skriver ut den väntade
 *   titeln. Skriv in den i <title>.
 *
 * VAR DE SYNS:
 *   role  - rollraden i hero, under rubriken, och taglinen i footern.
 *   name  - copyright-raden i footern.
 *   Båda  - fliktiteln, delningskortet och den strukturerade datan för
 *           sökmotorer.
 *
 * REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - name måste finnas och innehålla text.
 *   - role måste finnas och innehålla text.
 *   - <title> i index.html måste vara namnet och rollen med en mittpunkt
 *     emellan.
 *
 * Heros rubrik står INTE här. Den står i src/components/Hero.jsx.
 */

/** @typedef {Object} Profile
 *  @property {string} name  OBLIGATORISK.
 *  @property {string} role  OBLIGATORISK. Samma sträng står i <title> i index.html. */
export const profile = { name: 'Jelal Qaiumi', role: 'Systemutvecklare · Fullstack' };

/* Bredderna som bildskriptet genererar och som hero läser. Samma bredder står i
 * preloaden i index.html (imagesrcset och href). Ändra båda i samma redigering,
 * och kör sedan npm run optimize:images. Bygget stannar om preloaden inte
 * stämmer med listan. Skälet står i ARKITEKTUR.md, M10c och M22 punkt 5. */
export const HERO_IMAGE_WIDTHS = [960, 1440, 1672];
