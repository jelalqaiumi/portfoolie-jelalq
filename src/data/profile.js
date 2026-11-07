/* Ditt namn och din roll.
 *
 * SÅ ÄNDRAR DU NÅGOT:
 *   Namnet  - byt texten i "name" nedan.
 *   Rollen  - byt texten i "role" nedan, OCH texten efter tankstrecket i
 *             <title> i index.html. Det är samma sträng på två ställen, och
 *             <title> kan inte läsa härifrån - ändra båda i samma redigering.
 *
 * VAR DE SYNS:
 *   role  - rollraden i hero, under rubriken.
 *   name  - copyright-raden i footern (läses därifrån från paket P14).
 *
 * TVÅ REGLER SOM BYGGET KONTROLLERAR (npm run build stannar annars):
 *   - name måste finnas och innehålla text.
 *   - role måste finnas och innehålla text.
 *
 * Heros rubrik står INTE här. Den står i src/components/Hero.jsx.
 */

/** @typedef {Object} Profile
 *  @property {string} name  OBLIGATORISK.
 *  @property {string} role  OBLIGATORISK. Samma sträng står i <title> i index.html. */
export const profile = { name: 'Jelal Qaiumi', role: 'Systemutvecklare · Fullstack' };
