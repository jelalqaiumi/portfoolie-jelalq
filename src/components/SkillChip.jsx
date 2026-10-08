import styles from './SkillChip.module.css';

/* Ett chip = en kompetens. Ren presentation: inget state, ingen hover, ingen
 * länk, ingen title och inget tabindex - chipsen är text, inte kontroller.
 *
 * ETT ENDA UTSEENDE, inga tillstånd. Beslutat i ARKITEKTUR.md, "A2" och "A6".
 * Komponenten tar därför inget mer än namnet: det finns ingen dimension att
 * visa, och en prop som styr utseendet skulle vara ett val utan underlag i
 * datan.
 *
 * Ett namn som är tomt eller bara blanksteg filtreras bort av den komponent som
 * läser datan (Skills.jsx), så att React-nyckeln aldrig kan bli undefined och
 * ett ofullständigt fält aldrig blir ett tomt <li>. */
function SkillChip({ name }) {
  return <li className={styles.chip}>{name}</li>;
}

export default SkillChip;
