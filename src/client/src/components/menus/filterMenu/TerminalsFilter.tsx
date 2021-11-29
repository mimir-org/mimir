import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector } from "../../../models";
import { OnActiveTerminalChange } from "./handlers";
import { SubHeader } from "./styled";

interface Props {
  activeTerminals: Connector[];
  dispatch: any;
}

/**
 * Component for terminals.
 * @param interface
 * @returns checkboxes to toggle terminals that exist in Mimir.
 */
const TerminalsFilter = ({ activeTerminals, dispatch }: Props) => {
  const activeTerminalsChecked = activeTerminals.some((c) => c?.visible);

  return (
    <>
      <SubHeader>{"Terminals"}</SubHeader>
      <FilterElement
        isChecked={activeTerminalsChecked}
        label={TextResources.Filter_Show_Active_Terminals}
        onChange={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}
        visible={true}
      />
    </>
  );
};

export default TerminalsFilter;
