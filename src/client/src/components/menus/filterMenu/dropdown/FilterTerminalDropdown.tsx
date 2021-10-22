import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector } from "../../../../models";
import { TextResources } from "../../../../assets/text";
import { OnAllTerminalsChange, OnActiveTerminalChange } from "../handlers";
import { FilterTerminalElement } from ".";

interface Props {
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
const FilterTerminalDropdown = ({ allTerminals, activeTerminals, inactiveTerminals, label, dispatch }: Props) => {
  const [listOpen, setListOpen] = useState(false);
  const activeTerminalsChecked = activeTerminals.some((c) => c?.visible);
  const allTerminalsChecked = !allTerminals.some((c) => !c?.visible);

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setListOpen(!listOpen)}>
        <p>{label}</p>
        <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>

      {listOpen && (
        <MenuList>
          <FilterTerminalElement
            checked={allTerminalsChecked}
            label={TextResources.Filter_Show_Terminals}
            onChange={() => OnAllTerminalsChange(allTerminals, dispatch, allTerminalsChecked)}
          />

          <FilterTerminalElement
            checked={activeTerminalsChecked}
            label={TextResources.Filter_Show_Active_Terminals}
            onChange={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}
          />
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default FilterTerminalDropdown;
