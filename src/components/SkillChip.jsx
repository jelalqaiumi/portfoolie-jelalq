import Chip from './Chip.jsx';

/* Ett chip = en kompetens. Ren presentation: inget state och ingen kontroll.
 * Utseendet är det gemensamma chipsets, utan växlingsläge, så kompetenserna ser
 * ut som filterchipsen men är text och inte knappar. Beslutat i ARKITEKTUR.md,
 * M15. Komponenten tar därför inget mer än namnet.
 *
 * Ett namn som är tomt eller bara blanksteg filtreras bort av den komponent som
 * läser datan (Skills.jsx), så att React-nyckeln aldrig kan bli undefined och
 * ett ofullständigt fält aldrig blir ett tomt <li>. */
function SkillChip({ name }) {
  return (
    <li>
      <Chip>{name}</Chip>
    </li>
  );
}

export default SkillChip;
