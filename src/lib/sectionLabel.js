/* Sektionsetikettens nummer, räknat ur datan. Beslutat i ARKITEKTUR.md, M13
 * "Sektionsetiketterna".
 *
 * Ren JavaScript utan React, JSX och DOM. Numret är postens plats i listan och
 * nämnaren är listans längd, så att en omordning eller en ny post i
 * sections.js syns i etiketten utan att någon komponent rörs. Hero ligger inte
 * i listan och räknas därför inte. */

/** Fyller ut ett tal till två siffror. */
function twoDigits(n) {
  return String(n).padStart(2, '0');
}

/**
 * @param {{ id: string }[]} sections  De navigerbara sektionerna, i ordning.
 * @param {string} id                  Sektionens id.
 * @returns {string|null}              t.ex. '01 / 04', eller null om id inte finns.
 */
export function sectionIndexLabel(sections, id) {
  if (!Array.isArray(sections)) return null;
  const index = sections.findIndex((section) => section?.id === id);
  if (index === -1) return null;
  return `${twoDigits(index + 1)} / ${twoDigits(sections.length)}`;
}
