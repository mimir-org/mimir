import { Dispatch } from "redux";
import { FilterElement } from "./FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsConnectorVisible } from "../../../../../helpers";
import { Connector } from "../../../../../models";
import { OnActiveTerminalChange, OnAllTerminalsChange } from "./handlers";
interface Props {
  activeTerminals: Connector[];
  allTerminals: Connector[];
  dispatch: Dispatch;
}

/**
 * Component for terminals in Visual Filter.
 * @param interface
 * @returns checkboxes to toggle terminals that exist in Mimir.
 */
export const TerminalsFilter = ({ activeTerminals, allTerminals, dispatch }: Props) => {
  const activeTerminalsChecked = activeTerminals.some((c) => IsConnectorVisible(c));
  const allTerminalsChecked = allTerminals.some((c) => IsConnectorVisible(c));

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
