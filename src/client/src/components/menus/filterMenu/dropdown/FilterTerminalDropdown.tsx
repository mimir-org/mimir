import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuListBox } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Node, Connector } from "../../../../models";
import { TextResources } from "../../../../assets/text";
import { OnActiveTerminalChange, OnInactiveTerminalChange } from "../handlers";
import { FilterTerminalElement } from ".";

interface Props {
  nodes: Node[];
  allTerminals: Connector[];
  activeTerminals: Connector[];
  inactiveTerminals: Connector[];
  label: string;
  dispatch: any;
}

/**
 * Component in Visual Filter for terminals.
 * @param interface
 * @returns a drop-down menu for a node's terminals.
 */
const FilterTerminalDropdown = ({ nodes, allTerminals, activeTerminals, inactiveTerminals, label, dispatch }: Props) => {
  const [listOpen, setListOpen] = useState(false);
  const activeTerminalsChecked = activeTerminals.some((c) => c?.visible);
  const inactiveTerminalsChecked = inactiveTerminals.some((c) => c?.visible);

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setListOpen(!listOpen)}>
        <p>{label}</p>
        <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>

      {listOpen && (
        <MenuListBox>
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

          <FilterTerminalElement
            checked={inactiveTerminalsChecked}
            label={TextResources.Filter_Show_Inactive_Terminals}
            onChange={() => OnInactiveTerminalChange(nodes, dispatch, activeTerminalsChecked)}
          />
        </MenuListBox>
      )}
    </MenuWrapper>
  );
};

export default FilterTerminalDropdown;
