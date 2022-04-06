import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Connector } from "../../../../../models";
import { OnActiveTerminalChange, OnAllTerminalsChange } from "./handlers";
import { IsConnectorVisible } from "../../../../flow/helpers/Connectors";
import { FilterElement } from "../FilterElement";

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
        label={TextResources.TERMINALS}
        onChange={() => OnAllTerminalsChange(allTerminals, dispatch, allTerminalsChecked)}
        visible
        isHeader
      />
      <FilterElement
        isChecked={activeTerminalsChecked}
        label={TextResources.SHOW_ACTIVE_TERMINALS}
        onChange={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}
        visible
      />
    </>
  );
};
