import Chip from './Chip.jsx';
import { SURFACE_LIGHT } from './Section.jsx';

/* Ett chip = en kompetens. Ren presentation: inget state och ingen kontroll.
 * Formen är det gemensamma chipsets, och ytan är den ljusa (attributet
 * data-surface), så att kompetenserna står ifyllda på den mörka sektionen. De
 * är text och inte knappar. Beslutat i ARKITEKTUR.md, M15 och M25. Komponenten
 * tar därför inget mer än namnet.
 *
 * Ett namn som är tomt eller bara blanksteg filtreras bort av den komponent som
 * läser datan (Skills.jsx), så att React-nyckeln aldrig kan bli undefined och
 * ett ofullständigt fält aldrig blir ett tomt <li>. */
function SkillChip({ name }) {
  return (
    <li>
      <Chip surface={SURFACE_LIGHT}>{name}</Chip>
    </li>
  );
}

export default SkillChip;
