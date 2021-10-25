import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector } from "../../../../models";
import { TextResources } from "../../../../assets/text";
import { OnActiveTerminalChange } from "../handlers";
import { FilterTerminalElement } from ".";

interface Props {
  allTerminals: Connector[];
  activeTerminals: Connector[];
  inActiveTerminals: Connector[];
  label: string;
  dispatch: any;
}

/**
 * Component in Visual Filter for terminals.
 * @param interface
 * @returns a drop-down menu for a node's terminals.
 */
const FilterTerminalDropdown = ({ allTerminals, activeTerminals, inActiveTerminals, label, dispatch }: Props) => {
  const [listOpen, setListOpen] = useState(false);
  const activeTerminalsChecked = activeTerminals.some((c) => c?.visible);

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setListOpen(!listOpen)}>
        <p>{label}</p>
        <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>

      {listOpen && (
        <MenuList>
          {/* <FilterTerminalElement
            checked={terminalsChecked}
            label={TextResources.Filter_Show_Terminals}
            onChange={() => OnAllTerminalsChange(allTerminals, dispatch, terminalsChecked)}
          /> */}

          <FilterTerminalElement
            checked={activeTerminalsChecked}
            label={TextResources.Filter_Show_Active_Terminals}
            onChange={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}
          />

          {/* <FilterTerminalElement
            checked={inActiveTerminalsChecked}
            label={TextResources.Filter_Show_Inactive_Terminals}
            onChange={() => OnInactiveTerminalChange(inActiveTerminals, dispatch, activeTerminalsChecked)}
          /> */}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default FilterTerminalDropdown;
