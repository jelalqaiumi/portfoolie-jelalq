/* Ditt namn och din roll.
 *
 * SÅ ÄNDRAR DU NÅGOT:
 *   Namnet  - byt texten i "name" nedan.
 *   Rollen  - byt texten i "role" nedan, OCH texten efter första
 *             mittpunkten i <title> i index.html. Det är samma sträng på två
 *             ställen, och <title> kan inte läsa härifrån - ändra båda i samma
 *             redigering.
 *
 * VAR DE SYNS:
 *   role  - rollraden i hero, under rubriken, och taglinen i footern.
 *   name  - copyright-raden i footern.
 *
 * REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - name måste finnas och innehålla text.
 *   - role måste finnas och innehålla text.
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
