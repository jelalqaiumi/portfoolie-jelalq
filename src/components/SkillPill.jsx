import styles from './SkillPill.module.css';

/* En enda kompetens som pill. Ren presentation: inget state, ingen hover,
 * ingen länk, ingen title och inget tabindex - pillarna är text, inte
 * kontroller (ARKITEKTUR.md, "Pillarnas två tillstånd").
 *
 * Jämförelsen är STRIKT mot true, precis som komponenttabellen skriver den:
 * filled === true -> orange fylld. Allt annat, inklusive strängen "false" som
 * en handredigerad datafil lätt får, blir dämpad outline. Det är det säkra
 * felläget: en skill visas aldrig som behärskad på grund av ett skrivfel.
 * scripts/validate-data.mjs fäller felet i bygget. */
function SkillPill({ name, filled }) {
  const stateClass = filled === true ? styles.filled : styles.outline;

  return <li className={`${styles.pill} ${stateClass}`}>{name}</li>;
}

export default SkillPill;
