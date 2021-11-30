import { FilterElement } from "../";
import { TextResources } from "../../../../assets/text";
import { Connector } from "../../../../models";
import { OnActiveTerminalChange, OnAllTerminalsChange } from "../handlers";

interface Props {
  activeTerminals: Connector[];
  allTerminals: Connector[];
  dispatch: any;
}

/**
 * Component for terminals.
 * @param interface
 * @returns checkboxes to toggle terminals that exist in Mimir.
 */
const TerminalsFilter = ({ activeTerminals, allTerminals, dispatch }: Props) => {
  const activeTerminalsChecked = activeTerminals.some((c) => c?.visible);
  const allTerminalsChecked = allTerminals.some((c) => c?.visible);

  return (
    <>
      <FilterElement
        isChecked={allTerminalsChecked}
        label={TextResources.Filter_Terminals}
        onChange={() => OnAllTerminalsChange(allTerminals, dispatch, allTerminalsChecked)}
        visible={true}
        isHeader={true}
      />
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
