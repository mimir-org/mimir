import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector } from "../../../../models";
import { TextResources } from "../../../../assets/text";
import { OnAllTerminalsChange, OnActiveTerminalChange } from "../handlers";

interface Props {
  allTerminals: Connector[];
  activeTerminals: Connector[];
  inactiveTerminals: Connector[];
  label: string;
  dispatch: any;
}

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
          <MenuListItem onClick={() => OnAllTerminalsChange(allTerminals, dispatch, allTerminalsChecked)}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={allTerminalsChecked}
                  onChange={() => OnAllTerminalsChange(allTerminals, dispatch, allTerminalsChecked)}
                />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>{TextResources.Filter_Show_Terminals}</p>
          </MenuListItem>

          <MenuListItem onClick={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={activeTerminalsChecked}
                  onChange={() => OnActiveTerminalChange(activeTerminals, dispatch, activeTerminalsChecked)}
                />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>{TextResources.Filter_Show_Active_Terminals}</p>
          </MenuListItem>

          {/* <MenuListItem onClick={() => onInactiveTerminalsChange()}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={inactiveTerminals[0]?.visible}
                  onChange={() => onInactiveTerminalsChange()}
                />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>{TextResources.Filter_Toggle_Inactive_Terminals}</p>
          </MenuListItem> */}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default FilterTerminalDropdown;
